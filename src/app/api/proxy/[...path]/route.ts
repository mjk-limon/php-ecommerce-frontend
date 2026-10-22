import { NextRequest, NextResponse } from 'next/server';

const API_ORIGIN = (process.env.ECOM_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '');

async function forward(request: NextRequest, segments: string[]) {
  const target = new URL(`${API_ORIGIN}/api/${segments.join('/')}`);
  request.nextUrl.searchParams.forEach((value, key) => target.searchParams.append(key, value));
  const headers = new Headers({ Accept: 'application/json' });
  const authorization = request.headers.get('authorization');
  const contentType = request.headers.get('content-type');
  if (authorization) headers.set('authorization', authorization);
  if (contentType) headers.set('content-type', contentType);
  const response = await fetch(target, {
    method: request.method,
    headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.text(),
    cache: 'no-store'
  });
  return new NextResponse(await response.text(), {
    status: response.status,
    headers: { 'content-type': response.headers.get('content-type') || 'application/json' }
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, (await context.params).path);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, (await context.params).path);
}
