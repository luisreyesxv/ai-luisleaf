"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type PlayerLobbyRefreshProps = {
  phase: string;
};

export function PlayerLobbyRefresh({ phase }: PlayerLobbyRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    if (phase !== "lobby") {
      return;
    }

    const interval = window.setInterval(() => {
      router.refresh();
    }, 2500);

    return () => {
      window.clearInterval(interval);
    };
  }, [phase, router]);

  return null;
}
