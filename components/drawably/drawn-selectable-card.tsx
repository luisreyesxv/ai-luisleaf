"use client";

import type { ReactNode } from "react";

import { DrawnCard } from "@/components/drawably/drawn-card";
import { DrawnRadio } from "@/components/drawably/drawn-radio";
import { DrawnHighlight } from "./drawn-highlight";

type DrawnSelectableCardProps = {
  name: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  children: ReactNode;
  stroke?: string;
  selectedStroke?: string;
  selectedFill?: string;
  className?: string;
};

export function DrawnSelectableCard({
  name,
  value,
  checked,
  onSelect,
  children,
  stroke = "currentColor",
  selectedStroke = "#16a34a",
  selectedFill = "currentColor",
  className = "",
}: DrawnSelectableCardProps) {
  return (
    <label className="block cursor-pointer">
      <DrawnCard
        stroke={checked ? selectedStroke : stroke}
        width={checked ? 4 : 2}
        className={`rounded-2xl transition-colors
           [&_svg_*]:transition-[stroke,fill]
  [&_svg_*]:duration-2000
  [&_svg_*]:ease-in-out
          
          ${checked ?? "bg-primary/10"} ${className}`}
      >
        <DrawnHighlight width={0.1} fill={checked ? selectedFill : "none"}>
          <div className="flex items-start gap-3 p-4">
            <DrawnRadio
              name={name}
              value={value}
              checked={checked}
              width={checked ? 3 : 1}
              onChange={() => onSelect(value)}
              required
              className="mt-1 size-5 shrink-0"
            />

            <div className="min-w-0">{children}</div>
          </div>
        </DrawnHighlight>
      </DrawnCard>
    </label>
  );
}
