"use client";
import type { GameRound } from "./rounds";
import { DrawnCard } from "../drawably/drawn-card";
import { DrawablyHighlight } from "drawably/react";

type RoundCardProps = {
  round: GameRound;
};

export function RoundCard({ round }: RoundCardProps) {
  return (
    <DrawnCard stroke={round.color} className={`${round.rotation}`}>
      <DrawablyHighlight roughness={1} fill={round.color}>
        <div className="flex items-start gap-4">
          <span className="pt-1 text-sm font-black opacity-60">
            {round.number}
          </span>

          <div>
            <h3 className="text-xl font-black">{round.name}</h3>

            <p className="mt-1 text-sm font-medium leading-5">
              {round.description}
            </p>
          </div>
        </div>
      </DrawablyHighlight>
    </DrawnCard>
  );
}
