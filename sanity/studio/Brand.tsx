import type { LayoutProps, LogoProps } from "sanity";

// The Two Seats mark, drawn as SVG (the supplied logo is a CMYK JPEG on
// white, which would show as a white box on the dark top bar): an emerald
// square with the arc and two "seats".
export function TwoSeatsMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="6" fill="#47b175" />
      <path d="M14 6 A18 18 0 0 1 14 34" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="14" cy="6" r="3" fill="#fff" />
      <circle cx="14" cy="34" r="3" fill="#fff" />
    </svg>
  );
}

export function Logo({ title }: LogoProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, letterSpacing: "0.02em" }}>
      <TwoSeatsMark size={22} />
      {title}
    </span>
  );
}

// Loads Montserrat for the Studio (the website self-hosts it via next/font).
export function Layout(props: LayoutProps) {
  return (
    <>
      <style>{`@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");`}</style>
      {props.renderDefault(props)}
    </>
  );
}
