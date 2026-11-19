export type GameRound = {
  number: string;
  name: string;
  description: string;
  color: string;
  rotation: string;
};

export const rounds: GameRound[] = [
  {
    number: "01",
    name: "Describe",
    description: "Talk your team into guessing the word. Just don't say it!",
    color: "#f6d98b",
    rotation: "-rotate-2",
  },
  {
    number: "02",
    name: "Act it out",
    description:
      "No words this time. Get theatrical and let your moves do the talking.",
    color: "#f3a18b",
    rotation: "rotate-1",
  },
  {
    number: "03",
    name: "One word",
    description: "One tiny clue. One chance to make it count.",
    color: "#b9d4a5",
    rotation: "-rotate-1",
  },
];
