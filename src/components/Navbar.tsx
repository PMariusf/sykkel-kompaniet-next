export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090a]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-5 lg:px-8">
        <a href="#" className="flex min-w-fit items-center gap-3" aria-label="Sykkel Kompaniet">
          <span className="relative text-3xl font-black italic tracking-[-0.18em] text-zinc-100">
            SK
            <span className="absolute -right-3 top-1 h-1.5 w-5 -rotate-45 bg-[#c9ff35]" />
          </span>
          <span className="flex flex-col leading-none">
            <strong className="tracking-[.16em] text-white">SYKKEL</strong>
            <span className="mt-1 text-[9px] tracking-[.3em] text-zinc-500">KOMPANIET</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 text-sm text-zinc-300 lg:flex">
          <a className="text-[#c9ff35]" href="#">Hjem</a>
          <a className="transition hover:text-white" href="#kategorier">Sykkeldeler</a>
          <a className="transition hover:text-white" href="#produkter">Produkter</a>
          <a className="transition hover:text-white" href="#merker">Merker</a>
          <a className="transition hover:text-white" href="#kontakt">Kontakt</a>
        </nav>

        <div className="ml-auto hidden items-center rounded-lg border border-white/10 bg-white/[.03] px-3 py-2 text-sm text-zinc-500 md:flex lg:ml-3">
          <span className="mr-2">⌕</span>
          <span className="pr-8">Søk etter produkter...</span>
        </div>

        <button aria-label="Konto" className="hidden rounded-full border border-white/10 p-2.5 text-sm text-zinc-300 transition hover:border-white/20 md:block">◯</button>
        <button aria-label="Handlekurv" className="relative rounded-full border border-white/10 p-2.5 text-sm text-zinc-200 transition hover:border-[#c9ff35]/40">
          🛒
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9ff35] px-1 text-[9px] font-black text-black">0</span>
        </button>
      </div>
    </header>
  );
}
