import Link from "next/link";

export default function LogoButton() {
  return (
    <Link
      href="/"
      aria-label="LuisLeaf home"
      className="flex items-center gap-2 group"
    >
      <span className="flex h-10 w-10 rotate-[-8deg] items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-2xl shadow-[2px_3px_0_#25221e]">
        ✳
      </span>

      <span className="text-2xl font-black tracking-tight group-active:text-primary transition-colors duration-300">
        Luis
        <span className="text-primary group-active:text-black transition-colors duration-300">
          Leaf
        </span>
      </span>
    </Link>
  );
}
