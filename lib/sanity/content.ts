import "server-only";
import type { Metadata } from "next";
import * as fallback from "@/lib/content/fallback";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ABOUT_QUERY,
  CARE_PLANS_QUERY,
  CONTACT_QUERY,
  HOME_QUERY,
  SERVICES_PAGE_QUERY,
  SERVICES_QUERY,
  SETTINGS_QUERY,
} from "./queries";

// Content for each page: Sanity first, field by field, with the current copy
// (lib/content/fallback.ts) filling anything not yet entered. A failed fetch
// falls back entirely, so the site never renders empty.
type Obj = Record<string, unknown>;
function merge<T extends Obj>(doc: Partial<T> | null | undefined, base: T): T {
  if (!doc) return base;
  const out: Obj = { ...base };
  for (const [k, v] of Object.entries(doc)) {
    if (v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)) out[k] = v;
  }
  return out as T;
}

async function load<T>(query: string, base: T, opts: { stega?: boolean } = {}): Promise<T> {
  try {
    const { data } = await sanityFetch({ query, stega: opts.stega });
    if (Array.isArray(base)) return (Array.isArray(data) && data.length ? data : base) as T;
    return merge(data as Partial<T & Obj>, base as T & Obj);
  } catch (error) {
    console.error("Sanity fetch failed, using fallback copy", error);
    return base;
  }
}

export const getSettings = (o?: { stega?: boolean }) => load(SETTINGS_QUERY, fallback.settings, o);
export const getHome = () => load(HOME_QUERY, fallback.home);
export const getServices = () => load(SERVICES_QUERY, fallback.services);
export const getCarePlans = () => load(CARE_PLANS_QUERY, fallback.carePlans);
export const getServicesPage = (o?: { stega?: boolean }) => load(SERVICES_PAGE_QUERY, fallback.servicesPage, o);
export const getAbout = (o?: { stega?: boolean }) => load(ABOUT_QUERY, fallback.about, o);
export const getContact = (o?: { stega?: boolean }) => load(CONTACT_QUERY, fallback.contact, o);

// Page metadata from a page's SEO fields, falling back to the site defaults.
// Fetched without stega, so no invisible editing markers end up in <title>.
type Seo = { title?: string | null; description?: string | null; image?: string | null } | null | undefined;
export async function metadataFor(seo: Seo): Promise<Metadata> {
  const site = await getSettings({ stega: false });
  const title = seo?.title || site.seo?.title || site.siteName || "Two Seats";
  const description = seo?.description || site.seo?.description || undefined;
  const image = seo?.image || site.seo?.image || undefined;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}
