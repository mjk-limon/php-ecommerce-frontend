"use client";

import { Badge } from "@/components/ui/badge";
import { asset } from "@/lib/utils";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useApp } from "../context/AppContext";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  border?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, border = false }) => {
  const { addToCart, quickBuy, formatPrice, toggleWishlist, isInWishlist } = useApp();

  const isFavorited = isInWishlist(product.id);

  return (
    <div
      className={
        "group bg-white dark:bg-[#1E1E1E] rounded-xs hover:shadow-md p-3 flex flex-col justify-between relative transition-shadow duration-200 " +
        (border ? "border border-[#F0EDE8] dark:border-[#2A2A2A]" : "")
      }
    >
      {/* Discount badge */}
      {Boolean(product.discount) && (
        <Badge variant="discount" className="absolute top-2 right-2 z-10">
          -{product.discount}%
        </Badge>
      )}

      {/* Wishlist toggle button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        aria-label="Save to wishlist"
        className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full bg-white/95 dark:bg-[#2A2A2A]/95 shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary cursor-pointer"
      >
        <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-[#BA2D1D] text-primary" : "text-[#736C62]"}`} />
      </button>

      {/* Image container with Link */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-full aspect-square overflow-hidden bg-[#FAFAFA] dark:bg-[#171717] mb-3 flex items-center justify-center cursor-pointer rounded-xs block"
      >
        <Image
          src={asset(product.thumbnail, "assets/images/product-placeholder.png")}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Product metadata */}
      <div className="flex-1 flex flex-col justify-between">
        <Link href={`/product/${product.slug}`} className="cursor-pointer block">
          <h3 className="text-xs font-medium text-[#1F1D1A] dark:text-[#EDE7DE] line-clamp-2 leading-relaxed min-h-10 group-hover:text-primary dark:group-hover:text-[#E05343] transition-colors">
            {product.name}
          </h3>
          {product.brand && (
            <p className="text-[10px] uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] font-medium mb-1 truncate">
              {product.brand}
            </p>
          )}
        </Link>

        {/* Pricing */}
        <div className="mt-2.5 mb-3 flex items-baseline gap-2">
          <span className="font-bold text-sm text-primary dark:text-[#E05343] font-mono tabular-nums">
            {formatPrice(product.price, product.discount)}
          </span>

          {Boolean(product.discount) && (
            <span className="text-[11px] text-[#9A9184] line-through font-mono tabular-nums">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Action Buttons: Add To Cart (dark gray) & Buy Now (deep maroon/crimson) */}
        <div className="grid sm:grid-cols-2 gap-1.5 pt-1 dark:border-[#2A2A2A]">
          <button
            type="button"
            onClick={() => addToCart(product, product.variants[0])}
            className="flex items-center justify-center gap-1 bg-[#5C5549] hover:bg-[#453F36] dark:bg-[#383838] dark:hover:bg-[#4A4A4A] text-white text-[11px] font-medium py-1.5 px-2 rounded-xs transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            <span className="truncate">Add To Cart</span>
          </button>
          <button
            type="button"
            onClick={() => quickBuy(product, product.variants[0])}
            className="flex items-center justify-center gap-1 bg-primary hover:bg-primary-hover text-white text-[11px] font-semibold py-1.5 px-2 rounded-xs transition-colors shadow-2xs cursor-pointer"
          >
            <span className="truncate">Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
