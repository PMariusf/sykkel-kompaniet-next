import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { slugify, SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  if (!name) return NextResponse.json({ error: "Kategorinavn må fylles ut." }, { status: 400 });

  const payload = {
    name,
    slug: slugify(String(body.slug || name)),
    description: String(body.description ?? "").trim() || null,
    image_path: String(body.image_path ?? "").trim() || null,
    sort_order: Number(body.sort_order ?? 0),
    is_active: body.is_active !== false,
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
    method: "POST",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.message ?? "Kunne ikke opprette kategori." }, { status: response.status });
  return NextResponse.json({ ok: true, category: data?.[0] ?? null });
}
