import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Montserrat } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from "@/components/ui/DisableDraftMode";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const siteTitle = "Two Seats | Website Audits, Care & Cybersecurity";
const siteDescription =
  "Two Seats helps small and medium-sized businesses keep their websites secure, performing at their best and delivering better experiences for their customers.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        {/* Keeps sanityFetch content fresh: re-renders within seconds of a publish. */}
        <SanityLive />
        {(await draftMode()).isEnabled ? (
          <>
            {/* Click-to-edit overlays, only while an editor previews drafts. */}
            <VisualEditing />
            <DisableDraftMode />
          </>
        ) : null}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
