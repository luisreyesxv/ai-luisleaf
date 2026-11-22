import type { HTMLAttributes } from "react";
import { DrawablyAlert } from "drawably/react";
import { DRAWABLY_DEFAULTS } from "@/components/ui/drawably/config";
import { DrawnHighlight } from "./drawn-highlight";

type DrawnFormMessageProps = HTMLAttributes<HTMLParagraphElement> & {
  tone?: "error" | "success" | "description";
  stroke?: string;
  fill?: string;
};

const tones = {
  error: "text-danger",
  success: "text-success",
  description: "text-muted",
};

export function DrawnFormMessage({
  tone = "description",
  className = "",
  stroke = "currentColor",
  fill = "currentColor",
  children,
  ...props
}: DrawnFormMessageProps) {
  return (
    <div
      className={`text-sm leading-5 ${tones[tone]} ${className}`}
      role={tone === "error" ? "alert" : undefined}
      {...props}
    >
      {tone === "description" ? (
        children
      ) : (
        <DrawablyAlert
          width={2}
          className="p-5 "
          stroke={stroke}
          {...DRAWABLY_DEFAULTS}
        >
          <DrawnHighlight fill="currentColor">
            <span className={`font-black uppercase ${tones[tone]}`}>
              {children}
            </span>
          </DrawnHighlight>
        </DrawablyAlert>
      )}
    </div>
  );
}
