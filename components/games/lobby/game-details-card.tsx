type GameDetailsCardProps = {
  mode: string;
  status: string;
  phase: string;
};

export function GameDetailsCard({ mode, status, phase }: GameDetailsCardProps) {
  const gameMode = mode === "six_v_six" ? "6 vs 6" : "Hot Seat";

  return (
    <section className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
      {/* Primary information */}
      <div className="flex flex-1 flex-col items-center justify-center py-4 text-center">
        <p className="text-sm font-medium text-muted">Game mode</p>

        <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground">
          {gameMode}
        </h2>

        <p className="mt-2 max-w-xs text-sm text-muted">
          {mode === "six_v_six"
            ? "Two teams compete against each other."
            : "Players take turns in the hot seat."}
        </p>
      </div>

      {/* Secondary information */}
      <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 text-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Status
          </p>
          <p className="mt-1 font-semibold text-foreground">{status}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Phase
          </p>
          <p className="mt-1 font-semibold text-foreground">{phase}</p>
        </div>
      </div>
    </section>
  );
}
