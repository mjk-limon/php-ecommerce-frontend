'use client';

import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { Category, FilterObjects, Product } from '@/types';
import { SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CategoryClientProps {
  products: Product[];
  category: Category | null;
  filterObjects?: FilterObjects;
  slug: string;
}

export default function CategoryClient({
  products,
  category,
  filterObjects,
  slug
}: CategoryClientProps) {
  const { formatPrice, searchQuery } = useApp();

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'views'>('default');

  return (
    <div className="w-full pb-16 pt-4 sm:pt-6">
      <div className="container space-y-6">
        {/* Breadcrumb / Title Bar */}
        <Card className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#736C62] dark:text-[#9E968B] mb-1">
              <Link href="/" className="hover:text-primary">Home</Link>
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
              Showing <strong className="font-mono text-primary">{products.length}</strong> available genuine items
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
        </Card>

        {/* 2-Column Split: Filters & Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Filters Sidebar */}
          <Card className="space-y-6">
            <div className="flex items-center gap-2 border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3 text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Filter Products</span>
            </div>

            {/* Brand Filter */}
            <div className="pt-3 border-t border-[#F4EFEA] dark:border-[#272420]">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] mb-2.5">
                Brand
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto text-xs">
                {filterObjects?.brands && Object.values(filterObjects.brands).map((b: string) => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="brand_filter"
                      value={b}
                      checked={selectedBrand === b}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="text-primary focus:ring-[#BA2D1D]"
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
          </Card>

          {/* Product Grid (3 cols on desktop) */}
          <Card className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <p className="font-serif font-bold text-base text-[#1F1D1A] dark:text-[#EDE7DE]">
                  No products found matching your filter criteria
                </p>
                <p className="text-xs text-[#736C62] dark:text-[#9E968B]">
                  Try resetting the brand filter or adjusting the price slider.
                </p>
                <Button
                  type="button"
                  variant="default"
                  onClick={() => {
                    setSelectedBrand('all');
                    setPriceRange([0, 10000]);
                  }}
                  className="text-xs font-semibold uppercase tracking-wider"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
