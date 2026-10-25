import { cookies } from "next/headers";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AdminLogin from "../AdminLogin";
import AdminOrderStatus from "./AdminOrderStatus";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type OrderItem = {
  id: string;
  product_name: string;
  quantity: number;
  unit_price_nok: number;
  line_total_nok: number;
};

type Order = {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string | null;
  customer_phone: string | null;
  city: string | null;
  subtotal_nok: number;
  shipping_nok: number;
  total_nok: number;
  status: string;
  payment_status: string;
  created_at: string;
  items: OrderItem[];
};

function money(value: number) {
  return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 0 }).format(value);
}

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return <AdminLogin />;

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/orders?select=id,order_number,customer_email,customer_name,customer_phone,city,subtotal_nok,shipping_nok,total_nok,status,payment_status,created_at,items:order_items(id,product_name,quantity,unit_price_nok,line_total_nok)&order=created_at.desc`,
    { headers: supabaseHeaders(accessToken), cache: "no-store" },
  );
  if (response.status === 401) return <AdminLogin />;
  const orders: Order[] = response.ok ? await response.json() : [];
  const openOrders = orders.filter((order) => ["new", "processing"].includes(order.status)).length;
  const demoRevenue = orders.filter((order) => order.status !== "cancelled").reduce((sum, order) => sum + Number(order.total_nok), 0);

  return (
    <main className="min-h-screen bg-[#070b0c] text-white">
      <header className="border-b border-white/10 bg-[#0b0f10]">
        <div className="mx-auto flex max-w-[1420px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div><p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">SYKKEL DELER CMS</p><h1 className="mt-1 text-2xl font-black">Ordreoversikt</h1></div>
          <div className="flex flex-wrap gap-2"><ThemeToggle /><Link href="/admin" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300">Dashboard</Link><Link href="/" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300">Se nettsiden</Link></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1420px] px-4 py-7 sm:px-6 lg:px-8">
        <section className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#0b0f10] p-5"><p className="text-[10px] font-black tracking-[.2em] text-zinc-500">ORDRER</p><p className="mt-2 text-3xl font-black">{orders.length}</p></div>
          <div className="rounded-xl border border-white/10 bg-[#0b0f10] p-5"><p className="text-[10px] font-black tracking-[.2em] text-zinc-500">ÅPNE</p><p className="mt-2 text-3xl font-black">{openOrders}</p></div>
          <div className="rounded-xl border border-white/10 bg-[#0b0f10] p-5"><p className="text-[10px] font-black tracking-[.2em] text-zinc-500">DEMO-OMSETNING</p><p className="mt-2 text-3xl font-black">{money(demoRevenue)}</p><p className="mt-1 text-[10px] text-zinc-600">Ikke ekte betaling</p></div>
        </section>

        <section className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0b0f10]">
          <div className="border-b border-white/10 p-5"><h2 className="text-xl font-black">Bestillinger</h2><p className="mt-1 text-xs text-zinc-500">Demo-ordre fra kundekontoer.</p></div>
          {orders.length === 0 ? (
            <div className="px-5 py-16 text-center text-sm text-zinc-500">Ingen bestillinger ennå.</div>
          ) : (
            <div className="divide-y divide-white/10">
              {orders.map((order) => (
                <article key={order.id} className="p-5">
                  <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2"><h3 className="font-black">{order.order_number}</h3><span className="rounded-full bg-white/5 px-2 py-1 text-[9px] font-black text-zinc-400">{order.payment_status.toUpperCase()}</span></div>
                      <p className="mt-1 text-xs text-zinc-500">{new Date(order.created_at).toLocaleString("nb-NO")} · {order.customer_name || order.customer_email}{order.city ? ` · ${order.city}` : ""}</p>
                      <div className="mt-4 space-y-2">
                        {order.items.map((item) => <div key={item.id} className="flex justify-between gap-4 text-xs"><span className="text-zinc-300">{item.quantity} × {item.product_name}</span><span className="font-bold">{money(Number(item.line_total_nok))}</span></div>)}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 border-t border-white/10 pt-3 text-xs"><span className="text-zinc-500">Delsum {money(Number(order.subtotal_nok))}</span><span className="text-zinc-500">Frakt {money(Number(order.shipping_nok))}</span><span className="font-black">Totalt {money(Number(order.total_nok))}</span></div>
                    </div>
                    <AdminOrderStatus id={order.id} status={order.status} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
