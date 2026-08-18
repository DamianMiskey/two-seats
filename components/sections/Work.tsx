import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Reveal } from "@/components/motion/Reveal";

const projects = [
  {
    tag: "Brand + Web",
    title: "A fresh identity for a growing studio",
    blurb: "Full rebrand and marketing site launch in under six weeks.",
    gradient: "from-emerald to-blue",
  },
  {
    tag: "Product",
    title: "Rebuilding a booking flow from scratch",
    blurb: "Cut checkout time in half with a cleaner, faster UI.",
    gradient: "from-blue to-accent",
  },
  {
    tag: "Campaign",
    title: "Launch campaign for a seasonal drop",
    blurb: "Concept, content, and rollout across every channel.",
    gradient: "from-accent to-coral",
  },
];

export function Work() {
  return (
    <Section id="work" className="bg-mist">
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="A few things we're proud of."
          subtitle="A small sample of recent projects — more available on request."
        />
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`h-40 w-full bg-linear-to-br ${project.gradient}`}
            />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald">
                {project.tag}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-ink">
                {project.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-ink/70">
                {project.blurb}
              </p>
            </div>
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}
