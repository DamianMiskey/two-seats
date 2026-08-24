export type HomepageContent = {
  title?: string;
  tagline?: string;
  description?: string;
  contactEmail?: string;
  highlightPhrase?: string;
  highlights?: Array<{
    _key?: string;
    title?: string;
    description?: string;
    href?: string;
  }>;
};

export const fallbackHighlights = [
  {
    title: "Website Audits",
    href: "/services#website-audit",
  },
  {
    title: "Website Care & Security",
    href: "/services#care-plan",
  },
  {
    title: "Website Improvements",
    href: "/services#improvements",
  },
];

export const fallbackContent: HomepageContent = {
  title: "Keeping your website secure, fast and working for your customers.",
  tagline: "Connect | Create | Collaborate",
  description:
    "Better websites start with better conversations — one seat for you, one seat for us.",
  contactEmail: "info@twoseats.co.za",
  highlightPhrase: "secure",
  highlights: fallbackHighlights,
};
