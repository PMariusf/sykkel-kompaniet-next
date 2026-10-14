import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "general").replace(/[^a-z0-9-_]/gi, "-");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Velg et bilde." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Kun bildefiler er tillatt." }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Bildet kan maks være 8 MB." }, { status: 400 });
  }

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const fileName = `${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const uploadResponse = await fetch(`${SUPABASE_URL}/storage/v1/object/site-media/${fileName}`, {
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

  const data = await uploadResponse.json().catch(() => null);
  if (!uploadResponse.ok) {
    return NextResponse.json({ error: data?.message ?? "Kunne ikke laste opp bildet." }, { status: uploadResponse.status });
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/site-media/${fileName}`;
  return NextResponse.json({ ok: true, path: fileName, url: publicUrl });
}
