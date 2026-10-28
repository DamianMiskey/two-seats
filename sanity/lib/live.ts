// The Live Content API: pages fetched with sanityFetch update within seconds
// of a publish (<SanityLive /> in the layout listens for changes), with no
// webhook or redeploy. In draft mode it shows drafts, using the read token.
import { defineLive } from "next-sanity/live";

import { client } from "./client";
import { token } from "./token";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token || false,
  // Only sent to the browser while draft mode is on (editors previewing).
  browserToken: token || false,
});
