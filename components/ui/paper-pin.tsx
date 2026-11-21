import type { HTMLAttributes } from "react";

type PinPosition = "top-left" | "top-center" | "top-right";
type PinColor = "red" | "yellow" | "blue" | "green";

type PaperPinProps = HTMLAttributes<HTMLDivElement> & {
  position?: PinPosition;
  color?: PinColor;
};

const positions: Record<PinPosition, string> = {
  "top-left": "left-5 -top-2",
  "top-center": "left-1/2 -top-2 -translate-x-1/2",
  "top-right": "right-5 -top-2",
};

const colors: Record<PinColor, string> = {
  red: "bg-[#d94b3d]",
  yellow: "bg-[#e8bd4a]",
  blue: "bg-[#5795b5]",
  green: "bg-[#54865b]",
};

export function PaperPin({
  position = "top-center",
  color = "red",
  className = "",
  ...props
}: PaperPinProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 size-4 rounded-full border border-black/20 shadow-[1px_2px_2px_rgb(0_0_0/25%)] ${positions[position]} ${colors[color]} ${className}`}
    >
      <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50" />
    </div>
  );
}
