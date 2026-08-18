import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Two Seats | Connect. Create. Collaborate.",
  description:
    "Two Seats is a small studio partnering with ambitious teams on brand, digital, and product work — from first idea to shipped experience.",
  openGraph: {
    title: "Two Seats | Connect. Create. Collaborate.",
    description:
      "Two Seats is a small studio partnering with ambitious teams on brand, digital, and product work — from first idea to shipped experience.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Two Seats | Connect. Create. Collaborate.",
    description:
      "Two Seats is a small studio partnering with ambitious teams on brand, digital, and product work — from first idea to shipped experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
