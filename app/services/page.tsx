import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { getCarePlans, getServices, getServicesPage, getSettings, metadataFor } from "@/lib/sanity/content";

export async function generateMetadata() {
  const page = await getServicesPage({ stega: false });
  return metadataFor(page.seo);
}

export default async function ServicesPage() {
  const [settings, page, services, carePlans] = await Promise.all([getSettings(), getServicesPage(), getServices(), getCarePlans()]);

  return (
    <main>
      <Nav links={settings.navigation} cta={settings.headerCta} />
      <PageHero eyebrow={page.hero?.eyebrow ?? ""} title={page.hero?.title ?? ""} description={page.hero?.lead ?? undefined}>
        <div className="flex flex-wrap gap-3 pt-2">
          {services.map((service) => (
            <a
              key={service._id}
              href={`#${service.slug}`}
              className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              {service.title}
            </a>
          ))}
        </div>
      </PageHero>

      {services.map((service, index) => (
        <ServiceSection key={service._id} service={service} carePlans={carePlans} tone={index % 2 === 0 ? "white" : "mist"} />
      ))}

      <Footer links={settings.navigation} tagline={settings.tagline} />
    </main>
  );
}
