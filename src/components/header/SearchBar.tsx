"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { getAssetUrl } from "@/lib/assetHelper";
import { cn } from "@/lib/utils";
import { normalizeProduct } from "@/services/api";
import { Product } from "@/types";

interface SearchBarProps {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  onSearchSubmit?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className,
  inputClassName,
  placeholder = "Search here...",
  onSearchSubmit,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (searchQuery.trim()) {
        const response = await fetch(`/api/proxy/v1/products?limit=5&search=${searchQuery.trim()}`);
        if (!response.ok) throw new Error("Failed to load products");
        const json = await response.json();
        const rawProducts: any[] = json?.data?.products || [];

        if (rawProducts.length > 0) {
          const normalized = rawProducts.map(normalizeProduct);

          setSearchResult(normalized);
        }
      } else {
        setSearchResult([]);
      }
    })();
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      setSearchFocused(false);
      onSearchSubmit?.();
      router.push(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          className={cn(
            "w-full bg-[#FFFFFF] dark:bg-[#1A1916] border border-[#DCD5C9] dark:border-[#38332C] text-sm text-[#1F1D1A] dark:text-[#EDE7DE] rounded-full py-1.5 pl-5 pr-11 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-shadow shadow-xs placeholder-[#9A9184]",
            inputClassName,
          )}
        />
        <button
          type="submit"
          aria-label="Execute search"
          className="absolute right-1.5 w-7 h-7 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {searchFocused && searchResult.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#312E29] rounded-xl shadow-lg p-2 z-50">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] px-3 py-1.5">
            Suggested Products
          </div>
          {searchResult.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              onClick={() => {
                setSearchFocused(false);
                onSearchSubmit?.();
              }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] cursor-pointer transition-colors"
            >
              <img
                src={getAssetUrl(item.image || item.thumbnail)}
                alt={item.name}
                className="w-9 h-9 object-cover rounded border border-[#E8E2D9] dark:border-[#312E29]"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] truncate">{item.name}</p>
                <p className="text-[11px] text-primary font-mono">Tk. {item.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
