'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SideBySideMagnifier, MagnifierContainer, MagnifierPreview, MagnifierZoom } from '@ctasca/react-image-magnifiers';
import {
  Star,
  ShieldCheck,
  RotateCcw,
  Phone,
  MessageCircle,
  Share2,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  MapPin,
  Clock,
  Send,
  Eye,
  Package,
  Truck,
  Sparkles,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';
import { MOCK_PRODUCTS, MOCK_REVIEWS, MOCK_QUESTIONS } from '@/data/mockData';
import { Product, ProductQuestion, ProductReview } from '@/types';
import { api } from '@/services/api';

interface ProductDetailsClientProps {
  product: Product;
  productSlug?: string;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const {
    formatPrice,
    addToCart,
    quickBuy,
    showToast
  } = useApp();

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews' | 'qa' | 'authenticity'>('desc');

  // Shipping location check
  const [selectedCity, setSelectedCity] = useState('Dhaka (Inside City)');
  const [shippingEstimate, setShippingEstimate] = useState<{ cost: number; time: string }>({
    cost: 60,
    time: '24-48 Hours via RedX Express'
  });

  // Reviews & Questions
  const [reviews, setReviews] = useState<ProductReview[]>(() =>
    MOCK_REVIEWS.filter((r) => r.product_id === product.id || product.id === 108565)
  );
  const [questions, setQuestions] = useState<ProductQuestion[]>(() =>
    MOCK_QUESTIONS.filter((q) => q.product_id === product.id || product.id === 108565)
  );
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newQuestionText, setNewQuestionText] = useState('');

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (city.toLowerCase().includes('dhaka')) {
      setShippingEstimate({ cost: 60, time: '24-48 Hours via RedX Express' });
    } else {
      setShippingEstimate({ cost: 130, time: '48-72 Hours Nationwide' });
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const newRev: ProductReview = {
      id: Date.now(),
      product_id: product.id,
      user_id: 1,
      user_name: 'Verified Customer',
      rating: newReviewRating,
      review: newReviewText,
      status: 1,
      created_at: new Date().toISOString()
    };
    setReviews([newRev, ...reviews]);
    setNewReviewText('');
    showToast('Review submitted successfully!', 'success');
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    const newQ: ProductQuestion = {
      id: Date.now(),
      product_id: product.id,
      question: newQuestionText,
      answer: 'Thank you for your question! Our product specialist confirms 100% genuine formulation.',
      status: 1,
      created_at: new Date().toISOString()
    };
    setQuestions([newQ, ...questions]);
    setNewQuestionText('');
    showToast('Question submitted to store specialist!', 'success');
  };

  const galleryImages = [
    product.image,
    '/src/assets/images/hero_beauty_skincare_banner_1792385518854.jpg',
    '/src/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg'
  ];

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <div className="w-full pb-16 space-y-8 sm:space-y-10 pt-4 sm:pt-6">
      {/* 1. Main PDP Container */}
      <section className="container">
        <div className="section-card p-4 sm:p-7">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-[#736C62] dark:text-[#9E968B] mb-5 border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
            <Link href="/" className="hover:text-[#BA2D1D]">Home</Link>
            <span>›</span>
            <Link href={`/category/${product.category_id === 101 ? 'health-vitamin' : 'health-beauty'}`} className="hover:text-[#BA2D1D]">
              {product.category_name || 'Beauty & Wellness'}
            </Link>
            <span>›</span>
            <span className="text-[#1F1D1A] dark:text-[#EDE7DE] font-semibold truncate max-w-sm">
              {product.name}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Product Image & Gallery (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="product-image-stage relative aspect-square w-full bg-white dark:bg-[#161616] rounded-xs p-4">
                <div className="product-magnifier w-full h-full">
                  {/* <SideBySideMagnifier
                    imageSrc={activeImage || product.image}
                    largeImageSrc={activeImage || product.image}
                    switchSides={false}
                    fillAvailableSpace
                    zoomContainerWidth={300}
                    zoomContainerHeight={300}
                    alt={product.name}
                  /> */}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded border p-1 bg-white dark:bg-[#1A1916] transition-all cursor-pointer ${activeImage === img
                      ? 'border-[#BA2D1D] ring-2 ring-[#BA2D1D]/20'
                      : 'border-[#E8E2D9] dark:border-[#312E29] opacity-70 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Assurances Under Image */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#736C62] dark:text-[#9E968B] pt-2">
                <div className="flex items-center gap-1.5 p-2 bg-[#FBF9F5] dark:bg-[#1A1815] rounded-xs">
                  <ShieldCheck className="w-4 h-4 text-[#1F6E54]" />
                  <span>100% Genuine Import</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-[#FBF9F5] dark:bg-[#1A1815] rounded-xs">
                  <RotateCcw className="w-4 h-4 text-[#BA2D1D]" />
                  <span>7-Day Return Policy</span>
                </div>
              </div>
            </div>

            {/* Right: Product Info & Buy Box (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-[#BA2D1D] dark:text-[#E05343] font-semibold mb-1">
                  {product.brand} · Direct Authentic Import
                </span>
                <h1 className="font-serif font-black text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE] leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-4 mt-2.5 text-xs">
                  <div className="flex items-center gap-1 text-amber-500">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-[#1F1D1A] dark:text-[#EDE7DE] ml-1">4.9</span>
                    <span className="text-[#736C62] dark:text-[#9E968B]">({reviews.length} reviews)</span>
                  </div>
                  <span className="text-[#D3CBC0] dark:text-[#3E3A34]">|</span>
                  <div className="flex items-center gap-1 text-[#1F6E54] dark:text-[#34A87C] font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>In Stock (Ready to Dispatch)</span>
                  </div>
                </div>
              </div>

              {/* Price Box */}
              <div className="p-4 bg-[#FBF9F5] dark:bg-[#1A1815] rounded-xs border border-[#E8E2D9] dark:border-[#312E29] flex flex-wrap items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-[#BA2D1D] dark:text-[#E05343] font-mono tabular-nums">
                    {formatPrice(product.price || 0)}
                  </span>
                  {product.old_price && (
                    <span className="text-sm text-[#9A9184] line-through font-mono tabular-nums">
                      {formatPrice(product.old_price)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs font-bold text-[#1F6E54] dark:text-[#34A87C] bg-[#1F6E54]/10 px-2 py-0.5 rounded-xs">
                      Save {product.discount}%
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#736C62] dark:text-[#9E968B]">
                  SKU: WELL-{product.id}-BD
                </span>
              </div>

              {/* Delivery Zone Selector */}
              <div className="p-3.5 bg-[#F8F5EE] dark:bg-[#1E1C19] rounded-xs border border-[#E8E2D9] dark:border-[#312E29] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                    <Truck className="w-4 h-4 text-[#BA2D1D]" />
                    <span>Delivery Estimate</span>
                  </div>
                  <select
                    value={selectedCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="bg-white dark:bg-[#262420] border border-[#DCD5C9] dark:border-[#38332C] text-xs rounded px-2 py-1 text-[#1F1D1A] dark:text-[#EDE7DE]"
                  >
                    <option value="Dhaka (Inside City)">Inside Dhaka City</option>
                    <option value="Chittagong / Nationwide">Outside Dhaka (All Districts)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#736C62] dark:text-[#9E968B]">
                  <span>Delivery Charge: <strong className="text-[#BA2D1D]">Tk. {shippingEstimate.cost}</strong></span>
                  <span>Timeline: <strong>{shippingEstimate.time}</strong></span>
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">Quantity:</span>
                  <div className="flex items-center border border-[#DCD5C9] dark:border-[#38332C] rounded-xs bg-[#FBF9F5] dark:bg-[#161513]">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#25221E] text-xs transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-semibold font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#25221E] text-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex items-center justify-center gap-2 bg-[#5C5549] hover:bg-[#453F36] dark:bg-[#383838] dark:hover:bg-[#4A4A4A] text-white py-3 px-5 rounded-xs font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Bag</span>
                  </button>
                  <button
                    onClick={() => quickBuy(product, quantity)}
                    className="flex items-center justify-center gap-2 bg-[#BA2D1D] hover:bg-[#961F12] text-white py-3 px-5 rounded-xs font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Buy Now (Checkout)</span>
                  </button>
                </div>
              </div>

              {/* Contact Seller & Hotline */}
              <div className="pt-3 border-t border-[#F0EDE8] dark:border-[#2A2A2A] flex flex-wrap items-center justify-between text-xs text-[#736C62] dark:text-[#9E968B] gap-3">
                <a
                  href="tel:+8801894084242"
                  className="inline-flex items-center gap-1.5 hover:text-[#BA2D1D]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#BA2D1D]" />
                  <span>Call Store Hotline: <strong>+8801894084242</strong></span>
                </a>
                <div className="flex items-center gap-2">
                  <span className="text-[11px]">Share:</span>
                  <a href="#fb" className="hover:text-[#BA2D1D]"><Facebook className="w-3.5 h-3.5" /></a>
                  <a href="#tw" className="hover:text-[#BA2D1D]"><Twitter className="w-3.5 h-3.5" /></a>
                  <a href="#in" className="hover:text-[#BA2D1D]"><Linkedin className="w-3.5 h-3.5" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Detailed Tabs Section */}
      <section className="container">
        <div className="section-card p-4 sm:p-7 space-y-6">
          {/* Tab Headers */}
          <div className="flex border-b border-[#E8E2D9] dark:border-[#312E29] overflow-x-auto gap-4 sm:gap-6 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 'desc'
                ? 'border-[#BA2D1D] text-[#BA2D1D]'
                : 'border-transparent text-[#736C62] dark:text-[#9E968B] hover:text-[#1F1D1A]'
                }`}
            >
              Description & Specifications
            </button>
            <button
              onClick={() => setActiveTab('authenticity')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 'authenticity'
                ? 'border-[#BA2D1D] text-[#BA2D1D]'
                : 'border-transparent text-[#736C62] dark:text-[#9E968B] hover:text-[#1F1D1A]'
                }`}
            >
              Authenticity & Lab Verification
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 'reviews'
                ? 'border-[#BA2D1D] text-[#BA2D1D]'
                : 'border-transparent text-[#736C62] dark:text-[#9E968B] hover:text-[#1F1D1A]'
                }`}
            >
              Customer Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 'qa'
                ? 'border-[#BA2D1D] text-[#BA2D1D]'
                : 'border-transparent text-[#736C62] dark:text-[#9E968B] hover:text-[#1F1D1A]'
                }`}
            >
              Questions & Answers ({questions.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="pt-2">
            {activeTab === 'desc' && (
              <div className="space-y-4 text-xs sm:text-sm text-[#4A443B] dark:text-[#C5BEB3] leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: product.description}} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                  <div className="p-4 bg-[#FBF9F5] dark:bg-[#1A1916] rounded-xs border border-[#E8E2D9] dark:border-[#312E29]">
                    <h4 className="font-bold text-[#1F1D1A] dark:text-[#EDE7DE] mb-2">
                      Key Highlights
                    </h4>
                    <ul className="space-y-1.5 text-xs list-disc list-inside">
                      <li>100% Genuine imported formulation with original packaging</li>
                      <li>Dermatologist verified and lab tested</li>
                      <li>Batch serial number printed on outer carton</li>
                      <li>Cruelty free, non-comedogenic formula</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-[#FBF9F5] dark:bg-[#1A1916] rounded-xs border border-[#E8E2D9] dark:border-[#312E29]">
                    <h4 className="font-bold text-[#1F1D1A] dark:text-[#EDE7DE] mb-2">
                      Usage Directions
                    </h4>
                    <p className="text-xs">
                      Apply a moderate amount onto clean, dry skin or pulse points. For skincare, massage in upward circular motions until fully absorbed. Suitable for daily morning and night routines.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'authenticity' && (
              <div className="space-y-4 text-xs sm:text-sm text-[#4A443B] dark:text-[#C5BEB3] leading-relaxed">
                <div className="p-5 bg-[#F2F9F5] dark:bg-[#14231C] rounded-xs border border-[#BDE3CF] dark:border-[#1E4D38] space-y-2">
                  <div className="flex items-center gap-2 text-[#1F6E54] dark:text-[#34A87C] font-bold">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Wellsell BD 100% Genuine Import Guarantee</span>
                  </div>
                  <p className="text-xs">
                    Every cosmetic, perfume, and dietary supplement item sold on Wellsell BD is imported directly through authorized distributors from the USA, Korea, and Japan. All items contain legitimate batch codes verifiable against the manufacturer database.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="section-card p-4 text-center">
                    <span className="font-bold text-lg text-[#BA2D1D]">100%</span>
                    <p className="text-xs text-[#736C62] mt-1">Authentic Batch Proof</p>
                  </div>
                  <div className="section-card p-4 text-center">
                    <span className="font-bold text-lg text-[#1F6E54]">7 Days</span>
                    <p className="text-xs text-[#736C62] mt-1">Hassle-Free Money Back</p>
                  </div>
                  <div className="section-card p-4 text-center">
                    <span className="font-bold text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">RedX</span>
                    <p className="text-xs text-[#736C62] mt-1">Inspected Parcel Delivery</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Submit New Review Form */}
                <form onSubmit={handleReviewSubmit} className="p-4 bg-[#FBF9F5] dark:bg-[#1A1916] rounded-xs border border-[#E8E2D9] dark:border-[#312E29] space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Write a Verified Review
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#736C62]">Your Rating:</span>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="bg-white dark:bg-[#262420] border border-[#DCD5C9] text-xs rounded px-2 py-1"
                    >
                      <option value={5}>5 Stars - Outstanding</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Average</option>
                      <option value={2}>2 Stars - Below Average</option>
                      <option value={1}>1 Star - Poor</option>
                    </select>
                  </div>
                  <textarea
                    required
                    rows={2}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Share your experience regarding texture, fragrance, and longevity..."
                    className="w-full bg-white dark:bg-[#262420] border border-[#DCD5C9] text-xs p-2.5 rounded-xs focus:outline-none focus:border-[#BA2D1D]"
                  />
                  <button
                    type="submit"
                    className="bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold px-4 py-2 rounded-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-3 divide-y divide-[#F0EDE8] dark:divide-[#262420]">
                  {reviews.map((r) => (
                    <div key={r.id} className="pt-3 first:pt-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#1F1D1A] dark:text-[#EDE7DE]">
                          {r.user_name}
                        </span>
                        <div className="flex text-amber-500">
                          {[...Array(r.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#5C5549] dark:text-[#B3ABA0] leading-relaxed">
                        {r.review}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'qa' && (
              <div className="space-y-6">
                {/* Ask a Question */}
                <form onSubmit={handleQuestionSubmit} className="p-4 bg-[#FBF9F5] dark:bg-[#1A1916] rounded-xs border border-[#E8E2D9] dark:border-[#312E29] space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
                    Have a Question about this Product?
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="e.g. Is this suitable for sensitive combination skin?"
                      className="flex-1 bg-white dark:bg-[#262420] border border-[#DCD5C9] text-xs px-3 py-2 rounded-xs focus:outline-none focus:border-[#BA2D1D]"
                    />
                    <button
                      type="submit"
                      className="bg-[#5C5549] hover:bg-[#453F36] text-white text-xs font-semibold px-4 py-2 rounded-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Ask Question
                    </button>
                  </div>
                </form>

                {/* Questions List */}
                <div className="space-y-3 divide-y divide-[#F0EDE8] dark:divide-[#262420]">
                  {questions.map((q) => (
                    <div key={q.id} className="pt-3 first:pt-0 space-y-1 text-xs">
                      <p className="font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] flex items-center gap-1.5">
                        <span className="text-[#BA2D1D] font-bold">Q:</span>
                        <span>{q.question}</span>
                      </p>
                      {q.answer && (
                        <p className="text-[#5C5549] dark:text-[#B3ABA0] pl-4 border-l-2 border-[#1F6E54] text-[11px] leading-relaxed">
                          <strong>A:</strong> {q.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Related Products Section */}
      <section className="container">
        <div className="section-card p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
              Related Recommended Products
            </h3>
            <Link
              href="/category/health-beauty"
              className="text-xs text-[#BA2D1D] hover:underline font-semibold"
            >
              View More ›
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
