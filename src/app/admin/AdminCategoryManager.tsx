"use client";

import { FormEvent, useState } from "react";

type Category = {
  id: string;
  name: string;
  description: string | null;
  image_path: string | null;
  sort_order: number;
  is_active: boolean;
};

export default function AdminCategoryManager({ categories }: { categories: Category[] }) {
  const [loading, setLoading] = useState(false);
  const input = "w-full rounded-md border border-white/10 bg-white/[.035] px-3 py-2.5 text-sm text-white outline-none focus:border-[#c9ff35]/60";

  async function createCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        description: data.get("description"),
        image_path: data.get("image_path"),
        sort_order: data.get("sort_order"),
      }),
    });
    setLoading(false);
    window.location.reload();
  }

  async function saveCategory(id: string, form: HTMLFormElement) {
    setLoading(true);
    const data = new FormData(form);
    await fetch(`/api/admin/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        description: data.get("description"),
        image_path: data.get("image_path"),
        sort_order: data.get("sort_order"),
        is_active: data.get("is_active") === "on",
      }),
    });
    setLoading(false);
    window.location.reload();
  }

  return (
    <div className="space-y-5">
      <form onSubmit={createCategory} className="grid gap-3 rounded-lg border border-white/10 bg-white/[.02] p-4 sm:grid-cols-2">
        <input name="name" required placeholder="Ny kategori" className={input} />
        <input name="sort_order" type="number" defaultValue={categories.length} placeholder="Rekkefølge" className={input} />
        <input name="image_path" placeholder="Bilde-URL / path" className={`${input} sm:col-span-2`} />
        <textarea name="description" placeholder="Beskrivelse" rows={2} className={`${input} sm:col-span-2`} />
        <button disabled={loading} className="rounded-md bg-[#c9ff35] px-4 py-2.5 text-sm font-black text-black sm:col-span-2">Legg til kategori</button>
      </form>

      <div className="space-y-3">
        {categories.map((category) => (
          <form key={category.id} onSubmit={(e) => { e.preventDefault(); saveCategory(category.id, e.currentTarget); }} className="grid gap-3 rounded-lg border border-white/10 p-4 sm:grid-cols-2">
            <input name="name" defaultValue={category.name} className={input} />
            <input name="sort_order" type="number" defaultValue={category.sort_order} className={input} />
            <input name="image_path" defaultValue={category.image_path ?? ""} placeholder="Bilde-URL / path" className={`${input} sm:col-span-2`} />
            <textarea name="description" defaultValue={category.description ?? ""} rows={2} className={`${input} sm:col-span-2`} />
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-300"><input name="is_active" type="checkbox" defaultChecked={category.is_active} className="accent-[#c9ff35]" /> Aktiv</label>
            <button disabled={loading} className="rounded-md border border-white/10 px-4 py-2 text-xs font-black hover:border-[#c9ff35]/40">Lagre kategori</button>
          </form>
        ))}
      </div>
    </div>
  );
}
