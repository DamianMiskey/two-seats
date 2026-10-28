import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";

// The home page, section by section, matching the redesign concept.
export const homePageType = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "seo", title: "Search & sharing" },
  ],
  fields: [
    defineField({
      name: "hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", type: "string", initialValue: "Connect | Create | Collaborate" }),
        defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(120) }),
        defineField({
          name: "highlightPhrase",
          title: "Highlighted word",
          type: "string",
          description: "A word or phrase from the title to show in the brand gradient, e.g. \"secure\".",
          // Document-aware validation: the phrase has to appear in the title.
          validation: (rule) =>
            rule.custom((phrase, ctx) => {
              const title = (ctx.parent as { title?: string })?.title ?? "";
              if (!phrase) return true;
              return title.toLowerCase().includes(String(phrase).toLowerCase()) ? true : `"${phrase}" isn't in the title, so nothing would be highlighted.`;
            }),
        }),
        defineField({ name: "lead", title: "Intro", type: "text", rows: 3, validation: (rule) => rule.max(240) }),
        defineField({ name: "primaryCta", title: "Main button", type: "cta" }),
        defineField({ name: "secondaryCta", title: "Second button", type: "cta" }),
        defineField({ name: "showServiceTags", title: "Show service tags under the buttons", type: "boolean", initialValue: true }),
      ],
    }),
    defineField({
      name: "freeCheck",
      title: "Free website check",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "enabled", title: "Show this section", type: "boolean", initialValue: false, description: "Turn on once the live check is built." }),
        defineField({ name: "heading", type: "sectionHeading" }),
        defineField({ name: "note", type: "text", rows: 2, description: "Small print under the form, e.g. \"Public checks only…\"" }),
      ],
    }),
    defineField({ name: "servicesSection", title: "Services section", type: "sectionHeading", group: "sections" }),
    defineField({
      name: "carePlansSection",
      title: "Care plans section",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "enabled", title: "Show this section", type: "boolean", initialValue: true }),
        defineField({ name: "heading", type: "sectionHeading" }),
      ],
    }),
    defineField({
      name: "approach",
      title: "How we work",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "heading", type: "sectionHeading" }),
        defineField({
          name: "steps",
          type: "array",
          validation: (rule) => rule.max(6),
          of: [
            defineArrayMember({
              type: "object",
              name: "step",
              fields: [
                defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "description", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title", subtitle: "description" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "contactSection",
      title: "Contact band",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "heading", type: "sectionHeading" }),
        defineField({ name: "cta", title: "Button", type: "cta" }),
      ],
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
