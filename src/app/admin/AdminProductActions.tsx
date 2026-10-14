"use client";

import { useState } from "react";

export default function AdminProductActions({ id, published }: { id: string; published: boolean }) {
  const [loading, setLoading] = useState(false);

  async function updatePublished() {
    setLoading(true);
    await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !published }),
    });
    window.location.reload();
  }

  async function removeProduct() {
    if (!window.confirm("Slette dette produktet?")) return;
    setLoading(true);
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={loading}
        onClick={updatePublished}
        className="rounded-md border border-white/10 px-3 py-2 text-[11px] font-bold text-zinc-200 hover:border-[#c9ff35]/40 disabled:opacity-50"
      >
        {published ? "Sett som utkast" : "Publiser"}
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={removeProduct}
        className="rounded-md border border-red-500/20 px-3 py-2 text-[11px] font-bold text-red-300 hover:border-red-400/40 disabled:opacity-50"
      >
        Slett
      </button>
    </div>
  );
}
