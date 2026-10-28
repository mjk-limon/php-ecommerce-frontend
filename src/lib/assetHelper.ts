/**
 * Universal Asset URL Helper
 * Resolves static assets and remote backend images using ECOM_ASSET_URL / NEXT_PUBLIC_ASSET_URL
 */

const DEFAULT_FALLBACK_IMAGE = '/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg';

export function getAssetBaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_ASSET_URL ||
    process.env.ECOM_ASSET_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.ECOM_API_BASE_URL ||
    'http://ilmcomm-v2.services.my';

  return url.replace(/\/+$/, '');
}

/**
 * Builds a full URL for any image/media path using the environment asset URL variable.
 * - Leaves absolute URLs (http://, https://, data:, blob:) intact.
 * - Leaves local static public paths (e.g. /assets/, /icons/, /favicon) intact.
 * - Prefixes relative paths or backend paths with the configured asset base URL.
 */
export function getAssetUrl(path?: string | null, fallback: string = DEFAULT_FALLBACK_IMAGE): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return fallback;
  }

  const trimmed = path.trim();

  // Already a full URL or data/blob URL
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // Local static files in public directory
  if (
    trimmed.startsWith('/assets/') ||
    trimmed.startsWith('/icons/') ||
    trimmed.startsWith('/favicon') ||
    trimmed.startsWith('/src/assets/')
  ) {
    return trimmed;
  }

  const base = getAssetBaseUrl();
  const cleanPath = trimmed.replace(/^\/+/, '');
  return `${base}/${cleanPath}`;
}

export function getProductImageUrl(
  product?: { thumbnail?: string; image?: string; variants?: Array<{ images?: string[] }> } | null,
  fallback?: string
): string {
  if (!product) return fallback || DEFAULT_FALLBACK_IMAGE;
  const raw = product.thumbnail || product.image || product.variants?.[0]?.images?.[0];
  return getAssetUrl(raw, fallback);
}

export function getCategoryImageUrl(
  category?: {
    image?: string;
    thumbnail?: string;
    banner?: string;
    images?: string | object | null;
  } | null,
  fallback?: string
): string {
  if (!category) return fallback || DEFAULT_FALLBACK_IMAGE;
  let raw: any = category.image || category.thumbnail || category.banner;
  if (!raw && category.images) {
    if (typeof category.images === 'string') raw = category.images;
    else if (Array.isArray(category.images)) raw = category.images[0];
  }
  return getAssetUrl(raw, fallback);
}

export default getAssetUrl;
