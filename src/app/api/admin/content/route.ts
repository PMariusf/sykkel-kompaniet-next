import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const body = await request.json();
  const key = String(body.key ?? "").trim();
  if (!key) return NextResponse.json({ error: "Innholdsnøkkel mangler." }, { status: 400 });

  const payload = {
    eyebrow: String(body.eyebrow ?? "").trim() || null,
    headline: String(body.headline ?? "").trim() || null,
    subheadline: String(body.subheadline ?? "").trim() || null,
    body: String(body.body ?? "").trim() || null,
    primary_cta_label: String(body.primary_cta_label ?? "").trim() || null,
    primary_cta_href: String(body.primary_cta_href ?? "").trim() || null,
    secondary_cta_label: String(body.secondary_cta_label ?? "").trim() || null,
    secondary_cta_href: String(body.secondary_cta_href ?? "").trim() || null,
    image_url: String(body.image_url ?? "").trim() || null,
    image_alt: String(body.image_alt ?? "").trim() || null,
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/site_content?key=eq.${encodeURIComponent(key)}`, {
    method: "PATCH",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json({ error: data?.message ?? "Kunne ikke oppdatere innholdet." }, { status: response.status });
  }

  return NextResponse.json({ ok: true, content: data?.[0] ?? null });
}
