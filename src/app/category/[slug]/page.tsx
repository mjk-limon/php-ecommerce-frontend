import { serverApiGet } from "@/services/serverApi";
import { Category, FilterObjects, Product } from "@/types";
import type { Metadata } from "next";
import CategoryClient from "./CategoryClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ProductApi {
  meta: Metadata;
  data: {
    products: Product[];
    category: Category;
    filter_objects: FilterObjects;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryResult = await serverApiGet<ProductApi>("products", { category_slug: slug });

  return categoryResult.meta;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: categoryResult } = await serverApiGet<ProductApi>("products", { category_slug: slug });

  return (
    <CategoryClient
      products={categoryResult?.products || []}
      category={categoryResult?.category || null}
      filterObjects={categoryResult?.filter_objects}
    />
  );
}
