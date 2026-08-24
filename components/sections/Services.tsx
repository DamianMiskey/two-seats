import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/content/services";

export function Services() {
  return (
    <Section id="services" className="bg-white">
      <Reveal>
        <SectionHeading
          eyebrow="What we do"
          title="Three ways we help your website work harder."
          subtitle="From a one-off health check to ongoing care and targeted improvements — practical support, sized to your business."
        />
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <Link key={service.id} href={`/services#${service.id}`} className="block">
            <Card tone="light" className="h-full">
              <h3 className="text-xl font-semibold text-ink sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-ink/70">
                {service.teaser}
              </p>
            </Card>
          </Link>
        ))}
      </RevealGroup>
    </Section>
  );
}
