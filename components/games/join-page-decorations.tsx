import Image from "next/image";
import { DrawnHighlight } from "@/components/drawably/drawn-highlight";

const decorations = [
  {
    text: "TEAM UP!",
    image: "/decorations/plumber.svg",
    background: "#FFF176",
    fill: "#B424A9",
    textColor: "#FFFFFF",
    mobilePosition: "left-2 top-3",
    desktopPosition: "md:left-[5%] md:top-[13%]",
    rotation: "rotate-12",
    extra: "text-[10px] sm:text-xs md:text-xl",
  },
  {
    text: "HAVE FUN!",
    image: "/decorations/steamboat-willy.svg",
    background: "#FF80AB",
    fill: "#4F2682",
    textColor: "#FFFFFF",
    mobilePosition: "right-2 top-3",
    desktopPosition: "md:right-[6%] md:top-[17%]",
    rotation: "rotate-12",
    extra: "text-[10px] sm:text-xs md:text-lg",
  },
  {
    text: "THINK FAST!",
    image: "/decorations/ring-one.svg",
    background: "#80DEEA",
    fill: "#C62828",
    textColor: "#FFFFFF",
    mobilePosition: "left-2 bottom-3",
    desktopPosition: "md:left-[8%] md:bottom-[13%]",
    rotation: "rotate-6",
    extra: "text-[10px] sm:text-xs md:text-lg",
  },
  {
    text: "GOOD LUCK!",
    background: "#B9F6CA",
    image: "/decorations/ghost.svg",
    fill: "#283593",
    textColor: "#FFFFFF",
    mobilePosition: "right-2 bottom-3",
    desktopPosition: "md:right-[7%] md:bottom-[12%]",
    rotation: "rotate-6",
    extra: "text-[10px] sm:text-xs md:text-lg",
  },
  {
    text: "Hoooray team!",
    background: "#fa4c15",
    image: "/decorations/sleep.svg",
    fill: "#283593",
    textColor: "black",
    mobilePosition: "right-6 bottom-2",
    desktopPosition: "md:right-[21%] md:bottom-[8%]",
    rotation: "rotate-12",
    extra: "text-[10px] sm:text-xs md:text-lg",
  },
  {
    text: "You're gonna win",
    background: "	#ffc14a",
    image: "/decorations/monster.svg",
    fill: "white",
    textColor: "black",
    mobilePosition: "left-6 bottom-2",
    desktopPosition: "md:left-[21%] md:bottom-[8%]",
    rotation: "rotate-4",
    extra: "text-[10px] sm:text-xs md:text-lg",
  },
  {
    text: "Bonus Time!",
    background: " 	#ba3fff",

    image: "/decorations/robot.svg",
    fill: "#283593",
    textColor: "black",
    mobilePosition: "right-8 top-2",
    desktopPosition: "md:right-[21%] md:top-[8%]",
    rotation: "rotate-12",
    extra: "text-[10px] sm:text-xs md:text-lg",
  },
  {
    text: "You're gonna win",
    background: "#B9F6CA",
    image: "/decorations/alien.svg",
    fill: "#283593",
    textColor: "black",
    mobilePosition: "left-8 top-2",
    desktopPosition: "md:left-[21%] md:top-[8%]",
    rotation: "rotate-10",
    extra: "text-[10px] sm:text-xs md:text-lg",
  },
];

export function JoinPageDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {decorations.map((decoration, index) => {
        const rotationClass = (index % 2 ? "" : "-") + decoration.rotation;
        const imageRotationClass = (index % 2 ? "-" : "") + decoration.rotation;

        return (
          <div
            key={decoration.text + index}
            className={[
              "absolute flex size-16 items-center justify-center",
              "sm:size-20 md:size-28",
              decoration.mobilePosition,
              decoration.desktopPosition,
              rotationClass,
            ].join(" ")}
          >
            <div
              className="flex size-full items-center justify-center border-2 border-black p-1 shadow-[3px_3px_0px_#000] sm:p-2 md:shadow-[4px_4px_0px_#000]"
              style={{ backgroundColor: decoration.background }}
            >
              <DrawnHighlight fill={decoration.fill}>
                <div className="flex size-full items-center justify-center p-2">
                  {decoration.image ? (
                    <Image
                      src={decoration.image}
                      alt=""
                      width={200}
                      height={200}
                      className={`h-full w-full object-contain ${imageRotationClass}`}
                    />
                  ) : (
                    <span
                      className={[
                        "flex size-full items-center justify-center text-center",
                        "font-black tracking-tight",
                        decoration.extra,
                      ].join(" ")}
                      style={{ color: decoration.textColor }}
                    >
                      {decoration.text}
                    </span>
                  )}
                </div>
              </DrawnHighlight>
            </div>
          </div>
        );
      })}
    </div>
  );
}
