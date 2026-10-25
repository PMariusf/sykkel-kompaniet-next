import { cookies } from "next/headers";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AdminLogin from "../AdminLogin";
import AdminMarketingManager from "./AdminMarketingManager";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type Brand = { id: string; name: string; logo_url: string | null; website_url: string | null; sort_order: number; is_active: boolean };
type Campaign = { id: string; title: string; badge: string | null; description: string | null; image_url: string | null; cta_label: string | null; cta_href: string | null; is_active: boolean };
type Media = { id: string; file_name: string; url: string; alt_text: string | null; kind: string; created_at: string };

export default async function MarketingAdminPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return <AdminLogin />;

  const [brandsResponse, campaignsResponse, mediaResponse] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/brands?select=*&order=sort_order.asc,created_at.asc`, { headers: supabaseHeaders(accessToken), cache: "no-store" }),
    fetch(`${SUPABASE_URL}/rest/v1/campaigns?select=*&order=sort_order.asc,created_at.desc`, { headers: supabaseHeaders(accessToken), cache: "no-store" }),
    fetch(`${SUPABASE_URL}/rest/v1/media_assets?select=*&order=created_at.desc&limit=40`, { headers: supabaseHeaders(accessToken), cache: "no-store" }),
  ]);

  if (brandsResponse.status === 401 || campaignsResponse.status === 401 || mediaResponse.status === 401) return <AdminLogin />;

  const brands: Brand[] = brandsResponse.ok ? await brandsResponse.json() : [];
  const campaigns: Campaign[] = campaignsResponse.ok ? await campaignsResponse.json() : [];
  const media: Media[] = mediaResponse.ok ? await mediaResponse.json() : [];

  return (
    <main className="min-h-screen bg-[#070b0c] text-white">
      <header className="border-b border-white/10 bg-[#0b0f10]">
        <div className="mx-auto flex max-w-[1420px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">SYKKEL DELER CMS</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight">Markedsføring & media</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <ThemeToggle />
            <Link href="/admin" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-[#c9ff35]/40">Dashboard</Link>
            <Link href="/admin/innhold" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-[#c9ff35]/40">Innhold</Link>
            <Link href="/" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-white/25">Se nettsiden</Link>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1420px] px-4 py-7 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-xl border border-[#c9ff35]/15 bg-[#c9ff35]/[.035] p-4 text-sm text-zinc-300">
          Administrer merkevarer, kampanjer og gjenbrukbare bilder fra ett sted.
        </div>
        <AdminMarketingManager brands={brands} campaigns={campaigns} media={media} />
      </div>
    </main>
  );
}
