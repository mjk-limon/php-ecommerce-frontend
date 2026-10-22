'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, Package, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { OrderInvoice } from '../types';

export const TrackOrderModal: React.FC = () => {
  const { isTrackModalOpen, setIsTrackModalOpen, activeInvoiceNumber, showToast } = useApp();
  const [queryInvoice, setQueryInvoice] = useState<string>(activeInvoiceNumber || '684058321');
  const [trackedOrder, setTrackedOrder] = useState<OrderInvoice | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isTrackModalOpen) {
      handleSearch(queryInvoice || '684058321');
    }
  }, [isTrackModalOpen]);

  const handleSearch = async (inv: string) => {
    if (!inv.trim()) return;
    setIsSearching(true);
    try {
      const res = await api.trackOrder(inv.trim());
      if (res.success && res.data) {
        setTrackedOrder(res.data);
      } else {
        setTrackedOrder(null);
        showToast(`No package found for invoice #${inv}`, 'info');
      }
    } finally {
      setIsSearching(false);
    }
  };

  if (!isTrackModalOpen) return null;

  const stages = [
    { label: 'Order Placed', time: 'Completed', done: true },
    { label: 'Verified & Packed', time: 'Completed', done: true },
    { label: 'Dispatched to Courier', time: 'In Transit', done: true },
    { label: 'Out for Delivery', time: 'Estimated Today', done: false },
    { label: 'Delivered & Paid', time: 'Pending Delivery', done: false }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#E8E2D9] dark:border-[#312E29] rounded-sm shadow-2xl p-5 sm:p-7 relative">
        <button
          onClick={() => setIsTrackModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#736C62]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <Truck className="w-5 h-5 text-[#BA2D1D]" />
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
              Track Your Package
            </h3>
          </div>
          <p className="text-xs text-[#736C62] dark:text-[#9E968B]">
            Enter your 9-digit Wellsell BD Invoice Number (from SMS or receipt).
          </p>
        </div>

        {/* Search input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(queryInvoice);
          }}
          className="flex gap-2 mb-6"
        >
          <input
            type="text"
            value={queryInvoice}
            onChange={(e) => setQueryInvoice(e.target.value)}
            placeholder="e.g. 684058321"
            className="flex-1 bg-white dark:bg-[#161513] border border-[#DCD5C9] dark:border-[#38332C] text-xs px-3 py-2.5 rounded-xs font-mono text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-none focus:border-[#BA2D1D]"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold px-4 py-2.5 rounded-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </form>

        {isSearching ? (
          <div className="py-8 text-center text-xs text-[#736C62]">
            Connecting to Courier Logistics API...
          </div>
        ) : trackedOrder ? (
          <div className="space-y-6">
            {/* Order status card */}
            <div className="p-4 bg-white dark:bg-[#1E1C19] border border-[#E8E2D9] dark:border-[#312E29] rounded-xs space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-[#F4EFEA] dark:border-[#272420] pb-2">
                <span className="font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                  Invoice: #{trackedOrder.invoice}
                </span>
                <span className="px-2 py-0.5 bg-[#E8F5E9] dark:bg-[#1B3322] text-[#1F6E54] dark:text-[#34A87C] font-semibold text-[10px] rounded-xs">
                  In Transit
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#736C62] dark:text-[#9E968B]">
                <MapPin className="w-3.5 h-3.5 text-[#BA2D1D] shrink-0" />
                <span className="truncate">Destination: {trackedOrder.shipping_address}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#736C62] dark:text-[#9E968B]">
                <Package className="w-3.5 h-3.5 text-[#1F6E54] shrink-0" />
                <span>
                  Items: {trackedOrder.items.map((i) => i.product_name).join(', ')}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] mb-3">
                Tracking Stages
              </h4>
              <div className="relative pl-6 space-y-4 border-l-2 border-[#DCD5C9] dark:border-[#38332C]">
                {stages.map((stage, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle icon on the line */}
                    <div
                      className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        stage.done
                          ? 'bg-[#1F6E54] border-[#1F6E54] text-white'
                          : 'bg-white dark:bg-[#1C1A17] border-[#DCD5C9] dark:border-[#38332C]'
                      }`}
                    >
                      {stage.done && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>

                    <div>
                      <p
                        className={`text-xs font-semibold ${
                          stage.done
                            ? 'text-[#1F1D1A] dark:text-[#EDE7DE]'
                            : 'text-[#9A9184]'
                        }`}
                      >
                        {stage.label}
                      </p>
                      <p className="text-[10px] text-[#736C62] dark:text-[#9E968B]">
                        {stage.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-[#736C62]">
            Please enter a valid invoice number or try the default demo invoice: <strong>684058321</strong>
          </div>
        )}
      </div>
    </div>
  );
};
