"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartProvider";

function formatPrice(value: number) {
  return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 0 }).format(value);
}

function priceToNumber(price: string) {
  return Number(price.replace(/[^0-9]/g, ""));
}

const inputClass = "w-full rounded-md border border-white/10 bg-white/[.035] px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-[#c9ff35]/60";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState<"standard" | "pickup_point">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"vipps" | "card" | "klarna">("vipps");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [completedOrder, setCompletedOrder] = useState<string | null>(null);

  const shipping = items.length > 0 ? (shippingMethod === "pickup_point" ? 79 : 99) : 0;
  const total = subtotal + shipping;

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
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          sku: item.sku,
          unit_price_nok: priceToNumber(item.price),
          quantity: item.quantity,
          image_url: item.image,
        })),
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
    <>
      <Navbar />
      <main className="min-h-screen bg-[#070b0c] text-white">
        <div className="mx-auto max-w-[1420px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
            <Link href="/" className="transition hover:text-white">Hjem</Link><span>/</span><Link href="/handlekurv" className="transition hover:text-white">Handlekurv</Link><span>/</span><span className="text-zinc-300">Kasse</span>
          </nav>

          <div className="mb-7 border-b border-white/10 pb-6">
            <p className="text-[10px] font-black tracking-[.32em] text-[#c9ff35]">CHECKOUT</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Fullfør bestillingen</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">Demo-kassen lagrer nå ordren på kundekontoen, men gjennomfører ingen ekte betaling.</p>
          </div>

          {completedOrder ? (
            <section className="mx-auto max-w-2xl rounded-xl border border-[#c9ff35]/25 bg-[#c9ff35]/[.04] px-6 py-14 text-center">
              <p className="text-[10px] font-black tracking-[.3em] text-[#c9ff35]">BESTILLING REGISTRERT</p>
              <h2 className="mt-3 text-3xl font-black">Takk for demo-bestillingen</h2>
              <p className="mt-3 text-sm text-zinc-400">Ordrenummer: <strong className="text-white">{completedOrder}</strong></p>
              <p className="mt-2 text-xs text-zinc-500">Ingen betaling er gjennomført.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/konto" className="rounded-md bg-[#c9ff35] px-5 py-3 text-sm font-black text-black">Se ordrehistorikk</Link>
                <Link href="/" className="rounded-md border border-white/10 px-5 py-3 text-sm font-bold text-white">Til forsiden</Link>
              </div>
            </section>
          ) : items.length === 0 ? (
            <section className="rounded-lg border border-white/10 bg-[#0b0f10] px-6 py-16 text-center">
              <h2 className="text-2xl font-black">Handlekurven er tom</h2>
              <p className="mt-3 text-sm text-zinc-400">Legg til produkter før du går til kassen.</p>
              <Link href="/#produkter" className="mt-6 inline-flex rounded-md bg-[#c9ff35] px-6 py-3 text-sm font-black text-black">Se produkter</Link>
            </section>
          ) : (
            <form onSubmit={submitOrder} className="grid gap-8 lg:grid-cols-[1fr_390px]">
              <div className="space-y-5">
                <section className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                  <div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">1</span><h2 className="text-lg font-black">Kontaktinformasjon</h2></div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <input name="first_name" required className={inputClass} type="text" placeholder="Fornavn" />
                    <input name="last_name" required className={inputClass} type="text" placeholder="Etternavn" />
                    <input name="email" required className={inputClass} type="email" placeholder="E-postadresse" />
                    <input name="phone" className={inputClass} type="tel" placeholder="Telefonnummer" />
                  </div>
                </section>

                <section className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                  <div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">2</span><h2 className="text-lg font-black">Leveringsadresse</h2></div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <input name="address_line1" required className={`${inputClass} sm:col-span-2`} type="text" placeholder="Adresse" />
                    <input name="postal_code" required className={inputClass} type="text" placeholder="Postnummer" />
                    <input name="city" required className={inputClass} type="text" placeholder="Poststed" />
                    <input name="country" required className={`${inputClass} sm:col-span-2`} type="text" defaultValue="Norge" />
                  </div>
                </section>

                <section className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                  <div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">3</span><h2 className="text-lg font-black">Frakt</h2></div>
                  <div className="mt-5 grid gap-3">
                    <label className={`flex cursor-pointer items-center justify-between rounded-md border p-4 ${shippingMethod === "standard" ? "border-[#c9ff35]/45 bg-[#c9ff35]/[.045]" : "border-white/10 bg-white/[.02]"}`}>
                      <span className="flex items-start gap-3"><input type="radio" name="shipping" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")} className="mt-1 accent-[#c9ff35]" /><span><span className="block text-sm font-black">Standard levering</span><span className="mt-1 block text-xs text-zinc-500">1–3 virkedager</span></span></span><span className="text-sm font-black">99 kr</span>
                    </label>
                    <label className={`flex cursor-pointer items-center justify-between rounded-md border p-4 ${shippingMethod === "pickup_point" ? "border-[#c9ff35]/45 bg-[#c9ff35]/[.045]" : "border-white/10 bg-white/[.02]"}`}>
                      <span className="flex items-start gap-3"><input type="radio" name="shipping" checked={shippingMethod === "pickup_point"} onChange={() => setShippingMethod("pickup_point")} className="mt-1 accent-[#c9ff35]" /><span><span className="block text-sm font-black">Hentested</span><span className="mt-1 block text-xs text-zinc-500">Demo-alternativ</span></span></span><span className="text-sm font-black">79 kr</span>
                    </label>
                  </div>
                </section>

                <section className="rounded-lg border border-white/10 bg-[#0b0f10] p-5 sm:p-6">
                  <div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff35] text-xs font-black text-black">4</span><h2 className="text-lg font-black">Betaling</h2></div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {(["vipps", "card", "klarna"] as const).map((method) => (
                      <label key={method} className={`cursor-pointer rounded-md border p-4 text-center ${paymentMethod === method ? "border-[#c9ff35]/45 bg-[#c9ff35]/[.045]" : "border-white/10 bg-white/[.02]"}`}>
                        <input type="radio" name="payment" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="sr-only" />
                        <span className="block text-sm font-black">{method === "vipps" ? "Vipps" : method === "card" ? "Kort" : "Klarna"}</span><span className="mt-1 block text-[10px] text-zinc-500">Demo</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4 rounded-md border border-white/10 bg-black/20 px-4 py-3 text-xs leading-5 text-zinc-500">Ingen betalingsleverandør kalles i denne demoen.</div>
                </section>
              </div>

              <aside className="h-fit rounded-lg border border-white/10 bg-[#0b0f10] p-5 lg:sticky lg:top-24">
                <h2 className="text-lg font-black">Ordresammendrag</h2>
                <div className="mt-5 space-y-4 border-b border-white/10 pb-5">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
                      <div className="relative aspect-square overflow-hidden rounded-md bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]"><Image src={item.image} alt={item.name} fill sizes="64px" className="object-contain p-1.5" /></div>
                      <div className="min-w-0"><p className="truncate text-[11px] font-bold">{item.name}</p><p className="mt-1 text-[10px] text-zinc-500">Antall: {item.quantity}</p></div>
                      <span className="text-xs font-black">{formatPrice(priceToNumber(item.price) * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-3 text-sm"><div className="flex justify-between text-zinc-400"><span>Delsum</span><span className="font-bold text-white">{formatPrice(subtotal)}</span></div><div className="flex justify-between text-zinc-400"><span>Frakt</span><span className="font-bold text-white">{formatPrice(shipping)}</span></div></div>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5"><span className="font-black">Totalt</span><span className="text-2xl font-black">{formatPrice(total)}</span></div>
                {message && <div className="mt-4 rounded-md border border-amber-400/20 bg-amber-400/[.05] px-3 py-3 text-xs leading-5 text-amber-100">{message}{message.includes("innlogget") && <Link href="/konto" className="ml-1 font-black text-[#c9ff35]">Logg inn her →</Link>}</div>}
                <button disabled={loading} type="submit" className="mt-5 w-full rounded-md bg-[#c9ff35] px-5 py-3.5 text-sm font-black text-black disabled:opacity-50">{loading ? "Lagrer bestilling..." : "Fullfør demo-bestilling"}</button>
                <p className="mt-3 text-center text-[10px] leading-4 text-zinc-500">Ordren lagres på kundekontoen. Ingen betaling gjennomføres.</p>
                <Link href="/handlekurv" className="mt-5 block text-center text-xs font-bold text-[#c9ff35]">← Tilbake til handlekurven</Link>
              </aside>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
