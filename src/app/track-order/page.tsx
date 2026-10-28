'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
import { OrderInvoice } from '@/types';
import { ArrowRight, CheckCircle2, Package, Search, Truck } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function TrackOrderPage() {
  const [queryInvoice, setQueryInvoice] = useState('684058321');
  const [trackedOrder, setTrackedOrder] = useState<OrderInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInvoice.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await api.trackOrder(queryInvoice.trim());
      if (res.success) {
        setTrackedOrder(res.data);
      } else {
        setTrackedOrder(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full pb-20 pt-8 sm:pt-12 bg-[#FAFAFA] dark:bg-[#121212] min-h-[75vh]">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        <Card className="p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
            <Package className="w-5 h-5 text-primary" />
            <h1 className="font-serif font-bold text-xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              Track Your Order &amp; Delivery
            </h1>
          </div>

          <p className="text-xs text-[#736C62] dark:text-[#9E968B]">
            Enter your 9-digit order invoice number received via SMS or confirmation email to check real-time courier status.
          </p>

          <form onSubmit={handleTrack} className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                required
                value={queryInvoice}
                onChange={(e) => setQueryInvoice(e.target.value)}
                placeholder="e.g. 684058321"
                className="font-mono"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              variant="default"
              className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </Button>
          </form>

          {/* Results Display */}
          {hasSearched && (
            <div className="pt-4 border-t border-[#F0EDE8] dark:border-[#2A2A2A]">
              {trackedOrder ? (
                <div className="space-y-5">
                  <div className="p-4 bg-[#FBF9F5] dark:bg-[#1A1815] rounded-xs border border-[#E8E2D9] dark:border-[#312E29] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-[#736C62]">Invoice:</span>{' '}
                      <strong className="font-mono text-primary">#{trackedOrder.invoice}</strong>
                    </div>
                    <div>
                      <span className="text-[#736C62]">Recipient:</span>{' '}
                      <strong>{trackedOrder.shipping_name}</strong>
                    </div>
                    <div>
                      <span className="text-[#736C62]">Status:</span>{' '}
                      <Badge variant="success">In Transit with Courier</Badge>
                    </div>
                  </div>

                  {/* Courier Stepper */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#1F6E54] text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-[#1F1D1A] dark:text-[#EDE7DE]">
                          Order Placed &amp; Verified
                        </p>
                        <p className="text-[#736C62] text-[11px]">
                          Invoice issued, batch serial code confirmed genuine.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#1F6E54] text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-[#1F1D1A] dark:text-[#EDE7DE]">
                          Dispatched from Uttara Central Hub
                        </p>
                        <p className="text-[#736C62] text-[11px]">
                          Handed over to RedX Express Delivery Partner.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 animate-pulse">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-primary">
                          Out for Delivery (Rider in Transit)
                        </p>
                        <p className="text-[#736C62] text-[11px]">
                          Expected arrival within 24 hours. Rider will phone before delivery.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-right">
                    <Link
                      href={`/invoice/${trackedOrder.invoice}`}
                      className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                    >
                      <span>View Full Printable Invoice</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-[#736C62]">
                  No order record found for #{queryInvoice}. Please verify your invoice number.
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
