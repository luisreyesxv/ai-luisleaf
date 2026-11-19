import { RoundCard } from "./round-card";
import { rounds } from "./rounds";
import { Card } from "@/components/ui/card";
import { FoldedCorner } from "../ui/folder-corner";
import { PaperPin } from "../ui/paper-pin";
import { PaperTape } from "../ui/paper-tape";

export function GamePreview() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:ml-auto">
      <div
        aria-hidden="true"
        className="absolute -right-5 -top-8 rotate-12 text-5xl text-primary"
      >
        ✳
      </div>

      <div
        aria-hidden="true"
        className="absolute -bottom-8 -left-7 -rotate-12 text-5xl text-secondary"
      >
        ✦
      </div>

      <Card
        texture="subtle"
        // variant="default"
        className="relative rotate-2  p-5 sm:p-7"
      >
        <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-5">
          <FoldedCorner color="cream" size="lg" />
          <PaperTape position="top-left" color="blue" />

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-muted">
              The game is simple
            </p>

            <h2 className="mt-1 text-2xl font-black">
              Three rounds. One word pile.
            </h2>
          </div>

          <span className="rotate-6 rounded-lg border-2 border-border-strong bg-secondary px-3 py-2 text-xl">
            🎲
          </span>
        </div>

        <div className="space-y-4 py-6">
          {rounds.map((round) => (
            <RoundCard key={round.number} round={round} />
          ))}
        </div>

        <div className="rounded-xl border-2 border-dashed border-border bg-background p-4 text-center">
          <p className="text-sm font-bold text-muted">
            SAME WORDS, NEW WAYS TO GUESS.
          </p>

          <p className="mt-1 text-2xl font-black tracking-tight">
            LET THE CHAOS BEGIN!
          </p>
        </div>
      </Card>

      <p className="mt-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted">
        Made for game nights and good company
      </p>
    </div>
  );
}
