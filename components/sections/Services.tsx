import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Reveal } from "@/components/motion/Reveal";

const services = [
  {
    title: "Brand Strategy",
    description:
      "Positioning, messaging, and identity systems that give a brand a clear point of view.",
  },
  {
    title: "Digital Design",
    description:
      "Interfaces and visual systems that feel considered — not templated.",
  },
  {
    title: "Web & Product",
    description:
      "Fast, accessible builds on modern stacks, from marketing sites to full products.",
  },
  {
    title: "Content & Campaigns",
    description:
      "Copy, campaigns, and content that carry a brand voice across every channel.",
  },
];

export function Services() {
  return (
    <Section id="services" className="bg-white">
      <Reveal>
        <SectionHeading
          eyebrow="What we do"
          title="Full-service, small studio."
          subtitle="We work end-to-end — strategy, design, and build — so nothing gets lost in translation between teams."
        />
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} tone="light">
            <h3 className="text-xl font-semibold text-ink sm:text-2xl">
              {service.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-ink/70">
              {service.description}
            </p>
          </Card>
        ))}
      </RevealGroup>
    </Section>
  );
}
