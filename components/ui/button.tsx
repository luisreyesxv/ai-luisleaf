import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
};

const variants = {
  primary: "bg-primary text-white enabled:hover:bg-primary-hover",
  secondary: "bg-surface text-foreground enabled:hover:bg-surface-muted",
};

const sizes = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-14 px-8 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-3 rounded-xl border-2 border-border-strong font-extrabold shadow-[4px_5px_0_#25221e] transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2
focus-visible:outline-offset-4
focus-visible:outline-primary ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
