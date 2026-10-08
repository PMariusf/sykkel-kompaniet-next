import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

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
      </div>
    </section>
  );
}
