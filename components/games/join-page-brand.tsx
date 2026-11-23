import { DrawnHighlight } from "@/components/drawably/drawn-highlight";
import LogoButton from "../layout/logo-button";

export function JoinPageBrand() {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {/* <DrawnHighlight fill="#A3E635">
        <span className="flex size-10 items-center justify-center text-2xl">
          🍃
        </span>
      </DrawnHighlight>

      <span className="text-2xl font-black tracking-tight">luisleaf</span> */}
      <LogoButton />
    </div>
  );
}
