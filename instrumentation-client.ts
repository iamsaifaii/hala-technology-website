import * as Sentry from '@sentry/nextjs';

/**
 * Next.js 15+ / Sentry v9+ load browser SDK initialisation from this file.
 * The legacy `sentry.client.config.ts` is no longer read automatically.
 */
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
    debug: false,
    sendDefaultPii: false,

    // Session Replay is heavy. Keep error replays, sample normal sessions low.
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.01,

    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
