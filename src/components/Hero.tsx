import Image from "next/image";

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

      <div className="absolute inset-0 -z-10 bg-black/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/80 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#07090a] to-transparent" />

      <div className="mx-auto flex min-h-[640px] max-w-7xl items-center px-5 py-24 lg:min-h-[720px] lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-black tracking-[.24em] text-[#c9ff35] sm:text-sm">
            KVALITET GIR BEDRE TURER
          </p>

          <h1 className="text-5xl font-black leading-[.92] tracking-[-.055em] text-white sm:text-6xl lg:text-[5.8rem]">
            Deler til
            <br />
            <span className="text-zinc-300">sykkelen din</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
            Kvalitetsdeler for vei, terreng og hverdagssykling. Stort utvalg fra ledende merkevarer.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#produkter"
              className="rounded-lg bg-[#c9ff35] px-6 py-3.5 font-black text-black transition hover:bg-[#d8ff68]"
            >
              Se sykkeldeler →
            </a>
            <a
              href="#kategorier"
              className="rounded-lg border border-white/20 bg-black/35 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-black/50"
            >
              Finn riktig del
            </a>
          </div>

          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ["Rask levering", "1–3 virkedager"],
              ["Trygg handel", "Sikre betalingsløsninger"],
              ["Stort utvalg", "Kjente merkevarer"],
              ["Eksperthjelp", "Vi hjelper deg å velge"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-black/35 p-4 backdrop-blur-sm">
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="mt-1 text-xs leading-5 text-zinc-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
