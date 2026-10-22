import { NextResponse } from 'next/server';
import { MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_FILTER_OBJECTS } from '@/data/mockData';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category_slug = url.searchParams.get('category_slug');
  const search = url.searchParams.get('search');
  const campaign_slug = url.searchParams.get('campaign_slug');
  const priceFrom = url.searchParams.get('price[from]') || url.searchParams.get('price_from');
  const priceTo = url.searchParams.get('price[to]') || url.searchParams.get('price_to');
  const brand = url.searchParams.get('brands') || url.searchParams.get('brand');

  let filtered = [...MOCK_PRODUCTS];

  let currentCategory = null;
  if (category_slug && category_slug !== 'all') {
    currentCategory = MOCK_CATEGORIES.find(
      (c) => c.slug === category_slug || c.childs?.some((sub) => sub.slug === category_slug)
    );
    filtered = filtered.filter(
      (p) =>
        p.category_name?.toLowerCase().includes(category_slug.toLowerCase().replace(/-/g, ' ')) ||
        p.slug.includes(category_slug) ||
        (currentCategory && p.category_id === currentCategory.id)
    );
    if (filtered.length === 0) {
      // fallback to showing relevant catalog items
      filtered = MOCK_PRODUCTS.slice(0, 8);
    }
  }

  if (search) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  if (brand) {
    filtered = filtered.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }

  if (priceFrom) {
    const min = parseFloat(priceFrom);
    if (!isNaN(min) && min > 0) {
      filtered = filtered.filter((p) => p.price >= min);
    }
  }

  if (priceTo) {
    const max = parseFloat(priceTo);
    if (!isNaN(max) && max > 0) {
      filtered = filtered.filter((p) => p.price <= max);
    }
  }

  return NextResponse.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      category: currentCategory || {
        id: 14,
        name: 'All Products',
        slug: 'all',
        images: JSON.stringify({ banner: '/assets/images/category_health_vitamin_banner_1792385519799.jpg' })
      },
      products: filtered,
      available_products: filtered.length,
      filter_objects: MOCK_FILTER_OBJECTS
    },
    meta: {
      title: `${currentCategory ? currentCategory.name : 'Products'} | WellSell BD`,
      description: 'Explore authentic healthcare, vitamins, skincare, and precision supplies at WellSell BD.',
      keywords: 'wellsell bd, products, imported, bangladesh',
      oginfo: {
        title: currentCategory ? currentCategory.name : 'Products',
        description: 'Explore verified items at WellSell BD'
      }
    }
  });
}

