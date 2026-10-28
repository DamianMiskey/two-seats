import { HeartIcon } from "@sanity/icons/Heart";
import { defineField, defineType } from "sanity";

// A website care plan tier (Starter, Growth, Premium…).
export const carePlanType = defineType({
  name: "carePlan",
  title: "Care plan",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required().max(30) }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required().max(240) }),
    defineField({ name: "priceFrom", title: "Price from (Rand)", type: "number", description: "Leave empty to show \"Price on request\".", validation: (rule) => rule.min(0) }),
    defineField({ name: "pricePeriod", title: "Billed", type: "string", options: { list: [{ title: "Per month", value: "month" }, { title: "Once-off", value: "once" }], layout: "radio", direction: "horizontal" }, initialValue: "month" }),
    defineField({ name: "featured", title: "Highlight this plan", type: "boolean", initialValue: false }),
    defineField({ name: "badge", type: "string", description: "Small label on a highlighted plan, e.g. \"Most popular\".", hidden: ({ parent }) => !parent?.featured, validation: (rule) => rule.max(20) }),
    defineField({ name: "order", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", price: "priceFrom", featured: "featured" },
    prepare: ({ title, price, featured }) => ({ title: `${title}${featured ? " ★" : ""}`, subtitle: price ? `From R${price}` : "Price on request" }),
  },
});
