import type { ComponentProps } from "react";
import { DrawablyToggle } from "drawably/react";
import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnToggleProps = ComponentProps<typeof DrawablyToggle>;

export function DrawnToggle(props: DrawnToggleProps) {
  return <DrawablyToggle roughness={0.6} {...DRAWABLY_DEFAULTS} {...props} />;
}
