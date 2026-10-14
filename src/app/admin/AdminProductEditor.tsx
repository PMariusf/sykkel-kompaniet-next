"use client";

import { FormEvent, useState } from "react";

type Category = { id: string; name: string };
type Product = {
  id: string;
  name: string;
  brand: string | null;
  sku: string | null;
  ean: string | null;
  price_nok: number | null;
  category_id: string | null;
  supplier: string | null;
  description: string | null;
  compatibility: string | null;
  image_path: string | null;
  stock_quantity: number | null;
  stock_status: string;
  warehouse_location: string;
  is_published: boolean;
};

export default function AdminProductEditor({ product, categories }: { product: Product; categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const input = "w-full rounded-md border border-white/10 bg-white/[.035] px-3 py-2.5 text-sm text-white outline-none focus:border-[#c9ff35]/60";

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        brand: data.get("brand") || null,
        sku: data.get("sku") || null,
        ean: data.get("ean") || null,
        price_nok: data.get("price_nok") === "" ? null : Number(data.get("price_nok")),
        category_id: data.get("category_id") || null,
        supplier: data.get("supplier") || null,
        description: data.get("description") || null,
        compatibility: data.get("compatibility") || null,
        image_path: data.get("image_path") || null,
        stock_quantity: data.get("stock_quantity") === "" ? null : Number(data.get("stock_quantity")),
        stock_status: data.get("stock_status"),
        warehouse_location: data.get("warehouse_location") || "Arna",
        is_published: data.get("is_published") === "on",
      }),
    });
    setLoading(false);
    if (response.ok) window.location.reload();
  }

  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)} className="rounded-md border border-white/10 px-3 py-2 text-[11px] font-bold text-zinc-200 hover:border-[#c9ff35]/40">
        {open ? "Lukk redigering" : "Rediger"}
      </button>
      {open && (
        <form onSubmit={save} className="mt-4 grid gap-3 rounded-lg border border-white/10 bg-black/20 p-4 sm:grid-cols-2">
          <input name="name" defaultValue={product.name} required className={`${input} sm:col-span-2`} />
          <input name="brand" defaultValue={product.brand ?? ""} placeholder="Merke" className={input} />
          <input name="supplier" defaultValue={product.supplier ?? ""} placeholder="Leverandør" className={input} />
          <input name="sku" defaultValue={product.sku ?? ""} placeholder="SKU" className={input} />
          <input name="ean" defaultValue={product.ean ?? ""} placeholder="EAN" className={input} />
          <input name="price_nok" type="number" min="0" step="0.01" defaultValue={product.price_nok ?? ""} placeholder="Pris" className={input} />
          <select name="category_id" defaultValue={product.category_id ?? ""} className={input}>
            <option value="">Ingen kategori</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input name="stock_quantity" type="number" min="0" defaultValue={product.stock_quantity ?? ""} placeholder="Lager" className={input} />
          <select name="stock_status" defaultValue={product.stock_status} className={input}>
            <option value="unknown">Ukjent</option><option value="in_stock">På lager</option><option value="low_stock">Få på lager</option><option value="out_of_stock">Utsolgt</option><option value="backorder">Restordre</option>
          </select>
          <input name="warehouse_location" defaultValue={product.warehouse_location} className={input} />
          <input name="image_path" defaultValue={product.image_path ?? ""} placeholder="Bilde-URL / path" className={input} />
          <textarea name="description" defaultValue={product.description ?? ""} rows={4} placeholder="Beskrivelse" className={`${input} sm:col-span-2`} />
          <textarea name="compatibility" defaultValue={product.compatibility ?? ""} rows={3} placeholder="Kompatibilitet" className={`${input} sm:col-span-2`} />
          <label className="flex items-center gap-2 text-xs font-bold text-zinc-300 sm:col-span-2"><input name="is_published" type="checkbox" defaultChecked={product.is_published} className="accent-[#c9ff35]" /> Publisert</label>
          <button disabled={loading} className="rounded-md bg-[#c9ff35] px-4 py-2.5 text-sm font-black text-black sm:col-span-2">{loading ? "Lagrer..." : "Lagre endringer"}</button>
        </form>
      )}
    </div>
  );
}
