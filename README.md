# Two Seats

The Two Seats marketing site — four pages (home, about, services, contact) covering website audits, care & security plans, and website improvements for small/medium businesses, with GSAP scroll-reveal animations, built on the Two Seats Style Guide.

## Current status

- A real, multi-page site — no longer in "maintenance mode," and no longer a single scrolling homepage.
- See `context/progress.md` for what's placeholder vs. production-ready, and `context/architecture.md` / `context/brand.md` before extending it.
- Hero copy is currently served from a local fallback, not the live Sanity document — see `context/progress.md` for why and how to reconnect it before launch.

## Stack

This project is built with:

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP + `@gsap/react` (scroll-triggered reveal animations)
- Sanity CMS
- ESLint

## Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the site locally.

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project structure

- app/page.tsx, app/about/, app/services/, app/contact/ — the four routes, each composing shared components (see `context/architecture.md`)
- app/globals.css — brand color tokens, font wiring, global styles
- app/studio/[[...tool]]/page.tsx — the embedded Sanity Studio route
- components/ — nav, hero, sections, footer, GSAP motion primitives, shared UI primitives (see `context/architecture.md`)
- lib/sanity/ — homepage hero content fetch + fallback copy
- lib/content/ — static service content shared across the home/services/about pages
- sanity/ — Sanity schema, config, and studio structure
- next.config.ts — security headers (CSP, HSTS, etc.) — see `context/security.md`
- context/ — living architecture/brand/progress docs, read this before extending the site
- public/ — static assets such as the logo
- types/ — regenerated automatically by `next dev`/`next build` (typedRoutes + cacheLife codegen); not hand-written, not tracked in git, excluded from lint

## Deploying to Vercel

When you deploy this project to Vercel, the Sanity Studio will be available at your site’s /studio route.

Make sure these environment variables are set in Vercel:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset_name
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-08
```

Once the app is deployed, your main site will run normally and the Studio will be available at:

```text
https://your-domain.com/studio
```

## Contact

For questions or updates, reach out at info@twoseats.co.za
