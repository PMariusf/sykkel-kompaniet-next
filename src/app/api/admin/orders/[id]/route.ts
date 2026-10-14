import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

const allowedStatuses = ["new", "processing", "shipped", "completed", "cancelled"] as const;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const status = String(body.status ?? "");
  if (!allowedStatuses.includes(status as (typeof allowedStatuses)[number])) {
    return NextResponse.json({ error: "Ugyldig ordrestatus." }, { status: 400 });
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json({ error: data?.message ?? "Kunne ikke oppdatere ordren." }, { status: response.status });
  }
  return NextResponse.json({ ok: true, order: data?.[0] ?? null });
}
