import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

type ContactProps = {
  readonly contactEmail: string;
};

export function Contact({ contactEmail }: ContactProps) {
  return (
    <Section id="contact" className="bg-ink text-white">
      <Reveal>
        <div className="flex flex-col items-start gap-8 rounded-4xl border border-white/15 bg-white/5 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">
              Let&apos;s take a seat
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s Take a Seat
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">
              Book a call, tell us about your business and let&apos;s explore
              how we can make your website work better for you.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3">
            <Button href="/contact" variant="primary">
              Book a call
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
