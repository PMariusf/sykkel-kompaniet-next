"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";

type SearchResultsProps = {
  initialQuery?: string;
};

export default function SearchResults({ initialQuery = "" }: SearchResultsProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const normalizedQuery = initialQuery.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return products;

    return products.filter((product) =>
      [product.name, product.brand, product.category]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/sok?q=${encodeURIComponent(value)}` : "/sok");
  }

  return (
    <main className="min-h-[70vh] bg-[#070b0c] text-white">
      <section className="border-b border-white/10 bg-[#081011]">
        <div className="mx-auto max-w-[1420px] px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-[10px] font-black tracking-[.34em] text-[#c9ff35]">SØK</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Finn riktig sykkeldel</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Søk etter produktnavn, merke eller kategori.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex max-w-3xl gap-2">
            <label htmlFor="product-search" className="sr-only">Søk etter produkter</label>
            <div className="flex min-w-0 flex-1 items-center rounded-md border border-white/15 bg-black/30 px-4 focus-within:border-[#c9ff35]/60">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mr-3 h-5 w-5 shrink-0 fill-none stroke-zinc-400" strokeWidth="1.8">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Shimano, kassett, bremser ..."
                className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              />
            </div>
            <button type="submit" className="rounded-md bg-[#c9ff35] px-5 text-sm font-black text-black transition hover:bg-[#d8ff68]">
              Søk
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-[1420px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-white">
              {initialQuery ? `Resultater for “${initialQuery}”` : "Alle produkter"}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {results.length} {results.length === 1 ? "produkt" : "produkter"}
            </p>
          </div>
          {initialQuery && (
            <Link href="/sok" className="text-xs font-bold text-[#c9ff35]">Nullstill søk</Link>
          )}
        </div>

        {results.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {results.map((product) => (
              <article key={product.id} className="group min-w-0 overflow-hidden rounded-md border border-white/15 bg-[#0b0f10] transition hover:border-[#c9ff35]/35">
                <Link href={`/produkter/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-contain p-3 transition duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[9px] font-black tracking-[.16em] text-zinc-500">{product.brand.toUpperCase()}</p>
                    <h2 className="mt-1 min-h-10 text-[12px] font-bold leading-4 text-zinc-100 sm:text-[13px]">{product.name}</h2>
                    <p className="mt-2 text-lg font-black text-white">{product.price}</p>
                    <p className="mt-1 text-[10px] font-bold text-[#9ce52b]">● På lager</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-white/10 bg-white/[.02] px-5 py-12 text-center">
            <p className="text-lg font-black text-white">Ingen produkter funnet</p>
            <p className="mt-2 text-sm text-zinc-500">Prøv et merke, en kategori eller et kortere søkeord.</p>
          </div>
        )}
      </section>
    </main>
  );
}
