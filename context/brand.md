# Brand

Source: `Two Seats Style Guide.pdf` (repo root). Facts here are extracted from that PDF and mirrored into `app/globals.css` as CSS variables — if the two ever disagree, the PDF wins and `globals.css` should be corrected.

## Tagline / pillars

**Connect | Create | Collaborate** — used as the hero eyebrow, footer tagline, and directly as the three-step structure of the Approach section (`components/sections/Approach.tsx`).

## Palette

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#1d1d1b` | Dominant surface (dark sections) + primary text on light sections |
| `--color-white` | `#ffffff` | Dominant surface (light sections) |
| `--color-emerald` | `#47b175` | Primary brand accent — CTAs, eyebrows, active states |
| `--color-blue` | `#006f8d` | The one secondary color — depth/gradient companion to emerald, secondary buttons/tags |
| `--color-accent` | `#25b9d3` | Cyan accent — hero background glow |
| `--color-coral` | `#e84135` | Used **sparingly** — hero highlighted phrase, at most one more small accent per page |
| `--color-grey` | `#c6c6c6` | 30% black from the guide — muted text, borders, not for full-bleed backgrounds |
| `--color-mist` | `#f5f5f4` | **Not in the style guide.** Added as an opaque near-white wash for alternating light section backgrounds (see the `bg-grey/10` gotcha in `architecture.md`) — use this instead of an alpha-opacity grey when a section needs a light-but-not-pure-white background. |

**Usage rule from the guide:** ink/white are dominant. Pair in exactly **one** secondary color (blue), plus the green primary, plus coral used sparingly — not an even rotation across all colors. Concretely: emerald is the workhorse accent everywhere; blue shows up specifically in the `Hero`/`PageHero` background gradient for depth; coral appears only in the homepage hero's highlighted phrase plus at most one more small accent point.

## Typography

**Montserrat**, loaded via `next/font/google` in `app/layout.tsx` (weights 300–800), exposed as `--font-montserrat` → Tailwind's `--font-sans`. Type scale is defined once in `components/ui/SectionHeading.tsx` and should be reused rather than re-specified per section:

- Eyebrow: `text-xs sm:text-sm uppercase tracking-[0.3em]`
- H1 (hero only): `text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight`
- H2 (section titles): `text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight`
- H3 (card titles): `text-xl sm:text-2xl font-semibold`
- Body: `text-base sm:text-lg leading-7 sm:leading-8`

## Logo

`public/two-seats-logo.jpg` — a CMYK JPEG (1323×680) flattened onto a **solid white background**. This is a real constraint, not a style choice:

- **Never place it directly on a dark/ink surface** — the white background renders as a visible box.
- Used as-is in the white sticky `Nav`.
- Used inside a white rounded "chip" in the ink-background `Footer`.
- The Hero uses a typographic lockup (the `tagline` text) instead of the raster logo, specifically to avoid the white-box problem.
- **Follow-up (not yet done):** request an RGB SVG or transparent PNG from whoever owns the brand source files — the CMYK color space carries real color-shift risk through `next/image`'s optimizer, and a vector version would remove the white-background constraint entirely.
