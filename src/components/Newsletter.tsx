import Image from "next/image";

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden border-y border-white/10">
      <Image
        src="/products/hero-bottom.png"
        alt="Terrengsyklist i fjellandskap"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

      <div className="relative mx-auto flex min-h-[260px] max-w-7xl flex-col gap-8 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-black tracking-[.22em] text-[#c9ff35]">NYHETSBREV</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Få de beste tilbudene først</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-300">
            Meld deg på for tilbud, nyheter og tips rett i innboksen.
          </p>
        </div>

        <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row" action="#">
          <label htmlFor="newsletter-email" className="sr-only">
            E-postadresse
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Din e-postadresse"
            className="min-w-0 flex-1 rounded-lg border border-white/20 bg-black/55 px-4 py-3.5 text-sm text-white outline-none backdrop-blur-sm placeholder:text-zinc-400 focus:border-[#c9ff35]/70"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#c9ff35] px-6 py-3.5 text-sm font-black text-black transition hover:bg-[#d8ff68]"
          >
            Meld meg på
          </button>
        </form>
      </div>
    </section>
  );
}
