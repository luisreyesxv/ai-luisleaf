import { connection } from "next/server";

import { JoinPageBrand } from "@/components/games/join-page-brand";
import { PlayerLobbyDecorations } from "@/components/games/player-lobby/player-lobby-decorations";
import { PlayerLobbyFunFact } from "@/components/games/player-lobby/player-lobby-fun-fact";
import { PlayerLobbyRefresh } from "@/components/games/player-lobby/player-lobby-refresh";
import { PlayerLobbyWelcome } from "@/components/games/player-lobby/player-lobby-welcome";
import { getPlayerGame } from "@/lib/participants/get-player-game";

export const instant = false;

type PlayerLobbyPageProps = {
  params: Promise<{ gameId: string }>;
};

export default async function PlayerLobbyPage({
  params,
}: PlayerLobbyPageProps) {
  await connection();

  const { gameId } = await params;
  const { participant, game } = await getPlayerGame(gameId);

  const isWaiting = game.phase === "lobby";

  return (
    <main className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#FFF8E7] px-4 py-8 sm:px-6">
      <PlayerLobbyDecorations />

      <PlayerLobbyRefresh phase={game.phase} />

      <section className="relative z-10 w-full max-w-lg space-y-5">
        <JoinPageBrand />

        <PlayerLobbyWelcome
          displayName={participant.display_name}
          isWaiting={isWaiting}
        />

        <PlayerLobbyFunFact />
      </section>
    </main>
  );
}
