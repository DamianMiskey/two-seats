import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checklist } from "@/components/ui/Checklist";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import type { Service } from "@/lib/content/services";

type ServiceSectionProps = {
  service: Service;
  tone: "white" | "mist";
};

export function ServiceSection({ service, tone }: ServiceSectionProps) {
  const closingBg = tone === "white" ? "bg-mist" : "bg-white";

  return (
    <Section id={service.id} className={tone === "white" ? "bg-white" : "bg-mist"}>
      <Reveal>
        <SectionHeading eyebrow={service.kicker} title={service.title} />
      </Reveal>

      <Reveal>
        <div className="mt-8 flex max-w-3xl flex-col gap-5">
          {service.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-7 text-ink/70 sm:text-lg sm:leading-8"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      <RevealGroup
        className={`mt-12 grid gap-8 ${service.secondaryList ? "lg:grid-cols-2" : ""}`}
      >
        <Card tone="light">
          <h3 className="text-xl font-semibold text-ink sm:text-2xl">
            What&apos;s Included
          </h3>
          <div className="mt-5">
            <Checklist items={service.whatsIncluded} />
          </div>
        </Card>

        {service.secondaryList ? (
          <Card tone="light">
            <h3 className="text-xl font-semibold text-ink sm:text-2xl">
              {service.secondaryList.title}
            </h3>
            <div className="mt-5">
              <Checklist items={service.secondaryList.items} />
            </div>
          </Card>
        ) : null}
      </RevealGroup>

      {service.tiers ? (
        <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-3">
          {service.tiers.map((tier) => (
            <Card key={tier.name} tone="light">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald">
                {tier.name}
              </span>
              <p className="mt-3 text-base leading-7 text-ink/70">
                {tier.description}
              </p>
            </Card>
          ))}
        </RevealGroup>
      ) : null}

      <Reveal>
        <div
          className={`mt-12 flex flex-col items-start gap-6 rounded-[2rem] border border-ink/10 ${closingBg} p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between`}
        >
          <div className="max-w-2xl">
            {service.closing.heading ? (
              <p className="text-lg font-semibold text-ink sm:text-xl">
                {service.closing.heading}
              </p>
            ) : null}
            <p className="mt-2 text-base leading-7 text-ink/70">
              {service.closing.body}
            </p>
          </div>
          <Button href="/contact" variant="primary" className="shrink-0">
            {service.ctaLabel}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
