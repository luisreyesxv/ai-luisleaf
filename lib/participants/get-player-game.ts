import "server-only";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createAdminClient } from "@/lib/supabase/admin";

export async function getPlayerGame(gameId: string) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(`guest_session_${gameId}`)?.value;

  if (!sessionToken) {
    redirect("/join");
  }

  // Hash the guest token to match the hash stored in the database.
  const sessionTokenHash = createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const supabase = createAdminClient();

  // Verify this guest's session and retrieve only their own information.
  const { data: participant, error: participantError } = await supabase
    .from("participants")
    .select("id, display_name")
    .eq("game_id", gameId)
    .eq("session_token_hash", sessionTokenHash)
    .is("removed_at", null)
    .maybeSingle();

  if (participantError) {
    console.error("Failed to verify player session:", participantError);
    throw new Error("Unable to load the player room.");
  }

  if (!participant) {
    redirect("/join");
  }

  // Retrieve the game state needed to determine what the player should see.
  const { data: game, error: gameError } = await supabase
    .from("games")
    .select("id, status, phase, mode")
    .eq("id", gameId)
    .maybeSingle();

  if (gameError) {
    console.error("Failed to load player game:", gameError);
    throw new Error("Unable to load the player room.");
  }

  if (!game || game.status !== "active") {
    redirect("/join");
  }

  return {
    participant,
    game,
  };
}
