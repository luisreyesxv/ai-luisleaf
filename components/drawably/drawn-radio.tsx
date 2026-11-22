import type { ComponentProps } from "react";
import { DrawablyRadio } from "drawably/react";
import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnRadioProps = ComponentProps<typeof DrawablyRadio>;

export function DrawnRadio(props: DrawnRadioProps) {
  return (
    <DrawablyRadio
      stroke="currentColor"
      fill="currentColor"
      roughness={0.2}
      {...DRAWABLY_DEFAULTS}
      {...props}
    />
  );
}
