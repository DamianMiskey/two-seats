# Security

Headers are set in `next.config.ts` via `headers()`, split into two groups:

## Baseline headers (all routes, including `/studio`)

`X-DNS-Prefetch-Control`, `Strict-Transport-Security` (2yr, includeSubDomains, preload) **production only**, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/microphone/geolocation/browsing-topics all denied). `poweredByHeader: false` removes the `X-Powered-By: Next.js` fingerprinting header.

### HSTS and `upgrade-insecure-requests` are dev-gated — do not remove the `isDev` checks

Both `Strict-Transport-Security` and the CSP's `upgrade-insecure-requests` directive tell the browser to force every request on this origin to HTTPS. The local dev server only speaks HTTP, so either one sent in dev breaks the app immediately — every asset request gets rewritten to `https://localhost:3000/...` and fails with a TLS error.

HSTS is the more dangerous of the two: browsers (Safari in particular — Chrome has a `localhost`-specific exemption, Safari does not) **cache the policy for the full `max-age`** once they receive it even once. Simply removing the header afterwards does not undo it client-side. If this ever regresses and someone hits it again in Safari on `localhost`:

1. Quit Safari.
2. Delete `~/Library/Cookies/HSTS.plist`.
3. Relaunch Safari.

(Or, as a quick unblock without touching browser state: load the dev server via `http://127.0.0.1:3000` instead of `http://localhost:3000` — HSTS policies are cached per-hostname, so the IP address is unaffected by a policy cached for the literal `localhost` host.)

Both directives in `next.config.ts` are gated behind `const isDev = process.env.NODE_ENV === "development"` — keep that gating if this file is edited again.

## Content-Security-Policy (all routes **except** `/studio`)

Applied via a second `headers()` entry matching `/((?!studio).*)`. Sanity Studio is excluded deliberately — it's a heavy client-side editor that needs `eval`, websockets, and inline styles to function, and locking it down is a separate, lower-priority effort from securing the public marketing site.

The policy (see `next.config.ts` for the literal string): `default-src 'self'`, `script-src`/`style-src` allow `'unsafe-inline'` (and `'unsafe-eval'` only in dev), `img-src` allows `cdn.sanity.io` for future Sanity-hosted images, `connect-src` allows Sanity API domains and Vercel's analytics/speed-insights endpoints, `frame-ancestors 'self'` (site can't be iframed cross-origin), `object-src 'none'`.

### Why `'unsafe-inline'` instead of nonces

Next.js's recommended strict CSP approach uses per-request nonces (via `proxy.ts`), but that **forces every page to render dynamically** — no static generation, no ISR, no CDN caching. This homepage is intentionally static so it can be served from the edge (see `progress.md` for the current fetch/fallback state). `'unsafe-inline'` is the documented tradeoff Next.js itself recommends for apps that don't need nonce-level strictness (see `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`, "Without Nonces" section).

**Revisit this if:** the site starts handling sensitive user input (forms collecting PII, payment info, auth) — at that point, move to the nonce-based `proxy.ts` pattern and accept the loss of static generation for the affected routes.

### Verifying headers

```bash
npm run build && npm run start
curl -sI http://localhost:3000/ | grep -i content-security-policy   # full CSP
curl -sI http://localhost:3000/studio | grep -i content-security-policy  # should be absent
```
