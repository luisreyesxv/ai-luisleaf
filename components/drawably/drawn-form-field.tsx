"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { DrawnLabel } from "@/components/drawably/drawn-label";
import { DrawnFormMessage } from "@/components/drawably/drawn-form-message";

type DrawnFormFieldProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  htmlFor: string;
  required?: boolean;
  annotated?: boolean;
  description?: string;
  error?: string;
  children: ReactNode;
  stroke?: string;
};

export function DrawnFormField({
  label,
  htmlFor,
  required = false,
  annotated = false,
  description,
  error,
  children,
  className = "",
  ...props
}: DrawnFormFieldProps) {
  const messageId = `${htmlFor}-message`;

  return (
    <div className={`space-y-2 ${className}`} {...props}>
      <DrawnLabel htmlFor={htmlFor} required={required} annotated={annotated}>
        {label}
      </DrawnLabel>

      {children}

      {error ? (
        <DrawnFormMessage id={messageId} tone="error">
          {error}
        </DrawnFormMessage>
      ) : description ? (
        <DrawnFormMessage id={messageId}>{description}</DrawnFormMessage>
      ) : null}
    </div>
  );
}
