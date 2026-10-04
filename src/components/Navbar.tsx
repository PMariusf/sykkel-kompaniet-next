export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090a]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-8 px-5 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <span className="relative text-3xl font-black italic tracking-[-0.18em]">
            SK
            <span className="absolute -right-3 top-1 h-1.5 w-5 -rotate-45 bg-[#c9ff35]" />
          </span>
          <span className="flex flex-col leading-none">
            <strong className="tracking-[.15em]">SYKKEL</strong>
            <span className="mt-1 text-[9px] tracking-[.28em] text-zinc-400">KOMPANIET</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 text-sm text-zinc-300 lg:flex">
          <a className="text-[#c9ff35]" href="#">Hjem</a>
          <a className="transition hover:text-white" href="#kategorier">Sykkeldeler</a>
          <a className="transition hover:text-white" href="#produkter">Produkter</a>
          <a className="transition hover:text-white" href="#merker">Merker</a>
          <a className="transition hover:text-white" href="#kontakt">Kontakt</a>
        </nav>

        <button className="ml-auto rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-[#c9ff35]/50 hover:text-white lg:ml-0">
          Søk
        </button>
        <button aria-label="Handlekurv" className="rounded-full border border-white/10 p-2.5 text-sm">🛒</button>
      </div>
    </header>
  );
}
