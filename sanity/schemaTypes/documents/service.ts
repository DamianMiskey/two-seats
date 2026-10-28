import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

export const SERVICE_ICONS = [
  { title: "Magnifier (audits)", value: "search" },
  { title: "Heartbeat (care)", value: "pulse" },
  { title: "Shield (security)", value: "shield" },
  { title: "Arrow up (improvements)", value: "trend" },
];

// One service Two Seats offers. Order controls where it appears everywhere.
export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "summary", title: "Summary", default: true },
    { name: "page", title: "Full page" },
    { name: "seo", title: "Search & sharing" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "summary", validation: (rule) => rule.required().max(80) }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "summary",
      description: "Used in links, e.g. /services#website-audit. Changing it breaks existing links.",
      options: { source: "title", maxLength: 48 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "shortLabel", title: "Short label", type: "string", group: "summary", description: "For small buttons and tags, e.g. \"Website audits\".", validation: (rule) => rule.required().max(24) }),
    defineField({ name: "kicker", title: "Eyebrow", type: "string", group: "summary", validation: (rule) => rule.max(60) }),
    defineField({ name: "teaser", type: "text", rows: 3, group: "summary", description: "One or two sentences for service cards.", validation: (rule) => rule.required().max(220) }),
    defineField({ name: "aboutBlurb", title: "About page blurb", type: "text", rows: 3, group: "summary", description: "Leave empty to keep this service off the About page." }),
    defineField({ name: "icon", type: "string", group: "summary", options: { list: SERVICE_ICONS, layout: "radio" }, initialValue: "search" }),
    defineField({ name: "order", type: "number", group: "summary", description: "Lower numbers come first.", initialValue: 10, validation: (rule) => rule.integer().min(0) }),

    defineField({ name: "headline", type: "string", group: "page", description: "The question or statement that opens the page.", validation: (rule) => rule.max(120) }),
    defineField({ name: "intro", type: "portableText", group: "page" }),
    defineField({
      name: "whatsIncluded",
      title: "What's included",
      type: "array",
      group: "page",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).max(12),
    }),
    defineField({
      name: "secondaryList",
      title: "Second list",
      type: "object",
      group: "page",
      description: "Optional, e.g. \"Common risks we help address\".",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "items", type: "array", of: [defineArrayMember({ type: "string" })] }),
      ],
    }),
    defineField({ name: "showCarePlans", title: "Show the care plans on this page", type: "boolean", group: "page", initialValue: false }),
    defineField({
      name: "closing",
      type: "object",
      group: "page",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "body", type: "text", rows: 4, validation: (rule) => rule.required() }),
      ],
    }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string", group: "page", initialValue: "Book a discovery call", validation: (rule) => rule.required().max(40) }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "teaser", order: "order" },
    prepare: ({ title, subtitle, order }) => ({ title: `${order ?? "–"}. ${title}`, subtitle }),
  },
});
