import { z } from "zod";

const formInteger = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() !== ""
      ? Number(value)
      : value,
  z.number().int(),
);

export const createGameSchema = z.object({
  creationRequestId: z.string().uuid(),
  mode: z.enum(["six_v_six", "hot_seat"]),
  turnDurationSeconds: formInteger.pipe(z.number().min(30).max(120)),
  wordsPerPlayer: formInteger.pipe(z.number().min(1).max(4)),
});

export type CreateGameInput = z.infer<typeof createGameSchema>;
