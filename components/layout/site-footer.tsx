import { CurrentYear } from "@/components/ui/current-year";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm font-medium text-muted sm:flex-row sm:px-10">
        <p>
          © <CurrentYear /> LuisLeaf
        </p>

        <p>A little friendly competition never hurt.</p>
      </div>
    </footer>
  );
}
