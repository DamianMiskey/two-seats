import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "hero", title: "Banner", type: "pageHero" }),
    defineField({ name: "intro", type: "portableText" }),
    defineField({
      name: "interests",
      title: "What are you interested in?",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "sectionHeading" }),
        defineField({ name: "options", type: "array", of: [defineArrayMember({ type: "string" })], description: "Also used as the choices in the contact form." }),
      ],
    }),
    defineField({
      name: "nextSteps",
      title: "What happens next",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "sectionHeading" }),
        defineField({ name: "steps", type: "array", of: [defineArrayMember({ type: "string" })], validation: (rule) => rule.max(5) }),
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});
