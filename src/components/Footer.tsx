export default function Footer() {
  return (
    <footer id="kontakt" className="border-t border-white/10 bg-[#050708]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <strong className="text-xl tracking-[.12em]">SYKKEL</strong>
          <p className="mt-1 text-xs tracking-[.25em] text-zinc-500">KOMPANIET</p>
          <p className="mt-5 max-w-xs text-sm leading-6 text-zinc-500">Demo for en fremtidig nettbutikk med fokus på sykkeldeler og komponenter.</p>
        </div>
        <div><h3 className="font-bold">Butikk</h3><p className="mt-4 text-sm text-zinc-500">Sykkeldeler</p><p className="mt-2 text-sm text-zinc-500">Merker</p><p className="mt-2 text-sm text-zinc-500">Tilbud</p></div>
        <div><h3 className="font-bold">Kundeservice</h3><p className="mt-4 text-sm text-zinc-500">Frakt og levering</p><p className="mt-2 text-sm text-zinc-500">Retur</p><p className="mt-2 text-sm text-zinc-500">Kontakt</p></div>
        <div><h3 className="font-bold">Kontakt</h3><p className="mt-4 text-sm text-zinc-500">Detaljer kommer når firmaet er klart.</p></div>
      </div>
    </footer>
  );
}
