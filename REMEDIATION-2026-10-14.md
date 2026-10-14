# Remediation Record — 2026-10-14

Companion to `AUDIT-2026-10-14.md`. Every item below was applied and verified
against a real production build and a running `next start` server, not assumed.

**Baseline after remediation:** `tsc --noEmit` clean · `npm run build` exit 0 ·
`npm audit` **0 critical** (was 1) · public assets 25 MB → 17 MB.

---

## Critical

### C1 — Next.js RCEs ✅
`next` **16.2.12 → 16.4.0**, `eslint-config-next` bumped to match.
Closes all three critical RCEs (Windows host, AVIF image optimizer, `next/og`),
the Image-Optimization SSRF, both SSG/ISR cache-poisoning advisories and the
`dynamicParams` metadata disclosure.

*Verified:* `npm audit` critical count 1 → **0**.

---

## High

### H1 — Secret rotation ⚠️ **ACTION REQUIRED (yours, not code)**
Rotation happens in each provider's console and cannot be done from the repo.
The outstanding list with status checkboxes now lives in `SECURITY.md`.
Most urgent: `PABBLY_WEBHOOK_URL` (was committed to source) and
`SANITY_REVALIDATE_SECRET` (was a guessable `my-su…` passphrase).

### H2 — Unused secrets purged ✅
**17 variables removed** from `.env.local`: `SANITY_API_WRITE_TOKEN`,
`DATABASE_URI`, `PAYLOAD_SECRET`, `JWT_SECRET`, `CLOUDINARY_*` (×3),
`ADMIN_USER_*` / `SEO_USER_*` / `ADS_USER_*` (×9), `NEXT_PUBLIC_SERVER_URL`.
`.env.example` rewritten to document only what the app reads.

> Deleting them from the file does not revoke them — see H1.
> Original file backed up to the session scratchpad before editing.

### H3 — Rate limiting rebuilt ✅
New `src/lib/rate-limit.ts`:
- Shared **Upstash Redis** counter (atomic `INCR`+`EXPIRE`, no SDK dependency)
  when `UPSTASH_REDIS_REST_URL`/`_TOKEN` are set — the only config that holds
  across serverless instances.
- Otherwise a **bounded, self-pruning** in-memory limiter (10k key cap, periodic
  sweep) — the old `Map` grew without limit.
- `getClientIp()` trusts only `x-vercel-ip-address`; `cf-connecting-ip` and
  `x-forwarded-for` are opt-in via `TRUST_CLOUDFLARE_HEADERS` because they are
  client-settable otherwise.
- Emits `RateLimit-Limit` / `RateLimit-Remaining` / `Retry-After`.

*Verified live:* 6th POST → `429`, `retry-after: 877`, `ratelimit-remaining: 0`.

### H4 — Hardcoded CRM webhook removed ✅
`DEFAULT_PABBLY_WEBHOOK_URL` deleted. The route now reads
`process.env.PABBLY_WEBHOOK_URL` only and logs a warning when unset.
Outbound call also gained an 8s timeout.

### H5 — reCAPTCHA now fails closed ✅
- Network error / non-2xx / timeout (5s `AbortController`) → **rejection**, was
  "log and continue".
- Missing secret in production → **503**, was "skip verification".
- Added **hostname binding** (`data.hostname` must be `halatechnology.ae`), so a
  token minted on another property with the same site key is refused.
- `remoteip` forwarded to Google for better scoring.

*Verified live:* no token → `400`; the old fall-through path is gone.

### H6 — robots.txt shadowing fixed ✅
Deleted `public/robots.txt`, which was shadowing `src/app/robots.ts` and serving
a bare `Allow: /`.

*Verified live:* `/robots.txt` now returns `Disallow: /api/` + `/studio/`.

### H7 — Canonical URLs fixed ✅
Removed `alternates.canonical` from the root layout (it was silently inherited)
and added explicit canonicals to `/faqs`, `/privacy-policy`, `/cookie-policy`,
`/terms-and-conditions`.

*Verified in built HTML:* all four now emit their own URL, not the homepage.

---

## Medium

