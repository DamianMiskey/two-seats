"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/components/motion/gsap";
import { Button } from "@/components/ui/Button";
import type { HomepageContent } from "@/lib/sanity/homepage-fallback";

type HeroProps = {
  content: HomepageContent;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

function renderTitleWithHighlight(title: string, highlightPhrase?: string) {
  const phrase = highlightPhrase?.trim();

  if (!phrase) {
    return title;
  }

  const parts = title.split(new RegExp(`(${escapeRegExp(phrase)})`, "i"));

  if (parts.length <= 1) {
    return title;
  }

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span key={`${part}-${index}`} className="text-coral">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

export function Hero({ content }: Readonly<HeroProps>) {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const title = content.title ?? "";
  const tagline = content.tagline ?? "";
  const description = content.description ?? "";
  const contactEmail = content.contactEmail ?? "";
  const highlights = content.highlights ?? [];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean };
          const preItems = root.querySelectorAll("[data-hero-pre]");
          const postItems = root.querySelectorAll("[data-hero-post]");
          const glow = root.querySelectorAll("[data-hero-glow]");

          if (reduce) {
            gsap.set([preItems, postItems], {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            });
            gsap.set(glow, { opacity: 1, scale: 1 });
            return;
          }

          const split = headingRef.current
            ? SplitText.create(headingRef.current, { type: "words" })
            : null;

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.fromTo(
            glow,
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" },
            0,
          )
            .fromTo(
              preItems,
              { opacity: 0, y: 20, filter: "blur(6px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
              0.15,
            )
            .fromTo(
              split ? split.words : [],
              { opacity: 0, y: 26, scale: 0.9, rotate: () => gsap.utils.random(-6, 6) },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                duration: 0.7,
                ease: "back.out(1.7)",
                stagger: 0.045,
              },
              0.35,
            )
            .fromTo(
              postItems,
              { opacity: 0, y: 24, filter: "blur(8px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                stagger: 0.1,
              },
              0.9,
            );
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative isolate overflow-hidden bg-ink text-white"
    >
      <div data-hero-glow className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-emerald)_0%,var(--color-ink)_55%,var(--color-blue)_100%)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,185,211,0.28),transparent_45%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center gap-8 px-6 py-28 sm:px-10 lg:px-16">
        <p
          data-hero-pre
          className="inline-flex w-fit items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/90"
        >
          {tagline}
        </p>

        <h1
          ref={headingRef}
          className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          {renderTitleWithHighlight(title, content.highlightPhrase)}
        </h1>

        <p data-hero-post className="max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
          {description}
        </p>

        <div data-hero-post className="flex flex-wrap gap-4">
          <Button href={`mailto:${contactEmail}`} variant="primary">
            Contact us
          </Button>
          <Button href="#contact" variant="outline-light">
            Start a project
          </Button>
        </div>

        {highlights.length ? (
          <div data-hero-post className="flex flex-wrap gap-3 pt-4">
            {highlights.map((item) =>
              item.href ? (
                <Link
                  key={item._key ?? item.title}
                  href={item.href}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  {item.title}
                </Link>
              ) : (
                <div
                  key={item._key ?? item.title}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80"
                >
                  <span className="font-semibold text-white">{item.title}</span>
                </div>
              ),
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
