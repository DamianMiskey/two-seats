type ChecklistProps = {
  items: string[];
  tone?: "light" | "dark";
};

export function Checklist({ items, tone = "light" }: ChecklistProps) {
  const textColor = tone === "dark" ? "text-white/85" : "text-ink/80";
  const iconClasses =
    tone === "dark" ? "bg-white/15 text-white" : "bg-emerald/15 text-emerald";

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${iconClasses}`}
          >
            <svg
              viewBox="0 0 20 20"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
            </svg>
          </span>
          <span className={`text-base leading-7 ${textColor}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
