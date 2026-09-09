import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_BODY_BYTES = 8_192; // 8 KB — more than enough for a booking form

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

// ─── Rate Limiting (in-memory, per-IP, sliding window) ───────────────────────
const RATE_LIMIT_MAX      = 5;
const RATE_LIMIT_WINDOW   = 15 * 60 * 1000; // 15 minutes in ms
const ipRequestMap         = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  // Never rate-limit in local development
  if (process.env.NODE_ENV === 'development') {
    return false;
  }

  // If IP is localhost or unknown in production, still apply rate limit key
  const safeIp = (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost' || ip === 'unknown')
    ? 'fallback_ip_slot'
    : ip;

  const now   = Date.now();
  const entry = ipRequestMap.get(safeIp);

  if (!entry || now > entry.resetAt) {
    ipRequestMap.set(safeIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Strip HTML tags, trim, and enforce a max length. Returns '' for non-strings. */
function sanitize(val: unknown, maxLen = 200): string {
  if (typeof val !== 'string') return '';
  return val.replace(/<[^>]*>/g, '').trim().slice(0, maxLen);
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

/** Extract client IP prioritizing trusted platform headers */
function getClientIp(request: Request): string {
  const vercelIp = request.headers.get('x-vercel-ip-address');
  if (vercelIp) return vercelIp.trim();

  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();

  return request.headers.get('x-real-ip')?.trim() ?? 'unknown';
}

// ─── Resend client (initialised once at module load) ─────────────────────────
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const DEFAULT_PABBLY_WEBHOOK_URL =
  'https://connect.pabbly.com/webhook-listener/webhook/IjU3NjMwNTZmMDYzNTA0M2Q1MjZjNTUzNiI_3D_pc/IjU3NjcwNTY4MDYzMjA0MzY1MjY0NTUzNjUxMzAi_pc';

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
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '900' } },
      );
    }

    // 2. Content-Type check
    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json({ error: 'Unsupported media type' }, { status: 415 });
    }

    // 3. Body size guard & parsing
    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }

    const rawBodyText = await request.text();
    if (rawBodyText.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }

    // 4. Parse & sanitize input
    let body: any;
    try {
      body = JSON.parse(rawBodyText);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
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

    // 4. Required-field validation
    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // 5. Enum allowlists
    const rawServices = Array.isArray(body.services) ? body.services : [];
    const services: string[] = rawServices
      .filter((s: unknown) => typeof s === 'string' && ALLOWED_SERVICES.includes(s))
      .slice(0, ALLOWED_SERVICES.length);

    const safeBudget        = ALLOWED_BUDGETS.includes(budget)        ? budget        : '';
    const safeHowDidYouHear = ALLOWED_SOURCES.includes(howDidYouHear) ? howDidYouHear : '';

    // 6. reCAPTCHA verification
    if (captchaToken) {
      const primarySecret = process.env.RECAPTCHA_SECRET_KEY;

      if (!primarySecret) {
        // Secret not configured — log server-side, skip verification gracefully
        console.warn('[reCAPTCHA] RECAPTCHA_SECRET_KEY env var is not set. Skipping verification.');
      } else {
        try {
          const verifyParams = new URLSearchParams();
          verifyParams.append('secret', primarySecret);
          verifyParams.append('response', captchaToken);

          const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: verifyParams.toString(),
          });
          const verifyData = await verifyRes.json();

          if (!verifyData.success) {
            // In development, skip blocking on reCAPTCHA failure to ease local testing.
            // In production, always enforce reCAPTCHA.
            if (process.env.NODE_ENV !== 'development') {
              return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 400 });
            }
            console.warn('[reCAPTCHA] Verification failed in dev mode — allowing request through for local testing.');
          }
        } catch (e) {
          console.error('[reCAPTCHA] Siteverify network exception:', e);
        }
      }
    } else if (process.env.RECAPTCHA_SECRET_KEY && !captchaToken) {
      return NextResponse.json({ error: 'reCAPTCHA token missing. Please complete the reCAPTCHA verification.' }, { status: 400 });
    }

    // 7. Build safe email HTML with HTML entity escaping
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

    // 8. Forward lead to Pabbly Connect Webhook
    const pabblyWebhookUrl = process.env.PABBLY_WEBHOOK_URL || DEFAULT_PABBLY_WEBHOOK_URL;
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
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pabblyPayload),
        });

        if (!pabblyRes.ok) {
          const errText = await pabblyRes.text().catch(() => '');
          console.warn(`[booking] Pabbly webhook returned status ${pabblyRes.status}:`, errText);
        } else {
          console.log('[booking] Successfully forwarded lead to Pabbly Connect');
        }
      } catch (pabblyErr) {
        console.error('[booking] Failed to send lead to Pabbly Connect webhook:', pabblyErr);
      }
    }

    // 9. Send email via Resend
    if (resend) {
      const { error: sendError } = await resend.emails.send({
        from: 'Hala Booking <Contact@halatechnology.ae>',
        to:   ['Contact@halatechnology.ae'],
        subject: `New Booking: ${name} — ${date} at ${time}`,
        html: htmlContent,
      });

      if (sendError) {
        console.error('[booking] Resend error:', sendError);
        return NextResponse.json({ error: 'Failed to send notification email' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[booking] Unhandled error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
