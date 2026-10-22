'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  User as UserIcon,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Tag,
  Lock,
  Clock
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { api } from '@/services/api';
import { PaymentMethod, ShippingLocation, ShippingMethod } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    cartTotalDiscount,
    cartTotalCount,
    formatPrice,
    clearCart,
    showToast,
    user
  } = useApp();

  const [locations, setLocations] = useState<ShippingLocation[]>([]);
  const [methods, setMethods] = useState<ShippingMethod[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Form states
  const [customerName, setCustomerName] = useState(
    user ? `${user.first_name} ${user.last_name}` : ''
  );
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerAddress, setCustomerAddress] = useState(user?.address || '');
  const [selectedLocationId, setSelectedLocationId] = useState<number>(1); // 1 = Inside Dhaka, 2 = Outside Dhaka
  const [selectedMethodId, setSelectedMethodId] = useState<number>(1);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number>(2); // 2 = Cash on Delivery
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Promo coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  useEffect(() => {
    Promise.all([api.getShipping(), api.getPaymentMethods()])
      .then(([shippingRes, payRes]) => {
        if (shippingRes.success) {
          setLocations(shippingRes.data.locations);
          setMethods(shippingRes.data.methods);
        }
        if (payRes.success) {
          setPaymentMethods(payRes.data);
        }
      })
      .finally(() => setLoadingConfig(false));
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
      showToast('Invalid coupon code. Use "WELLSELL10" for 10% discount.', 'error');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your cart is empty. Add products before placing order.', 'error');
      return;
    }
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      showToast('Please provide your name, phone number, and delivery address.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        location_id: selectedLocationId,
        shipping_id: selectedMethodId,
        shipping_name: customerName,
        shipping_phone: customerPhone,
        shipping_address: customerAddress,
        shipment_type: selectedLocationId === 1 ? 'Inside Dhaka City (24-48h)' : 'Outside Dhaka City (48-72h)',
        total_cart_item: cartTotalCount,
        total_cart_item_price: cartSubtotal,
        total_discount: cartTotalDiscount + couponDiscountAmount,
        total_shipping_cost: shippingCost,
        subtotal: grandTotal,
        coupon_ids: appliedCoupon ? [appliedCoupon.code] : [],
        payment: {
          method_id: selectedPaymentId,
          amount: grandTotal,
          gateway_response: []
        },
        items: cart.map((item) => ({
          product_id: item.product.id,
          variant_id: 1,
          product_name: item.product.name,
          variant_info: {
            size: item.selected_size || 'Default',
            color: item.selected_color || 'Standard'
          },
          quantity: item.quantity,
          unit_price: item.product.price,
          price_total: item.product.price * item.quantity,
          shipping_total: 0,
          discount_total: item.product.old_price
            ? (item.product.old_price - item.product.price) * item.quantity
            : 0,
          item_total: item.product.price * item.quantity
        }))
      };

      const res = await api.createOrder(payload);
      if (res.success && res.data.invoice_number) {
        clearCart();
        showToast(`Order placed successfully! Invoice #${res.data.invoice_number}`, 'success');
        router.push(`/invoice/${res.data.invoice_number}`);
      } else {
        showToast('Order creation failed. Please check form details.', 'error');
      }
    } catch {
      showToast('Server error processing order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is completely empty
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="section-card p-10 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#BA2D1D]/10 text-[#BA2D1D] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
            Your Bag is Empty
          </h1>
          <p className="text-xs text-[#736C62] dark:text-[#9E968B] leading-relaxed">
            There are no items ready for checkout. Browse our imported skincare, perfumes, and health vitamins to continue.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold px-6 py-3 rounded-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-20 pt-6 sm:pt-8 bg-[#FAFAFA] dark:bg-[#121212] min-h-[80vh]">
      <div className="container space-y-6 sm:space-y-8">
        {/* Step Indicator Header */}
        <div className="section-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#736C62] dark:text-[#9E968B] mb-1">
              <Link href="/" className="hover:text-[#BA2D1D]">Home</Link>
              <span>›</span>
              <Link href="/cart" className="hover:text-[#BA2D1D]">Cart</Link>
              <span>›</span>
              <span className="text-[#1F1D1A] dark:text-[#EDE7DE] font-semibold">Checkout</span>
            </div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              Express & Secure Checkout
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-6 h-6 rounded-full bg-[#1F6E54] text-white flex items-center justify-center font-bold text-[11px]">
              ✓
            </span>
            <span className="text-[#1F6E54] font-medium hidden sm:inline">1. Cart</span>
            <span className="text-[#9A9184]">——</span>
            <span className="w-6 h-6 rounded-full bg-[#BA2D1D] text-white flex items-center justify-center font-bold text-[11px]">
              2
            </span>
            <span className="font-bold text-[#BA2D1D]">2. Delivery & Payment</span>
            <span className="text-[#9A9184]">——</span>
            <span className="w-6 h-6 rounded-full bg-[#E8E2D9] dark:bg-[#312E29] text-[#736C62] flex items-center justify-center font-bold text-[11px]">
              3
            </span>
            <span className="text-[#736C62] dark:text-[#9E968B] hidden sm:inline">3. Invoice</span>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Form: Shipping Address, Zone & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Customer & Shipping Details */}
            <div className="section-card p-5 sm:p-7 space-y-5">
              <div className="flex items-center gap-2 border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
                <MapPin className="w-5 h-5 text-[#BA2D1D]" />
                <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
                  1. Delivery Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Full Name <span className="text-[#BA2D1D]">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#9A9184] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Receiver's full name"
                      className="w-full bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs text-xs py-2.5 pl-9 pr-3 text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Phone Number (BD) <span className="text-[#BA2D1D]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#9A9184] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs text-xs py-2.5 pl-9 pr-3 text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                    />
                  </div>
                  <span className="text-[10px] text-[#736C62] dark:text-[#9E968B]">
                    For SMS delivery tracking and rider confirmation
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs text-xs py-2.5 px-3 text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Delivery Area / Zone <span className="text-[#BA2D1D]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setSelectedLocationId(1)}
                      className={`p-3.5 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                        selectedLocationId === 1
                          ? 'border-[#BA2D1D] bg-[#FDF7F5] dark:bg-[#261E1C] shadow-xs'
                          : 'border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#1A1916] hover:border-[#BA2D1D]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping_location"
                        checked={selectedLocationId === 1}
                        onChange={() => setSelectedLocationId(1)}
                        className="mt-0.5 text-[#BA2D1D] focus:ring-[#BA2D1D]"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-[#1F1D1A] dark:text-[#EDE7DE] flex items-center justify-between">
                          <span>Inside Dhaka City</span>
                          <span className="text-[#BA2D1D] font-mono font-bold">Tk. 60</span>
                        </div>
                        <p className="text-[11px] text-[#736C62] dark:text-[#9E968B] mt-0.5">
                          Delivery in 24 - 48 Hours via RedX Express
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedLocationId(2)}
                      className={`p-3.5 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                        selectedLocationId === 2
                          ? 'border-[#BA2D1D] bg-[#FDF7F5] dark:bg-[#261E1C] shadow-xs'
                          : 'border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#1A1916] hover:border-[#BA2D1D]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping_location"
                        checked={selectedLocationId === 2}
                        onChange={() => setSelectedLocationId(2)}
                        className="mt-0.5 text-[#BA2D1D] focus:ring-[#BA2D1D]"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-[#1F1D1A] dark:text-[#EDE7DE] flex items-center justify-between">
                          <span>Outside Dhaka City</span>
                          <span className="text-[#BA2D1D] font-mono font-bold">Tk. 130</span>
                        </div>
                        <p className="text-[11px] text-[#736C62] dark:text-[#9E968B] mt-0.5">
                          Delivery in 48 - 72 Hours (All 64 Districts)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Full Delivery Address <span className="text-[#BA2D1D]">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="House number, flat, road, area, sector, thana, district"
                    className="w-full bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs text-xs p-3 text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Call before delivery, leave with security guard, etc."
                    className="w-full bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs text-xs py-2 px-3 text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="section-card p-5 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
                <CreditCard className="w-5 h-5 text-[#BA2D1D]" />
                <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
                  2. Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* Cash On Delivery */}
                <div
                  onClick={() => setSelectedPaymentId(2)}
                  className={`p-4 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedPaymentId === 2
                      ? 'border-[#BA2D1D] bg-[#FDF7F5] dark:bg-[#261E1C] shadow-xs'
                      : 'border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#1A1916] hover:border-[#BA2D1D]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={selectedPaymentId === 2}
                    onChange={() => setSelectedPaymentId(2)}
                    className="mt-1 text-[#BA2D1D] focus:ring-[#BA2D1D]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1F1D1A] dark:text-[#EDE7DE]">
                        Cash On Delivery (COD)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1F6E54]/10 text-[#1F6E54]">
                        Recommended
                      </span>
                    </div>
                    <p className="text-[11px] text-[#736C62] dark:text-[#9E968B] mt-1">
                      Pay in cash to the delivery rider when your sealed parcel arrives. Check serial code before opening.
                    </p>
                  </div>
                </div>

                {/* bKash Mobile Banking */}
                <div
                  onClick={() => setSelectedPaymentId(3)}
                  className={`p-4 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedPaymentId === 3
                      ? 'border-[#BA2D1D] bg-[#FDF7F5] dark:bg-[#261E1C] shadow-xs'
                      : 'border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#1A1916] hover:border-[#BA2D1D]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={selectedPaymentId === 3}
                    onChange={() => setSelectedPaymentId(3)}
                    className="mt-1 text-[#BA2D1D] focus:ring-[#BA2D1D]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1F1D1A] dark:text-[#EDE7DE] flex items-center gap-2">
                        <span>bKash / Nagad Mobile Banking</span>
                        <span className="text-[10px] font-bold text-[#BA2D1D]">bKash</span>
                      </span>
                      <span className="text-[10px] text-[#736C62] font-mono">0% Fee</span>
                    </div>
                    <p className="text-[11px] text-[#736C62] dark:text-[#9E968B] mt-1">
                      Pay instantly from your bKash or Nagad wallet with instant payment verification.
                    </p>
                  </div>
                </div>

                {/* Card / Online Payment */}
                <div
                  onClick={() => setSelectedPaymentId(1)}
                  className={`p-4 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedPaymentId === 1
                      ? 'border-[#BA2D1D] bg-[#FDF7F5] dark:bg-[#261E1C] shadow-xs'
                      : 'border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#1A1916] hover:border-[#BA2D1D]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={selectedPaymentId === 1}
                    onChange={() => setSelectedPaymentId(1)}
                    className="mt-1 text-[#BA2D1D] focus:ring-[#BA2D1D]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1F1D1A] dark:text-[#EDE7DE]">
                        Credit / Debit Card (VISA, MasterCard, AMEX)
                      </span>
                      <Lock className="w-3.5 h-3.5 text-[#1F6E54]" />
                    </div>
                    <p className="text-[11px] text-[#736C62] dark:text-[#9E968B] mt-1">
                      Encrypted 256-bit SSL transaction via automated payment gateway.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary: Items, Coupon, Totals & Place Order CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="section-card p-5 sm:p-7 space-y-5 sticky top-20">
              <div className="flex items-center justify-between border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
                <h3 className="font-serif font-bold text-base text-[#1F1D1A] dark:text-[#EDE7DE]">
                  Order Summary ({cartTotalCount} items)
                </h3>
                <Link
                  href="/cart"
                  className="text-xs text-[#BA2D1D] hover:underline font-semibold"
                >
                  Edit Bag
                </Link>
              </div>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-[#F0EDE8] dark:divide-[#262420] pr-1">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selected_size}`} className="pt-3 first:pt-0 flex gap-3">
                    <div className="w-12 h-12 rounded border border-[#E8E2D9] dark:border-[#312E29] p-1 bg-[#FAFAFA] dark:bg-[#1A1916] shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-[#1F1D1A] dark:text-[#EDE7DE] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-[#736C62] dark:text-[#9E968B]">
                        Qty: {item.quantity} {item.selected_size ? `· Size: ${item.selected_size}` : ''}
                      </p>
                      <div className="text-xs font-bold text-[#BA2D1D] dark:text-[#E05343] font-mono mt-0.5">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupon Box */}
              <div className="pt-2 border-t border-[#F0EDE8] dark:border-[#2A2A2A]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-2">
                  <Tag className="w-3.5 h-3.5 text-[#BA2D1D]" />
                  <span>Promotional Coupon Code</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. WELLSELL10"
                    className="flex-1 bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs text-xs px-3 py-2 text-[#1F1D1A] dark:text-[#EDE7DE] uppercase placeholder:normal-case focus:outline-none focus:border-[#BA2D1D]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-[#5C5549] hover:bg-[#453F36] text-white text-xs font-semibold px-4 py-2 rounded-xs transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-[#1F6E54] dark:text-[#34A87C] mt-2 font-medium bg-[#1F6E54]/10 p-2 rounded-xs">
                    <span>Coupon "{appliedCoupon.code}" applied!</span>
                    <span>-Tk. {appliedCoupon.discount}</span>
                  </div>
                )}
              </div>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-[#F0EDE8] dark:border-[#2A2A2A] space-y-2 text-xs">
                <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
                  <span>Subtotal:</span>
                  <span className="font-mono font-medium text-[#1F1D1A] dark:text-[#EDE7DE]">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
                  <span>Delivery Charge:</span>
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
                    <span>Catalog Product Savings:</span>
                    <span className="font-mono font-medium">-{formatPrice(cartTotalDiscount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#E8E2D9] dark:border-[#312E29] flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-[#1F1D1A] dark:text-[#EDE7DE]">Grand Total:</span>
                    <span className="block text-[10px] text-[#736C62] dark:text-[#9E968B]">Inclusive of all taxes</span>
                  </div>
                  <span className="text-xl font-black text-[#BA2D1D] dark:text-[#E05343] font-mono tabular-nums">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#BA2D1D] hover:bg-[#961F12] text-white py-3.5 px-6 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Your Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="pt-2 border-t border-[#F0EDE8] dark:border-[#2A2A2A] space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-[#736C62] dark:text-[#9E968B]">
                  <ShieldCheck className="w-4 h-4 text-[#1F6E54] shrink-0" />
                  <span>100% Genuine batch import guarantees with barcode verification</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#736C62] dark:text-[#9E968B]">
                  <Truck className="w-4 h-4 text-[#BA2D1D] shrink-0" />
                  <span>Official RedX / Pathao courier with live tracking</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
