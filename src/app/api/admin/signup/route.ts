import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Opprettelse av adminbrukere er deaktivert. Tilgang administreres i Supabase." },
    { status: 403 },
  );
}
