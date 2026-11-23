import { DrawnHighlight } from "@/components/drawably/drawn-highlight";

type GameJoinCodeCardProps = {
  joinCode: string;
};

const HIGHLIGHT_COLORS = [
  "#E11D48",
  "#7C3AED",
  "#059669",
  "#D97706",
  "#2563EB",
  "#C026D3",
];

export function GameJoinCodeCard({ joinCode }: GameJoinCodeCardProps) {
  return (
    <section className="flex h-full flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center">
      <p className="text-sm font-medium text-muted">Game join code</p>

      <div
        role="img"
        aria-label={`Join code: ${joinCode}`}
        className="mt-5 flex flex-wrap items-center justify-center gap-3"
      >
        {Array.from(joinCode).map((character, index) => (
          <span
            key={`${character}-${index}`}
            className="inline-flex border-black border-2 rounded"
            style={{
              transform: `rotate(${index % 2 === 0 ? 8 : -8}deg)`,
            }}
          >
            <DrawnHighlight
              fill={HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length]}
            >
              <span
                aria-hidden="true"
                className="inline-flex min-w-12 items-center justify-center px-3 py-2 text-3xl font-black tracking-wide text-foreground"
              >
                {character}
              </span>
            </DrawnHighlight>
          </span>
        ))}
      </div>

      <p className="mt-5 max-w-xs text-sm text-muted">
        Share this code with your players so they can join your game.
      </p>
    </section>
  );
}
