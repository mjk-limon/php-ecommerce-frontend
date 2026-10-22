import { NextResponse } from 'next/server';
import { MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_CAMPAIGNS } from '@/data/mockData';

export async function GET() {
  const trending_categories = MOCK_CATEGORIES.slice(0, 8).map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    total_views: cat.total_views || '15400',
    parent_main_id: cat.parent_main_id || null,
    parent_sub_id: cat.parent_sub_id || null,
    images: cat.images || null
  }));

  const trending_products = MOCK_PRODUCTS.slice(0, 8).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category_id: p.category_id,
    brand: p.brand,
    price: p.price,
    old_price: p.old_price,
    discount: p.discount || 0,
    image: p.image
  }));

  const new_arrivals = MOCK_PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category_id: p.category_id,
    brand: p.brand,
    price: p.price,
    old_price: p.old_price,
    discount: p.discount || 0,
    image: p.image
  }));

  const category_products = MOCK_CATEGORIES.slice(0, 6).map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    images: cat.images,
    products: MOCK_PRODUCTS.filter((p) => p.category_id === cat.id || p.category_name === cat.name).slice(0, 4)
  }));

  return NextResponse.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      trending_categories,
      trending_products,
      new_arrivals,
      category_products,
      campaigns: MOCK_CAMPAIGNS
    },
    meta: {
      title: 'Home | WellSell BD',
      description: 'WellSell BD - Health, Beauty & Laboratory Supplies',
      keywords: 'stationery, health, beauty, vitamins, lab equipment',
      oginfo: {
        title: 'WellSell BD',
        description: 'Authentic import items with nationwide COD',
        image: '/assets/images/hero_beauty_skincare_banner_1792385518854.jpg'
      }
    }
  });
}

