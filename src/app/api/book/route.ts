import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { getClientIp, hasDistributedRateLimit, rateLimit } from '@/lib/rate-limit';

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_BODY_BYTES = 8_192; // 8 KB — more than enough for a booking form

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

const SITE_HOSTNAME = 'halatechnology.ae';

const isProduction = process.env.NODE_ENV === 'production';

// Allowed values for enum fields — prevents injection of arbitrary values
const ALLOWED_SERVICES = [
  'Brand Strategy',
  'Marketing',
  'SEO Optimization',
  'Web App Development',
  'CRM',
  'Marketing Automation',
];
const ALLOWED_BUDGETS = [
  '< 3,500 AED',
  '3,500 AED - 18,000 AED',
  '18,000 AED - 35,000 AED',
  '> 35,000 AED',
];
const ALLOWED_SOURCES = ['Google Search', 'Social Media', 'Referral', 'Other'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Strip HTML tags, collapse control characters, trim, enforce a max length. */
function sanitize(val: unknown, maxLen = 200): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/<[^>]*>/g, '')
    // Strip control characters (incl. CR/LF) so nothing can forge structure in
    // the outbound email subject or the webhook payload.
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim()
    .slice(0, maxLen);
}

/** Escapes special HTML characters to prevent HTML/template injection in email clients */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * The client sends a locale-formatted date such as "Mon, Jan 5, 2026".
 * Accept it only if it parses to a real calendar date that is not in the past.
 */
function isValidBookingDate(value: string): boolean {
  if (!value) return false;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return false;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Reject anything before today, or absurdly far in the future (2 years).
  const twoYearsOut = new Date(startOfToday);
  twoYearsOut.setFullYear(twoYearsOut.getFullYear() + 2);

  return parsed >= startOfToday && parsed <= twoYearsOut;
}

/** Read the body with a hard cap, without buffering an oversized payload first. */
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
        return null; // signals "too large" — the stream is abandoned, not buffered
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

