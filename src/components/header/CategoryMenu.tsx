"use client";

import { asset, cn } from "@/lib/utils";
import { Category } from "@/types";
import { ChevronDown, ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CategoryMenuProps {
  categories: Category[];
  onItemClick?: () => void;
  className?: string;
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories, onItemClick, className }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(categories[0]?.id ?? null);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<number[]>([]);

  // By default, the first main menu is active
  useEffect(() => {
    if (categories.length > 0 && (activeCategoryId === null || !categories.some((c) => c.id === activeCategoryId))) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const toggleMobileCategory = (catId: number) => {
    setExpandedMobileCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId],
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="bg-white dark:bg-[#1C1A17] md:border border-[#E8E2D9] dark:border-[#312E29] md:shadow-2xl md:rounded-b-2xl md:h-120 md:min-h-115 relative overflow-hidden flex flex-col md:flex-row">
        {/* Left Column: Main Menus */}
        <div className="w-full md:w-64 shrink-0 md:border-r border-[#E8E2D9] dark:border-[#312E29] md:h-full md:overflow-y-auto py-1 md:py-2 space-y-0.5">
          {categories.map((cat) => {
            const isMobileOpen = expandedMobileCategories.includes(cat.id);
            const isDesktopActive = activeCategoryId === cat.id;

            return (
              <div key={cat.id} className="relative md:static" onMouseEnter={() => setActiveCategoryId(cat.id)}>
                {/* Main Category Row */}
                <div
                  className={cn(
                    "group flex items-center justify-between px-3 md:px-4 py-2.5 rounded-lg md:rounded-none transition-colors cursor-pointer text-xs",
                    isDesktopActive
                      ? "md:bg-[#FDF7F5] md:dark:bg-[#2A2422] md:text-primary md:font-semibold md:border-l-3 md:border-primary"
                      : "text-[#1F1D1A] dark:text-[#EDE7DE] hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] hover:text-primary md:border-l-3 md:border-transparent",
                  )}
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    onClick={onItemClick}
                    className="flex-1 flex gap-1.5 items-center capitalize truncate py-0.5"
                  >
                    {cat.images?.icon ? (
                      <img src={asset(cat.images?.icon)} className="w-4 h-4" />
                    ) : (
                      <LayoutGrid className="w-4 h-4" />
                    )}
                    <span>{cat.name}</span>
                  </Link>

                  {/* Mobile Accordion Toggle */}
                  {cat.childs?.length ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMobileCategory(cat.id);
                      }}
                      className="p-1 md:hidden text-[#9A9184] hover:text-primary transition-colors cursor-pointer"
                      aria-label={`Toggle ${cat.name} subcategories`}
                    >
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          isMobileOpen ? "rotate-180" : "",
                        )}
                      />
                    </button>
                  ) : null}

                  {/* Desktop Right Chevron indicator */}
                  <ChevronRight
                    className={cn(
                      "hidden md:block w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5",
                      isDesktopActive ? "text-primary translate-x-0.5" : "text-[#9A9184]",
                    )}
                  />
                </div>

                {/* Submenu: mobile position relative, desktop absolute */}
                <div
                  className={cn(
                    "relative md:absolute md:top-0 md:left-64 md:right-0 md:bottom-0 md:h-full md:overflow-y-auto md:p-6 md:bg-white md:dark:bg-[#1C1A17]",
                    isMobileOpen ? "block" : "hidden",
                    isDesktopActive ? "md:block" : "md:hidden",
                  )}
                >
                  {/* Desktop Promotional Banner */}
                  <div className="hidden md:block mb-6 pb-4 border-b border-[#F0EDE8] dark:border-[#2A2A2A]">
                    <Link
                      href={`/category/${cat.slug}`}
                      onClick={onItemClick}
                      className="relative block h-32 rounded-xl overflow-hidden group cursor-pointer"
                    >
                      {cat.images?.browse_category_feature && (
                        <img
                          src={asset(cat.images.browse_category_feature)}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-black/35 p-4 flex flex-col justify-center text-white">
                        <span className="font-semibold text-sm">Explore {cat.name}</span>
                        <span className="text-xs text-white/80 underline mt-0.5">Shop all products ›</span>
                      </div>
                    </Link>
                  </div>

                  {/* Submenu Grid on Desktop / Vertical list on Mobile */}
                  {cat.childs && cat.childs.length > 0 && (
                    <div className="flex flex-col space-y-3 pl-4 py-1.5 md:pl-0 md:py-0 md:space-y-0 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-x-6 md:gap-y-6">
                      {cat.childs.map((sub) => (
                        <div key={sub.id} className="min-w-0">
                          {/* Submenu as Title */}
                          <Link
                            href={`/category/${sub.slug}`}
                            onClick={onItemClick}
                            className="block text-xs md:font-bold capitalize tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] hover:text-primary dark:hover:text-[#E05343] transition-colors mb-1.5"
                          >
                            {sub.name}
                          </Link>

                          {/* Sub-sub menu items listed below title */}
                          {sub.childs && sub.childs.length > 0 ? (
                            <ul className="space-y-1 pl-2 md:pl-0">
                              {sub.childs.map((child) => (
                                <li key={child.id}>
                                  <Link
                                    href={`/category/${child.slug}`}
                                    onClick={onItemClick}
                                    className="block text-xs capitalize text-[#5C5549] dark:text-[#B3ABA0] hover:text-primary dark:hover:text-[#E05343] transition-colors py-0.5 truncate"
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
