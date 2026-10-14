import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const body = await request.json();
  const payload = {
    company_name: String(body.company_name ?? "").trim() || null,
    email: String(body.email ?? "").trim() || null,
    phone: String(body.phone ?? "").trim() || null,
    address: String(body.address ?? "").trim() || null,
    postal_code: String(body.postal_code ?? "").trim() || null,
    city: String(body.city ?? "").trim() || null,
    opening_hours: String(body.opening_hours ?? "").trim() || null,
    updated_at: new Date().toISOString(),
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/company_contact?id=eq.main`, {
    method: "PATCH",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.message ?? "Kunne ikke lagre kontaktinfo." }, { status: response.status });
  return NextResponse.json({ ok: true, contact: data?.[0] ?? null });
}
