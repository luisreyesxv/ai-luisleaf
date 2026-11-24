import Image from "next/image";

import { DrawnHighlight } from "@/components/drawably/drawn-highlight";

const decorations = [
  {
    text: "GET READY!",
    image: "/decorations/robot.svg",
    background: "#80DEEA",
    fill: "#2563EB",
    mobilePosition: "left-2 top-3",
    desktopPosition: "md:left-[6%] md:top-[12%]",
    rotation: "-rotate-12",
  },
  {
    text: "YOU GOT THIS!",
    image: "/decorations/alien.svg",
    background: "#FF80AB",
    fill: "#7C3AED",
    mobilePosition: "right-2 top-3",
    desktopPosition: "md:right-[6%] md:top-[14%]",
    rotation: "rotate-12",
  },
  {
    text: "STAY SHARP!",
    image: "/decorations/monster.svg",
    background: "#B9F6CA",
    fill: "#059669",
    mobilePosition: "left-2 bottom-3",
    desktopPosition: "md:left-[8%] md:bottom-[12%]",
    rotation: "rotate-6",
  },
  {
    text: "LET'S PLAY!",
    image: "/decorations/ghost.svg",
    background: "#FFD180",
    fill: "#D97706",
    mobilePosition: "right-2 bottom-3",
    desktopPosition: "md:right-[7%] md:bottom-[12%]",
    rotation: "-rotate-6",
  },
];

export function PlayerLobbyDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {decorations.map((decoration) => (
        <div
          key={decoration.text}
          className={[
            "absolute flex size-16 items-center justify-center",
            "sm:size-20 md:size-28",
            decoration.mobilePosition,
            decoration.desktopPosition,
            decoration.rotation,
          ].join(" ")}
        >
          <div
            className="flex size-full items-center justify-center border-2 border-black p-1 shadow-[3px_3px_0px_#000] sm:p-2 md:shadow-[4px_4px_0px_#000]"
            style={{ backgroundColor: decoration.background }}
          >
            <DrawnHighlight fill={decoration.fill}>
              <div className="flex size-full items-center justify-center p-2">
                <Image
                  src={decoration.image}
                  alt=""
                  width={200}
                  height={200}
                  className="size-full object-contain"
                />
              </div>
            </DrawnHighlight>
          </div>
        </div>
      ))}
    </div>
  );
}
