"use client";

import { FormEvent, useState } from "react";

type CategoryOption = { id: string; name: string };

export default function AdminProductForm({ categories }: { categories: CategoryOption[] }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"), brand: data.get("brand"), sku: data.get("sku"), ean: data.get("ean"),
        price_nok: data.get("price_nok"), compare_at_price_nok: data.get("compare_at_price_nok"), badge: data.get("badge"),
        category_id: data.get("category_id"), supplier: data.get("supplier"), stock_quantity: data.get("stock_quantity"),
        stock_status: data.get("stock_status"), warehouse_location: data.get("warehouse_location"), image_path: data.get("image_path"),
        description: data.get("description"), compatibility: data.get("compatibility"), seo_title: data.get("seo_title"),
        seo_description: data.get("seo_description"), og_image_url: data.get("og_image_url"),
        is_featured: data.get("is_featured") === "on", is_published: data.get("is_published") === "on",
      }),
    });

    const result = await response.json().catch(() => null);
    if (!response.ok) {
      setMessage(result?.error ?? "Kunne ikke lagre produktet.");
      setLoading(false);
      return;
    }

    form.reset();
    setMessage("Produktet er lagret.");
    setLoading(false);
    window.location.reload();
  }

  const inputClass = "w-full rounded-md border border-white/10 bg-white/[.035] px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#c9ff35]/60";

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
      <input name="name" required placeholder="Produktnavn *" className={`${inputClass} sm:col-span-2`} />
      <input name="brand" placeholder="Merke" className={inputClass} />
      <input name="supplier" placeholder="Leverandør" className={inputClass} />
      <input name="sku" placeholder="SKU / varenummer" className={inputClass} />
      <input name="ean" placeholder="EAN" className={inputClass} />
      <input name="price_nok" type="number" min="0" step="0.01" placeholder="Pris NOK" className={inputClass} />
      <input name="compare_at_price_nok" type="number" min="0" step="0.01" placeholder="Førpris NOK" className={inputClass} />
      <select name="badge" defaultValue="" className={inputClass}>
        <option value="">Ingen badge</option><option value="Tilbud">Tilbud</option><option value="Nyhet">Nyhet</option><option value="Bestselger">Bestselger</option><option value="Populær">Populær</option>
      </select>
      <select name="category_id" className={inputClass} defaultValue="">
        <option value="">Ingen kategori</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select>
      <input name="stock_quantity" type="number" min="0" placeholder="Lagerantall" className={inputClass} />
      <select name="stock_status" defaultValue="unknown" className={inputClass}>
        <option value="unknown">Lagerstatus ukjent</option><option value="in_stock">På lager</option><option value="low_stock">Få på lager</option><option value="out_of_stock">Utsolgt</option><option value="backorder">Restordre</option>
      </select>
      <input name="warehouse_location" defaultValue="Arna" placeholder="Lagerlokasjon" className={inputClass} />
      <input name="image_path" placeholder="Hovedbilde URL / path" className={`${inputClass} sm:col-span-2`} />
      <textarea name="description" placeholder="Produktbeskrivelse" rows={4} className={`${inputClass} sm:col-span-2`} />
      <textarea name="compatibility" placeholder="Kompatibilitet" rows={3} className={`${inputClass} sm:col-span-2`} />

      <div className="sm:col-span-2 mt-2 border-t border-white/10 pt-4">
        <p className="mb-3 text-[10px] font-black tracking-[.2em] text-[#c9ff35]">SEO</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="seo_title" placeholder="SEO title" className={`${inputClass} sm:col-span-2`} />
          <textarea name="seo_description" placeholder="Meta description" rows={3} className={`${inputClass} sm:col-span-2`} />
          <input name="og_image_url" placeholder="Open Graph-bilde URL" className={`${inputClass} sm:col-span-2`} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-bold text-zinc-300"><input name="is_featured" type="checkbox" className="accent-[#c9ff35]" /> Utvalgt på forsiden</label>
      <label className="flex items-center gap-2 text-sm font-bold text-zinc-300"><input name="is_published" type="checkbox" className="accent-[#c9ff35]" /> Publiser med en gang</label>
      {message && <p className="text-xs text-zinc-300 sm:col-span-2">{message}</p>}
      <button disabled={loading} className="rounded-md bg-[#c9ff35] px-5 py-3 text-sm font-black text-black disabled:opacity-50 sm:col-span-2">{loading ? "Lagrer..." : "Legg til produkt"}</button>
    </form>
  );
}
