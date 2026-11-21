import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import LogoButton from "../layout/logo-button";

type AuthCardProps = {
  children: ReactNode;
};

export function AuthCard({ children }: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* <Link
          href="/"
          className="inline-flex text-lg font-black tracking-tight text-foreground transition-colors hover:text-primary"
        >
          LuisLeaf
        </Link> */}

        <LogoButton />

        <Card className="space-y-6 p-8">{children}</Card>
      </div>
    </main>
  );
}
