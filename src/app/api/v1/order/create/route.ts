import { NextResponse } from 'next/server';

export async function POST() {
  const invoice = Math.floor(100000000 + Math.random() * 900000000);
  return NextResponse.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      order_id: 33,
      invoice_number: invoice,
      callback_url: null
    }
  });
}
