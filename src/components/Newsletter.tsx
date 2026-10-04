import Image from "next/image";

export default function Newsletter() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-black">
      <Image
        src="/products/hero-bottom.png"
        alt="Syklist i fjellandskap"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />

      <div className="mx-auto flex min-h-[120px] max-w-[1420px] flex-col justify-center gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-2xl font-black tracking-tight text-white">Få de beste tilbudene først</h2>
          <p className="mt-1 max-w-lg text-sm leading-5 text-zinc-200">
            Meld deg på vårt nyhetsbrev og få eksklusive tilbud, nyheter og tips rett i innboksen.
          </p>
        </div>

        <form className="flex w-full max-w-lg overflow-hidden rounded-md border border-white/20 bg-black/45 backdrop-blur-sm" action="#">
          <label htmlFor="newsletter-email" className="sr-only">Din e-postadresse</label>
          <div className="flex min-w-0 flex-1 items-center px-4">
            <span className="mr-2 text-zinc-300">✉</span>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Din e-postadresse"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-zinc-400"
            />
          </div>
          <button type="submit" className="bg-[#c9ff35] px-6 text-sm font-black text-black transition hover:bg-[#d8ff68]">
            Meld meg på
          </button>
        </form>
      </div>
    </section>
  );
}
