"use client";
import { Button } from "@/components/ui/button";
import { DrawablyUnderline } from "drawably/react";

export function HeroSection() {
  return (
    <div className="max-w-2xl">
      <div className="mb-7 inline-flex -rotate-2 items-center gap-2 rounded-md border-2 border-border-strong bg-secondary px-4 py-2 text-sm font-extrabold shadow-[3px_3px_0_#25221e]">
        <span aria-hidden="true">✦</span>
        GOOD FRIENDS. TERRIBLE CLUES.
      </div>

      <h1 className="text-6xl font-black leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
        Words are
        <br />
        <span className="relative inline-block text-primary">
          <DrawablyUnderline
            stroke="currentColor"
            width={5}
            boil={1}
            roughness={0.5}
          >
            overrated.
          </DrawablyUnderline>
          {/* <svg
            aria-hidden="true"
            viewBox="0 0 340 18"
            className="absolute -bottom-2 left-0 w-full"
            fill="none"
          >
            <path
              d="M3 12C78 2 229 2 336 10"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg> */}
        </span>
      </h1>

      <p className="mt-9 max-w-lg text-lg leading-8 text-muted sm:text-xl">
        Describe it. Act it out. Give one tiny clue. Get your friends together
        for three rounds of chaotic, laugh-until-you-cry fun.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button variant="primary" disabled>
          Create a room
          <span aria-hidden="true" className="text-xl">
            ↗
          </span>
        </Button>

        <Button variant="secondary" disabled>
          Join a room
          <span aria-hidden="true" className="text-xl">
            →
          </span>
        </Button>
      </div>

      <p className="mt-5 text-sm font-medium text-muted">
        Room creation and joining are coming soon.
      </p>
    </div>
  );
}
