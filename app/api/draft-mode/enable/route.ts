// Turns on draft mode for the Presentation tool. Sanity signs each preview
// link with a short-lived secret that this route checks before enabling, so
// nobody can turn on draft mode (and see unpublished content) by guessing.
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

const enable = token ? defineEnableDraftMode({ client: client.withConfig({ token }) }).GET : null;

export async function GET(request: Request) {
  if (!enable) {
    return new Response("Draft previews aren't set up: add SANITY_API_READ_TOKEN (a Viewer token) in Vercel.", { status: 503 });
  }
  return enable(request);
}
