type DatabaseErrorLike = {
  message?: unknown;
};

export function getGameCreationErrorMessage(
  error: DatabaseErrorLike,
): string {
  const message =
    typeof error.message === "string" ? error.message : "";

  if (message.includes("UNAUTHORIZED")) {
    return "Your session is no longer valid. Please sign in again.";
  }

  if (message.includes("FEATURE_DISABLED")) {
    return "Game creation is temporarily unavailable.";
  }

  if (message.includes("INVALID_INPUT")) {
    return "Some game settings are invalid. Please review them.";
  }

  if (message.includes("CONFLICT")) {
    return "You already have an active game, or this creation request conflicts with an earlier request.";
  }

  return "We couldn't create your game. Please try again.";
}
