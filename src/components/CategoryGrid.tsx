import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

const popularParts = [
  { id: "1", name: "Kassett", label: "12-delt", image: "/products/cassette.png" },
  { id: "2", name: "Kjede", label: "Drivverk", image: "/products/chain.png" },
  { id: "3", name: "Bremseskive", label: "180 mm", image: "/products/brake-rotor.png" },
  { id: "5", name: "Bakgir", label: "12-delt", image: "/products/rear-derailleur.png" },
  { id: "6", name: "Krankarm", label: "Drivverk", image: "/products/crank-arm.png" },
  { id: "4", name: "Dekk", label: "29 × 2.4", image: "/products/tire.png" },
];

export default function CategoryGrid() {
  return (
    <section id="kategorier" className="border-b border-white/10 bg-[#081011]">
      <div className="mx-auto max-w-[1420px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black tracking-[.34em] text-[#c9ff35]">KATEGORIER</p>
            <h2 className="mt-1.5 text-[1.7rem] font-black tracking-tight text-white sm:text-3xl">Finn deler etter kategori</h2>
          </div>
          <Link href="/kategorier" className="hidden text-xs font-bold text-[#c9ff35] sm:block">Se alle kategorier →</Link>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/kategori/${category.slug}`}
              className="group relative h-[142px] overflow-hidden rounded-md border border-white/15 bg-[#0b1011] transition hover:border-[#c9ff35]/45 sm:h-[150px] lg:h-[138px]"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                loading={index < 2 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-contain p-2 transition duration-300 group-hover:scale-[1.04] sm:p-1.5"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
                <strong className="text-[13px] font-black leading-4 text-white sm:text-sm">{category.name}</strong>
                <span className="shrink-0 text-base text-[#c9ff35] transition group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/kategorier" className="mt-4 inline-flex text-xs font-bold text-[#c9ff35] sm:hidden">
          Se alle kategorier →
        </Link>

        <div className="mt-7 border-t border-white/10 pt-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-black tracking-[.3em] text-zinc-500">POPULÆRE DELER</p>
              <h3 className="mt-1 text-lg font-black text-white sm:text-xl">Se nærmere på komponentene</h3>
            </div>
            <Link href="/#produkter" className="hidden text-xs font-bold text-[#c9ff35] sm:block">Se alle produkter →</Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {popularParts.map((part) => (
              <Link
                key={part.id}
                href={`/produkter/${part.id}`}
                className="group overflow-hidden rounded-md border border-white/10 bg-[#0b0f10] transition hover:border-[#c9ff35]/40 hover:bg-[#0d1314]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_50%_42%,#202728,#090c0d_72%)]">
                  <Image
                    src={part.image}
                    alt={part.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain p-3 transition duration-300 group-hover:scale-[1.07]"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-white/5 px-3 py-2.5">
                  <div className="min-w-0">
                    <strong className="block truncate text-xs font-black text-white sm:text-[13px]">{part.name}</strong>
                    <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[.14em] text-zinc-500">{part.label}</span>
                  </div>
                  <span className="text-sm text-[#c9ff35] transition group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
