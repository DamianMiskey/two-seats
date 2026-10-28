import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const defaultLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type FooterLink = { label?: string | null; href?: string | null };

export function Footer({ links: linksProp, tagline }: { links?: FooterLink[] | null; tagline?: string | null } = {}) {
  const links = (linksProp?.length ? linksProp : defaultLinks).filter(
    (l): l is { label: string; href: string } => Boolean(l.label && l.href),
  );
  return (
    <footer className="bg-ink text-white">
      <Container className="flex flex-col gap-10 py-16">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="rounded-xl bg-white p-3">
            <Image
              src="/two-seats-logo.jpg"
              alt="Two Seats"
              width={1323}
              height={680}
              className="h-9 w-auto"
            />
          </div>

          <nav className="flex flex-wrap gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/70 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            {tagline ?? "Connect | Create | Collaborate"}
          </p>
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Two Seats. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
