import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return { title: "Produkt ikke funnet | Sykkel Deler" };
  }

  return {
    title: `${product.name} | Sykkel Deler`,
    description: `${product.brand} ${product.name} – ${product.category}.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === Number(id));

  if (!product) notFound();

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#070b0c] text-white">
        <div className="mx-auto max-w-[1420px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
            <Link href="/" className="transition hover:text-white">Hjem</Link>
            <span>/</span>
            <Link href="/#produkter" className="transition hover:text-white">Produkter</Link>
            <span>/</span>
            <span className="text-zinc-300">{product.name}</span>
          </nav>

          <section className="grid gap-7 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
            <div className="relative min-h-[380px] overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_42%,#252c2d,#090b0c_72%)] sm:min-h-[520px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain p-8 sm:p-14"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[#c9ff35] px-3 py-1.5 text-[10px] font-black tracking-[.12em] text-black">
                PÅ LAGER
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">{product.brand.toUpperCase()}</p>
              <h1 className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 text-sm font-semibold text-zinc-400">Kategori: {product.category}</p>

              <p className="mt-6 text-3xl font-black text-white sm:text-4xl">{product.price}</p>
              <p className="mt-2 text-sm font-bold text-[#9ce52b]">● På lager – klar til sending</p>

              <div className="mt-7 border-y border-white/10 py-5 text-sm leading-7 text-zinc-300">
                <p>
                  Dette er en demo-produktside for Sykkel Deler. Endelig produktbeskrivelse,
                  kompatibilitet og tekniske spesifikasjoner legges inn når leverandørens
                  produktdata er koblet til nettbutikken.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton product={product} />
                <button className="rounded-md border border-white/15 bg-white/[.03] px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/30">
                  ♡ Lagre
                </button>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ["Rask levering", "1–3 virkedager"],
                  ["Trygg handel", "Sikre betalingsløsninger"],
                  ["Hjelp til valg", "Vi hjelper deg"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-md border border-white/10 bg-white/[.025] p-3">
                    <p className="text-xs font-black text-white">{title}</p>
                    <p className="mt-1 text-[10px] text-zinc-500">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-[#0b0f10] p-5">
              <h2 className="text-sm font-black text-white">Produktinformasjon</h2>
              <p className="mt-3 text-xs leading-6 text-zinc-400">
                Produkttekst fra leverandør kan vises her, sammen med materiale, modellserie og bruksområde.
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-[#0b0f10] p-5">
              <h2 className="text-sm font-black text-white">Kompatibilitet</h2>
              <p className="mt-3 text-xs leading-6 text-zinc-400">
                Her kan kunden kontrollere at delen passer sykkel, drivverk, hjul eller bremsesystem før kjøp.
              </p>
            </div>
            <div className="rounded-md border border-white/10 bg-[#0b0f10] p-5">
              <h2 className="text-sm font-black text-white">Levering & retur</h2>
              <p className="mt-3 text-xs leading-6 text-zinc-400">
                Frakt, forventet leveringstid og returvilkår kan hentes fra butikkens endelige handelsoppsett.
              </p>
            </div>
          </section>

          {relatedProducts.length > 0 && (
            <section className="mt-10 border-t border-white/10 pt-8">
              <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">RELATERTE PRODUKTER</p>
              <h2 className="mt-2 text-2xl font-black text-white">Andre deler i {product.category}</h2>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/produkter/${item.id}`}
                    className="group overflow-hidden rounded-md border border-white/10 bg-[#0b0f10] transition hover:border-[#c9ff35]/40"
                  >
                    <div className="relative aspect-[1.25/1] bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-5 transition group-hover:scale-[1.03]" />
                    </div>
                    <div className="p-3">
                      <p className="text-[9px] font-black tracking-[.14em] text-zinc-500">{item.brand.toUpperCase()}</p>
                      <p className="mt-1 text-sm font-bold text-white">{item.name}</p>
                      <p className="mt-2 font-black text-white">{item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
