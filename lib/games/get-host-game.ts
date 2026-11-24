import "server-only";

import { redirect, notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function getHostGame(gameId: string) {
  const supabase = await createClient();

  // Verify the authenticated user's identity.
  const { data: claimsData, error: authError } =
    await supabase.auth.getClaims();

  const userId = claimsData?.claims?.sub;

  if (authError || typeof userId !== "string") {
    redirect("/sign-in");
  }

  // Retrieve only a game owned by this user.
  const { data: game, error } = await supabase
    .from("games")
    .select("id, join_code, status, mode, phase, settings, created_at")
    .eq("id", gameId)
    .eq("host_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Failed to load host game:", error);
    throw new Error("Unable to load this game.");
  }

  // Hide games that don't exist or aren't owned by this user.
  if (!game) {
    notFound();
  }

  return game;
}
