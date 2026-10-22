import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/data/mockData';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');
  const id = url.searchParams.get('id');

  const found = MOCK_PRODUCTS.find(
    (p) => (slug && (p.slug === slug || String(p.id) === slug)) || (id && p.id === Number(id))
  );

  const product = found || MOCK_PRODUCTS[0];

  return NextResponse.json({
    success: true,
    error: null,
    error_no: 0,
    data: {
      ...product,
      tenant_id: 0,
      merchant_id: 1,
      views: product.views || 250,
      discount: product.discount || 0,
      minimum_price: product.price,
      maximum_price: product.old_price || product.price,
      status: 2,
      category: [
        {
          id: product.category_id || 101,
          name: product.category_name || 'Health & Care',
          slug: 'health-care'
        }
      ],
      merchant: [
        {
          id: 1,
          name: 'WellSell BD Official',
          company_name: 'WellSell BD',
          email: 'info@wellsellbd.com',
          phone: '01894084242'
        }
      ]
    },
    meta: {
      title: `${product.name} | WellSell BD`,
      description: `${product.name} only at Tk.${product.price} order from WellSell BD`,
      keywords: `${product.brand}, ${product.name}`,
      oginfo: {
        title: product.name,
        description: `Order ${product.name} online from WellSell BD`,
        image: product.image
      }
    }
  });
}

