"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
};

export function Reveal({ children, className, y = 24, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean };

          if (reduce) {
            gsap.set(el, { opacity: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            el,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay,
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
