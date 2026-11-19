import type { HTMLAttributes } from "react";

type DrawnFormActionsProps = HTMLAttributes<HTMLDivElement> & {
  alignment?: "start" | "center" | "end" | "between";
};

const alignments = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export function DrawnFormActions({
  alignment = "end",
  className = "",
  ...props
}: DrawnFormActionsProps) {
  return (
    <div
      className={`flex flex-col-reverse gap-3 sm:flex-row sm:items-center ${alignments[alignment]} ${className}`}
      {...props}
    />
  );
}
