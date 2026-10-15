import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { getStoreProduct, getStoreProducts } from "@/lib/store-products";
import { SITE_URL } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getStoreProduct(id);

  if (!product) return { title: "Produkt ikke funnet" };

  const title = product.seoTitle || product.name;
  const description = product.seoDescription || `${product.brand} ${product.name} – ${product.category}.`;
  const canonical = `/produkter/${product.id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: product.ogImage || product.image ? [{ url: product.ogImage || product.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.ogImage || product.image ? [product.ogImage || product.image] : undefined,
    },
  };
}

function stockText(status?: string, quantity?: number) {
  if (status === "in_stock") return quantity != null ? `${quantity} på lager` : "På lager";
  if (status === "low_stock") return quantity != null ? `Kun ${quantity} på lager` : "Få på lager";
  if (status === "out_of_stock") return "Utsolgt";
  if (status === "backorder") return "Kan restbestilles";
  return "Lagerstatus kommer";
}

function schemaAvailability(status?: string) {
  if (status === "in_stock" || status === "low_stock") return "https://schema.org/InStock";
  if (status === "out_of_stock") return "https://schema.org/OutOfStock";
  if (status === "backorder") return "https://schema.org/BackOrder";
  return undefined;
}

function numericPrice(price: string) {
  const parsed = Number(price.replace(/[^0-9,.-]/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const [product, allProducts] = await Promise.all([getStoreProduct(id), getStoreProducts()]);
  if (!product) notFound();

  const relatedProducts = allProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);
  const warehouse = product.warehouseLocation ?? "Arna";
  const productUrl = `${SITE_URL}/produkter/${product.id}`;
  const price = numericPrice(product.price);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.seoDescription || undefined,
    image: product.image ? [product.image.startsWith("http") ? product.image : `${SITE_URL}${product.image}`] : undefined,
    sku: product.sku || undefined,
    gtin13: product.ean?.replace(/\s/g, "").length === 13 ? product.ean.replace(/\s/g, "") : undefined,
    category: product.category,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    offers: price != null ? {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "NOK",
      price,
      availability: schemaAvailability(product.stockStatus),
      itemCondition: "https://schema.org/NewCondition",
    } : undefined,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#070b0c] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }}
        />
        <div className="mx-auto max-w-[1420px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <nav aria-label="Brødsmuler" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
            <Link href="/" className="transition hover:text-white">Hjem</Link><span aria-hidden="true">/</span>
            <Link href="/#produkter" className="transition hover:text-white">Produkter</Link><span aria-hidden="true">/</span>
            <span aria-current="page" className="text-zinc-100">{product.name}</span>
          </nav>

          <section className="grid gap-7 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
            <div className="relative min-h-[380px] overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_42%,#252c2d,#090b0c_72%)] sm:min-h-[520px]">
              <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain p-8 sm:p-14" />
              {product.badge && <span className="absolute left-4 top-4 rounded-full bg-[#c9ff35] px-3 py-1.5 text-xs font-black uppercase tracking-[.1em] text-black">{product.badge}</span>}
              <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-black tracking-[.1em] text-white backdrop-blur-sm">LAGER I {warehouse.toUpperCase()}</span>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs font-black tracking-[.24em] text-[#c9ff35]">{product.brand.toUpperCase()}</p>
              <h1 className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{product.name}</h1>
              <p className="mt-3 text-sm font-semibold text-zinc-300">Kategori: {product.category}</p>

              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                <p className="text-3xl font-black text-white sm:text-4xl">{product.price}</p>
                {product.compareAtPrice && <p className="text-lg font-bold text-zinc-400 line-through">{product.compareAtPrice}</p>}
              </div>
              <p className="mt-2 text-sm font-bold text-zinc-300">{stockText(product.stockStatus, product.stockQuantity)}</p>

              <div className="mt-7 border-y border-white/10 py-5 text-sm leading-7 text-zinc-200">
                <p>{product.description || "Produktbeskrivelse kommer når leverandørdata er lagt inn."}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton product={product} />
                <button className="rounded-md border border-white/15 bg-white/[.03] px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/30">♡ Lagre</button>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[["Lager", stockText(product.stockStatus, product.stockQuantity)], ["Trygg handel", "Sikre betalingsløsninger"], ["Hjelp til valg", "Vi hjelper deg"]].map(([title, text]) => (
                  <div key={title} className="rounded-md border border-white/10 bg-white/[.025] p-3"><p className="text-xs font-black text-white">{title}</p><p className="mt-1 text-xs leading-5 text-zinc-300">{text}</p></div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-[#0b0f10] p-5">
              <h2 className="text-sm font-black text-white">Produktinformasjon</h2>
              <dl className="mt-3 space-y-2 text-xs text-zinc-300">
                <div className="flex justify-between gap-4"><dt>SKU</dt><dd>{product.sku ?? "Kommer"}</dd></div>
                <div className="flex justify-between gap-4"><dt>EAN</dt><dd>{product.ean ?? "Kommer"}</dd></div>
                <div className="flex justify-between gap-4"><dt>Leverandør</dt><dd>{product.supplier ?? "Kommer"}</dd></div>
              </dl>
            </div>
            <div className="rounded-md border border-white/10 bg-[#0b0f10] p-5">
              <h2 className="text-sm font-black text-white">Kompatibilitet</h2>
              <p className="mt-3 text-xs leading-6 text-zinc-300">{product.compatibility?.length ? product.compatibility.join(", ") : "Kompatibilitetsdata kommer fra leverandør."}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-[#0b0f10] p-5">
              <h2 className="text-sm font-black text-white">Lager & levering</h2>
              <p className="mt-3 text-xs leading-6 text-zinc-300">Lagerlokasjon: {warehouse}. {stockText(product.stockStatus, product.stockQuantity)}.</p>
            </div>
          </section>

          {relatedProducts.length > 0 && (
            <section className="mt-10 border-t border-white/10 pt-8">
              <p className="text-xs font-black tracking-[.24em] text-[#c9ff35]">RELATERTE PRODUKTER</p>
              <h2 className="mt-2 text-2xl font-black text-white">Andre deler i {product.category}</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                {relatedProducts.map((item) => (
                  <Link key={item.id} href={`/produkter/${item.id}`} className="group overflow-hidden rounded-md border border-white/10 bg-[#0b0f10] transition hover:border-[#c9ff35]/40">
                    <div className="relative aspect-[1.25/1] bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]"><Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-contain p-5 transition group-hover:scale-[1.03]" /></div>
                    <div className="p-3"><p className="text-xs font-black tracking-[.1em] text-zinc-300">{item.brand.toUpperCase()}</p><p className="mt-1 text-sm font-bold text-white">{item.name}</p><div className="mt-2 flex items-baseline gap-2"><p className="font-black text-white">{item.price}</p>{item.compareAtPrice && <p className="text-xs text-zinc-400 line-through">{item.compareAtPrice}</p>}</div></div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
