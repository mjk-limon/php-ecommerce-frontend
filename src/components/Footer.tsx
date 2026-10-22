'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast('Thank you for subscribing to Wellsell BD promotions!', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#FFFFFF] dark:bg-[#161513] border-t border-[#E8E2D9] dark:border-[#312E29] text-[#736C62] dark:text-[#9E968B] transition-colors">
      {/* 1. Main Footer Grid */}
      <div className="container py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: COMPANY */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/brand"
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › About Us & Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Secure Checkout
                </Link>
              </li>
              <li>
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Terms and conditions terms loaded.', 'info');
                  }}
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Terms and Conditions
                </a>
              </li>
              <li>
                <a
                  href="#pay"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('How to Pay instructions: bKash, Nagad, Cash On Delivery.', 'info');
                  }}
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › How to Pay
                </a>
              </li>
              <li>
                <a
                  href="#photo"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Photo Confirmations: 100% Genuine batch import receipts.', 'info');
                  }}
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Batch Authenticity
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: SUPPORT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] mb-4">
              SUPPORT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="tel:+8801894084242"
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Customer Care: +8801894084242
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Privacy Policy: We protect customer data under strict protocols.', 'info');
                  }}
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#returns"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('7-Day Free and Easy Return Policy for all sealed items.', 'info');
                  }}
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Shipping Returns
                </a>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Track Your Parcel (All 64 Districts)
                </Link>
              </li>
              <li>
                <span className="text-[#9A9184]">
                  › Hub: Sector 3, Uttara, Dhaka
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: ACCOUNT & SHOP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] mb-4">
              ACCOUNT & SHOP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/login"
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › User Account
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Checkout Order
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Order History & Track
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="hover:text-[#BA2D1D] dark:hover:text-[#E05343] transition-colors"
                >
                  › Hot Deals & Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 & 5: FOLLOW US & NEWSLETTER */}
          <div className="sm:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] mb-3">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href="#fb"
                  aria-label="Facebook"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#tw"
                  aria-label="Twitter"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#insta"
                  aria-label="Instagram"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-[#e1306c] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#yt"
                  aria-label="YouTube"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] mb-1">
                NEWSLETTER SIGNUP
              </h4>
              <p className="text-[11px] mb-3">
                Signup to receive latest promotions & beauty coupon alerts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Payment & Courier Strips */}
      <div className="border-t border-[#E8E2D9] dark:border-[#312E29] bg-[#F9F6F0] dark:bg-[#1A1916] py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Payment Methods */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A443B] dark:text-[#C5BEB3]">
              Payment Methods
            </span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="px-2.5 py-1 text-[11px] font-bold bg-white dark:bg-[#25221E] border border-[#E8E2D9] dark:border-[#312E29] rounded shadow-2xs text-[#BA2D1D]">
                bKash
              </span>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-white dark:bg-[#25221E] border border-[#E8E2D9] dark:border-[#312E29] rounded shadow-2xs text-[#8E44AD]">
                Rocket
              </span>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-white dark:bg-[#25221E] border border-[#E8E2D9] dark:border-[#312E29] rounded shadow-2xs text-[#D35400]">
                Nagad
              </span>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-white dark:bg-[#25221E] border border-[#E8E2D9] dark:border-[#312E29] rounded shadow-2xs text-[#2980B9]">
                VISA / MasterCard
              </span>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-white dark:bg-[#25221E] border border-[#E8E2D9] dark:border-[#312E29] rounded shadow-2xs text-[#1F6E54]">
                Cash On Delivery
              </span>
            </div>
          </div>

          {/* Delivered By */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A443B] dark:text-[#C5BEB3]">
              Delivered By
            </span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-[#25221E] border border-[#E8E2D9] dark:border-[#312E29] rounded shadow-2xs text-[#C0392B]">
                RedX
              </span>
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-[#25221E] border border-[#E8E2D9] dark:border-[#312E29] rounded shadow-2xs text-[#E74C3C]">
                Pathao
              </span>
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-[#25221E] border border-[#E8E2D9] dark:border-[#312E29] rounded shadow-2xs text-[#27AE60]">
                eCourier
              </span>
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-[#25221E] border border-[#E8E2D9] dark:border-[#312E29] rounded shadow-2xs text-[#2C3E50]">
                Sundarban Courier
              </span>
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-[#25221E] border border-[#E8E2D9] dark:border-[#312E29] rounded shadow-2xs text-[#D68910]">
                DHL Express
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Copyright Strip */}
      <div className="border-t border-[#E8E2D9] dark:border-[#312E29] bg-[#1F1D1A] text-[#9E968B] text-center py-3 px-4 text-xs">
        <p>
          Copyright ©2026 <strong className="text-white">Wellsell BD</strong>. All rights reserved. Fine Stationery & Health Care Paper Store.
        </p>
      </div>
    </footer>
  );
};
