"use server";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { JoinGameActionState } from "@/lib/participants/types";
import { createAdminClient } from "@/lib/supabase/admin";
import { joinGameSchema } from "@/lib/validations/join-game";

const GUEST_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export async function joinGameAction(
  _previousState: JoinGameActionState,
  formData: FormData,
): Promise<JoinGameActionState> {
  const parsed = joinGameSchema.safeParse({
    joinCode: formData.get("joinCode"),
    displayName: formData.get("displayName"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ??
        "Please check your information and try again.",
    };
  }

  // Generate a secure guest session token.
  const sessionToken = randomBytes(32).toString("hex");

  // Only the hash is stored in the database.
  const sessionTokenHash = createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const supabase = createAdminClient();

  const { data, error } = await supabase.rpc("join_game", {
    p_join_code: parsed.data.joinCode,
    p_display_name: parsed.data.displayName,
    p_session_token_hash: sessionTokenHash,
  });

  if (error) {
    console.error("Failed to join game:", error);

    return {
      status: "error",
      message: "Unable to join that game. Check the game code and try again.",
    };
  }

  const participant = data?.[0];

  if (!participant?.game_id || !participant.participant_id) {
    return {
      status: "error",
      message: "Unable to join that game. Please try again.",
    };
  }

  // Store the raw token in an HttpOnly cookie.
  const cookieStore = await cookies();

  cookieStore.set(`guest_session_${participant.game_id}`, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: `/games/${participant.game_id}`,
    maxAge: GUEST_SESSION_MAX_AGE,
  });

  redirect(`/games/${participant.game_id}/lobby`);
}
