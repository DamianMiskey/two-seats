import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/footer/Footer";
import { getHomepageContent } from "@/lib/sanity/getHomepageContent";
import { fallbackContent } from "@/lib/sanity/homepage-fallback";

export default async function Home() {
  const content = await getHomepageContent();
  const contactEmail = content.contactEmail ?? fallbackContent.contactEmail ?? "";

  return (
    <main>
      <Nav />
      <Hero content={content} />
      <Services />
      <Approach />
      <Contact contactEmail={contactEmail} />
      <Footer />
    </main>
  );
}
