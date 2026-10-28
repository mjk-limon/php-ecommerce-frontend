import HeroSection from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { Card } from "@/components/ui/card";
import { asset } from "@/lib/utils";
import { getServerCategories, serverApiGet } from "@/services/serverApi";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const [categories, homepageData] = await Promise.all([
    getServerCategories(),
    serverApiGet<any>("home", {
      fetches: "trending_categories,trending_products,new_arrivals,category_products",
    }),
  ]);

  const trending_categories = homepageData?.trending_categories || [];
  const trending_products = homepageData?.trending_products || [];
  const new_arrivals = homepageData?.new_arrivals || [];
  const category_products = homepageData?.category_products || [];

  return (
    <div className="w-full pb-16 space-y-8 sm:space-y-10">
      {/* 1. Hero Section with Departments Sidebar */}
      <HeroSection categories={categories} />

      {/* Top ranking departments */}
      {trending_categories.length > 0 && (
        <div className="w-full bg-[#f4f2ee] dark:bg-[#181818] border-y border-[#eae6df] dark:border-[#262626]">
          <section className="container py-6">
            <div className="mb-4 flex justify-center items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#68183f] dark:text-primary" />
              <h2 className="text-base font-semibold text-[#202923] dark:text-white">Top Ranking Categories</h2>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-8">
              {trending_categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group flex flex-col items-center gap-2 text-center"
                >
                  <span className="h-20 w-20 overflow-hidden rounded-full bg-[#f2f4f1] dark:bg-[#252525] ring-1 ring-[#e9ece8] dark:ring-[#333] transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-[#b8c9bd] sm:h-24 sm:w-24 flex items-center justify-center">
                    <img
                      src={asset(category.images?.featured_icon, "assets/images/product-placeholder.png")}
                      alt={category.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </span>
                  <span className="line-clamp-2 text-xs font-medium text-[#343d36] dark:text-[#EDE7DE] transition-colors group-hover:text-[#68183f] dark:group-hover:text-primary max-w-24">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 2. TRENDING Showcase */}
      {trending_products.length > 0 && (
        <section className="container">
          <Card className="section-card">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0EDE8] dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h2 className="font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE] tracking-wider">
                  Trending Now
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              {trending_products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* New arrivals with featured category poster */}
      {new_arrivals.length > 0 && (
        <section className="container">
          <div className="mb-4 flex items-center justify-between pb-3">
            <h2 className="mt-1 text-xl font-semibold text-[#202923] dark:text-white">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-6">
            <div className="col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
              {new_arrivals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} border />
              ))}
            </div>
            <Link
              href="/category/health-beauty"
              className="group col-span-2 min-h-75 overflow-hidden rounded-2xl md:min-h-full relative block"
            >
              <img
                src={"/assets/images/makeup-collection-promo.jpg"}
                alt="Explore the makeup collection"
                className="h-full min-h-75 w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] md:min-h-full"
              />
            </Link>
            <div className="col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
              {new_arrivals.slice(4, 8).map((product) => (
                <ProductCard key={product.id} product={product} border />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Browse Our Categories: Vertical thumbnail + product grid */}
      {category_products.length > 0 && (
        <section className="container space-y-8">
          <div className="pb-2">
            <h2 className="font-bold text-lg sm:text-xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              Browse Our Categories
            </h2>
          </div>

          {category_products.map((category) => (
            <Card key={category.id} className="section-card">
              {/* Category Section Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F0EDE8] dark:border-[#2A2A2A]">
                <h3 className="font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
                  {category.name}
                </h3>
                <Link
                  href={`/category/${category.slug}`}
                  className="text-xs text-primary dark:text-[#E05343] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All ›</span>
                </Link>
              </div>

              {/* Grid with Left Vertical Category Thumbnail + Product Cards */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {/* Category Vertical Thumbnail */}
                <div className="col-span-2 md:row-span-1 min-h-55 relative rounded-xs overflow-hidden group">
                  <Link href={`/category/${category.slug}`} className="block w-full h-full relative cursor-pointer">
                    {category.images?.browse_category_feature && (
                      <img
                        src={asset(category.images?.browse_category_feature)}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    )}
                    {/* Scrim Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
                      <h4 className="font-bold text-lg leading-tight mt-0.5">{category.name}</h4>
                      <p className="text-[11px] text-white/80 mt-1 flex items-center gap-1 font-medium">
                        <span>Explore Products</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </p>
                    </div>
                  </Link>
                </div>

                {/* 4 Product Cards Grid */}
                {category.products?.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
