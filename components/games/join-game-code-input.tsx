"use client";

import { useState } from "react";

import { DrawnHighlight } from "@/components/drawably/drawn-highlight";

const HIGHLIGHT_COLORS = [
  "#E11D48",
  "#7C3AED",
  "#059669",
  "#D97706",
  "#2563EB",
  "#C026D3",
];

export function JoinGameCodeInput() {
  const [joinCode, setJoinCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function handleChange(value: string) {
    setJoinCode(
      value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 6),
    );
  }

  return (
    <div className="relative flex items-center justify-center py-4">
      <div
        aria-hidden="true"
        className="flex h-16 w-full items-center justify-center gap-2 sm:gap-3"
      >
        {HIGHLIGHT_COLORS.map((color, index) => {
          const isCurrentTile =
            isFocused &&
            (index === joinCode.length ||
              (joinCode.length === 6 && index === 5));

          return (
            <span
              key={index}
              className={[
                "inline-flex rounded border-2 border-black transition-shadow duration-150",
                isFocused ? "shadow-[3px_3px_0px_#000]" : "shadow-none",
                isCurrentTile ? "ring-2 ring-foreground ring-offset-2" : "",
              ].join(" ")}
              style={{
                transform: `rotate(${index % 2 === 0 ? 8 : -8}deg)`,
              }}
            >
              <DrawnHighlight fill={color}>
                <span className="inline-flex size-11 items-center justify-center text-2xl font-black text-foreground sm:size-12 sm:text-3xl">
                  {joinCode[index] ?? ""}
                </span>
              </DrawnHighlight>
            </span>
          );
        })}
      </div>

      <input
        id="joinCode"
        name="joinCode"
        type="text"
        value={joinCode}
        onChange={(event) => handleChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        maxLength={6}
        required
        aria-label="Six-character game code"
        className="absolute inset-0 h-full w-full cursor-text opacity-0"
      />
    </div>
  );
}
