"use client";

import { FormEvent, useState } from "react";

type Contact = {
  company_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  opening_hours: string | null;
};

export default function ContactForm({ contact }: { contact: Contact }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const input = "w-full rounded-md border border-white/10 bg-white/[.035] px-3 py-2.5 text-sm text-white outline-none focus:border-[#c9ff35]/60";

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(data.entries())),
    });
    setLoading(false);
    setMessage(response.ok ? "Kontaktinformasjonen er lagret." : "Kunne ikke lagre kontaktinformasjonen.");
  }

  return (
    <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
      <input name="company_name" defaultValue={contact.company_name ?? ""} placeholder="Firmanavn" className={`${input} sm:col-span-2`} />
      <input name="email" type="email" defaultValue={contact.email ?? ""} placeholder="E-post" className={input} />
      <input name="phone" defaultValue={contact.phone ?? ""} placeholder="Telefon" className={input} />
      <input name="address" defaultValue={contact.address ?? ""} placeholder="Adresse" className={`${input} sm:col-span-2`} />
      <input name="postal_code" defaultValue={contact.postal_code ?? ""} placeholder="Postnummer" className={input} />
      <input name="city" defaultValue={contact.city ?? ""} placeholder="Poststed" className={input} />
      <textarea name="opening_hours" defaultValue={contact.opening_hours ?? ""} placeholder="Åpningstider, f.eks. Man–fre 09:00–17:00" rows={4} className={`${input} sm:col-span-2`} />
      {message && <p className="text-xs text-zinc-300 sm:col-span-2">{message}</p>}
      <button disabled={loading} className="rounded-md bg-[#c9ff35] px-5 py-3 text-sm font-black text-black sm:col-span-2">{loading ? "Lagrer..." : "Lagre kontaktinfo"}</button>
    </form>
  );
}
