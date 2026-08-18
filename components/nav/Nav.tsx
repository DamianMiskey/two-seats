"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a href="#top" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/two-seats-logo.jpg"
            alt="Two Seats"
            width={1323}
            height={680}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink/70 transition hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" variant="primary" className="px-5 py-2.5">
            Let&apos;s talk
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-ink/10 bg-white px-6 py-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-sm font-semibold text-ink/80 transition hover:bg-ink/5"
            >
              {link.label}
            </a>
          ))}
          <Button
            href="#contact"
            variant="primary"
            className="mt-2"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
