# Progress

_Last updated: 2026-08-24_

## Status

The site repositioned from a general brand/product studio pitch to a focused website-audit, care & security, and improvements offering for small/medium businesses, and grew from a single homepage into a four-page site: home (`/`), `/about`, `/services`, `/contact` — sharing `Nav`/`Footer` across routes. The homepage keeps its sticky nav, GSAP hero entrance timeline, Services teaser, Approach (Connect/Create/Collaborate), and Contact CTA band. The `Work` and `Testimonials` sections were removed outright (no replacement — there's no project imagery or client testimonial copy yet). `/about`, `/services`, and `/contact` use the new `PageHero` gradient banner instead of the animated `Hero`. GSAP ScrollTrigger scroll-reveal animations are used throughout. Security headers (CSP + standard hardening headers) are live. Details in `architecture.md`, `brand.md`, `security.md`.

## What's real vs. placeholder

- **Real / production-quality:** page/route structure, component architecture, styling system, GSAP animation patterns, security headers, the fetch/fallback resilience pattern for CMS content, the `lib/content/services.ts` data model shared across three pages.
- **Placeholder:** all copy (Services, Approach, Contact, About, and the `services.ts` content) is written directly in code — no CMS backing, see "Content" in `architecture.md`. `ContactForm` doesn't submit anywhere real — it builds a `mailto:` link on submit rather than posting to an API or form backend; treat this as a stand-in until a real submission endpoint exists.

## Known deliberate gap: Sanity content is disconnected

`lib/sanity/getHomepageContent.ts` has a `USE_SANITY_CONTENT = false` flag that **bypasses the live Sanity fetch** and always serves the local fallback copy (`lib/sanity/homepage-fallback.ts`).

**Why:** the live Sanity `homepage` document still holds copy written for an even earlier maintenance-mode page ("We're turning up the fun while we rebuild.", tagline "Maintenance mode", etc) — it predates both this redesign and the studio/product-agency copy that came before it. The Sanity schema (`sanity/schemaTypes/homepageType.ts`) wasn't changed, so the fetch still succeeds — it just returns stale messaging that doesn't match the current website-audit/care/security positioning. Serving it as-is would have shipped a homepage with mismatched hero copy.

**Before going live, do one of:**
1. Update the actual Sanity `homepage` document (via Studio at `/studio`) to match the new copy in `lib/sanity/homepage-fallback.ts`, then flip `USE_SANITY_CONTENT` back to `true`.
2. Or decide the hero should stay code-defined (not CMS-editable) and remove the Sanity fetch path entirely, keeping only the fallback constants.

No other section is CMS-driven yet — Services (`lib/content/services.ts`), Approach, and Contact/About copy would need new Sanity schema types if they're meant to be editable later (see "Extending this later" in `architecture.md`).

## Not done / explicit follow-ups

- Logo is a CMYK JPEG on a white background (see `brand.md`) — works for now via careful placement, but a vector/RGB version is recommended before a real launch.
- `ContactForm` (`/contact`) has no real submission backend — it opens a `mailto:` link pre-filled from the form fields rather than posting anywhere; wire it to a real endpoint/form service before launch.
- CSP uses `'unsafe-inline'` rather than nonces, trading strictness for static generation — see `security.md` for when to revisit. `ContactForm` is a client-side form on `/contact`, so if PII-handling ever needs the CSP tightened, this is the page that would force the nonce-based `proxy.ts` migration first.
- `styled-components` remains an installed but unused dependency (pre-existing, not introduced by this redesign) — safe to remove if nothing starts using it.
- `/studio` (Sanity Studio) intentionally has no CSP applied — see `security.md`.
