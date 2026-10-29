"use client";

import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { getAssetUrl } from "@/lib/assetHelper";
import { Product, ProductVariant, QuestionItem, ReviewItem } from "@/types";
import {
  Building2,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  RotateCcw,
  ShieldCheck,
  Star,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface ProductDetailsClientProps {
  product: Product;
  reviews?: ReviewItem[];
  questions?: QuestionItem[];
  suggestions?: Product[];
}

export default function ProductDetailsClient({
  product,
  reviews = [],
  questions = [],
  suggestions = [],
}: ProductDetailsClientProps) {
  const { formatPrice, addToCart, quickBuy } = useApp();

  // Selected size & color state
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Extract distinct available sizes & colors from variants
  const [availableSizes, availableColors] = useMemo<[string[], string[]]>(() => {
    const variants = product.variants ?? [];

    const { sizeSet, colorSet } = variants.reduce(
      (acc, variant) => {
        if (variant.size) {
          acc.sizeSet.add(variant.size);
        }

        if (variant.color) {
          acc.colorSet.add(variant.color);
        }

        return acc;
      },
      { sizeSet: new Set<string>(), colorSet: new Set<string>() },
    );

    if (sizeSet.size > 0) {
      setSelectedSize(sizeSet.values().next().value);
    }

    if (colorSet.size > 0) {
      setSelectedColor(colorSet.values().next().value);
    }

    return [Array.from(sizeSet), Array.from(colorSet)];
  }, [product.variants]);

  // Determine active variant based on size and color selection
  const selectedVariant = useMemo<ProductVariant>(() => {
    const variants = product.variants || [];
    if (variants.length === 0) {
      return {
        id: product.id,
        size: null,
        color: null,
        price: Number(product.price ?? 0),
        images: [],
      };
    }

    if (selectedSize && selectedColor) {
      const match = variants.find((v) => v.size === selectedSize && v.color === selectedColor);
      if (match) return match;
    }
    if (selectedSize) {
      const match = variants.find((v) => v.size === selectedSize);
      if (match) return match;
    }
    if (selectedColor) {
      const match = variants.find((v) => v.color === selectedColor);
      if (match) return match;
    }
    return variants[0];
  }, [product.variants, product.id, product.price, selectedSize, selectedColor]);

  // Variant change handlers
  const handleSizeChange = (newSize: string) => {
    setSelectedSize(newSize);
    if (availableColors.length > 0) {
      const existsWithColor = product.variants.some((v) => v.size === newSize && v.color === selectedColor);
      if (!existsWithColor) {
        const alt = product.variants.find((v) => v.size === newSize && v.color);
        if (alt?.color) setSelectedColor(alt.color);
      }
    }
  };

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);
    if (availableSizes.length > 0) {
      const existsWithSize = product.variants.some((v) => v.color === newColor && v.size === selectedSize);
      if (!existsWithSize) {
        const alt = product.variants.find((v) => v.color === newColor && v.size);
        if (alt?.size) setSelectedSize(alt.size);
      }
    }
  };

  // Prices
  const currentPrice = selectedVariant.price;
  const currentOldPrice =
    selectedVariant.old_price ??
    (product.discount && product.discount > 0 ? Math.round(currentPrice / (1 - product.discount / 100)) : undefined);

  // Gallery Images
  const galleryImages = useMemo<string[]>(() => {
    const list: string[] = [];
    if (Array.isArray(selectedVariant.images) && selectedVariant.images.length > 0) {
      selectedVariant.images.forEach((img) => {
        const formatted = getAssetUrl(img);
        if (!list.includes(formatted)) list.push(formatted);
      });
    }
    if (list.length === 0) {
      if (product.thumbnail) list.push(getAssetUrl(product.thumbnail));
      else list.push("/assets/images/product-placeholder.png");
    }
    return list;
  }, [selectedVariant.images, product.thumbnail]);

  const [activeImage, setActiveImage] = useState<string>(() => galleryImages[0]);

  useEffect(() => {
    if (galleryImages.length > 0) {
      setActiveImage(galleryImages[0]);
    }
  }, [galleryImages]);

  // Side-by-side zoom state
  const [isZooming, setIsZooming] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [zoomPercent, setZoomPercent] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const LENS_SIZE = 130;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const maxLensX = Math.max(0, rect.width - LENS_SIZE);
    const maxLensY = Math.max(0, rect.height - LENS_SIZE);

    const lensX = Math.max(0, Math.min(maxLensX, mouseX - LENS_SIZE / 2));
    const lensY = Math.max(0, Math.min(maxLensY, mouseY - LENS_SIZE / 2));

    setLensPos({ x: lensX, y: lensY });

    const percentX = maxLensX > 0 ? (lensX / maxLensX) * 100 : 50;
    const percentY = maxLensY > 0 ? (lensY / maxLensY) * 100 : 50;

    setZoomPercent({ x: percentX, y: percentY });
  };

  // Quantity State
  const [quantity, setQuantity] = useState(1);
  const totalAmount = currentPrice * quantity;

  // Stock & SKU
  const currentStock = selectedVariant.stock ?? 10;
  const isInStock = currentStock > 0;
  const currentSku =
    selectedVariant.sku || product.sku || (product.others ? JSON.parse(product.others || "{}")?.sku : "") || "103764";
  const productCode = String(product.id || "10");

  // Store Contacts
  const hotline = process.env.NEXT_PUBLIC_STORE_HOTLINE || "+8801894084242";
  const whatsappNum = (process.env.NEXT_PUBLIC_STORE_WHATSAPP || hotline).replace(/[^0-9]/g, "");

  // WhatsApp Order
  const handleWhatsAppOrder = () => {
    const details = [
      `Hello! I would like to order:`,
      `*${product.name}*`,
      selectedSize ? `Size: ${selectedSize}` : null,
      selectedColor ? `Color: ${selectedColor}` : null,
      `Quantity: ${quantity}`,
      `Total Price: Tk.${totalAmount}`,
      `SKU: ${currentSku}`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(details)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Average review calculation
  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 4.5;
    const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    return sum / reviews.length;
  }, [reviews]);

  // Merchant info
  const merchantInfo = product.merchant?.[0];

  // Social share
  const shareUrl = "";
  const shareTitle = product.name;

  return (
    <div className="w-full pb-16 space-y-6 pt-4 sm:pt-6 min-h-screen">
      {/* 1. Main Product Card */}
      <section className="container">
        <Card>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Side-by-side Zoom Stage & Thumbnails (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center relative">
              <div
                ref={imageContainerRef}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-square w-full max-w-[420px] bg-white dark:bg-[#161616] flex items-center justify-center select-none cursor-crosshair rounded-xs border border-gray-100 dark:border-gray-800"
              >
                <img src={activeImage} alt={product.name} className="max-h-full max-w-full object-contain p-2" />

                {/* Hover Lens Indicator */}
                {isZooming && (
                  <div
                    className="hidden lg:block absolute pointer-events-none border-2 border-[#540d2e]/50 dark:border-white/50 bg-primary/10 dark:bg-white/10 rounded-xs transition-opacity duration-75"
                    style={{
                      width: `${LENS_SIZE}px`,
                      height: `${LENS_SIZE}px`,
                      left: `${lensPos.x}px`,
                      top: `${lensPos.y}px`,
                    }}
                  />
                )}

                {/* Side by Side Zoom Window */}
                {isZooming && (
                  <div
                    className="hidden lg:block absolute left-[calc(100%+20px)] top-0 z-50 w-[460px] h-[460px] xl:w-[500px] xl:h-[500px] bg-white dark:bg-[#1c1c1c] rounded-md border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden pointer-events-none"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomPercent.x}% ${zoomPercent.y}%`,
                      backgroundSize: "150%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/60 text-white text-[10px] font-medium rounded-full backdrop-blur-xs tracking-wide">
                      Zoomed View (1.5×)
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails row */}
              {galleryImages.length > 1 && (
                <div className="flex items-center justify-center gap-2.5 overflow-x-auto w-full pt-4 pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-14 rounded-xs border p-1 bg-white dark:bg-[#161616] transition-all cursor-pointer flex-shrink-0 ${
                        activeImage === img
                          ? "border-[#540d2e] ring-2 ring-[#540d2e]/20"
                          : "border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Details & Buying Controls (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div>
                <h1 className="text-2xl sm:text-[26px] font-normal text-[#222222] dark:text-[#EDE7DE] leading-snug tracking-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-[13px] text-gray-500 dark:text-gray-400 mt-1">
                  By, {product.brand || "ilmComm"}
                </p>
              </div>

              {/* Price Line */}
              <div className="flex items-baseline gap-3 pt-0.5">
                <span className="text-2xl sm:text-[28px] font-bold text-[#540d2e] dark:text-[#E05343] font-sans">
                  Tk.{currentPrice}
                </span>
                {currentOldPrice && currentOldPrice > currentPrice && (
                  <span className="text-base sm:text-lg text-gray-400 line-through font-light">
                    Tk.{currentOldPrice}
                  </span>
                )}
              </div>

              <div className="w-full border-b border-gray-200 dark:border-gray-800" />

              {/* Meta: Availability, SKU, Product Code */}
              <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 dark:text-gray-400">Availability:</span>
                  <span className={isInStock ? "text-[#16a34a] font-bold" : "text-red-500 font-bold"}>
                    {isInStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 dark:text-gray-400">SKU:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{currentSku}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 dark:text-gray-400">Product Code:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{productCode}</span>
                </div>
              </div>

              {/* Size Selector */}
              {availableSizes.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-normal block">
                    Select size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeChange(size)}
                          className={`rounded-md px-3.5 py-1.5 text-xs font-normal transition-all cursor-pointer ${
                            isSelected
                              ? "border border-[#540d2e] ring-1 ring-[#540d2e] text-[#540d2e] bg-primary/5 dark:bg-primary/20 font-medium"
                              : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-[#202020] hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {availableColors.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-normal block">
                    Select color:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color) => {
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleColorChange(color)}
                          className={`rounded-md px-3.5 py-1.5 text-xs font-normal transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? "border border-[#540d2e] ring-1 ring-[#540d2e] text-[#540d2e] bg-primary/5 dark:bg-primary/20 font-medium"
                              : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-[#202020] hover:border-gray-400"
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                          <span>{color}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="pt-1 flex gap-5 items-end">
                <div className="quantity-select">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-normal block">
                    Select Quantity:
                  </label>
                  <div className="inline-flex items-center border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#202020] h-9">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-9 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer text-sm"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-gray-900 dark:text-white select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-9 h-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors cursor-pointer text-sm"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    onClick={() => addToCart(product, selectedVariant, quantity)}
                    className="rounded px-6 py-2.5 text-xs sm:text-sm font-medium h-auto"
                  >
                    Add To Cart
                  </Button>
                  <Button
                    type="button"
                    onClick={() => quickBuy(product, selectedVariant, quantity)}
                    variant="dark"
                    className="rounded px-6 py-2.5 text-xs sm:text-sm font-medium h-auto bg-[#606060] hover:bg-[#4d4d4d]"
                  >
                    Quick Buy
                  </Button>
                </div>
              </div>

              {/* Amount Total */}
              <div className="pt-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <span>Product amount total: </span>
                <span className="font-bold text-gray-900 dark:text-white font-sans">Tk.{totalAmount}</span>
              </div>

              {/* Action Buttons & Call Widget */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  variant="whatsapp"
                  className="rounded-full px-5 py-2.5 text-xs sm:text-sm h-auto inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.974.53 1.954.811 2.796.811 3.183 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.769-5.769-5.769zm3.374 8.232c-.145.409-.834.782-1.159.832-.324.05-.738.082-2.386-.596-1.986-.816-3.266-2.836-3.366-2.969-.099-.133-.799-1.063-.799-2.028 0-.965.506-1.44.686-1.636.181-.196.395-.246.527-.246.132 0 .264.001.379.006.121.006.284-.046.444.337.165.396.564 1.375.614 1.475.05.1.083.216.017.348-.066.133-.1.216-.198.332-.099.117-.208.261-.297.351-.1.1-.205.209-.088.409.117.2 5.21 3.018 1.119 3.548.599.53 1.104.694 1.261.773.157.08.248.066.34-.04.091-.106.391-.455.496-.61.105-.155.209-.13.348-.08.139.05.882.416 1.033.491.151.075.252.112.289.176.037.064.037.373-.108.782zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.306C8.441 21.536 10.165 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                  <span>Order on WhatsApp</span>
                </Button>
                <a
                  href={`tel:${hotline.replace(/[^0-9+]/g, "")}`}
                  className="bg-[#f4f3f6] dark:bg-[#252224] hover:bg-[#eae8ef] dark:hover:bg-[#2e2b2d] rounded px-4 py-2 flex items-center gap-2.5 transition-colors no-underline"
                >
                  <Phone className="w-4 h-4 text-[#540d2e] dark:text-primary -rotate-12 fill-current" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                      Call for order
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">
                      {hotline}
                    </span>
                  </div>
                </a>
              </div>

              {/* Share */}
              <div className="flex items-center gap-2 pt-1 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-normal">Share on:</span>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="w-6 h-6 bg-[#3b5998] hover:opacity-90 text-white rounded-xs flex items-center justify-center transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                    className="w-6 h-6 bg-[#00acee] hover:opacity-90 text-white rounded-xs flex items-center justify-center transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="w-6 h-6 bg-[#0077b5] hover:opacity-90 text-white rounded-xs flex items-center justify-center transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(activeImage)}&description=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Pinterest"
                    className="w-6 h-6 bg-[#bd081c] hover:opacity-90 text-white rounded-xs flex items-center justify-center transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.151-1.499-.696-2.435-2.882-2.435-4.639 0-3.777 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="w-6 h-6 bg-[#25d366] hover:opacity-90 text-white rounded-xs flex items-center justify-center transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.974.53 1.954.811 2.796.811 3.183 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.769-5.769-5.769zm3.374 8.232c-.145.409-.834.782-1.159.832-.324.05-.738.082-2.386-.596-1.986-.816-3.266-2.836-3.366-2.969-.099-.133-.799-1.063-.799-2.028 0-.965.506-1.44.686-1.636.181-.196.395-.246.527-.246.132 0 .264.001.379.006.121.006.284-.046.444.337.165.396.564 1.375.614 1.475.05.1.083.216.017.348-.066.133-.1.216-.198.332-.099.117-.208.261-.297.351-.1.1-.205.209-.088.409.117.2 5.21 3.018 1.119 3.548.599.53 1.104.694 1.261.773.157.08.248.066.34-.04.091-.106.391-.455.496-.61.105-.155.209-.13.348-.08.139.05.882.416 1.033.491.151.075.252.112.289.176.037.064.037.373-.108.782zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.306C8.441 21.536 10.165 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 dark:text-gray-400 pt-1">
                <div className="flex items-center gap-1.5 p-2 bg-[#faf9f7] dark:bg-[#1a1815] rounded">
                  <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
                  <span>100% Genuine Certified</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-[#faf9f7] dark:bg-[#1a1815] rounded">
                  <RotateCcw className="w-4 h-4 text-[#540d2e] dark:text-primary" />
                  <span>7-Day Return Policy</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 2. Four Section Cards Below Product Main Card */}
      <section className="container space-y-6">
        {/* Card 1: Description Card */}
        <Card className="space-y-4">
          <CardHeader className="p-0 border-b border-gray-200 dark:border-gray-800 pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Description</CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <div
              className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none [&_table]:w-full [&_table]:border-collapse [&_table]:my-3 [&_td]:border [&_td]:border-gray-200 dark:[&_td]:border-gray-700 [&_td]:p-2.5 [&_th]:border [&_th]:border-gray-200 dark:[&_th]:border-gray-700 [&_th]:p-2.5 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-1"
              dangerouslySetInnerHTML={{
                __html: product.description || "<p>No description provided for this product.</p>",
              }}
            />
          </CardContent>
        </Card>

        {/* Card 2: Reviews & Merchant Rating in One Card */}
        <Card className="space-y-6">
          <CardHeader className="p-0 border-b border-gray-200 dark:border-gray-800 pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#540d2e] dark:text-primary" />
              <span>Reviews &amp; Merchant Rating</span>
            </CardTitle>
            <span className="text-xs text-gray-500 font-medium">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </span>
          </CardHeader>

          <CardContent className="pt-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Merchant Rating Column (4 cols) */}
              <div className="lg:col-span-4 bg-[#faf9f7] dark:bg-[#202020] rounded-md p-4 sm:p-5 border border-gray-200 dark:border-gray-700 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/30 flex items-center justify-center text-[#540d2e] dark:text-primary shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                      Merchant Profile
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {merchantInfo?.company_name || merchantInfo?.name || product.brand || "Authorized Merchant"}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-[#16a34a] font-medium mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Seller</span>
                    </div>
                  </div>
                </div>

                {/* Rating Score Breakdown */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-3xl font-extrabold text-[#540d2e] dark:text-primary">
                    {averageRating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= Math.round(averageRating)
                              ? "fill-current text-amber-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      Based on {reviews.length} customer ratings
                    </p>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-center text-xs">
                  <div className="p-2 bg-white dark:bg-[#181818] rounded">
                    <span className="font-bold text-gray-900 dark:text-white block">98%</span>
                    <span className="text-[10px] text-gray-500">Positive</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-[#181818] rounded">
                    <span className="font-bold text-gray-900 dark:text-white block">100%</span>
                    <span className="text-[10px] text-gray-500">On-Time</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-[#181818] rounded">
                    <span className="font-bold text-gray-900 dark:text-white block">96%</span>
                    <span className="text-[10px] text-gray-500">Response</span>
                  </div>
                </div>
              </div>

              {/* Customer Reviews Listing (8 cols) */}
              <div className="lg:col-span-8 space-y-3">
                {reviews.length === 0 ? (
                  <div className="p-8 text-center bg-gray-50 dark:bg-[#202020] rounded-md text-gray-500 dark:text-gray-400 text-xs">
                    No reviews available yet for this product.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {reviews.map((r) => (
                      <div key={r.id} className="py-3 first:pt-0 last:pb-0 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-[#540d2e] dark:text-primary font-bold text-[11px] flex items-center justify-center">
                              #{r.user_id}
                            </div>
                            <span className="font-bold text-xs text-gray-900 dark:text-white">
                              Customer #{r.user_id}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="flex text-amber-500">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= Math.round(r.rating)
                                      ? "fill-current text-amber-500"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[11px] text-gray-500 font-medium">({r.rating})</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed pl-8">{r.review}</p>
                        <div className="text-[10px] text-gray-400 pl-8">{r.created_at}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Questions Card */}
        <Card className="space-y-4">
          <CardHeader className="p-0 border-b border-gray-200 dark:border-gray-800 pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#540d2e] dark:text-primary" />
              <span>Questions About This Product</span>
            </CardTitle>
            <span className="text-xs text-gray-500 font-medium">
              {questions.length} {questions.length === 1 ? "Question" : "Questions"}
            </span>
          </CardHeader>

          <CardContent className="pt-1">
            {questions.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 dark:bg-[#202020] rounded-md text-gray-500 dark:text-gray-400 text-xs">
                No questions have been asked yet for this product.
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-800 space-y-3">
                {questions.map((q) => (
                  <div key={q.id} className="pt-3 first:pt-0 space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="bg-primary text-white font-bold px-1.5 py-0.5 rounded-xs text-[10px] mt-0.5">
                        Q
                      </span>
                      <p className="font-semibold text-gray-900 dark:text-white flex-1">{q.question}</p>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">{q.created_at}</span>
                    </div>
                    {q.answer ? (
                      <div className="flex items-start gap-2 pl-6 text-gray-700 dark:text-gray-300">
                        <span className="bg-[#16a34a] text-white font-bold px-1.5 py-0.5 rounded-xs text-[10px] mt-0.5">
                          A
                        </span>
                        <p className="text-[11px] leading-relaxed flex-1">{q.answer}</p>
                      </div>
                    ) : (
                      <p className="pl-6 text-[11px] text-gray-400 italic">Pending seller response.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card 4: Related Products Card */}
        <Card className="space-y-4">
          <CardHeader className="p-0 border-b border-gray-200 dark:border-gray-800 pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              Related Products
            </CardTitle>
            <span className="text-xs text-gray-500 font-medium">{suggestions.length} items</span>
          </CardHeader>

          <CardContent className="pt-1">
            {suggestions.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 dark:bg-[#202020] rounded-md text-gray-500 dark:text-gray-400 text-xs">
                No related products found.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {suggestions.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
