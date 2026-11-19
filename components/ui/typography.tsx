import type { HTMLAttributes } from "react";

type TypographyProps = HTMLAttributes<HTMLParagraphElement>;

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type EyebrowProps = TypographyProps;

export function PageTitle({ className = "", ...props }: HeadingProps) {
  return (
    <h1
      className={`text-4xl leading-[1.05] font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl ${className}`}
      {...props}
    />
  );
}

export function SectionTitle({ className = "", ...props }: HeadingProps) {
  return (
    <h2
      className={`text-2xl leading-tight font-extrabold tracking-[-0.03em] sm:text-3xl ${className}`}
      {...props}
    />
  );
}

export function Eyebrow({ className = "", ...props }: EyebrowProps) {
  return (
    <p
      className={`text-xs font-extrabold uppercase tracking-[0.16em] text-muted ${className}`}
      {...props}
    />
  );
}

export function BodyText({ className = "", ...props }: TypographyProps) {
  return (
    <p
      className={`text-base leading-7 text-foreground ${className}`}
      {...props}
    />
  );
}

export function Caption({ className = "", ...props }: TypographyProps) {
  return (
    <p className={`text-sm leading-5 text-muted ${className}`} {...props} />
  );
}
