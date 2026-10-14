"use client";

type DemoPaymentPanelProps = {
  method: "vipps" | "card" | "klarna";
  total: number;
};

function money(value: number) {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DemoPaymentPanel({ method, total }: DemoPaymentPanelProps) {
  if (method === "vipps") {
    return (
      <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black text-white">Vipps demo</p>
            <p className="mt-1 text-xs text-zinc-500">Ingen forespørsel sendes til Vipps.</p>
          </div>
          <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-black text-zinc-300">DEMO</span>
        </div>
        <div className="mt-4 rounded-md border border-white/10 bg-white/[.025] p-4">
          <p className="text-[10px] font-black tracking-[.16em] text-zinc-500">BELØP</p>
          <p className="mt-1 text-2xl font-black text-white">{money(total)}</p>
          <p className="mt-3 text-xs leading-5 text-zinc-400">Ved ekte integrasjon opprettes betalingen på serveren og kunden godkjenner i Vipps.</p>
        </div>
      </div>
    );
  }

  if (method === "card") {
    return (
      <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black text-white">Kortbetaling demo</p>
            <p className="mt-1 text-xs text-zinc-500">Ingen kortdata samles inn eller lagres.</p>
          </div>
          <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-black text-zinc-300">TESTVISNING</span>
        </div>
        <div className="mt-4 grid gap-3 rounded-md border border-white/10 bg-white/[.025] p-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <p className="text-[10px] font-black tracking-[.16em] text-zinc-500">DEMO-KORTNUMMER</p>
            <p className="mt-1 font-mono text-sm text-zinc-200">4242 4242 4242 4242</p>
          </div>
          <div><p className="text-[10px] font-black text-zinc-500">UTLØP</p><p className="mt-1 font-mono text-sm text-zinc-200">12/34</p></div>
          <div><p className="text-[10px] font-black text-zinc-500">CVC</p><p className="mt-1 font-mono text-sm text-zinc-200">123</p></div>
        </div>
        <p className="mt-3 text-[10px] leading-4 text-amber-200/80">Bruk aldri ekte kortinformasjon i denne demoen.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-white">Klarna demo</p>
          <p className="mt-1 text-xs text-zinc-500">Ingen kredittsjekk eller Klarna-forespørsel gjennomføres.</p>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-black text-zinc-300">DEMO</span>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {["Betal nå", "Betal senere", "Del opp"].map((label, index) => (
          <div key={label} className={`rounded-md border p-3 ${index === 1 ? "border-[#c9ff35]/35 bg-[#c9ff35]/[.04]" : "border-white/10 bg-white/[.02]"}`}>
            <p className="text-xs font-black text-white">{label}</p>
            <p className="mt-1 text-[10px] leading-4 text-zinc-500">Kun visuell demo</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-md border border-white/10 bg-white/[.025] px-4 py-3">
        <span className="text-xs text-zinc-400">Demo-beløp</span>
        <span className="text-sm font-black text-white">{money(total)}</span>
      </div>
    </div>
  );
}
