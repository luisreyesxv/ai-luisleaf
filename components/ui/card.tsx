import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "outlined";
};

export function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  const variants = {
    default:
      "border-1 border-border-strong bg-surface shadow-[4px_5px_0_#25221e]",
    outlined: "border-2 border-dashed border-border bg-transparent",
  };

  return (
    <div
      className={`rounded-2xl p-5 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
