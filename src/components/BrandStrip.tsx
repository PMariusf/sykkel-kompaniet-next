const brands = ["SHIMANO", "SRAM", "Continental", "MAXXIS", "SCHWALBE"];

export default function BrandStrip() {
  return (
    <section id="merker" className="border-b border-white/10 bg-[#090d0e]">
      <div className="mx-auto flex max-w-[1420px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="min-w-fit">
          <p className="text-[9px] font-black tracking-[.34em] text-[#c9ff35]">POPULÆRE MERKER</p>
          <p className="mt-1 text-sm font-bold text-white">Kvalitetsdeler fra ledende produsenter</p>
        </div>

        <div className="flex flex-1 flex-wrap items-center justify-between gap-4 lg:ml-8">
          {brands.map((brand, index) => (
            <span key={brand} className={`text-base font-black italic text-zinc-300 sm:text-xl ${index > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""}`}>
              {brand}
            </span>
          ))}
          <a href="#" className="text-xs font-bold text-[#c9ff35]">Se alle merker →</a>
        </div>
      </div>
    </section>
  );
}
