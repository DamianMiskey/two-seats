# Architecture

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (CSS-first config, no `tailwind.config.ts`), Sanity CMS, GSAP + `@gsap/react`.

## Route structure

Four public routes, all sharing `Nav`/`Footer`: `app/page.tsx` (home), `app/about/page.tsx`, `app/services/page.tsx`, `app/contact/page.tsx`. Each page is a thin (async where it fetches content) Server Component that composes section/`ui` components in order — same pattern as the homepage, just repeated per route. `app/layout.tsx` holds the root `<html>`/`<body>`, font loading (Montserrat via `next/font/google`), and metadata. `app/studio/[[...tool]]/page.tsx` is the embedded Sanity Studio, statically rendered, kept isolated from the marketing site's CSP (see `security.md`).

Internal nav links (`Nav`, `Footer`) use `next/link`'s `<Link>` to real routes (`/services`, `/about`, `/contact`), not `#hash` anchors — the site is no longer a single scrolling page. The one exception is `app/services/page.tsx`, which still uses `#`-hash anchors (via plain `<a>`) to jump between its own in-page service sections, and `Services`/`Hero` link to `/services#<id>` to deep-link a specific service.

## Component structure

```
components/
  nav/Nav.tsx              client — sticky header, scroll shadow, mobile menu, routes to /services /about /contact
  hero/Hero.tsx             client — GSAP entrance timeline (homepage only)
  sections/                 server — Services (homepage teaser grid), Approach, Contact (homepage CTA band)
    ServiceSection.tsx       server — one full service's content block, used per-service on /services
    ContactForm.tsx           client — the /contact page's enquiry form (builds a mailto: on submit)
  footer/Footer.tsx         server — static
  motion/
    gsap.ts                 client — single gsap + ScrollTrigger registration point
    Reveal.tsx               client — single-element scroll-in wrapper
    RevealGroup.tsx           client — staggers direct children on scroll-in
  ui/
    Container.tsx, Section.tsx, SectionHeading.tsx, Button.tsx, Card.tsx, Checklist.tsx
    PageHero.tsx              server — the gradient hero banner used atop /about, /services, /contact (homepage keeps its own animated `Hero`)
lib/sanity/
  getHomepageContent.ts     server-only fetch + fallback
  homepage-fallback.ts      fallback/local copy + HomepageContent type
lib/content/
  services.ts               static data — the four `Service` entries shared by the homepage teaser, /services, and /about
```

**Server/Client rule:** default to Server Components. Only components that touch refs, browser APIs, form state, or GSAP need `"use client"` — currently `Nav`, `Hero`, `ContactForm`, and everything under `components/motion/`. Every section/page component otherwise stays a Server Component and just renders `<Reveal>`/`<RevealGroup>` (client components) as children — this is fully supported in the App Router and keeps the vast majority of each page's markup server-rendered.

**`Button` renders `<a>` or `<button>`:** `components/ui/Button.tsx` is a discriminated union on `href` — pass `href` for a link-styled-as-button (used for every CTA that navigates, e.g. `/contact`), omit it and the component renders a real `<button type="submit">`-capable element (used by `ContactForm`'s submit button). Both share the same `variantClasses`/sizing so they're visually identical.

**To add a new section:** create a Server Component in `components/sections/`, build it from the `ui/` primitives (`Section` for the wrapper + vertical rhythm, `SectionHeading` for the eyebrow/title/subtitle, `Card`/`Button`/`Checklist` for content), wrap the content you want animated in `<Reveal>` or `<RevealGroup>`, then import and render it from the relevant `app/**/page.tsx` in the position you want.

**To add a new page/route:** create `app/<route>/page.tsx` following the existing pages as a template — render `Nav`, a `PageHero` (or the homepage's `Hero` if it needs the GSAP entrance timeline), your section components, then `Footer`. `Nav`/`Footer` are already route-agnostic.

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

Homepage hero content is typed as `HomepageContent` (`lib/sanity/homepage-fallback.ts`) — `title`, `tagline`, `description`, `contactEmail`, `highlightPhrase`, `highlights[]` (each highlight now optionally carries an `href`, e.g. to deep-link `/services#care-plan`). It's meant to be Sanity-driven (schema: `sanity/schemaTypes/homepageType.ts`) but is currently served from a local fallback — see `progress.md` for why and how to re-enable the live fetch. `/contact` also reads `contactEmail` off the same fetch (falling back to `fallbackContent.contactEmail`) to build its mailto.

Service content lives in one place, `lib/content/services.ts`, typed as `Service[]` — each entry has an `id` (used as the section anchor / hash), `title`, `kicker`, `teaser` (homepage card copy), optional `aboutBlurb` (only services with one show up in the About page's "core services" grid), `intro` paragraphs, a `whatsIncluded` checklist, an optional `secondaryList` and `tiers`, and a `closing` CTA block. This one array feeds the homepage `Services` teaser grid, every section on `/services` (via `ServiceSection`), and `/about`'s core-services grid — edit copy there rather than in the page/section components. There's no CMS schema for this yet; Approach's three steps and Contact's copy remain hand-written in their components too.

## Extending this later

- New sections: follow the pattern above.
- New CMS-driven sections: add fields/document types to `sanity/schemaTypes/`, extend `HomepageContent` (or add a new fetch function) in `lib/sanity/`, thread the data into the relevant section component as props — same shape as `Hero` receiving `content`.
- New service entries: add an object to `services` in `lib/content/services.ts` — it automatically appears on the homepage, `/services`, and (if given an `aboutBlurb`) `/about`.
- New pages/routes: create `app/<route>/page.tsx` composing the shared `components/` — see "To add a new page/route" above.
