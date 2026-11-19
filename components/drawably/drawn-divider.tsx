import type { ComponentProps } from "react";
import { DrawablyDivider as DrawablyDividerPrimitive } from "drawably/react";

import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnDividerProps = ComponentProps<typeof DrawablyDividerPrimitive> & {
  boil?: number;
};

export function DrawnDivider({
  boil = DRAWABLY_DEFAULTS.boil,
  className = "",
  ...props
}: DrawnDividerProps) {
  return (
    <DrawablyDividerPrimitive {...props} boil={boil} className={className} />
  );
}
