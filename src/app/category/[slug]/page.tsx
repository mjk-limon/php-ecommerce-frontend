import type { Metadata } from 'next';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/data/mockData';
import CategoryClient from './CategoryClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const currentCategory = MOCK_CATEGORIES.find((c) => c.slug === slug);
  const title = currentCategory ? `${currentCategory.name} | WellSell BD` : 'All Departments | WellSell BD';
  const description = currentCategory
    ? `Shop authentic imported ${currentCategory.name} products with cash on delivery at WellSell BD.`
    : 'Browse all imported beauty, wellness, skincare, and health vitamins at WellSell BD.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [currentCategory?.images || '/src/assets/images/hero_beauty_skincare_banner_1792385518854.jpg'],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const currentCategory = MOCK_CATEGORIES.find((c) => c.slug === slug) || null;

  let initialProducts = [...MOCK_PRODUCTS];
  if (slug && slug !== 'all' && currentCategory) {
    initialProducts = initialProducts.filter(
      (p) =>
        p.category_id === currentCategory.id ||
        (p.category_name && p.category_name.toLowerCase().includes(currentCategory.name.toLowerCase())) ||
        p.slug.includes(slug)
    );
    if (initialProducts.length === 0) {
      initialProducts = MOCK_PRODUCTS.slice(0, 6);
    }
  }

  return (
    <CategoryClient
      initialProducts={initialProducts}
      currentCategory={currentCategory}
      slug={slug}
    />
  );
}
