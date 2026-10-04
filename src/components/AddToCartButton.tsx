"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        compact
          ? "mt-2.5 w-full rounded-md bg-[#c9ff35] px-2 py-2.5 text-[10px] font-black text-black transition hover:bg-[#d8ff68] sm:text-[11px]"
          : "flex-1 rounded-md bg-[#c9ff35] px-6 py-3.5 text-sm font-black text-black transition hover:bg-[#d8ff68]"
      }
    >
      {added ? "Lagt i kurven ✓" : compact ? "Legg i kurv" : "Legg i handlekurv"}
    </button>
  );
}
