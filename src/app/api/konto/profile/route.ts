import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_customer_access")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Du må være logget inn." }, { status: 401 });
  }

  const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: supabaseHeaders(accessToken),
    cache: "no-store",
  });

  if (!userResponse.ok) {
    return NextResponse.json({ error: "Innloggingen er utløpt. Logg inn på nytt." }, { status: 401 });
  }

  const user = await userResponse.json();
  if (!user?.id) {
    return NextResponse.json({ error: "Fant ikke brukeren." }, { status: 401 });
  }

  const body = await request.json();
  const payload = {
    user_id: user.id,
    full_name: String(body.fullName ?? "").trim() || null,
    phone: String(body.phone ?? "").trim() || null,
    address_line1: String(body.addressLine1 ?? "").trim() || null,
    postal_code: String(body.postalCode ?? "").trim() || null,
    city: String(body.city ?? "").trim() || null,
    country: String(body.country ?? "Norge").trim() || "Norge",
    updated_at: new Date().toISOString(),
  };

  const profileResponse = await fetch(`${SUPABASE_URL}/rest/v1/customer_profiles?on_conflict=user_id`, {
    method: "POST",
    headers: {
      ...supabaseHeaders(accessToken),
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!profileResponse.ok) {
    return NextResponse.json({ error: "Kunne ikke lagre profilen." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
