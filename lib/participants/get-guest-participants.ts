import "server-only";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";

import { createAdminClient } from "@/lib/supabase/admin";

type GuestParticipant = {
  id: string;
  display_name: string;
};

export async function getGuestParticipant(
  gameId: string,
): Promise<GuestParticipant | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(`guest_session_${gameId}`)?.value;

  if (!sessionToken) {
    return null;
  }

  const sessionTokenHash = createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("participants")
    .select("id, display_name")
    .eq("game_id", gameId)
    .eq("session_token_hash", sessionTokenHash)
    .is("removed_at", null)
    .maybeSingle();

  if (error) {
    console.error("Failed to verify guest participant:", error);
    throw new Error("Unable to verify guest session.");
  }

  return data;
}
