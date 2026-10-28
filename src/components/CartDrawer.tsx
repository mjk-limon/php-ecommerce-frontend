'use client';

import { getAssetUrl } from '@/lib/assetHelper';
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotalDiscount,
    cartTotalCount,
    formatPrice
  } = useApp();

  useEffect(() => {
    if (!isCartDrawerOpen) {
      setIsDrawerVisible(false);
      return;
    }

    const frame = window.requestAnimationFrame(() => setIsDrawerVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div
        className={`absolute inset-y-0 right-0 max-w-full flex pl-10 transform transition-transform duration-300 ease-out motion-reduce:transition-none ${
          isDrawerVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="w-screen max-w-md bg-white dark:bg-[#1A1815] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8E2D9] dark:border-[#312E29] flex items-center justify-between bg-[#FBF9F5] dark:bg-[#141312]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary dark:text-[#E05343]" />
              <h2 className="font-serif font-bold text-base text-[#1F1D1A] dark:text-[#EDE7DE]">
                Your Shopping Bag ({cartTotalCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 rounded-full text-[#736C62] hover:bg-[#EFEAE1] dark:hover:bg-[#25221E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-semibold text-base text-[#1F1D1A] dark:text-[#EDE7DE]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#736C62] dark:text-[#9E968B] max-w-xs">
                  Discover authentic skincare, luxury fragrances, and health vitamins imported directly.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  Start Shopping Now
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selected_size || 'default'}`}
                  className="flex gap-3 pb-4 border-b border-[#F0EDE8] dark:border-[#262420] last:border-none"
                >
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-16 h-16 rounded border border-[#E8E2D9] dark:border-[#312E29] p-1 bg-[#FAFAFA] dark:bg-[#1E1E1E] shrink-0"
                  >
                    <img
                      src={getAssetUrl(item.product.image || item.product.thumbnail)}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="text-xs font-medium text-[#1F1D1A] dark:text-[#EDE7DE] line-clamp-2 hover:text-primary transition-colors"
                    >
                      {item.product.name}
                    </Link>

                    {item.selected_size && (
                      <span className="inline-block text-[10px] text-[#736C62] dark:text-[#9E968B] mt-0.5">
                        Size: {item.selected_size}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#DCD5C9] dark:border-[#38332C] rounded-xs bg-[#FBF9F5] dark:bg-[#161513]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#25221E] text-xs transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#25221E] text-xs transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-primary dark:text-[#E05343] font-mono tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[#9A9184] hover:text-primary p-1 transition-colors self-start cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E8E2D9] dark:border-[#312E29] bg-white dark:bg-[#1E1C19] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
                  <span>Items Subtotal:</span>
                  <span className="font-mono font-medium">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartTotalDiscount > 0 && (
                  <div className="flex justify-between text-[#1F6E54] dark:text-[#34A87C]">
                    <span>Promotional Savings:</span>
                    <span className="font-mono font-medium">-{formatPrice(cartTotalDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
                  <span>Estimated Shipping:</span>
                  <span className="text-[11px] italic">Calculated at checkout</span>
                </div>
                <div className="pt-2 border-t border-[#E8E2D9] dark:border-[#312E29] flex justify-between text-sm font-bold text-[#1F1D1A] dark:text-[#EDE7DE]">
                  <span>Total Amount:</span>
                  <span className="text-primary dark:text-[#E05343] font-mono tabular-nums">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="flex items-center justify-center gap-1.5 border border-[#DCD5C9] dark:border-[#38332C] hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] py-2.5 px-3 rounded-xs font-medium text-xs text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors text-center"
                >
                  View Cart
                </Link>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    router.push('/checkout');
                  }}
                  className="flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white py-2.5 px-3 rounded-xs font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#736C62] dark:text-[#9E968B] text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F6E54]" />
                <span>100% Genuine Products · Cash On Delivery Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
