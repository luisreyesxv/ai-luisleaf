import { Suspense } from "react";
import Link from "next/link";
import { signUpAction } from "@/app/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthNotice } from "@/components/auth/auth-notice";
import { DrawnFormField } from "@/components/drawably/drawn-form-field";
import { DrawnInput } from "@/components/drawably/drawn-input";
import { DrawnButton } from "@/components/drawably/drawn-button";
import { DrawnUnderline } from "@/components/drawably/drawn-underline";

type SignUpPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

async function SignUpFeedback({ searchParams }: SignUpPageProps) {
  const params = await searchParams;

  if (params.error === "invalid") {
    return (
      <AuthNotice tone="error">
        Please check your information. Your passwords must match and your
        password must contain at least 8 characters.
      </AuthNotice>
    );
  }

  if (params.error === "signup") {
    return (
      <AuthNotice tone="error">
        We couldn't create your account. Please try again.
      </AuthNotice>
    );
  }

  if (params.message === "check-email") {
    return (
      <AuthNotice tone="success">
        Your account has been created. Check your email for a confirmation link
        before signing in.
      </AuthNotice>
    );
  }

  return null;
}

export default function SignUpPage(props: SignUpPageProps) {
  return (
    <AuthCard>
      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">
          Get started
        </p>

        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Create an account
        </h1>

        <p className="text-sm text-muted">
          Create your host account to start organizing games.
        </p>
      </div>

      <Suspense fallback={null}>
        <SignUpFeedback searchParams={props.searchParams} />
      </Suspense>

      <form action={signUpAction} className="space-y-5">
        <DrawnFormField label="Email address" htmlFor="email" required>
          <DrawnInput
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            stroke="black"
            required
          />
        </DrawnFormField>

        <DrawnFormField
          label="Password"
          htmlFor="password"
          description="Use at least 8 characters."
          required
        >
          <DrawnInput
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            stroke="black"
            minLength={8}
            maxLength={128}
            required
          />
        </DrawnFormField>

        <DrawnFormField
          label="Confirm password"
          htmlFor="confirmPassword"
          required
        >
          <DrawnInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            stroke="black"
            placeholder="Enter your password again"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
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
focus-visible:outline-primary
"
        >
          Create account
        </DrawnButton>
      </form>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-bold text-primary">
          <DrawnUnderline stroke="currentColor">Sign in</DrawnUnderline>
        </Link>
      </p>
    </AuthCard>
  );
}
