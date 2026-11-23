import { JoinGameForm } from "@/components/games/join-game-form";
import { JoinPageBrand } from "@/components/games/join-page-brand";
import { JoinPageDecorations } from "@/components/games/join-page-decorations";

export default function JoinGamePage() {
  return (
    <main className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-3 py-4 sm:px-4 sm:py-8">
      <JoinPageDecorations />

      <section className="relative z-10 w-full max-w-md rotate-[-1deg] border-2 border-black bg-yellow-100 p-5 shadow-[6px_6px_0px_#000] sm:p-8 sm:shadow-[8px_8px_0px_#000]">
        <div className="space-y-5 sm:space-y-8">
          <JoinPageBrand />

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[#252525]">
              Join a game
            </h1>

            <p className="text-sm text-[#66615A]">
              Enter your host's game code and choose your player name.
            </p>
          </div>

          <JoinGameForm />
        </div>
      </section>
    </main>
  );
}
