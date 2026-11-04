"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import {
  Bell,
  ChevronDown,
  Heart,
  HelpCircle,
  Home,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
  User as UserIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../context/AppContext";
import { CartToggler } from "../CartToggler";
import { CategoryMenu } from "./CategoryMenu";
import { NavLinks } from "./NavLinks";
import { SearchBar } from "./SearchBar";

export const Header: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { theme, toggleTheme, currency, setCurrency, user, logout, showToast } = useApp();

  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const deptRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setIsDepartmentOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change or ESC
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDepartmentOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsDepartmentOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isHomePage) {
      setIsDepartmentOpen(false);
    }
  }, [isHomePage]);

  const handleDepartmentOrMenuClick = () => {
    // If on mobile viewport (< 768px), open the mobile drawer from left
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobileMenuOpen(true);
      return;
    }

    // On desktop
    if (isHomePage) {
      setIsDepartmentOpen(false);
      window.dispatchEvent(new Event("focus-hero-departments"));
      return;
    }

    // On desktop, toggle full container width megamenu dropdown
    setIsDepartmentOpen((open) => !open);
  };

  return (
    <header className="sticky md:static top-0 w-full pb-1 select-none bg-white shadow-md transition-colors z-40">
      {/* 1. Top Utility Header (Desktop only) */}
      <div className="hidden md:block text-xs text-[#736C62] dark:text-[#9E968B]">
        <div className="container py-1 flex flex-wrap items-center justify-between gap-3">
          {/* Left contact info */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="tel:+8801894084242"
              className="inline-flex items-center gap-1.5 hover:text-primary dark:hover:text-[#E05343] transition-colors"
            >
              <Phone className="w-3 h-3 text-primary dark:text-[#E05343]" />
              <span>
                Hotline: <strong className="font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">+8801894084242</strong>
              </span>
            </a>
            <span className="hidden sm:inline text-[#D3CBC0] dark:text-[#3E3A34]">|</span>
            <a
              href="mailto:info@wellsellbd.com"
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-primary dark:hover:text-[#E05343] transition-colors"
            >
              <Mail className="w-3 h-3 text-primary dark:text-[#E05343]" />
              <span>Mail Us: info@wellsellbd.com</span>
            </a>
          </div>

          {/* Right utility links */}
          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/brand"
              className="hover:text-[#1F1D1A] dark:hover:text-[#EDE7DE] flex items-center gap-1 transition-colors"
            >
              <Heart className="w-3 h-3 text-primary" />
              <span>Wishlists</span>
            </Link>

            <span className="text-[#D3CBC0] dark:text-[#3E3A34]">|</span>

            {/* Currency toggle */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="opacity-70">Currency:</span>
              <button
                onClick={() => setCurrency("Tk.")}
                className={`font-semibold px-1 rounded transition-colors cursor-pointer ${
                  currency === "Tk."
                    ? "text-primary dark:text-[#E05343] underline"
                    : "hover:text-[#1F1D1A] dark:hover:text-[#EDE7DE]"
                }`}
              >
                Tk.
              </button>
              <span>/</span>
              <button
                onClick={() => setCurrency("$")}
                className={`font-semibold px-1 rounded transition-colors cursor-pointer ${
                  currency === "$"
                    ? "text-primary dark:text-[#E05343] underline"
                    : "hover:text-[#1F1D1A] dark:hover:text-[#EDE7DE]"
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
              title={theme === "dark" ? "Switch to Paper Light" : "Switch to Ink Charcoal"}
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#736C62]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Header Bar (Middle row) */}
      <div className="container py-3 flex items-center justify-between gap-4">
        {/* Left Column: Logo */}
        <Link href="/" className="cursor-pointer flex items-center gap-2 sm:gap-3 shrink-0 group">
          <img
            src="https://wellsellbd.com/images/logo.svg?dummy=59825993"
            alt="Wellsell BD"
            className="h-7.25 md:h-13.75"
          />
        </Link>

        {/* Middle Column: Desktop Search Bar (hidden on mobile) */}
        <SearchBar className="hidden md:block flex-1 max-w-xl mx-4" />

        {/* Right Column: Utility icons & User / Mobile menu triggers */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Notification icon */}
          <button
            onClick={() => showToast("No new unread store alerts.", "info")}
            aria-label="Notifications"
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#EDE7DE] dark:hover:bg-[#23201C] text-[#1F1D1A] dark:text-[#EDE7DE] relative transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-semibold flex items-center justify-center">
              0
            </span>
          </button>

          {/* Help / Track Order quick action */}
          <Link
            href="/track-order"
            aria-label="Track order"
            title="Track Order"
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#EDE7DE] dark:hover:bg-[#23201C] text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </Link>

          {/* User Account / Profile button */}
          <div ref={userMenuRef} className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-[#DCD5C9] dark:border-[#38332C] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium hidden sm:inline">{user.first_name || "My Account"}</span>
                  <ChevronDown className="w-3 h-3 text-[#736C62] hidden sm:inline" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1E1E1E] section-card py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#F0EDE8] dark:border-[#2A2A2A]">
                      <p className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] truncate">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-[11px] text-[#736C62] dark:text-[#9E968B] truncate">{user.email}</p>
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
                      className="w-full text-left px-4 py-2 text-xs text-primary hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer"
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
                <UserIcon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>

          <CartToggler floating={false} />
        </div>
      </div>

      {/* 3. Primary Navigation Bar */}
      <div ref={deptRef} className="container relative flex gap-2.5 sm:gap-4 items-center justify-between">
        {/* ALL DEPARTMENTS (Desktop) / Menu (Mobile) button */}
        <div className="w-auto md:w-[calc(20%-12px)] shrink-0">
          <button
            onClick={handleDepartmentOrMenuClick}
            className="w-full rounded-xl flex justify-center items-center gap-2 bg-primary/5 text-primary p-2 text-xs sm:text-sm font-semibold tracking-wide hover:bg-primary-hover hover:text-white transition-colors cursor-pointer"
          >
            <Menu className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">ALL DEPARTMENTS</span>
            <span className="inline md:hidden">Menu</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200 hidden md:inline",
                isDepartmentOpen ? "rotate-180" : "",
              )}
            />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <NavLinks orientation="horizontal" className="hidden md:flex" />

        {/* Mobile Search Bar - placed beside menu (hidden on desktop) */}
        <SearchBar className="flex-1 md:hidden" />

        {/* Department Full Container Width Megamenu Dropdown (Desktop only) */}
        {isDepartmentOpen && (
          <CategoryMenu
            categories={categories}
            onItemClick={() => setIsDepartmentOpen(false)}
            className="hidden md:block absolute top-full left-0 right-0 w-full -mt-0.5 pt-1.5 z-50"
          />
        )}
      </div>

      {/* 4. Mobile Menu Drawer (Slides from Left) */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-[85vw] max-w-xs sm:max-w-sm bg-white dark:bg-[#1A1815] shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#F0EDE8] dark:border-[#2A2A2A] flex items-center justify-between">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
            <img src="https://wellsellbd.com/images/logo.svg?dummy=59825993" alt="Wellsell BD" className="h-6" />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu drawer"
            className="p-1.5 rounded-lg hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#736C62] hover:text-[#1F1D1A] dark:hover:text-[#EDE7DE] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <nav className="text-sm font-medium">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[#F5F1EA] dark:hover:bg-[#25221E] text-[#1F1D1A] dark:text-[#EDE7DE]"
            >
              <Home className="w-4 h-4 text-[#736C62] dark:text-[#9E968B]" />
              <span>Home</span>
            </Link>
          </nav>

          {/* Categories in Mobile Menu Drawer */}
          {categories?.length > 0 && (
            <div className="pt-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] px-3 mb-2">
                Categories
              </div>
              <CategoryMenu categories={categories} onItemClick={() => setIsMobileMenuOpen(false)} className="w-full" />
            </div>
          )}

          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#736C62] dark:text-[#9E968B] px-3 mb-2">
              Menu
            </div>
            <NavLinks orientation="vertical" onItemClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      </aside>
    </header>
  );
};
