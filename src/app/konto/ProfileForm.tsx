"use client";

import { FormEvent, useState } from "react";

type Profile = {
  full_name?: string | null;
  phone?: string | null;
  address_line1?: string | null;
  postal_code?: string | null;
  city?: string | null;
  country?: string | null;
};

const inputClass =
  "w-full rounded-md border border-white/10 bg-white/[.04] px-3 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#c9ff35]/60";

export default function ProfileForm({ profile }: { profile: Profile | null }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/konto/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.get("fullName"),
        phone: form.get("phone"),
        addressLine1: form.get("addressLine1"),
        postalCode: form.get("postalCode"),
        city: form.get("city"),
        country: form.get("country"),
      }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setError(data?.error ?? "Kunne ikke lagre profilen.");
      setLoading(false);
      return;
    }

    setMessage("Profilen er lagret.");
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="mb-2 block text-xs font-bold text-zinc-300">Fullt navn</span>
        <input name="fullName" type="text" autoComplete="name" defaultValue={profile?.full_name ?? ""} className={inputClass} />
      </label>

      <label>
        <span className="mb-2 block text-xs font-bold text-zinc-300">Telefon</span>
        <input name="phone" type="tel" autoComplete="tel" defaultValue={profile?.phone ?? ""} className={inputClass} />
      </label>

      <label>
        <span className="mb-2 block text-xs font-bold text-zinc-300">Land</span>
        <input name="country" type="text" autoComplete="country-name" defaultValue={profile?.country ?? "Norge"} className={inputClass} />
      </label>

      <label className="sm:col-span-2">
        <span className="mb-2 block text-xs font-bold text-zinc-300">Adresse</span>
        <input name="addressLine1" type="text" autoComplete="street-address" defaultValue={profile?.address_line1 ?? ""} className={inputClass} />
      </label>

      <label>
        <span className="mb-2 block text-xs font-bold text-zinc-300">Postnummer</span>
        <input name="postalCode" type="text" inputMode="numeric" autoComplete="postal-code" defaultValue={profile?.postal_code ?? ""} className={inputClass} />
      </label>

      <label>
        <span className="mb-2 block text-xs font-bold text-zinc-300">Poststed</span>
        <input name="city" type="text" autoComplete="address-level2" defaultValue={profile?.city ?? ""} className={inputClass} />
      </label>

      {error && <p className="sm:col-span-2 rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</p>}
      {message && <p className="sm:col-span-2 rounded-md border border-[#c9ff35]/20 bg-[#c9ff35]/10 px-3 py-2 text-xs text-[#dfff83]">{message}</p>}

      <div className="sm:col-span-2">
        <button type="submit" disabled={loading} className="rounded-md bg-[#c9ff35] px-5 py-3 text-sm font-black text-black transition hover:bg-[#d8ff68] disabled:opacity-50">
          {loading ? "Lagrer..." : "Lagre profil"}
        </button>
      </div>
    </form>
  );
}
