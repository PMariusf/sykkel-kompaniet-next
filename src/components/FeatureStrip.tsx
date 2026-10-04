const features = [
  ["⌕", "Søk etter merke", "Finn deler fra favorittmerkene dine"],
  ["◫", "På lager", "Se produkter som er klare til sending"],
  ["◆", "Populære deler", "De mest populære akkurat nå"],
  ["🚚", "Rask levering", "1–3 virkedager over hele Norge"],
];

export default function FeatureStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
      <div className="grid overflow-hidden rounded-xl border border-white/10 bg-[#0e1213] sm:grid-cols-2 lg:grid-cols-4">
        {features.map(([icon, title, text], index) => (
          <div key={title} className={`flex gap-4 p-5 ${index < 3 ? "lg:border-r lg:border-white/10" : ""}`}>
            <span className="text-xl text-[#c9ff35]">{icon}</span>
            <div>
              <p className="text-sm font-bold text-white">{title}</p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
