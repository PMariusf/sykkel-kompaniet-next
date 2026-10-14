import { NextResponse } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "E-post og passord må fylles ut." }, { status: 400 });
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
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const data = await signupResponse.json().catch(() => null);

  if (!signupResponse.ok) {
    return NextResponse.json(
      { error: data?.msg ?? data?.message ?? "Kunne ikke opprette adminbruker." },
      { status: signupResponse.status },
    );
  }

  return NextResponse.json({
    ok: true,
    needsConfirmation: !data?.access_token,
    message: data?.access_token
      ? "Brukeren er opprettet. Du kan logge inn nå."
      : "Brukeren er opprettet. Bekreft e-posten fra Supabase før du logger inn.",
  });
}
