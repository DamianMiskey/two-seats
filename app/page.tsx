import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/footer/Footer";
import { getHome, getServices, getSettings, metadataFor } from "@/lib/sanity/content";

export async function generateMetadata() {
  const home = await getHome();
  return metadataFor(home.seo);
}

export default async function Home() {
  const [settings, home, services] = await Promise.all([getSettings(), getHome(), getServices()]);
  const contactEmail = settings.contactEmail ?? "";
  const hero = home.hero;

  return (
    <main>
      <Nav links={settings.navigation} cta={settings.headerCta} />
      <Hero
        content={{
          title: hero?.title ?? "",
          tagline: hero?.eyebrow ?? settings.tagline ?? "",
          description: hero?.lead ?? "",
          contactEmail,
          highlightPhrase: hero?.highlightPhrase ?? undefined,
          primaryCta: hero?.primaryCta,
          secondaryCta: hero?.secondaryCta,
          highlights: hero?.showServiceTags === false ? [] : services.map((s) => ({ _key: s._id, title: s.shortLabel ?? s.title ?? "", href: `/services#${s.slug}` })),
        }}
      />
      <Services heading={home.servicesSection} services={services} />
      <Approach approach={home.approach} />
      <Contact contactEmail={contactEmail} content={home.contactSection} />
      <Footer links={settings.navigation} tagline={settings.tagline} />
    </main>
  );
}
