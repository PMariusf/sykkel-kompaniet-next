"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const response = await fetch(mode === "login" ? "/api/admin/login" : "/api/admin/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setError(data?.error ?? (mode === "login" ? "Kunne ikke logge inn." : "Kunne ikke opprette bruker."));
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      setMessage(data?.message ?? "Brukeren er opprettet. Du kan logge inn nå.");
      setMode("login");
      setLoading(false);
      return;
    }

    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-[#070b0c] px-4 py-16 text-white">
      <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-[#0b0f10] p-6 shadow-2xl sm:p-8">
        <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">SYKKEL DELER CMS</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight">
          {mode === "login" ? "Admin" : "Opprett adminbruker"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {mode === "login"
            ? "Logg inn med en bruker som har fått CMS-tilgang i Supabase."
            : "Førstegangsoppsett for en e-postadresse som er invitert som CMS-admin."}
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-zinc-300">E-post</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue="marius28@live.no"
              className="w-full rounded-md border border-white/10 bg-white/[.04] px-3 py-3 text-sm outline-none transition focus:border-[#c9ff35]/60"
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
              className="w-full rounded-md border border-white/10 bg-white/[.04] px-3 py-3 text-sm outline-none transition focus:border-[#c9ff35]/60"
            />
          </label>

          {error && <p className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</p>}
          {message && <p className="rounded-md border border-[#c9ff35]/20 bg-[#c9ff35]/10 px-3 py-2 text-xs text-[#dfff83]">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#c9ff35] px-5 py-3 text-sm font-black text-black transition hover:bg-[#d8ff68] disabled:opacity-50"
          >
            {loading
              ? mode === "login" ? "Logger inn..." : "Oppretter..."
              : mode === "login" ? "Logg inn" : "Opprett bruker"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode((current) => current === "login" ? "signup" : "login");
            setError("");
            setMessage("");
          }}
          className="mt-5 w-full text-center text-xs font-bold text-zinc-500 transition hover:text-white"
        >
          {mode === "login" ? "Første gang? Opprett adminbruker" : "Har du allerede bruker? Logg inn"}
        </button>
      </div>
    </main>
  );
}
