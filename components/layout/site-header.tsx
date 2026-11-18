import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
      <Link
        href="/"
        aria-label="Luis-leaf home"
        className="flex items-center gap-2"
      >
        <span className="flex h-10 w-10 rotate-[-8deg] items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-2xl shadow-[2px_3px_0_#25221e]">
          ✳
        </span>

        <span className="text-2xl font-black tracking-tight">
          luis<span className="text-primary">leaf</span>
        </span>
      </Link>

      <span className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-muted">
        A party game for everyone
      </span>
    </header>
  );
}
