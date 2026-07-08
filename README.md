# Two Seats

Two Seats is currently running a polished maintenance landing page while the full website experience is being rebuilt. This project presents a branded temporary experience with a clear contact call to action and a preview of what is coming next.

## Current status

- The site is in a maintenance/coming-soon phase.
- The homepage is live and styled as a modern, welcoming placeholder experience.
- The focus is on refining branding, visuals, and messaging ahead of the full launch.

## Stack

This project is built with:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
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

- app/page.tsx — the main landing page
- app/globals.css — global styling
- app/studio/[[...tool]]/page.tsx — the embedded Sanity Studio route
- sanity/ — Sanity schema, config, and studio structure
- public/ — static assets such as the logo
- types/ — shared TypeScript types

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
