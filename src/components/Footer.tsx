import Link from "next/link";
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

const linkClass = "block py-1 text-xs text-zinc-300 transition hover:text-white";

export default async function Footer() {
  const contact = await getContact();
  const location = [contact?.address, contact?.postal_code, contact?.city].filter(Boolean).join(", ");

  return (
    <footer id="kontakt" className="bg-[#050809]">
      <div className="mx-auto grid max-w-[1420px] gap-8 px-4 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.35fr_.9fr_.9fr_1.1fr] lg:px-8">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-[320px] text-xs leading-5 text-zinc-300">
            Sykkel Deler er din spesialist på sykkeldeler. Vi tilbyr kvalitetsdeler for vei, terreng og hverdagssykling.
          </p>
        </div>

        <nav aria-label="Kundeservice">
          <h2 className="text-sm font-black text-white">Kundeservice</h2>
          <div className="mt-3">
            <Link className={linkClass} href="/#kontakt">Kontakt oss</Link>
            <Link className={linkClass} href="/konto">Min konto</Link>
            <Link className={linkClass} href="/handlekurv">Handlekurv</Link>
            <Link className={linkClass} href="/kasse">Kasse</Link>
            <Link className={linkClass} href="/sok">Søk etter deler</Link>
          </div>
        </nav>

        <nav aria-label="Informasjon">
          <h2 className="text-sm font-black text-white">Informasjon</h2>
          <div className="mt-3">
            <Link className={linkClass} href="/kategorier">Alle kategorier</Link>
            <Link className={linkClass} href="/#produkter">Produkter</Link>
            <Link className={linkClass} href="/#merker">Merker</Link>
            <Link className={linkClass} href="/">Forsiden</Link>
          </div>
        </nav>

        <div>
          <h2 className="text-sm font-black text-white">Kontakt</h2>
          <address className="mt-3 space-y-2 not-italic text-xs leading-5 text-zinc-300">
            <p>{contact?.company_name || "Sykkel Deler"}</p>
            {location && <p>{location}</p>}
            {contact?.phone && <p><a className="underline-offset-2 hover:underline" href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></p>}
            {contact?.email && <p><a className="underline-offset-2 hover:underline" href={`mailto:${contact.email}`}>{contact.email}</a></p>}
            {contact?.opening_hours && <p className="whitespace-pre-line">{contact.opening_hours}</p>}
          </address>
        </div>
      </div>
    </footer>
  );
}
