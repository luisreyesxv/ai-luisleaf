import type { ButtonHTMLAttributes } from "react";
import { DrawablyButton as DrawablyButtonPrimitive } from "drawably/react";

import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "solid" | "scribble";
  state?: "idle" | "loading" | "error" | "success";
  tone?: "neutral" | "danger";
};

export function DrawnButton({
  children,
  variant = "outline",
  state = "idle",
  tone = "neutral",
  type = "button",
  className = "",
  ...props
}: DrawnButtonProps) {
  return (
    <DrawablyButtonPrimitive
      {...DRAWABLY_DEFAULTS}
      type={type}
      variant={variant}
      state={state}
      tone={tone}
      className={`inline-flex min-h-12 items-center justify-center gap-3 px-6 text-sm font-bold ${className}`}
      {...props}
    >
      {children}
    </DrawablyButtonPrimitive>
  );
}
