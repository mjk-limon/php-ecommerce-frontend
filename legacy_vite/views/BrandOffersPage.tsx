import { ArrowRight, Award, Percent } from 'lucide-react';
import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../data/mockData';

interface BrandOffersPageProps {
  mode: 'brand' | 'offers';
}

export const BrandOffersPage: React.FC<BrandOffersPageProps> = ({ mode }) => {
  const { navigateToCategory, navigateToProduct } = useApp();

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

  // Hot offers products (items with discount)
  const discountedProducts = MOCK_PRODUCTS.filter((p) => p.discount && p.discount > 0);

  if (mode === 'brand') {
    return (
      <div className="w-full pb-16 pt-4 sm:pt-6">
        <div className="container space-y-8">
          <div className="section-card p-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-primary" />
              <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1D1A] dark:text-[#EDE7DE]">
                Official Brand Partners
              </h1>
            </div>
            <p className="text-xs text-[#736C62] dark:text-[#9E968B]">
              Every brand represented on Wellsell BD is authentic, directly imported, and verified with laboratory batch numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {brandList.map((b) => (
              <div
                key={b.name}
                onClick={() => navigateToCategory('')}
                className="p-5 section-card hover:ring-2 hover:ring-[#BA2D1D] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                    {b.origin} IMPORT
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#1F1D1A] dark:text-[#EDE7DE] mt-1 mb-2">
                    {b.name}
                  </h3>
                  <p className="text-xs text-[#736C62] dark:text-[#9E968B] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F4EFEA] dark:border-[#272420] mt-4 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Explore Brand</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Hot offers mode
  return (
    <div className="w-full pb-16 pt-4 sm:pt-6">
      <div className="container space-y-8">
        <div className="bg-gradient-to-r from-[#BA2D1D] to-[#8E1C0F] text-white rounded-sm p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="max-w-lg space-y-2 relative z-10">
            <span className="inline-block text-[10px] uppercase font-mono tracking-widest bg-white/20 px-2 py-0.5 rounded-xs">
              LIMITED TIME FLASH SALES
            </span>
            <h1 className="font-serif font-black text-2xl sm:text-3xl leading-tight">
              Exclusive Health & Fragrance Hot Offers
            </h1>
            <p className="text-xs text-white/90">
              Save up to 35% on authentic imported skincare, Eau De Parfum sprays, and daily vitality vitamins.
            </p>
          </div>
          <Percent className="absolute -right-6 -bottom-6 w-44 h-44 text-white/10 stroke-1" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-lg text-[#1F1D1A] dark:text-[#EDE7DE]">
              Discounted Products ({discountedProducts.length})
            </h2>
            <span className="text-xs text-primary font-mono font-semibold">
              Flash Sales Campaign
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {discountedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
