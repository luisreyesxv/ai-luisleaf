"use client";

import { useState } from "react";
import Image from "next/image";

import { DrawnButton } from "@/components/drawably/drawn-button";
import { DrawnCard } from "@/components/drawably/drawn-card";
import { DrawnHighlight } from "@/components/drawably/drawn-highlight";

const FUN_FACTS = [
  {
    fact: "Octopuses have three hearts. Two pump blood to the gills, and one pumps it to the rest of the body.",
    category: "Amazing animals",
    image: "/decorations/robot.svg",
  },
  {
    fact: "A group of flamingos is called a flamboyance.",
    category: "Nature is wild",
    image: "/decorations/alien.svg",
  },
  {
    fact: "Honeybees perform a waggle dance to tell other bees where to find food.",
    category: "Tiny geniuses",
    image: "/decorations/monster.svg",
  },
  {
    fact: "The fingerprints of a koala are remarkably similar to human fingerprints.",
    category: "Unexpected facts",
    image: "/decorations/ghost.svg",
  },
  {
    fact: "A day on Venus is longer than its year. It rotates more slowly than it orbits the Sun.",
    category: "Space is strange",
    image: "/decorations/ring-one.svg",
  },
];

export function PlayerLobbyFunFact() {
  const [factIndex, setFactIndex] = useState(0);
  const currentFact = FUN_FACTS[factIndex];

  function showAnotherFact() {
    setFactIndex((currentIndex) => (currentIndex + 1) % FUN_FACTS.length);
  }

  return (
    <div className="h-[230px] w-full rotate-[1deg]">
      <DrawnCard
        stroke="#252525"
        className="h-full w-full bg-[#D1FAE5] shadow-[5px_5px_0px_#000]"
      >
        <div className="box-border flex h-full min-h-0 flex-col gap-2">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#047857]">
                While you wait...
              </p>
              <h2 className="text-xl font-black text-[#252525]">
                Did you know?
              </h2>
            </div>

            <div className="relative size-14 shrink-0 sm:size-16">
              <Image
                src={currentFact.image}
                alt=""
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Fact */}
          <div className="flex min-h-0 flex-1 items-center">
            <p
              className="line-clamp-3 text-sm leading-6 text-[#374151]"
              aria-live="polite"
            >
              {currentFact.fact}
            </p>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-between gap-2 border-t-2 border-dashed border-[#6EE7B7] py-2">
            <DrawnHighlight fill="#A7F3D0">
              <span className="text-xs font-bold text-[#065F46]">
                {currentFact.category}
              </span>
            </DrawnHighlight>

            <DrawnButton
              variant="solid"
              stroke="black"
              fill="var(--secondary)"
              paper="black"
              className="min-h-9 gap-1 px-3 text-xs font-black!"
              onClick={showAnotherFact}
            >
              Another fact <span aria-hidden="true">↗</span>
            </DrawnButton>
          </div>
        </div>
      </DrawnCard>
    </div>
  );
}
