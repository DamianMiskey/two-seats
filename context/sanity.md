# Sanity

The site's copy lives in Sanity (project in `NEXT_PUBLIC_SANITY_PROJECT_ID`, dataset `production`). Every page also has a fallback in `lib/content/fallback.ts`, so the site never renders empty: before seeding, if a field is left blank, or if Sanity is unreachable.

## Everyday use

| Command | What it does |
|---|---|
| `npm run studio` | The Studio locally at http://localhost:3333 |
| `npm run studio:deploy` | Publishes the Studio to **https://twoseats.sanity.studio** (Sanity's free hosting). Run after schema changes. |
| `npm run typegen` | Regenerates `sanity.types.ts` from the schema and every `defineQuery()`. Run after changing a schema or a query; the build then catches mismatches. |
| `npm run seed` | Copies the current copy into Sanity, creating only documents that don't exist yet. `npm run seed -- --replace` overwrites (loses Studio edits). Uses your own login (`npx sanity login`), so no token is created. |

The Studio needs `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` in `.env.local` (same values as the `NEXT_PUBLIC_` ones; the Sanity CLI only reads `SANITY_STUDIO_*`).

## Content model (`sanity/schemaTypes/`)

- **Singletons** (one fixed document each, ID = type name, can't be duplicated or deleted): `siteSettings`, `homePage`, `aboutPage`, `servicesPage`, `contactPage`.
- **Documents**: `service` (ordered by `order`), `carePlan` (shown on services with "Show the care plans" ticked), `person` (team, picked on the About page).
- **Objects**: `cta`, `sectionHeading`, `pageHero`, `seo`, `portableText`.
- Sections from the redesign concept that the current site doesn't render yet (`homePage.freeCheck`, `homePage.carePlansSection`) are in the model with an "enabled" switch, ready for the redesign.

## Features used, and why

- **Live Content API** (`sanity/lib/live.ts`, `<SanityLive />` in the layout): published edits appear within seconds, with no webhook or redeploy. Requires the site's addresses in Sanity's **CORS origins** (below).
- **Presentation tool + Visual Editing**: in the Studio, *Presentation* shows the site with click-to-edit. It turns on Next.js draft mode via `/api/draft-mode/enable`, which only works with a valid, Sanity-signed preview secret and the read token.
- **TypeGen + `defineQuery`** (`lib/sanity/queries.ts`): typed query results.
- **Structure Builder** (`sanity/structure.ts`): pages grouped, singletons opened directly.
- **Validation**: required fields, lengths, the highlighted hero word must be in the title, alt text required on photos, links limited to safe schemes (`sanity/lib/validation.ts`).
- **Brand theme** (`sanity/studio/`): Two Seats colours, Montserrat and logo mark.

## Security setup (done in sanity.io/manage by an administrator)

1. **Two-factor login** for every member (via the Google/GitHub/email provider they sign in with).
2. **Roles**: owners as *Administrator*; anyone who only edits copy as *Editor*. Vision (the GROQ playground) is hidden from non-administrators in the Studio config.
3. **CORS origins** (API → CORS origins), and nothing broader:
   - `https://twoseats.co.za`, `https://www.twoseats.co.za` (live updates)
   - `https://*-two-seats.vercel.app` (previews)
   - `http://localhost:3000` (local site), and `http://localhost:3333` + `https://twoseats.sanity.studio` with **Allow credentials** (the Studio)
   - Remove any `*` entry.
4. **Read token for previews**: API → Tokens → *Viewer* token named "Website previews". Add it in Vercel as `SANITY_API_READ_TOKEN`, **Sensitive**, Production + Preview. Never prefix it `NEXT_PUBLIC_`. Rotate it if anyone with access leaves.
5. **Dataset is public** (readable by anyone who knows the project ID), which is fine for website copy. Never store leads, form submissions or personal data in it.
6. **Backups**: `npx sanity dataset export production backup.tar.gz` now and then.

The site may be framed only by itself and the Studio (`frame-ancestors` in `next.config.ts`), so click-to-edit previews work without letting other sites frame it.
