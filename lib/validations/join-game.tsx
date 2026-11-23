import { z } from "zod";

export const joinGameSchema = z.object({
  joinCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9]{6}$/, "Enter a valid six-character game code."),

  displayName: z
    .string()
    .transform((value) => value.replace(/\s+/g, " ").trim())
    .pipe(
      z
        .string()
        .min(1, "Enter a display name.")
        .max(16, "Display names cannot exceed 16 characters."),
    ),
});

export type JoinGameInput = z.infer<typeof joinGameSchema>;
