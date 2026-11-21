"use server";

import { createClient } from "@/lib/supabase/server";
import { createGameSchema } from "@/lib/validations/game";
import { getGameCreationErrorMessage } from "@/lib/games/errors";
import type { CreateGameActionState } from "@/lib/games/types";

export async function createGameAction(
  _previousState: CreateGameActionState,
  formData: FormData,
): Promise<CreateGameActionState> {
  const parsed = createGameSchema.safeParse({
    creationRequestId: formData.get("creationRequestId"),
    mode: formData.get("mode"),
    turnDurationSeconds: formData.get("turnDurationSeconds"),
    wordsPerPlayer: formData.get("wordsPerPlayer"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please review your game settings and try again.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      status: "error",
      message: "Please sign in before creating a game.",
    };
  }

  const { data, error } = await supabase.rpc("create_game", {
    p_creation_request_id: parsed.data.creationRequestId,
    p_mode: parsed.data.mode,
    p_turn_duration_seconds: parsed.data.turnDurationSeconds,
    p_words_per_player: parsed.data.wordsPerPlayer,
  });

  if (error) {
    return {
      status: "error",
      message: getGameCreationErrorMessage(error),
    };
  }

  const game = data?.[0];

  if (!game?.game_id || !game.join_code) {
    return {
      status: "error",
      message: "The game could not be created. Please try again.",
    };
  }

  return {
    status: "success",
    gameId: game.game_id,
    joinCode: game.join_code,
    reused: game.reused,
  };
}
