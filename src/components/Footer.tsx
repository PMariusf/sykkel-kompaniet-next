export default function Footer() {
  return (
    <footer id="kontakt" className="bg-[#050708]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative text-3xl font-black italic tracking-[-0.18em] text-zinc-100">
              SK
              <span className="absolute -right-3 top-1 h-1.5 w-5 -rotate-45 bg-[#c9ff35]" />
            </span>
            <span className="flex flex-col leading-none">
              <strong className="tracking-[.16em] text-white">SYKKEL</strong>
              <span className="mt-1 text-[9px] tracking-[.3em] text-zinc-500">KOMPANIET</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-500">
            Demo av en fremtidig nettbutikk med fokus på sykkeldeler, tydelig lagerstatus og enkel handel.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">Kundeservice</h3>
          <div className="mt-4 space-y-2 text-sm text-zinc-500">
            <p>Ofte stilte spørsmål</p><p>Frakt og levering</p><p>Retur og reklamasjon</p><p>Kontakt oss</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Informasjon</h3>
          <div className="mt-4 space-y-2 text-sm text-zinc-500">
            <p>Om oss</p><p>Vilkår og betingelser</p><p>Personvern</p><p>Cookies</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Kontakt</h3>
          <div className="mt-4 space-y-2 text-sm leading-6 text-zinc-500">
            <p>Sykkel Kompaniet</p>
            <p>Bedriftsdetaljer kommer når firmaet er klart.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-zinc-600">© Sykkel Kompaniet — demo</div>
    </footer>
  );
}
