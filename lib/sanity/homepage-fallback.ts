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
  }>;
};

export const fallbackHighlights = [
  {
    title: "Senior team, start to finish",
    description: "No hand-offs, no juniors learning on your budget.",
  },
  {
    title: "Strategy before pixels",
    description: "Every build starts with a plan, not a moodboard.",
  },
  {
    title: "Built to ship",
    description: "We measure success by what goes live, not the deck.",
  },
];

export const fallbackContent: HomepageContent = {
  title: "Brand and product work that actually moves the needle.",
  tagline: "Connect | Create | Collaborate",
  description:
    "Two Seats is a small, senior studio for teams who want their brand and digital work to feel considered, not templated. Strategy, design, and build — handled end-to-end, by the same people who pitched it.",
  contactEmail: "info@twoseats.co.za",
  highlightPhrase: "actually moves the needle",
  highlights: fallbackHighlights,
};
