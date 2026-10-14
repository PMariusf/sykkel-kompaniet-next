"use client";

import { FormEvent, useState } from "react";

type SiteContent = {
  key: string;
  eyebrow: string | null;
  headline: string | null;
  subheadline: string | null;
  body: string | null;
  primary_cta_label: string | null;
  primary_cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  image_url: string | null;
  image_alt: string | null;
};

type TeamMember = {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  image_url: string | null;
  image_alt: string | null;
  sort_order: number;
  is_active: boolean;
};

const inputClass = "w-full rounded-md border border-white/10 bg-white/[.035] px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#c9ff35]/60";

async function uploadImage(file: File, folder: string) {
  const data = new FormData();
  data.append("file", file);
  data.append("folder", folder);
  const response = await fetch("/api/admin/media", { method: "POST", body: data });
  const result = await response.json().catch(() => null);
  if (!response.ok) throw new Error(result?.error ?? "Kunne ikke laste opp bildet.");
  return result.url as string;
}

export default function AdminContentManager({ hero, team }: { hero: SiteContent; team: TeamMember[] }) {
  const [heroLoading, setHeroLoading] = useState(false);
  const [heroMessage, setHeroMessage] = useState("");
  const [heroImage, setHeroImage] = useState(hero.image_url ?? "");
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamMessage, setTeamMessage] = useState("");
  const [teamImage, setTeamImage] = useState("");

  async function saveHero(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHeroLoading(true);
    setHeroMessage("");
    try {
      const form = new FormData(event.currentTarget);
      const file = form.get("hero_file");
      let imageUrl = heroImage;
      if (file instanceof File && file.size > 0) imageUrl = await uploadImage(file, "hero");

      const response = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "home_hero",
          eyebrow: form.get("eyebrow"),
          headline: form.get("headline"),
          subheadline: form.get("subheadline"),
          primary_cta_label: form.get("primary_cta_label"),
          primary_cta_href: form.get("primary_cta_href"),
          secondary_cta_label: form.get("secondary_cta_label"),
          secondary_cta_href: form.get("secondary_cta_href"),
          image_url: imageUrl,
          image_alt: form.get("image_alt"),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error ?? "Kunne ikke lagre hero-innholdet.");
      setHeroImage(imageUrl);
      setHeroMessage("Forsiden er oppdatert.");
    } catch (error) {
      setHeroMessage(error instanceof Error ? error.message : "Noe gikk galt.");
    } finally {
      setHeroLoading(false);
    }
  }

  async function addTeamMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTeamLoading(true);
    setTeamMessage("");
    try {
      const formEl = event.currentTarget;
      const form = new FormData(formEl);
      const file = form.get("team_file");
      let imageUrl = teamImage;
      if (file instanceof File && file.size > 0) imageUrl = await uploadImage(file, "team");

      const response = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          role: form.get("role"),
          bio: form.get("bio"),
          email: form.get("email"),
          phone: form.get("phone"),
          image_url: imageUrl,
          image_alt: form.get("image_alt") || form.get("name"),
          sort_order: form.get("sort_order"),
          is_active: true,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error ?? "Kunne ikke legge til medarbeider.");
      formEl.reset();
      setTeamImage("");
      setTeamMessage("Medarbeideren er lagt til.");
      window.location.reload();
    } catch (error) {
      setTeamMessage(error instanceof Error ? error.message : "Noe gikk galt.");
      setTeamLoading(false);
    }
  }

  async function toggleMember(member: TeamMember) {
    await fetch("/api/admin/team", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: member.id, is_active: !member.is_active }),
    });
    window.location.reload();
  }

  async function deleteMember(id: string) {
    if (!window.confirm("Slette denne medarbeideren?")) return;
    await fetch(`/api/admin/team?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
        <p className="text-[10px] font-black tracking-[.26em] text-[#c9ff35]">FORSIDE / HERO</p>
        <h2 className="mt-2 text-xl font-black">Headlines, knapper og bilde</h2>
        <p className="mt-2 text-xs leading-5 text-zinc-500">Endringer her vises direkte i toppen av forsiden.</p>

        <form onSubmit={saveHero} className="mt-5 grid gap-3">
          <input name="eyebrow" defaultValue={hero.eyebrow ?? ""} placeholder="Liten overskrift" className={inputClass} />
          <input name="headline" defaultValue={hero.headline ?? ""} placeholder="Hovedoverskrift" className={inputClass} />
          <textarea name="subheadline" defaultValue={hero.subheadline ?? ""} rows={3} placeholder="Undertekst" className={inputClass} />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="primary_cta_label" defaultValue={hero.primary_cta_label ?? ""} placeholder="Primær knapp" className={inputClass} />
            <input name="primary_cta_href" defaultValue={hero.primary_cta_href ?? ""} placeholder="#produkter" className={inputClass} />
            <input name="secondary_cta_label" defaultValue={hero.secondary_cta_label ?? ""} placeholder="Sekundær knapp" className={inputClass} />
            <input name="secondary_cta_href" defaultValue={hero.secondary_cta_href ?? ""} placeholder="#kategorier" className={inputClass} />
          </div>
          <input name="image_alt" defaultValue={hero.image_alt ?? ""} placeholder="Bildetekst / alt-tekst" className={inputClass} />
          <div className="rounded-lg border border-dashed border-white/15 bg-black/20 p-4">
            <p className="text-xs font-black text-white">Bytt hero-bilde</p>
            <input name="hero_file" type="file" accept="image/*" className="mt-3 block w-full text-xs text-zinc-400 file:mr-3 file:rounded-md file:border-0 file:bg-[#c9ff35] file:px-3 file:py-2 file:font-black file:text-black" />
            <p className="mt-2 break-all text-[10px] text-zinc-600">Nåværende: {heroImage || "Ingen"}</p>
          </div>
          {heroMessage && <p className="text-xs text-zinc-300">{heroMessage}</p>}
          <button disabled={heroLoading} className="rounded-md bg-[#c9ff35] px-5 py-3 text-sm font-black text-black disabled:opacity-50">
            {heroLoading ? "Lagrer..." : "Lagre forside"}
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
        <p className="text-[10px] font-black tracking-[.26em] text-[#c9ff35]">TEAM / ARBEIDERE</p>
        <h2 className="mt-2 text-xl font-black">Legg til medarbeider</h2>
        <p className="mt-2 text-xs leading-5 text-zinc-500">Navn, rolle, bilde, kontaktinfo og kort presentasjon.</p>

        <form onSubmit={addTeamMember} className="mt-5 grid gap-3 sm:grid-cols-2">
          <input name="name" required placeholder="Navn *" className={inputClass} />
          <input name="role" placeholder="Rolle / stilling" className={inputClass} />
          <input name="email" type="email" placeholder="E-post" className={inputClass} />
          <input name="phone" placeholder="Telefon" className={inputClass} />
          <input name="sort_order" type="number" defaultValue="0" placeholder="Rekkefølge" className={inputClass} />
          <input name="image_alt" placeholder="Alt-tekst bilde" className={inputClass} />
          <textarea name="bio" rows={4} placeholder="Kort presentasjon" className={`${inputClass} sm:col-span-2`} />
          <div className="rounded-lg border border-dashed border-white/15 bg-black/20 p-4 sm:col-span-2">
            <p className="text-xs font-black text-white">Profilbilde</p>
            <input name="team_file" type="file" accept="image/*" className="mt-3 block w-full text-xs text-zinc-400 file:mr-3 file:rounded-md file:border-0 file:bg-[#c9ff35] file:px-3 file:py-2 file:font-black file:text-black" />
          </div>
          {teamMessage && <p className="text-xs text-zinc-300 sm:col-span-2">{teamMessage}</p>}
          <button disabled={teamLoading} className="rounded-md bg-[#c9ff35] px-5 py-3 text-sm font-black text-black disabled:opacity-50 sm:col-span-2">
            {teamLoading ? "Lagrer..." : "Legg til medarbeider"}
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-white/10 bg-[#0b0f10] p-5 sm:p-6 xl:col-span-2">
        <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] font-black tracking-[.26em] text-[#c9ff35]">MEDARBEIDERE</p>
            <h2 className="mt-2 text-xl font-black">Teamoversikt</h2>
          </div>
          <span className="text-xs text-zinc-500">{team.length} totalt</span>
        </div>
        {team.length === 0 ? (
          <p className="py-10 text-center text-sm text-zinc-500">Ingen medarbeidere lagt til ennå.</p>
        ) : (
          <div className="divide-y divide-white/10">
            {team.map((member) => (
              <article key={member.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-white">{member.name}</h3>
                    <span className={`rounded-full px-2 py-1 text-[9px] font-black ${member.is_active ? "bg-[#c9ff35]/15 text-[#c9ff35]" : "bg-white/5 text-zinc-500"}`}>
                      {member.is_active ? "SYNLIG" : "SKJULT"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">{member.role || "Ingen rolle satt"}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => toggleMember(member)} className="rounded-md border border-white/10 px-3 py-2 text-[11px] font-bold text-zinc-200">
                    {member.is_active ? "Skjul" : "Vis"}
                  </button>
                  <button type="button" onClick={() => deleteMember(member.id)} className="rounded-md border border-red-500/20 px-3 py-2 text-[11px] font-bold text-red-300">Slett</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
