import type { ReactNode } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

import { signOutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import LogoButton from "@/components/layout/logo-button";

type HostLayoutProps = {
  children: ReactNode;
};

type HostContentProps = {
  children: ReactNode;
};

async function HostContent({ children }: HostContentProps) {
  await connection();

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || typeof userId !== "string") {
    redirect("/sign-in");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (
    profileError ||
    !profile ||
    (profile.role !== "host" && profile.role !== "admin")
  ) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <Container size="wide" className="py-8">
        <header className="mb-10 flex items-center justify-between border-b border-border pb-5">
          {/* <Link
            href="/"
            className="text-xl font-black tracking-tight text-foreground"
          >
            Luis-leaf
          </Link> */}

          <LogoButton />

          <form action={signOutAction}>
            <Button type="submit" variant="secondary">
              Sign out
            </Button>
          </form>
        </header>

        {children}
      </Container>
    </div>
  );
}

function HostLoading() {
  return (
    <main className="min-h-screen bg-background">
      <Container size="wide" className="py-8">
        <p className="text-sm text-muted">Loading your host dashboard...</p>
      </Container>
    </main>
  );
}

export default function HostLayout({ children }: HostLayoutProps) {
  return (
    <Suspense fallback={<HostLoading />}>
      <HostContent>{children}</HostContent>
    </Suspense>
  );
}
