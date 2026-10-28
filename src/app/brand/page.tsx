import { ProductCard } from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { ArrowRight, Award } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Official Brand Partners | WellSell BD',
  description: 'Shop genuine imported brands: Victoria Secret, Origins, Puritans Pride, Spring Valley, COSRX, Casio, and more with lab batch verifications.',
};

export default function BrandPage() {
  const brandList = [
    { name: "Victoria's Secret", origin: 'USA', desc: 'Luxury fragrance mists, body lotions, and Eau de Parfum.' },
    { name: 'Origins', origin: 'USA', desc: 'Active charcoal masks, botanical cleansers, and skin hydrators.' },
    { name: "Puritan's Pride", origin: 'USA', desc: 'High-purity dietary vitamins, zinc, and immunity supplements.' },
    { name: 'Spring Valley', origin: 'USA', desc: 'Essential calcium, magnesium, zinc, and vitamin complexes.' },
    { name: 'COSRX', origin: 'Korea', desc: 'Acne pimple master patches, snail mucin, and BHA clarifiers.' },
    { name: 'Nature Republic', origin: 'Korea', desc: 'Green derma mild cica soothing gels and pure botanicals.' },
    { name: 'Casio', origin: 'Japan', desc: 'Enticer series analog and gold dial watches with mineral glass.' },
    { name: 'PROWHITE', origin: 'Germany', desc: 'Precision textile testing equipment and laboratory instruments.' }
  ];

  return (
    <div className="w-full pb-16 pt-4 sm:pt-6">
      <div className="container space-y-8">
        {/* Breadcrumb / Title Bar */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-primary" />
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
              Official Brand Partners
            </h1>
          </div>
          <p className="text-xs text-[#736C62] dark:text-[#9E968B]">
            Every brand represented on Wellsell BD is authentic, directly imported, and verified with laboratory batch numbers.
          </p>
        </Card>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {brandList.map((b) => (
            <Link
              key={b.name}
              href="/category/all"
              className="block"
            >
              <Card className="p-5 hover:ring-2 hover:ring-[#BA2D1D] transition-all cursor-pointer flex flex-col justify-between h-full">
                <div>
                  <Badge variant="discount" className="text-[10px] font-mono uppercase tracking-widest mb-2">
                    {b.origin} IMPORT
                  </Badge>
                  <h3 className="font-serif font-bold text-base text-[#1F1D1A] dark:text-[#EDE7DE] mt-1 mb-2">
                    {b.name}
                  </h3>
                  <p className="text-xs text-[#736C62] dark:text-[#9E968B] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs text-primary font-semibold border-t border-[#F0EDE8] dark:border-[#2A2A2A] mt-4">
                  <span>View Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Featured Brand Products */}
        <Card className="p-6 space-y-4">
          <h2 className="font-serif font-bold text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
            Featured Brand Selections
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {MOCK_PRODUCTS.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} border />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
