'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, ChevronRight, Check } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';
import { MOCK_CATEGORIES } from '@/data/mockData';
import { Category, Product } from '@/types';
import { api } from '@/services/api';

interface CategoryClientProps {
  products: Product[];
  category: Category | null;
  slug: string;
}

export default function CategoryClient({
  products,
  category,
  slug
}: CategoryClientProps) {
  const { formatPrice, searchQuery } = useApp();

  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);


  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'views'>('default');

  // Unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
    return ['all', ...list];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.category_name && p.category_name.toLowerCase().includes(q))
      );
    }

    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'views') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return result;
  }, [products, selectedBrand, priceRange, sortBy, searchQuery]);

  return (
    <div className="w-full pb-16 pt-4 sm:pt-6">
      <div className="container space-y-6">
        {/* Breadcrumb / Title Bar */}
        <div className="section-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#736C62] dark:text-[#9E968B] mb-1">
              <Link href="/" className="hover:text-[#BA2D1D]">Home</Link>
              <span>›</span>
              <span className="text-[#1F1D1A] dark:text-[#EDE7DE] font-semibold">
                {category ? category.name : 'All Products'}
              </span>
            </div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              {searchQuery
                ? `Search: "${searchQuery}"`
                : category
                  ? category.name
                  : 'All Departments & Products'}
            </h1>
            <p className="text-xs text-[#736C62] dark:text-[#9E968B] mt-0.5">
              Showing <strong className="font-mono text-[#BA2D1D]">{filteredProducts.length}</strong> available genuine items
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#736C62] dark:text-[#9E968B]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAFAFA] dark:bg-[#1A1A1A] border border-[#DCD5C9] dark:border-[#38332C] px-3 py-1.5 rounded-xs text-xs font-medium text-[#1F1D1A] dark:text-[#EDE7DE]"
            >
              <option value="default">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="views">Most Popular Views</option>
            </select>
          </div>
        </div>

        {/* 2-Column Split: Filters & Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Filters Sidebar */}
          <div className="section-card p-4 sm:p-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3 text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
              <SlidersHorizontal className="w-4 h-4 text-[#BA2D1D]" />
              <span>Filter Products</span>
            </div>

            {/* Department categories */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] mb-2.5">
                Categories
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link
                    href="/category/all"
                    className={`block w-full hover:text-[#BA2D1D] transition-colors ${slug === 'all' || !slug ? 'font-bold text-[#BA2D1D]' : 'text-[#5C5549] dark:text-[#B3ABA0]'
                      }`}
                  >
                    All Categories
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className={`block w-full hover:text-[#BA2D1D] transition-colors ${slug === cat.slug
                          ? 'font-bold text-[#BA2D1D]'
                          : 'text-[#5C5549] dark:text-[#B3ABA0]'
                        }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand Filter */}
            <div className="pt-3 border-t border-[#F4EFEA] dark:border-[#272420]">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] mb-2.5">
                Brand
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto text-xs">
                {brands.map((b) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="brand_filter"
                      value={b}
                      checked={selectedBrand === b}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="text-[#BA2D1D] focus:ring-[#BA2D1D]"
                    />
                    <span className="capitalize text-[#3E3A34] dark:text-[#C5BEB3]">
                      {b === 'all' ? 'All Brands' : b}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-3 border-t border-[#F4EFEA] dark:border-[#272420]">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] mb-2.5">
                Maximum Price: {formatPrice(priceRange[1])}
              </h4>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-[#BA2D1D] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#736C62] font-mono mt-1">
                <span>Tk. 0</span>
                <span>Tk. 10,000+</span>
              </div>
            </div>
          </div>

          {/* Product Grid (3 cols on desktop) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="section-card p-12 text-center space-y-3">
                <p className="font-serif font-bold text-base text-[#1F1D1A] dark:text-[#EDE7DE]">
                  No products found matching your filter criteria
                </p>
                <p className="text-xs text-[#736C62] dark:text-[#9E968B]">
                  Try resetting the brand filter or adjusting the price slider.
                </p>
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setPriceRange([0, 10000]);
                  }}
                  className="bg-[#BA2D1D] text-white text-xs font-semibold px-4 py-2 rounded-xs uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
