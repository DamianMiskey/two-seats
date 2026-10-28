import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Reveal } from "@/components/motion/Reveal";
import type { HomeContent } from "@/lib/sanity/types";

export function Approach({ approach }: { approach: HomeContent["approach"] }) {
  const steps = approach?.steps ?? [];
  return (
    <Section id="approach" className="bg-white">
      <Reveal>
        <SectionHeading
          eyebrow={approach?.heading?.eyebrow ?? ""}
          title={approach?.heading?.title ?? ""}
          subtitle={approach?.heading?.subtitle ?? undefined}
        />
      </Reveal>

      <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step._key} className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-emerald">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="text-2xl font-semibold text-ink">{step.title}</h3>
            <p className="text-base leading-7 text-ink/70">{step.description}</p>
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}
