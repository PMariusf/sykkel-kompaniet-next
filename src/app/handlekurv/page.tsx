"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartProvider";

function formatPrice(value: number) {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#070b0c] text-white">
        <div className="mx-auto max-w-[1420px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">HANDLEKURV</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Din handlekurv</h1>
              <p className="mt-2 text-sm text-zinc-400">{itemCount} {itemCount === 1 ? "vare" : "varer"}</p>
            </div>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-bold text-zinc-500 transition hover:text-white"
              >
                Tøm handlekurv
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <section className="py-20 text-center">
              <h2 className="text-2xl font-black">Handlekurven er tom</h2>
              <p className="mt-3 text-sm text-zinc-400">Finn delene du trenger og legg dem i kurven.</p>
              <Link
                href="/#produkter"
                className="mt-6 inline-flex rounded-md bg-[#c9ff35] px-6 py-3 text-sm font-black text-black transition hover:bg-[#d8ff68]"
              >
                Se produkter
              </Link>
            </section>
          ) : (
            <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-3">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="grid grid-cols-[90px_1fr] gap-4 rounded-lg border border-white/10 bg-[#0b0f10] p-3 sm:grid-cols-[120px_1fr_auto] sm:items-center sm:p-4"
                  >
                    <Link
                      href={`/produkter/${item.id}`}
                      className="relative aspect-square overflow-hidden rounded-md bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]"
                    >
                      <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    </Link>

                    <div className="min-w-0">
                      <p className="text-[9px] font-black tracking-[.15em] text-[#c9ff35]">{item.brand.toUpperCase()}</p>
                      <Link href={`/produkter/${item.id}`} className="mt-1 block font-bold text-white hover:text-[#c9ff35]">
                        {item.name}
                      </Link>
                      <p className="mt-2 text-sm font-black text-white">{item.price}</p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="mt-3 text-[11px] font-bold text-zinc-500 transition hover:text-white"
                      >
                        Fjern
                      </button>
                    </div>

                    <div className="col-span-2 flex items-center justify-between border-t border-white/10 pt-3 sm:col-span-1 sm:block sm:border-0 sm:pt-0">
                      <div className="flex items-center rounded-md border border-white/10 bg-black/25">
                        <button
                          type="button"
                          aria-label={`Reduser antall ${item.name}`}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-9 w-9 text-lg text-zinc-300 hover:text-white"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Øk antall ${item.name}`}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-9 w-9 text-lg text-zinc-300 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="h-fit rounded-lg border border-white/10 bg-[#0b0f10] p-5 lg:sticky lg:top-24">
                <h2 className="text-lg font-black">Oppsummering</h2>
                <div className="mt-5 space-y-3 border-b border-white/10 pb-5 text-sm">
                  <div className="flex justify-between gap-4 text-zinc-400">
                    <span>Delsum</span>
                    <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-zinc-400">
                    <span>Frakt</span>
                    <span>Beregnes senere</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 py-5">
                  <span className="font-black">Totalt</span>
                  <span className="text-2xl font-black">{formatPrice(subtotal)}</span>
                </div>
                <button
                  type="button"
                  className="w-full rounded-md bg-[#c9ff35] px-5 py-3.5 text-sm font-black text-black transition hover:bg-[#d8ff68]"
                >
                  Gå til kassen
                </button>
                <p className="mt-3 text-center text-[10px] leading-4 text-zinc-500">
                  Checkout kobles til når betalingsløsningen er valgt.
                </p>
                <Link href="/#produkter" className="mt-5 block text-center text-xs font-bold text-[#c9ff35]">
                  ← Fortsett å handle
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
