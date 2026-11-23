"use client";

import { useActionState } from "react";

import { joinGameAction } from "@/app/actions/join-game";
import { DrawnAlert } from "@/components/drawably/drawn-alert";
import { DrawnFormField } from "@/components/drawably/drawn-form-field";
import { DrawnInput } from "@/components/drawably/drawn-input";
import { JoinGameCodeInput } from "@/components/games/join-game-code-input";
import { JoinGameSubmit } from "@/components/games/join-game-submit";
import { initialJoinGameState } from "@/lib/participants/types";

export function JoinGameForm() {
  const [state, formAction] = useActionState(
    joinGameAction,
    initialJoinGameState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" && <DrawnAlert>{state.message}</DrawnAlert>}

      <DrawnFormField
        label="Game code"
        htmlFor="joinCode"
        description="Enter the six-character code shared by your host."
        required
      >
        <JoinGameCodeInput />
      </DrawnFormField>

      <DrawnFormField
        label="Your display name"
        htmlFor="displayName"
        description="Choose a name other players will recognize. Maximum 16 characters."
        required
        stroke="black"
      >
        <DrawnInput
          id="displayName"
          name="displayName"
          type="text"
          placeholder="Your name"
          autoComplete="nickname"
          stroke="black"
          className="bg-white"
          maxLength={16}
          required
        />
      </DrawnFormField>

      <JoinGameSubmit />
    </form>
  );
}
