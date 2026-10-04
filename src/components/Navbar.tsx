export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06090a]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[62px] max-w-[1420px] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex min-w-fit items-center gap-3" aria-label="Sykkel Kompaniet">
          <span className="relative text-3xl font-black italic tracking-[-0.18em] text-zinc-100">
            SK
            <span className="absolute -right-3 top-1 h-1.5 w-5 -rotate-45 bg-[#c9ff35]" />
          </span>
          <span className="flex flex-col leading-none">
            <strong className="text-sm tracking-[.18em] text-white sm:text-base">SYKKEL</strong>
            <span className="mt-1 text-[8px] tracking-[.34em] text-zinc-400">KOMPANIET</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 text-[13px] font-semibold text-zinc-300 lg:flex">
          <a className="border-b-2 border-[#c9ff35] pb-1 text-[#c9ff35]" href="#">Hjem</a>
          <a className="transition hover:text-white" href="#kategorier">Sykkeldeler⌄</a>
          <a className="transition hover:text-white" href="#merker">Merker⌄</a>
          <a className="transition hover:text-white" href="#produkter">Tilbud</a>
          <a className="transition hover:text-white" href="#kontakt">Kontakt</a>
        </nav>

        <div className="ml-auto hidden h-10 min-w-[310px] items-center rounded-lg border border-white/10 bg-white/[.035] px-3 text-[12px] text-zinc-500 md:flex lg:ml-4">
          <span className="mr-2 text-base text-zinc-300">⌕</span>
          <span>Søk etter produkter, merker eller deler ...</span>
        </div>

        <button aria-label="Konto" className="hidden h-10 w-10 items-center justify-center text-lg text-zinc-200 md:flex">♙</button>
        <button aria-label="Handlekurv" className="relative flex h-10 w-10 items-center justify-center text-lg text-zinc-100">
          🛒
          <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9ff35] px-1 text-[9px] font-black text-black">0</span>
        </button>
      </div>
    </header>
  );
}
