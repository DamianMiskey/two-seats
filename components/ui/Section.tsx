import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({
  id,
  children,
  className = "",
  containerClassName = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-24 sm:py-32 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
