"use client";

import type { ComponentProps } from "react";
import { DrawablyHighlight as DrawablyHighlightPrimitive } from "drawably/react";

import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnHighlightProps = ComponentProps<typeof DrawablyHighlightPrimitive> & {
  boil?: number;
};

export function DrawnHighlight({
  children,
  boil = DRAWABLY_DEFAULTS.boil,
  className = "",
  ...props
}: DrawnHighlightProps) {
  return (
    <DrawablyHighlightPrimitive {...props} boil={boil} className={className}>
      {children}
    </DrawablyHighlightPrimitive>
  );
}
