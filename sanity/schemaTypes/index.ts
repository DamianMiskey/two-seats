import type { SchemaTypeDefinition } from "sanity";
import { carePlanType } from "./documents/carePlan";
import { personType } from "./documents/person";
import { serviceType } from "./documents/service";
import { ctaType } from "./objects/cta";
import { pageHeroType } from "./objects/pageHero";
import { portableTextType } from "./objects/portableText";
import { sectionHeadingType } from "./objects/sectionHeading";
import { seoType } from "./objects/seo";
import { aboutPageType } from "./singletons/aboutPage";
import { contactPageType } from "./singletons/contactPage";
import { homePageType } from "./singletons/homePage";
import { servicesPageType } from "./singletons/servicesPage";
import { siteSettingsType } from "./singletons/siteSettings";

// Singletons: exactly one of each, at a fixed ID (see sanity/structure.ts).
export const SINGLETONS = [
  { type: "siteSettings", title: "Site settings" },
  { type: "homePage", title: "Home page" },
  { type: "aboutPage", title: "About page" },
  { type: "servicesPage", title: "Services page" },
  { type: "contactPage", title: "Contact page" },
] as const;
export const SINGLETON_TYPES = new Set<string>(SINGLETONS.map((s) => s.type));

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    ctaType, sectionHeadingType, seoType, portableTextType, pageHeroType,
    // Singletons
    siteSettingsType, homePageType, aboutPageType, servicesPageType, contactPageType,
    // Documents
    serviceType, carePlanType, personType,
  ],
};
