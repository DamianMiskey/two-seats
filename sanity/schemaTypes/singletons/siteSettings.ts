import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

// Things that appear on every page: contact details, navigation, footer and
// the default search/sharing text.
export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "siteName", type: "string", initialValue: "Two Seats", validation: (rule) => rule.required() }),
    defineField({ name: "tagline", type: "string", initialValue: "Connect | Create | Collaborate", validation: (rule) => rule.max(60) }),
    defineField({ name: "contactEmail", type: "string", validation: (rule) => rule.required().email() }),
    defineField({ name: "navigation", type: "array", of: [defineArrayMember({ type: "cta" })], description: "The links in the top bar and footer.", validation: (rule) => rule.max(6) }),
    defineField({ name: "headerCta", title: "Header button", type: "cta" }),
    defineField({ name: "seo", title: "Default search & sharing", type: "seo", description: "Used for any page without its own." }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
