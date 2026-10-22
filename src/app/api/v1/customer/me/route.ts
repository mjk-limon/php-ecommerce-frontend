import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      user: {
        id: 1,
        username: 'ixarapitiy04@gmail.com',
        first_name: 'Jahid',
        last_name: 'Limon',
        email: 'ixarapitiy04@gmail.com',
        address: 'Sector 3, Uttara',
        city: 'Dhaka',
        state: 'Dhaka',
        country: 'Bangladesh',
        postal_code: '1230',
        phone: '01894084242',
        created_at: '2025-12-21 17:57:50',
        updated_at: '2026-10-18 01:02:05'
      }
    }
  });
}
