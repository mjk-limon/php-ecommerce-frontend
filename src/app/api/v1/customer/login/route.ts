import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      success: true,
      error: null,
      error_no: 0,
      data: {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.demo_token_backend',
        expires: 1793639004,
        user: {
          id: 1,
          username: body.username || 'ixarapitiy04@gmail.com',
          first_name: 'Jahid',
          last_name: 'Limon',
          email: body.username || 'ixarapitiy04@gmail.com',
          phone: '01894084242'
        }
      }
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON request' }, { status: 400 });
  }
}
