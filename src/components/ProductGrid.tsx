import Image from "next/image";
import { products } from "@/data/products";

export default function ProductGrid() {
  return (
    <section id="produkter" className="border-y border-white/10 bg-white/[.015]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-[.22em] text-[#c9ff35]">UTVALGTE PRODUKTER</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Populære sykkeldeler</h2>
          </div>
          <a href="#" className="hidden text-sm font-bold text-[#c9ff35] sm:block">Se flere produkter →</a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {products.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-xl border border-white/10 bg-[#101415] transition duration-300 hover:-translate-y-1 hover:border-white/20">
              <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_38%,#262d2e,#090b0c_70%)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 17vw"
                  className="object-contain p-8 transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[#c9ff35] px-2.5 py-1 text-[9px] font-black tracking-wide text-black">PÅ LAGER</span>
                <button aria-label="Legg til i favoritter" className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/35 px-2.5 py-1.5 text-xs text-zinc-300">♡</button>
              </div>
              <div className="p-4">
                <p className="text-[9px] font-black tracking-[.17em] text-zinc-500">{product.brand.toUpperCase()}</p>
                <h3 className="mt-2 min-h-12 text-sm font-bold leading-5 text-zinc-100">{product.name}</h3>
                <div className="mt-3 text-[11px] text-[#c9ff35]">★★★★★ <span className="text-zinc-600">(24)</span></div>
                <p className="mt-3 text-xl font-black text-white">{product.price}</p>
                <p className="mt-1 text-[11px] font-semibold text-[#9ce52b]">● På lager</p>
                <button className="mt-4 w-full rounded-lg bg-[#c9ff35] py-3 text-xs font-black text-black transition hover:bg-[#d8ff68]">
                  Legg i handlekurv
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
