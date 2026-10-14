import { cookies } from "next/headers";
import Link from "next/link";
import AdminLogin from "./AdminLogin";
import AdminProductForm from "./AdminProductForm";
import AdminProductActions from "./AdminProductActions";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type Category = { id: string; name: string };
type Product = {
  id: string;
  name: string;
  brand: string | null;
  sku: string | null;
  price_nok: number | null;
  stock_quantity: number | null;
  stock_status: string;
  warehouse_location: string;
  is_published: boolean;
  category: { name: string } | null;
};

function formatPrice(value: number | null) {
  if (value == null) return "Pris mangler";
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sykkel_admin_access")?.value;

  if (!accessToken) return <AdminLogin />;

  const [categoriesResponse, productsResponse] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/categories?select=id,name&order=sort_order.asc`, {
      headers: supabaseHeaders(accessToken),
      cache: "no-store",
    }),
    fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name,brand,sku,price_nok,stock_quantity,stock_status,warehouse_location,is_published,category:categories(name)&order=created_at.desc`,
      {
        headers: supabaseHeaders(accessToken),
        cache: "no-store",
      },
    ),
  ]);

  if (categoriesResponse.status === 401 || productsResponse.status === 401) return <AdminLogin />;

  const categories: Category[] = categoriesResponse.ok ? await categoriesResponse.json() : [];
  const products: Product[] = productsResponse.ok ? await productsResponse.json() : [];

  return (
    <main className="min-h-screen bg-[#070b0c] text-white">
      <div className="border-b border-white/10 bg-[#0b0f10]">
        <div className="mx-auto flex max-w-[1420px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">SYKKEL DELER CMS</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight">Produkter og lager</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/innhold" className="rounded-md bg-[#c9ff35] px-4 py-2 text-xs font-black text-black transition hover:bg-[#d8ff68]">
              Innhold & media
            </Link>
            <Link href="/" className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-white/25 hover:text-white">
              Se nettsiden
            </Link>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-md border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300 hover:border-white/25 hover:text-white">
                Logg ut
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1420px] gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[420px_1fr] lg:px-8">
        <section className="h-fit rounded-xl border border-white/10 bg-[#0b0f10] p-5 lg:sticky lg:top-6">
          <div className="mb-5 border-b border-white/10 pb-4">
            <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">NYTT PRODUKT</p>
            <h2 className="mt-2 text-xl font-black">Legg til produkt</h2>
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Feltene kan fylles ut når ekte produktdata kommer. Lagerlokasjon er satt til Arna som standard.
            </p>
          </div>
          <AdminProductForm categories={categories} />
        </section>

        <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-5">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">PRODUKTER</p>
              <h2 className="mt-2 text-xl font-black">Produktoversikt</h2>
            </div>
            <span className="text-xs font-bold text-zinc-500">{products.length} produkter</span>
          </div>

          {products.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg font-black">Ingen CMS-produkter ennå</p>
              <p className="mt-2 text-sm text-zinc-500">Demo-produktene på nettsiden ligger fortsatt lokalt til ekte produktdata kommer.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {products.map((product) => (
                <article key={product.id} className="grid gap-4 py-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black text-white">{product.name}</h3>
                      <span className={`rounded-full px-2 py-1 text-[9px] font-black ${product.is_published ? "bg-[#c9ff35]/15 text-[#c9ff35]" : "bg-white/5 text-zinc-500"}`}>
                        {product.is_published ? "PUBLISERT" : "UTKAST"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                      {[product.brand, product.category?.name, product.sku ? `SKU ${product.sku}` : null].filter(Boolean).join(" · ") || "Produktdata mangler"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs">
                      <span className="font-black text-white">{formatPrice(product.price_nok)}</span>
                      <span className="text-zinc-400">Lager: {product.stock_quantity ?? "ukjent"}</span>
                      <span className="text-zinc-400">{product.warehouse_location}</span>
                    </div>
                  </div>
                  <AdminProductActions id={product.id} published={product.is_published} />
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
