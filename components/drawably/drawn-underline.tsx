import type { ComponentProps } from "react";
import { DrawablyUnderline as DrawablyUnderlinePrimitive } from "drawably/react";

import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnUnderlineProps = ComponentProps<typeof DrawablyUnderlinePrimitive> & {
  boil?: number;
};

export function DrawnUnderline({
  children,
  boil = DRAWABLY_DEFAULTS.boil,
  className = "",
  ...props
}: DrawnUnderlineProps) {
  return (
    <DrawablyUnderlinePrimitive {...props} boil={boil} className={className}>
      {children}
    </DrawablyUnderlinePrimitive>
  );
}
