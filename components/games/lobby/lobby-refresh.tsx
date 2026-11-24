"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type LobbyRefreshProps = {
  phase: string;
};

export function LobbyRefresh({ phase }: LobbyRefreshProps) {
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
