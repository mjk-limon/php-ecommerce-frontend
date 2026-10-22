import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../data/mockData';
import { Category } from '../types';

export const HomePage: React.FC = () => {
  const { navigateToCategory, navigateToProduct, formatPrice } = useApp();
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredDept, setHoveredDept] = useState<Category | null>(null);

  const heroSlides = [
    {
      id: 1,
      title: 'Pure Hydration & Natural Radiance',
      subtitle: 'DERMATOLOGIST VERIFIED BEAUTY COLLECTION',
      desc: 'Formulated with certified organic botanicals, ceramides, and pure floral extracts.',
      image: '/src/assets/images/hero_beauty_skincare_banner_1792385518854.jpg',
      cta: 'Explore Collection',
      slug: 'health-beauty'
    },
    {
      id: 2,
      title: "Victoria's Secret Fragrances 2026",
      subtitle: 'ORIGINAL IMPORTED LUXURY EAU DE PARFUM',
      desc: 'Sensual vanilla orchid, wild blackberry, and crisp sun-drenched clementine sprays.',
      image: '/src/assets/images/product_perfume_very_sexy_1792385519859.jpg',
      cta: 'Shop Perfumes',
      slug: 'health-beauty'
    }
  ];

  // Trending products
  const trendingProducts = MOCK_PRODUCTS.slice(0, 6);

  // Group products by category for "Browse Our Categories"
  const categoriesToBrowse = [
    {
      category: MOCK_CATEGORIES.find((c) => c.slug === 'health-vitamin')!,
      thumbnail: '/src/assets/images/category_health_vitamin_banner_1792385519799.jpg',
      products: MOCK_PRODUCTS.filter((p) => p.category_id === 101).slice(0, 4)
    },
    {
      category: MOCK_CATEGORIES.find((c) => c.slug === 'health-beauty')!,
      thumbnail: '/src/assets/images/hero_beauty_skincare_banner_1792385518854.jpg',
      products: MOCK_PRODUCTS.filter((p) => p.category_id === 102).slice(0, 4)
    },
    {
      category: MOCK_CATEGORIES.find((c) => c.slug === 'men')!,
      thumbnail: '/src/assets/images/category_banner_men_1792386936747.jpg',
      products: MOCK_PRODUCTS.filter((p) => p.brand === "Victoria's Secret" || p.brand === 'Origins' || p.category_id === 106).slice(0, 4)
    },
    {
      category: MOCK_CATEGORIES.find((c) => c.slug === 'mom-kids')!,
      thumbnail: '/src/assets/images/category_banner_mom_kids_1792386938739.jpg',
      products: MOCK_PRODUCTS.filter((p) => p.category_id === 104 || p.brand === 'Kodomo' || p.brand === "Nature's Bounty").slice(0, 4)
    },
    {
      category: MOCK_CATEGORIES.find((c) => c.slug === 'watch-collection')!,
      thumbnail: '/src/assets/images/category_banner_watches_1792386938623.jpg',
      products: MOCK_PRODUCTS.filter((p) => p.category_id === 106 || p.brand === 'Casio').concat(MOCK_PRODUCTS.slice(0, 3)).slice(0, 4)
    },
    {
      category: MOCK_CATEGORIES.find((c) => c.slug === 'korean-collection')!,
      thumbnail: '/src/assets/images/category_banner_korean_beauty_1792386937884.jpg',
      products: MOCK_PRODUCTS.filter((p) => p.category_id === 107).slice(0, 4)
    }
  ];

  return (
    <div className="w-full pb-16 space-y-8 sm:space-y-10">
      {/* 1. Hero Section with ALWAYS OPEN All Departments Sidebar & Submenu */}
      <section className="container pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
          {/* Always Open ALL DEPARTMENTS Menu on the Left (3.5 cols) */}
          <div
            className="hidden lg:block lg:col-span-3 section-card p-0 relative z-30"
            onMouseLeave={() => setHoveredDept(null)}
          >
            {/* Header matching Screenshot 1 */}
            <div className="bg-[#BA2D1D] text-white px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-between rounded-t-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>ALL DEPARTMENTS</span>
              </div>
            </div>

            {/* Department List */}
            <ul className="divide-y divide-[#F7F7F7] dark:divide-[#252525] text-xs py-1">
              {MOCK_CATEGORIES.slice(0, 9).map((cat) => (
                <li
                  key={cat.id}
                  onMouseEnter={() => setHoveredDept(cat)}
                  className="relative"
                >
                  <button
                    onClick={() => navigateToCategory(cat.slug)}
                    className={`w-full text-left py-2.5 px-4 flex items-center justify-between transition-colors font-medium text-xs ${
                      hoveredDept?.id === cat.id
                        ? 'bg-[#FDF7F5] dark:bg-[#2A2422] text-[#BA2D1D] font-semibold'
                        : 'text-[#2A2621] dark:text-[#EDE7DE] hover:text-[#BA2D1D] hover:bg-[#FAFAFA] dark:hover:bg-[#252525]'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#9A9184] shrink-0" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Category Flyout Submenu */}
            {hoveredDept && hoveredDept.childs && hoveredDept.childs.length > 0 && (
              <div
                className="absolute top-0 left-full ml-1 w-80 bg-white dark:bg-[#1E1E1E] section-card p-5 z-40 space-y-4"
                onMouseEnter={() => setHoveredDept(hoveredDept)}
                onMouseLeave={() => setHoveredDept(null)}
              >
                <div className="border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-2 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-sm text-[#1F1D1A] dark:text-[#EDE7DE]">
                    {hoveredDept.name}
                  </h3>
                  <button
                    onClick={() => navigateToCategory(hoveredDept.slug)}
                    className="text-[11px] text-[#BA2D1D] hover:underline font-semibold"
                  >
                    View All ›
                  </button>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#736C62] dark:text-[#9E968B]">
                    Subcategories & Formulations
                  </p>
                  <ul className="space-y-1 text-xs">
                    {hoveredDept.childs.map((sub) => (
                      <li key={sub.id}>
                        <button
                          onClick={() => navigateToCategory(sub.slug)}
                          className="w-full text-left py-1.5 px-2 rounded-xs hover:bg-[#FDF7F5] dark:hover:bg-[#2A2422] hover:text-[#BA2D1D] transition-colors text-[#3E3A34] dark:text-[#C5BEB3] flex items-center justify-between"
                        >
                          <span>{sub.name}</span>
                          <span className="text-[10px] text-[#9A9184]">→</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submenu mini promo thumbnail */}
                {hoveredDept.images && (
                  <div
                    onClick={() => navigateToCategory(hoveredDept.slug)}
                    className="relative rounded-xs overflow-hidden h-28 cursor-pointer group"
                  >
                    <img
                      src={hoveredDept.images}
                      alt={hoveredDept.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 flex flex-col justify-end text-white">
                      <span className="text-[10px] font-bold">100% Genuine Imported</span>
                      <span className="text-[11px] underline">Shop {hoveredDept.name} ›</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hero Banner (9 cols) */}
          <div className="lg:col-span-9 relative rounded-xs overflow-hidden section-card min-h-[360px] sm:min-h-[440px] flex items-center">
            <img
              src={heroSlides[activeSlide].image}
              alt={heroSlides[activeSlide].title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
            />
            {/* Soft Scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent dark:from-[#121212]/95 dark:via-[#121212]/75 dark:to-transparent" />

            <div className="relative z-10 max-w-lg p-6 sm:p-12 space-y-3">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#BA2D1D] dark:text-[#E05343] font-mono">
                {heroSlides[activeSlide].subtitle}
              </span>
              <h1 className="font-serif font-black text-2xl sm:text-4xl text-[#1F1D1A] dark:text-[#EDE7DE] leading-tight">
                {heroSlides[activeSlide].title}
              </h1>
              <p className="text-xs sm:text-sm text-[#5C5549] dark:text-[#B3ABA0] leading-relaxed">
                {heroSlides[activeSlide].desc}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => navigateToCategory(heroSlides[activeSlide].slug)}
                  className="bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold px-6 py-2.5 rounded-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>{heroSlides[activeSlide].cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigateToProduct('victorias-secret-very-sexy-eau-de-parfum-100ml')}
                  className="bg-white/90 dark:bg-[#1E1E1E]/90 hover:bg-white text-[#1F1D1A] dark:text-[#EDE7DE] text-xs font-semibold px-4 py-2.5 rounded-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                >
                  Featured Fragrance
                </button>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-20">
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full bg-white/90 dark:bg-[#1E1E1E]/90 shadow-sm flex items-center justify-center text-[#1F1D1A] dark:text-white hover:bg-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full bg-white/90 dark:bg-[#1E1E1E]/90 shadow-sm flex items-center justify-center text-[#1F1D1A] dark:text-white hover:bg-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING Showcase (Note: Top Ranking and New Arrivals removed as requested) */}
      <section className="container">
        <div className="section-card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5 border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#BA2D1D]" />
              <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE] uppercase tracking-wider">
                TRENDING
              </h2>
            </div>
            <button
              onClick={() => navigateToCategory('health-beauty')}
              className="text-xs text-[#BA2D1D] dark:text-[#E05343] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Trending</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {trendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Browse Our Categories: Each with category vertical thumbnail + product grid matching Screenshot 1 */}
      <section className="container space-y-8">
        <div className="border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-2">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-[#1F1D1A] dark:text-[#EDE7DE]">
            Browse Our Categories
          </h2>
          <p className="text-xs text-[#736C62] dark:text-[#9E968B]">
            Premium imports with verified serial authenticity across all departments.
          </p>
        </div>

        {categoriesToBrowse.map((item) => (
          <div key={item.category.id} className="section-card p-4 sm:p-6 space-y-4">
            {/* Category Section Header */}
            <div className="flex items-center justify-between border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
                {item.category.name}
              </h3>
              <button
                onClick={() => navigateToCategory(item.category.slug)}
                className="text-xs text-[#BA2D1D] dark:text-[#E05343] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All ›</span>
              </button>
            </div>

            {/* Grid with Left Vertical Category Thumbnail + 4 Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
              {/* Category Vertical Thumbnail matching Screenshot 1 */}
              <div
                onClick={() => navigateToCategory(item.category.slug)}
                className="md:col-span-3 relative rounded-xs overflow-hidden cursor-pointer group min-h-[220px] md:min-h-full shadow-xs"
              >
                <img
                  src={item.thumbnail}
                  alt={item.category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Scrim Overlay matching Screenshot */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
                  <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center bg-black/30 mb-2">
                    <span className="font-serif font-bold text-xs text-white">W</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300 font-semibold">
                    OFFICIAL IMPORT
                  </span>
                  <h4 className="font-serif font-bold text-lg leading-tight mt-0.5">
                    {item.category.name}
                  </h4>
                  <p className="text-[11px] text-white/80 mt-1 flex items-center gap-1 font-medium">
                    <span>Explore Products</span>
                    <ArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </div>

              {/* 4 Product Cards Grid (9 cols) */}
              <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {item.products.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>

            {/* Bottom Right "View All" link matching Screenshot 1 */}
            <div className="text-right pt-2 border-t border-[#F0EDE8] dark:border-[#2A2A2A]">
              <button
                onClick={() => navigateToCategory(item.category.slug)}
                className="text-xs font-semibold text-[#BA2D1D] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View All {item.category.name}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
