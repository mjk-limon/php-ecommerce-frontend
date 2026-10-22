import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../data/mockData';
import { api } from '../services/api';
import { Product, ProductQuestion, ProductReview, ShippingLocation } from '../types';

export const ProductDetailsPage: React.FC = () => {
  const {
    activeProductSlug,
    formatPrice,
    addToCart,
    quickBuy,
    showToast
  } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews'>('desc');

  // Shipping location check
  const [locations, setLocations] = useState<ShippingLocation[]>([]);
  const [selectedLocationCity, setSelectedLocationCity] = useState('Dhaka (Inside City)');
  const [shippingEstimate, setShippingEstimate] = useState<{ cost: number; time: string } | null>({
    cost: 60,
    time: '24-48 Hours via RedX'
  });

  // Reviews & Questions
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [questions, setQuestions] = useState<ProductQuestion[]>([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);

  useEffect(() => {
    api.getProductDetails(activeProductSlug).then((res) => {
      if (res.success && res.data) {
        setProduct(res.data);
        setActiveImage(res.data.image);
      }
    });

    api.getShipping().then((res) => {
      if (res.success && res.data.locations) {
        setLocations(res.data.locations);
      }
    });
  }, [activeProductSlug]);

  useEffect(() => {
    if (product) {
      api.getProductReviews(product.id).then((res) => {
        if (res.success) setReviews(res.data);
      });
      api.getProductQuestions(product.id).then((res) => {
        if (res.success) setQuestions(res.data);
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-[#736C62]">
        Loading product details...
      </div>
    );
  }

  const handleLocationCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const loc = locations.find((l) => l.location.toLowerCase().includes(selectedLocationCity.toLowerCase()));
    if (loc && loc.cost_times && loc.cost_times.length > 0) {
      setShippingEstimate({
        cost: loc.cost_times[0].cost,
        time: `${loc.cost_times[0].estimate_time} via RedX`
      });
      showToast(`Shipping estimated for ${loc.location}`, 'info');
    } else {
      setShippingEstimate({
        cost: selectedLocationCity.toLowerCase().includes('dhaka') ? 60 : 130,
        time: selectedLocationCity.toLowerCase().includes('dhaka') ? '24-48 Hours' : '2-4 Days'
      });
      showToast(`Shipping rate calculated`, 'info');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    setIsSubmittingReview(true);
    try {
      const res = await api.addProductReview({
        user_id: 1,
        user_name: 'Verified Customer',
        product_id: product.id,
        review: newReviewText,
        rating: newReviewRating
      });
      if (res.success) {
        setReviews([res.data, ...reviews]);
        setNewReviewText('');
        showToast('Review submitted successfully!', 'success');
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setIsSubmittingQuestion(true);
    try {
      const res = await api.addProductQuestion({
        product_id: product.id,
        question: newQuestionText
      });
      if (res.success) {
        setQuestions([res.data, ...questions]);
        setNewQuestionText('');
        showToast('Question submitted to seller!', 'success');
      }
    } finally {
      setIsSubmittingQuestion(false);
    }
  };

  const galleryImages = product.thumbnails && product.thumbnails.length > 0
    ? product.thumbnails
    : [product.image, '/src/assets/images/hero_beauty_skincare_banner_1792385518854.jpg', '/src/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg'];

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 6);

  return (
    <div className="w-full pb-16 space-y-8 sm:space-y-10 pt-4 sm:pt-6">
      {/* 1. Main PDP Container matching Screenshot 2 */}
      <section className="container">
        <div className="section-card p-4 sm:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Product Image & Gallery (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square w-full bg-[#FAFAFA] dark:bg-[#161616] rounded-xs overflow-hidden flex items-center justify-center p-4">
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-[#BA2D1D] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider shadow-xs">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {galleryImages.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(thumb)}
                    className={`w-16 h-16 rounded-xs overflow-hidden shrink-0 transition-all p-1 bg-[#FAFAFA] dark:bg-[#161616] ${
                      activeImage === thumb
                        ? 'ring-2 ring-[#BA2D1D] shadow-xs'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Middle: Product Title & Contiguous Purchase Module (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <h1 className="font-serif font-bold text-lg sm:text-xl text-[#1F1D1A] dark:text-[#EDE7DE] leading-snug">
                  {product.name}
                </h1>
                <p className="text-xs text-[#736C62] dark:text-[#9E968B] mt-1">
                  By, <span className="font-medium text-[#1F1D1A] dark:text-[#EDE7DE]">{product.brand}</span>
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1 border-b border-[#F4EFEA] dark:border-[#272420] pb-3">
                <span className="font-mono font-bold text-2xl text-[#BA2D1D] dark:text-[#E05343] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.old_price && (
                  <span className="font-mono text-xs text-[#9A9184] line-through tabular-nums">
                    {formatPrice(product.old_price)}
                  </span>
                )}
              </div>

              {/* Availability & SKU */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#736C62] dark:text-[#9E968B]">Availability:</span>
                  <span className="text-[#1F6E54] dark:text-[#34A87C] font-semibold">
                    In Stock ({product.stock || 5} Available)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#736C62] dark:text-[#9E968B]">SKU:</span>
                  <span className="font-mono text-[#1F1D1A] dark:text-[#EDE7DE]">{product.sku || '0667546821898'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#736C62] dark:text-[#9E968B]">Product Code:</span>
                  <span className="font-mono text-[#1F1D1A] dark:text-[#EDE7DE]">{product.product_code || '108565'}</span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#1F1D1A] dark:text-[#EDE7DE] mb-2">
                  Select Quantity:
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#DCD5C9] dark:border-[#38332C] rounded-xs bg-[#FBF9F5] dark:bg-[#161513]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#25221E] text-sm"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-bold font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#EDE7DE] dark:hover:bg-[#25221E] text-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-[#736C62] dark:text-[#9E968B]">
                    Product total: <strong className="font-mono text-[#BA2D1D]">{formatPrice(product.price * quantity)}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons: Add To Cart & Quick Buy matching Screenshot 2 */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex items-center justify-center gap-1.5 bg-[#5C5549] hover:bg-[#453F36] dark:bg-[#38332C] dark:hover:bg-[#4A443B] text-white text-xs font-semibold py-2.5 px-3 rounded-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add To Cart</span>
                </button>
                <button
                  onClick={() => quickBuy(product, quantity)}
                  className="flex items-center justify-center gap-1.5 bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold py-2.5 px-3 rounded-xs uppercase tracking-wider transition-colors shadow-2xs cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Quick Buy</span>
                </button>
              </div>

              {/* Order on WhatsApp matching Screenshot 2 */}
              <a
                href={`https://wa.me/8801894084242?text=Hello%20Wellsell%20BD,%20I%20would%20like%20to%20order:%20${encodeURIComponent(product.name)}%20(SKU:%20${product.sku || product.id})`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-2.5 px-4 rounded-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>

              {/* Call for order */}
              <div className="p-3 bg-[#FBF9F5] dark:bg-[#1A1916] border border-[#E8E2D9] dark:border-[#312E29] rounded-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#BA2D1D]/10 text-[#BA2D1D] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="text-[#736C62] dark:text-[#9E968B] block text-[11px]">
                    Call for order inquiry:
                  </span>
                  <a
                    href="tel:+8801894084242"
                    className="font-bold text-[#1F1D1A] dark:text-[#EDE7DE] font-mono hover:text-[#BA2D1D]"
                  >
                    +8801894084242
                  </a>
                </div>
              </div>

              {/* Social Share Icons matching Screenshot 2 */}
              <div className="flex items-center gap-2 text-xs pt-1">
                <span className="text-[#736C62] dark:text-[#9E968B]">Share on:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => showToast('Shared to Facebook', 'info')}
                    className="w-6 h-6 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90"
                  >
                    <Facebook className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => showToast('Shared to Twitter', 'info')}
                    className="w-6 h-6 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-90"
                  >
                    <Twitter className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => showToast('Shared to LinkedIn', 'info')}
                    className="w-6 h-6 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90"
                  >
                    <Linkedin className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Delivery & Trust Sidebar matching Screenshot 2 (3 cols) */}
            <div className="lg:col-span-3 space-y-4 bg-[#FBF9F5] dark:bg-[#161513] p-4 sm:p-5 rounded-xs border border-[#E8E2D9] dark:border-[#312E29]">
              {/* Product Rating */}
              <div className="text-xs border-b border-[#E8E2D9] dark:border-[#312E29] pb-3">
                <span className="text-[#736C62] dark:text-[#9E968B] block text-[11px]">
                  Product Rating
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-lg font-mono text-[#1F1D1A] dark:text-[#EDE7DE]">
                    {product.rating || '4.8'}
                  </span>
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-[#9A9184]">
                  (Total Ratings: {product.reviews_count || 24})
                </span>
              </div>

              {/* Total Stock & Views */}
              <div className="grid grid-cols-2 gap-2 text-xs border-b border-[#E8E2D9] dark:border-[#312E29] pb-3">
                <div>
                  <span className="text-[10px] text-[#736C62] dark:text-[#9E968B] block uppercase tracking-wider">
                    Total Stock
                  </span>
                  <span className="font-bold text-sm font-mono text-[#1F1D1A] dark:text-[#EDE7DE]">
                    {product.stock || 3}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#736C62] dark:text-[#9E968B] block uppercase tracking-wider">
                    Total Views
                  </span>
                  <span className="font-bold text-sm font-mono text-[#1F1D1A] dark:text-[#EDE7DE]">
                    {product.views || 3549}
                  </span>
                </div>
              </div>

              {/* Delivery Info with Live Location Checker matching Screenshot 2 */}
              <div className="text-xs space-y-2 border-b border-[#E8E2D9] dark:border-[#312E29] pb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] block">
                  Delivery Info
                </span>
                <p className="text-[11px] text-[#736C62] dark:text-[#9E968B] leading-tight">
                  ⚡ <strong>Fastest delivery.</strong> Type your location to get available shipping methods:
                </p>
                <form onSubmit={handleLocationCheck} className="flex gap-1.5 pt-1">
                  <input
                    type="text"
                    value={selectedLocationCity}
                    onChange={(e) => setSelectedLocationCity(e.target.value)}
                    placeholder="Enter your location"
                    className="flex-1 bg-white dark:bg-[#1C1A17] border border-[#DCD5C9] dark:border-[#38332C] text-[11px] px-2.5 py-1.5 rounded-xs"
                  />
                  <button
                    type="submit"
                    className="bg-[#1F1D1A] hover:bg-[#333] dark:bg-[#38332C] text-white text-[11px] font-semibold px-3 py-1.5 rounded-xs cursor-pointer"
                  >
                    Check
                  </button>
                </form>

                {shippingEstimate && (
                  <div className="bg-[#EFEAE1] dark:bg-[#25221E] p-2 rounded-xs text-[11px] space-y-0.5 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Standard Courier:</span>
                      <span className="font-mono text-[#BA2D1D]">Tk. {shippingEstimate.cost}</span>
                    </div>
                    <div className="text-[10px] text-[#736C62] dark:text-[#9E968B]">
                      Estimate: {shippingEstimate.time}
                    </div>
                  </div>
                )}
              </div>

              {/* Trust badges matching Screenshot 2 */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#1F1D1A] dark:text-[#EDE7DE]">
                  <ShieldCheck className="w-4 h-4 text-[#1F6E54] shrink-0" />
                  <span className="text-[11px] font-medium">Payment Security Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-[#1F1D1A] dark:text-[#EDE7DE]">
                  <RotateCcw className="w-4 h-4 text-[#BA2D1D] shrink-0" />
                  <span className="text-[11px] font-medium">Free and Easy Return Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tabs: Full Description & Ratings matching Screenshot 2 */}
      <section className="container">
        <div className="section-card overflow-hidden">
          {/* Tab buttons */}
          <div className="flex border-b border-[#F0EDE8] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
            <button
              onClick={() => setActiveTab('desc')}
              className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'desc'
                  ? 'border-[#BA2D1D] bg-white dark:bg-[#1E1E1E] text-[#BA2D1D] dark:text-[#E05343]'
                  : 'border-transparent text-[#736C62] hover:text-[#1F1D1A]'
              }`}
            >
              Product Full Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-[#BA2D1D] bg-white dark:bg-[#1E1E1E] text-[#BA2D1D] dark:text-[#E05343]'
                  : 'border-transparent text-[#736C62] hover:text-[#1F1D1A]'
              }`}
            >
              Ratings & Reviews ({reviews.length})
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'desc' ? (
              <div className="space-y-6 max-w-4xl text-xs sm:text-sm text-[#3E3A34] dark:text-[#C5BEB3] leading-relaxed">
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description || '' }}
                />

                {/* Editorial image in description matching Screenshot 2 */}
                <div className="my-6 rounded-xs overflow-hidden max-w-xl shadow-xs">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover"
                  />
                  <p className="p-2 text-[10px] text-center italic bg-[#FAFAFA] dark:bg-[#161616] text-[#736C62]">
                    Authentic commercial packaging and certified batch barcode verification.
                  </p>
                </div>
              </div>
            ) : (
              /* Ratings & Reviews Tab */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Reviews List */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
                      Customer Feedback ({reviews.length})
                    </h4>
                    {reviews.length === 0 ? (
                      <p className="text-xs text-[#736C62]">No reviews yet. Be the first to share your thoughts!</p>
                    ) : (
                      reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-3.5 bg-[#FBF9F5] dark:bg-[#161513] border border-[#E8E2D9] dark:border-[#312E29] rounded-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                              {rev.user_name || 'Verified Buyer'}
                            </span>
                            <div className="flex text-amber-500">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`w-3 h-3 ${s <= rev.rating ? 'fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-[#5C5549] dark:text-[#B3ABA0]">
                            {rev.review}
                          </p>
                          <span className="text-[10px] text-[#9A9184] font-mono block">
                            {new Date(rev.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Write a review form */}
                  <div className="p-4 bg-[#FBF9F5] dark:bg-[#161513] border border-[#E8E2D9] dark:border-[#312E29] rounded-xs space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE]">
                      Write a Review
                    </h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[11px] text-[#736C62] mb-1">Your Rating:</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="bg-white dark:bg-[#1C1A17] border border-[#DCD5C9] dark:border-[#38332C] px-2 py-1 rounded text-xs"
                        >
                          <option value={5}>5 Stars - Excellent</option>
                          <option value={4}>4 Stars - Very Good</option>
                          <option value={3}>3 Stars - Good</option>
                          <option value={2}>2 Stars - Fair</option>
                          <option value={1}>1 Star - Poor</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#736C62] mb-1">Feedback Description:</label>
                        <textarea
                          rows={3}
                          required
                          value={newReviewText}
                          onChange={(e) => setNewReviewText(e.target.value)}
                          placeholder="How did you find the fragrance projection, packaging, and authenticity?"
                          className="w-full bg-white dark:bg-[#1C1A17] border border-[#DCD5C9] dark:border-[#38332C] p-2.5 rounded-xs"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold px-4 py-2 rounded-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
                      >
                        {isSubmittingReview ? 'Submitting...' : 'Post Review'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Product Questions & Seller Score 2-Column Split matching Screenshot 2 */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: Product Questions matching Screenshot 2 (7 cols) */}
          <div className="md:col-span-7 section-card p-5 space-y-4">
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-2">
              Product Questions
            </h3>

            {questions.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#736C62]">
                <p>Sorry ! No Questions Found</p>
                <p className="text-[11px] text-[#9A9184] mt-1">Be the first to ask about this item.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 bg-[#FAFAFA] dark:bg-[#161616] rounded-xs text-xs space-y-1"
                  >
                    <p className="font-semibold text-[#1F1D1A] dark:text-[#EDE7DE]">
                      Q: {q.question}
                    </p>
                    {q.answer && (
                      <p className="text-[#1F6E54] dark:text-[#34A87C] pl-2 border-l-2 border-[#1F6E54]">
                        Ans: {q.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Ask a question form */}
            <form onSubmit={handleQuestionSubmit} className="flex gap-2 pt-2 border-t border-[#F0EDE8] dark:border-[#2A2A2A]">
              <input
                type="text"
                required
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="Ask seller a question about stock or authenticity..."
                className="flex-1 bg-[#FAFAFA] dark:bg-[#161616] border border-[#DCD5C9] dark:border-[#38332C] text-xs px-3 py-2 rounded-xs"
              />
              <button
                type="submit"
                disabled={isSubmittingQuestion}
                className="bg-[#BA2D1D] hover:bg-[#961F12] text-white text-xs font-semibold px-4 py-2 rounded-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
              >
                Ask
              </button>
            </form>
          </div>

          {/* Right: Seller Review Card matching Screenshot 2 (5 cols) */}
          <div className="md:col-span-5 section-card p-5 space-y-4">
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[#1F1D1A] dark:text-[#EDE7DE] border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-2">
              Seller Review
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#1F1D1A] dark:text-[#EDE7DE]">
                  Wellsell BD Official
                </p>
                <p className="text-[11px] text-[#736C62] dark:text-[#9E968B]">
                  Overall Store Score:
                </p>
              </div>
              <span className="font-mono font-black text-2xl text-[#BA2D1D] dark:text-[#E05343]">
                91.37
              </span>
            </div>

            {/* Progress Bars matching Screenshot 2 */}
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-[#736C62] mb-1">
                  <span>Delivery Speed</span>
                  <span className="font-mono">94%</span>
                </div>
                <div className="w-full h-2 bg-[#F0EDE8] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1F6E54] w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#736C62] mb-1">
                  <span>Positive Rating</span>
                  <span className="font-mono">96%</span>
                </div>
                <div className="w-full h-2 bg-[#F0EDE8] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div className="h-full bg-[#BA2D1D] w-[96%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#736C62] mb-1">
                  <span>Response Rate</span>
                  <span className="font-mono">92%</span>
                </div>
                <div className="w-full h-2 bg-[#F0EDE8] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[92%]" />
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast('Visiting official certified store profile.', 'info')}
              className="w-full text-center text-xs font-semibold text-[#BA2D1D] hover:underline pt-2 block cursor-pointer"
            >
              Visit Seller Store ›
            </button>
          </div>
        </div>
      </section>

      {/* 4. Related Products Grid matching Screenshot 2 */}
      <section className="container">
        <div className="section-card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5 border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
            <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
              Related Products
            </h2>
            <span className="text-[11px] text-[#736C62] dark:text-[#9E968B]">
              Handpicked complements for your beauty regimen
            </span>
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
};
