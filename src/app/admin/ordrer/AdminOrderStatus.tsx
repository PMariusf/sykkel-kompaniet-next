"use client";

import { useState } from "react";

const labels: Record<string, string> = {
  new: "Ny",
  processing: "Behandles",
  shipped: "Sendt",
  completed: "Fullført",
  cancelled: "Kansellert",
};

export default function AdminOrderStatus({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status);
  const [loading, setLoading] = useState(false);

  async function updateStatus(next: string) {
    setValue(next);
    setLoading(true);
    const response = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setLoading(false);
    if (!response.ok) setValue(status);
  }

  return (
    <select
      value={value}
      disabled={loading}
      onChange={(event) => updateStatus(event.target.value)}
      className="rounded-md border border-white/10 bg-[#0b0f10] px-3 py-2 text-xs font-bold text-white outline-none focus:border-[#c9ff35]/50 disabled:opacity-50"
      aria-label="Ordrestatus"
    >
      {Object.entries(labels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
    </select>
  );
}
