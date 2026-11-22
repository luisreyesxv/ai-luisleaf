import type { HTMLAttributes } from "react";
import { DrawablyCard as DrawablyCardPrimitive } from "drawably/react";

import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnCardProps = HTMLAttributes<HTMLDivElement> & {
  boil?: number;
  stroke?: string;
  width?: number;
};

export function DrawnCard({
  children,
  className = "",
  stroke = "currentColor",
  boil = DRAWABLY_DEFAULTS.boil,
  ...props
}: DrawnCardProps) {
  return (
    <DrawablyCardPrimitive
      {...props}
      boil={boil}
      stroke={stroke}
      className={`block ${className}`}
    >
      {children}
    </DrawablyCardPrimitive>
  );
}
