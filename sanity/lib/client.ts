import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "https://twoseats.sanity.studio";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // The CDN serves published content fast; drafts always bypass it.
  useCdn: true,
  // In draft mode, text carries invisible markers (stega) that let the
  // Presentation tool map anything on the page back to its field.
  stega: { studioUrl },
});
