/**
 * Distributed-first rate limiter.
 *
 * Why this exists: the previous implementation kept counters in a module-level
 * `Map`. On Vercel every request may land on a different (or cold) lambda, so
 * the counter reset constantly and was never shared between concurrent
 * instances — the limit was effectively unenforced under real load. The map was
 * also never pruned, so a spray of unique IPs grew it until the instance OOMed.
 *
 * Strategy:
 *   1. If Upstash Redis REST credentials are configured, use a shared atomic
 *      counter. This is the only configuration that actually enforces a limit
 *      across instances. No SDK dependency — plain `fetch` against the REST API.
 *   2. Otherwise fall back to a bounded, self-pruning in-memory limiter. It
 *      still stops a naive flood against a single warm instance, and it can no
 *      longer leak memory.
 */

const MEMORY_STORE_MAX_KEYS = 10_000;

type Entry = { count: number; resetAt: number };

const memoryStore = new Map<string, Entry>();
let lastPrune = 0;

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export const hasDistributedRateLimit = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

export type RateLimitResult = {
  limited: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

/**
 * Drop expired entries, and if the store is still oversized drop the entries
 * closest to expiry. Bounds memory regardless of traffic shape.
 */
function pruneMemoryStore(now: number): void {
  // Prune at most once a minute; this runs on a hot path.
  if (now - lastPrune < 60_000) return;
  lastPrune = now;

  for (const [key, entry] of memoryStore) {
    if (now > entry.resetAt) memoryStore.delete(key);
  }

  if (memoryStore.size > MEMORY_STORE_MAX_KEYS) {
    const sorted = [...memoryStore.entries()].sort((a, b) => a[1].resetAt - b[1].resetAt);
    const excess = memoryStore.size - MEMORY_STORE_MAX_KEYS;
    for (let i = 0; i < excess; i++) memoryStore.delete(sorted[i][0]);
  }
}

function limitInMemory(key: string, max: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  pruneMemoryStore(now);

  const entry = memoryStore.get(key);

  if (!entry || now > entry.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, remaining: max - 1, retryAfterSeconds: 0 };
  }

  if (entry.count >= max) {
    return {
      limited: true,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count++;
  return { limited: false, remaining: max - entry.count, retryAfterSeconds: 0 };
}

/**
 * Atomic INCR + EXPIRE via the Upstash REST pipeline. A failure here must not
 * take the endpoint down, so callers get a fail-closed decision only for the
 * explicit "over limit" case; transport errors fall back to the local limiter.
 */
async function limitInRedis(
  key: string,
  max: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const windowSeconds = Math.ceil(windowMs / 1000);

  const res = await fetch(`${UPSTASH_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['INCR', key],
      ['EXPIRE', key, String(windowSeconds), 'NX'],
      ['TTL', key],
    ]),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Upstash responded ${res.status}`);

  const payload = (await res.json()) as Array<{ result?: number; error?: string }>;
  const count = Number(payload?.[0]?.result ?? 0);
  const ttl = Number(payload?.[2]?.result ?? windowSeconds);

  if (!Number.isFinite(count) || count <= 0) throw new Error('Unexpected Upstash payload');

  return {
    limited: count > max,
    remaining: Math.max(0, max - count),
    retryAfterSeconds: ttl > 0 ? ttl : windowSeconds,
  };
}

export async function rateLimit(
  identifier: string,
  { max, windowMs, prefix = 'rl' }: { max: number; windowMs: number; prefix?: string },
): Promise<RateLimitResult> {
  const key = `${prefix}:${identifier}`;

  if (hasDistributedRateLimit) {
    try {
      return await limitInRedis(key, max, windowMs);
    } catch (err) {
      console.error('[rate-limit] Upstash unavailable, falling back to in-memory:', err);
    }
  }

  return limitInMemory(key, max, windowMs);
}

/**
 * Resolve the client IP from headers we can actually trust.
 *
 * `x-vercel-ip-address` is set by the Vercel edge and cannot be spoofed by the
 * client. `cf-connecting-ip` is only trustworthy when Cloudflare genuinely
 * fronts the deployment — otherwise any client can set it and mint itself an
 * unlimited number of fresh rate-limit buckets, so it is opt-in via
 * TRUST_CLOUDFLARE_HEADERS. `x-forwarded-for` is likewise only consulted when
 * explicitly trusted.
 */
export function getClientIp(request: Request): string {
  const vercelIp = request.headers.get('x-vercel-ip-address');
  if (vercelIp) return vercelIp.trim();

  const trustProxyHeaders = process.env.TRUST_CLOUDFLARE_HEADERS === 'true';

  if (trustProxyHeaders) {
    const cfIp = request.headers.get('cf-connecting-ip');
    if (cfIp) return cfIp.trim();

    const xff = request.headers.get('x-forwarded-for');
    if (xff) return xff.split(',')[0].trim();
  }

  return 'unknown';
}
