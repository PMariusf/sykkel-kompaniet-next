import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type OrderItemInput = {
  id?: unknown;
  quantity?: unknown;
};

function text(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function quantity(value: unknown) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 1;
  return Math.max(1, Math.min(20, Math.floor(parsed)));
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

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Ugyldig bestilling." }, { status: 400 });
  }

  const rawItems: OrderItemInput[] = Array.isArray(body.items) ? body.items : [];
  if (rawItems.length === 0) {
    return NextResponse.json({ error: "Handlekurven er tom." }, { status: 400 });
  }
  if (rawItems.length > 50) {
    return NextResponse.json({ error: "For mange ordrelinjer." }, { status: 400 });
  }

  const customerName = text(body.customer_name, 240);
  const addressLine1 = text(body.address_line1, 300);
  const postalCode = text(body.postal_code, 32);
  const city = text(body.city, 120);

  if (!customerName || !addressLine1 || !postalCode || !city) {
    return NextResponse.json({ error: "Navn og leveringsadresse må fylles ut." }, { status: 400 });
  }

  const normalizedItems = rawItems.map((item) => {
    const rawId = text(item.id, 80);
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(rawId);
    const legacyId = !isUuid && /^\d+$/.test(rawId) ? Number(rawId) : null;

    return {
      product_id: isUuid ? rawId : null,
      legacy_id: legacyId,
      quantity: quantity(item.quantity),
    };
  });

  if (normalizedItems.some((item) => !item.product_id && item.legacy_id == null)) {
    return NextResponse.json({ error: "Bestillingen inneholder et ugyldig produkt." }, { status: 400 });
  }

  const payload = {
    p_customer_email: "",
    p_customer_name: customerName,
    p_customer_phone: text(body.customer_phone, 80),
    p_address_line1: addressLine1,
    p_postal_code: postalCode,
    p_city: city,
    p_country: text(body.country, 120) || "Norge",
    p_shipping_method: body.shipping_method === "pickup_point" ? "pickup_point" : "standard",
    p_payment_method: ["vipps", "card", "klarna"].includes(String(body.payment_method))
      ? String(body.payment_method)
      : "demo",
    // Ignored by the hardened database function. Totals and product prices are calculated server-side.
    p_subtotal_nok: 0,
    p_shipping_nok: 0,
    p_total_nok: 0,
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
