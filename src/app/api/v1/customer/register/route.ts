import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      last_row: 7
    }
  });
}
