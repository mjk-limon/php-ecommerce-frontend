import React, { useState, useEffect } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { ShippingLocation } from '../types';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartTotalDiscount,
    cartTotalCount,
    formatPrice,
    setIsCheckoutModalOpen,
    navigateToHome,
    navigateToProduct,
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

  const currentLocation = locations.find((l) => l.id === selectedLocationId);
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
          <h2 className="font-serif font-bold text-xl text-[#1F1D1A] dark:text-[#EDE7DE]">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs text-[#736C62] dark:text-[#9E968B] max-w-sm mx-auto">
            Explore authentic imported skincare, fragrances, and health vitamins from Wellsell BD.
          </p>
          <div className="pt-2">
            <button
              onClick={navigateToHome}
              className="bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold px-6 py-3 rounded-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-16 pt-4 sm:pt-6">
      <div className="container space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-4">
          <div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              Shopping Cart
            </h1>
            <p className="text-xs text-[#736C62] dark:text-[#9E968B] mt-0.5">
              Review your selected items ({cartTotalCount}) and calculate courier shipping.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#BA2D1D] hover:underline font-medium cursor-pointer"
          >
            Clear All Items
          </button>
        </div>

        {/* 2-Column Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Cart Items Table (8 cols) */}
          <div className="lg:col-span-8 section-card p-4 sm:p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#F0EDE8] dark:border-[#2A2A2A] text-[11px] font-bold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] pb-3">
                  <tr>
                    <th className="pb-3 font-semibold">Product Description</th>
                    <th className="pb-3 text-center font-semibold">Price</th>
                    <th className="pb-3 text-center font-semibold">Quantity</th>
                    <th className="pb-3 text-right font-semibold">Total</th>
                    <th className="pb-3 text-center font-semibold w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EDE8] dark:divide-[#2A2A2A]">
                  {cart.map((item) => (
                    <tr key={item.product.id} className="hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E]/50 transition-colors">
                      <td className="py-4 pr-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            onClick={() => navigateToProduct(item.product.slug)}
                            className="w-16 h-16 object-cover rounded-xs border border-[#F0EDE8] dark:border-[#2A2A2A] cursor-pointer shrink-0"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#BA2D1D]">
                              {item.product.brand}
                            </span>
                            <h4
                              onClick={() => navigateToProduct(item.product.slug)}
                              className="font-medium text-xs text-[#1F1D1A] dark:text-[#EDE7DE] line-clamp-2 hover:text-[#BA2D1D] cursor-pointer mt-0.5"
                            >
                              {item.product.name}
                            </h4>
                            <span className="text-[11px] text-[#736C62] dark:text-[#9E968B]">
                              SKU: {item.product.sku || item.product.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-2 text-center font-mono font-medium text-[#1F1D1A] dark:text-[#EDE7DE]">
                        {formatPrice(item.product.price)}
                      </td>

                      <td className="py-4 px-2 text-center">
                        <div className="inline-flex items-center border border-[#DCD5C9] dark:border-[#38332C] rounded-xs bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#2A2A2A]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#2A2A2A]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>

                      <td className="py-4 pl-2 text-right font-mono font-bold text-sm text-[#BA2D1D] dark:text-[#E05343] tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </td>

                      <td className="py-4 pl-2 text-center">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-[#9A9184] hover:text-[#BA2D1D] transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-[#F0EDE8] dark:border-[#2A2A2A] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={navigateToHome}
                className="text-xs font-semibold text-[#BA2D1D] hover:underline flex items-center gap-1"
              >
                ← Continue Shopping
              </button>
              <span className="text-xs text-[#736C62] dark:text-[#9E968B]">
                All prices inclusive of Bangladesh VAT.
              </span>
            </div>
          </div>

          {/* Right: Order Summary Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="section-card p-5 space-y-4">
              <h3 className="font-serif font-bold text-base text-[#1F1D1A] dark:text-[#EDE7DE] border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
                Order Summary
              </h3>

              {/* Price lines */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
                  <span>Items Subtotal:</span>
                  <span className="font-mono font-medium">{formatPrice(cartSubtotal)}</span>
                </div>

                {cartTotalDiscount > 0 && (
                  <div className="flex justify-between text-[#1F6E54] dark:text-[#34A87C]">
                    <span>Promotional Catalog Discount:</span>
                    <span className="font-mono font-medium">-{formatPrice(cartTotalDiscount)}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-[#1F6E54] dark:text-[#34A87C]">
                    <span>Promo Code ({appliedCoupon.code}):</span>
                    <span className="font-mono font-medium">-{formatPrice(appliedCoupon.discount)}</span>
                  </div>
                )}

                {/* Shipping Destination Picker */}
                <div className="pt-2 border-t border-[#F0EDE8] dark:border-[#2A2A2A]">
                  <label className="block text-[11px] font-semibold text-[#736C62] dark:text-[#9E968B] mb-1">
                    Calculate Shipping Destination:
                  </label>
                  <select
                    value={selectedLocationId}
                    onChange={(e) => setSelectedLocationId(Number(e.target.value))}
                    className="w-full bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#DCD5C9] dark:border-[#38332C] text-xs p-2 rounded-xs text-[#1F1D1A] dark:text-[#EDE7DE]"
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.location} ({loc.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
                  <span>Courier Delivery ({selectedLocationId === 1 ? 'Inside Dhaka' : 'Outside Dhaka'}):</span>
                  <span className="font-mono font-medium">{formatPrice(shippingCost)}</span>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-[#F0EDE8] dark:border-[#2A2A2A] flex justify-between text-base font-bold text-[#1F1D1A] dark:text-[#EDE7DE]">
                  <span>Total Payable:</span>
                  <span className="font-mono text-[#BA2D1D] dark:text-[#E05343] tabular-nums">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-1.5 pt-2">
                <input
                  type="text"
                  placeholder="Coupon code (WELLSELL10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#DCD5C9] dark:border-[#38332C] text-xs px-2.5 py-2 rounded-xs"
                />
                <button
                  type="submit"
                  className="bg-[#1F1D1A] hover:bg-[#333] dark:bg-[#2A2A2A] text-white text-xs font-semibold px-3 py-2 rounded-xs uppercase tracking-wider cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {/* Checkout CTA */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full bg-[#BA2D1D] hover:bg-[#961F12] text-white py-3 px-4 rounded-xs font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Guarantees */}
              <div className="space-y-1.5 pt-2 text-[11px] text-[#736C62] dark:text-[#9E968B]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1F6E54]" />
                  <span>100% Genuine Imported Products</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#BA2D1D]" />
                  <span>Cash on Delivery in all 64 districts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#3498DB]" />
                  <span>7-Day Hassle-free Exchange Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
