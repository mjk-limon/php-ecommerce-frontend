import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { FloatingCart } from '@/components/FloatingCart';
import { InvoiceModal } from '@/components/InvoiceModal';
import { TrackOrderModal } from '@/components/TrackOrderModal';
import { AuthModal } from '@/components/AuthModal';
import { ToastContainer } from '@/components/ToastContainer';
import { getServerCategories } from '@/services/serverApi';

export const metadata: Metadata = {
  title: 'WellSell BD - Health, Beauty & Wellness Online Store',
  description: 'Shop 100% authentic imported skincare, fragrances, health vitamins, and beauty products with cash on delivery and fast nationwide delivery across Bangladesh.',
  keywords: 'WellSell BD, online shopping Bangladesh, beauty products, skincare, Victoria Secret perfume, health vitamins, Korean cosmetics',
  metadataBase: new URL('https://wellsellbd.com'),
  alternates: {
    canonical: 'https://wellsellbd.com',
  },
  openGraph: {
    type: 'website',
    siteName: 'WellSell BD',
    title: 'WellSell BD - Health, Beauty & Wellness Online Store',
    description: 'Shop 100% authentic imported skincare, fragrances, health vitamins, and beauty products with cash on delivery and fast delivery across Bangladesh.',
    url: 'https://wellsellbd.com',
    images: ['/src/assets/images/hero_beauty_skincare_banner_1792385518854.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WellSell BD - Health, Beauty & Wellness Online Store',
    description: 'Shop 100% authentic imported skincare, fragrances, health vitamins, and beauty products with cash on delivery across Bangladesh.',
    images: ['/src/assets/images/hero_beauty_skincare_banner_1792385518854.jpg'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getServerCategories();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "WellSell BD",
              "image": "https://wellsellbd.com/images/logo.png",
              "telephone": "+8801894084242",
              "email": "info@wellsellbd.com",
              "url": "https://wellsellbd.com",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Sector 3, Uttara",
                "addressLocality": "Dhaka",
                "postalCode": "1230",
                "addressCountry": "BD"
              },
              "paymentAccepted": "Cash, Credit Card, bKash, Nagad, Rocket",
              "currenciesAccepted": "BDT"
            })
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-[#121212] text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors">
        <AppProvider>
          <Header categories={categories} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <CheckoutModal />
          <FloatingCart />
          <InvoiceModal />
          <TrackOrderModal />
          <AuthModal />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
