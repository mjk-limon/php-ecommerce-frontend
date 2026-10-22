'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { api } from '@/services/api';
import { ShippingLocation } from '@/types';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartTotalDiscount,
    cartTotalCount,
    formatPrice,
    showToast
  } = useApp();

  const [locations, setLocations] = useState<ShippingLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<number>(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  useEffect(() => {
    api.getShipping().then((res) => {
      if (res.success && res.data.locations) {
        setLocations(res.data.locations);
      }
    });
  }, []);

  const shippingCost = selectedLocationId === 1 ? 60 : 130;
  const couponDiscountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, cartSubtotal + shippingCost - couponDiscountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === 'WELLSELL10' || couponCode.toUpperCase() === 'FLASH10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
      showToast(`Coupon ${couponCode.toUpperCase()} applied! Saved Tk. ${discount}`, 'success');
      setCouponCode('');
    } else {
      showToast('Invalid promo coupon code. Try "WELLSELL10"', 'error');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="section-card max-w-lg mx-auto p-10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#BA2D1D]/10 text-[#BA2D1D] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs text-[#736C62] dark:text-[#9E968B] leading-relaxed">
            Looks like you haven't added any products to your bag yet. Explore our curated collections of authentic imported skincare, fragrances, and health vitamins.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold px-6 py-3 rounded-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Explore Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-20 pt-6 sm:pt-8">
      <div className="container space-y-8">
        {/* Header Breadcrumb */}
        <div className="section-card p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#736C62] dark:text-[#9E968B] mb-1">
              <Link href="/" className="hover:text-[#BA2D1D]">Home</Link>
              <span>›</span>
              <span className="text-[#1F1D1A] dark:text-[#EDE7DE] font-semibold">Shopping Bag</span>
            </div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              Shopping Bag ({cartTotalCount} items)
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#BA2D1D] hover:underline cursor-pointer"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* 2-Column Split: Cart Items & Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Table / List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="section-card p-4 sm:p-6 space-y-4">
              <div className="hidden sm:grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
                <span className="col-span-6">Product Item</span>
                <span className="col-span-2 text-center">Unit Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Subtotal</span>
              </div>

              <div className="space-y-4 divide-y divide-[#F0EDE8] dark:divide-[#262420]">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selected_size}`}
                    className="pt-4 first:pt-0 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                  >
                    {/* Thumbnail & Title (6 cols) */}
                    <div className="sm:col-span-6 flex gap-3 items-center">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="w-16 h-16 rounded border border-[#E8E2D9] dark:border-[#312E29] p-1 bg-[#FAFAFA] dark:bg-[#1E1E1E] shrink-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-medium text-xs text-[#1F1D1A] dark:text-[#EDE7DE] line-clamp-2 hover:text-[#BA2D1D] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <span className="text-[10px] text-[#736C62] dark:text-[#9E968B] uppercase">
                          {item.product.brand}
                        </span>
                        {item.selected_size && (
                          <span className="block text-[10px] text-[#736C62] dark:text-[#9E968B]">
                            Size: {item.selected_size}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Unit Price (2 cols) */}
                    <div className="sm:col-span-2 text-left sm:text-center text-xs font-mono">
                      <span className="sm:hidden text-[#736C62] mr-2">Unit:</span>
                      <span className="font-semibold">{formatPrice(item.product.price)}</span>
                    </div>

                    {/* Quantity (2 cols) */}
                    <div className="sm:col-span-2 flex items-center justify-start sm:justify-center">
                      <div className="flex items-center border border-[#DCD5C9] dark:border-[#38332C] rounded-xs bg-[#FBF9F5] dark:bg-[#161513]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#25221E] text-xs transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#25221E] text-xs transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Delete (2 cols) */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 text-right">
                      <span className="text-xs font-bold text-[#BA2D1D] dark:text-[#E05343] font-mono tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#9A9184] hover:text-[#BA2D1D] p-1 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shopping Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="section-card p-3.5 flex items-center gap-2.5 text-xs text-[#736C62] dark:text-[#9E968B]">
                <ShieldCheck className="w-5 h-5 text-[#1F6E54] shrink-0" />
                <span>100% Genuine Barcoded Import Guarantee</span>
              </div>
              <div className="section-card p-3.5 flex items-center gap-2.5 text-xs text-[#736C62] dark:text-[#9E968B]">
                <Truck className="w-5 h-5 text-[#BA2D1D] shrink-0" />
                <span>24-48 Hours Fast RedX Courier in Dhaka</span>
              </div>
              <div className="section-card p-3.5 flex items-center gap-2.5 text-xs text-[#736C62] dark:text-[#9E968B]">
                <RotateCcw className="w-5 h-5 text-[#1F6E54] shrink-0" />
                <span>7-Day Return Policy for Unopened Seals</span>
              </div>
            </div>
          </div>

          {/* Right Summary Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="section-card p-5 sm:p-6 space-y-5">
              <h3 className="font-serif font-bold text-base text-[#1F1D1A] dark:text-[#EDE7DE] border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
                Order Summary
              </h3>

              {/* Delivery Zone selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                  Shipping Location Zone:
                </label>
                <select
                  value={selectedLocationId}
                  onChange={(e) => setSelectedLocationId(Number(e.target.value))}
                  className="w-full bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#DCD5C9] dark:border-[#38332C] text-xs rounded-xs p-2.5 text-[#1F1D1A] dark:text-[#EDE7DE]"
                >
                  <option value={1}>Inside Dhaka City (Tk. 60 · 24-48 Hours)</option>
                  <option value={2}>Outside Dhaka City (Tk. 130 · 48-72 Hours)</option>
                </select>
              </div>

              {/* Promo Coupon Form */}
              <div className="space-y-2 pt-2 border-t border-[#F0EDE8] dark:border-[#2A2A2A]">
                <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#BA2D1D]" />
                  <span>Have a Promo Coupon?</span>
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. WELLSELL10"
                    className="flex-1 bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs text-xs px-3 py-2 text-[#1F1D1A] dark:text-[#EDE7DE] uppercase placeholder:normal-case focus:outline-none focus:border-[#BA2D1D]"
                  />
                  <button
                    type="submit"
                    className="bg-[#5C5549] hover:bg-[#453F36] text-white text-xs font-semibold px-4 py-2 rounded-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-[#1F6E54] dark:text-[#34A87C] font-semibold bg-[#1F6E54]/10 p-2 rounded-xs">
                    <span>Coupon "{appliedCoupon.code}" applied!</span>
                    <span>-Tk. {appliedCoupon.discount}</span>
                  </div>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 pt-3 border-t border-[#F0EDE8] dark:border-[#2A2A2A] text-xs">
                <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
                  <span>Items Subtotal:</span>
                  <span className="font-mono font-medium text-[#1F1D1A] dark:text-[#EDE7DE]">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
                  <span>Shipping Cost:</span>
                  <span className="font-mono font-medium text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Tk. {shippingCost}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-[#1F6E54] dark:text-[#34A87C]">
                    <span>Coupon Discount (10%):</span>
                    <span className="font-mono font-medium">-Tk. {couponDiscountAmount}</span>
                  </div>
                )}

                {cartTotalDiscount > 0 && (
                  <div className="flex justify-between text-[#1F6E54] dark:text-[#34A87C]">
                    <span>Product Catalog Discount:</span>
                    <span className="font-mono font-medium">-{formatPrice(cartTotalDiscount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#E8E2D9] dark:border-[#312E29] flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-[#1F1D1A] dark:text-[#EDE7DE]">Total Payable:</span>
                    <span className="block text-[10px] text-[#736C62] dark:text-[#9E968B]">Cash On Delivery Available</span>
                  </div>
                  <span className="text-xl font-black text-[#BA2D1D] dark:text-[#E05343] font-mono tabular-nums">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => router.push('/checkout')}
                className="w-full flex items-center justify-center gap-2 bg-[#BA2D1D] hover:bg-[#961F12] text-white py-3.5 px-6 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-xs text-[#736C62] hover:text-[#BA2D1D] transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
