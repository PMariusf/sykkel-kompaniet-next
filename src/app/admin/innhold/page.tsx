import { cookies } from "next/headers";
import Link from "next/link";
import AdminLogin from "../AdminLogin";
import AdminContentManager from "./AdminContentManager";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type SiteContent = {
  key: string;
  eyebrow: string | null;
  headline: string | null;
  subheadline: string | null;
  body: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  image_url: string | null;
  image_alt: string | null;
};

type TeamMember = {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  image_url: string | null;
  image_alt: string | null;
  sort_order: number;
  is_active: boolean;
};

const fallbackHero: SiteContent = {
  key: "home_hero",
  eyebrow: "KVALITET GIR BEDRE TURER",
  headline: "Deler til sykkelen din",
  subheadline: "Kvalitetsdeler for vei, terreng og hverdagssykling. Stort utvalg fra ledende merkevarer.",
  body: null,
  primary_cta_label: "Se sykkeldeler",
  primary_cta_href: "#produkter",
  secondary_cta_label: "Finn riktig del",
  secondary_cta_href: "#kategorier",
  image_url: "/products/hero-image.png",
  image_alt: "Sykkeldeler og drivverk",
};

export default async function AdminContentPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return <AdminLogin />;

  const [contentResponse, teamResponse] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/site_content?select=*&key=eq.home_hero`, {
      headers: supabaseHeaders(accessToken),
      cache: "no-store",
    }),
    fetch(`${SUPABASE_URL}/rest/v1/team_members?select=*&order=sort_order.asc,created_at.asc`, {
      headers: supabaseHeaders(accessToken),
      cache: "no-store",
    }),
  ]);

  if (contentResponse.status === 401 || teamResponse.status === 401) return <AdminLogin />;

  const contentRows: SiteContent[] = contentResponse.ok ? await contentResponse.json() : [];
  const team: TeamMember[] = teamResponse.ok ? await teamResponse.json() : [];
  const hero = contentRows[0] ?? fallbackHero;

  return (
    <main className="min-h-screen bg-[#070b0c] text-white">
      <header className="border-b border-white/10 bg-[#0b0f10]">
        <div className="mx-auto flex max-w-[1420px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">SYKKEL DELER CMS</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight">Innhold og media</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-[#c9ff35]/40 hover:text-white">Produkter</Link>
            <Link href="/" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-white/25 hover:text-white">Se nettsiden</Link>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-white/25 hover:text-white">Logg ut</button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1420px] px-4 py-7 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-xl border border-[#c9ff35]/15 bg-[#c9ff35]/[.035] p-4 text-sm text-zinc-300">
          Her kan du bytte bilder, endre headlines og knapper, og administrere medarbeidere uten å endre kode.
        </div>
        <AdminContentManager hero={hero} team={team} />
      </div>
    </main>
  );
}
