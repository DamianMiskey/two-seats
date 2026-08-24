import type { Metadata } from "next";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services | Two Seats",
  description:
    "Website audits, care & security plans, cybersecurity and website improvements for small and medium-sized businesses.",
};

export default function ServicesPage() {
  return (
    <main>
      <Nav />
      <PageHero
        eyebrow="What we do"
        title="Practical website services, sized to your business."
        description="From a one-off health check to ongoing care and targeted improvements — clear advice and practical support, without the cost and commitment of a full-service agency."
      >
        <div className="flex flex-wrap gap-3 pt-2">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              {service.title}
            </a>
          ))}
        </div>
      </PageHero>

      {services.map((service, index) => (
        <ServiceSection
          key={service.id}
          service={service}
          tone={index % 2 === 0 ? "white" : "mist"}
        />
      ))}
      <Footer />
    </main>
  );
}
