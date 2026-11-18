import { GamePreview } from "@/components/home/game-preview";
import { HeroSection } from "@/components/home/hero-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Decorative background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-48 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <SiteHeader />

      <section className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-6 pb-20 pt-12 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
        <HeroSection />
        <GamePreview />
      </section>

      <SiteFooter />
    </main>
  );
}
