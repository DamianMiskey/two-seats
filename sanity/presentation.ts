import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";

// Tells the Presentation tool which page shows which document, so editors can
// click any text on the preview and jump to the field that holds it.
export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    { route: "/", filter: `_type == "homePage" && _id == "homePage"` },
    { route: "/services", filter: `_type == "servicesPage" && _id == "servicesPage"` },
    { route: "/about", filter: `_type == "aboutPage" && _id == "aboutPage"` },
    { route: "/contact", filter: `_type == "contactPage" && _id == "contactPage"` },
  ]),
  locations: {
    service: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Service", href: `/services#${doc?.slug ?? ""}` },
          { title: "Home page", href: "/" },
        ],
      }),
    }),
    carePlan: defineLocations({ select: { title: "name" }, resolve: () => ({ locations: [{ title: "Home page", href: "/" }, { title: "Services page", href: "/services" }] }) }),
    person: defineLocations({ select: { title: "name" }, resolve: () => ({ locations: [{ title: "About page", href: "/about" }] }) }),
    siteSettings: defineLocations({ message: "Used on every page", tone: "positive" }),
  },
};
