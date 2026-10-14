import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type Props = { params: Promise<{ id: string; imageId: string }> };
async function token() { const c = await cookies(); return c.get("sykkel_admin_access")?.value; }

export async function PATCH(request: Request, { params }: Props) {
  const accessToken = await token();
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });
  const { id, imageId } = await params;
  const body = await request.json();

  if (body.is_primary === true) {
    await fetch(`${SUPABASE_URL}/rest/v1/product_images?product_id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: supabaseHeaders(accessToken),
      body: JSON.stringify({ is_primary: false }),
      cache: "no-store",
    });
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/product_images?id=eq.${encodeURIComponent(imageId)}&product_id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.message ?? "Kunne ikke oppdatere bildet." }, { status: response.status });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Props) {
  const accessToken = await token();
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });
  const { id, imageId } = await params;
  const response = await fetch(`${SUPABASE_URL}/rest/v1/product_images?id=eq.${encodeURIComponent(imageId)}&product_id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: supabaseHeaders(accessToken),
    cache: "no-store",
  });
  if (!response.ok) return NextResponse.json({ error: "Kunne ikke slette bildet." }, { status: response.status });
  return NextResponse.json({ ok: true });
}
