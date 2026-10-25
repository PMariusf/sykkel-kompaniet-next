import { cookies } from "next/headers";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AdminLogin from "./AdminLogin";
import AdminProductForm from "./AdminProductForm";
import AdminProductActions from "./AdminProductActions";
import AdminProductEditor from "./AdminProductEditor";
import AdminCategoryManager from "./AdminCategoryManager";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type Category = {
  id: string;
  name: string;
  description: string | null;
  image_path: string | null;
  sort_order: number;
  is_active: boolean;
};

type ProductImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
};

type Product = {
  id: string;
  name: string;
  brand: string | null;
  sku: string | null;
  ean: string | null;
  price_nok: number | null;
  compare_at_price_nok: number | null;
  badge: string | null;
  is_featured: boolean;
  category_id: string | null;
  supplier: string | null;
  description: string | null;
  compatibility: string | null;
  image_path: string | null;
  stock_quantity: number | null;
  stock_status: string;
  warehouse_location: string;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  is_published: boolean;
  category: { name: string } | null;
  images: ProductImage[];
};

type Order = {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string | null;
  total_nok: number;
  status: string;
  payment_status: string;
  created_at: string;
};

function money(value: number | null) {
  if (value == null) return "Pris mangler";
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(value);
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    new: "Ny",
    processing: "Behandles",
    shipped: "Sendt",
    completed: "Fullført",
    cancelled: "Kansellert",
  };
  return labels[status] ?? status;
}

