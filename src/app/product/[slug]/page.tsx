import { serverApiGet } from "@/services/serverApi";
import { Product, QuestionItem, ReviewItem } from "@/types";
import type { Metadata } from "next";
import ProductDetailsClient from "./ProductDetailsClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const productResponse = await serverApiGet<{ meta: Metadata }>("product/details", { slug }).catch(() => null);

  return productResponse.meta;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: product } = await serverApiGet<{ data: Product }>("product/details", { slug });
  const categoryId = product.category_id;

  const [reviewsRes, questionsRes, suggestionsRes] = await Promise.all([
    serverApiGet<any>(`product/${product.id}/reviews`).catch(() => []),
    serverApiGet<any>(`product/${product.id}/questions`).catch(() => []),
    serverApiGet<any>("product/suggestions", { category_ids: categoryId }).catch(() => []),
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
