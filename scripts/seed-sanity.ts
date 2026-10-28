/**
 * Copies the site's current copy (lib/content/fallback.ts) into Sanity, so
 * the Studio starts with everything the website shows today.
 *
 *   npm run seed            create any documents that don't exist yet
 *   npm run seed -- --replace   overwrite them (loses edits made in the Studio!)
 *
 * It runs with your own Sanity login (`npx sanity login` first), via
 * `sanity exec --with-user-token`, so no API token is created or stored.
 */
import { getCliClient } from "sanity/cli";
import * as content from "../lib/content/fallback";

const client = getCliClient({ apiVersion: "2026-10-01" });
const replace = process.argv.includes("--replace");

// Arrays of objects need a _key in Sanity.
let k = 0;
const keyed = <T extends object>(items: (T | undefined)[] | null | undefined) =>
  (items ?? []).filter((item): item is T => Boolean(item)).map((item) => ({ _key: `seed${(k++).toString(36)}`, ...item }));
const ctaDoc = (c: { label?: string | null; href?: string | null } | null | undefined) =>
  c ? { _type: "cta", label: c.label, href: c.href } : undefined;
const heading = (h: { eyebrow?: string | null; title?: string | null; subtitle?: string | null } | null | undefined) =>
  h ? { _type: "sectionHeading", eyebrow: h.eyebrow ?? undefined, title: h.title ?? undefined, subtitle: h.subtitle ?? undefined } : undefined;
const hero = (h: { eyebrow?: string | null; title?: string | null; lead?: string | null } | null | undefined) =>
  h ? { _type: "pageHero", eyebrow: h.eyebrow ?? undefined, title: h.title ?? undefined, lead: h.lead ?? undefined } : undefined;

const s = content.settings, h = content.home;
type Doc = { _id: string; _type: string } & Record<string, unknown>;
const docs: Doc[] = [
  {
    _id: "siteSettings", _type: "siteSettings",
    siteName: s.siteName, tagline: s.tagline, contactEmail: s.contactEmail,
    navigation: keyed(s.navigation?.map(ctaDoc)), headerCta: ctaDoc(s.headerCta),
    seo: { _type: "seo", title: s.seo?.title, description: s.seo?.description },
  },
  {
    _id: "homePage", _type: "homePage",
    hero: { ...h.hero, primaryCta: ctaDoc(h.hero?.primaryCta), secondaryCta: ctaDoc(h.hero?.secondaryCta) },
    freeCheck: { enabled: false, heading: heading(h.freeCheck?.heading), note: h.freeCheck?.note },
    servicesSection: heading(h.servicesSection),
    carePlansSection: { enabled: true, heading: heading(h.carePlansSection?.heading) },
    approach: { heading: heading(h.approach?.heading), steps: h.approach?.steps?.map((st) => ({ _type: "step", ...st })) },
    contactSection: { heading: heading(h.contactSection?.heading), cta: ctaDoc(h.contactSection?.cta) },
  },
  { _id: "servicesPage", _type: "servicesPage", hero: hero(content.servicesPage.hero), seo: { _type: "seo", ...content.servicesPage.seo, image: undefined } },
  {
    _id: "aboutPage", _type: "aboutPage",
    hero: hero(content.about.hero), intro: content.about.intro,
    story: { heading: heading(content.about.story?.heading), body: content.about.story?.body },
    servicesSection: heading(content.about.servicesSection),
    principles: { heading: heading(content.about.principles?.heading), items: content.about.principles?.items, closing: content.about.principles?.closing },
    seo: { _type: "seo", ...content.about.seo, image: undefined },
  },
  {
    _id: "contactPage", _type: "contactPage",
    hero: hero(content.contact.hero), intro: content.contact.intro,
    interests: { heading: heading(content.contact.interests?.heading), options: content.contact.interests?.options },
    nextSteps: { heading: heading(content.contact.nextSteps?.heading), steps: content.contact.nextSteps?.steps },
    seo: { _type: "seo", ...content.contact.seo, image: undefined },
  },
  ...content.services.map((sv, i) => ({
    _id: sv._id, _type: "service",
    title: sv.title, slug: { _type: "slug", current: sv.slug }, shortLabel: sv.shortLabel, kicker: sv.kicker,
    teaser: sv.teaser, aboutBlurb: sv.aboutBlurb ?? undefined, icon: sv.icon, order: (i + 1) * 10,
    headline: sv.headline, intro: sv.intro, whatsIncluded: sv.whatsIncluded,
    secondaryList: sv.secondaryList ?? undefined, showCarePlans: sv.showCarePlans,
    closing: { heading: sv.closing?.heading ?? undefined, body: sv.closing?.body }, ctaLabel: sv.ctaLabel,
  })),
  ...content.carePlans.map((cp, i) => ({
    _id: cp._id, _type: "carePlan", name: cp.name, description: cp.description,
    pricePeriod: cp.pricePeriod, featured: cp.featured, badge: cp.badge ?? undefined, order: (i + 1) * 10,
  })),
];

const tx = client.transaction();
for (const doc of docs) {
  if (replace) tx.createOrReplace(doc);
  else tx.createIfNotExists(doc);
}
const result = await tx.commit();
console.log(`${replace ? "Wrote" : "Created (if missing)"} ${docs.length} documents in "${client.config().dataset}" (${result.results.length} changes).`);
console.log("Add your team members, prices and photos in the Studio: npm run studio");
