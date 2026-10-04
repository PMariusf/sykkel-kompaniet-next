import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, getCategory } from "@/data/categories";
import { products } from "@/data/products";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return { title: "Kategori ikke funnet | Sykkel Deler" };
  }

  return {
    title: `${category.name} | Sykkel Deler`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const categoryProducts = products.filter((product) => product.category === category.productCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#070b0c] text-white">
        <section className="border-b border-white/10 bg-[#081011]">
          <div className="mx-auto grid max-w-[1420px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center lg:px-8 lg:py-10">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                <Link href="/" className="transition hover:text-white">Hjem</Link>
                <span>/</span>
                <Link href="/kategorier" className="transition hover:text-white">Sykkeldeler</Link>
                <span>/</span>
                <span className="text-zinc-300">{category.name}</span>
              </div>

              <p className="mt-7 text-[10px] font-black tracking-[.34em] text-[#c9ff35]">KATEGORI</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{category.name}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">{category.description}</p>
              <p className="mt-5 text-xs font-bold text-zinc-300">
                {categoryProducts.length} {categoryProducts.length === 1 ? "produkt" : "produkter"} i demo-utvalget
              </p>
            </div>

            <div className="relative h-[220px] overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_45%,#232a2b,#0a0d0e_72%)] sm:h-[260px]">
              <Image src={category.image} alt={category.name} fill sizes="420px" className="object-contain p-4" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1420px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {["Alle", "På lager", "Shimano", "SRAM", "Continental"].map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={`rounded-md border px-3 py-2 text-[11px] font-bold transition ${
                    index === 0
                      ? "border-[#c9ff35]/50 bg-[#c9ff35]/10 text-[#c9ff35]"
                      : "border-white/10 bg-white/[.025] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>Sorter:</span>
              <select className="rounded-md border border-white/10 bg-[#0b1011] px-3 py-2 text-xs text-zinc-200 outline-none">
                <option>Populære</option>
                <option>Pris: lav til høy</option>
                <option>Pris: høy til lav</option>
              </select>
            </div>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {categoryProducts.map((product) => (
                <article key={product.id} className="group overflow-hidden rounded-md border border-white/15 bg-[#0b0f10] transition hover:border-[#c9ff35]/35">
                  <Link href={`/produkter/${product.id}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-contain p-4 transition duration-300 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-3.5">
                      <p className="text-[9px] font-black tracking-[.16em] text-zinc-500">{product.brand.toUpperCase()}</p>
                      <h2 className="mt-1.5 min-h-10 text-[13px] font-bold leading-4 text-zinc-100">{product.name}</h2>
                      <p className="mt-3 text-xl font-black text-white">{product.price}</p>
                      <p className="mt-1 text-[10px] font-bold text-[#9ce52b]">● På lager</p>
                    </div>
                  </Link>
                  <div className="px-3.5 pb-3.5">
                    <button className="w-full rounded-md bg-[#c9ff35] py-2.5 text-[11px] font-black text-black transition hover:bg-[#d8ff68]">
                      Legg i handlekurv
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-white/15 bg-white/[.02] px-5 py-14 text-center">
              <p className="text-sm font-bold text-white">Produkter i denne kategorien kommer snart.</p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Kategorisiden er klar, men vi har ikke lagt inn demo-produkter her ennå.
              </p>
              <Link href="/kategorier" className="mt-5 inline-flex text-xs font-bold text-[#c9ff35]">
                ← Tilbake til alle kategorier
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
