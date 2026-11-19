import type { LabelHTMLAttributes, ReactNode } from "react";
import { DrawablyUnderline } from "drawably/react";

type DrawnLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  annotated?: boolean;
  children: ReactNode;
};

export function DrawnLabel({
  children,
  required = false,
  annotated = false,
  className = "",
  ...props
}: DrawnLabelProps) {
  return (
    <label
      className={`block text-sm font-bold text-foreground ${className}`}
      {...props}
    >
      {annotated ? <DrawablyUnderline>{children}</DrawablyUnderline> : children}

      {required && (
        <span aria-hidden="true" className="ml-1 text-primary">
          *
        </span>
      )}
    </label>
  );
}
