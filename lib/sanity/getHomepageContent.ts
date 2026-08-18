import { client } from "@/sanity/lib/client";
import { fallbackContent, type HomepageContent } from "./homepage-fallback";

// The live Sanity "homepage" document still holds copy written for the old
// maintenance-mode page. Until that document is rewritten to match the new
// agency homepage (see context/progress.md), we intentionally render the
// local fallback copy instead of fetching it, so the site doesn't regress
// to outdated messaging. Flip this back on once Sanity content is aligned.
const USE_SANITY_CONTENT = false;

export async function getHomepageContent(): Promise<HomepageContent> {
  if (!USE_SANITY_CONTENT) {
    return fallbackContent;
  }

  try {
    const content = await client.fetch<HomepageContent | null>(
      `*[_type == "homepage" && _id == "homepage"][0]{
        title,
        tagline,
        description,
        contactEmail,
        highlightPhrase,
        highlights[]{_key, title, description}
      }`,
      {},
      { next: { revalidate: 60 } },
    );

    return content ?? fallbackContent;
  } catch (error) {
    console.error("Failed to load homepage content from Sanity", error);
    return fallbackContent;
  }
}
