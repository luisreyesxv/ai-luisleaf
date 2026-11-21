export type CreateGameActionState =
  | {
      status: "idle";
    }
  | {
      status: "error";
      message: string;
    }
  | {
      status: "success";
      gameId: string;
      joinCode: string;
      reused: boolean;
    };

export const initialCreateGameState: CreateGameActionState = {
  status: "idle",
};
