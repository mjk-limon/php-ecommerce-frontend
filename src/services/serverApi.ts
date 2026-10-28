import 'server-only';
import { cache } from 'react';
import type { Category } from '@/types';
import { log } from 'console';

const API_ORIGIN = (process.env.ECOM_API_BASE_URL || 'http://ilmcomm-v2.services.my').replace(/\/$/, '');
const ASSET_ORIGIN = (process.env.ECOM_ASSET_URL || process.env.ECOM_API_BASE_URL || 'http://ilmcomm-v2.services.my').replace(/\/$/, '');
const API_VERSION = (process.env.ECOM_API_VERSION || 'v1').replace(/^\/+|\/+$/g, '');
const APP_KEY = process.env.ECOM_APP_KEY || 'abcd';

export function serverApiAssetUrl(path?: string | null) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${ASSET_ORIGIN}/${path.replace(/^\/+/, '')}`;
}

// React cache deduplicates identical requests during a server render, including
// requests made by the root layout and the page rendered inside it.
const requestServerApi = cache(async (path: string, query: string) => {
  const url = new URL(`${API_ORIGIN}/api/${API_VERSION}/${path.replace(/^\/+/, '')}`);
  url.searchParams.set('app_key', APP_KEY);
  new URLSearchParams(query).forEach((value, key) => url.searchParams.set(key, value));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  let response: Response;

  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal
    });
  } catch (error) {
    log(`Server API: fetch failed for ${url}`, error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  const result = await response.json();

  if (!response.ok || result?.success === false) {
    throw new Error(result?.error || `API request failed (${response.status})`);
  }

  return result.data;
});

export function serverApiGet<T>(path: string, params?: Record<string, string | number | boolean | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) query.set(key, String(value));
  });

  return requestServerApi(path, query.toString()) as Promise<T>;
}

export const getServerCategories = cache(async (): Promise<Category[]> => {
  try {
    const result = await serverApiGet<any>('store/categories');
    return result?.categories || result || [];
  } catch {
    return [];
  }
});
