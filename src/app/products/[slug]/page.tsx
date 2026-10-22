import type { Metadata } from 'next';
import { MOCK_PRODUCTS } from '@/data/mockData';
import ProductDetailsClient from './ProductDetailsClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug || String(p.id) === slug) || MOCK_PRODUCTS[0];

  return {
    title: `${product.name} | WellSell BD`,
    description: product.description || `Buy 100% original imported ${product.name} at WellSell BD with nationwide cash on delivery.`,
    openGraph: {
      title: `${product.name} - WellSell BD`,
      description: product.description || `Shop authentic ${product.brand} cosmetics and skincare at WellSell BD.`,
      images: [product.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - WellSell BD`,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug || String(p.id) === slug) || MOCK_PRODUCTS[0];

  return <ProductDetailsClient initialProduct={product} productSlug={slug} />;
}
