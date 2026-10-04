export default function Footer() {
  return (
    <footer id="kontakt" className="bg-[#050809]">
      <div className="mx-auto grid max-w-[1420px] gap-8 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.35fr_.9fr_.9fr_1.1fr] lg:px-8">
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
          <p className="mt-4 max-w-[290px] text-[11px] leading-5 text-zinc-400">
            Sykkel Kompaniet er din spesialist på sykkeldeler. Vi tilbyr kvalitetsdeler fra ledende merkevarer, for vei, terreng og hverdagssykling.
          </p>
          <div className="mt-4 flex gap-4 text-sm text-zinc-300"><span>●</span><span>◎</span><span>▶</span></div>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">Kundeservice</h3>
          <div className="mt-3 space-y-1.5 text-[11px] text-zinc-400">
            <p>Ofte stilte spørsmål</p><p>Frakt og levering</p><p>Retur og reklamasjon</p><p>Betalingsalternativer</p><p>Kontakt oss</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">Informasjon</h3>
          <div className="mt-3 space-y-1.5 text-[11px] text-zinc-400">
            <p>Om oss</p><p>Vilkår og betingelser</p><p>Personvern</p><p>Cookies</p><p>Størrelsesguide</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">Kontakt</h3>
          <div className="mt-3 space-y-2 text-[11px] leading-5 text-zinc-400">
            <p>⌖ Sykkel Kompaniet AS</p>
            <p>☎ Kontaktinformasjon kommer</p>
            <p>✉ post@sykkelkompaniet.no</p>
            <p>◷ Man–fre 09:00–17:00</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
