import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    number: "01",
    title: "Connect",
    description:
      "We start by listening — understanding your business, your goals and the challenges you're facing.",
  },
  {
    number: "02",
    title: "Create",
    description:
      "We give you a clear, jargon-free plan: practical recommendations, prioritised by impact, not upsold on what you don't need.",
  },
  {
    number: "03",
    title: "Collaborate",
    description:
      "We stay close as an ongoing partner — monitoring, maintaining and improving your website so you can focus on running your business.",
  },
];

export function Approach() {
  return (
    <Section id="approach" className="bg-white">
      <Reveal>
        <SectionHeading
          eyebrow="How we work"
          title="Connect. Create. Collaborate."
          subtitle="Three words that guide every website we look after, from first audit to ongoing care."
        />
      </Reveal>

      <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-emerald">
              {step.number}
            </span>
            <h3 className="text-2xl font-semibold text-ink">{step.title}</h3>
            <p className="text-base leading-7 text-ink/70">
              {step.description}
            </p>
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}
