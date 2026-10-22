'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  border?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, border = false }) => {
  const {
    addToCart,
    quickBuy,
    formatPrice,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className={"group bg-white dark:bg-[#1E1E1E] rounded-xs hover:shadow-md p-3 flex flex-col justify-between relative " + (border ? "border border-[#F0EDE8]" : '')}>
      {/* Discount badge */}
      {product.discount && product.discount > 0 ? (
        <span className="absolute top-2 right-2 z-10 bg-[#BA2D1D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs tracking-wider shadow-xs">
          -{product.discount}%
        </span>
      ) : ''}

      {/* Wishlist toggle button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        aria-label="Save to wishlist"
        className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full bg-white/95 dark:bg-[#2A2A2A]/95 shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#BA2D1D] cursor-pointer"
      >
        <Heart
          className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#BA2D1D] text-[#BA2D1D]' : 'text-[#736C62]'
            }`}
        />
      </button>

      {/* Image container with Link */}
      <Link
        href={`/product/${product.slug}`}
        className="relative w-full aspect-square overflow-hidden bg-[#FAFAFA] dark:bg-[#171717] mb-3 flex items-center justify-center cursor-pointer rounded-xs block"
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Product metadata */}
      <div className="flex-1 flex flex-col justify-between">
        <Link
          href={`/product/${product.slug}`}
          className="cursor-pointer block"
        >
          <p className="text-[10px] uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] font-medium mb-1 truncate">
            {product.brand}
          </p>
          <h3 className="text-xs font-medium text-[#1F1D1A] dark:text-[#EDE7DE] line-clamp-2 leading-relaxed min-h-10 group-hover:text-[#BA2D1D] dark:group-hover:text-[#E05343] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="mt-2.5 mb-3 flex items-baseline gap-2">
          <span className="font-bold text-sm text-[#BA2D1D] dark:text-[#E05343] font-mono tabular-nums">
            {formatPrice(product.price || 0)}
          </span>
          {product.old_price && (
            <span className="text-[11px] text-[#9A9184] line-through font-mono tabular-nums">
              {formatPrice(product.old_price)}
            </span>
          )}
        </div>

        {/* Action Buttons: Add To Cart (dark gray) & Buy Now (deep maroon/crimson) */}
        <div className="grid grid-cols-2 gap-1.5 pt-1 dark:border-[#2A2A2A]">
          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center justify-center gap-1 bg-[#5C5549] hover:bg-[#453F36] dark:bg-[#383838] dark:hover:bg-[#4A4A4A] text-white text-[11px] font-medium py-1.5 px-2 rounded transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            <span className="truncate">Add To Cart</span>
          </button>
          <button
            onClick={() => quickBuy(product, 1)}
            className="flex items-center justify-center gap-1 bg-[#BA2D1D] hover:bg-[#961F12] text-white text-[11px] font-semibold py-1.5 px-2 rounded transition-colors shadow-2xs cursor-pointer"
          >
            <span className="truncate">Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
