import type { HTMLAttributes } from "react";

type FoldedCornerProps = HTMLAttributes<HTMLDivElement> & {
  color?: "cream" | "yellow" | "pink" | "blue";
  size?: "sm" | "md" | "lg";
};

const colors = {
  cream: "bg-[#e8dfce]",
  yellow: "bg-[#e8d98e]",
  pink: "bg-[#e8bfc1]",
  blue: "bg-[#b7d4e1]",
};

const sizes = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

export function FoldedCorner({
  color = "cream",
  size = "md",
  className = "",
  ...props
}: FoldedCornerProps) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={`pointer-events-none absolute right-0 top-0 z-10 shadow-sm ${colors[color]} ${sizes[size]} ${className}`}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%)",
        ...props.style,
      }}
    />
  );
}
