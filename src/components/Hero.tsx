import Image from "next/image";

const trustItems = [
  ["▣", "Rask levering", "1–3 virkedager"],
  ["⬡", "Trygg handel", "Sikre betalingsløsninger"],
  ["◇", "Stort utvalg", "Kjente merkevarer"],
  ["☆", "Eksperthjelp", "Vi hjelper deg å velge"],
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-black">
      <Image
        src="/products/hero-image.png"
        alt="Sykkeldeler og drivverk"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/65 to-black/5" />
      <div className="absolute inset-y-0 left-0 -z-10 w-[55%] bg-black/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-[#06090a]/95 to-transparent" />

      <div className="mx-auto flex min-h-[520px] max-w-[1420px] items-center px-4 pb-28 pt-16 sm:px-6 lg:px-8">
        <div className="max-w-[620px]">
          <p className="mb-3 text-[11px] font-black tracking-[.34em] text-[#c9ff35] drop-shadow-[0_2px_8px_rgba(0,0,0,.45)] sm:text-xs">
            KVALITET GIR BEDRE TURER
          </p>

          <h1 className="text-[3.3rem] font-black leading-[.88] tracking-[-.055em] sm:text-6xl lg:text-[4.7rem]">
            <span className="bg-[linear-gradient(180deg,#ffffff_0%,#dcdcdc_38%,#8d8d8d_73%,#f4f4f4_100%)] bg-clip-text text-transparent drop-shadow-[0_4px_18px_rgba(0,0,0,.65)]">
              Deler til
            </span>
            <br />
            <span className="bg-[linear-gradient(180deg,#f4f4f4_0%,#cfcfcf_42%,#777777_78%,#d7d7d7_100%)] bg-clip-text text-transparent drop-shadow-[0_4px_18px_rgba(0,0,0,.65)]">
              sykkelen din
            </span>
          </h1>

          <p className="mt-5 max-w-[520px] text-base leading-6 text-zinc-200 sm:text-lg">
            Kvalitetsdeler for vei, terreng og hverdagssykling.
            <br className="hidden sm:block" /> Stort utvalg fra ledende merkevarer.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#produkter" className="rounded-md bg-[#c9ff35] px-6 py-3 text-sm font-black text-black shadow-[0_0_24px_rgba(201,255,53,.16)] transition hover:bg-[#d8ff68]">
              Se sykkeldeler <span className="ml-2">→</span>
            </a>
            <a href="#kategorier" className="rounded-md border border-white/35 bg-black/30 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-black/45">
              ⌕ <span className="ml-2">Finn riktig del</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/35 backdrop-blur-sm">
        <div className="mx-auto grid max-w-[1420px] grid-cols-2 gap-y-3 px-4 py-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustItems.map(([icon, title, text], index) => (
            <div key={title} className={`flex items-center gap-3 ${index > 0 ? "lg:border-l lg:border-white/10 lg:pl-6" : ""}`}>
              <span className="text-2xl text-[#c9ff35]">{icon}</span>
              <div>
                <p className="text-xs font-black text-white">{title}</p>
                <p className="mt-0.5 text-[10px] text-zinc-400">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
