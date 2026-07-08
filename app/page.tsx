import Image from "next/image";
import { client } from "../sanity/lib/client";

type HomepageContent = {
  title?: string;
  tagline?: string;
  description?: string;
  contactEmail?: string;
  highlights?: Array<{
    _key?: string;
    title?: string;
    description?: string;
  }>;
};

const fallbackHighlights = [
  {
    title: "Fresh launch",
    description: "A new and brighter experience is landing soon.",
  },
  {
    title: "Craft mode",
    description: "We are polishing the details and tuning the flow.",
  },
  {
    title: "Stay close",
    description: "We will share updates as soon as the doors open.",
  },
];

const fallbackContent: HomepageContent = {
  title: "We’re turning up the fun while we rebuild.",
  tagline: "Maintenance mode",
  description:
    "Two Seats is getting a fresh coat of personality, speed, and sparkle. We’ll be back soon with something brighter.",
  contactEmail: "info@twoseats.co.za",
  highlights: fallbackHighlights,
};

function normalizeHighlights(highlights: HomepageContent["highlights"] = []) {
  return highlights.map((item, index) => ({
    ...item,
    _key: item._key ?? `highlight-${index}-${item.title ?? "item"}`,
  }));
}

async function getHomepageContent(): Promise<HomepageContent> {
  try {
    return await client.fetch<HomepageContent>(`*[_type == "homepage"][0]{
      title,
      tagline,
      description,
      contactEmail,
      highlights[]{_key, title, description}
    }`);
  } catch (error) {
    console.error("Failed to load homepage content from Sanity", error);
    return fallbackContent;
  }
}

export default async function Home() {
  const content = (await getHomepageContent()) ?? fallbackContent;
  const highlights = normalizeHighlights(
    content.highlights?.length ? content.highlights : fallbackHighlights,
  );
  const title = content.title ?? fallbackContent.title;
  const tagline = content.tagline ?? fallbackContent.tagline;
  const description = content.description ?? fallbackContent.description;
  const contactEmail = content.contactEmail ?? fallbackContent.contactEmail;

  return (
    <main className="min-h-screen bg-[var(--color-ink)] text-white">
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="absolute inset-0 min-h-screen bg-[linear-gradient(135deg,_var(--color-emerald)_0%,_var(--color-ink)_55%,_var(--color-blue)_100%)]" />
        <div className="absolute inset-0 min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,185,211,0.28),_transparent_40%)]" />
        <div className="absolute left-[-8%] top-[-8%] h-40 w-40 rounded-full border border-white/20 bg-[var(--color-accent)]/20 blur-3xl" />
        <div className="absolute bottom-[-6%] right-[-6%] h-56 w-56 rounded-full border border-white/20 bg-[var(--color-coral)]/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10 lg:flex-row lg:items-stretch lg:p-12">
            <div className="flex-1 rounded-[1.5rem] border border-white/20 bg-[var(--color-ink)]/65 p-6 sm:p-8 lg:p-10">
              <div className="mb-8 flex items-center justify-start">
                <Image
                  src="/two-seats-logo.jpg"
                  alt="Two Seats logo"
                  width={260}
                  height={70}
                  priority
                  className="h-auto w-full max-w-[220px] sm:max-w-[260px]"
                />
              </div>

              <p className="mb-5 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/90">
                {tagline}
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`mailto:${contactEmail}`}
                  className="rounded-full bg-[var(--color-accent)] px-6 py-3 font-semibold text-[var(--color-ink)] transition hover:opacity-90"
                >
                  Contact us
                </a>
                <a
                  href="#updates"
                  className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  See what’s changing
                </a>
              </div>
            </div>

            <div className="flex-1 rounded-[1.5rem] border border-white/20 bg-white/10 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                    What’s happening
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    A little bit of glow, a little bit of grit.
                  </h2>
                </div>
                <div className="rounded-full border border-[var(--color-emerald)]/40 bg-[var(--color-emerald)]/10 px-3 py-1 text-sm font-semibold text-[var(--color-accent)]">
                  Soon
                </div>
              </div>

              <div id="updates" className="mt-8 grid gap-4">
                {highlights.map((item) => (
                  <div
                    key={item._key}
                    className="rounded-2xl border border-white/15 bg-[var(--color-ink)]/55 p-4"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
