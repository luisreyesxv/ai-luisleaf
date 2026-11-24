import { DrawnCard } from "@/components/drawably/drawn-card";
import { DrawnHighlight } from "@/components/drawably/drawn-highlight";
import { DrawnAlert } from "@/components/drawably/drawn-alert";

type PlayerLobbyWelcomeProps = {
  displayName: string;
  isWaiting: boolean;
};

export function PlayerLobbyWelcome({
  displayName,
  isWaiting,
}: PlayerLobbyWelcomeProps) {
  return (
    <DrawnCard
      stroke="#252525"
      width={4}
      className="w-full rotate-[-1deg] bg-[#FFF176] p-6 text-center shadow-[6px_6px_0px_#000] sm:p-8"
    >
      <div className="space-y-5">
        <div className="text-5xl" aria-hidden="true">
          {isWaiting ? "🎉" : "🚀"}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7C3AED]">
            {isWaiting ? "You're in!" : "Here we go!"}
          </p>

          <h1 className="text-3xl font-black tracking-tight text-[#252525] sm:text-4xl">
            Welcome,
            <br />
            <DrawnHighlight fill="#FF80AB">
              <span className="break-words">{displayName}</span>
            </DrawnHighlight>
          </h1>
        </div>

        <div className="mx-auto max-w-sm space-y-2">
          <h2 className="text-xl font-black text-[#252525]">
            {isWaiting ? "You're in the game!" : "The game is starting!"}
          </h2>

          <p className="text-sm leading-relaxed text-[#5C5145]">
            {isWaiting
              ? "Find a comfy spot and get ready. Your host will start the game soon."
              : "Your host has started the game. Get ready for some fun!"}
          </p>
        </div>

        {isWaiting && (
          <DrawnAlert
            stroke="var(--success)"
            fill="var(--success)"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white"
          >
            <span
              className="size-2 animate-pulse rounded-full bg-[#16A34A]"
              aria-hidden="true"
            />
            <span className="text-xs font-bold uppercase tracking-wide text-[#252525]">
              Waiting for your host
            </span>
          </DrawnAlert>
        )}
      </div>
    </DrawnCard>
  );
}
