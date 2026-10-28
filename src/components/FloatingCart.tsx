"use client";

import { useApp } from "@/context/AppContext";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingCart() {
  const { cartTotalCount, cartSubtotal, formatPrice, setIsCartDrawerOpen } =
    useApp();
  const [cartItemTotal, setCartItemTotal] = useState<number>(0);
  const [cartAmount, setCartAmount] = useState<number>(0);

  useEffect(() => {
    setCartItemTotal(cartTotalCount);
    setCartAmount(cartSubtotal);
  }, [cartTotalCount, cartSubtotal]);

  return (
    <button
      type="button"
      onClick={() => setIsCartDrawerOpen(true)}
      className="fixed right-0 top-1/2 z-40 -translate-y-1/2 text-center rounded-l-md bg-primary px-3 py-3 text-white shadow transition-all hover:bg-primary-hover hover:pr-4 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#68183f]"
    >
      <span className="inline-block relative h-6 w-6">
        <ShoppingCart className="h-5 w-5" />
        <span className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-white px-1 text-[9px] font-bold text-[#68183f]">
          {cartItemTotal}
        </span>
      </span>
      <span className="block">
        <span className="block text-[9px] font-medium uppercase tracking-wider text-white/75">
          Cart total
        </span>
        <span className="mt-0.5 block text-xs font-semibold leading-tight">
          {formatPrice(cartAmount)}
        </span>
      </span>
    </button>
  );
}
