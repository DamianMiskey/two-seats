import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checklist } from "@/components/ui/Checklist";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "About | Two Seats",
  description:
    "Two Seats was founded on a simple belief: every successful partnership starts with two seats at the table. One seat for you. One seat for us.",
};

const whyWeStarted = [
  "We've seen too many small businesses struggle with websites that are slow, outdated, difficult to use or vulnerable to security risks.",
  "Often, business owners know something isn't working, but they're unsure what the problem is, who to trust, or whether they need an expensive redesign.",
  "We will collaborate as an experienced partner who can provide honest advice, practical recommendations and ongoing support without unnecessary complexity or cost.",
  "That's why we created Two Seats. To offer small businesses the expertise they need, delivered in a personal, approachable and transparent way.",
];

const approachPrinciples = [
  "Clear advice, without the technical jargon",
  "Recommendations based on what your business actually needs",
  "Practical improvements that deliver real value",
  "Responsive, personal support",
  "Long-term partnerships built on trust",
];

const coreServices = services.filter((service) => service.aboutBlurb);

export default function AboutPage() {
  return (
    <main>
      <Nav />
      <PageHero
        eyebrow="About"
        title="Better websites start with better conversations."
        description="Two Seats was founded on a simple belief: every successful partnership starts with two seats at the table. One seat for you. One seat for us."
      />

      <Section className="bg-white">
        <Reveal>
          <div className="flex max-w-3xl flex-col gap-5">
            <p className="text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
              We&apos;re a small business that works closely with South African small
              and medium-sized businesses to create better website experiences
              through collaboration, expert guidance and ongoing support.
            </p>
            <p className="text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
              Unlike traditional agencies that focus on large projects and complex
              retainers, we focus on practical website services that help
              businesses improve what they already have. Whether that&apos;s
              identifying what&apos;s holding a website back, keeping it secure
              and up to date, or making targeted improvements that create a
              better experience for customers, our goal is always the same:
              helping your website work harder for your business.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-mist">
        <Reveal>
          <SectionHeading eyebrow="Why we started" title="Why We Started Two Seats" />
        </Reveal>
        <Reveal>
          <div className="mt-8 flex max-w-3xl flex-col gap-5">
            {whyWeStarted.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-7 text-ink/70 sm:text-lg sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="bg-white">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Three core services."
            subtitle="We help businesses improve, maintain and protect their websites."
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {coreServices.map((service) => (
            <Link key={service.id} href={`/services#${service.id}`} className="block">
              <Card tone="light" className="h-full">
                <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink/70">
                  {service.aboutBlurb}
                </p>
              </Card>
            </Link>
          ))}
        </RevealGroup>
      </Section>

      <Section className="bg-mist">
        <Reveal>
          <SectionHeading
            eyebrow="How we work"
            title="Our Approach"
            subtitle="We believe website support should be straightforward, transparent and focused on outcomes. That means:"
          />
        </Reveal>
        <Reveal>
          <div className="mt-8 max-w-2xl">
            <Checklist items={approachPrinciples} />
          </div>
        </Reveal>
        <Reveal>
          <p className="mt-8 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
            We&apos;re not interested in selling services you don&apos;t need.
            We&apos;re interested in helping you create a better experience for
            your customers and greater confidence in your website.
          </p>
        </Reveal>
      </Section>

      <Section className="bg-ink text-white">
        <Reveal>
          <div className="flex flex-col items-start gap-8 rounded-[2rem] border border-white/15 bg-white/5 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">
                Let&apos;s take a seat
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Let&apos;s take a seat.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">
                Whether you&apos;re concerned about website performance,
                security, customer experience or simply don&apos;t know where
                to start, we&apos;re here to help. Book a call, tell us about
                your business and let&apos;s explore how we can make your
                website work better for you.
              </p>
            </div>

            <Button href="/contact" variant="primary" className="shrink-0">
              Book a call
            </Button>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </main>
  );
}
