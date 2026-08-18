# Architecture

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (CSS-first config, no `tailwind.config.ts`), Sanity CMS, GSAP + `@gsap/react`.

## Route structure

Single public route: `app/page.tsx`. It's a thin async Server Component that fetches homepage content and composes section components in order. `app/layout.tsx` holds the root `<html>`/`<body>`, font loading (Montserrat via `next/font/google`), and metadata. `app/studio/[[...tool]]/page.tsx` is the embedded Sanity Studio, statically rendered, kept isolated from the marketing site's CSP (see `security.md`).

## Component structure

```
components/
  nav/Nav.tsx              client — sticky header, scroll shadow, mobile menu
  hero/Hero.tsx             client — GSAP entrance timeline
  sections/                 server — Services, Work, Approach, Testimonials, Contact
  footer/Footer.tsx         server — static
  motion/
    gsap.ts                 client — single gsap + ScrollTrigger registration point
    Reveal.tsx               client — single-element scroll-in wrapper
    RevealGroup.tsx           client — staggers direct children on scroll-in
  ui/
    Container.tsx, Section.tsx, SectionHeading.tsx, Button.tsx, Card.tsx
lib/sanity/
  getHomepageContent.ts     server-only fetch + fallback
  homepage-fallback.ts      fallback/local copy + HomepageContent type
```

**Server/Client rule:** default to Server Components. Only components that touch refs, browser APIs, or GSAP need `"use client"` — currently `Nav`, `Hero`, and everything under `components/motion/`. Every section component (`Services`, `Work`, `Approach`, `Testimonials`, `Contact`, `Footer`) stays a Server Component and just renders `<Reveal>`/`<RevealGroup>` (client components) as children — this is fully supported in the App Router and keeps the vast majority of the page's markup server-rendered.

**To add a new section:** create a Server Component in `components/sections/`, build it from the `ui/` primitives (`Section` for the wrapper + vertical rhythm, `SectionHeading` for the eyebrow/title/subtitle, `Card`/`Button` for content), wrap the content you want animated in `<Reveal>` or `<RevealGroup>`, then import and render it from `app/page.tsx` in the position you want.

## GSAP pattern

All GSAP/ScrollTrigger imports go through `components/motion/gsap.ts` — the single place `ScrollTrigger` is registered. Never import `"gsap"` directly elsewhere.

Every animation hook uses `@gsap/react`'s `useGSAP(callback, { scope })`, never a raw `useEffect`. `useGSAP` wraps `gsap.context()` and auto-reverts tweens/ScrollTriggers on unmount or dependency change — this specifically avoids duplicate ScrollTriggers under React 19 Strict Mode's dev-mode double-invocation of effects.

`Reveal` and `RevealGroup` are the two reusable primitives:
- `Reveal` fades/slides a single wrapped element in on scroll.
- `RevealGroup` staggers its direct children in on scroll (one ScrollTrigger per section instead of one per card) — use this for card grids.

Both use `gsap.matchMedia()` keyed on `(prefers-reduced-motion: reduce)` vs `(prefers-reduced-motion: no-preference)`. When reduced motion is preferred, content is set to its final visible state immediately with zero animation — no exceptions. **The hidden/initial state is always set by GSAP in JS (`gsap.fromTo`'s "from" object), never baked into a server-rendered `className`** — otherwise content is invisible to no-JS or slow-JS clients before hydration.

`Hero.tsx` runs its own mount-only `useGSAP` timeline (not scroll-triggered), gated by the same reduced-motion check: the background glow fades/scales in, the eyebrow blurs into focus, the `<h1>` is split word-by-word with GSAP's `SplitText` (`SplitText.create(headingRef.current, { type: "words" })`) and each word pops in with a `back.out` bounce and slight random rotation, then the description/CTAs/chips blur into focus last. `SplitText` auto-registers with the active `gsap.context()` (same mechanism `useGSAP` uses), so it un-splits and cleans up correctly on unmount/Strict Mode remount without extra code — no different from any other GSAP object created inside the `useGSAP` callback. Use word-level (not character-level) splitting for anything longer than a short 2–4 word phrase — full character splitting on a full sentence reads as slow/noisy rather than premium.

## Styling

Brand tokens live in `app/globals.css` as CSS variables, promoted into Tailwind's `@theme inline` block so they're usable as real utilities (`bg-emerald`, `text-ink`, `bg-mist`, etc.) rather than `bg-[var(--color-x)]` arbitrary values. See `brand.md` for the palette itself and its usage rules.

**Important gotcha:** never use an alpha-opacity utility (e.g. `bg-grey/10`) as a full-bleed section background. Those are translucent — over the app's dark-by-default `<body>` background (`--background: var(--color-ink)`), a translucent "light" background still renders mostly dark, producing illegible dark-on-dark text. Full-bleed section backgrounds must be **opaque** (`bg-white`, `bg-ink`, `bg-mist`). Alpha-opacity utilities are fine, and used deliberately, only when nested *inside* an already-opaque parent (e.g. `bg-white/5` cards inside a `bg-ink` section).

Shared primitives (`ui/Button.tsx`, `ui/Card.tsx`, `ui/Section.tsx`, `ui/SectionHeading.tsx`) exist specifically so spacing, radii, and color usage stay consistent by construction rather than by convention — extend those rather than hand-rolling new button/card styles per section.

## Content

Homepage content is typed as `HomepageContent` (`lib/sanity/homepage-fallback.ts`) — `title`, `tagline`, `description`, `contactEmail`, `highlightPhrase`, `highlights[]`. It's meant to be Sanity-driven (schema: `sanity/schemaTypes/homepageType.ts`) but is currently served from a local fallback — see `progress.md` for why and how to re-enable the live fetch. All other section content (Services, Work, Approach, Testimonials) is static placeholder copy written directly in the section components — there's no CMS schema for these yet.

## Extending this later

- New sections: follow the pattern above.
- New CMS-driven sections: add fields/document types to `sanity/schemaTypes/`, extend `HomepageContent` (or add a new fetch function) in `lib/sanity/`, thread the data into the relevant section component as props — same shape as `Hero` receiving `content`.
- New pages/routes: this is currently a single-route site; a second route just needs its own `app/<route>/page.tsx` composing the same `components/` — the `Nav`/`Footer` are already route-agnostic.
