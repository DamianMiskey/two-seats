import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Checklist } from "@/components/ui/Checklist";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { getHomepageContent } from "@/lib/sanity/getHomepageContent";
import { fallbackContent } from "@/lib/sanity/homepage-fallback";

export const metadata: Metadata = {
  title: "Contact | Two Seats",
  description:
    "Let's start the conversation. Tell us a little about your business and what you'd like help with, and we'll guide you from there.",
};

const helpOptions = [
  "Website Audit & Recommendation Packages",
  "Website Care & Security Packages",
  "Website Improvements & Enhancements",
  "Cybersecurity for Small Businesses",
  "General Website Advice & Support",
];

const nextSteps = [
  "We review your information and get in touch to arrange a discovery call.",
  "During the call, we discuss your website, understand your goals and recommend the most appropriate next steps for your business.",
  "No jargon. No hard sell. Just honest advice and practical recommendations.",
];

export default async function ContactPage() {
  const content = await getHomepageContent();
  const contactEmail = content.contactEmail ?? fallbackContent.contactEmail ?? "";

  return (
    <main>
      <Nav />
      <PageHero
        eyebrow="Contact"
        title="Let's Start the Conversation"
        description="Whether you're concerned about your website's performance, security, user experience, or simply know it could be working harder for your business, we'd love to hear from you."
      />

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-start">
          <div className="flex flex-col gap-10">
            <Reveal>
              <div className="flex flex-col gap-4">
                <p className="text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
                  At Two Seats, we believe better websites start with better
                  conversations. That&apos;s why every project begins with
                  understanding your business, your goals and the challenges
                  you&apos;re facing.
                </p>
                <p className="text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
                  You don&apos;t need a detailed brief or all the answers.
                  Simply tell us a little about your business and what
                  you&apos;d like help with, and we&apos;ll guide you from
                  there.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="flex flex-col gap-4">
                <SectionHeading
                  eyebrow="How we can help"
                  title="What are you interested in?"
                />
                <Checklist items={helpOptions} />
              </div>
            </Reveal>

            <Reveal>
              <div className="flex flex-col gap-4">
                <SectionHeading
                  eyebrow="What happens next?"
                  title="Once you get in touch"
                />
                <ol className="flex flex-col gap-3">
                  {nextSteps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald/15 text-xs font-semibold text-emerald">
                        {index + 1}
                      </span>
                      <span className="text-base leading-7 text-ink/70">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <ContactForm contactEmail={contactEmail} />
          </Reveal>
        </div>
      </Section>

      <Section className="bg-ink text-white">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">
              Ready to get started?
            </p>
            <p className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
              One seat for you. One seat for us. Better websites together.
            </p>
          </div>
        </Reveal>
      </Section>

      <Footer />
    </main>
  );
}
