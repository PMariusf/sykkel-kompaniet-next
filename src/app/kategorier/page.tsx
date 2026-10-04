import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#070b0c] text-white">
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_75%_15%,rgba(201,255,53,.08),transparent_25%),#081011]">
          <div className="mx-auto max-w-[1420px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <p className="text-[10px] font-black tracking-[.34em] text-[#c9ff35]">SYKKELDELER</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Finn riktig kategori</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
              Velg delen av sykkelen du vil oppgradere eller vedlikeholde. Herfra kan du gå videre til produkter i hver kategori.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1420px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/kategori/${category.slug}`}
                className="group relative min-h-[250px] overflow-hidden rounded-lg border border-white/10 bg-[#0b1011] transition hover:-translate-y-0.5 hover:border-[#c9ff35]/45"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-5 transition duration-300 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-black text-white">{category.name}</h2>
                      <p className="mt-1 max-w-md text-xs leading-5 text-zinc-400">{category.description}</p>
                    </div>
                    <span className="text-xl text-[#c9ff35] transition group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
