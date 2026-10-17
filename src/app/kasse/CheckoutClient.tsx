"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/CartProvider";
import DemoPaymentPanel from "./DemoPaymentPanel";

function formatPrice(value: number) {
  return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 0 }).format(value);
}

function priceToNumber(price: string) {
  return Number(price.replace(/[^0-9]/g, ""));
}

const inputClass = "w-full rounded-md border border-white/10 bg-white/[.035] px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-500 transition focus:border-[#c9ff35]/60";
const labelClass = "block text-xs font-bold text-zinc-300";

export default function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState<"standard" | "pickup_point">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"vipps" | "card" | "klarna">("vipps");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [completedOrder, setCompletedOrder] = useState<string | null>(null);

  const shipping = items.length > 0 ? (shippingMethod === "pickup_point" ? 79 : 99) : 0;
  const total = subtotal + shipping;

  const paymentButtonLabel =
    paymentMethod === "vipps"
      ? "Simuler Vipps-betaling"
      : paymentMethod === "card"
        ? "Simuler kortbetaling"
        : "Simuler Klarna-betaling";

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: `${data.get("first_name") ?? ""} ${data.get("last_name") ?? ""}`.trim(),
        email: data.get("email"),
        customer_phone: data.get("phone"),
        address_line1: data.get("address_line1"),
        postal_code: data.get("postal_code"),
        city: data.get("city"),
        country: data.get("country"),
        shipping_method: shippingMethod,
        payment_method: paymentMethod,
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
      }),
    });

    const result = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok) {
      setMessage(result?.error ?? "Kunne ikke fullføre demo-bestillingen.");
      return;
    }

    setCompletedOrder(result?.order?.order_number ?? "Demo-ordre");
    clearCart();
  }

  return (
    <main className="min-h-screen bg-[#070b0c] text-white">
      <div className="mx-auto max-w-[1420px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <nav aria-label="Brødsmulesti" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="transition hover:text-white">Hjem</Link>
          <span aria-hidden="true">/</span>
          <Link href="/handlekurv" className="transition hover:text-white">Handlekurv</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-zinc-200">Kasse</span>
        </nav>

        <div className="mb-7 border-b border-white/10 pb-6">
          <p className="text-xs font-black tracking-[.28em] text-[#c9ff35]">CHECKOUT</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Fullfør bestillingen</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">Du kan handle som gjest uten å opprette konto. Demo-kassen kobler ikke til Vipps, kortinnløser eller Klarna.</p>
        </div>

        {completedOrder ? (
          <section aria-live="polite" className="mx-auto max-w-2xl rounded-xl border border-[#c9ff35]/25 bg-[#c9ff35]/[.04] px-6 py-14 text-center">
            <p className="text-xs font-black tracking-[.26em] text-[#c9ff35]">DEMO-BETALING GODKJENT</p>
            <h2 className="mt-3 text-3xl font-black">Bestillingen er registrert</h2>
            <p className="mt-3 text-sm text-zinc-300">Ordrenummer: <strong className="text-white">{completedOrder}</strong></p>
            <p className="mt-2 text-xs text-zinc-400">Ingen ekte betaling, kredittsjekk eller korttransaksjon er gjennomført.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/konto" className="flex min-h-11 items-center rounded-md bg-[#c9ff35] px-5 py-3 text-sm font-black text-black">Min konto</Link>
              <Link href="/" className="flex min-h-11 items-center rounded-md border border-white/10 px-5 py-3 text-sm font-bold text-white">Til forsiden</Link>
            </div>
          </section>
        ) : items.length === 0 ? (
          <section className="rounded-lg border border-white/10 bg-[#0b0f10] px-6 py-16 text-center">
            <h2 className="text-2xl font-black">Handlekurven er tom</h2>
            <p className="mt-3 text-sm text-zinc-300">Legg til produkter før du går til kassen.</p>
            <Link href="/#produkter" className="mt-6 inline-flex min-h-11 items-center rounded-md bg-[#c9ff35] px-6 py-3 text-sm font-black text-black">Se produkter</Link>
          </section>
        ) : (
          <form onSubmit={submitOrder} className="grid gap-8 lg:grid-cols-[1fr_390px]">
            <div className="space-y-5">
              <section aria-labelledby="checkout-contact" className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">1</span>
                  <h2 id="checkout-contact" className="text-lg font-black">Kontaktinformasjon</h2>
                </div>
                <p className="mt-2 text-xs text-zinc-400">Konto er valgfritt. E-post brukes som kontaktinformasjon på bestillingen.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <label className={labelClass}>Fornavn<input name="first_name" required maxLength={120} className={`${inputClass} mt-2`} type="text" placeholder="Fornavn" autoComplete="given-name" /></label>
                  <label className={labelClass}>Etternavn<input name="last_name" required maxLength={120} className={`${inputClass} mt-2`} type="text" placeholder="Etternavn" autoComplete="family-name" /></label>
                  <label className={labelClass}>E-postadresse<input name="email" required maxLength={254} className={`${inputClass} mt-2`} type="email" placeholder="navn@eksempel.no" autoComplete="email" /></label>
                  <label className={labelClass}>Telefonnummer <span className="font-normal text-zinc-400">(valgfritt)</span><input name="phone" maxLength={80} className={`${inputClass} mt-2`} type="tel" placeholder="Telefonnummer" autoComplete="tel" /></label>
                </div>
              </section>

              <section aria-labelledby="checkout-address" className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">2</span>
                  <h2 id="checkout-address" className="text-lg font-black">Leveringsadresse</h2>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <label className={`${labelClass} sm:col-span-2`}>Adresse<input name="address_line1" required maxLength={300} className={`${inputClass} mt-2`} type="text" placeholder="Gateadresse" autoComplete="street-address" /></label>
                  <label className={labelClass}>Postnummer<input name="postal_code" required maxLength={32} className={`${inputClass} mt-2`} type="text" inputMode="numeric" placeholder="Postnummer" autoComplete="postal-code" /></label>
                  <label className={labelClass}>Poststed<input name="city" required maxLength={120} className={`${inputClass} mt-2`} type="text" placeholder="Poststed" autoComplete="address-level2" /></label>
                  <label className={`${labelClass} sm:col-span-2`}>Land<input name="country" required maxLength={120} className={`${inputClass} mt-2`} type="text" defaultValue="Norge" autoComplete="country-name" /></label>
                </div>
              </section>

              <fieldset className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                <legend className="sr-only">Velg fraktmetode</legend>
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">3</span>
                  <h2 className="text-lg font-black">Frakt</h2>
                </div>
                <div className="mt-5 grid gap-3">
                  <label className={`flex min-h-11 cursor-pointer items-center justify-between rounded-md border p-4 focus-within:ring-2 focus-within:ring-[#c9ff35] ${shippingMethod === "standard" ? "border-[#c9ff35]/45 bg-[#c9ff35]/[.045]" : "border-white/10 bg-white/[.02]"}`}>
                    <span className="flex items-start gap-3"><input type="radio" name="shipping" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")} className="mt-1 accent-[#c9ff35]" /><span><span className="block text-sm font-black">Standard levering</span><span className="mt-1 block text-xs text-zinc-400">Demo-frakt</span></span></span><span className="text-sm font-black">99 kr</span>
                  </label>
                  <label className={`flex min-h-11 cursor-pointer items-center justify-between rounded-md border p-4 focus-within:ring-2 focus-within:ring-[#c9ff35] ${shippingMethod === "pickup_point" ? "border-[#c9ff35]/45 bg-[#c9ff35]/[.045]" : "border-white/10 bg-white/[.02]"}`}>
                    <span className="flex items-start gap-3"><input type="radio" name="shipping" checked={shippingMethod === "pickup_point"} onChange={() => setShippingMethod("pickup_point")} className="mt-1 accent-[#c9ff35]" /><span><span className="block text-sm font-black">Hentested</span><span className="mt-1 block text-xs text-zinc-400">Demo-alternativ</span></span></span><span className="text-sm font-black">79 kr</span>
                  </label>
                </div>
              </fieldset>

              <fieldset className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                <legend className="sr-only">Velg betalingsmetode</legend>
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">4</span>
                  <h2 className="text-lg font-black">Betaling</h2>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {(["vipps", "card", "klarna"] as const).map((method) => (
                    <label key={method} className={`min-h-11 cursor-pointer rounded-md border p-4 text-center focus-within:ring-2 focus-within:ring-[#c9ff35] ${paymentMethod === method ? "border-[#c9ff35]/45 bg-[#c9ff35]/[.045]" : "border-white/10 bg-white/[.02]"}`}>
                      <input type="radio" name="payment" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="sr-only" />
                      <span className="block text-sm font-black">{method === "vipps" ? "Vipps" : method === "card" ? "Kort" : "Klarna"}</span>
                      <span className="mt-1 block text-xs font-bold text-zinc-400">DEMO</span>
                    </label>
                  ))}
                </div>

                <DemoPaymentPanel method={paymentMethod} total={total} />
              </fieldset>
            </div>

            <aside aria-labelledby="order-summary" className="h-fit rounded-lg border border-white/10 bg-[#0b0f10] p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between gap-3">
                <h2 id="order-summary" className="text-lg font-black">Ordresammendrag</h2>
                <span className="rounded-full bg-white/5 px-2 py-1 text-xs font-black text-zinc-300">DEMO</span>
              </div>
              <div className="mt-5 space-y-4 border-b border-white/10 pb-5">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3">
                    <div className="relative aspect-square overflow-hidden rounded-md bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]"><Image src={item.image} alt={item.name} fill sizes="64px" className="object-contain p-1.5" /></div>
                    <div className="min-w-0"><p className="break-words text-xs font-bold">{item.name}</p><p className="mt-1 text-xs text-zinc-400">Antall: {item.quantity}</p></div>
                    <span className="whitespace-nowrap text-xs font-black">{formatPrice(priceToNumber(item.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3 text-sm"><div className="flex justify-between text-zinc-300"><span>Delsum</span><span className="font-bold text-white">{formatPrice(subtotal)}</span></div><div className="flex justify-between text-zinc-300"><span>Frakt</span><span className="font-bold text-white">{formatPrice(shipping)}</span></div></div>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5"><span className="font-black">Totalt</span><span className="text-2xl font-black">{formatPrice(total)}</span></div>
              {message && <div id="order-error" role="alert" aria-live="assertive" className="mt-4 rounded-md border border-amber-400/20 bg-amber-400/[.05] px-3 py-3 text-xs leading-5 text-amber-100">{message}</div>}
              <button disabled={loading} aria-busy={loading} aria-describedby={message ? "order-error" : undefined} type="submit" className="mt-5 min-h-11 w-full rounded-md bg-[#c9ff35] px-5 py-3.5 text-sm font-black text-black transition hover:bg-[#d8ff68] disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Simulerer betaling..." : paymentButtonLabel}</button>
              <p className="mt-3 text-center text-xs leading-5 text-zinc-400">Innlogging er ikke nødvendig. Ingen betalingsleverandør kalles, og ordren lagres med betalingsstatus «demo».</p>
              <Link href="/handlekurv" className="mt-5 block min-h-11 py-3 text-center text-xs font-bold text-[#c9ff35]">← Tilbake til handlekurven</Link>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}
