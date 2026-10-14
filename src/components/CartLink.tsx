"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

export default function CartLink() {
  const { items, itemCount } = useCart();
  const [open, setOpen] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + priceToNumber(item.price) * item.quantity,
    0,
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Handlekurv med ${itemCount} varer`}
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center text-zinc-100 transition hover:text-[#c9ff35]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7">
          <path d="M3 4h2l2 11h10l2-7H6" />
          <circle cx="9" cy="19" r="1.2" />
          <circle cx="17" cy="19" r="1.2" />
        </svg>
        <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9ff35] px-1 text-[9px] font-black text-black">
          {itemCount}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-[70] w-[min(92vw,360px)] overflow-hidden rounded-xl border border-white/10 bg-[#0b0f10] shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-[9px] font-black tracking-[.22em] text-[#c9ff35]">HANDLEKURV</p>
              <p className="mt-1 text-sm font-black text-white">{itemCount} {itemCount === 1 ? "vare" : "varer"}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Lukk handlekurv"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition hover:border-white/25 hover:text-white"
            >
              ×
            </button>
          </div>

          {items.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[.03] text-zinc-500">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7">
                  <path d="M3 4h2l2 11h10l2-7H6" />
                  <circle cx="9" cy="19" r="1.2" />
                  <circle cx="17" cy="19" r="1.2" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-black text-white">Handlekurven er tom</p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">Legg til en sykkeldel før du går videre til kassen.</p>
              <Link
                href="/#produkter"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex rounded-md bg-[#c9ff35] px-4 py-2.5 text-xs font-black text-black transition hover:bg-[#d8ff68]"
              >
                Se produkter
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-[340px] space-y-1 overflow-y-auto p-3">
                {items.slice(0, 4).map((item) => (
                  <div key={item.id} className="grid grid-cols-[54px_1fr_auto] items-center gap-3 rounded-lg p-2 hover:bg-white/[.03]">
                    <div className="relative aspect-square overflow-hidden rounded-md bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]">
                      <Image src={item.image} alt={item.name} fill sizes="54px" className="object-contain p-1.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-bold text-white">{item.name}</p>
                      <p className="mt-1 text-[10px] text-zinc-500">Antall: {item.quantity}</p>
                    </div>
                    <p className="text-[11px] font-black text-white">{formatPrice(priceToNumber(item.price) * item.quantity)}</p>
                  </div>
                ))}
                {items.length > 4 && (
                  <p className="px-2 pb-1 pt-2 text-[10px] font-bold text-zinc-500">+ {items.length - 4} flere varer</p>
                )}
              </div>

              <div className="border-t border-white/10 p-4">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-zinc-400">Delsum</span>
                  <span className="font-black text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link
                    href="/handlekurv"
                    onClick={() => setOpen(false)}
                    className="rounded-md border border-white/10 px-3 py-2.5 text-center text-xs font-bold text-zinc-200 transition hover:border-white/25"
                  >
                    Handlekurv
                  </Link>
                  <Link
                    href="/kasse"
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-[#c9ff35] px-3 py-2.5 text-center text-xs font-black text-black transition hover:bg-[#d8ff68]"
                  >
                    Til kassen
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
