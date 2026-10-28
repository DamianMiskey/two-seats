// Where each document appears on the website, for "View on site" and the
// search previews. The site's address comes from SANITY_STUDIO_SITE_URL.
export const SITE_URL = (process.env.SANITY_STUDIO_SITE_URL || "https://twoseats.co.za").replace(/\/$/, "");

export function pathFor(type: string | undefined, slug?: string | null): string | null {
  switch (type) {
    case "homePage":
    case "siteSettings":
      return "/";
    case "servicesPage":
    case "carePlan":
      return "/services";
    case "service":
      return slug ? `/services#${slug}` : "/services";
    case "aboutPage":
    case "person":
      return "/about";
    case "contactPage":
      return "/contact";
    default:
      return null;
  }
}
