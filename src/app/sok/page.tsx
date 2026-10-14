import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchResults from "@/components/SearchResults";
import { getStoreProducts } from "@/lib/store-products";

export const metadata: Metadata = {
  title: "Søk | Sykkel Deler",
  description: "Søk etter sykkeldeler, merker og kategorier.",
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const products = await getStoreProducts();

  return (
    <>
      <Navbar />
      <SearchResults initialQuery={query} products={products} />
      <Footer />
    </>
  );
}
