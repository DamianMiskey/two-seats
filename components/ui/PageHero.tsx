import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-emerald)_0%,var(--color-ink)_55%,var(--color-blue)_100%)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,185,211,0.28),transparent_45%)]" />
      </div>

      <Container className="relative flex flex-col gap-6 py-24 sm:py-28 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80 sm:text-sm">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
