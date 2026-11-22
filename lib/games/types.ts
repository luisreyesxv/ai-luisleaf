export type CreateGameActionState =
  | {
      status: "idle";
    }
  | {
      status: "error";
      message: string;
    };

export const initialCreateGameState: CreateGameActionState = {
  status: "idle",
};
