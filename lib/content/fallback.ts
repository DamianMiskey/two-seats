// The site's current copy, shaped like the Sanity documents. Two uses:
//  1. the seed script (scripts/seed-sanity.ts) writes it into Sanity, and
//  2. lib/sanity/content.ts falls back to it whenever a document is missing,
//     so the site never renders empty, before seeding or if Sanity is down.
import type {
  ABOUT_QUERY_RESULT,
  CARE_PLANS_QUERY_RESULT,
  CONTACT_QUERY_RESULT,
  HOME_QUERY_RESULT,
  SERVICES_PAGE_QUERY_RESULT,
  SERVICES_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
} from "@/sanity.types";
import { services as legacyServices } from "./services";

type Def<T> = NonNullable<T>;

// Portable Text from plain paragraphs.
let n = 0;
const key = () => `k${(n++).toString(36)}`;
export const toBlocks = (paragraphs: string[]) =>
  paragraphs.map((text) => ({
    _type: "block" as const,
    _key: key(),
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span" as const, _key: key(), text, marks: [] }],
  }));

export const settings: Def<SETTINGS_QUERY_RESULT> = {
  siteName: "Two Seats",
  tagline: "Connect | Create | Collaborate",
  contactEmail: "info@twoseats.co.za",
  navigation: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  headerCta: { label: "Let's talk", href: "/contact" },
  seo: {
    title: "Two Seats | Website Audits, Care & Cybersecurity",
    description:
      "Two Seats helps small and medium-sized businesses keep their websites secure, performing at their best and delivering better experiences for their customers.",
    image: null,
  },
};

const SHORT: Record<string, string> = {
  "website-audit": "Website Audits",
  "care-plan": "Website Care & Security",
  cybersecurity: "Cybersecurity",
  improvements: "Website Improvements",
};
type IconName = "search" | "pulse" | "shield" | "trend";
const ICON: Record<string, IconName> = { "website-audit": "search", "care-plan": "pulse", cybersecurity: "shield", improvements: "trend" };

export const services: Def<SERVICES_QUERY_RESULT> = legacyServices.map((s) => ({
  _id: `service-${s.id}`,
  title: s.title,
  slug: s.id,
  shortLabel: SHORT[s.id] ?? s.title,
  kicker: s.kicker,
  teaser: s.teaser,
  aboutBlurb: s.aboutBlurb ?? null,
  icon: ICON[s.id] ?? "search",
  headline: s.intro[0] ?? null,
  intro: toBlocks(s.intro.slice(1)),
  whatsIncluded: s.whatsIncluded,
  secondaryList: s.secondaryList ?? null,
  showCarePlans: Boolean(s.tiers),
  closing: { heading: s.closing.heading ?? null, body: s.closing.body },
  ctaLabel: s.ctaLabel,
}));

export const carePlans: Def<CARE_PLANS_QUERY_RESULT> = (legacyServices.find((s) => s.tiers)?.tiers ?? []).map((t) => ({
  _id: `carePlan-${t.name.toLowerCase()}`,
  name: t.name,
  description: t.description,
  priceFrom: null,
  pricePeriod: "month" as const,
  featured: t.name === "Growth",
  badge: t.name === "Growth" ? "Most popular" : null,
}));

export const home: Def<HOME_QUERY_RESULT> = {
  hero: {
    eyebrow: "Connect | Create | Collaborate",
    title: "Keeping your website secure, fast and working for your customers.",
    highlightPhrase: "secure",
    lead: "Better websites start with better conversations — one seat for you, one seat for us.",
    primaryCta: { label: "Contact us", href: "mailto:info@twoseats.co.za" },
    secondaryCta: { label: "Start a project", href: "#contact" },
    showServiceTags: true,
  },
  freeCheck: {
    enabled: false,
    heading: { eyebrow: "Free website check", title: "How healthy is your website?", subtitle: "Enter your domain for a free check in seconds: security basics, or speed, accessibility and search." },
    note: "Public checks only: we read what any browser can see. It's not a full security audit.",
  },
  servicesSection: {
    eyebrow: "What we do",
    title: "Three ways we help your website work harder.",
    subtitle: "From a one-off health check to ongoing care and targeted improvements — practical support, sized to your business.",
  },
  carePlansSection: {
    enabled: true,
    heading: { eyebrow: "Website care plans", title: "Your website shouldn't be something you have to worry about.", subtitle: "We proactively monitor, maintain and improve your website so you can focus on running your business." },
  },
  approach: {
    heading: { eyebrow: "How we work", title: "Connect. Create. Collaborate.", subtitle: "Three words that guide every website we look after, from first audit to ongoing care." },
    steps: [
      { _key: "connect", title: "Connect", description: "We start by listening — understanding your business, your goals and the challenges you're facing." },
      { _key: "create", title: "Create", description: "We give you a clear, jargon-free plan: practical recommendations, prioritised by impact, not upsold on what you don't need." },
      { _key: "collaborate", title: "Collaborate", description: "We stay close as an ongoing partner — monitoring, maintaining and improving your website so you can focus on running your business." },
    ],
  },
  contactSection: {
    heading: { eyebrow: "Let's take a seat", title: "Let's Take a Seat", subtitle: "Book a call, tell us about your business and let's explore how we can make your website work better for you." },
    cta: { label: "Book a call", href: "/contact" },
  },
  seo: null,
};

