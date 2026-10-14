import { cookies } from "next/headers";
import Link from "next/link";
import AdminLogin from "../AdminLogin";
import ContactForm from "./ContactForm";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

export default async function ContactPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return <AdminLogin />;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/company_contact?select=*&id=eq.main`, {
    headers: supabaseHeaders(accessToken),
    cache: "no-store",
  });
  if (response.status === 401) return <AdminLogin />;
  const rows = response.ok ? await response.json() : [];
  const contact = rows[0] ?? { company_name: "Sykkel Deler", email: null, phone: null, address: null, postal_code: null, city: null, opening_hours: null };

  return (
    <main className="min-h-screen bg-[#070b0c] text-white">
      <header className="border-b border-white/10 bg-[#0b0f10]">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div><p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">SYKKEL DELER CMS</p><h1 className="mt-1 text-2xl font-black">Kontaktinformasjon</h1></div>
          <div className="flex gap-2"><Link href="/admin" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold">Dashboard</Link><Link href="/admin/innhold" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold">Innhold</Link></div>
        </div>
      </header>
      <div className="mx-auto max-w-[820px] px-4 py-8 sm:px-6">
        <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-6">
          <p className="mb-5 text-sm leading-6 text-zinc-400">Disse feltene brukes i kontaktområdet på nettsiden. La felt stå tomme til dere har bekreftet riktig informasjon.</p>
          <ContactForm contact={contact} />
        </section>
      </div>
    </main>
  );
}
