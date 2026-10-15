const features = [
  ["⌕", "Søk etter merke", "Finn deler fra dine favorittmerker"],
  ["◇", "På lager", "Se produkter som er klare til sending"],
  ["◇", "Populære deler", "De mest populære akkurat nå"],
  ["▣", "Rask levering", "1–3 virkedager over hele Norge"],
];

export default function FeatureStrip() {
  return (
    <section className="border-b border-white/10 bg-[#0a0f10]">
      <div className="mx-auto grid max-w-[1420px] grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {features.map(([icon, title, text], index) => (
          <div key={title} className={`flex min-h-[72px] items-center gap-4 py-3 ${index > 0 ? "lg:border-l lg:border-white/10 lg:pl-7" : ""}`}>
            <span aria-hidden="true" className="text-2xl text-[#c9ff35]">{icon}</span>
            <div>
              <p className="text-sm font-black text-white">{title}</p>
              <p className="mt-0.5 text-xs leading-5 text-zinc-300">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
