import { defineArrayMember, defineField, defineType } from "sanity";
import { safeLink } from "../../lib/validation";

// Rich text for longer copy (about page, service intros). Deliberately small:
// paragraphs, one heading level, lists, bold/italic and safe links.
export const portableTextType = defineType({
  name: "portableText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading", value: "h3" },
        { title: "Lead (larger)", value: "lead" },
      ],
      lists: [{ title: "Bullets", value: "bullet" }, { title: "Numbered", value: "number" }],
      marks: {
        decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [defineField({ name: "href", title: "Link", type: "string", validation: (rule) => [rule.required(), safeLink(rule)] })],
          }),
        ],
      },
    }),
  ],
});
