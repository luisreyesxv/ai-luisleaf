import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: "sm" | "md" | "lg";
};

const spacings = {
  sm: "py-6 sm:py-8",
  md: "py-10 sm:py-14",
  lg: "py-14 sm:py-20",
};

export function Section({
  spacing = "md",
  className = "",
  ...props
}: SectionProps) {
  return <section className={`${spacings[spacing]} ${className}`} {...props} />;
}
