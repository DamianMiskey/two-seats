// The props the Hero component takes. (The copy itself now lives in Sanity,
// with the fallback in lib/content/fallback.ts.)
export type HomepageContent = {
  title?: string;
  tagline?: string;
  description?: string;
  contactEmail?: string;
  highlightPhrase?: string;
  primaryCta?: { label?: string | null; href?: string | null } | null;
  secondaryCta?: { label?: string | null; href?: string | null } | null;
  highlights?: Array<{
    _key?: string;
    title?: string;
    description?: string;
    href?: string;
  }>;
};
