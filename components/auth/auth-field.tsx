import type { HTMLInputAutoCompleteAttribute } from "react";

type AuthFieldProps = {
  id: string;
  name: string;
  label: string;
  type: "email" | "password";
  autoComplete: HTMLInputAutoCompleteAttribute;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
};

export function AuthField({
  id,
  name,
  label,
  type,
  autoComplete,
  placeholder,
  required = false,
  minLength,
  maxLength,
}: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-bold text-foreground">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className="min-h-12 w-full border-2 border-border bg-surface px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
      />
    </div>
  );
}
