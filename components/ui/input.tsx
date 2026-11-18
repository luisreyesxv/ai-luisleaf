import { useId } from "react";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
};

export function Input({
  label,
  hint,
  error,
  id,
  className = "",
  containerClassName = "",
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const describedBy =
    [ariaDescribedBy, hint ? hintId : undefined, error ? errorId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-bold text-foreground">
          {label}
        </label>
      )}

      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`min-h-12 w-full rounded-xl border-2 bg-surface px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? "border-danger" : "border-border"
        } ${className}`}
        {...props}
      />

      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm font-medium text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}
