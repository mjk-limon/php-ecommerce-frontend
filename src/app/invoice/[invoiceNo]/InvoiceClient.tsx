'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { OrderInvoice } from '@/types';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';

interface InvoiceClientProps {
  invoice: OrderInvoice;
}

export default function InvoiceClient({ invoice }: InvoiceClientProps) {
  return (
    <div className="w-full pb-20 pt-8 sm:pt-12 bg-[#FAFAFA] dark:bg-[#121212] min-h-[85vh]">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Navigation & Print Top Bar */}
        <div className="flex items-center justify-between no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#736C62] hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </Link>

          <Button
            type="button"
            variant="default"
            size="default"
            onClick={() => window.print()}
            className="gap-1.5 text-xs font-semibold uppercase tracking-wider"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </Button>
        </div>

        {/* Invoice Paper Card */}
        <Card className="p-6 sm:p-10 space-y-6 bg-white dark:bg-[#1A1815] border border-[#E8E2D9] dark:border-[#312E29]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] dark:border-[#312E29] pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif font-black text-2xl text-[#1F6E54]">W</span>
                <span className="font-serif font-bold text-xl text-[#1F1D1A] dark:text-[#EDE7DE]">
                  WELLSELL <span className="text-primary">BD</span>
                </span>
              </div>
              <p className="text-xs text-[#736C62] dark:text-[#9E968B]">
                Fine Stationery &amp; Health Care Paper Store
              </p>
              <p className="text-xs text-[#736C62] dark:text-[#9E968B]">
                Sector 3, Uttara, Dhaka, Bangladesh · +8801894084242
              </p>
            </div>

            <div className="sm:text-right">
              <Badge variant="success" className="text-xs px-3 py-1 mb-2">
                ORDER CONFIRMED
              </Badge>
              <p className="text-xs text-[#736C62]">
                Invoice No: <strong className="font-mono text-primary">#{invoice.invoice}</strong>
              </p>
              <p className="text-xs text-[#736C62]">
                Date: <strong>{new Date(invoice.created_at).toLocaleDateString()}</strong>
              </p>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#FBF9F5] dark:bg-[#161513] rounded-xs border border-[#E8E2D9] dark:border-[#312E29] space-y-1">
              <span className="font-bold uppercase tracking-wider text-[#736C62] text-[10px]">
                Ship To:
              </span>
              <p className="font-semibold text-sm text-[#1F1D1A] dark:text-[#EDE7DE]">
                {invoice.shipping_name}
              </p>
              <p className="text-[#736C62]">{invoice.shipping_phone}</p>
              <p className="text-[#736C62]">{invoice.shipping_address}</p>
            </div>

            <div className="p-4 bg-[#FBF9F5] dark:bg-[#161513] rounded-xs border border-[#E8E2D9] dark:border-[#312E29] space-y-1">
              <span className="font-bold uppercase tracking-wider text-[#736C62] text-[10px]">
                Shipment &amp; Payment:
              </span>
              <p className="text-[#1F1D1A] dark:text-[#EDE7DE]">
                Method: <strong>{invoice.shipment_type}</strong>
              </p>
              <p className="text-[#1F1D1A] dark:text-[#EDE7DE]">
                Payment: <strong>Cash on Delivery (COD) / Verified</strong>
              </p>
              <p className="text-[#1F6E54] font-medium">
                Tracking: RedX Logistics Hub Active
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E8E2D9] dark:border-[#312E29] text-[11px] uppercase tracking-wider text-[#736C62] bg-[#F9F6F0] dark:bg-[#161513]">
                <tr>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EDE8] dark:divide-[#262420]">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                        {item.product_name}
                      </p>
                      <span className="text-[10px] text-[#736C62]">
                        100% Genuine Barcoded Import
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono">{item.quantity}</td>
                    <td className="py-3 px-3 text-right font-mono">
                      Tk. {item.unit_price.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-primary">
                      Tk. {item.price_total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-[#E8E2D9] dark:border-[#312E29] flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-[#736C62]">
                <span>Items Subtotal:</span>
                <span className="font-mono">Tk. {invoice.total_cart_item_price}</span>
              </div>
              <div className="flex justify-between text-[#736C62]">
                <span>Delivery Charge:</span>
                <span className="font-mono">Tk. {invoice.total_shipping_cost}</span>
              </div>
              {Number(invoice.total_discount) > 0 && (
                <div className="flex justify-between text-[#1F6E54]">
                  <span>Discount:</span>
                  <span className="font-mono">-Tk. {invoice.total_discount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#E8E2D9] dark:border-[#312E29] flex justify-between font-bold text-sm text-primary">
                <span>Grand Total:</span>
                <span className="font-mono">Tk. {invoice.subtotal}</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-[#E8E2D9] dark:border-[#312E29] text-center text-[11px] text-[#736C62]">
            <p>Thank you for shopping with WellSell BD! For inquiries, call +8801894084242 or email info@wellsellbd.com.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
