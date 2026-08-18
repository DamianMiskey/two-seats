"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsap";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
};

export function RevealGroup({
  children,
  className,
  y = 24,
  stagger = 0.08,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const items = gsap.utils.toArray<HTMLElement>(el.children);
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean };

          if (reduce) {
            gsap.set(items, { opacity: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            items,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
