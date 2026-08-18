import Image from "next/image";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
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
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/70 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Connect | Create | Collaborate
          </p>
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Two Seats. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
