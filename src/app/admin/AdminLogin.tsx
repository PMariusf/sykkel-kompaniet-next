"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setError(data?.error ?? "Kunne ikke logge inn.");
      setLoading(false);
      return;
    }

    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-[#070b0c] px-4 py-16 text-white">
      <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-[#0b0f10] p-6 shadow-2xl sm:p-8">
        <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">SYKKEL DELER CMS</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight">Admin</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Logg inn med en bruker som har fått CMS-tilgang i Supabase.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-zinc-300">E-post</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-md border border-white/10 bg-white/[.04] px-3 py-3 text-sm outline-none transition focus:border-[#c9ff35]/60"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-zinc-300">Passord</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-white/10 bg-white/[.04] px-3 py-3 text-sm outline-none transition focus:border-[#c9ff35]/60"
            />
          </label>

          {error && <p className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#c9ff35] px-5 py-3 text-sm font-black text-black transition hover:bg-[#d8ff68] disabled:opacity-50"
          >
            {loading ? "Logger inn..." : "Logg inn"}
          </button>
        </form>
      </div>
    </main>
  );
}
