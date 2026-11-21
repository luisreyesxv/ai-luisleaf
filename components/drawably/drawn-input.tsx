"use client";

import type { ComponentProps } from "react";
import { DrawablyInput } from "drawably/react";
import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnInputProps = ComponentProps<typeof DrawablyInput> & {
  wrapperClassName?: string;
};

export function DrawnInput({
  wrapperClassName = "",
  className = "",
  ...props
}: DrawnInputProps) {
  return (
    <div className={`w-full min-w-0 ${wrapperClassName}`}>
      <DrawablyInput
        roughness={1.0}
        {...DRAWABLY_DEFAULTS}
        {...props}
        className={`w-full min-w-0 ${className}`}
      />
    </div>
  );
}
