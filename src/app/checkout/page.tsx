"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/select";
import { useApp } from "@/context/AppContext";
import { useCart } from "@/context/CartContext";
import { asset } from "@/lib/utils";
import { api } from "@/services/api";
import { OrderCreatePayload } from "@/types";
import { ArrowRight, CreditCard, MapPin, Phone, ShoppingBag, Tag, Truck, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { formatPrice, showToast, user } = useApp();

  const {
    cart,
    isCartLoaded,
    cartSubtotal,
    cartTotalDiscount,
    cartTotalCount,
    clearCart,
    locations,
    methods,
    selectedLocationId,
    setSelectedLocationId,
    selectedLocation,
    selectedMethodId,
    setSelectedMethodId,
    shippingCost,
    shippingEstimateTime,
    calculateShippingCost,
  } = useCart();

  // Form states
  const [customerName, setCustomerName] = useState(user ? `${user.first_name} ${user.last_name}` : "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [customerAddress, setCustomerAddress] = useState(user?.address || "");
  const [selectedPaymentId, setSelectedPaymentId] = useState<number>(2);
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Promo coupon
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  // Delivery location options: label = district, sublabel = division
  const locationOptions = useMemo<SelectOption<number>[]>(() => {
    return locations.map((loc) => ({
      value: loc.id,
      label: loc.location,
      sublabel: loc.city ? `${loc.city} Division` : "Bangladesh",
      group: loc.city ? `${loc.city} Division` : "Other",
      icon: <MapPin className="w-4 h-4 text-primary shrink-0" />,
    }));
  }, [locations]);

  // Preferred courier options: logo at left, name at label, delivery time and cost at sublabel
  const courierOptions = useMemo<SelectOption<number>[]>(() => {
    return methods.map((method) => {
      const ct = calculateShippingCost(selectedLocationId, method.id);
      const logoUrl = method.method_logo ? asset(method.method_logo) : null;

      return {
        value: method.id,
        label: method.method_name,
        sublabel: `${ct.estimateTime} · Tk. ${ct.cost}`,
        icon: logoUrl ? (
          <img
            src={logoUrl}
            alt={method.method_name}
            className="w-5 h-5 object-contain rounded-xs"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
          />
        ) : (
          <Truck className="w-4 h-4 text-primary shrink-0" />
        ),
      };
    });
  }, [methods, selectedLocationId, calculateShippingCost]);

  const couponDiscountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, cartSubtotal + shippingCost - couponDiscountAmount);

  const handleApplyCoupon = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    showToast("Invalid coupon code.", "error");
  };

  const handlePlaceOrder = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Your cart is empty. Add products before placing order.", "error");
      return;
    }
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      showToast("Please provide your name, phone number, and delivery address.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload: OrderCreatePayload = {
        location_id: selectedLocationId,
        shipping_id: selectedMethodId,
        shipping_name: customerName,
        shipping_phone: customerPhone,
        shipping_address: customerAddress,
        shipment_type: "normal",
        total_cart_item: cartTotalCount,
        total_cart_item_price: cartSubtotal,
        total_discount: cartTotalDiscount + couponDiscountAmount,
        total_shipping_cost: shippingCost,
        subtotal: grandTotal,
        coupon_ids: appliedCoupon ? [appliedCoupon.code] : [],
        payment: {
          method_id: selectedPaymentId,
          amount: grandTotal,
          gateway_response: [],
        },
        items: cart.map((item) => ({
          product_id: item.product.id,
          variant_id: item.variant.id,
          product_name: item.product.name,
          variant_info: {
            brand: item.product.brand || "",
            sku: item.product.sku || "SKU-STD",
            ...(item.variant.size ? { size: item.variant.size } : {}),
            ...(item.variant.color ? { color: item.variant.color } : {}),
          },
          quantity: item.quantity,
          unit_price: item.unit_price,
          price_total: item.total_price,
          shipping_total: 0,
          discount_total: item.discount_total,
          item_total: item.total_price,
        })),
      };

      const res = await api.createOrder(orderPayload);

      if (res.success && res.data) {
        clearCart();
        showToast("Order successfully confirmed! Redirecting to invoice...", "success");

        router.push(`/invoice/${res.data.invoice_number}`);
      } else {
        showToast("Failed to complete order. Please try again.", "error");
      }
    } catch {
      showToast("Server error processing order. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is completely empty
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Card className="p-10 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          {isCartLoaded ? (
            <>
              <h1 className="font-bold text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">Your Bag is Empty</h1>
              <p className="text-xs text-[#736C62] dark:text-[#9E968B] leading-relaxed">
                There are no items ready for checkout. Browse our imported skincare, perfumes, and health vitamins to
                continue.
              </p>
              <div className="pt-2">
                <Link href="/">
                  <Button variant="default" size="lg" className="gap-2 uppercase tracking-wider text-xs font-semibold">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <h1 className="font-bold text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">Checking Your Cart...</h1>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full pb-20 pt-6 sm:pt-8 bg-[#FAFAFA] dark:bg-[#121212] min-h-[80vh]">
      <div className="container space-y-6 sm:space-y-8">
        {/* Step Indicator Header */}
        <Card className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#736C62] dark:text-[#9E968B] mb-1">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>›</span>
              <Link href="/cart" className="hover:text-primary">
                Cart
              </Link>
              <span>›</span>
              <span className="text-[#1F1D1A] dark:text-[#EDE7DE] font-semibold">Checkout</span>
            </div>
            <h1 className="font-bold text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              Express &amp; Secure Checkout
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-6 h-6 rounded-full bg-[#1F6E54] text-white flex items-center justify-center font-bold text-[11px]">
              ✓
            </span>
            <span className="text-[#1F6E54] font-medium hidden sm:inline">1. Cart</span>
            <span className="text-[#9A9184]">——</span>
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[11px]">
              2
            </span>
            <span className="font-bold text-primary">2. Delivery &amp; Payment</span>
            <span className="text-[#9A9184]">——</span>
            <span className="w-6 h-6 rounded-full bg-[#E8E2D9] dark:bg-[#312E29] text-[#736C62] flex items-center justify-center font-bold text-[11px]">
              3
            </span>
            <span className="text-[#736C62] dark:text-[#9E968B] hidden sm:inline">3. Invoice</span>
          </div>
        </Card>

        {/* Main 2-Column Grid */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Form: Shipping Address, Zone & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Customer & Shipping Details */}
            <Card className="p-5 sm:p-7 space-y-5">
              <div className="flex items-center gap-2 border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
                  1. Delivery Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Receiver's full name"
                    icon={<UserIcon className="w-4 h-4 text-[#9A9184]" />}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Phone Number (BD) <span className="text-primary">*</span>
                  </label>
                  <Input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    icon={<Phone className="w-4 h-4 text-[#9A9184]" />}
                  />
                  <span className="text-[10px] text-[#736C62] dark:text-[#9E968B]">
                    For SMS delivery tracking and rider confirmation
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">Email Address</label>
                  <Input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@domain.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Delivery Location / District <span className="text-primary">*</span>
                  </label>
                  <Select
                    options={locationOptions}
                    value={selectedLocationId}
                    onChange={(val) => setSelectedLocationId(Number(val))}
                    placeholder="Select delivery district"
                    searchPlaceholder="Search district or division..."
                    searchable
                    groupBy
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Preferred Courier <span className="text-primary">*</span>
                  </label>
                  <Select
                    options={courierOptions}
                    value={selectedMethodId}
                    onChange={(val) => setSelectedMethodId(Number(val))}
                    placeholder="Select preferred courier"
                    searchPlaceholder="Search courier service..."
                    searchable
                    groupBy={false}
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Full Delivery Address <span className="text-primary">*</span>
                  </label>
                  <Input
                    multiline
                    rows={3}
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="House number, flat, road, area, sector, thana, district"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Special Delivery Instructions (Optional)
                  </label>
                  <Input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Leave with gate security / Call before delivery"
                  />
                </div>
              </div>
            </Card>

            {/* 2. Payment Method */}
            <Card className="p-5 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">2. Payment Method</h2>
              </div>

              <div className="space-y-3">
                {/* Cash On Delivery */}
                <div
                  onClick={() => setSelectedPaymentId(2)}
                  className={`p-4 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedPaymentId === 2
                      ? "border-[#BA2D1D] bg-[#FDF7F5] dark:bg-[#261E1C] shadow-xs"
                      : "border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#1A1916] hover:border-[#BA2D1D]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={selectedPaymentId === 2}
                    onChange={() => setSelectedPaymentId(2)}
                    className="mt-1 text-primary focus:ring-[#BA2D1D]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1F1D1A] dark:text-[#EDE7DE]">
                        Cash On Delivery (COD)
                      </span>
                      <Badge variant="success">Recommended</Badge>
                    </div>
                    <p className="text-[11px] text-[#736C62] dark:text-[#9E968B] mt-1">
                      Pay in cash to the delivery rider when your sealed parcel arrives. Check serial code before
                      opening.
                    </p>
                  </div>
                </div>

                {/* bKash Mobile Banking */}
                <div
                  onClick={() => setSelectedPaymentId(3)}
                  className={`p-4 rounded-xs border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedPaymentId === 3
                      ? "border-[#BA2D1D] bg-[#FDF7F5] dark:bg-[#261E1C] shadow-xs"
                      : "border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#1A1916] hover:border-[#BA2D1D]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={selectedPaymentId === 3}
                    onChange={() => setSelectedPaymentId(3)}
                    className="mt-1 text-primary focus:ring-[#BA2D1D]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1F1D1A] dark:text-[#EDE7DE] flex items-center gap-2">
                        <span>bKash / Nagad Mobile Banking</span>
                        <span className="text-[10px] font-bold text-primary">bKash</span>
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
                      ? "border-[#BA2D1D] bg-[#FDF7F5] dark:bg-[#261E1C] shadow-xs"
                      : "border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#1A1916] hover:border-[#BA2D1D]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={selectedPaymentId === 1}
                    onChange={() => setSelectedPaymentId(1)}
                    className="mt-1 text-primary focus:ring-[#BA2D1D]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1F1D1A] dark:text-[#EDE7DE]">
                        Visa / MasterCard / AMEX
                      </span>
                      <span className="text-[10px] text-[#736C62] font-mono">SSLCommerz</span>
                    </div>
                    <p className="text-[11px] text-[#736C62] dark:text-[#9E968B] mt-1">
                      Pay securely with 256-bit encrypted checkout via local &amp; international credit or debit cards.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Summary: Items, Coupon, Totals & Place Order CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-5 sm:p-7 space-y-5 sticky top-20">
              <div className="flex items-center justify-between border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
                <h3 className="font-bold text-base text-[#1F1D1A] dark:text-[#EDE7DE]">
                  Order Summary ({cartTotalCount} items)
                </h3>
                <Link href="/cart" className="text-xs text-primary hover:underline font-semibold">
                  Edit Bag
                </Link>
              </div>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-[#F0EDE8] dark:divide-[#262420] pr-1">
                {cart.map((item) => {
                  return (
                    <div key={`${item.product.id}-${item.variant.id}`} className="pt-3 first:pt-0 flex gap-3">
                      <div className="w-12 h-12 rounded border border-[#E8E2D9] dark:border-[#312E29] p-1 bg-[#FAFAFA] dark:bg-[#1A1916] shrink-0">
                        <img
                          src={asset(item.product.thumbnail)}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-[#1F1D1A] dark:text-[#EDE7DE] truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#736C62] dark:text-[#9E968B] mt-0.5">
                          <span>Qty: {item.quantity}</span>
                          {item.variant.size && <span>· Size: {item.variant.size}</span>}
                          {item.variant.color && <span>· Color: {item.variant.color}</span>}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-[#736C62] font-mono">
                            {formatPrice(item.unit_price)} each
                          </span>
                          <span className="text-xs font-bold text-primary dark:text-[#E05343] font-mono">
                            {formatPrice(item.total_price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo Coupon Box */}
              <div className="pt-2 border-t border-[#F0EDE8] dark:border-[#2A2A2A]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-2">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  <span>Promotional Coupon Code</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. WELLSELL10"
                    className="uppercase placeholder:normal-case font-mono"
                  />
                  <Button
                    type="button"
                    variant="dark"
                    size="default"
                    onClick={handleApplyCoupon}
                    className="text-xs font-semibold uppercase tracking-wider shrink-0"
                  >
                    Apply
                  </Button>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-[#1F6E54] dark:text-[#34A87C] mt-2 font-medium bg-[#1F6E54]/10 p-2 rounded-xs">
                    <span>Coupon &quot;{appliedCoupon.code}&quot; applied!</span>
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
                  <span>Courier Delivery ({shippingEstimateTime}):</span>
                  <span className="font-mono font-medium text-[#1F1D1A] dark:text-[#EDE7DE]">Tk. {shippingCost}</span>
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
                  <span className="text-xl font-black text-primary dark:text-[#E05343] font-mono tabular-nums">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                className="w-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 py-3.5"
              >
                <span>Confirm &amp; Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
