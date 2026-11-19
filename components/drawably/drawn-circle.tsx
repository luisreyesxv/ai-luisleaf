import type { ComponentProps } from "react";
import { DrawablyCircle as DrawablyCirclePrimitive } from "drawably/react";

import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnCircleProps = ComponentProps<typeof DrawablyCirclePrimitive> & {
  boil?: number;
};

export function DrawnCircle({
  children,
  boil = DRAWABLY_DEFAULTS.boil,
  className = "",
  ...props
}: DrawnCircleProps) {
  return (
    <DrawablyCirclePrimitive {...props} boil={boil} className={className}>
      {children}
    </DrawablyCirclePrimitive>
  );
}
