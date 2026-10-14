import { products as fallbackProducts, type Product } from "@/data/products";
import { SUPABASE_URL, supabaseHeaders } from "@/lib/supabase-rest";

type CmsProduct = {
  id: string;
  legacy_id: number | null;
  brand: string | null;
  name: string;
  price_nok: number | null;
  compare_at_price_nok: number | null;
  badge: string | null;
  category: { name: string } | null;
  image_path: string | null;
  sku: string | null;
  ean: string | null;
  supplier: string | null;
  description: string | null;
  compatibility: string | null;
  specifications: Record<string, string> | null;
  stock_quantity: number | null;
  warehouse_location: string | null;
  stock_status: Product["stockStatus"] | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  is_featured: boolean;
};

function formatNok(value: number | null) {
  if (value == null) return "Pris kommer";
  return `${new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(value)} kr`;
}

function mapCmsProduct(row: CmsProduct): Product {
  return {
    id: row.legacy_id ? String(row.legacy_id) : row.id,
    brand: row.brand || "Sykkel Deler",
    name: row.name,
    price: formatNok(row.price_nok),
    compareAtPrice: row.compare_at_price_nok ? formatNok(row.compare_at_price_nok) : undefined,
    badge: row.badge || undefined,
    category: row.category?.name || "Sykkeldeler",
    image: row.image_path || "/products/cassette.png",
    sku: row.sku || undefined,
    ean: row.ean || undefined,
    supplier: row.supplier || undefined,
    description: row.description || undefined,
    compatibility: row.compatibility
      ? row.compatibility.split(/\n|,/).map((item) => item.trim()).filter(Boolean)
      : undefined,
    specifications: row.specifications || undefined,
    stockQuantity: row.stock_quantity ?? undefined,
    warehouseLocation: row.warehouse_location || undefined,
    stockStatus: row.stock_status || "unknown",
    seoTitle: row.seo_title || undefined,
    seoDescription: row.seo_description || undefined,
    ogImage: row.og_image_url || undefined,
  };
}

export async function getStoreProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,legacy_id,brand,name,price_nok,compare_at_price_nok,badge,image_path,sku,ean,supplier,description,compatibility,specifications,stock_quantity,warehouse_location,stock_status,seo_title,seo_description,og_image_url,is_featured,category:categories(name)&is_published=eq.true&order=is_featured.desc,created_at.desc`,
      { headers: supabaseHeaders(), cache: "no-store" },
    );

    if (!response.ok) return fallbackProducts;
    const rows: CmsProduct[] = await response.json();
    return rows.length ? rows.map(mapCmsProduct) : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getStoreProduct(id: string): Promise<Product | undefined> {
  const products = await getStoreProducts();
  return products.find((product) => product.id === id);
}
