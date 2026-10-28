import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

// One of the people behind Two Seats.
export const personType = defineType({
  name: "person",
  title: "Team member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.max(60) }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      description: "Square works best. Use the hotspot to keep the face centred when cropped.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the photo for screen readers, e.g. the person's name.",
          validation: (rule) => rule.custom((alt, ctx) => ((ctx.parent as { asset?: unknown })?.asset && !alt ? "Alt text is required when there's a photo." : true)),
        }),
      ],
    }),
    defineField({ name: "bio", type: "text", rows: 3, validation: (rule) => rule.max(400) }),
    defineField({ name: "order", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
