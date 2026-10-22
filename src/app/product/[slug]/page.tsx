import type { Metadata } from 'next';
import { MOCK_PRODUCTS } from '@/data/mockData';
import ProductDetailsClient from './ProductDetailsClient';
import { serverApiGet } from '@/services/serverApi';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await serverApiGet('product/details', { slug: slug }).catch(() => null);

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
  const product = await serverApiGet('product/details', { slug: slug }).catch(() => null);

  return <ProductDetailsClient product={product} productSlug={slug} />;
}
