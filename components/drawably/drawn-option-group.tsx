import { useId } from "react";
import type { FieldsetHTMLAttributes, ReactNode } from "react";
import { DrawnFormMessage } from "@/components/drawably/drawn-form-message";

type DrawnOptionGroupProps = FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

export function DrawnOptionGroup({
  label,
  description,
  error,
  required = false,
  children,
  className = "",
  ...props
}: DrawnOptionGroupProps) {
  const generatedId = useId();
  const messageId = `${props.id ?? generatedId}-message`;

  return (
    <fieldset
      className={`min-w-0 space-y-3 border-0 p-0 ${className}`}
      aria-describedby={description || error ? messageId : undefined}
      aria-invalid={error ? true : undefined}
      {...props}
    >
      <legend className="mb-1 text-sm font-bold text-foreground">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-primary">
            *
          </span>
        )}
      </legend>

      {children}

      {error ? (
        <DrawnFormMessage id={messageId} tone="error">
          {error}
        </DrawnFormMessage>
      ) : description ? (
        <DrawnFormMessage id={messageId}>{description}</DrawnFormMessage>
      ) : null}
    </fieldset>
  );
}
