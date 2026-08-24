import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "outline-light";

type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  href: string;
};

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: undefined;
};

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-emerald text-ink hover:opacity-90",
  outline:
    "border border-ink/30 text-ink hover:bg-ink/5",
  "outline-light":
    "border border-white/40 text-white hover:bg-white/10",
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition sm:text-base ${variantClasses[variant]} ${className}`;

  if (props.href) {
    return (
      <a {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button {...buttonProps} type={type} className={classes}>
      {children}
    </button>
  );
}
