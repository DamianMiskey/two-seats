import type { AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "outline" | "outline-light";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-emerald text-ink hover:opacity-90",
  outline:
    "border border-ink/30 text-ink hover:bg-ink/5",
  "outline-light":
    "border border-white/40 text-white hover:bg-white/10",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      {...props}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition sm:text-base ${variantClasses[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
