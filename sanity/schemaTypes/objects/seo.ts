import { SearchIcon } from "@sanity/icons/Search";
import { defineField, defineType } from "sanity";

// What search engines and link previews show for a page.
export const seoType = defineType({
  name: "seo",
  title: "Search & sharing",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", type: "string", description: "Shown in the browser tab and Google results. About 50–60 characters.", validation: (rule) => rule.max(70).warning("Google usually cuts titles after about 60 characters.") }),
    defineField({ name: "description", type: "text", rows: 3, description: "Shown under the title in Google. About 150 characters.", validation: (rule) => rule.max(170).warning("Google usually cuts descriptions after about 160 characters.") }),
    defineField({
      name: "image",
      title: "Share image",
      type: "image",
      description: "Shown when the page is shared on WhatsApp, LinkedIn and so on. 1200 × 630 works best.",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
});
