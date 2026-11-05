import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGES: Record<string, { extension: string; signature: number[] }> = {
  "image/jpeg": { extension: "jpg", signature: [0xff, 0xd8, 0xff] },
  "image/png": { extension: "png", signature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  "image/webp": { extension: "webp", signature: [0x52, 0x49, 0x46, 0x46] },
};

function allowedImageType(type: string, bytes: Uint8Array) {
  const expected = ALLOWED_IMAGES[type];
  if (!expected || !expected.signature.every((byte, index) => bytes[index] === byte)) return false;
  // WebP files must have the WEBP marker at byte offset 8, after RIFF and length.
  if (type === "image/webp") {
    return [0x57, 0x45, 0x42, 0x50].every((byte, index) => bytes[8 + index] === byte);
  }
  return true;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });

  // Reject cross-origin mutations of cookie-authenticated admin endpoints.
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Ugyldig forespørsel." }, { status: 403 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  const folder = String(formData?.get("folder") ?? "general").replace(/[^a-z0-9-_]/gi, "-").slice(0, 50) || "general";
  const altText = String(formData?.get("altText") ?? "").trim().slice(0, 250) || null;

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Velg et bilde." }, { status: 400 });
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "Bildet kan maks være 8 MB." }, { status: 400 });
  }
  if (!(file.type in ALLOWED_IMAGES)) {
    return NextResponse.json({ error: "Bruk JPG, PNG eller WebP." }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!allowedImageType(file.type, bytes)) {
    return NextResponse.json({ error: "Filinnholdet samsvarer ikke med et gyldig bildefilformat." }, { status: 400 });
  }

  const extension = ALLOWED_IMAGES[file.type].extension;
  const fileName = `${folder}/${crypto.randomUUID()}.${extension}`;

  const uploadResponse = await fetch(`${SUPABASE_URL}/storage/v1/object/site-media/${fileName}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": file.type,
      "x-upsert": "false",
    },
    body: bytes,
    cache: "no-store",
  });

  const data = await uploadResponse.json().catch(() => null);
  if (!uploadResponse.ok) {
    return NextResponse.json({ error: data?.message ?? "Kunne ikke laste opp bildet." }, { status: uploadResponse.status });
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/site-media/${fileName}`;
  await fetch(`${SUPABASE_URL}/rest/v1/media_assets`, {
    method: "POST",
    headers: supabaseHeaders(accessToken),
    body: JSON.stringify({ file_name: file.name.slice(0, 255), url: publicUrl, alt_text: altText, kind: folder }),
    cache: "no-store",
  });

  return NextResponse.json({ ok: true, path: fileName, url: publicUrl });
}
