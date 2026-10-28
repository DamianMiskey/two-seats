import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Checklist } from "@/components/ui/Checklist";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { RichText } from "@/components/ui/RichText";
import { getContact, getSettings, metadataFor } from "@/lib/sanity/content";

export async function generateMetadata() {
  const page = await getContact({ stega: false });
  return metadataFor(page.seo);
}

export default async function ContactPage() {
  const [settings, page] = await Promise.all([getSettings(), getContact()]);
  const contactEmail = settings.contactEmail ?? "";
  const options = page.interests?.options ?? [];
  const nextSteps = page.nextSteps?.steps ?? [];

  return (
    <main>
      <Nav links={settings.navigation} cta={settings.headerCta} />
      <PageHero eyebrow={page.hero?.eyebrow ?? ""} title={page.hero?.title ?? ""} description={page.hero?.lead ?? undefined} />

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-start">
          <div className="flex flex-col gap-10">
            <Reveal>
              <RichText value={page.intro} className="flex flex-col gap-4" />
            </Reveal>

            <Reveal>
              <div className="flex flex-col gap-4">
                <SectionHeading eyebrow={page.interests?.heading?.eyebrow ?? ""} title={page.interests?.heading?.title ?? ""} />
                <Checklist items={options} />
              </div>
            </Reveal>

            <Reveal>
              <div className="flex flex-col gap-4">
                <SectionHeading eyebrow={page.nextSteps?.heading?.eyebrow ?? ""} title={page.nextSteps?.heading?.title ?? ""} />
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
            <ContactForm contactEmail={contactEmail} options={options} />
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

      <Footer links={settings.navigation} tagline={settings.tagline} />
    </main>
  );
}
