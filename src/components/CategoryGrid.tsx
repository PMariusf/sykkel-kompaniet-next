const categories = [
  ["Bremser", "◉"],
  ["Drivverk", "⚙"],
  ["Dekk & slanger", "◯"],
  ["Hjul", "◎"],
  ["Pedaler", "▣"],
  ["Styre & cockpit", "━"],
];

export default function CategoryGrid() {
  return (
    <section id="kategorier" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <p className="text-xs font-bold tracking-[.22em] text-[#c9ff35]">KATEGORIER</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Finn delen du trenger</h2>
        <a href="#produkter" className="hidden text-sm font-semibold text-[#c9ff35] sm:block">Se alle →</a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {categories.map(([name, icon]) => (
          <a key={name} href="#produkter" className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#111516] p-5 transition hover:-translate-y-1 hover:border-[#c9ff35]/40">
            <span className="absolute right-4 top-2 text-7xl text-zinc-600/45 transition group-hover:text-zinc-500/60">{icon}</span>
            <span />
            <div className="relative flex items-center justify-between gap-2">
              <strong>{name}</strong>
              <span className="text-[#c9ff35]">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
