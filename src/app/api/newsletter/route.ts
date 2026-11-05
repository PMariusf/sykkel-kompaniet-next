import { NextResponse } from "next/server";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

const CONSENT_TEXT =
  "Jeg ønsker å motta nyhetsbrev og tilbud fra Sykkel Deler på e-post. Jeg kan melde meg av når som helst.";

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Ugyldig forespørsel." }, { status: 415 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Ugyldig forespørsel." }, { status: 400 });
  }

  // Simple bot trap; never collect data from an unexpected automated submission.
  if (body.website) return NextResponse.json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (
    body.consent !== true ||
    body.consentText !== CONSENT_TEXT ||
    email.length > 254 ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
  ) {
    return NextResponse.json({ error: "Oppgi gyldig e-post og aktivt samtykke." }, { status: 400 });
  }

  try {
    const result = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscriptions`, {
      method: "POST",
      headers: { ...supabaseHeaders(), Prefer: "return=minimal" },
      body: JSON.stringify({ email, consent_text: CONSENT_TEXT, source: "homepage_newsletter" }),
      cache: "no-store",
    });
    // Do not reveal whether an address is already on the list.
    if (result.status === 409) return NextResponse.json({ ok: true });
    if (!result.ok) {
      return NextResponse.json({ error: "Registrering er midlertidig utilgjengelig. Prøv igjen senere." }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Registrering er midlertidig utilgjengelig. Prøv igjen senere." }, { status: 503 });
  }
}
