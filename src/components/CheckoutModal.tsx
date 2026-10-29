"use client"

import { asset } from '@/lib/utils';
import { CreditCard, MapPin, ShoppingBag, Truck, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    formatPrice,
    openInvoice,
    showToast,
    user
  } = useApp();

  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
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

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Form states
  const [selectedPaymentId, setSelectedPaymentId] = useState<number>(2); // 2 is Cash on Delivery
  const [customerName, setCustomerName] = useState(user ? `${user.first_name} ${user.last_name}` : '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerAddress, setCustomerAddress] = useState(user?.address || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isCheckoutModalOpen) {
      api.getPaymentMethods()
        .then((payRes) => {
          if (payRes.success) {
            setPaymentMethods(payRes.data);
          }
        })
        .catch(() => showToast('Payment options are temporarily unavailable.', 'error'))
        .finally(() => setLoadingConfig(false));
    }
  }, [isCheckoutModalOpen, showToast]);

  if (!isCheckoutModalOpen) return null;

  const grandTotal = cartSubtotal + shippingCost;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      showToast('Please provide your name, phone number, and delivery address.', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Your shopping cart is empty.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const isInside = selectedLocationId === 14 || (selectedLocation?.location || '').toLowerCase().includes('inside');
      const payload = {
        location_id: selectedLocationId,
        shipping_id: selectedMethodId,
        shipping_name: customerName,
        shipping_phone: customerPhone,
        shipping_address: customerAddress,
        shipment_type: isInside ? 'inside_dhaka' : 'outside_dhaka',
        total_cart_item: cartTotalCount,
        total_cart_item_price: cartSubtotal,
        total_discount: cartTotalDiscount,
        total_shipping_cost: shippingCost,
        subtotal: grandTotal,
        coupon_ids: [],
        payment: {
          method_id: selectedPaymentId,
          amount: grandTotal,
          gateway_response: []
        },
        items: cart.map((item) => ({
          product_id: item.product.id,
          variant_id: item.variant.id,
          product_name: item.product.name,
          variant_info: {
            brand: item.product.brand || '',
            sku: item.product.sku || 'SKU-STD',
            ...(item.variant.size ? { size: item.variant.size } : {}),
            ...(item.variant.color ? { color: item.variant.color } : {})
          },
          quantity: item.quantity,
          unit_price: item.unit_price,
          price_total: item.total_price,
          shipping_total: 0,
          discount_total: item.discount_total,
          item_total: item.total_price
        }))
      };

      const res = await api.createOrder(payload);
      if (res.success) {
        showToast(`Order created successfully! Invoice #${res.data.invoice_number}`, 'success');
        clearCart();
        setIsCheckoutModalOpen(false);
        openInvoice(res.data.invoice_number);
      }
    } catch {
      showToast('Failed to place order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-4 checkout-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setIsCheckoutModalOpen(false)}>
      <div className="w-full max-w-5xl bg-white dark:bg-[#1E1E1E] border border-[#eceeea] dark:border-[#312E29] rounded-2xl shadow-[0_18px_60px_rgba(0,0,0,.22)] overflow-hidden my-6 checkout-dialog">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E2D9] dark:border-[#312E29] flex items-center justify-between bg-white dark:bg-[#1E1C19]">
          <div>
            <h2 className="font-semibold text-lg text-[#202923] dark:text-[#EDE7DE]">
              Quick checkout
            </h2>
            <p className="text-[11px] text-[#736C62] dark:text-[#9E968B]">
              Your order is one step away.
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1 rounded-full hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#736C62]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[82vh] overflow-y-auto">
          <div className="md:row-span-2 rounded-xl border border-[#eceeea] bg-white p-4">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#28332c]"><ShoppingBag className="h-4 w-4 text-[#68183f]" /> Cart information</div>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.variant.id}`} className="flex gap-3 border-b border-[#edf0ec] pb-3">
                  <div className="h-14 w-14 shrink-0 rounded-lg bg-[#f7f8f6] p-1">
                    <img
                      src={asset(item.variant?.image || item.product.thumbnail || item.product.image)}
                      alt={item.product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-medium text-[#26312a]">{item.product.name}</p>
                    <p className="mt-1 text-[11px] text-[#858c85]">
                      {item.quantity} {item.quantity === 1 ? 'Unit' : 'Units'}
                      {item.variant.size ? ` · ${item.variant.size}` : ''}
                      {item.variant.color ? ` · ${item.variant.color}` : ''}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-[#26312a]">{formatPrice(item.total_price)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#737b74]"><span>Item total</span><span>{formatPrice(cartSubtotal)}</span></div>
              <div className="flex justify-between text-[#737b74]"><span>Delivery</span><span>{formatPrice(shippingCost)}</span></div>
              <div className="flex justify-between border-t border-[#edf0ec] pt-2 font-semibold text-[#26312a]"><span>Subtotal</span><span>{formatPrice(grandTotal)}</span></div>
            </div>
          </div>
          {/* 1. Customer Shipping Details */}
          <div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#28332c] mb-3">
              <MapPin className="w-4 h-4 text-primary" />
              <span>1. Shipping Information</span>
            </div>
            <div className="grid grid-cols-1 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-[#736C62] dark:text-[#9E968B] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Jahid Limon"
                  className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#736C62] dark:text-[#9E968B] mb-1">
                  Phone Number (for Courier Rider) *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 01894084242"
                  className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-medium text-[#736C62] dark:text-[#9E968B]">
                    Delivery Region / District *
                  </label>
                  <span className="text-[10px] text-primary font-semibold font-mono">
                    Tk. {shippingCost} · {shippingEstimateTime}
                  </span>
                </div>
                <select
                  value={selectedLocationId}
                  onChange={(e) => setSelectedLocationId(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-primary"
                >
                  {locations.map((loc) => {
                    const ct = calculateShippingCost(loc.id, selectedMethodId);
                    return (
                      <option key={loc.id} value={loc.id}>
                        {loc.location} ({loc.city ? `${loc.city} · ` : ""}Tk. {ct.cost} · {ct.estimateTime})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#736C62] dark:text-[#9E968B] mb-1">
                  Detailed Address (House, Road, Area, Landmark) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="e.g. House 14, Road 5, Sector 3, Uttara, Dhaka-1230"
                  className="w-full bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] rounded-xs px-3 py-2 text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Courier Method */}
          <div className="md:col-start-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] mb-3">
              <Truck className="w-4 h-4 text-primary" />
              <span>2. Courier Partner ({shippingEstimateTime})</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {methods.map((m) => {
                const ct = calculateShippingCost(selectedLocationId, m.id);
                const isSelected = selectedMethodId === m.id;
                return (
                  <label
                    key={m.id}
                    className={`p-2.5 rounded-xs border cursor-pointer flex flex-col justify-between transition-colors ${
                      isSelected
                        ? 'border-primary bg-[#FDF7F5] dark:bg-[#251D1B]'
                        : 'border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#161513] hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-[#1F1D1A] dark:text-[#EDE7DE] truncate">
                        {m.method_name}
                      </span>
                      <input
                        type="radio"
                        name="shipping_method"
                        checked={isSelected}
                        onChange={() => setSelectedMethodId(m.id)}
                        className="text-primary focus:ring-primary shrink-0"
                      />
                    </div>
                    <span className="text-[10px] text-[#736C62] dark:text-[#9E968B] font-mono">
                      Tk. {ct.cost} · {ct.estimateTime}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 3. Payment Method */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] mb-3">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>3. Payment Selection</span>
            </div>
            <div className="space-y-2">
              {paymentMethods.map((pm) => (
                <label
                  key={pm.id}
                  className={`p-3 rounded-xs border cursor-pointer block transition-colors ${
                    selectedPaymentId === pm.id
                      ? 'border-[#BA2D1D] bg-[#FDF7F5] dark:bg-[#251D1B]'
                      : 'border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#161513]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#1F1D1A] dark:text-[#EDE7DE]">
                      {pm.name}
                    </span>
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedPaymentId === pm.id}
                      onChange={() => setSelectedPaymentId(pm.id)}
                      className="accent-[#BA2D1D]"
                    />
                  </div>
                  {selectedPaymentId === pm.id && pm.additional && (
                    <div
                      className="mt-2 text-[11px] text-[#736C62] dark:text-[#C5BEB3] bg-[#F5F1EA] dark:bg-[#1E1C19] p-2.5 rounded-xs leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: pm.additional }}
                    />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* 4. Order Total Breakdown */}
          <div className="md:col-span-2 p-4 bg-white dark:bg-[#1E1C19] border border-[#E8E2D9] dark:border-[#312E29] rounded-xl space-y-2 text-xs">
            <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
              <span>Cart Items ({cartTotalCount}):</span>
              <span className="font-mono">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
              <span>Courier Delivery Fee:</span>
              <span className="font-mono">{formatPrice(shippingCost)}</span>
            </div>
            <div className="pt-2 border-t border-[#E8E2D9] dark:border-[#312E29] flex justify-between text-sm font-bold text-[#1F1D1A] dark:text-[#EDE7DE]">
              <span>Payable Total:</span>
              <span className="text-primary dark:text-[#E05343] font-mono tabular-nums">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#736C62] hover:text-[#1F1D1A] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loadingConfig || paymentMethods.length === 0 || cart.length === 0}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-6 py-2.5 rounded-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Placing order…' : loadingConfig ? 'Loading delivery options…' : 'Order now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
