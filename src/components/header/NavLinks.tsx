"use client";

import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { CreditCard, Package, Percent, Phone, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavLinksProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  itemClassName?: string;
  onItemClick?: () => void;
}

export const NavLinks: React.FC<NavLinksProps> = ({
  orientation = "horizontal",
  className,
  itemClassName,
  onItemClick,
}) => {
  const { user, logout } = useApp();

  if (orientation === "horizontal") {
    return (
      <nav
        className={cn(
          "items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[#4A443B] dark:text-[#C5BEB3]",
          className,
        )}
      >
        <Link href="/" className="hover:text-primary dark:hover:text-[#E05343] transition-colors py-2.5">
          Home
        </Link>
        <Link href="/brand" className="hover:text-primary dark:hover:text-[#E05343] transition-colors py-2.5">
          Brands
        </Link>
        <Link
          href="/offers"
          className="hover:text-primary dark:hover:text-[#E05343] transition-colors py-2.5 flex items-center gap-1 text-primary dark:text-[#E05343]"
        >
          <Percent className="w-3.5 h-3.5" />
          HOT OFFERS
        </Link>
        <Link
          href="/track-order"
          className="hover:text-primary dark:hover:text-[#E05343] transition-colors py-2.5 flex items-center gap-1"
        >
          <Package className="w-3.5 h-3.5 text-[#1F6E54]" />
          Track Order
        </Link>
        {!user ? (
          <>
            <Link href="/register" className="hover:text-primary dark:hover:text-[#E05343] transition-colors py-2.5">
              Join Free
            </Link>
            <Link href="/login" className="hover:text-primary dark:hover:text-[#E05343] transition-colors py-2.5">
              Sign In
            </Link>
          </>
        ) : (
          <span className="text-[11px] text-[#1F6E54] dark:text-[#34A87C] font-semibold py-2.5">
            Hi, {user.first_name}
          </span>
        )}
        <a href="tel:+8801894084242" className="hover:text-primary dark:hover:text-[#E05343] transition-colors py-2.5">
          Support
        </a>
      </nav>
    );
  }

  // Vertical orientation for mobile drawer
  return (
    <nav className={cn("flex flex-col space-y-1 text-sm font-medium", className)}>
      <Link
        href="/brand"
        onClick={onItemClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#1F1D1A] dark:text-[#EDE7DE]",
          itemClassName,
        )}
      >
        <Tag className="w-4 h-4 text-[#736C62] dark:text-[#9E968B]" />
        <span>Brands</span>
      </Link>
      <Link
        href="/offers"
        onClick={onItemClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-primary/5 text-primary dark:text-[#E05343] font-semibold",
          itemClassName,
        )}
      >
        <Percent className="w-4 h-4 text-primary dark:text-[#E05343]" />
        <span>Hot Offers</span>
      </Link>
      <Link
        href="/track-order"
        onClick={onItemClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#1F1D1A] dark:text-[#EDE7DE]",
          itemClassName,
        )}
      >
        <Package className="w-4 h-4 text-[#1F6E54]" />
        <span>Track Order</span>
      </Link>
      <Link
        href="/checkout"
        onClick={onItemClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#1F6E54] dark:text-[#34A87C]",
          itemClassName,
        )}
      >
        <CreditCard className="w-4 h-4 text-[#1F6E54] dark:text-[#34A87C]" />
        <span>Checkout</span>
      </Link>
      <a
        href="tel:+8801894084242"
        onClick={onItemClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#1F1D1A] dark:text-[#EDE7DE]",
          itemClassName,
        )}
      >
        <Phone className="w-4 h-4 text-primary" />
        <span>Support (+8801894084242)</span>
      </a>

      <div className="pt-3 border-t border-[#F0EDE8] dark:border-[#2A2A2A]">
        {!user ? (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/login"
              onClick={onItemClick}
              className="text-center py-2 px-3 rounded-lg border border-[#DCD5C9] dark:border-[#38332C] text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={onItemClick}
              className="text-center py-2 px-3 rounded-lg bg-primary hover:bg-primary-hover text-xs font-semibold text-white transition-colors"
            >
              Join Free
            </Link>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="px-3 py-1.5 text-xs text-[#736C62] dark:text-[#9E968B]">
              Signed in as{" "}
              <strong className="text-[#1F1D1A] dark:text-[#EDE7DE]">
                {user.first_name} {user.last_name}
              </strong>
            </div>
            <button
              onClick={() => {
                logout();
                onItemClick?.();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-primary hover:bg-primary/5 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
