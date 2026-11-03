"use client";

import { useApp } from "@/context/AppContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export function NavCart() {
  const { formatPrice } = useApp();
  const { cartTotalCount, cartSubtotal, setIsCartDrawerOpen } = useCart();

  return (
    <div
      onClick={() => setIsCartDrawerOpen(true)}
      className="md:hidden flex justify-center items-center gap-1.5 p-1.5 rounded-xl border border-[#DCD5C9] dark:border-[#38332C] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors cursor-pointer"
    >
      <span className="relative">
        <ShoppingCart className="w-4 h-4 text-primary" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary text-white text-[10px] font-semibold flex items-center justify-center">
          {cartTotalCount}
        </span>
      </span>
      <div className="flex flex-col">
        <span className="text-[10px]">{formatPrice(cartSubtotal)}</span>
      </div>
    </div>
  );
}
