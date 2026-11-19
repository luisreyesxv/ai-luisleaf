import type { HTMLAttributes, ReactNode } from "react";
import { DrawnDivider } from "@/components/drawably/drawn-divider";

type DrawnFormSectionProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  description?: string;
  children: ReactNode;
  divider?: boolean;
};

export function DrawnFormSection({
  title,
  description,
  children,
  divider = true,
  className = "",
  ...props
}: DrawnFormSectionProps) {
  return (
    <section className={`space-y-5 ${className}`} {...props}>
      {(title || description) && (
        <header className="space-y-1">
          {title && (
            <h3 className="text-lg font-extrabold tracking-tight">{title}</h3>
          )}

          {description && (
            <p className="text-sm leading-6 text-muted">{description}</p>
          )}
        </header>
      )}

      {children}

      {divider && <DrawnDivider />}
    </section>
  );
}