| ID | Fix | Verification |
|---|---|---|
| **M1** | Separate relaxed CSP for `/studio` (`unsafe-eval`, `worker-src blob:`, Sanity hosts). Site rule narrowed to `/((?!studio).*)` so only **one** CSP header is ever sent. | Live: `/` strict, `/studio` relaxed, header count = 1 |
| **M2** | Body read via a streaming reader that aborts past 8 KB — oversized payloads are no longer buffered first. | Live: 20 KB POST → `413` |
| **M3** | Blog slug fallback now uses an `unstable_cache`'d slug→id index (1h, tagged `posts`) instead of fetching every slug on each miss. | Build clean; query count per 404 drops from 2 to ~0 |
| **M4** | `useCdn: true` — all Sanity reads now hit the edge cache. | `src/sanity/env.ts` |
| **M5** | Studio layout no longer renders a second `<html>`/`<body>`; added `robots: noindex`. | Build clean, no nested document |
| **M6** | Sentry rewired for Next 16 / v10: new `instrumentation.ts` (+ `onRequestError`) and `instrumentation-client.ts` (+ `onRouterTransitionStart`); legacy `sentry.*.config.ts` deleted; `transpileClientSDK` removed; traces 1.0 → 0.1 and replay 0.1 → 0.01 in production; `sendDefaultPii: false`. Stays a clean no-op while the DSN is unset. | Build clean |
| **M7** | Real consent gating: Consent Mode v2 defaults to **denied** before GTM; `src/lib/consent.ts` + `ConsentGatedScripts` inject HubSpot / LeadConnector only after Accept; CookieBanner now drives that state. | Live: all 3 trackers absent from initial HTML |
| **M8** | New `JsonLd` component renders a real server-side `<script type="application/ld+json">` and escapes `<` as `<`. All three schema sites migrated off `next/script`. Blog schema also gained `dateModified`, `mainEntityOfPage` and `publisher`. | Live: real tag in SSR HTML; escaping unit-checked |
| **M9** | `remotePatterns` reduced to 3 exact hostnames with `pathname` constraints; wildcard `*.filesafe.space` / `*.highlevelcontent.com` and unused `i.pravatar.cc` removed. | `next.config.mjs` |

---

## Low / Polish

| ID | Fix |
|---|---|
| **L1** | `sharp` 0.35.3 → **0.35.5** (fixes the libheif and librsvg advisories). Required updating the `overrides` pin, which was holding it back. Now clean in `npm audit`. |
| **L2** | `frame-src` now allows `googletagmanager.com` — the `<noscript>` GTM iframe was CSP-blocked. |
| **L3** | HubSpot script switched from protocol-relative `//js-na2…` to explicit `https://`. |
| **L4** | `/faqs`, `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy` added to the sitemap. |
| **L5** | `export const revalidate = 3600` on the sitemap — it re-queried Sanity on every crawl. |
| **L6** | Images recompressed (max 2000px, mozjpeg q82 / PNG effort 9). **25 MB → 17 MB**, all 81 files intact. `salman.jpg` 4162 KB → 135 KB, `featureimage.jpg` 1350 → 178 KB, `MS.jpg` 916 → 193 KB. Originals backed up to the session scratchpad. |
| **L7** | 7 assets renamed to lowercase-kebab (`rodeo .jpeg` → `rodeo.jpeg`, `Salman.JPG` → `salman.jpg`, …) and all 7 referencing components updated. Zero files with spaces remain, zero stale references. |
| **L8** | `loading="lazy"` + `decoding="async"` added to the remaining raw `<img>` marquee/showcase tags. |
| **L9** | `priority` removed from the below-the-fold footer logo (it competed with the real LCP element); now explicitly lazy. |
| **L10** | Booking dates validated — must parse to a real calendar date, not in the past, within 2 years. |
| **L11** | `services[]` de-duplicated via `Set`. |
| **L12** | `replyTo` added to booking emails so replies reach the lead. |
| **L13** | CMS link marks parsed with `new URL()` and matched on exact hostname; `javascript:`/`data:` schemes dropped. `https://evil.com/?r=halatechnology.ae` is no longer treated as internal. |
| **L14** | *Not applied* — see below. |

---

## Deliberately not done

**L14 — client-component split (68% of components are `'use client'`).**
Reducing this means restructuring GSAP/Framer-driven sections, which is a
refactor with real regression risk across 89 files, not a fix. The homepage ships
~890 KB uncompressed (~280 KB gzipped) which is acceptable for an animation-heavy
marketing site. Worth scheduling deliberately, with visual QA.

**Full `(site)` route-group restructure for M5.**
The textbook fix for the nested-`<html>` bug is two sibling root layouts, which
requires moving every route plus the special `sitemap.ts` / `robots.ts` files.
The actual defect — invalid nested document — is fully fixed by making the studio
layout a normal nested layout. The restructure was not worth the blast radius.

**`npm audit fix --force`.**
Would churn 400+ packages (including a `sanity` major) and still leave all 30
advisories. The 16 remaining high-severity packages were confirmed absent from
the Next.js deployment trace (`.next/**/*.nft.json`) — they are CLI/build tooling
that never runs in production.

---

## Follow-ups for you

1. **Rotate the secrets in `SECURITY.md`** — the only remaining security gap, and
   it cannot be done from the repo.
2. **Add Upstash credentials** (`UPSTASH_REDIS_REST_URL` / `_TOKEN`). Until then
   the booking limiter is per-instance and will not hold on Vercel.
3. **Load `/studio` on production once** after deploying to confirm the relaxed
   CSP is correct for your Sanity version — it was verified by header, not by a
   full studio session.
4. **Re-point the Sanity webhook** after rotating `SANITY_REVALIDATE_SECRET`, or
   blog revalidation will silently stop.
5. Optional: set `NEXT_PUBLIC_SENTRY_DSN` to switch error monitoring on, or drop
   `@sentry/nextjs` entirely if you do not want it.
