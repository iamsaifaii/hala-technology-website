# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅        |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it
**privately** by emailing: **Contact@halatechnology.ae**

Please include:
- A clear description of the issue
- Steps to reproduce
- Potential impact
- Any suggested mitigations

We will respond within **48 hours** and aim to release a fix within **7 days**
for critical issues.

**Do NOT open a public GitHub issue for security vulnerabilities.**

---

## Security Measures in Place

### Application
- **Content Security Policy** enforced in production, with a separate, deliberately
  scoped policy for `/studio` (Sanity Studio requires `unsafe-eval` and `blob:`
  workers). The two policies are mutually exclusive via a negative-lookahead
  `source` so only one CSP header is ever sent per request.
- Security headers on all responses: HSTS (preload), `X-Frame-Options: DENY`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP,
  and `X-XSS-Protection: 0` (the legacy auditor is harmful; CSP is the control).
- `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`,
  `form-action 'self'`.
- Source maps disabled in production; `console.*` stripped except `error`/`warn`.

### Booking API (`/api/book`)
- **Fails closed on reCAPTCHA.** A verification failure, a missing secret, or a
  network/timeout error all reject the request in production. Tokens are bound to
  our own hostname so a token minted elsewhere with the same site key is refused.
- **Rate limited** per client IP. Uses a shared Upstash Redis counter when
  configured; otherwise a bounded, self-pruning in-memory limiter.
- **IP spoofing resistant.** Only `x-vercel-ip-address` is trusted by default.
  `cf-connecting-ip` / `x-forwarded-for` are honoured only when
  `TRUST_CLOUDFLARE_HEADERS=true`, because they are client-settable otherwise.
- **Bounded body reads.** The payload is capped while streaming, so an oversized
  request is never fully buffered into memory.
- Strict input handling: enum allowlists, de-duplication, email and calendar-date
  validation, control-character stripping, HTML entity escaping in outbound mail.
- Explicit `405` on all non-POST methods.

### Content & CMS
- `/api/revalidate` verifies the Sanity webhook signature before acting.
- JSON-LD is rendered server-side through a single `JsonLd` component that escapes
  `<` as `<`, so CMS-authored values cannot break out of the `<script>` element.
- Rich-text links from the CMS are parsed with `new URL()` and matched on exact
  hostname; non-`http(s)` schemes (`javascript:`, `data:`) are dropped.
- The image optimizer accepts only exact hostnames with pathname constraints —
  no wildcard subdomains, which would make `/_next/image` an open proxy.

### Privacy
- Google Consent Mode v2 defaults to **denied** before GTM loads.
- HubSpot and LeadConnector are not injected at all until consent is granted.

---

## Secret Handling

- `.env.local` is gitignored and contains only variables the application actually
  reads. Credentials for unused services must not be reintroduced — each one is
  attack surface with no benefit.
- `PABBLY_WEBHOOK_URL` has **no hardcoded fallback**. It is an unauthenticated
  ingestion endpoint and must be treated as a secret.
- `SANITY_REVALIDATE_SECRET` must be high-entropy random, not a passphrase:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
  The same value must be set in Sanity → API → Webhooks.

### ⚠️ Rotation still outstanding

> Secrets previously exposed in git history must be treated as **compromised**.
> Rewriting history does not un-leak them — anyone who cloned before the rewrite
> still holds them. Rotating these is a manual step in each provider's console
> and has **not** been done by the codebase cleanup.

| Secret | Action | Status |
|---|---|---|
| `RECAPTCHA_SECRET_KEY` | Regenerate in Google reCAPTCHA Admin | ⬜ pending |
| `RESEND_API_KEY` | Revoke + reissue in Resend | ⬜ pending |
| `PABBLY_WEBHOOK_URL` | Regenerate the webhook in Pabbly (the old URL was committed to source) | ⬜ pending |
| `SANITY_REVALIDATE_SECRET` | Replace with 32 random bytes; update Sanity webhook | ⬜ pending |
| `SANITY_API_WRITE_TOKEN` | **Revoke** in Sanity → API → Tokens (no longer used) | ⬜ pending |
| `DATABASE_URI` (Neon) | **Revoke** — Payload CMS is not used | ⬜ pending |
| `CLOUDINARY_API_SECRET` | **Revoke** — Cloudinary is not used | ⬜ pending |
| `PAYLOAD_SECRET`, `JWT_SECRET` | Discard — no longer referenced | ⬜ pending |
| Admin / SEO / Ads passwords | Change at the identity provider | ⬜ pending |

Removed from `.env.local` on 2026-10-14: 17 unused variables. Removing them from
the file does **not** revoke them — do that at the provider.

---

## Dependency Posture

`npm audit` reports no **critical** vulnerabilities. The remaining high-severity
advisories are all build-time/CLI tooling reached through the `sanity` package
(`@sanity/cli`, `@sanity/codegen`) and ESLint tooling. None of them appear in the
Next.js deployment file trace, i.e. none are shipped or executed in production —
verified by inspecting `.next/**/*.nft.json`.

`npm audit fix --force` would churn 400+ packages and still not clear them, so it
is deliberately not applied. Re-check after each `sanity` major upgrade.
