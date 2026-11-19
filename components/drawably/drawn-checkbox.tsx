import type { ComponentProps } from "react";
import { DrawablyCheckbox } from "drawably/react";
import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnCheckboxProps = ComponentProps<typeof DrawablyCheckbox>;

export function DrawnCheckbox(props: DrawnCheckboxProps) {
  return <DrawablyCheckbox {...DRAWABLY_DEFAULTS} {...props} />;
}
