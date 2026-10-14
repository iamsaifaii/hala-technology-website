import * as Sentry from '@sentry/nextjs';

/**
 * Next.js 15+ / Sentry v9+ load server and edge SDK initialisation from this
 * file. The legacy `sentry.server.config.ts` / `sentry.edge.config.ts` files are
 * no longer read automatically, which is why error reporting was silently dead.
 */
export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return; // Not configured — stay a no-op rather than throwing.

  const common = {
    dsn,
    // 100% tracing is expensive and adds latency. Sample in production.
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
    debug: false,
    // Never ship request bodies / headers that may contain lead PII.
    sendDefaultPii: false,
  };

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init(common);
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init(common);
  }
}

export const onRequestError = Sentry.captureRequestError;
