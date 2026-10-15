import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { getStoreProducts } from "@/lib/store-products";

function stockLabel(status?: string) {
  if (status === "in_stock") return "På lager";
  if (status === "low_stock") return "Få på lager";
  if (status === "out_of_stock") return "Utsolgt";
  if (status === "backorder") return "Restordre";
  return "Lagerstatus kommer";
}

export default async function ProductGrid() {
  const products = (await getStoreProducts()).slice(0, 6);

  return (
    <section id="produkter" className="border-b border-white/10 bg-[#070b0c]">
      <div className="mx-auto max-w-[1420px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-[.28em] text-[#c9ff35]">UTVALGTE PRODUKTER</p>
            <h2 className="mt-1.5 text-[1.7rem] font-black tracking-tight text-white sm:text-3xl">Populære sykkeldeler</h2>
          </div>
          <Link href="/sok" className="hidden text-xs font-bold text-[#c9ff35] sm:block">Se flere produkter →</Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {products.map((product) => (
            <article key={product.id} className="group min-w-0 overflow-hidden rounded-md border border-white/15 bg-[#0b0f10] transition hover:border-white/25">
              <Link href={`/produkter/${product.id}`} aria-label={`Se ${product.name}`} className="block">
                <div className="relative aspect-[1/0.92] overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]">
                  <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 16vw" className="object-contain p-2.5 transition duration-300 group-hover:scale-[1.03] sm:p-3" />
                  {product.badge && <span className="absolute left-2 top-2 rounded-full bg-[#c9ff35] px-2 py-1 text-xs font-black uppercase text-black">{product.badge}</span>}
                  <span aria-hidden="true" className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-base text-white backdrop-blur-sm">♡</span>
                </div>

                <div className="px-2.5 pt-2.5 sm:px-3 sm:pt-3">
                  <p className="truncate text-xs font-black tracking-[.1em] text-zinc-300">{product.brand.toUpperCase()}</p>
                  <h3 className="mt-1 min-h-10 text-sm font-bold leading-5 text-zinc-100 transition group-hover:text-white">{product.name}</h3>
                  <div className="mt-2 flex flex-wrap items-baseline gap-2">
                    <p className="text-[1.05rem] font-black text-white sm:text-xl">{product.price}</p>
                    {product.compareAtPrice && <p className="text-xs font-bold text-zinc-400 line-through">{product.compareAtPrice}</p>}
                  </div>
                  <p className="mt-1 text-xs font-bold text-zinc-300">{stockLabel(product.stockStatus)}</p>
                </div>
              </Link>

              <div className="p-2.5 pt-0 sm:p-3 sm:pt-0">
                <AddToCartButton product={product} compact />
              </div>
            </article>
          ))}
        </div>

        <Link href="/sok" className="mt-4 inline-flex text-xs font-bold text-[#c9ff35] sm:hidden">Se flere produkter →</Link>
      </div>
    </section>
  );
}
