import { connection } from "next/server";

import { GameDetailsCard } from "@/components/games/lobby/game-details-card";
import { GameJoinCodeCard } from "@/components/games/lobby/game-join-code-card";
import { LobbyRefresh } from "@/components/games/lobby/lobby-refresh";
import { LobbyHeader } from "@/components/games/lobby/lobby-header";
import { LobbyPlayerList } from "@/components/games/lobby/lobby-player-list";

import { getHostGameLobby } from "@/lib/games/get-host-game-lobby";

export const instant = false;

type LobbyPageProps = {
  params: Promise<{
    gameId: string;
  }>;
};

export default async function LobbyPage({ params }: LobbyPageProps) {
  await connection();

  const { gameId } = await params;
  const { game, participants } = await getHostGameLobby(gameId);

  return (
    <main className="space-y-8">
      <LobbyRefresh phase={game.phase} />
      <LobbyHeader />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <GameJoinCodeCard joinCode={game.join_code} />

        <GameDetailsCard
          mode={game.mode}
          status={game.status}
          phase={game.phase}
        />
      </div>

      <LobbyPlayerList participants={participants} />
    </main>
  );
}
