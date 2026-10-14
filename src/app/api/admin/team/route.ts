import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("sykkel_admin_access")?.value;
}

export async function POST(request: Request) {
  const accessToken = await getToken();
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  if (!name) return NextResponse.json({ error: "Navn må fylles ut." }, { status: 400 });

  const payload = {
    name,
    role: String(body.role ?? "").trim() || null,
    bio: String(body.bio ?? "").trim() || null,
    email: String(body.email ?? "").trim() || null,
    phone: String(body.phone ?? "").trim() || null,
    image_url: String(body.image_url ?? "").trim() || null,
    image_alt: String(body.image_alt ?? "").trim() || null,
    sort_order: Number(body.sort_order ?? 0) || 0,
    is_active: body.is_active !== false,
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/team_members`, {
    method: "POST",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.message ?? "Kunne ikke legge til medarbeider." }, { status: response.status });
  return NextResponse.json({ ok: true, member: data?.[0] ?? null });
}

export async function PATCH(request: Request) {
  const accessToken = await getToken();
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const body = await request.json();
  const id = String(body.id ?? "");
  if (!id) return NextResponse.json({ error: "ID mangler." }, { status: 400 });

  const payload: Record<string, unknown> = {};
  for (const field of ["name", "role", "bio", "email", "phone", "image_url", "image_alt", "sort_order", "is_active"]) {
    if (field in body) payload[field] = body[field];
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/team_members?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.message ?? "Kunne ikke oppdatere medarbeider." }, { status: response.status });
  return NextResponse.json({ ok: true, member: data?.[0] ?? null });
}

export async function DELETE(request: Request) {
  const accessToken = await getToken();
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID mangler." }, { status: 400 });

  const response = await fetch(`${SUPABASE_URL}/rest/v1/team_members?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: supabaseHeaders(accessToken),
    cache: "no-store",
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    return NextResponse.json({ error: data?.message ?? "Kunne ikke slette medarbeider." }, { status: response.status });
  }
  return NextResponse.json({ ok: true });
}
