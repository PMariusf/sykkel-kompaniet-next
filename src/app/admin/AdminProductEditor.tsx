"use client";

import { FormEvent, useState } from "react";

type Category = { id: string; name: string };
type ProductImage = { id: string; image_url: string; alt_text: string | null; sort_order: number; is_primary: boolean };
type Product = {
  id: string;
  name: string;
  brand: string | null;
  sku: string | null;
  ean: string | null;
  price_nok: number | null;
  compare_at_price_nok: number | null;
  badge: string | null;
  is_featured: boolean;
  category_id: string | null;
  supplier: string | null;
  description: string | null;
  compatibility: string | null;
  image_path: string | null;
  stock_quantity: number | null;
  stock_status: string;
  warehouse_location: string;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  is_published: boolean;
  images?: ProductImage[];
};

export default function AdminProductEditor({ product, categories }: { product: Product; categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const input = "w-full rounded-md border border-white/10 bg-white/[.035] px-3 py-2.5 text-sm text-white outline-none focus:border-[#c9ff35]/60";

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true);
    const data = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"), brand: data.get("brand") || null, sku: data.get("sku") || null,
        ean: data.get("ean") || null, price_nok: data.get("price_nok") === "" ? null : Number(data.get("price_nok")),
        compare_at_price_nok: data.get("compare_at_price_nok") === "" ? null : Number(data.get("compare_at_price_nok")),
        badge: data.get("badge") || null, is_featured: data.get("is_featured") === "on",
        category_id: data.get("category_id") || null, supplier: data.get("supplier") || null,
        description: data.get("description") || null, compatibility: data.get("compatibility") || null,
        image_path: data.get("image_path") || null,
        stock_quantity: data.get("stock_quantity") === "" ? null : Number(data.get("stock_quantity")),
        stock_status: data.get("stock_status"), warehouse_location: data.get("warehouse_location") || "Arna",
        seo_title: data.get("seo_title") || null, seo_description: data.get("seo_description") || null,
        og_image_url: data.get("og_image_url") || null, is_published: data.get("is_published") === "on",
      }),
    });
    setLoading(false); if (response.ok) window.location.reload();
  }

  async function uploadImage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true);
    const data = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/products/${product.id}/images`, { method: "POST", body: data });
    setLoading(false); if (response.ok) window.location.reload();
  }

  async function imageAction(imageId: string, action: "primary" | "delete") {
    setLoading(true);
    const response = await fetch(`/api/admin/products/${product.id}/images/${imageId}`, action === "delete" ? { method: "DELETE" } : { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_primary: true }) });
    setLoading(false); if (response.ok) window.location.reload();
  }

  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)} className="rounded-md border border-white/10 px-3 py-2 text-[11px] font-bold text-zinc-200 hover:border-[#c9ff35]/40">
        {open ? "Lukk redigering" : "Rediger"}
      </button>
      {open && (
        <div className="mt-4 space-y-4 rounded-lg border border-white/10 bg-black/20 p-4">
          <form onSubmit={save} className="grid gap-3 sm:grid-cols-2">
            <input name="name" defaultValue={product.name} required className={`${input} sm:col-span-2`} />
            <input name="brand" defaultValue={product.brand ?? ""} placeholder="Merke" className={input} />
            <input name="supplier" defaultValue={product.supplier ?? ""} placeholder="Leverandør" className={input} />
            <input name="sku" defaultValue={product.sku ?? ""} placeholder="SKU" className={input} />
            <input name="ean" defaultValue={product.ean ?? ""} placeholder="EAN" className={input} />
            <input name="price_nok" type="number" min="0" step="0.01" defaultValue={product.price_nok ?? ""} placeholder="Pris" className={input} />
            <input name="compare_at_price_nok" type="number" min="0" step="0.01" defaultValue={product.compare_at_price_nok ?? ""} placeholder="Førpris" className={input} />
            <select name="badge" defaultValue={product.badge ?? ""} className={input}><option value="">Ingen badge</option><option value="Tilbud">Tilbud</option><option value="Nyhet">Nyhet</option><option value="Bestselger">Bestselger</option><option value="Populær">Populær</option></select>
            <select name="category_id" defaultValue={product.category_id ?? ""} className={input}>
              <option value="">Ingen kategori</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input name="stock_quantity" type="number" min="0" defaultValue={product.stock_quantity ?? ""} placeholder="Lager" className={input} />
            <select name="stock_status" defaultValue={product.stock_status} className={input}>
              <option value="unknown">Ukjent</option><option value="in_stock">På lager</option><option value="low_stock">Få på lager</option><option value="out_of_stock">Utsolgt</option><option value="backorder">Restordre</option>
            </select>
            <input name="warehouse_location" defaultValue={product.warehouse_location} className={input} />
            <input name="image_path" defaultValue={product.image_path ?? ""} placeholder="Hovedbilde URL / path" className={input} />
            <textarea name="description" defaultValue={product.description ?? ""} rows={4} placeholder="Beskrivelse" className={`${input} sm:col-span-2`} />
            <textarea name="compatibility" defaultValue={product.compatibility ?? ""} rows={3} placeholder="Kompatibilitet" className={`${input} sm:col-span-2`} />

            <div className="sm:col-span-2 mt-2 border-t border-white/10 pt-4">
              <p className="mb-3 text-[10px] font-black tracking-[.2em] text-[#c9ff35]">SEO</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="seo_title" defaultValue={product.seo_title ?? ""} placeholder="SEO title" className={`${input} sm:col-span-2`} />
                <textarea name="seo_description" defaultValue={product.seo_description ?? ""} rows={3} placeholder="Meta description" className={`${input} sm:col-span-2`} />
                <input name="og_image_url" defaultValue={product.og_image_url ?? ""} placeholder="Open Graph-bilde URL" className={`${input} sm:col-span-2`} />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-zinc-300"><input name="is_featured" type="checkbox" defaultChecked={product.is_featured} className="accent-[#c9ff35]" /> Utvalgt på forsiden</label>
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-300"><input name="is_published" type="checkbox" defaultChecked={product.is_published} className="accent-[#c9ff35]" /> Publisert</label>
            <button disabled={loading} className="rounded-md bg-[#c9ff35] px-4 py-2.5 text-sm font-black text-black sm:col-span-2">{loading ? "Lagrer..." : "Lagre endringer"}</button>
          </form>

          <div className="border-t border-white/10 pt-4">
            <p className="text-xs font-black text-white">Produktgalleri</p>
            <p className="mt-1 text-[11px] text-zinc-500">Last opp flere bilder. Første bilde blir hovedbilde automatisk.</p>
            <form onSubmit={uploadImage} className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <input name="file" type="file" accept="image/*" required className="rounded-md border border-white/10 bg-white/[.035] px-3 py-2 text-xs" />
              <input name="altText" placeholder="Alt-tekst" className={input} />
              <button disabled={loading} className="rounded-md border border-[#c9ff35]/30 px-4 py-2 text-xs font-black text-[#c9ff35]">Last opp</button>
            </form>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {(product.images ?? []).map((image) => (
                <div key={image.id} className="overflow-hidden rounded-lg border border-white/10 bg-[#070b0c]">
                  <img src={image.image_url} alt={image.alt_text || product.name} className="aspect-square w-full object-cover" />
                  <div className="p-2"><div className="flex flex-wrap gap-1">
                    {image.is_primary ? <span className="rounded bg-[#c9ff35]/15 px-2 py-1 text-[9px] font-black text-[#c9ff35]">HOVEDBILDE</span> : <button type="button" onClick={() => imageAction(image.id, "primary")} className="rounded border border-white/10 px-2 py-1 text-[9px]">Sett som hoved</button>}
                    <button type="button" onClick={() => imageAction(image.id, "delete")} className="rounded border border-red-500/20 px-2 py-1 text-[9px] text-red-300">Slett</button>
                  </div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
