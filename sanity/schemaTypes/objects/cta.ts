import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";
import { safeLink } from "../../lib/validation";

// A button or link: a label and where it goes.
export const ctaType = defineType({
  name: "cta",
  title: "Button",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required().max(40) }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "A page (/contact), an anchor (#audit), https://…, mailto:… or tel:…",
      validation: (rule) => [rule.required(), safeLink(rule)],
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
