import type { ComponentProps } from "react";
import { DrawablyInput } from "drawably/react";
import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnInputProps = ComponentProps<typeof DrawablyInput> & {
  wrapperClassName?: string;
};

export function DrawnInput({
  wrapperClassName = "",
  ...props
}: DrawnInputProps) {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      <DrawablyInput roughness={1.0} {...DRAWABLY_DEFAULTS} {...props} />
    </div>
  );
}
