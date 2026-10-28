import { defineQuery } from "next-sanity";

// GROQ queries. defineQuery lets `npm run typegen` generate an exact result
// type for each one (see sanity.types.ts).

const cta = `{ label, href }`;
const heading = `{ eyebrow, title, subtitle }`;
const seo = `seo{ title, description, "image": image.asset->url }`;

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  siteName, tagline, contactEmail,
  navigation[]${cta},
  headerCta${cta},
  ${seo}
}`);

export const HOME_QUERY = defineQuery(`*[_id == "homePage"][0]{
  hero{ eyebrow, title, highlightPhrase, lead, primaryCta${cta}, secondaryCta${cta}, showServiceTags },
  freeCheck{ enabled, heading${heading}, note },
  servicesSection${heading},
  carePlansSection{ enabled, heading${heading} },
  approach{ heading${heading}, steps[]{ _key, title, description } },
  contactSection{ heading${heading}, cta${cta} },
  ${seo}
}`);

export const SERVICES_QUERY = defineQuery(`*[_type == "service" && defined(slug.current)] | order(order asc){
  _id, title, "slug": slug.current, shortLabel, kicker, teaser, aboutBlurb, icon,
  headline, intro, whatsIncluded, secondaryList{ title, items }, showCarePlans,
  closing{ heading, body }, ctaLabel
}`);

export const CARE_PLANS_QUERY = defineQuery(`*[_type == "carePlan"] | order(order asc){
  _id, name, description, priceFrom, pricePeriod, featured, badge
}`);

export const SERVICES_PAGE_QUERY = defineQuery(`*[_id == "servicesPage"][0]{
  hero{ eyebrow, title, lead }, ${seo}
}`);

export const ABOUT_QUERY = defineQuery(`*[_id == "aboutPage"][0]{
  hero{ eyebrow, title, lead },
  intro,
  story{ heading${heading}, body },
  servicesSection${heading},
  principles{ heading${heading}, items, closing },
  "founders": founders[]->{ _id, name, role, bio, photo{ asset, hotspot, crop, alt } },
  ${seo}
}`);

export const CONTACT_QUERY = defineQuery(`*[_id == "contactPage"][0]{
  hero{ eyebrow, title, lead },
  intro,
  interests{ heading${heading}, options },
  nextSteps{ heading${heading}, steps },
  ${seo}
}`);
