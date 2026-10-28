# Progress

_Last updated: 2026-10-28_

## Status

The site repositioned from a general brand/product studio pitch to a focused website-audit, care & security, and improvements offering for small/medium businesses, and grew from a single homepage into a four-page site: home (`/`), `/about`, `/services`, `/contact` — sharing `Nav`/`Footer` across routes. The homepage keeps its sticky nav, GSAP hero entrance timeline, Services teaser, Approach (Connect/Create/Collaborate), and Contact CTA band. The `Work` and `Testimonials` sections were removed outright (no replacement — there's no project imagery or client testimonial copy yet). `/about`, `/services`, and `/contact` use the new `PageHero` gradient banner instead of the animated `Hero`. GSAP ScrollTrigger scroll-reveal animations are used throughout. Security headers (CSP + standard hardening headers) are live. Details in `architecture.md`, `brand.md`, `security.md`.

## What's real vs. placeholder

- **Real / production-quality:** page/route structure, component architecture, styling system, GSAP animation patterns, security headers, the fetch/fallback resilience pattern for CMS content, the `lib/content/services.ts` data model shared across three pages.
- **Placeholder:** all copy (Services, Approach, Contact, About, and the `services.ts` content) is written directly in code — no CMS backing, see "Content" in `architecture.md`. `ContactForm` doesn't submit anywhere real — it builds a `mailto:` link on submit rather than posting to an API or form backend; treat this as a stand-in until a real submission endpoint exists.

## Sanity (connected)

All page copy, services, care plans, team members and site settings come from Sanity, with the current copy as a field-by-field fallback (`lib/content/fallback.ts`). Sanity 6 with Live Content API, Presentation/Visual Editing, TypeGen and a branded Studio hosted at twoseats.sanity.studio. Setup and security: `sanity.md`.

To finish setting it up: `npx sanity login`, `npm run seed`, `npm run studio:deploy`, then the CORS origins, roles, 2FA and the preview token in `sanity.md`. The old `homepage` document (maintenance-mode copy) is no longer read and can be deleted in the Studio's Vision tool or left alone.

## Not done / explicit follow-ups

- Logo is a CMYK JPEG on a white background (see `brand.md`) — works for now via careful placement, but a vector/RGB version is recommended before a real launch.
- `ContactForm` (`/contact`) has no real submission backend — it opens a `mailto:` link pre-filled from the form fields rather than posting anywhere; wire it to a real endpoint/form service before launch.
- CSP uses `'unsafe-inline'` rather than nonces, trading strictness for static generation — see `security.md` for when to revisit. `ContactForm` is a client-side form on `/contact`, so if PII-handling ever needs the CSP tightened, this is the page that would force the nonce-based `proxy.ts` migration first.
- `styled-components` looks unused but is a required peer dependency of `sanity` / `next-sanity`; keep it.