export const servicesPage: Def<SERVICES_PAGE_QUERY_RESULT> = {
  hero: {
    eyebrow: "What we do",
    title: "Practical website services, sized to your business.",
    lead: "From a one-off health check to ongoing care and targeted improvements — clear advice and practical support, without the cost and commitment of a full-service agency.",
  },
  seo: {
    title: "Services | Two Seats",
    description: "Website audits, care & security plans, cybersecurity and website improvements for small and medium-sized businesses.",
    image: null,
  },
};

export const about: Def<ABOUT_QUERY_RESULT> = {
  hero: {
    eyebrow: "About",
    title: "Better websites start with better conversations.",
    lead: "Two Seats was founded on a simple belief: every successful partnership starts with two seats at the table. One seat for you. One seat for us.",
  },
  intro: toBlocks([
    "We're a small business that works closely with South African small and medium-sized businesses to create better website experiences through collaboration, expert guidance and ongoing support.",
    "Unlike traditional agencies that focus on large projects and complex retainers, we focus on practical website services that help businesses improve what they already have. Whether that's identifying what's holding a website back, keeping it secure and up to date, or making targeted improvements that create a better experience for customers, our goal is always the same: helping your website work harder for your business.",
  ]),
  story: {
    heading: { eyebrow: "Why we started", title: "Why We Started Two Seats", subtitle: null },
    body: toBlocks([
      "We've seen too many small businesses struggle with websites that are slow, outdated, difficult to use or vulnerable to security risks.",
      "Often, business owners know something isn't working, but they're unsure what the problem is, who to trust, or whether they need an expensive redesign.",
      "We will collaborate as an experienced partner who can provide honest advice, practical recommendations and ongoing support without unnecessary complexity or cost.",
      "That's why we created Two Seats. To offer small businesses the expertise they need, delivered in a personal, approachable and transparent way.",
    ]),
  },
  servicesSection: { eyebrow: "What we do", title: "Three core services.", subtitle: "We help businesses improve, maintain and protect their websites." },
  principles: {
    heading: { eyebrow: "How we work", title: "Our Approach", subtitle: "We believe website support should be straightforward, transparent and focused on outcomes. That means:" },
    items: [
      "Clear advice, without the technical jargon",
      "Recommendations based on what your business actually needs",
      "Practical improvements that deliver real value",
      "Responsive, personal support",
      "Long-term partnerships built on trust",
    ],
    closing: "We're not interested in selling services you don't need. We're interested in helping you create a better experience for your customers and greater confidence in your website.",
  },
  founders: null,
  seo: {
    title: "About | Two Seats",
    description: "Two Seats was founded on a simple belief: every successful partnership starts with two seats at the table. One seat for you. One seat for us.",
    image: null,
  },
};

export const contact: Def<CONTACT_QUERY_RESULT> = {
  hero: {
    eyebrow: "Contact",
    title: "Let's Start the Conversation",
    lead: "Whether you're concerned about your website's performance, security, user experience, or simply know it could be working harder for your business, we'd love to hear from you.",
  },
  intro: toBlocks([
    "At Two Seats, we believe better websites start with better conversations. That's why every project begins with understanding your business, your goals and the challenges you're facing.",
    "You don't need a detailed brief or all the answers. Simply tell us a little about your business and what you'd like help with, and we'll guide you from there.",
  ]),
  interests: {
    heading: { eyebrow: "How we can help", title: "What are you interested in?", subtitle: null },
    options: [
      "Website Audit & Recommendation Packages",
      "Website Care & Security Packages",
      "Website Improvements & Enhancements",
      "Cybersecurity for Small Businesses",
      "General Website Advice & Support",
    ],
  },
  nextSteps: {
    heading: { eyebrow: "What happens next?", title: "Once you get in touch", subtitle: null },
    steps: [
      "We review your information and get in touch to arrange a discovery call.",
      "During the call, we discuss your website, understand your goals and recommend the most appropriate next steps for your business.",
      "No jargon. No hard sell. Just honest advice and practical recommendations.",
    ],
  },
  seo: {
    title: "Contact | Two Seats",
    description: "Let's start the conversation. Tell us a little about your business and what you'd like help with, and we'll guide you from there.",
    image: null,
  },
};
