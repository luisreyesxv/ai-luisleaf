"use client";

import { useFormStatus } from "react-dom";

import { DrawnButton } from "@/components/drawably/drawn-button";

export function JoinGameSubmit() {
  const { pending } = useFormStatus();
  return (
    <DrawnButton
      type="submit"
      variant="solid"
      fill="var(--primary)"
      stroke="black"
      paper="white"
      disabled={pending}
      className="min-h-12! w-full font-black!  "
    >
      {pending ? "Joining game..." : "Join game"}
    </DrawnButton>
  );
}
