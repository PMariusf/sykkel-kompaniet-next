import Image from "next/image";

const categories = [
  { name: "Bremser", image: "/products/bremse.png" },
  { name: "Drivverk", image: "/products/driverk.png" },
  { name: "Dekk & slanger", image: "/products/dekk.png" },
  { name: "Hjul", image: "/products/hjul.png" },
  { name: "Pedaler", image: "/products/pedaler.png" },
  { name: "Styre & cockpit", image: "/products/styre.png" },
];

export default function CategoryGrid() {
  return (
    <section id="kategorier" className="border-b border-white/10 bg-[#081011]">
      <div className="mx-auto max-w-[1420px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black tracking-[.34em] text-[#c9ff35]">KATEGORIER</p>
            <h2 className="mt-1.5 text-2xl font-black tracking-tight text-white sm:text-3xl">Finn deler etter kategori</h2>
          </div>
          <a href="#produkter" className="hidden text-xs font-bold text-[#c9ff35] sm:block">Se alle kategorier →</a>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#produkter"
              className="group relative h-[138px] overflow-hidden rounded-md border border-white/15 bg-[#0b1011] transition hover:border-[#c9ff35]/45"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-contain p-1.5 transition duration-300 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
                <strong className="text-sm font-black text-white">{category.name}</strong>
                <span className="text-base text-[#c9ff35] transition group-hover:translate-x-0.5">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