/** Verify a reCAPTCHA token. Any failure, including a transport error, is a rejection. */
async function verifyCaptcha(token: string, remoteIp: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  const params = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== 'unknown') params.append('remoteip', remoteIp);

  // Bound the call so a hanging Google endpoint cannot stall the request.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`[reCAPTCHA] siteverify returned ${res.status}`);
      return false;
    }

    const data = (await res.json()) as { success?: boolean; hostname?: string };
    if (!data.success) return false;

    // Bind the token to our own property so a token minted elsewhere with the
    // same site key cannot be replayed here. Localhost is allowed off-prod.
    if (data.hostname) {
      const host = data.hostname.toLowerCase();
      const hostAllowed =
        host === SITE_HOSTNAME ||
        host.endsWith(`.${SITE_HOSTNAME}`) ||
        (!isProduction && (host === 'localhost' || host === 'testkey.google.com'));

      if (!hostAllowed) {
        console.error(`[reCAPTCHA] Rejected token issued for hostname "${data.hostname}"`);
        return false;
      }
    }

    return true;
  } catch (err) {
    console.error('[reCAPTCHA] Verification failed (treated as rejection):', err);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Resend client (initialised once at module load) ─────────────────────────
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// ─── Route Handlers ──────────────────────────────────────────────────────────

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
      prefix: 'book',
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

    // 2. Content-Type check
    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json({ error: 'Unsupported media type' }, { status: 415 });
    }

    // 3. Body size guard — rejects by declared length first, then enforces the
    //    cap while streaming so an oversized payload is never fully buffered.
    const declaredLength = Number(request.headers.get('content-length') ?? 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }

    const rawBodyText = await readBodyWithLimit(request, MAX_BODY_BYTES);
    if (rawBodyText === null) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }

    // 4. Parse & sanitize input
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBodyText);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const name          = sanitize(body.name,          100);
    const email         = sanitize(body.email,         150);
    const jobTitle      = sanitize(body.jobTitle,      100);
    const country       = sanitize(body.country,       100);
    const budget        = sanitize(body.budget,         50);
    const howDidYouHear = sanitize(body.howDidYouHear,  50);
    const message       = sanitize(body.message,      1000);
    const date          = sanitize(body.date,           60);
    const time          = sanitize(body.time,           20);
    const captchaToken  = typeof body.captchaToken === 'string' ? body.captchaToken : '';

    // 5. Required-field validation
    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (!isValidBookingDate(date)) {
      return NextResponse.json(
        { error: 'Please choose a valid booking date.' },
        { status: 400 },
      );
    }

    // 6. Enum allowlists (de-duplicated so the same value cannot be repeated)
    const rawServices = Array.isArray(body.services) ? body.services : [];
    const services: string[] = [
      ...new Set(
        rawServices.filter(
          (s: unknown): s is string => typeof s === 'string' && ALLOWED_SERVICES.includes(s),
        ),
      ),
    ];

    const safeBudget        = ALLOWED_BUDGETS.includes(budget)        ? budget        : '';
    const safeHowDidYouHear = ALLOWED_SOURCES.includes(howDidYouHear) ? howDidYouHear : '';

    // 7. reCAPTCHA — fail closed.
    //    A missing secret in production is a misconfiguration, not a reason to
    //    accept unverified traffic. Transport errors are rejections too.
    if (isProduction) {
      if (!process.env.RECAPTCHA_SECRET_KEY) {
        console.error('[reCAPTCHA] RECAPTCHA_SECRET_KEY is not set — refusing to accept bookings.');
        return NextResponse.json(
          { error: 'Booking is temporarily unavailable. Please contact us directly.' },
          { status: 503 },
        );
      }

      if (!captchaToken) {
        return NextResponse.json(
          { error: 'Please complete the reCAPTCHA verification.' },
          { status: 400 },
        );
      }

      if (!(await verifyCaptcha(captchaToken, clientIp))) {
        return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 400 });
      }
    } else if (captchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      // Outside production, verify when we can but never block local testing.
      const ok = await verifyCaptcha(captchaToken, clientIp);
      if (!ok) console.warn('[reCAPTCHA] Verification failed — allowed through (non-production).');
    }

    // 8. Build safe email HTML with HTML entity escaping
    const escapedName          = escapeHtml(name);
    const escapedEmail         = escapeHtml(email);
    const escapedJobTitle      = escapeHtml(jobTitle);
    const escapedCountry       = escapeHtml(country);
    const escapedDate          = escapeHtml(date);
    const escapedTime          = escapeHtml(time);
    const escapedBudget        = escapeHtml(safeBudget);
    const escapedHowDidYouHear = escapeHtml(safeHowDidYouHear);
    const escapedMessage       = escapeHtml(message);

    const htmlContent = `
      <div style="font-family: sans-serif; padding: 20px; max-width: 640px;">
        <h2 style="color: #111; border-bottom: 2px solid #eee; padding-bottom: 8px;">New Booking Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; width: 35%;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapedName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapedEmail}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Job Title:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapedJobTitle}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Country:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapedCountry}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapedDate}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapedTime}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Budget:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapedBudget}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Source:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapedHowDidYouHear}</td></tr>
        </table>

        <h3 style="margin-top: 20px; color: #111;">Services Interested In:</h3>
        <ul style="margin: 0; padding-left: 20px;">
          ${services.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
        </ul>

        <h3 style="color: #111;">Message / Topic:</h3>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${escapedMessage}</p>
      </div>
    `;

    // 9. Forward lead to the CRM webhook.
    //    No hardcoded fallback: the endpoint is unauthenticated, so committing
    //    it would let anyone inject leads straight into the sales pipeline.
    const pabblyWebhookUrl = process.env.PABBLY_WEBHOOK_URL;
    if (pabblyWebhookUrl) {
      try {
        const pabblyPayload = {
          name,
          email,
          jobTitle,
          country,
          date,
          time,
          budget: safeBudget,
          howDidYouHear: safeHowDidYouHear,
          services: services.join(', '),
          servicesList: services,
          message,
          pageUrl: sanitize(body.pageUrl, 255),
          ip: clientIp,
          submittedAt: new Date().toISOString(),
        };

        const pabblyRes = await fetch(pabblyWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pabblyPayload),
          signal: AbortSignal.timeout(8_000),
          cache: 'no-store',
        });

        if (!pabblyRes.ok) {
          const errText = await pabblyRes.text().catch(() => '');
          console.warn(`[booking] CRM webhook returned status ${pabblyRes.status}:`, errText);
        }
      } catch (pabblyErr) {
        console.error('[booking] Failed to forward lead to the CRM webhook:', pabblyErr);
      }
    } else {
      console.warn('[booking] PABBLY_WEBHOOK_URL is not set — lead was not forwarded to the CRM.');
    }

    // 10. Send email via Resend
    if (resend) {
      const { error: sendError } = await resend.emails.send({
        from: 'Hala Booking <Contact@halatechnology.ae>',
        to: ['Contact@halatechnology.ae'],
        replyTo: email, // reply goes straight to the lead
        subject: `New Booking: ${name} — ${date} at ${time}`,
        html: htmlContent,
      });

      if (sendError) {
        console.error('[booking] Resend error:', sendError);
        return NextResponse.json({ error: 'Failed to send notification email' }, { status: 500 });
      }
    }

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'RateLimit-Limit': String(RATE_LIMIT_MAX),
          'RateLimit-Remaining': String(limit.remaining),
        },
      },
    );
  } catch (error) {
    console.error('[booking] Unhandled error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

if (isProduction && !hasDistributedRateLimit) {
  console.warn(
    '[booking] UPSTASH_REDIS_REST_URL/TOKEN are not configured. Rate limiting is ' +
      'per-instance only and will not hold across serverless invocations.',
  );
}
