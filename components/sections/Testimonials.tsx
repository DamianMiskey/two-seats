import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Reveal } from "@/components/motion/Reveal";

const testimonials = [
  {
    quote:
      "Two Seats got our brand in a way no one else did. The whole process felt collaborative from day one.",
    name: "Founder, early-stage startup",
  },
  {
    quote:
      "Fast, sharp, and genuinely fun to work with. Our new site converts noticeably better.",
    name: "Marketing lead, retail brand",
  },
  {
    quote:
      "They took a vague brief and turned it into something better than we imagined.",
    name: "Ops director, hospitality group",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-ink text-white">
      <Reveal>
        <SectionHeading
          eyebrow="Kind words"
          title="What people say about working with us."
          tone="dark"
        />
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="rounded-2xl border border-white/15 bg-white/5 p-6"
          >
            <p className="text-base leading-7 text-white/85">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold text-white/60">
              {testimonial.name}
            </p>
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}
