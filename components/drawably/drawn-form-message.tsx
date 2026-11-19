import type { HTMLAttributes } from "react";
import { DrawablyBadge } from "drawably/react";
import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";

type DrawnFormMessageProps = HTMLAttributes<HTMLParagraphElement> & {
  tone?: "error" | "success" | "description";
};

const tones = {
  error: "text-danger",
  success: "text-success",
  description: "text-muted",
};

export function DrawnFormMessage({
  tone = "description",
  className = "",
  children,
  ...props
}: DrawnFormMessageProps) {
  return (
    <p
      className={`text-sm leading-5 ${tones[tone]} ${className}`}
      role={tone === "error" ? "alert" : undefined}
      {...props}
    >
      {tone === "description" ? (
        children
      ) : (
        <DrawablyBadge {...DRAWABLY_DEFAULTS} variant="outline">
          <span className={tones[tone]}>{children}</span>
        </DrawablyBadge>
      )}
    </p>
  );
}
