import Image from "next/image";

const categories = [
  {
    name: "Bremser",
    detail: "Skiver, klosser og kalipere",
    image: "/products/bremse.png",
  },
  {
    name: "Drivverk",
    detail: "Kassett, kjede og gir",
    image: "/products/driverk.png",
  },
  {
    name: "Dekk & slanger",
    detail: "Terreng, vei og hverdag",
    image: "/products/dekk.png",
  },
  {
    name: "Hjul",
    detail: "Felger, nav og hjulsett",
    image: "/products/hjul.png",
  },
  {
    name: "Pedaler",
    detail: "Flate og klikkpedaler",
    image: "/products/pedaler.png",
  },
  {
    name: "Styre & cockpit",
    detail: "Styre, stem og grep",
    image: "/products/styre.png",
  },
];

export default function CategoryGrid() {
  return (
    <section id="kategorier" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[.22em] text-[#c9ff35]">KATEGORIER</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Finn deler etter kategori</h2>
        </div>
        <a href="#produkter" className="hidden text-sm font-bold text-[#c9ff35] sm:block">
          Se alle kategorier →
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <a
            key={category.name}
            href="#produkter"
            className="group relative min-h-52 overflow-hidden rounded-xl border border-white/10 bg-[#0d1011] transition duration-300 hover:-translate-y-1 hover:border-[#c9ff35]/40 hover:shadow-[0_18px_45px_rgba(0,0,0,.35)]"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-contain p-3 transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <strong className="block text-sm text-white sm:text-base">{category.name}</strong>
                  <span className="mt-1 hidden text-xs leading-5 text-zinc-400 lg:block">{category.detail}</span>
                </div>
                <span className="shrink-0 text-lg text-[#c9ff35] transition duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
