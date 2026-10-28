import type { Metadata } from 'next';
import ProductDetailsClient from './ProductDetailsClient';
import { serverApiGet } from '@/services/serverApi';
import { Product, ReviewItem, QuestionItem } from '@/types';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await serverApiGet<Product>('product/details', { slug }).catch(() => null);

  if (!product) {
    return {
      title: 'Product Details | ilmComm'
    };
  }

  const name = product.name || slug;
  const description =
    product.description?.replace(/<[^>]*>?/gm, '')?.slice(0, 160) ||
    `${name} available at best price on ilmComm.`;
  const image = product.variants?.[0]?.images?.[0] || '';

  return {
    title: `${name} | ilmComm`,
    description,
    openGraph: {
      title: `${name} - ilmComm`,
      description,
      images: image ? [image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} - ilmComm`,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await serverApiGet<Product>('product/details', { slug }).catch(() => null);
  

  if (!product) {
    notFound();
  }

  const categoryId = product.category_id || product.category?.[0]?.id || 14;

  const [reviewsRes, questionsRes, suggestionsRes] = await Promise.all([
    serverApiGet<any>(`product/${product.id}/reviews`).catch(() => []),
    serverApiGet<any>(`product/${product.id}/questions`).catch(() => []),
    serverApiGet<any>('product/suggestions', { category_ids: categoryId }).catch(() => [])
  ]);

  const initialReviews: ReviewItem[] = Array.isArray(reviewsRes) ? reviewsRes : reviewsRes?.data || [];
  const initialQuestions: QuestionItem[] = Array.isArray(questionsRes) ? questionsRes : questionsRes?.data || [];
  const initialSuggestions: Product[] = Array.isArray(suggestionsRes) ? suggestionsRes : suggestionsRes?.data || [];

  return (
    <ProductDetailsClient
      product={product}
      reviews={initialReviews}
      questions={initialQuestions}
      suggestions={initialSuggestions}
    />
  );
}
