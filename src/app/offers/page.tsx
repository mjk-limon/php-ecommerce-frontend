import { ProductCard } from '@/components/ProductCard';
import { Card } from '@/components/ui/card';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { Percent } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hot Offers & Discounts | WellSell BD',
  description: 'Limited-time discounts on luxury fragrances, skincare, and health vitamins at WellSell BD. Authentic imports with cash on delivery.',
};

export default function OffersPage() {
  const discountedProducts = MOCK_PRODUCTS.filter((p) => p.discount && p.discount > 0);

  return (
    <div className="w-full pb-16 pt-4 sm:pt-6">
      <div className="container space-y-8">
        {/* Banner Card */}
        <Card className="p-6 bg-gradient-to-r from-[#BA2D1D]/10 via-transparent to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-5 h-5 text-primary" />
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              Special Offers &amp; Flash Sales
            </h1>
          </div>
          <p className="text-xs text-[#736C62] dark:text-[#9E968B]">
            Limited stock discounted items from direct USA and Korean shipments. Use coupon <strong className="text-primary">WELLSELL10</strong> at checkout for an extra 10% off.
          </p>
        </Card>

        {/* Discounted Products Grid */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0EDE8] dark:border-[#2A2A2A] pb-3">
            <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
              Discounted Products ({discountedProducts.length} items)
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {discountedProducts.map((p) => (
              <ProductCard key={p.id} product={p} border />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
