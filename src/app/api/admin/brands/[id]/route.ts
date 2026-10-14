import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type Props = { params: Promise<{ id: string }> };
async function token() { const c = await cookies(); return c.get("sykkel_admin_access")?.value; }

export async function PATCH(request: Request, { params }: Props) {
  const accessToken = await token(); if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });
  const { id } = await params; const body = await request.json();
  const response = await fetch(`${SUPABASE_URL}/rest/v1/brands?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" }, body: JSON.stringify(body), cache: "no-store" });
  const data = await response.json().catch(() => null); if (!response.ok) return NextResponse.json({ error: data?.message ?? "Kunne ikke oppdatere merke." }, { status: response.status });
  return NextResponse.json({ ok: true });
}
export async function DELETE(_request: Request, { params }: Props) {
  const accessToken = await token(); if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });
  const { id } = await params; const response = await fetch(`${SUPABASE_URL}/rest/v1/brands?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", headers: supabaseHeaders(accessToken), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "Kunne ikke slette merke." }, { status: response.status }); return NextResponse.json({ ok: true });
}
