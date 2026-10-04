const brands = ["SHIMANO", "SRAM", "CONTINENTAL", "MAXXIS", "SCHWALBE"];

export default function BrandStrip() {
  return (
    <section id="merker" className="border-y border-white/10 bg-[#090c0d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs font-black tracking-[.22em] text-[#c9ff35]">POPULÆRE MERKER</p>
          <h2 className="mt-2 text-lg font-bold text-white">Kvalitetsdeler fra ledende produsenter</h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-lg font-black italic text-zinc-400 sm:text-xl">
          {brands.map((brand) => <span key={brand}>{brand}</span>)}
        </div>
      </div>
    </section>
  );
}
