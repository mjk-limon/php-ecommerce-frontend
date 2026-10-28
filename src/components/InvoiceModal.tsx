'use client';

import { CheckCircle2, Package, Printer, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { OrderInvoice } from '../types';

export const InvoiceModal: React.FC = () => {
  const {
    isInvoiceModalOpen,
    setIsInvoiceModalOpen,
    activeInvoiceNumber,
    formatPrice,
    setIsTrackModalOpen
  } = useApp();

  const [invoice, setInvoice] = useState<OrderInvoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isInvoiceModalOpen && activeInvoiceNumber) {
      setLoading(true);
      api.getOrderInvoice(activeInvoiceNumber)
        .then((res) => {
          if (res.success && res.data) {
            setInvoice(res.data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isInvoiceModalOpen, activeInvoiceNumber]);

  if (!isInvoiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-xl bg-[#FDFBF7] dark:bg-[#1A1916] border border-[#E8E2D9] dark:border-[#312E29] rounded-sm shadow-2xl relative overflow-hidden my-6">
        {/* Top Perforated Receipt Edge */}
        <div className="h-2 bg-repeating-linear-gradient(90deg, #BA2D1D, #BA2D1D 8px, transparent 8px, transparent 16px) opacity-70" />

        {/* Close Button */}
        <button
          onClick={() => setIsInvoiceModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#736C62] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {loading ? (
          <div className="p-12 text-center text-xs text-[#736C62]">
            Retrieving official paper invoice...
          </div>
        ) : !invoice ? (
          <div className="p-8 text-center text-xs text-primary">
            Invoice #{activeInvoiceNumber} could not be located.
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header Stamp */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] dark:border-[#312E29] pb-5">
              <div>
                <span className="font-serif font-black text-xl text-[#1F1D1A] dark:text-[#EDE7DE] tracking-tight">
                  WELLSELL <span className="text-primary">BD</span>
                </span>
                <p className="text-[10px] uppercase tracking-widest text-[#736C62] dark:text-[#9E968B] mt-0.5">
                  Official Customer Invoice & Receipt
                </p>
              </div>

              {/* Verified Stamp */}
              <div className="self-start sm:self-auto border-2 border-dashed border-[#1F6E54] dark:border-[#34A87C] px-3 py-1 rounded text-[#1F6E54] dark:text-[#34A87C] text-center rotate-[-2deg]">
                <span className="text-[10px] font-bold uppercase tracking-wider block">
                  ORDER CONFIRMED
                </span>
                <span className="text-[9px] font-mono block">
                  INVOICE #{invoice.invoice}
                </span>
              </div>
            </div>

            {/* Customer & Order Metadata */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-[#F5F1EA] dark:bg-[#221F1B] p-4 rounded-xs border border-[#E8E2D9] dark:border-[#312E29]">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#736C62] dark:text-[#9E968B]">
                  Customer
                </p>
                <p className="font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mt-0.5">
                  {invoice.shipping_name}
                </p>
                <p className="text-[#736C62] dark:text-[#9E968B] font-mono mt-0.5">
                  {invoice.shipping_phone}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-[#736C62] dark:text-[#9E968B]">
                  Delivery Address
                </p>
                <p className="text-[#1F1D1A] dark:text-[#EDE7DE] mt-0.5 line-clamp-2">
                  {invoice.shipping_address}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-[#736C62] dark:text-[#9E968B]">
                  Date Placed
                </p>
                <p className="text-[#1F1D1A] dark:text-[#EDE7DE] font-mono mt-0.5">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-[#736C62] dark:text-[#9E968B]">
                  Payment Status
                </p>
                <p className="text-[#1F6E54] dark:text-[#34A87C] font-semibold mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pending at Doorstep</span>
                </p>
              </div>
            </div>

            {/* Itemized Table */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] mb-2">
                Purchased Items ({invoice.total_cart_item})
              </h4>
              <div className="border border-[#E8E2D9] dark:border-[#312E29] rounded-xs overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#EFEAE1] dark:bg-[#25221E] text-[10px] uppercase font-bold text-[#4A443B] dark:text-[#C5BEB3]">
                    <tr>
                      <th className="p-2.5">Item Description</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5 text-right">Price</th>
                      <th className="p-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D9] dark:divide-[#312E29] bg-white dark:bg-[#1C1A17]">
                    {invoice.items.map((it) => (
                      <tr key={it.id}>
                        <td className="p-2.5 font-medium text-[#1F1D1A] dark:text-[#EDE7DE]">
                          {it.product_name}
                        </td>
                        <td className="p-2.5 text-center font-mono">{it.quantity}</td>
                        <td className="p-2.5 text-right font-mono tabular-nums">
                          {formatPrice(it.unit_price)}
                        </td>
                        <td className="p-2.5 text-right font-mono font-semibold tabular-nums text-primary">
                          {formatPrice(it.item_total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="space-y-1.5 text-xs text-right border-t border-[#E8E2D9] dark:border-[#312E29] pt-4">
              <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
                <span>Items Subtotal:</span>
                <span className="font-mono">Tk. {Number(invoice.total_cart_item_price).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#736C62] dark:text-[#9E968B]">
                <span>Courier Shipping Cost:</span>
                <span className="font-mono">Tk. {Number(invoice.total_shipping_cost).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1F1D1A] dark:text-[#EDE7DE] pt-2 border-t border-[#E8E2D9] dark:border-[#312E29]">
                <span>Grand Total:</span>
                <span className="text-primary font-mono tabular-nums">
                  Tk. {Number(invoice.subtotal).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 border border-[#DCD5C9] dark:border-[#38332C] hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] px-4 py-2 text-xs font-semibold rounded-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Paper Receipt</span>
              </button>

              <button
                onClick={() => {
                  setIsInvoiceModalOpen(false);
                  setIsTrackModalOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white px-5 py-2 text-xs font-semibold rounded-xs transition-colors cursor-pointer"
              >
                <Package className="w-3.5 h-3.5" />
                <span>Track This Order Live</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
