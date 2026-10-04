import Image from "next/image";
import { products } from "@/data/products";

export default function ProductGrid() {
  return (
    <section id="produkter" className="border-b border-white/10 bg-[#070b0c]">
      <div className="mx-auto max-w-[1420px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black tracking-[.34em] text-[#c9ff35]">UTVALGTE PRODUKTER</p>
            <h2 className="mt-1.5 text-2xl font-black tracking-tight text-white sm:text-3xl">Populære sykkeldeler</h2>
          </div>
          <a href="#" className="hidden text-xs font-bold text-[#c9ff35] sm:block">Se flere produkter →</a>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {products.map((product) => (
            <article key={product.id} className="group overflow-hidden rounded-md border border-white/15 bg-[#0b0f10] transition hover:border-white/25">
              <div className="relative aspect-[1/0.92] overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 16vw"
                  className="object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
                />
                <button aria-label="Legg til i favoritter" className="absolute right-2.5 top-2.5 text-lg text-white/90">♡</button>
              </div>

              <div className="p-3">
                <p className="text-[9px] font-black tracking-[.16em] text-zinc-400">{product.brand.toUpperCase()}</p>
                <h3 className="mt-1 min-h-10 text-[13px] font-bold leading-4 text-zinc-100">{product.name}</h3>
                <p className="mt-2 text-xl font-black text-white">{product.price}</p>
                <p className="mt-1 text-[10px] font-bold text-[#9ce52b]">● På lager</p>
                <button className="mt-2.5 w-full rounded-md bg-[#c9ff35] py-2.5 text-[11px] font-black text-black transition hover:bg-[#d8ff68]">
                  🛒 <span className="ml-1">Legg i handlekurv</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
