"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/handlekurv"
      aria-label={`Handlekurv med ${itemCount} varer`}
      className="relative flex h-10 w-10 items-center justify-center text-zinc-100"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.7">
        <path d="M3 4h2l2 11h10l2-7H6" />
        <circle cx="9" cy="19" r="1.2" />
        <circle cx="17" cy="19" r="1.2" />
      </svg>
      <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9ff35] px-1 text-[9px] font-black text-black">
        {itemCount}
      </span>
    </Link>
  );
}
