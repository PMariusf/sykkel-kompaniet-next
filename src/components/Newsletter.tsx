export default function Newsletter() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_80%_50%,rgba(201,255,53,.08),transparent_26%),linear-gradient(90deg,#101516,#090c0d)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-black tracking-[.22em] text-[#c9ff35]">NYHETSBREV</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white">Få de beste tilbudene først</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">Meld deg på for tilbud, nyheter og tips rett i innboksen.</p>
        </div>
        <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row" action="#">
          <input
            type="email"
            placeholder="Din e-postadresse"
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/35 px-4 py-3.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#c9ff35]/45"
          />
          <button type="submit" className="rounded-lg bg-[#c9ff35] px-6 py-3.5 text-sm font-black text-black transition hover:bg-[#d8ff68]">
            Meld meg på
          </button>
        </form>
      </div>
    </section>
  );
}
