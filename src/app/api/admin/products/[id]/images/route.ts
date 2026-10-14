import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type Props = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Props) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const { id } = await params;
  const formData = await request.formData();
  const file = formData.get("file");
  const altText = String(formData.get("altText") ?? "").trim() || null;

  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Velg et bilde." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Kun bildefiler er tillatt." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Bildet kan maks være 8 MB." }, { status: 400 });

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const fileName = `products/${id}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const upload = await fetch(`${SUPABASE_URL}/storage/v1/object/site-media/${fileName}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": file.type,
      "x-upsert": "false",
    },
    body: await file.arrayBuffer(),
    cache: "no-store",
  });
  const uploadData = await upload.json().catch(() => null);
  if (!upload.ok) return NextResponse.json({ error: uploadData?.message ?? "Kunne ikke laste opp bildet." }, { status: upload.status });

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/site-media/${fileName}`;
  const current = await fetch(`${SUPABASE_URL}/rest/v1/product_images?select=id&product_id=eq.${encodeURIComponent(id)}`, {
    headers: supabaseHeaders(accessToken), cache: "no-store",
  });
  const rows = current.ok ? await current.json() : [];
  const isPrimary = Array.isArray(rows) && rows.length === 0;

  const insert = await fetch(`${SUPABASE_URL}/rest/v1/product_images`, {
    method: "POST",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify({ product_id: id, image_url: publicUrl, alt_text: altText, sort_order: Array.isArray(rows) ? rows.length : 0, is_primary: isPrimary }),
    cache: "no-store",
  });
  const data = await insert.json().catch(() => null);
  if (!insert.ok) return NextResponse.json({ error: data?.message ?? "Kunne ikke lagre produktbildet." }, { status: insert.status });

  await fetch(`${SUPABASE_URL}/rest/v1/media_assets`, {
    method: "POST",
    headers: supabaseHeaders(accessToken),
    body: JSON.stringify({ file_name: file.name, url: publicUrl, alt_text: altText, kind: "product" }),
    cache: "no-store",
  });

  return NextResponse.json({ ok: true, image: data?.[0] ?? null });
}
