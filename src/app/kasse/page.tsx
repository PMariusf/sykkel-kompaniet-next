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

function priceToNumber(price: string) {
  return Number(price.replace(/[^0-9]/g, ""));
}

const inputClass =
  "w-full rounded-md border border-white/10 bg-white/[.035] px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-[#c9ff35]/60";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  const shipping = items.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#070b0c] text-white">
        <div className="mx-auto max-w-[1420px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
            <Link href="/" className="transition hover:text-white">Hjem</Link>
            <span>/</span>
            <Link href="/handlekurv" className="transition hover:text-white">Handlekurv</Link>
            <span>/</span>
            <span className="text-zinc-300">Kasse</span>
          </nav>

          <div className="mb-7 border-b border-white/10 pb-6">
            <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">CHECKOUT</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Fullfør bestillingen</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Dette er en demo-kasse. Ingen betaling gjennomføres ennå, men flyten viser hvordan den ferdige nettbutikken kan fungere.
            </p>
          </div>

          {items.length === 0 ? (
            <section className="rounded-lg border border-white/10 bg-[#0b0f10] px-6 py-16 text-center">
              <h2 className="text-2xl font-black">Handlekurven er tom</h2>
              <p className="mt-3 text-sm text-zinc-400">Legg til produkter før du går til kassen.</p>
              <Link
                href="/#produkter"
                className="mt-6 inline-flex rounded-md bg-[#c9ff35] px-6 py-3 text-sm font-black text-black transition hover:bg-[#d8ff68]"
              >
                Se produkter
              </Link>
            </section>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
              <div className="space-y-5">
                <section className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">1</span>
                    <h2 className="text-lg font-black">Kontaktinformasjon</h2>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <input className={inputClass} type="text" placeholder="Fornavn" />
                    <input className={inputClass} type="text" placeholder="Etternavn" />
                    <input className={inputClass} type="email" placeholder="E-postadresse" />
                    <input className={inputClass} type="tel" placeholder="Telefonnummer" />
                  </div>
                </section>

                <section className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">2</span>
                    <h2 className="text-lg font-black">Leveringsadresse</h2>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <input className={`${inputClass} sm:col-span-2`} type="text" placeholder="Adresse" />
                    <input className={inputClass} type="text" placeholder="Postnummer" />
                    <input className={inputClass} type="text" placeholder="Poststed" />
                    <input className={`${inputClass} sm:col-span-2`} type="text" placeholder="Land" defaultValue="Norge" />
                  </div>
                </section>

                <section className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">3</span>
                    <h2 className="text-lg font-black">Frakt</h2>
                  </div>
                  <div className="mt-5 grid gap-3">
                    <label className="flex cursor-pointer items-center justify-between rounded-md border border-[#c9ff35]/45 bg-[#c9ff35]/[.045] p-4">
                      <span className="flex items-start gap-3">
                        <input type="radio" name="shipping" defaultChecked className="mt-1 accent-[#c9ff35]" />
                        <span>
                          <span className="block text-sm font-black text-white">Standard levering</span>
                          <span className="mt-1 block text-xs text-zinc-500">1–3 virkedager</span>
                        </span>
                      </span>
                      <span className="text-sm font-black">99 kr</span>
                    </label>
                    <label className="flex cursor-pointer items-center justify-between rounded-md border border-white/10 bg-white/[.02] p-4">
                      <span className="flex items-start gap-3">
                        <input type="radio" name="shipping" className="mt-1 accent-[#c9ff35]" />
                        <span>
                          <span className="block text-sm font-black text-white">Hentested</span>
                          <span className="mt-1 block text-xs text-zinc-500">Demo-alternativ</span>
                        </span>
                      </span>
                      <span className="text-sm font-black">79 kr</span>
                    </label>
                  </div>
                </section>

                <section className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">4</span>
                    <h2 className="text-lg font-black">Betaling</h2>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {["Vipps", "Kort", "Klarna"].map((method, index) => (
                      <label
                        key={method}
                        className={`cursor-pointer rounded-md border p-4 text-center ${index === 0 ? "border-[#c9ff35]/45 bg-[#c9ff35]/[.045]" : "border-white/10 bg-white/[.02]"}`}
                      >
                        <input type="radio" name="payment" defaultChecked={index === 0} className="sr-only" />
                        <span className="block text-sm font-black text-white">{method}</span>
                        <span className="mt-1 block text-[10px] text-zinc-500">Demo</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4 rounded-md border border-white/10 bg-black/20 px-4 py-3 text-xs leading-5 text-zinc-500">
                    Ekte betaling kobles til når Sykkel Deler har valgt betalingsleverandør og avtaler er på plass.
                  </div>
                </section>
              </div>

              <aside className="h-fit rounded-lg border border-white/10 bg-[#0b0f10] p-5 lg:sticky lg:top-24">
                <h2 className="text-lg font-black">Ordresammendrag</h2>

                <div className="mt-5 space-y-4 border-b border-white/10 pb-5">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
                      <div className="relative aspect-square overflow-hidden rounded-md bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1.5"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-bold text-white">{item.name}</p>
                        <p className="mt-1 text-[10px] text-zinc-500">Antall: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-black text-white">{formatPrice(priceToNumber(item.price) * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 text-zinc-400">
                    <span>Delsum</span>
                    <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-zinc-400">
                    <span>Frakt</span>
                    <span className="font-bold text-white">{formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="font-black">Totalt</span>
                  <span className="text-2xl font-black">{formatPrice(total)}</span>
                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-md bg-[#c9ff35] px-5 py-3.5 text-sm font-black text-black transition hover:bg-[#d8ff68]"
                >
                  Fullfør demo-bestilling
                </button>
                <p className="mt-3 text-center text-[10px] leading-4 text-zinc-500">
                  Knappen sender ingen betaling eller bestilling.
                </p>

                <Link href="/handlekurv" className="mt-5 block text-center text-xs font-bold text-[#c9ff35]">
                  ← Tilbake til handlekurven
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
