"use client";

import { FormEvent, useState } from "react";

export default function KontoClient() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/konto/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.get("fullName"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setError(data?.error ?? "Noe gikk galt.");
      setLoading(false);
      return;
    }

    if (mode === "signup" && data?.needsConfirmation) {
      setMessage("Kontoen er opprettet. Sjekk e-posten din og bekreft adressen før du logger inn.");
      setLoading(false);
      return;
    }

    window.location.reload();
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-[#0b0f10] p-6 shadow-2xl sm:p-8">
      <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">MIN KONTO</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight">
        {mode === "login" ? "Logg inn" : "Opprett konto"}
      </h1>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {mode === "login"
          ? "Logg inn for å samle kundeinformasjon og gjøre fremtidige kjøp enklere."
          : "Opprett en kundekonto hos Sykkel Deler."}
      </p>

      <form onSubmit={submit} className="mt-7 space-y-4">
        {mode === "signup" && (
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-zinc-300">Navn</span>
            <input
              name="fullName"
              type="text"
              required
              autoComplete="name"
              className="w-full rounded-md border border-white/10 bg-white/[.04] px-3 py-3 text-sm text-white outline-none transition focus:border-[#c9ff35]/60"
            />
          </label>
        )}

        <label className="block">
          <span className="mb-2 block text-xs font-bold text-zinc-300">E-post</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-md border border-white/10 bg-white/[.04] px-3 py-3 text-sm text-white outline-none transition focus:border-[#c9ff35]/60"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold text-zinc-300">Passord</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="w-full rounded-md border border-white/10 bg-white/[.04] px-3 py-3 text-sm text-white outline-none transition focus:border-[#c9ff35]/60"
          />
        </label>

        {error && <p className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</p>}
        {message && <p className="rounded-md border border-[#c9ff35]/20 bg-[#c9ff35]/10 px-3 py-2 text-xs text-[#dfff83]">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#c9ff35] px-5 py-3 text-sm font-black text-black transition hover:bg-[#d8ff68] disabled:opacity-50"
        >
          {loading ? "Vent litt..." : mode === "login" ? "Logg inn" : "Opprett konto"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "signup" : "login");
          setError("");
          setMessage("");
        }}
        className="mt-5 w-full text-center text-xs font-bold text-[#c9ff35]"
      >
        {mode === "login" ? "Ny kunde? Opprett konto" : "Har du konto? Logg inn"}
      </button>
    </div>
  );
}
