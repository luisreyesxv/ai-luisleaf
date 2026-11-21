import type { HTMLAttributes } from "react";

type TapePosition = "top-left" | "top-center" | "top-right";
type TapeColor = "cream" | "yellow" | "pink" | "blue";

type PaperTapeProps = HTMLAttributes<HTMLDivElement> & {
  position?: TapePosition;
  color?: TapeColor;
  rotation?: -1 | 0 | 1;
};

const positions: Record<TapePosition, string> = {
  "top-left": "left-6 -top-3",
  "top-center": "left-1/2 -top-3 -translate-x-1/2",
  "top-right": "right-6 -top-3",
};

const colors: Record<TapeColor, string> = {
  cream: "bg-[#f3e6c8]",
  yellow: "bg-[#f4d96b]",
  pink: "bg-[#f2b9bd]",
  blue: "bg-[#1B4D89]",
};

const rotations: Record<-1 | 0 | 1, string> = {
  [-1]: "-rotate-6",
  0: "rotate-0",
  1: "rotate-6",
};

export function PaperTape({
  position = "top-center",
  color = "cream",
  rotation = -1,
  className = "",
  ...props
}: PaperTapeProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 h-6 w-20 opacity-90 shadow-sm ${positions[position]} ${colors[color]} ${rotations[rotation]} ${className}`}
      style={{
        clipPath: "polygon(2% 0%, 98% 2%, 100% 96%, 1% 100%)",
        ...props.style,
      }}
    />
  );
}
