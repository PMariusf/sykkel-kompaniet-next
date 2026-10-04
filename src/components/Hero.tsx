export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[1fr_.95fr] lg:px-8">
        <div className="relative z-10">
          <p className="mb-4 text-xs font-bold tracking-[.22em] text-[#c9ff35]">KVALITET GIR BEDRE TURER</p>
          <h1 className="max-w-3xl text-6xl font-black leading-[.92] tracking-[-.055em] sm:text-7xl lg:text-[5.8rem]">
            Deler til<br /><span className="text-zinc-300">sykkelen din.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
            Sykkeldeler for terreng, landevei og hverdag. En ryddig nettbutikk med fokus på riktig del, tydelig lagerstatus og enkel handel.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#produkter" className="rounded-lg bg-[#c9ff35] px-6 py-3.5 font-bold text-black transition hover:bg-[#d8ff68]">
              Se sykkeldeler →
            </a>
            <a href="#kategorier" className="rounded-lg border border-white/15 bg-white/[.03] px-6 py-3.5 font-bold text-white transition hover:border-white/30">
              Finn riktig del
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[470px] lg:block">
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_65%_35%,rgba(201,255,53,.12),transparent_30%),linear-gradient(145deg,#151a1b,#080a0b)] shadow-2xl shadow-black/60" />
          <div className="absolute left-[10%] top-[18%] h-56 w-56 rounded-full border-[20px] border-double border-zinc-500/70 shadow-[0_0_0_8px_#22282a]" />
          <div className="absolute right-[8%] top-[13%] h-64 w-64 rounded-full border-[10px] border-dashed border-zinc-300/60" />
          <div className="absolute bottom-[18%] left-[16%] h-5 w-[65%] rotate-6 rounded-full bg-[repeating-linear-gradient(90deg,#999_0_12px,#333_12px_18px)]" />
          <div className="absolute bottom-[25%] right-[10%] w-64 rotate-[18deg] rounded-full bg-gradient-to-b from-zinc-500 to-zinc-950 px-6 py-2 text-right text-3xl font-black italic text-zinc-200">
            XT
          </div>
          <div className="absolute bottom-6 left-7 rounded-full border border-[#c9ff35]/40 bg-black/40 px-4 py-2 text-xs tracking-[.16em] text-[#c9ff35]">
            DEMO • DRIVVERK
          </div>
        </div>
      </div>
    </section>
  );
}
