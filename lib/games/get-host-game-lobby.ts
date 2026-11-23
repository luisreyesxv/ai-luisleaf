import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { getHostGame } from "@/lib/games/get-host-game";

export async function getHostGameLobby(gameId: string) {
  // Verify authentication and game ownership first.
  const game = await getHostGame(gameId);

  // Participants are only accessible through the server-side admin client.
  const supabase = createAdminClient();

  const { data: participants, error } = await supabase
    .from("participants")
    .select("id, display_name, joined_at")
    .eq("game_id", game.id)
    .is("removed_at", null)
    .order("joined_at", { ascending: true });

  if (error) {
    console.error("Failed to load game participants:", error);
    throw new Error("Unable to load game participants.");
  }

  return {
    game,
    participants: participants ?? [],
  };
}
