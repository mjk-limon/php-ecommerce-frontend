'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Phone,
  Mail,
  Heart,
  Search,
  Bell,
  HelpCircle,
  Menu,
  ChevronDown,
  Sun,
  Moon,
  User as UserIcon,
  X,
  Package,
  Sparkles,
  Percent
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Category } from '@/types';

export const Header: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const {
    theme,
    toggleTheme,
    currency,
    setCurrency,
    cartTotalCount,
    wishlist,
    user,
    logout,
    searchQuery,
    setSearchQuery,
    showToast
  } = useApp();

  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [hoveredDept, setHoveredDept] = useState<Category | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<Category | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }

      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setIsDepartmentOpen(false);
        setHoveredDept(null);
        setHoveredSubcategory(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isHomePage) {
      setIsDepartmentOpen(false);
      setHoveredDept(null);
      setHoveredSubcategory(null);
    }
  }, [isHomePage]);

  const searchResults = searchQuery.trim()
    ? MOCK_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      router.push(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full pb-1 select-none shadow-md transition-colors relative z-40">
      {/* 1. Top Utility Header */}
      <div className="text-xs text-[#736C62] dark:text-[#9E968B]">
        <div className="container py-1 flex flex-wrap items-center justify-between gap-3">
          {/* Left contact info */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="tel:+8801894084242"
              className="inline-flex items-center gap-1.5 hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#BA2D1D] dark:text-[#E05343]" />
              <span>Hotline: <strong className="font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">+8801894084242</strong></span>
            </a>
            <span className="hidden sm:inline text-[#D3CBC0] dark:text-[#3E3A34]">|</span>
            <a
              href="mailto:info@wellsellbd.com"
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
            >
              <Mail className="w-3 h-3 text-[#BA2D1D] dark:text-[#E05343]" />
              <span>Mail Us: info@wellsellbd.com</span>
            </a>
          </div>

          {/* Right utility links */}
          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/brand"
              className="hover:text-[#1F1D1A] dark:hover:text-[#EDE7DE] flex items-center gap-1 transition-colors"
            >
              <Heart className="w-3 h-3 text-[#BA2D1D]" />
              <span>Wishlists</span>
              {wishlist.length > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-[10px] bg-[#BA2D1D] text-white rounded-full font-medium">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <span className="text-[#D3CBC0] dark:text-[#3E3A34]">|</span>

            {/* Currency toggle */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="opacity-70">Currency:</span>
              <button
                onClick={() => setCurrency('Tk.')}
                className={`font-semibold px-1 rounded transition-colors cursor-pointer ${currency === 'Tk.'
                  ? 'text-[#BA2D1D] dark:text-[#E05343] underline'
                  : 'hover:text-[#1F1D1A] dark:hover:text-[#EDE7DE]'
                  }`}
              >
                Tk.
              </button>
              <span>/</span>
              <button
                onClick={() => setCurrency('$')}
                className={`font-semibold px-1 rounded transition-colors cursor-pointer ${currency === '$'
                  ? 'text-[#BA2D1D] dark:text-[#E05343] underline'
                  : 'hover:text-[#1F1D1A] dark:hover:text-[#EDE7DE]'
                  }`}
              >
                USD
              </button>
            </div>

            <span className="text-[#D3CBC0] dark:text-[#3E3A34]">|</span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-1 rounded hover:bg-[#EFEAE1] dark:hover:bg-[#23201C] transition-colors text-[#1F1D1A] dark:text-[#EDE7DE] cursor-pointer"
              title={theme === 'dark' ? 'Switch to Paper Light' : 'Switch to Ink Charcoal'}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#736C62]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Header Bar */}
      <div className="container py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="cursor-pointer flex items-center gap-2 sm:gap-3 shrink-0 group"
        >
          <img src="https://wellsellbd.com/images/logo.svg?dummy=59825993"
            style={{ height: '55px' }} />
        </Link>

        {/* Live Search Input with Dropdown */}
        <div ref={searchRef} className="flex-1 max-w-xl hidden md:block relative">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search health, skincare, vitamins, perfumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="w-full bg-[#FFFFFF] dark:bg-[#1A1916] border border-[#DCD5C9] dark:border-[#38332C] text-sm text-[#1F1D1A] dark:text-[#EDE7DE] rounded-full py-2.5 pl-5 pr-11 focus:outline-none focus:ring-1 focus:ring-[#BA2D1D] focus:border-[#BA2D1D] transition-shadow shadow-xs placeholder-[#9A9184]"
            />
            <button
              type="submit"
              aria-label="Execute search"
              className="absolute right-1.5 w-8 h-8 rounded-full bg-[#BA2D1D] hover:bg-[#9D2315] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {searchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#312E29] rounded-xl shadow-lg p-2 z-50">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] px-3 py-1.5">
                Suggested Products
              </div>
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  onClick={() => setSearchFocused(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] cursor-pointer transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-9 h-9 object-cover rounded border border-[#E8E2D9] dark:border-[#312E29]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-[#BA2D1D] font-mono">
                      Tk. {item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right utility icons & Cart / Checkout Triggers */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Notification icon */}
          <button
            onClick={() => showToast('No new unread store alerts.', 'info')}
            aria-label="Notifications"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#23201C] text-[#1F1D1A] dark:text-[#EDE7DE] relative transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#BA2D1D] text-white text-[10px] font-semibold flex items-center justify-center">
              0
            </span>
          </button>

          {/* Help / Track Order quick action */}
          <Link
            href="/track-order"
            aria-label="Track order"
            title="Track Order"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#23201C] text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </Link>

          {/* User Account / Profile button */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-[#DCD5C9] dark:border-[#38332C] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-[#BA2D1D]" />
                  <span className="text-xs font-medium hidden sm:inline">
                    {user.first_name || 'My Account'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#736C62] hidden sm:inline" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1E1E1E] section-card py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#F0EDE8] dark:border-[#2A2A2A]">
                      <p className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] truncate">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-[11px] text-[#736C62] dark:text-[#9E968B] truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/track-order"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A] transition-colors"
                    >
                      Track My Orders
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A] transition-colors"
                    >
                      Go to Checkout
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#BA2D1D] hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-[#DCD5C9] dark:border-[#38332C] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-[#BA2D1D]" />
                <span className="text-xs font-medium hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3. Primary Navigation Bar */}
      <div className="container flex items-center justify-between">
        {/* ALL DEPARTMENTS button with dropdown */}
        <div ref={deptRef} className="relative w-[calc(20%-12px)]">
          <button
            onClick={() => {
              if (isHomePage) {
                setIsDepartmentOpen(false);
                window.dispatchEvent(new Event('focus-hero-departments'));
                return;
              }
              setIsDepartmentOpen((open) => !open);
              setHoveredDept(null);
              setHoveredSubcategory(null);
            }}
            className="w-full rounded-xl flex justify-center items-center gap-2.5 bg-[#BA2D1D] text-white py-2 text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#9D2315] transition-colors cursor-pointer"
          >
            <Menu className="w-4 h-4" />
            <span>ALL DEPARTMENTS</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isDepartmentOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Department Mega Dropdown with Link */}
          {isDepartmentOpen && !isHomePage && (
            <div
              className="absolute top-full left-0 w-full pt-1 z-50"
              onMouseLeave={() => {
                setHoveredDept(null);
                setHoveredSubcategory(null);
              }}
            >
              <div className="relative">
                <div className="bg-white dark:bg-[#1C1A17] border border-[#E8E2D9] dark:border-[#312E29] shadow-xl rounded-lg py-2">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="relative"
                      onMouseEnter={() => {
                        setHoveredDept(cat);
                        setHoveredSubcategory(null);
                      }}
                    >
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={() => setIsDepartmentOpen(false)}
                        className="w-full text-left px-4 py-2 text-xs text-[#1F1D1A] dark:text-[#EDE7DE] hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] hover:text-[#BA2D1D] dark:hover:text-[#E05343] flex items-center justify-between transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-[#9A9184]">→</span>
                      </Link>

                      {hoveredDept?.id === cat.id && cat.childs?.length ? (
                        <div className="absolute top-0 left-full -ml-1 w-80 bg-white dark:bg-[#1E1E1E] section-card shadow-xl z-10">
                          <div className="border-b border-[#F0EDE8] dark:border-[#2A2A2A] px-5 py-3 flex items-center justify-between">
                            <h3 className="font-serif font-bold text-sm text-[#1F1D1A] dark:text-[#EDE7DE]">
                              {cat.name}
                            </h3>
                            <Link
                              href={`/category/${cat.slug}`}
                              onClick={() => setIsDepartmentOpen(false)}
                              className="text-[11px] text-[#BA2D1D] hover:underline font-semibold"
                            >
                              View All ›
                            </Link>
                          </div>

                          <ul className="space-y-1 text-xs">
                            {cat.childs.map((sub) => (
                              <li
                                key={sub.id}
                                className="relative"
                                onMouseEnter={() =>
                                  setHoveredSubcategory(sub.childs?.length ? sub : null)
                                }
                              >
                                <Link
                                  href={`/category/${sub.slug}`}
                                  onClick={() => setIsDepartmentOpen(false)}
                                  className="w-full text-left py-2 px-4 rounded-xs hover:bg-[#FDF7F5] dark:hover:bg-[#2A2422] hover:text-[#BA2D1D] transition-colors text-[#3E3A34] dark:text-[#C5BEB3] flex items-center justify-between"
                                >
                                  <span>{sub.name}</span>
                                  {sub.childs?.length ? (
                                    <span className="text-[10px] text-[#9A9184]">→</span>
                                  ) : null}
                                </Link>

                                {hoveredSubcategory?.id === sub.id && sub.childs?.length ? (
                                  <div className="absolute top-0 left-full -ml-1 w-64 bg-white dark:bg-[#1E1E1E] section-card py-2 shadow-xl z-10">
                                    {sub.childs.map((child) => (
                                      <Link
                                        key={child.id}
                                        href={`/category/${child.slug}`}
                                        onClick={() => setIsDepartmentOpen(false)}
                                        className="block px-4 py-2 text-xs text-[#3E3A34] dark:text-[#C5BEB3] hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] hover:text-[#BA2D1D] transition-colors"
                                      >
                                        {child.name}
                                      </Link>
                                    ))}
                                  </div>
                                ) : null}
                              </li>
                            ))}
                          </ul>

                          {cat.images ? (
                            <Link
                              href={`/category/${cat.slug}`}
                              onClick={() => setIsDepartmentOpen(false)}
                              className="relative h-28 cursor-pointer group block mt-4 rounded-b-xl overflow-hidden"
                            >
                              <img
                                src={cat.images}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent p-2.5 flex flex-col justify-end text-white">
                                <span className="underline">Explore {cat.name} ›</span>
                              </div>
                            </Link>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links using Next.js Link */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[#4A443B] dark:text-[#C5BEB3]">
          <Link
            href="/"
            className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors py-2.5"
          >
            Home
          </Link>
          <Link
            href="/brand"
            className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors py-2.5"
          >
            Brands
          </Link>
          <Link
            href="/offers"
            className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors py-2.5 flex items-center gap-1 text-[#BA2D1D] dark:text-[#E05343]"
          >
            <Percent className="w-3.5 h-3.5" />
            HOT OFFERS
          </Link>
          <Link
            href="/checkout"
            className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors py-2.5 flex items-center gap-1 text-[#1F6E54] dark:text-[#34A87C]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Checkout
          </Link>
          <Link
            href="/track-order"
            className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors py-2.5 flex items-center gap-1"
          >
            <Package className="w-3.5 h-3.5 text-[#1F6E54]" />
            Track Order
          </Link>
          {!user ? (
            <>
              <Link
                href="/register"
                className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors py-2.5"
              >
                Join Free
              </Link>
              <Link
                href="/login"
                className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors py-2.5"
              >
                Sign In
              </Link>
            </>
          ) : (
            <span className="text-[11px] text-[#1F6E54] dark:text-[#34A87C] font-semibold py-2.5">
              Hi, {user.first_name}
            </span>
          )}
          <a
            href="tel:+8801894084242"
            className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors py-2.5"
          >
            Support
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#1F1D1A] dark:text-[#EDE7DE] cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E2D9] dark:border-[#312E29] p-4 bg-white dark:bg-[#1C1A17] space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F1EA] dark:bg-[#25221E] border border-[#DCD5C9] dark:border-[#38332C] rounded-lg px-3 py-2 text-xs"
            />
          </form>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F1EA] dark:hover:bg-[#25221E]"
            >
              Home
            </Link>
            <Link
              href="/brand"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F1EA] dark:hover:bg-[#25221E]"
            >
              Brands
            </Link>
            <Link
              href="/offers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#BA2D1D]"
            >
              Hot Offers
            </Link>
            <Link
              href="/checkout"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#1F6E54]"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F1EA] dark:hover:bg-[#25221E]"
            >
              Cart ({cartTotalCount})
            </Link>
            <Link
              href="/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left py-2 px-3 rounded hover:bg-[#F5F1EA] dark:hover:bg-[#25221E]"
            >
              Track Order
            </Link>
            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left py-2 px-3 rounded hover:bg-[#F5F1EA] dark:hover:bg-[#25221E]"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left py-2 px-3 rounded hover:bg-[#F5F1EA] dark:hover:bg-[#25221E]"
                >
                  Join Free
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#BA2D1D]"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
