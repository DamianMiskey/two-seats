import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import type { HomeContent } from "@/lib/sanity/types";

type ContactProps = {
  readonly contactEmail: string;
  readonly content: HomeContent["contactSection"];
};

export function Contact({ contactEmail, content }: ContactProps) {
  return (
    <Section id="contact" className="bg-ink text-white">
      <Reveal>
        <div className="flex flex-col items-start gap-8 rounded-4xl border border-white/15 bg-white/5 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">
              {content?.heading?.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{content?.heading?.title}</h2>
            <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">{content?.heading?.subtitle}</p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3">
            <Button href={content?.cta?.href ?? "/contact"} variant="primary">
              {content?.cta?.label ?? "Book a call"}
            </Button>
            <a
              href={`mailto:${contactEmail}`}
              className="text-sm font-semibold text-white/60 underline-offset-4 transition hover:text-white hover:underline"
            >
              or email {contactEmail}
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
