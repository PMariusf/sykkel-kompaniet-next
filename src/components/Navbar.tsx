import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06090a]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1420px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#" aria-label="Sykkel Deler" className="shrink-0">
          <Logo />
        </a>

        <nav className="ml-auto hidden items-center gap-7 text-[13px] font-semibold text-zinc-300 lg:flex">
          <a className="relative text-[#c9ff35] after:absolute after:left-0 after:-bottom-[1.35rem] after:h-[2px] after:w-full after:bg-[#c9ff35] after:content-['']" href="#">Hjem</a>
          <a className="transition hover:text-white" href="#kategorier">Sykkeldeler⌄</a>
          <a className="transition hover:text-white" href="#merker">Merker⌄</a>
          <a className="transition hover:text-white" href="#produkter">Tilbud</a>
          <a className="transition hover:text-white" href="#kontakt">Kontakt</a>
        </nav>

        <div className="ml-auto hidden h-10 min-w-[330px] items-center rounded-lg border border-white/10 bg-white/[.035] px-3 text-[12px] text-zinc-500 md:flex lg:ml-4">
          <span className="mr-2 text-base text-zinc-300">⌕</span>
          <span className="truncate">Søk etter produkter, merker eller deler ...</span>
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
