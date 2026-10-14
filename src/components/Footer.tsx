import Logo from "@/components/Logo";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type Contact = {
  company_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  opening_hours: string | null;
};

async function getContact(): Promise<Contact | null> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/company_contact?select=company_name,email,phone,address,postal_code,city,opening_hours&id=eq.main`, {
      headers: supabaseHeaders(),
      cache: "no-store",
    });
    if (!response.ok) return null;
    const rows: Contact[] = await response.json();
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export default async function Footer() {
  const contact = await getContact();
  const location = [contact?.address, contact?.postal_code, contact?.city].filter(Boolean).join(", ");

  return (
    <footer id="kontakt" className="bg-[#050809]">
      <div className="mx-auto grid max-w-[1420px] gap-8 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.35fr_.9fr_.9fr_1.1fr] lg:px-8">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-[290px] text-[11px] leading-5 text-zinc-400">
            Sykkel Deler er din spesialist på sykkeldeler. Vi tilbyr kvalitetsdeler for vei, terreng og hverdagssykling.
          </p>
          <div className="mt-4 flex gap-4 text-sm text-zinc-300"><span>●</span><span>◎</span><span>▶</span></div>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">Kundeservice</h3>
          <div className="mt-3 space-y-1.5 text-[11px] text-zinc-400">
            <p>Ofte stilte spørsmål</p><p>Frakt og levering</p><p>Retur og reklamasjon</p><p>Betalingsalternativer</p><p>Kontakt oss</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">Informasjon</h3>
          <div className="mt-3 space-y-1.5 text-[11px] text-zinc-400">
            <p>Om oss</p><p>Vilkår og betingelser</p><p>Personvern</p><p>Cookies</p><p>Størrelsesguide</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">Kontakt</h3>
          <div className="mt-3 space-y-2 text-[11px] leading-5 text-zinc-400">
            <p>⌖ {contact?.company_name || "Sykkel Deler"}</p>
            {location && <p>⌂ {location}</p>}
            {contact?.phone && <p>☎ {contact.phone}</p>}
            {contact?.email && <p>✉ {contact.email}</p>}
            {contact?.opening_hours && <p className="whitespace-pre-line">◷ {contact.opening_hours}</p>}
          </div>
        </div>
      </div>
    </footer>
  );
}
