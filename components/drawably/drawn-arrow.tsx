import type { ComponentProps } from "react";
import { DrawablyArrow as DrawablyArrowPrimitive } from "drawably/react";

import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnArrowProps = ComponentProps<typeof DrawablyArrowPrimitive> & {
  boil?: number;
};

export function DrawnArrow({
  boil = DRAWABLY_DEFAULTS.boil,
  ...props
}: DrawnArrowProps) {
  return <DrawablyArrowPrimitive {...props} boil={boil} />;
}
