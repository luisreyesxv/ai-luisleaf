"use client";

import { useFormStatus } from "react-dom";

import { DrawnButton } from "@/components/drawably/drawn-button";

type CreateGameSubmitProps = {
  hasError?: boolean;
};

export function CreateGameSubmit({ hasError = false }: CreateGameSubmitProps) {
  const { pending } = useFormStatus();

  const buttonColor = hasError ? "var(--danger)" : "var(--primary)";

  return (
    <DrawnButton
      type="submit"
      variant="solid"
      fill={buttonColor}
      stroke={"black"}
      state={pending ? "loading" : "idle"}
      disabled={pending}
      className="w-full sm:w-auto !font-black"
    >
      {pending ? "Creating your game..." : "Create game"}
    </DrawnButton>
  );
}
