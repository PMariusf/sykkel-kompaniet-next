import Image from "next/image";
import { products } from "@/data/products";

export default function ProductGrid() {
  return (
    <section id="produkter" className="border-y border-white/10 bg-white/[.015]">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="text-xs font-bold tracking-[.22em] text-[#c9ff35]">UTVALGTE PRODUKTER</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Populære sykkeldeler</h2>
          <span className="text-xs text-zinc-500">Demo-produkter</span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-xl border border-white/10 bg-[#101415] transition hover:border-white/20">
              <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#252b2c,#090b0c_70%)]">
                <Image src={product.image} alt="" fill className="object-contain p-9 transition duration-300 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-[#c9ff35] px-2.5 py-1 text-[10px] font-black text-black">PÅ LAGER</span>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold tracking-[.16em] text-zinc-500">{product.brand.toUpperCase()}</p>
                <h3 className="mt-2 min-h-12 font-bold leading-6">{product.name}</h3>
                <p className="mt-4 text-xl font-black">{product.price}</p>
                <button className="mt-5 w-full rounded-lg bg-[#c9ff35] py-3 text-sm font-black text-black transition hover:bg-[#d8ff68]">
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
