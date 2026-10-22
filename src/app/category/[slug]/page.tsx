import type { Metadata } from 'next';
import CategoryClient from './CategoryClient';
import { serverApiGet } from '@/services/serverApi';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const productResults = await serverApiGet<object>('products', { category_slug: slug }).catch(() => null);

  if (!productResults) {
    return {};
  }

  const title = ' productResults.meta.title';
  const description = 'productResults.meta.description';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/src/assets/images/hero_beauty_skincare_banner_1792385518854.jpg'],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const productResults = await serverApiGet<object>('products', { category_slug: slug }).catch(() => null);

  return (
    <CategoryClient
      initialProducts={productResults.products}
      currentCategory={productResults.category}
      slug={slug}
    />
  );
}
