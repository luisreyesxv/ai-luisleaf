import type { GameRound } from "./rounds";

type RoundCardProps = {
  round: GameRound;
};

export function RoundCard({ round }: RoundCardProps) {
  return (
    <div
      className={`rounded-xl border-2 border-border-strong ${round.color} p-4 shadow-[3px_3px_0_#25221e] ${round.rotation}`}
    >
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
    </div>
  );
}
