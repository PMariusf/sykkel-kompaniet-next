import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

function asNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_customer_access")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Du må være innlogget for å lagre demo-bestillingen." }, { status: 401 });
  }

  const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: supabaseHeaders(accessToken),
    cache: "no-store",
  });
  if (!userResponse.ok) {
    return NextResponse.json({ error: "Kundeøkten er utløpt. Logg inn på nytt." }, { status: 401 });
  }
  const user = await userResponse.json();

  const body = await request.json();
  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) {
    return NextResponse.json({ error: "Handlekurven er tom." }, { status: 400 });
  }

  const normalizedItems = items.map((item: any) => {
    const rawId = String(item.id ?? "");
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(rawId);
    const unitPrice = asNumber(item.unit_price_nok);
    const quantity = Math.max(1, Math.floor(asNumber(item.quantity) || 1));
    return {
      product_id: isUuid ? rawId : null,
      legacy_id: isUuid ? null : Number.isFinite(Number(rawId)) ? Number(rawId) : null,
      name: String(item.name ?? "Produkt").slice(0, 240),
      brand: String(item.brand ?? "").slice(0, 120) || null,
      sku: String(item.sku ?? "").slice(0, 120) || null,
      unit_price_nok: unitPrice,
      quantity,
      line_total_nok: unitPrice * quantity,
      image_url: String(item.image_url ?? "").slice(0, 1000) || null,
    };
  });

  const subtotal = normalizedItems.reduce((sum: number, item: any) => sum + item.line_total_nok, 0);
  const shipping = body.shipping_method === "pickup_point" ? 79 : 99;
  const payload = {
    p_customer_email: String(user.email ?? body.email ?? "").trim(),
    p_customer_name: String(body.customer_name ?? "").trim(),
    p_customer_phone: String(body.customer_phone ?? "").trim(),
    p_address_line1: String(body.address_line1 ?? "").trim(),
    p_postal_code: String(body.postal_code ?? "").trim(),
    p_city: String(body.city ?? "").trim(),
    p_country: String(body.country ?? "Norge").trim() || "Norge",
    p_shipping_method: body.shipping_method === "pickup_point" ? "pickup_point" : "standard",
    p_payment_method: ["vipps", "card", "klarna"].includes(body.payment_method) ? body.payment_method : "demo",
    p_subtotal_nok: subtotal,
    p_shipping_nok: shipping,
    p_total_nok: subtotal + shipping,
    p_items: normalizedItems,
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/create_demo_order`, {
    method: "POST",
    headers: supabaseHeaders(accessToken),
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json({ error: data?.message ?? "Kunne ikke opprette demo-bestillingen." }, { status: response.status });
  }

  const order = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({ ok: true, order });
}
