import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-[#050809]">
      <div className="mx-auto grid max-w-[1420px] gap-8 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.35fr_.9fr_.9fr_1.1fr] lg:px-8">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-[290px] text-[11px] leading-5 text-zinc-400">
            Sykkel Deler er din spesialist på sykkeldeler. Vi tilbyr kvalitetsdeler for vei, terreng og hverdagssykling.
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
            <p>⌖ Sykkel Deler</p>
            <p>☎ Kontaktinformasjon kommer</p>
            <p>✉ post@sykkeldeler.no</p>
            <p>◷ Man–fre 09:00–17:00</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
