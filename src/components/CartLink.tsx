"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  function closeCart({ restoreFocus = true } = {}) {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }

  useEffect(() => {
    if (!open) return;

    window.requestAnimationFrame(() => closeRef.current?.focus());

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCart();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const subtotal = items.reduce(
    (sum, item) => sum + priceToNumber(item.price) * item.quantity,
    0,
  );

  const itemLabel = itemCount === 1 ? "1 vare" : `${itemCount} varer`;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`Handlekurv med ${itemLabel}`}
        aria-expanded={open}
        aria-controls="cart-panel"
        aria-haspopup="dialog"
        className="relative flex h-11 w-11 shrink-0 items-center justify-center text-zinc-100 transition hover:text-[#c9ff35]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7">
          <path d="M3 4h2l2 11h10l2-7H6" />
          <circle cx="9" cy="19" r="1.2" />
          <circle cx="17" cy="19" r="1.2" />
        </svg>
        <span aria-hidden="true" className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9ff35] px-1 text-[10px] font-black text-black">
          {itemCount}
        </span>
      </button>

      {open && (
        <div
          id="cart-panel"
          role="dialog"
          aria-labelledby="cart-panel-title"
          className="fixed left-3 right-3 top-[76px] z-[70] max-h-[calc(100vh-88px)] overflow-hidden rounded-xl border border-white/10 bg-[#0b0f10] shadow-2xl shadow-black/50 sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[360px]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-xs font-black tracking-[.18em] text-[#c9ff35]">HANDLEKURV</p>
              <p id="cart-panel-title" className="mt-1 text-sm font-black text-white">{itemLabel}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => closeCart()}
              aria-label="Lukk handlekurv"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-zinc-300 transition hover:border-white/25 hover:text-white"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[.03] text-zinc-400">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7">
                  <path d="M3 4h2l2 11h10l2-7H6" />
                  <circle cx="9" cy="19" r="1.2" />
                  <circle cx="17" cy="19" r="1.2" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-black text-white">Handlekurven er tom</p>
              <p className="mt-2 text-xs leading-5 text-zinc-400">Legg til en sykkeldel før du går videre til kassen.</p>
              <Link
                href="/#produkter"
                onClick={() => closeCart({ restoreFocus: false })}
                className="mt-5 inline-flex min-h-11 items-center rounded-md bg-[#c9ff35] px-4 py-2.5 text-xs font-black text-black transition hover:bg-[#d8ff68]"
              >
                Se produkter
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-[min(340px,45vh)] space-y-1 overflow-y-auto p-3">
                {items.slice(0, 4).map((item) => (
                  <div key={item.id} className="grid grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg p-2 hover:bg-white/[.03]">
                    <div className="relative aspect-square overflow-hidden rounded-md bg-[radial-gradient(circle_at_50%_40%,#202627,#090b0c_72%)]">
                      <Image src={item.image} alt={item.name} fill sizes="54px" className="object-contain p-1.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="break-words text-xs font-bold text-white">{item.name}</p>
                      <p className="mt-1 text-xs text-zinc-400">Antall: {item.quantity}</p>
                    </div>
                    <p className="whitespace-nowrap text-xs font-black text-white">{formatPrice(priceToNumber(item.price) * item.quantity)}</p>
                  </div>
                ))}
                {items.length > 4 && (
                  <p className="px-2 pb-1 pt-2 text-xs font-bold text-zinc-400">+ {items.length - 4} flere varer</p>
                )}
              </div>

              <div className="border-t border-white/10 p-4">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-zinc-300">Delsum</span>
                  <span className="font-black text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link
                    href="/handlekurv"
                    onClick={() => closeCart({ restoreFocus: false })}
                    className="flex min-h-11 items-center justify-center rounded-md border border-white/10 px-3 py-2.5 text-center text-xs font-bold text-zinc-200 transition hover:border-white/25"
                  >
                    Handlekurv
                  </Link>
                  <Link
                    href="/kasse"
                    onClick={() => closeCart({ restoreFocus: false })}
                    className="flex min-h-11 items-center justify-center rounded-md bg-[#c9ff35] px-3 py-2.5 text-center text-xs font-black text-black transition hover:bg-[#d8ff68]"
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
