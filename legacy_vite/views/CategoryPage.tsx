import { SlidersHorizontal } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../data/mockData';
import { api } from '../services/api';
import { Product } from '../types';

export const CategoryPage: React.FC = () => {
  const {
    activeCategorySlug,
    searchQuery,
    setSearchQuery,
    navigateToCategory,
    formatPrice
  } = useApp();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states matching Postman API query params
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'views'>('default');

  const currentCategory = MOCK_CATEGORIES.find((c) => c.slug === activeCategorySlug);

  useEffect(() => {
    setLoading(true);
    api.getProducts({
      category_slug: activeCategorySlug || undefined,
      search: searchQuery || undefined
    })
      .then((res) => {
        if (res.success) setProducts(res.data.products);
      })
      .finally(() => setLoading(false));
  }, [activeCategorySlug, searchQuery]);

  // Unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(MOCK_PRODUCTS.map((p) => p.brand).filter(Boolean)));
    return ['all', ...list];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

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
  }, [products, selectedBrand, priceRange, sortBy]);

  return (
    <div className="w-full pb-16 pt-4 sm:pt-6">
      <div className="container space-y-6">
        {/* Breadcrumb / Title Bar */}
        <div className="section-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              {searchQuery
                ? `Search: "${searchQuery}"`
                : currentCategory
                ? currentCategory.name
                : 'All Departments & Products'}
            </h1>
            <p className="text-xs text-[#736C62] dark:text-[#9E968B] mt-0.5">
              Showing <strong className="font-mono text-primary">{filteredProducts.length}</strong> available genuine items
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
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Filter Products</span>
            </div>

            {/* Department categories */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] mb-2.5">
                Categories
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    onClick={() => navigateToCategory('')}
                    className={`text-left w-full hover:text-primary transition-colors ${
                      !activeCategorySlug ? 'font-bold text-primary' : 'text-[#5C5549] dark:text-[#B3ABA0]'
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {MOCK_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => navigateToCategory(cat.slug)}
                      className={`text-left w-full hover:text-primary transition-colors ${
                        activeCategorySlug === cat.slug
                          ? 'font-bold text-primary'
                          : 'text-[#5C5549] dark:text-[#B3ABA0]'
                      }`}
                    >
                      {cat.name}
                    </button>
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
                      name="filter_brand"
                      checked={selectedBrand === b}
                      onChange={() => setSelectedBrand(b)}
                      className="accent-[#BA2D1D]"
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
                Price (Tk.)
              </h4>
              <div className="space-y-2 text-xs">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-[#BA2D1D]"
                />
                <div className="flex justify-between font-mono text-[11px] text-[#736C62]">
                  <span>Tk. {priceRange[0]}</span>
                  <span>Tk. {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSelectedBrand('all');
                setPriceRange([0, 10000]);
                setSortBy('default');
                setSearchQuery('');
              }}
              className="w-full border border-[#DCD5C9] dark:border-[#38332C] hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] py-2 text-xs font-semibold rounded-xs uppercase tracking-wider text-[#736C62] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="p-12 text-center text-xs text-[#736C62]">
                Loading catalog items...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#312E29] rounded-sm p-12 text-center space-y-3">
                <p className="font-serif text-lg font-medium text-[#1F1D1A] dark:text-[#EDE7DE]">
                  No matching products found
                </p>
                <p className="text-xs text-[#736C62] dark:text-[#9E968B] max-w-sm mx-auto">
                  Try adjusting your price range, clearing brand filters, or searching for other health & beauty keywords.
                </p>
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setPriceRange([0, 10000]);
                    setSearchQuery('');
                  }}
                  className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xs uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
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
};
