// The website reads NEXT_PUBLIC_* (set in Vercel and .env.local). The hosted
// Studio is built by the Sanity CLI, which only exposes SANITY_STUDIO_*
// variables, so each value is read from either. Neither is a secret: a
// project ID and dataset name are visible in every request the site makes.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || process.env.SANITY_STUDIO_API_VERSION || "2026-10-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET (or SANITY_STUDIO_DATASET for the Studio)",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_STUDIO_PROJECT_ID for the Studio)",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (!v) {
    throw new Error(errorMessage);
  }

  return v;
}
