import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "grey";
};

const toneClasses: Record<NonNullable<CardProps["tone"]>, string> = {
  light: "border-ink/10 bg-white",
  dark: "border-white/15 bg-white/5",
  grey: "border-ink/10 bg-white",
};

export function Card({ children, className = "", tone = "light" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8 ${toneClasses[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
