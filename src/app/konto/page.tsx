import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KontoClient from "./KontoClient";
import ProfileForm from "./ProfileForm";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

export const metadata: Metadata = {
  title: "Min konto",
  description: "Logg inn på Sykkel Deler eller administrer kundeprofil og ordrehistorikk.",
  robots: { index: false, follow: false },
};

type Profile = {
  full_name?: string | null;
  phone?: string | null;
  address_line1?: string | null;
  postal_code?: string | null;
  city?: string | null;
  country?: string | null;
};

type OrderItem = { id: string; product_name: string; quantity: number; line_total_nok: number };
type Order = {
  id: string;
  order_number: string;
  total_nok: number;
  status: string;
  payment_status: string;
  created_at: string;
  items: OrderItem[];
};

const statusLabels: Record<string, string> = {
  new: "Ny",
  processing: "Behandles",
  shipped: "Sendt",
  completed: "Fullført",
  cancelled: "Kansellert",
};

function money(value: number) {
  return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 0 }).format(value);
}

export default async function KontoPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_customer_access")?.value;

  let user: { email?: string; id?: string } | null = null;
  let profile: Profile | null = null;
  let orders: Order[] = [];

  if (accessToken) {
    const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: supabaseHeaders(accessToken), cache: "no-store" });
    if (userResponse.ok) {
      user = await userResponse.json();
      if (user?.id) {
        const [profileResponse, ordersResponse] = await Promise.all([
          fetch(`${SUPABASE_URL}/rest/v1/customer_profiles?select=full_name,phone,address_line1,postal_code,city,country&user_id=eq.${user.id}`, { headers: supabaseHeaders(accessToken), cache: "no-store" }),
          fetch(`${SUPABASE_URL}/rest/v1/orders?select=id,order_number,total_nok,status,payment_status,created_at,items:order_items(id,product_name,quantity,line_total_nok)&user_id=eq.${user.id}&order=created_at.desc`, { headers: supabaseHeaders(accessToken), cache: "no-store" }),
        ]);
        const rows = profileResponse.ok ? await profileResponse.json() : [];
        profile = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        orders = ordersResponse.ok ? await ordersResponse.json() : [];
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#070b0c] px-4 py-12 text-white sm:px-6 lg:px-8">
        {user ? (
          <div className="mx-auto max-w-6xl">
            <div className="rounded-xl border border-white/10 bg-[#0b0f10] p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div><p className="text-xs font-black tracking-[.24em] text-[#c9ff35]">MIN KONTO</p><h1 className="mt-3 text-3xl font-black tracking-tight">Hei{profile?.full_name ? `, ${profile.full_name}` : ""}</h1><p className="mt-2 text-sm text-zinc-300">{user.email}</p></div>
                <form action="/api/konto/logout" method="post"><button className="rounded-md border border-white/10 px-4 py-2.5 text-xs font-bold text-zinc-200 transition hover:border-white/25 hover:text-white">Logg ut</button></form>
              </div>

              <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1fr]">
                <section className="rounded-lg border border-white/10 bg-white/[.025] p-5 sm:p-6">
                  <p className="text-xs font-black tracking-[.2em] text-[#c9ff35]">KUNDEPROFIL</p><h2 className="mt-2 text-xl font-black">Kontakt og leveringsadresse</h2><p className="mt-2 text-xs leading-5 text-zinc-400">Opplysningene kan brukes som grunnlag i checkout senere.</p><ProfileForm profile={profile} />
                </section>

                <section className="h-fit rounded-lg border border-white/10 bg-white/[.025] p-5 sm:p-6">
                  <p className="text-xs font-black tracking-[.2em] text-[#c9ff35]">ORDRER</p><h2 className="mt-2 text-xl font-black">Ordrehistorikk</h2>
                  {orders.length === 0 ? (
                    <div className="mt-5 rounded-lg border border-dashed border-white/10 bg-black/15 px-5 py-10 text-center"><p className="text-sm font-black">Ingen bestillinger ennå</p><p className="mt-2 text-xs leading-5 text-zinc-400">Demo-bestillinger du fullfører i kassen vises her.</p></div>
                  ) : (
                    <div className="mt-5 space-y-3">
                      {orders.map((order) => (
                        <article key={order.id} className="rounded-lg border border-white/10 bg-black/15 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-black text-white">{order.order_number}</p><p className="mt-1 text-xs text-zinc-400">{new Date(order.created_at).toLocaleString("nb-NO")}</p></div><span className="rounded-full bg-[#c9ff35]/10 px-2.5 py-1 text-xs font-black text-[#c9ff35]">{statusLabels[order.status] ?? order.status}</span></div>
                          <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">{order.items.map((item) => <div key={item.id} className="flex justify-between gap-3 text-xs"><span className="text-zinc-300">{item.quantity} × {item.product_name}</span><span className="font-bold text-zinc-200">{money(Number(item.line_total_nok))}</span></div>)}</div>
                          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3"><span className="text-xs text-zinc-400">Betaling: demo</span><strong>{money(Number(order.total_nok))}</strong></div>
                        </article>
                      ))}
                    </div>
                  )}
                  <Link href="/#produkter" className="mt-5 inline-flex text-xs font-bold text-[#c9ff35] hover:text-[#d8ff68]">Se produkter →</Link>
                </section>
              </div>
            </div>
          </div>
        ) : <KontoClient />}
      </main>
      <Footer />
    </>
  );
}
