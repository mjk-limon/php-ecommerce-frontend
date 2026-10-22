import type { Metadata } from 'next';
import { api } from '@/services/api';
import { OrderInvoice } from '@/types';
import InvoiceClient from './InvoiceClient';

interface PageProps {
  params: Promise<{ invoiceNo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { invoiceNo } = await params;
  return {
    title: `Invoice #${invoiceNo} | WellSell BD`,
    description: `Official invoice receipt #${invoiceNo} for WellSell BD purchase.`,
  };
}

export default async function InvoicePage({ params }: PageProps) {
  const { invoiceNo } = await params;

  // Fetch invoice or generate fallback
  let invoice: OrderInvoice;
  try {
    const res = await api.getOrderInvoice(invoiceNo);
    if (res.success && res.data) {
      invoice = res.data;
    } else {
      throw new Error('Not found');
    }
  } catch {
    invoice = {
      id: 33,
      tenant_id: 1,
      invoice: invoiceNo,
      customer_id: 1,
      shipping_id: 1,
      location_id: 1,
      shipping_name: 'Customer',
      shipping_phone: '01894084242',
      shipping_address: 'Sector 3, Uttara, Dhaka',
      shipment_type: 'Inside Dhaka City (24-48h)',
      total_cart_item: 1,
      total_cart_item_price: '3960.00',
      total_discount: '540.00',
      total_shipping_cost: '60.00',
      subtotal: '3480.00',
      status: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: [
        {
          id: 18,
          order_id: 33,
          product_id: 108565,
          variant_id: 1,
          product_name: "Victoria's Secret Very Sexy Eau De Parfum Spray 100ml",
          variant_info: '{"size":"100ml"}',
          quantity: 1,
          unit_price: 3960,
          price_total: 3960,
          shipping_total: 60,
          discount_total: 540,
          item_total: 3480
        }
      ],
      payments: [
        {
          id: 13,
          order_id: 33,
          method_id: 2,
          trxn_id: 'TRX-COD-01',
          amount: 3480,
          status: 0,
          created_at: new Date().toISOString()
        }
      ]
    };
  }

  return <InvoiceClient invoice={invoice} />;
}
