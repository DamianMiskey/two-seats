import { defineField, defineType } from "sanity";

// The gradient banner at the top of the About, Services and Contact pages.
export const pageHeroType = defineType({
  name: "pageHero",
  title: "Page banner",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (rule) => rule.max(40) }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(120) }),
    defineField({ name: "lead", title: "Intro", type: "text", rows: 3, validation: (rule) => rule.max(320) }),
  ],
});
