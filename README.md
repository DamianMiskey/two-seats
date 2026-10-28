# Two Seats

The Two Seats marketing site — four pages (home, about, services, contact) covering website audits, care & security plans, and website improvements for small/medium businesses, with GSAP scroll-reveal animations, built on the Two Seats Style Guide.

## Current status

- A real, multi-page site — no longer in "maintenance mode," and no longer a single scrolling homepage.
- See `context/progress.md` for what's placeholder vs. production-ready, and `context/architecture.md` / `context/brand.md` before extending it.
- Content comes from Sanity (Live Content API, click-to-edit previews), with the current copy as a fallback. See `context/sanity.md`.

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
npm run studio          # Sanity Studio at localhost:3333
npm run studio:deploy   # publish the Studio
npm run typegen         # regenerate sanity.types.ts
npm run seed            # copy current copy into Sanity
```

## Project structure

- app/page.tsx, app/about/, app/services/, app/contact/ — the four routes, each composing shared components (see `context/architecture.md`)
- app/globals.css — brand color tokens, font wiring, global styles
- Sanity Studio — hosted at https://twoseats.sanity.studio (`npm run studio` locally, `npm run studio:deploy` to publish)
- components/ — nav, hero, sections, footer, GSAP motion primitives, shared UI primitives (see `context/architecture.md`)
- lib/sanity/ — GROQ queries (`defineQuery`) and content loaders with fallbacks
- lib/content/ — the fallback copy (also used by `npm run seed`)
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
