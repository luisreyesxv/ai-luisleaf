import type { HTMLAttributes, ReactNode } from "react";

import { DrawnHighlight } from "@/components/drawably/drawn-highlight";
import { DrawnCard } from "./drawn-card";

type DrawnAlertProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  stroke?: string;
  fill?: string;
};

export function DrawnAlert({
  children,
  className = "",
  stroke = "var(--danger)",
  fill = "var(--danger)",
  ...props
}: DrawnAlertProps) {
  return (
    <DrawnCard
      stroke={stroke}
      className={[
        "flex w-full items-center gap-3 bg-[#FFF1F2]",
        "p-3 text-sm font-semibold text-danger",
        className,
      ].join(" ")}
      {...props}
    >
      <DrawnHighlight fill={fill}>
        <span className="flex size-7 shrink-0 items-center justify-center text-lg font-black text-black">
          !
        </span>
      </DrawnHighlight>

      <div className="min-w-0 flex-1">{children}</div>
    </DrawnCard>
  );
}
