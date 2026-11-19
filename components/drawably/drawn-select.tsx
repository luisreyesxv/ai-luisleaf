import type { ComponentProps } from "react";
import { DrawablySelect } from "drawably/react";
import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnSelectProps = ComponentProps<typeof DrawablySelect>;

export function DrawnSelect(props: DrawnSelectProps) {
  return <DrawablySelect roughness={1.2} {...DRAWABLY_DEFAULTS} {...props} />;
}
