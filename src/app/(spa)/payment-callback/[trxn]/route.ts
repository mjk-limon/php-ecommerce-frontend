import { serverApiPost } from "@/services/serverApi";
import { NextRequest, NextResponse } from "next/server";

async function handle(trxn: string, request: Record<string, string>, nextRequest: NextRequest) {
  const target = await serverApiPost<{ data: { invoice: string } }>(`/order/payment-update/${trxn}`, {
    gateway_response: request,
  });

  const invoice = target.data.invoice;

  return NextResponse.redirect(new URL(`/invoice/${invoice}`, nextRequest.url));
}

export async function GET(request: NextRequest, context: { params: Promise<{ trxn: string }> }) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());

  return handle((await context.params).trxn, params, request);
}

export async function POST(request: NextRequest, context: { params: Promise<{ trxn: string }> }) {
  return handle((await context.params).trxn, await request.json(), request);
}
