const categories = [
  { name: "Bremser", icon: "◉", detail: "Skiver, klosser og kalipere" },
  { name: "Drivverk", icon: "⚙", detail: "Kassett, kjede og gir" },
  { name: "Dekk & slanger", icon: "◯", detail: "Terreng, vei og hverdag" },
  { name: "Hjul", icon: "◎", detail: "Felger, nav og hjulsett" },
  { name: "Pedaler", icon: "▣", detail: "Flate og klikkpedaler" },
  { name: "Styre & cockpit", icon: "━", detail: "Styre, stem og grep" },
];

export default function CategoryGrid() {
  return (
    <section id="kategorier" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[.22em] text-[#c9ff35]">KATEGORIER</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Finn deler etter kategori</h2>
        </div>
        <a href="#produkter" className="hidden text-sm font-bold text-[#c9ff35] sm:block">Se alle kategorier →</a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <a
            key={category.name}
            href="#produkter"
            className="group relative min-h-48 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#171c1d] to-[#0d1011] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c9ff35]/35 hover:shadow-[0_12px_35px_rgba(0,0,0,.28)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,.07),transparent_45%)]" />
            <span className="absolute right-4 top-3 text-7xl text-zinc-600/45 transition duration-300 group-hover:scale-105 group-hover:text-zinc-500/55">
              {category.icon}
            </span>
            <div className="relative flex h-full flex-col justify-end">
              <strong className="text-base text-white">{category.name}</strong>
              <span className="mt-1 text-xs leading-5 text-zinc-500">{category.detail}</span>
              <span className="mt-4 text-[#c9ff35]">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
