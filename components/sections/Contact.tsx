import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

type ContactProps = {
  contactEmail: string;
};

export function Contact({ contactEmail }: ContactProps) {
  return (
    <Section id="contact" className="bg-ink text-white">
      <Reveal>
        <div className="flex flex-col items-start gap-8 rounded-[2rem] border border-white/15 bg-white/5 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">
              Let&apos;s talk
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">
              Tell us what you&apos;re building — we&apos;ll get back to you within a day or two.
            </p>
          </div>

          <Button href={`mailto:${contactEmail}`} variant="primary" className="shrink-0">
            {contactEmail}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
