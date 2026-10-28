import { CaseIcon } from "@sanity/icons/Case";
import { defineField, defineType } from "sanity";

// The services page shows every service document in order; this holds the
// banner and search text around them.
export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "hero", title: "Banner", type: "pageHero" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Services page" }) },
});
