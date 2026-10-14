import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { slugify, SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type RouteProps = { params: Promise<{ id: string }> };

async function token() {
  const cookieStore = await cookies();
  return cookieStore.get("sykkel_admin_access")?.value;
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const accessToken = await token();
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });
  const { id } = await params;
  const body = await request.json();

  const payload = {
    ...body,
    ...(body.name ? { name: String(body.name).trim(), slug: slugify(String(body.slug || body.name)) } : {}),
    ...(body.sort_order !== undefined ? { sort_order: Number(body.sort_order) } : {}),
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/categories?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.message ?? "Kunne ikke oppdatere kategori." }, { status: response.status });
  return NextResponse.json({ ok: true, category: data?.[0] ?? null });
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  const accessToken = await token();
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });
  const { id } = await params;
  const response = await fetch(`${SUPABASE_URL}/rest/v1/categories?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: supabaseHeaders(accessToken),
    cache: "no-store",
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    return NextResponse.json({ error: data?.message ?? "Kunne ikke slette kategori." }, { status: response.status });
  }
  return NextResponse.json({ ok: true });
}
