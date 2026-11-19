import type { ComponentProps } from "react";
import { DrawablyTextarea } from "drawably/react";
import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnTextareaProps = ComponentProps<typeof DrawablyTextarea>;

export function DrawnTextarea(props: DrawnTextareaProps) {
  return <DrawablyTextarea {...DRAWABLY_DEFAULTS} {...props} />;
}
