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
      invoice: String(invoiceNo),
      shipping_name: 'Jahid Limon',
      shipping_phone: '01894084242',
      shipping_address: 'Sector 3, Uttara, Dhaka',
      status: 1,
      created_at: '2026-10-18 22:35:33',
      deliveries: 'In Transit with RedX Courier'
    }
  });
}
