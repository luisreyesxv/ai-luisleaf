import { Suspense } from "react";
import Link from "next/link";
import { signInAction } from "@/app/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthNotice } from "@/components/auth/auth-notice";
import { DrawnFormField } from "@/components/drawably/drawn-form-field";
import { DrawnInput } from "@/components/drawably/drawn-input";
import { DrawnButton } from "@/components/drawably/drawn-button";
import { DrawnUnderline } from "@/components/drawably/drawn-underline";

type SignInPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

async function SignInFeedback({ searchParams }: SignInPageProps) {
  const params = await searchParams;

  if (params.error === "credentials") {
    return (
      <AuthNotice tone="error">
        The email or password you entered is incorrect.
      </AuthNotice>
    );
  }

  if (params.error === "confirmation") {
    return (
      <AuthNotice tone="error">
        Your confirmation link is invalid or has expired. Please try again.
      </AuthNotice>
    );
  }

  if (params.message === "signed-out") {
    return (
      <AuthNotice tone="success">
        You have been signed out successfully.
      </AuthNotice>
    );
  }

  return null;
}

export default function SignInPage(props: SignInPageProps) {
  return (
    <AuthCard>
      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">
          Welcome back
        </p>

        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Sign in
        </h1>

        <p className="text-sm text-muted">
          Sign in to manage your games and hosting space.
        </p>
      </div>

      <Suspense fallback={null}>
        <SignInFeedback searchParams={props.searchParams} />
      </Suspense>

      <form action={signInAction} className="space-y-5">
        <DrawnFormField label="Email address" htmlFor="email" required>
          <DrawnInput
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            stroke="black"
          />
        </DrawnFormField>

        <DrawnFormField label="Password" htmlFor="password" required>
          <DrawnInput
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            stroke="black"
          />
        </DrawnFormField>

        <DrawnButton
          type="submit"
          variant="solid"
          fill="var(--primary)"
          paper="white"
          stroke="black"
          className="w-full gap-3 rounded-xl transition-colors 
                  min-h-14 px-8 text-2xl
                  font-black
                disabled:cursor-not-allowed disabled:opacity-50 
                focus-visible:outline-2
                focus-visible:outline-offset-4
        focus-visible:outline-primary"
        >
          Sign In
        </DrawnButton>
      </form>

      <p className="text-center text-sm text-muted">
        Don't have an account?{" "}
        <Link href="/sign-up" className="font-bold text-primary">
          <DrawnUnderline stroke="currentColor">Create one</DrawnUnderline>
        </Link>
      </p>
    </AuthCard>
  );
}
