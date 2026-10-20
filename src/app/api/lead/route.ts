import { NextResponse } from 'next/server';

import { getClientIp, hasDistributedRateLimit, rateLimit } from '@/lib/rate-limit';

/**
 * Lightweight lead capture for the hero "Request a Call" forms.
 *
 * Those forms previously did nothing but open the booking modal, so a visitor
 * who typed an email and then abandoned the modal was lost entirely — nothing
 * ever reached the CRM. This endpoint forwards the address to the same Pabbly
 * webhook as /api/book the moment it is submitted, tagged with its source page.
 *
 * Deliberately NOT reCAPTCHA-gated: it fires on the hero form, before any
 * challenge is rendered, so abuse is held back by rate limiting and a strict
 * payload shape instead. It cannot send email or do anything beyond posting a
 * single address to the CRM webhook.
 */

const MAX_BODY_BYTES = 2_048;

// Tighter than the booking form: this is a one-field, zero-friction endpoint.
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

const isProduction = process.env.NODE_ENV === 'production';

/** Sources the UI is allowed to declare — prevents arbitrary strings in the CRM. */
const ALLOWED_SOURCES = [
  'hero-form',
  'home-hero',
  'seo-hero',
  'ppc-hero',
  'smm-hero',
  'digital-marketing-hero',
  'branding-hero',
  'graphic-design-hero',
  'video-editing-hero',
  'content-creation-hero',
  'ai-agent-hero',
  'whatsapp-hero',
];

function sanitize(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Read the body with a hard cap, without buffering an oversized payload. */
async function readBodyWithLimit(request: Request, maxBytes: number): Promise<string | null> {
  const body = request.body;
  if (!body) return '';

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      received += value.byteLength;
      if (received > maxBytes) {
        await reader.cancel().catch(() => {});
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock?.();
  }

  const merged = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

export async function GET()    { return methodNotAllowed(); }
export async function PUT()    { return methodNotAllowed(); }
export async function PATCH()  { return methodNotAllowed(); }
export async function DELETE() { return methodNotAllowed(); }
function methodNotAllowed() {
  return NextResponse.json({ error: 'Method not allowed' }, {
    status: 405,
    headers: { Allow: 'POST' },
  });
}

export async function POST(request: Request) {
  try {
    // 1. Rate limit
    const clientIp = getClientIp(request);
    const limit = await rateLimit(clientIp, {
      max: RATE_LIMIT_MAX,
      windowMs: RATE_LIMIT_WINDOW,
      prefix: 'lead',
    });

    if (limit.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(limit.retryAfterSeconds || 900),
            'RateLimit-Limit': String(RATE_LIMIT_MAX),
            'RateLimit-Remaining': '0',
          },
        },
      );
    }

    // 2. Content-Type
    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json({ error: 'Unsupported media type' }, { status: 415 });
    }

    // 3. Body size
    const declaredLength = Number(request.headers.get('content-length') ?? 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }

    const rawBodyText = await readBodyWithLimit(request, MAX_BODY_BYTES);
    if (rawBodyText === null) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }

    // 4. Parse
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBodyText);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // 5. Validate
    const email = sanitize(body.email, 150);
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const rawSource = sanitize(body.source, 50);
    const source = ALLOWED_SOURCES.includes(rawSource) ? rawSource : 'hero-form';
    const pageUrl = sanitize(body.pageUrl, 255);

    // 6. Forward to the CRM webhook (same destination as /api/book)
    const webhookUrl = process.env.PABBLY_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn('[lead] PABBLY_WEBHOOK_URL is not set — lead was not forwarded to the CRM.');
      // Still report success: the visitor did nothing wrong, and the booking
      // modal is already open in front of them.
      return NextResponse.json({ success: true, forwarded: false });
    }

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          pageUrl,
          // Marks this as an email-only capture so it can be routed or
          // de-duplicated separately from a completed booking in GHL.
          leadType: 'partial',
          name: '',
          submittedAt: new Date().toISOString(),
          ip: clientIp,
        }),
        signal: AbortSignal.timeout(8_000),
        cache: 'no-store',
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        console.warn(`[lead] CRM webhook returned status ${res.status}:`, errText);
        return NextResponse.json({ success: true, forwarded: false });
      }
    } catch (err) {
      console.error('[lead] Failed to forward lead to the CRM webhook:', err);
      return NextResponse.json({ success: true, forwarded: false });
    }

    return NextResponse.json(
      { success: true, forwarded: true },
      {
        headers: {
          'RateLimit-Limit': String(RATE_LIMIT_MAX),
          'RateLimit-Remaining': String(limit.remaining),
        },
      },
    );
  } catch (error) {
    console.error('[lead] Unhandled error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

if (isProduction && !hasDistributedRateLimit) {
  console.warn(
    '[lead] UPSTASH_REDIS_REST_URL/TOKEN are not configured. Rate limiting is ' +
      'per-instance only and will not hold across serverless invocations.',
  );
}
