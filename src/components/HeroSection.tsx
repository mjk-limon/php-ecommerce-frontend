'use client';

import { getAssetUrl } from '@/lib/assetHelper';
import { Category } from '@/types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  categories: Category[];
}

export default function HeroSection({ categories }: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredDept, setHoveredDept] = useState<Category | null>(null);
  const [pinnedDept, setPinnedDept] = useState(false);

  useEffect(() => {
    const openFromHeader = () => {
      const firstDepartment = categories.find((category) => category.childs?.length) || categories[0];
      if (!firstDepartment) return;
      setHoveredDept(firstDepartment);
      setPinnedDept(true);
      document.getElementById('home-hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const closeOnOutsideClick = (event: MouseEvent) => {
      const hero = document.getElementById('home-hero');
      if (pinnedDept && hero && !hero.contains(event.target as Node)) {
        setPinnedDept(false);
        setHoveredDept(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPinnedDept(false);
        setHoveredDept(null);
      }
    };
    window.addEventListener('focus-hero-departments', openFromHeader);
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('focus-hero-departments', openFromHeader);
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [categories, pinnedDept]);

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

  return (
    <section id="home-hero" className="container scroll-mt-4 pt-4">
      <div
        className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch relative"
        onMouseLeave={() => {
          if (!pinnedDept) setHoveredDept(null);
        }}
      >
        {/* Always Open ALL DEPARTMENTS Menu on the Left (3 cols) */}
        <div className="hidden lg:block lg:col-span-1 section-card p-0 relative z-30">
          {/* Department List */}
          <ul className="divide-y divide-[#F7F7F7] dark:divide-[#252525] text-xs py-1">
            {categories.map((cat) => (
              <li
                key={cat.id}
                onMouseEnter={() => setHoveredDept(cat)}
                className="relative"
              >
                <Link
                  href={`/category/${cat.slug}`}
                  onClick={() => setPinnedDept(false)}
                  className={`group w-full text-left py-3 px-4 flex items-center justify-between transition-colors font-medium text-xs capitalize ${hoveredDept?.id === cat.id
                    ? 'bg-[#FDF7F5] dark:bg-[#2A2422] text-primary font-semibold'
                    : 'text-[#2A2621] dark:text-[#EDE7DE] hover:text-primary hover:bg-[#FAFAFA] dark:hover:bg-[#252525]'
                    }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#9A9184] shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>

          {hoveredDept?.childs?.length ? (
            <div className="absolute top-0 left-full z-40 hidden w-200 h-full overflow-y-auto rounded-2xl border border-white/70 bg-white/65 p-6 shadow-xl backdrop-blur-xl animate-menu-enter lg:block">
              <div className="mb-5 flex items-center justify-between border-b border-[#e9ece8] pb-3">
                <h2 className="text-sm font-semibold text-[#243129]">{hoveredDept.name}</h2>
                <Link href={`/category/${hoveredDept.slug}`} onClick={() => setPinnedDept(false)} className="text-xs font-semibold text-[#68183f] hover:underline">Explore all</Link>
              </div>

              <div className="grid grid-cols-3 gap-x-7 gap-y-6">
                {hoveredDept.childs.map((subcategory) => (
                  <div key={subcategory.id} className="min-w-0">
                    <Link
                      href={`/category/${subcategory.slug}`}
                      onClick={() => setPinnedDept(false)}
                      className="mb-2 block text-[13px] font-semibold text-[#28352d] hover:text-[#68183f]"
                    >
                      {subcategory.name}
                    </Link>
                    <ul className="space-y-1">
                      {(subcategory.childs || []).map((subSubcategory) => (
                        <li key={subSubcategory.id}>
                          <Link
                            href={`/category/${subSubcategory.slug}`}
                            onClick={() => setPinnedDept(false)}
                            className="block rounded-md px-2 py-1 text-xs leading-5 text-[#59645c] hover:bg-white/80 hover:text-[#68183f]"
                          >
                            {subSubcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Hero Banner (9 cols) */}
        <div className="lg:col-span-4 relative rounded-xs overflow-hidden section-card min-h-[360px] sm:min-h-[440px] flex items-center">
          <img
            src={getAssetUrl(heroSlides[activeSlide].image)}
            alt={heroSlides[activeSlide].title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
          />
          {/* Soft Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent dark:from-[#121212]/95 dark:via-[#121212]/75 dark:to-transparent" />

          <div className="relative z-10 max-w-lg p-6 sm:p-12 space-y-3">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-primary dark:text-[#E05343] font-mono">
              {heroSlides[activeSlide].subtitle}
            </span>
            <h1 className="font-serif font-black text-2xl sm:text-4xl text-[#1F1D1A] dark:text-[#EDE7DE] leading-tight">
              {heroSlides[activeSlide].title}
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5549] dark:text-[#B3ABA0] leading-relaxed">
              {heroSlides[activeSlide].desc}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href={`/category/${heroSlides[activeSlide].slug}`}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-6 py-2.5 rounded-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>{heroSlides[activeSlide].cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/product/victorias-secret-very-sexy-eau-de-parfum-100ml"
                className="bg-white/90 dark:bg-[#1E1E1E]/90 hover:bg-white text-[#1F1D1A] dark:text-[#EDE7DE] text-xs font-semibold px-4 py-2.5 rounded-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
              >
                Featured Fragrance
              </Link>
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
  );
}
