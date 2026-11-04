import { serverApiGet } from "@/services/serverApi";
import { Category, FilterObjects, Product } from "@/types";
import type { Metadata } from "next";
import CategoryClient from "./CategoryClient";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
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
  try {
    const categoryResult = await serverApiGet<ProductApi>("products", {
      ...(slug && slug !== "all" ? { category_slug: slug } : {}),
    });
    return categoryResult?.meta || { title: "Products - Wellsell BD" };
  } catch {
    return { title: "Products - Wellsell BD" };
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = (await searchParams) || {};

  const queryParams: Record<string, string | number | undefined> = {};
  if (slug && slug !== "all") {
    queryParams["category_slug"] = slug;
  }
  if (sp["price[from]"]) queryParams["price[from]"] = String(sp["price[from]"]);
  if (sp["price[to]"]) queryParams["price[to]"] = String(sp["price[to]"]);
  if (sp["brands"]) queryParams["brands"] = String(sp["brands"]);
  if (sp["size"]) queryParams["size"] = String(sp["size"]);
  if (sp["color"]) queryParams["color"] = String(sp["color"]);
  if (sp["search"]) queryParams["search"] = String(sp["search"]);

  let categoryResult: ProductApi["data"] | null = null;
  try {
    const res = await serverApiGet<ProductApi>("products", queryParams);
    categoryResult = res?.data || null;
  } catch (error) {
    console.error("Failed to load products for category:", slug, error);
    categoryResult = null;
  }

  return (
    <CategoryClient
      products={categoryResult?.products || []}
      category={categoryResult?.category || null}
      filterObjects={categoryResult?.filter_objects}
      categorySlug={slug !== "all" ? slug : undefined}
    />
  );
}
