import { NextRequest, NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  const next = requestUrl.searchParams.get("next");

  const allowedTypes: EmailOtpType[] = ["email"];

  if (!tokenHash || !type || !allowedTypes.includes(type as EmailOtpType)) {
    return NextResponse.redirect(
      new URL("/sign-in?error=confirmation", requestUrl.origin),
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: type as EmailOtpType,
  });

  if (error) {
    console.error("Email confirmation failed:", error.message);

    return NextResponse.redirect(
      new URL("/sign-in?error=confirmation", requestUrl.origin),
    );
  }

  const destination = next === "/dashboard" ? "/dashboard" : "/dashboard";

  return NextResponse.redirect(new URL(destination, requestUrl.origin));
}
