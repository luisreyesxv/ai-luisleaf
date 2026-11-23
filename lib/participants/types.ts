export type JoinGameActionState =
  | { status: "idle" }
  | { status: "error"; message: string };

export const initialJoinGameState: JoinGameActionState = {
  status: "idle",
};
