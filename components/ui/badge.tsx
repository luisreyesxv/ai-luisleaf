import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "sm" | "md";
};

const variants = {
  default: "bg-surface-muted text-foreground border-border",
  primary: "bg-primary/10 text-primary border-primary/30",
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-secondary/30 text-foreground border-secondary",
  danger: "bg-danger/10 text-danger border-danger/30",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-bold ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
