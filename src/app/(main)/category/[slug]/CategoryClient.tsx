"use client";

import { ProductCard } from "@/components/ProductCard";
import { RangeSlider } from "@/components/ui/range-slider";
import { useApp } from "@/context/AppContext";
import { normalizeProduct } from "@/services/api";
import { Category, FilterObjects, Product } from "@/types";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  Loader2,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface CategoryClientProps {
  products: Product[];
  category: Category | null;
  filterObjects?: FilterObjects;
  categorySlug?: string;
}

export default function CategoryClient({
  products,
  category,
  filterObjects,
  categorySlug,
}: CategoryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { formatPrice, searchQuery: globalSearchQuery } = useApp();

  // Active filter params from URL
  const selectedBrand = searchParams.get("brands") || "";
  const selectedSize = searchParams.get("size") || "";
  const selectedColor = searchParams.get("color") || "";
  const priceFromParam = searchParams.get("price[from]");
  const priceToParam = searchParams.get("price[to]");
  const currentSearch = searchParams.get("search") || globalSearchQuery || "";

  // Price boundaries
  const minLimit = Number(filterObjects?.min_price ?? 0);
  const maxLimit = Number(filterObjects?.max_price ?? 10000);
  const priceStep = Math.max(1, Math.round((maxLimit - minLimit) / 100) || 50);

  const initialMinPrice = priceFromParam !== null ? Math.max(minLimit, Number(priceFromParam)) : minLimit;
  const initialMaxPrice = priceToParam !== null ? Math.min(maxLimit, Number(priceToParam)) : maxLimit;

  // Local state for Price Range Inputs and Slider
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    initialMinPrice,
    initialMaxPrice,
  ]);
  const [minInput, setMinInput] = useState<string>(String(initialMinPrice));
  const [maxInput, setMaxInput] = useState<string>(String(initialMaxPrice));

  // Search inside Brand & Size lists
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [sizeSearch, setSizeSearch] = useState<string>("");

  // Mobile Filter Dropdown toggle state
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);

  // Sorting
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "discount">("default");

  // Load More Products state
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(products);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(products.length >= 20);

  // Synchronize when initial products prop updates (e.g. server re-fetch upon URL filter change)
  useEffect(() => {
    setDisplayedProducts(products);
    setPage(1);
    setHasMore(products.length >= 20);
  }, [products]);

  // Synchronize price range when URL params or boundaries change
  useEffect(() => {
    setLocalPriceRange([initialMinPrice, initialMaxPrice]);
    setMinInput(String(initialMinPrice));
    setMaxInput(String(initialMaxPrice));
  }, [initialMinPrice, initialMaxPrice]);

  // Update query params in URL without full reload or scroll-jump
  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "" || val === undefined) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetAllFilters = () => {
    const params = new URLSearchParams();
    if (searchParams.get("search")) {
      params.set("search", searchParams.get("search")!);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Commit price filter
  const applyPriceFilter = (range?: [number, number]) => {
    const [from, to] = range || localPriceRange;
    const clampedFrom = Math.max(minLimit, Math.min(from, to));
    const clampedTo = Math.min(maxLimit, Math.max(from, to));
    setLocalPriceRange([clampedFrom, clampedTo]);
    setMinInput(String(clampedFrom));
    setMaxInput(String(clampedTo));

    updateFilters({
      "price[from]": clampedFrom > minLimit ? String(clampedFrom) : null,
      "price[to]": clampedTo < maxLimit ? String(clampedTo) : null,
    });
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinInput(e.target.value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxInput(e.target.value);
  };

  const handleInputBlurOrSubmit = () => {
    const numMin = Number(minInput) || minLimit;
    const numMax = Number(maxInput) || maxLimit;
    const clampedMin = Math.max(minLimit, Math.min(numMin, numMax));
    const clampedMax = Math.min(maxLimit, Math.max(numMin, numMax));
    applyPriceFilter([clampedMin, clampedMax]);
  };

  // Brand list from FilterObjects
  const brandList = useMemo(() => {
    if (!filterObjects?.brands) return [];
    const raw = Array.isArray(filterObjects.brands)
      ? filterObjects.brands
      : Object.values(filterObjects.brands);
    const set = new Set<string>();
    raw.forEach((b) => {
      const trimmed = String(b || "").trim();
      if (trimmed && trimmed.toLowerCase() !== "all") {
        set.add(trimmed);
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [filterObjects?.brands]);

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return brandList;
    return brandList.filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase().trim()));
  }, [brandList, brandSearch]);

  // Size list from FilterObjects
  const sizeList = useMemo(() => {
    if (!filterObjects?.available_sizes) return [];
    const set = new Set<string>();
    filterObjects.available_sizes.forEach((s) => {
      const trimmed = String(s || "").trim();
      if (trimmed) set.add(trimmed);
    });
    return Array.from(set);
  }, [filterObjects?.available_sizes]);

  const filteredSizes = useMemo(() => {
    if (!sizeSearch.trim()) return sizeList;
    return sizeList.filter((s) => s.toLowerCase().includes(sizeSearch.toLowerCase().trim()));
  }, [sizeList, sizeSearch]);

  // Color list from FilterObjects
  const colorList = useMemo(() => {
    if (!filterObjects?.available_colors) return [];
    const set = new Set<string>();
    filterObjects.available_colors.forEach((c) => {
      const trimmed = String(c || "").trim();
      if (trimmed) set.add(trimmed);
    });
    return Array.from(set);
  }, [filterObjects?.available_colors]);

  // Count active filters
  const activeFiltersCount =
    (priceFromParam ? 1 : 0) +
    (priceToParam ? 1 : 0) +
    (selectedBrand ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (selectedColor ? 1 : 0);

  // Sorted product list
  const sortedProducts = useMemo(() => {
    const list = [...displayedProducts];
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "discount") {
      list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }
    return list;
  }, [displayedProducts, sortBy]);

  // Load More Handler (preserves scroll position and appends products)
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(nextPage));
      if (categorySlug && !params.has("category_slug")) {
        params.set("category_slug", categorySlug);
      }
      const response = await fetch(`/api/proxy/v1/products?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to load products");
      const json = await response.json();
      const rawProducts: any[] = json?.data?.products || [];

      if (rawProducts.length > 0) {
        const normalized = rawProducts.map(normalizeProduct);
        setDisplayedProducts((prev) => [...prev, ...normalized]);
        setPage(nextPage);
        if (rawProducts.length < 20) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Load more products error:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Reusable Sidebar Content JSX
  const FilterSidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3.5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <span>Filter Products</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetAllFilters}
            className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {priceFromParam || priceToParam ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
              Tk. {localPriceRange[0]} - {localPriceRange[1]}
              <button
                onClick={() => {
                  updateFilters({ "price[from]": null, "price[to]": null });
                }}
                className="hover:opacity-75 cursor-pointer ml-0.5"
                aria-label="Remove price filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {selectedBrand && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
              Brand: {selectedBrand}
              <button
                onClick={() => updateFilters({ brands: null })}
                className="hover:opacity-75 cursor-pointer ml-0.5"
                aria-label="Remove brand filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedSize && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
              Size: {selectedSize}
              <button
                onClick={() => updateFilters({ size: null })}
                className="hover:opacity-75 cursor-pointer ml-0.5"
                aria-label="Remove size filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedColor && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
              Color: {selectedColor}
              <button
                onClick={() => updateFilters({ color: null })}
                className="hover:opacity-75 cursor-pointer ml-0.5"
                aria-label="Remove color filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* 1. Price Filter (Moved to TOP as requested) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
            Price Range
          </h4>
          <span className="text-[11px] font-mono font-medium text-primary dark:text-[#E05343]">
            {formatPrice(localPriceRange[0])} — {formatPrice(localPriceRange[1])}
          </span>
        </div>

        {/* Dual Thumb Range Slider */}
        <RangeSlider
          min={minLimit}
          max={maxLimit}
          step={priceStep}
          value={localPriceRange}
          onValueChange={(val) => {
            setLocalPriceRange(val);
            setMinInput(String(val[0]));
            setMaxInput(String(val[1]));
          }}
          onValueCommit={(val) => {
            applyPriceFilter(val);
          }}
        />

        {/* Min & Max Input Fields */}
        <div className="grid grid-cols-2 gap-2 pt-1 items-center">
          <div>
            <label className="text-[10px] uppercase font-semibold text-[#736C62] dark:text-[#9E968B] block mb-1">
              Min Price
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] font-medium text-[#9A9184]">
                Tk.
              </span>
              <input
                type="number"
                value={minInput}
                onChange={handleMinInputChange}
                onBlur={handleInputBlurOrSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleInputBlurOrSubmit()}
                placeholder={String(minLimit)}
                className="w-full pl-8 pr-2 py-1.5 text-xs font-mono rounded-lg border border-[#DCD5C9] dark:border-[#38332C] bg-[#FAFAF8] dark:bg-[#1A1916] text-[#1F1D1A] dark:text-[#EDE7DE] focus:border-primary focus:bg-white focus:outline-hidden transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-semibold text-[#736C62] dark:text-[#9E968B] block mb-1">
              Max Price
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] font-medium text-[#9A9184]">
                Tk.
              </span>
              <input
                type="number"
                value={maxInput}
                onChange={handleMaxInputChange}
                onBlur={handleInputBlurOrSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleInputBlurOrSubmit()}
                placeholder={String(maxLimit)}
                className="w-full pl-8 pr-2 py-1.5 text-xs font-mono rounded-lg border border-[#DCD5C9] dark:border-[#38332C] bg-[#FAFAF8] dark:bg-[#1A1916] text-[#1F1D1A] dark:text-[#EDE7DE] focus:border-primary focus:bg-white focus:outline-hidden transition-colors"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleInputBlurOrSubmit()}
          className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors cursor-pointer"
        >
          Apply Price
        </button>
      </div>

      {/* 2. Brand Filter */}
      {brandList.length > 0 && (
        <div className="pt-4 border-t border-[#F0EDE8] dark:border-[#2A2A2A] space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
              Brand
            </h4>
            <span className="text-[10px] text-[#9A9184] font-medium">{brandList.length}</span>
          </div>

          {/* Brand Search Input */}
          {brandList.length > 6 && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9A9184]" />
              <input
                type="text"
                placeholder="Search brands..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 text-xs rounded-lg border border-[#E8E2D9] dark:border-[#312E29] bg-[#FAFAF8] dark:bg-[#151412] text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-hidden focus:border-primary"
              />
            </div>
          )}

          {/* Brands List */}
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
            <label
              onClick={() => updateFilters({ brands: null })}
              className={cn(
                "flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors",
                !selectedBrand
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#3E3A34] dark:text-[#C5BEB3]",
              )}
            >
              <span>All Brands</span>
              {!selectedBrand && <Check className="w-3.5 h-3.5 text-primary" />}
            </label>

            {filteredBrands.map((b) => {
              const isSelected = selectedBrand.toLowerCase() === b.toLowerCase();
              return (
                <label
                  key={b}
                  onClick={() => updateFilters({ brands: isSelected ? null : b })}
                  className={cn(
                    "flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors",
                    isSelected
                      ? "bg-primary/10 text-primary font-semibold"
                      : "hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#3E3A34] dark:text-[#C5BEB3]",
                  )}
                >
                  <span className="truncate">{b}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Size Filter */}
      {sizeList.length > 0 && (
        <div className="pt-4 border-t border-[#F0EDE8] dark:border-[#2A2A2A] space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
              Size / Pack
            </h4>
            <span className="text-[10px] text-[#9A9184] font-medium">{sizeList.length}</span>
          </div>

          {/* Size Search Input if many sizes */}
          {sizeList.length > 8 && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9A9184]" />
              <input
                type="text"
                placeholder="Search sizes..."
                value={sizeSearch}
                onChange={(e) => setSizeSearch(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 text-xs rounded-lg border border-[#E8E2D9] dark:border-[#312E29] bg-[#FAFAF8] dark:bg-[#151412] text-[#1F1D1A] dark:text-[#EDE7DE] focus:outline-hidden focus:border-primary"
              />
            </div>
          )}

          {/* Size Badges Grid */}
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {filteredSizes.map((s) => {
              const isSelected = selectedSize.toLowerCase() === s.toLowerCase();
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateFilters({ size: isSelected ? null : s })}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded-lg border transition-all cursor-pointer font-medium",
                    isSelected
                      ? "bg-primary text-white border-primary shadow-xs font-semibold"
                      : "bg-[#FAFAF8] dark:bg-[#1A1916] border-[#DCD5C9] dark:border-[#38332C] text-[#3E3A34] dark:text-[#C5BEB3] hover:border-primary hover:text-primary",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Color Filter (if available) */}
      {colorList.length > 0 && (
        <div className="pt-4 border-t border-[#F0EDE8] dark:border-[#2A2A2A] space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
              Colors
            </h4>
            <span className="text-[10px] text-[#9A9184] font-medium">{colorList.length}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
            {colorList.map((c) => {
              const isSelected = selectedColor.toLowerCase() === c.toLowerCase();
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateFilters({ color: isSelected ? null : c })}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded-lg border capitalize transition-all cursor-pointer font-medium",
                    isSelected
                      ? "bg-primary text-white border-primary shadow-xs font-semibold"
                      : "bg-[#FAFAF8] dark:bg-[#1A1916] border-[#DCD5C9] dark:border-[#38332C] text-[#3E3A34] dark:text-[#C5BEB3] hover:border-primary hover:text-primary",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full pb-16 pt-4 sm:pt-6">
      <div className="container space-y-6">
        {/* Breadcrumb / Title Bar Card */}
        <div className="section-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#736C62] dark:text-[#9E968B] mb-1">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>›</span>
              {category ? (
                <>
                  <Link href="/product" className="hover:text-primary transition-colors">
                    Products
                  </Link>
                  <span>›</span>
                  <span className="text-[#1F1D1A] dark:text-[#EDE7DE] font-semibold">{category.name}</span>
                </>
              ) : (
                <span className="text-[#1F1D1A] dark:text-[#EDE7DE] font-semibold">All Products</span>
              )}
            </div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              {currentSearch ? `Search: "${currentSearch}"` : category ? category.name : "All Departments & Products"}
            </h1>
            <p className="text-xs text-[#736C62] dark:text-[#9E968B] mt-0.5">
              Showing{" "}
              <strong className="font-mono text-primary dark:text-[#E05343] font-semibold">
                {displayedProducts.length}
              </strong>{" "}
              available genuine items
            </p>
          </div>

          {/* Controls: Filter Button beside Sort Dropdown */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Filter Dropdown Toggle Button (Mobile & Tablet: lg:hidden) */}
            <button
              type="button"
              onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
              className={cn(
                "lg:hidden flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer",
                isFilterDropdownOpen
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "border-[#DCD5C9] dark:border-[#38332C] bg-[#FAFAF8] dark:bg-[#1A1815] text-[#1F1D1A] dark:text-[#EDE7DE] hover:border-primary",
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter</span>
              {activeFiltersCount > 0 && (
                <span
                  className={cn(
                    "w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold",
                    isFilterDropdownOpen ? "bg-white text-primary" : "bg-primary text-white",
                  )}
                >
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200",
                  isFilterDropdownOpen ? "rotate-180" : "",
                )}
              />
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#736C62] dark:text-[#9E968B] hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-[#FAFAF8] dark:bg-[#1A1815] border border-[#DCD5C9] dark:border-[#38332C] px-3 py-1.5 rounded-lg text-xs font-medium text-[#1F1D1A] dark:text-[#EDE7DE] focus:border-primary focus:outline-hidden cursor-pointer"
              >
                <option value="default">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Section as Dropdown */}
        {isFilterDropdownOpen && (
          <div className="lg:hidden section-card p-4 sm:p-5 bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#312E29] rounded-2xl shadow-lg transition-all animate-in fade-in slide-in-from-top-2 duration-200">
            {FilterSidebarContent}
            <div className="pt-4 mt-4 border-t border-[#F0EDE8] dark:border-[#2A2A2A] flex items-center justify-between gap-3">
              <span className="text-xs text-[#736C62] dark:text-[#9E968B]">
                Showing{" "}
                <strong className="text-primary font-mono">{displayedProducts.length}</strong> items
              </span>
              <button
                type="button"
                onClick={() => setIsFilterDropdownOpen(false)}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Filter
              </button>
            </div>
          </div>
        )}

        {/* 2-Column Split: Filters & Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Desktop Left-Side Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24">
            <div className="section-card p-5 bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#312E29] rounded-2xl shadow-sm">
              {FilterSidebarContent}
            </div>
          </aside>

          {/* Product Grid (3 cols on desktop) */}
          <main className="col-span-1 lg:col-span-3 space-y-6">
            {sortedProducts.length === 0 ? (
              <div className="section-card p-12 text-center space-y-4 bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#312E29] rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif font-bold text-base text-[#1F1D1A] dark:text-[#EDE7DE]">
                    No products found matching your filter criteria
                  </p>
                  <p className="text-xs text-[#736C62] dark:text-[#9E968B] max-w-md mx-auto">
                    Try adjusting or resetting your price range, brand, or size filters to explore more items.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {sortedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Load More Section */}
                <div className="pt-6 pb-2 text-center flex flex-col items-center justify-center space-y-3">
                  {hasMore ? (
                    <button
                      type="button"
                      disabled={loadingMore}
                      onClick={handleLoadMore}
                      className={cn(
                        "px-8 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary text-primary hover:text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer inline-flex items-center gap-2",
                        loadingMore && "opacity-75 cursor-not-allowed",
                      )}
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Loading More Products...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More Products</span>
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="text-xs text-[#736C62] dark:text-[#9E968B] py-2">
                      ✓ You have reached the end of available products
                    </div>
                  )}
                  <p className="text-[11px] text-[#9A9184]">
                    Showing {displayedProducts.length} items
                  </p>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
