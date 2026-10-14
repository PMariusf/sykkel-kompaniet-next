import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { slugify, SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;

  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  if (!name) return NextResponse.json({ error: "Produktnavn må fylles ut." }, { status: 400 });

  const payload = {
    name,
    slug: slugify(String(body.slug || name)),
    brand: String(body.brand ?? "").trim() || null,
    sku: String(body.sku ?? "").trim() || null,
    ean: String(body.ean ?? "").trim() || null,
    price_nok: body.price_nok === "" || body.price_nok == null ? null : Number(body.price_nok),
    compare_at_price_nok: body.compare_at_price_nok === "" || body.compare_at_price_nok == null ? null : Number(body.compare_at_price_nok),
    badge: String(body.badge ?? "").trim() || null,
    is_featured: Boolean(body.is_featured),
    category_id: body.category_id || null,
    description: String(body.description ?? "").trim() || null,
    compatibility: String(body.compatibility ?? "").trim() || null,
    supplier: String(body.supplier ?? "").trim() || null,
    image_path: String(body.image_path ?? "").trim() || null,
    stock_quantity: body.stock_quantity === "" || body.stock_quantity == null ? null : Number(body.stock_quantity),
    stock_status: body.stock_status || "unknown",
    warehouse_location: String(body.warehouse_location ?? "Arna").trim() || "Arna",
    seo_title: String(body.seo_title ?? "").trim() || null,
    seo_description: String(body.seo_description ?? "").trim() || null,
    og_image_url: String(body.og_image_url ?? "").trim() || null,
    is_published: Boolean(body.is_published),
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: "POST",
    headers: { ...supabaseHeaders(accessToken), Prefer: "return=representation" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json({ error: data?.message ?? "Kunne ikke opprette produktet." }, { status: response.status });
  }

  return NextResponse.json({ ok: true, product: data?.[0] ?? null });
}
