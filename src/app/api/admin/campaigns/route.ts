import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const body = await request.json();
  const title = String(body.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Tittel må fylles ut." }, { status: 400 });

  const payload = {
    title,
    badge: String(body.badge ?? "").trim() || null,
    description: String(body.description ?? "").trim() || null,
    image_url: String(body.image_url ?? "").trim() || null,
    cta_label: String(body.cta_label ?? "").trim() || null,
    cta_href: String(body.cta_href ?? "").trim() || null,
    starts_at: body.starts_at || null,
    ends_at: body.ends_at || null,
    sort_order: Number(body.sort_order ?? 0),
    is_active: body.is_active !== false,
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/campaigns`, {
    method: "POST",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.message ?? "Kunne ikke lagre kampanje." }, { status: response.status });
  return NextResponse.json({ ok: true, campaign: data?.[0] ?? null });
}
