type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const eyebrowColor = tone === "dark" ? "text-white/70" : "text-emerald";
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const subtitleColor = tone === "dark" ? "text-white/70" : "text-ink/70";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClass}`}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm ${eyebrowColor}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`text-base leading-7 sm:text-lg sm:leading-8 ${subtitleColor}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
