import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";

// Renders Sanity rich text in the site's type styles. Links were validated in
// the Studio (https, mailto, tel, paths, anchors only); external ones open in
// a new tab without leaking the referrer.
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">{children}</p>,
    lead: ({ children }) => <p className="text-lg leading-8 text-ink/80 sm:text-xl">{children}</p>,
    h3: ({ children }) => <h3 className="pt-2 text-xl font-semibold text-ink sm:text-2xl">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-ink/70 sm:text-lg">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6 text-base leading-7 text-ink/70 sm:text-lg">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("https://");
      return (
        <a href={href} className="font-semibold text-emerald underline underline-offset-4" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

// Typed loosely on purpose: TypeGen's rich-text type marks some fields
// optional that the renderer's type marks required; the data is the same.
export function RichText({ value, className = "flex flex-col gap-5" }: { value?: unknown; className?: string }) {
  if (!Array.isArray(value) || !value.length) return null;
  return (
    <div className={className}>
      <PortableText value={value as PortableTextBlock[]} components={components} />
    </div>
  );
}
