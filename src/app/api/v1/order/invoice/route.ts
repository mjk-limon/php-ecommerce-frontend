import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const invoiceNo = searchParams.get('invoice') || '684058321';

  return NextResponse.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      id: 33,
      tenant_id: 1,
      invoice: String(invoiceNo),
      shipping_id: 1,
      location_id: 1,
      shipping_name: 'Jahid Limon',
      shipping_phone: '01894084242',
      shipping_address: 'Sector 3, Uttara, Dhaka',
      shipment_type: 'normal',
      total_cart_item: 1,
      total_cart_item_price: '3960.00',
      total_discount: '540.00',
      total_shipping_cost: '60.00',
      subtotal: '3480.00',
      status: 0,
      created_at: '2026-10-18 22:35:33',
      updated_at: '2026-10-18 22:35:33',
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
          shipping_total: 0,
          discount_total: 540,
          item_total: 3420
        }
      ],
      payments: [
        {
          id: 13,
          order_id: 33,
          method_id: 2,
          amount: 3480,
          status: 0,
          created_at: '2026-10-18 22:35:33'
        }
      ]
    }
  });
}
