import { NextResponse } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const { fullName, email, password } = await request.json();

  if (!fullName || !email || !password) {
    return NextResponse.json({ error: "Navn, e-post og passord må fylles ut." }, { status: 400 });
  }

  if (String(password).length < 8) {
    return NextResponse.json({ error: "Passordet må være minst 8 tegn." }, { status: 400 });
  }

  const signupResponse = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      data: { full_name: fullName },
    }),
    cache: "no-store",
  });

  const data = await signupResponse.json();

  if (!signupResponse.ok) {
    return NextResponse.json(
      { error: data?.msg ?? data?.message ?? "Kunne ikke opprette konto." },
      { status: signupResponse.status },
    );
  }

  if (!data.access_token) {
    return NextResponse.json({ ok: true, needsConfirmation: true });
  }

  const response = NextResponse.json({ ok: true, needsConfirmation: false });
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set("sykkel_customer_access", data.access_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: data.expires_in ?? 3600,
  });

  if (data.refresh_token) {
    response.cookies.set("sykkel_customer_refresh", data.refresh_token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}
