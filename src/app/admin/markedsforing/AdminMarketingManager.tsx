"use client";

import { FormEvent, useState } from "react";

type Brand = { id: string; name: string; logo_url: string | null; website_url: string | null; sort_order: number; is_active: boolean };
type Campaign = { id: string; title: string; badge: string | null; description: string | null; image_url: string | null; cta_label: string | null; cta_href: string | null; is_active: boolean };
type Media = { id: string; file_name: string; url: string; alt_text: string | null; kind: string; created_at: string };

const input = "w-full rounded-md border border-white/10 bg-white/[.035] px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#c9ff35]/60";

export default function AdminMarketingManager({ brands, campaigns, media }: { brands: Brand[]; campaigns: Campaign[]; media: Media[] }) {
  const [loading, setLoading] = useState(false);

  async function addBrand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true);
    const form = event.currentTarget; const data = new FormData(form);
    const response = await fetch("/api/admin/brands", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), logo_url: data.get("logo_url"), website_url: data.get("website_url"), sort_order: Number(data.get("sort_order") || 0), is_active: true }) });
    setLoading(false); if (response.ok) { form.reset(); window.location.reload(); }
  }

  async function addCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true);
    const form = event.currentTarget; const data = new FormData(form);
    const response = await fetch("/api/admin/campaigns", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: data.get("title"), badge: data.get("badge"), description: data.get("description"), image_url: data.get("image_url"), cta_label: data.get("cta_label"), cta_href: data.get("cta_href"), is_active: true }) });
    setLoading(false); if (response.ok) { form.reset(); window.location.reload(); }
  }

  async function toggle(kind: "brands" | "campaigns", id: string, active: boolean) {
    await fetch(`/api/admin/${kind}/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_active: !active }) });
    window.location.reload();
  }

  async function remove(kind: "brands" | "campaigns", id: string) {
    if (!window.confirm("Slette denne oppføringen?")) return;
    await fetch(`/api/admin/${kind}/${id}`, { method: "DELETE" }); window.location.reload();
  }

  async function uploadMedia(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true);
    const form = event.currentTarget; const data = new FormData(form); data.set("folder", "library");
    const response = await fetch("/api/admin/media", { method: "POST", body: data });
    setLoading(false); if (response.ok) { form.reset(); window.location.reload(); }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-5">
        <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">MERKER</p>
        <h2 className="mt-2 text-xl font-black">Brands</h2>
        <form onSubmit={addBrand} className="mt-5 grid gap-3 sm:grid-cols-2">
          <input name="name" required placeholder="Merkenavn *" className={input} />
          <input name="sort_order" type="number" defaultValue="0" placeholder="Rekkefølge" className={input} />
          <input name="logo_url" placeholder="Logo-URL (valgfritt)" className={`${input} sm:col-span-2`} />
          <input name="website_url" placeholder="Nettside (valgfritt)" className={`${input} sm:col-span-2`} />
          <button disabled={loading} className="rounded-md bg-[#c9ff35] px-4 py-2.5 text-sm font-black text-black sm:col-span-2">Legg til merke</button>
        </form>
        <div className="mt-5 divide-y divide-white/10">
          {brands.map((brand) => <div key={brand.id} className="flex items-center justify-between gap-3 py-3"><div><p className="text-sm font-black">{brand.name}</p><p className="text-[10px] text-zinc-500">{brand.is_active ? "Synlig" : "Skjult"}</p></div><div className="flex gap-2"><button onClick={() => toggle("brands", brand.id, brand.is_active)} className="rounded border border-white/10 px-2 py-1 text-[10px]">{brand.is_active ? "Skjul" : "Vis"}</button><button onClick={() => remove("brands", brand.id)} className="rounded border border-red-500/20 px-2 py-1 text-[10px] text-red-300">Slett</button></div></div>)}
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-5">
        <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">KAMPANJER</p>
        <h2 className="mt-2 text-xl font-black">Tilbud og kampanjer</h2>
        <form onSubmit={addCampaign} className="mt-5 grid gap-3">
          <input name="title" required placeholder="Tittel *" className={input} />
          <input name="badge" placeholder="Badge, f.eks. TILBUD" className={input} />
          <textarea name="description" rows={3} placeholder="Kort beskrivelse" className={input} />
          <input name="image_url" placeholder="Bilde-URL" className={input} />
          <div className="grid gap-3 sm:grid-cols-2"><input name="cta_label" placeholder="Knappetekst" className={input} /><input name="cta_href" placeholder="Lenke" className={input} /></div>
          <button disabled={loading} className="rounded-md bg-[#c9ff35] px-4 py-2.5 text-sm font-black text-black">Legg til kampanje</button>
        </form>
        <div className="mt-5 divide-y divide-white/10">
          {campaigns.length === 0 && <p className="py-4 text-xs text-zinc-500">Ingen kampanjer ennå.</p>}
          {campaigns.map((campaign) => <div key={campaign.id} className="flex items-center justify-between gap-3 py-3"><div><p className="text-sm font-black">{campaign.title}</p><p className="text-[10px] text-zinc-500">{campaign.is_active ? "Aktiv" : "Skjult"}{campaign.badge ? ` · ${campaign.badge}` : ""}</p></div><div className="flex gap-2"><button onClick={() => toggle("campaigns", campaign.id, campaign.is_active)} className="rounded border border-white/10 px-2 py-1 text-[10px]">{campaign.is_active ? "Skjul" : "Vis"}</button><button onClick={() => remove("campaigns", campaign.id)} className="rounded border border-red-500/20 px-2 py-1 text-[10px] text-red-300">Slett</button></div></div>)}
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-5 xl:col-span-2">
        <p className="text-[10px] font-black tracking-[.24em] text-[#c9ff35]">MEDIA</p>
        <h2 className="mt-2 text-xl font-black">Media-bibliotek</h2>
        <form onSubmit={uploadMedia} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input name="file" type="file" accept="image/*" required className="flex-1 rounded-md border border-white/10 bg-white/[.035] px-3 py-2 text-xs" />
          <input name="altText" placeholder="Alt-tekst" className={`${input} sm:max-w-xs`} />
          <button disabled={loading} className="rounded-md bg-[#c9ff35] px-5 py-2.5 text-sm font-black text-black">Last opp</button>
        </form>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {media.map((item) => <button key={item.id} type="button" onClick={() => navigator.clipboard.writeText(item.url)} title="Klikk for å kopiere URL" className="overflow-hidden rounded-lg border border-white/10 bg-black/20 text-left"><img src={item.url} alt={item.alt_text || item.file_name} className="aspect-video w-full object-cover" /><div className="p-3"><p className="truncate text-xs font-bold">{item.file_name}</p><p className="mt-1 text-[10px] text-zinc-500">Klikk for å kopiere URL</p></div></button>)}
        </div>
      </section>
    </div>
  );
}
