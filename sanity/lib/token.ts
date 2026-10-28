// A read-only (Viewer) token for draft previews. Server-side only: it is set
// in Vercel as SANITY_API_READ_TOKEN, marked Sensitive, and must never get a
// NEXT_PUBLIC_ prefix. Without it the site still works; it just can't show
// unpublished drafts.
export const token = process.env.SANITY_API_READ_TOKEN;