function statusClass(status: string) {
  if (status === "new") return "bg-[#c9ff35]/15 text-[#c9ff35]";
  if (status === "processing") return "bg-sky-400/10 text-sky-300";
  if (status === "shipped") return "bg-violet-400/10 text-violet-300";
  if (status === "completed") return "bg-emerald-400/10 text-emerald-300";
  if (status === "cancelled") return "bg-red-400/10 text-red-300";
  return "bg-white/5 text-zinc-400";
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;
  if (!accessToken) return <AdminLogin />;

  const [categoriesResponse, productsResponse, ordersResponse] = await Promise.all([
    fetch(
      `${SUPABASE_URL}/rest/v1/categories?select=id,name,description,image_path,sort_order,is_active&order=sort_order.asc`,
      { headers: supabaseHeaders(accessToken), cache: "no-store" },
    ),
    fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name,brand,sku,ean,price_nok,compare_at_price_nok,badge,is_featured,category_id,supplier,description,compatibility,image_path,stock_quantity,stock_status,warehouse_location,seo_title,seo_description,og_image_url,is_published,category:categories(name),images:product_images(id,image_url,alt_text,sort_order,is_primary)&order=created_at.desc`,
      { headers: supabaseHeaders(accessToken), cache: "no-store" },
    ),
    fetch(
      `${SUPABASE_URL}/rest/v1/orders?select=id,order_number,customer_email,customer_name,total_nok,status,payment_status,created_at&order=created_at.desc&limit=50`,
      { headers: supabaseHeaders(accessToken), cache: "no-store" },
    ),
  ]);

  if (
    categoriesResponse.status === 401 ||
    productsResponse.status === 401 ||
    ordersResponse.status === 401
  ) {
    return <AdminLogin />;
  }

  const categories: Category[] = categoriesResponse.ok ? await categoriesResponse.json() : [];
  const products: Product[] = productsResponse.ok ? await productsResponse.json() : [];
  const orders: Order[] = ordersResponse.ok ? await ordersResponse.json() : [];

  const published = products.filter((product) => product.is_published).length;
  const drafts = products.length - published;
  const lowStock = products.filter(
    (product) => product.stock_status === "low_stock" || product.stock_status === "out_of_stock",
  ).length;
  const openOrders = orders.filter((order) => ["new", "processing"].includes(order.status)).length;
  const demoRevenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + Number(order.total_nok || 0), 0);
  const completedOrders = orders.filter((order) => order.status === "completed").length;
  const recentOrders = orders.slice(0, 5);

  return (
    <main className="min-h-screen bg-[#070b0c] text-white">
      <div className="border-b border-white/10 bg-[#0b0f10]">
        <div className="mx-auto flex max-w-[1420px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">SYKKEL DELER CMS</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight">Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ThemeToggle />
            <Link href="/admin/ordrer" className="rounded-md bg-[#c9ff35] px-4 py-2 text-xs font-black text-black hover:bg-[#d8ff68]">Ordrer</Link>
            <Link href="/admin/innhold" className="rounded-md border border-[#c9ff35]/25 px-4 py-2 text-xs font-bold text-[#c9ff35] hover:border-[#c9ff35]/60">Innhold & media</Link>
            <Link href="/admin/markedsforing" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-[#c9ff35]/40">Markedsføring</Link>
            <Link href="/admin/kontakt" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-[#c9ff35]/40">Kontaktinfo</Link>
            <Link href="/" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-white/25">Se nettsiden</Link>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-white/25">Logg ut</button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1420px] px-4 py-7 sm:px-6 lg:px-8">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {[
            ["Produkter", products.length, "Totalt i CMS"],
            ["Publisert", published, "Synlige produkter"],
            ["Lavt / tomt lager", lowStock, "Trenger oppfølging"],
            ["Åpne ordre", openOrders, "Ny + behandles"],
            ["Fullførte ordre", completedOrders, "Demo-status"],
            ["Demo-omsetning", money(demoRevenue), "Ikke ekte betaling"],
          ].map(([label, value, text]) => (
            <div key={String(label)} className="rounded-xl border border-white/10 bg-[#0b0f10] p-5">
              <p className="text-[10px] font-black tracking-[.18em] text-zinc-500">{label}</p>
              <p className="mt-2 text-2xl font-black text-white">{value}</p>
              <p className="mt-1 text-[11px] text-zinc-500">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-xl border border-white/10 bg-[#0b0f10] p-5">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">ORDRER</p>
              <h2 className="mt-2 text-xl font-black">Siste bestillinger</h2>
            </div>
            <Link href="/admin/ordrer" className="text-xs font-black text-[#c9ff35] hover:text-[#d8ff68]">Se alle ordre →</Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-10 text-center text-sm text-zinc-500">Ingen bestillinger ennå.</div>
          ) : (
            <div className="divide-y divide-white/10">
              {recentOrders.map((order) => (
                <div key={order.id} className="grid gap-3 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-white">{order.order_number}</p>
                      <span className={`rounded-full px-2 py-1 text-[9px] font-black ${statusClass(order.status)}`}>
                        {statusLabel(order.status).toUpperCase()}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-zinc-500">
                      {order.customer_name || order.customer_email} · {new Date(order.created_at).toLocaleString("nb-NO")}
                    </p>
                  </div>
                  <div className="text-sm font-black text-white">{money(Number(order.total_nok))}</div>
                  <Link href="/admin/ordrer" className="text-xs font-bold text-zinc-400 hover:text-[#c9ff35]">Åpne →</Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[420px_1fr]">
          <div className="space-y-6">
            <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-5">
              <div className="mb-5 border-b border-white/10 pb-4">
                <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">NYTT PRODUKT</p>
                <h2 className="mt-2 text-xl font-black">Legg til produkt</h2>
              </div>
              <AdminProductForm categories={categories} />
            </section>

            <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-5">
              <div className="mb-5 border-b border-white/10 pb-4">
                <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">KATEGORIER</p>
                <h2 className="mt-2 text-xl font-black">Kategori-CMS</h2>
              </div>
              <AdminCategoryManager categories={categories} />
            </section>
          </div>

          <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-5">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">PRODUKTER</p>
                <h2 className="mt-2 text-xl font-black">Produktoversikt</h2>
              </div>
              <span className="text-xs font-bold text-zinc-500">{products.length} produkter · {drafts} utkast</span>
            </div>

            {products.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg font-black">Ingen CMS-produkter ennå</p>
                <p className="mt-2 text-sm text-zinc-500">Legg til første produkt i skjemaet.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {products.map((product) => (
                  <article key={product.id} className="py-5">
                    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-black text-white">{product.name}</h3>
                          <span className={`rounded-full px-2 py-1 text-[9px] font-black ${product.is_published ? "bg-[#c9ff35]/15 text-[#c9ff35]" : "bg-white/5 text-zinc-500"}`}>
                            {product.is_published ? "PUBLISERT" : "UTKAST"}
                          </span>
                          {product.badge && <span className="rounded-full bg-[#c9ff35] px-2 py-1 text-[9px] font-black uppercase text-black">{product.badge}</span>}
                          {product.is_featured && <span className="rounded-full bg-white/5 px-2 py-1 text-[9px] font-black text-zinc-300">UTVALGT</span>}
                          {product.images?.length > 0 && <span className="rounded-full bg-white/5 px-2 py-1 text-[9px] font-black text-zinc-400">{product.images.length} BILDER</span>}
                        </div>
                        <p className="mt-1 text-xs text-zinc-500">
                          {[product.brand, product.category?.name, product.sku ? `SKU ${product.sku}` : null].filter(Boolean).join(" · ") || "Produktdata mangler"}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs">
                          <span className="font-black text-white">{money(product.price_nok)}</span>
                          {product.compare_at_price_nok != null && <span className="text-zinc-500 line-through">{money(product.compare_at_price_nok)}</span>}
                          <span className="text-zinc-400">Lager: {product.stock_quantity ?? "ukjent"}</span>
                          <span className="text-zinc-400">{product.warehouse_location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2"><AdminProductActions id={product.id} published={product.is_published} /></div>
                    </div>
                    <AdminProductEditor product={product} categories={categories} />
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
