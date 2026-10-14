import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type Brand = { id: string; name: string; logo_url: string | null; website_url: string | null };

const fallback = ["SHIMANO", "SRAM", "Continental", "MAXXIS", "SCHWALBE"];

async function getBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/brands?select=id,name,logo_url,website_url&is_active=eq.true&order=sort_order.asc`, {
      headers: supabaseHeaders(),
      cache: "no-store",
    });
    if (!response.ok) return fallback.map((name, index) => ({ id: String(index), name, logo_url: null, website_url: null }));
    const rows: Brand[] = await response.json();
    return rows.length ? rows : fallback.map((name, index) => ({ id: String(index), name, logo_url: null, website_url: null }));
  } catch {
    return fallback.map((name, index) => ({ id: String(index), name, logo_url: null, website_url: null }));
  }
}

export default async function BrandStrip() {
  const brands = await getBrands();
  return (
    <section id="merker" className="border-b border-white/10 bg-[#090d0e]">
      <div className="mx-auto flex max-w-[1420px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="min-w-fit">
          <p className="text-[9px] font-black tracking-[.34em] text-[#c9ff35]">POPULÆRE MERKER</p>
          <p className="mt-1 text-sm font-bold text-white">Kvalitetsdeler fra ledende produsenter</p>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-between gap-4 lg:ml-8">
          {brands.map((brand, index) => {
            const content = brand.logo_url ? <img src={brand.logo_url} alt={brand.name} className="max-h-7 max-w-28 object-contain" /> : <span className="text-base font-black italic text-zinc-300 sm:text-xl">{brand.name}</span>;
            return brand.website_url ? (
              <a key={brand.id} href={brand.website_url} target="_blank" rel="noreferrer" className={index > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""}>{content}</a>
            ) : (
              <span key={brand.id} className={index > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""}>{content}</span>
            );
          })}
          <a href="/kategorier" className="text-xs font-bold text-[#c9ff35]">Se utvalget →</a>
        </div>
      </div>
    </section>
  );
}
