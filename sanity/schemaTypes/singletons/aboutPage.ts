import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "Search & sharing" },
  ],
  fields: [
    defineField({ name: "hero", title: "Banner", type: "pageHero", group: "content" }),
    defineField({ name: "intro", type: "portableText", group: "content" }),
    defineField({
      name: "story",
      title: "Why we started",
      type: "object",
      group: "content",
      fields: [defineField({ name: "heading", type: "sectionHeading" }), defineField({ name: "body", type: "portableText" })],
    }),
    defineField({ name: "servicesSection", title: "Services section", type: "sectionHeading", group: "content" }),
    defineField({
      name: "principles",
      title: "Our approach",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "heading", type: "sectionHeading" }),
        defineField({ name: "items", type: "array", of: [defineArrayMember({ type: "string" })] }),
        defineField({ name: "closing", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "founders",
      title: "The two seats",
      type: "array",
      group: "content",
      description: "The people to show on the About page, in order.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "person" }] })],
      validation: (rule) => rule.unique(),
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
