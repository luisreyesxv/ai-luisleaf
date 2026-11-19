import type { HTMLAttributes } from "react";

type CardVariant = "default" | "sticky" | "layered" | "outlined";
type StickyColor = "yellow" | "pink" | "blue" | "green";
type CardRotation = -2 | -1 | 0 | 1 | 2;
type PaperTexture = "none" | "subtle";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  stickyColor?: StickyColor;
  rotation?: CardRotation;
  texture?: PaperTexture;
};

const variants: Record<CardVariant, string> = {
  default: "bg-surface shadow-[4px_5px_0_#75221e]",
  sticky: "border border-border-strong shadow-[4px_5px_0_#25221e]",
  layered:
    "border border-border-strong bg-surface shadow-[3px_3px_0_#d8cfbf,6px_6px_0_#25221e]",
  outlined: "border-2 border-dashed border-border bg-transparent",
};

const stickyColors: Record<StickyColor, string> = {
  yellow: "bg-[#fff1a8]",
  pink: "bg-[#ffd6d9]",
  blue: "bg-[#cce8f5]",
  green: "bg-[#d5edc9]",
};

const rotations: Record<CardRotation, string> = {
  [-2]: "-rotate-2",
  [-1]: "-rotate-1",
  0: "rotate-0",
  1: "rotate-1",
  2: "rotate-2",
};

export function Card({
  children,
  variant = "default",
  stickyColor = "yellow",
  rotation = 0,
  texture = "subtle",
  className = "",
  ...props
}: CardProps) {
  const colorClass = variant === "sticky" ? stickyColors[stickyColor] : "";

  const textureClass =
    variant !== "outlined" && texture === "subtle" ? "paper-texture" : "";

  return (
    <div
      className={`relative p-5 ${variants[variant]} ${colorClass} ${rotations[rotation]} ${textureClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
