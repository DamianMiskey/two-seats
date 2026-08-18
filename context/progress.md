# Progress

_Last updated: 2026-08-18_

## Status

The site moved from a single-section "maintenance mode" placeholder to a full multi-section agency homepage: sticky nav, hero, Services, Work, Approach (Connect/Create/Collaborate), Testimonials, Contact, footer — with GSAP ScrollTrigger scroll-reveal animations throughout and a hero entrance timeline. Security headers (CSP + standard hardening headers) are live. Details in `architecture.md`, `brand.md`, `security.md`.

## What's real vs. placeholder

- **Real / production-quality:** page structure, component architecture, styling system, GSAP animation patterns, security headers, the fetch/fallback resilience pattern for CMS content.
- **Placeholder:** all copy in Services, Work, Approach, and Testimonials is written directly in the components (no CMS backing) — see "Content" in `architecture.md`. Work section project cards use gradient color blocks, not real project imagery, since no assets exist yet.

## Known deliberate gap: Sanity content is disconnected

`lib/sanity/getHomepageContent.ts` has a `USE_SANITY_CONTENT = false` flag that **bypasses the live Sanity fetch** and always serves the local fallback copy (`lib/sanity/homepage-fallback.ts`).

**Why:** the live Sanity `homepage` document still holds copy written for the old maintenance-mode page ("We're turning up the fun while we rebuild.", tagline "Maintenance mode", etc). The Sanity schema (`sanity/schemaTypes/homepageType.ts`) wasn't changed, so the fetch still succeeds — it just returns stale messaging that doesn't match the new agency positioning. Serving it as-is would have shipped a homepage with mismatched hero copy.

**Before going live, do one of:**
1. Update the actual Sanity `homepage` document (via Studio at `/studio`) to match the new copy in `lib/sanity/homepage-fallback.ts`, then flip `USE_SANITY_CONTENT` back to `true`.
2. Or decide the hero should stay code-defined (not CMS-editable) and remove the Sanity fetch path entirely, keeping only the fallback constants.

No other section is CMS-driven yet — Services/Work/Approach/Testimonials would need new Sanity schema types if they're meant to be editable later (see "Extending this later" in `architecture.md`).

## Not done / explicit follow-ups

- Logo is a CMYK JPEG on a white background (see `brand.md`) — works for now via careful placement, but a vector/RGB version is recommended before a real launch.
- No real project imagery for the Work section.
- CSP uses `'unsafe-inline'` rather than nonces, trading strictness for static generation — see `security.md` for when to revisit.
- `styled-components` remains an installed but unused dependency (pre-existing, not introduced by this redesign) — safe to remove if nothing starts using it.
- `/studio` (Sanity Studio) intentionally has no CSP applied — see `security.md`.
