import { defineField, defineType } from "sanity";

// The eyebrow + title + subtitle trio every section opens with.
export const sectionHeadingType = defineType({
  name: "sectionHeading",
  title: "Section heading",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: "eyebrow", type: "string", description: "Small label above the title, e.g. WHAT WE DO", validation: (rule) => rule.max(40) }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(120) }),
    defineField({ name: "subtitle", type: "text", rows: 2, validation: (rule) => rule.max(300) }),
  ],
});
