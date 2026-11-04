"use client";

import { useApp } from "@/context/AppContext";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

export function CartToggler({ floating = true, className }: { floating?: Boolean; className?: string }) {
  const { formatPrice } = useApp();
  const { cartTotalCount, cartSubtotal, setIsCartDrawerOpen } = useCart();

  return (
    <div
      onClick={() => setIsCartDrawerOpen(true)}
      className={cn(
        "flex justify-center items-center text-center transition-all",
        floating
          ? "hidden md:flex flex-col gap-1.5 fixed right-0 top-1/2 z-40 -translate-y-1/2 p-3 shadow rounded-l-md bg-primary text-white hover:bg-primary-hover"
          : "md:hidden p-1.5 rounded-xl border border-[#DCD5C9] hover:bg-[#F5F5F5] text-[#1F1D1A] dark:text-[#EDE7DE]",
        className,
      )}
    >
      <div className="relative">
        <ShoppingCart className="h-4 w-4" />
        <span className={cn(
          "absolute -right-2 -top-2 h-4 min-w-4 rounded-full px-1 text-[9px] font-bold",
          floating ? "bg-white text-primary" : "bg-primary text-white"
        )}>
          {cartTotalCount}
        </span>
      </div>
      <div className="flex flex-col">
        {floating && <span className="text-[9px] font-medium uppercase tracking-wider text-white/75">Cart total</span>}
        <span className="text-[10px] font-semibold">{formatPrice(cartSubtotal)}</span>
      </div>
    </div>
  );
}
