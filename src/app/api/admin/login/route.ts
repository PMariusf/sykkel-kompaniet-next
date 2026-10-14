import { NextResponse } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "E-post og passord må fylles ut." }, { status: 400 });
  }

  const authResponse = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const authData = await authResponse.json();

  if (!authResponse.ok || !authData.access_token || !authData.user?.id) {
    return NextResponse.json({ error: "Feil e-post eller passord." }, { status: 401 });
  }

  const adminResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/admin_users?select=user_id,role&user_id=eq.${authData.user.id}`,
    {
      headers: supabaseHeaders(authData.access_token),
      cache: "no-store",
    },
  );

  const admins = adminResponse.ok ? await adminResponse.json() : [];
  if (!Array.isArray(admins) || admins.length === 0) {
    return NextResponse.json({ error: "Denne brukeren har ikke CMS-tilgang." }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set("sykkel_admin_access", authData.access_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: authData.expires_in ?? 3600,
  });

  if (authData.refresh_token) {
    response.cookies.set("sykkel_admin_refresh", authData.refresh_token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}
