import Link from 'next/link';
import {
  TrendingUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import { ProductCard } from '@/components/ProductCard';
import { getServerCategories, serverApiAssetUrl, serverApiGet } from '@/services/serverApi';
import { Category, Home, Product } from '@/types';

async function getHomeData(): Promise<{ categories: Category[]; homeData: Home }> {
  const [categories, homepageData] = await Promise.all([
    getServerCategories(),
    serverApiGet<any>('home', { fetches: 'trending_categories,trending_products,new_arrivals,category_products' }).catch(() => null)
  ]);

  return { categories, homeData: homepageData || [] };
}

export default async function HomePage() {
  const { categories, homeData } = await getHomeData();
  const { trending_categories, trending_products, new_arrivals, category_products } = homeData;


  return (
    <div className="w-full pb-16 space-y-8 sm:space-y-10">
      {/* 1. Hero Section with Departments Sidebar */}
      <HeroSection categories={categories} />

      {/* Top ranking departments */}
      <div className="w-full bg-gray-100">
        <section className="container py-6">
          <div className="mb-4 flex justify-center items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#68183f]" />
            <h2 className="text-base font-semibold text-[#202923] dark:text-white">Top Raking Categories</h2>
          </div>
          <div className="flex justify-center items-center gap-5">
            {trending_categories.map((category, index) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="group flex flex-col items-center gap-2 text-center">
                <span className="h-20 w-20 overflow-hidden rounded-full bg-[#f2f4f1] ring-1 ring-[#e9ece8] transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-[#b8c9bd] sm:h-24 sm:w-24">
                  <img src={category.images ? category.images[0] : ''} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="line-clamp-2 text-xs font-medium text-[#343d36] transition-colors group-hover:text-[#68183f]">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* 2. TRENDING Showcase */}
      <section className="container">
        <div className="section-card">
          <div className="flex items-center justify-between section-card-title">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#BA2D1D]" />
              <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE] tracking-wider">
                Trending Now
              </h2>
            </div>
            {/* <Link
              href="/category/health-beauty"
              className="text-xs text-[#BA2D1D] dark:text-[#E05343] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Trending</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link> */}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {trending_products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals with featured category poster */}
      <section className="container">
        <div className="mb-4 flex items-center justify-between pb-3">
          <div>
            <h2 className="mt-1 font-serif text-xl font-semibold text-[#202923] dark:text-white">New arrivals</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-6">
          <div className="col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
            {new_arrivals.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} border />)}
          </div>
          <Link href="/category/health-beauty" className="group col-span-2 min-h-75 overflow-hidden rounded-2xl md:min-h-full">
            <img src="/assets/images/makeup-collection-promo.jpg" alt="Explore the makeup collection" className="h-full min-h-75 w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] md:min-h-full" />
          </Link>
          <div className="col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
            {new_arrivals.slice(4, 8).map((product) => <ProductCard key={product.id} product={product} border />)}
          </div>
        </div>
      </section>

      {/* 3. Browse Our Categories: Vertical thumbnail + product grid */}
      <section className="container space-y-8">
        <div className="pb-2">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-[#1F1D1A] dark:text-[#EDE7DE]">
            Browse Our Categories
          </h2>
        </div>

        {category_products.map((category) => (
          <div key={category.id} className="section-card">
            {/* Category Section Header */}
            <div className="flex items-center justify-between section-card-title">
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
                {category.name}
              </h3>
              <Link
                href={`/category/${category.slug}`}
                className="text-xs text-[#BA2D1D] dark:text-[#E05343] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All ›</span>
              </Link>
            </div>

            {/* Grid with Left Vertical Category Thumbnail + 4 Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-stretch">
              {/* Category Vertical Thumbnail */}
              <div className="md:col-span-2 md:row-span-1 md:min-h-62.5 p-3 rounded-xs">
                <Link
                  href={`/category/${category.slug}`}
                  className="block w-full h-full relative cursor-pointer group overflow-hidden"
                >
                  {/* <img
                    src={item.thumbnail}
                    alt={category.name}
                    className="absolute w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  /> */}
                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
                    <h4 className="font-serif font-bold text-lg leading-tight mt-0.5">
                      {category.name}
                    </h4>
                    <p className="text-[11px] text-white/80 mt-1 flex items-center gap-1 font-medium">
                      <span>Explore Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </p>
                  </div>
                </Link>
              </div>

              {/* 4 Product Cards Grid (9 cols) */}
              {/* {category.products?.map((prod) => (
                <div className="col-span-1 h-full" key={prod.id} >
                  <ProductCard product={prod} />
                </div>
              ))} */}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
