import React from 'react';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { InvoiceModal } from './components/InvoiceModal';
import { ToastContainer } from './components/ToastContainer';
import { TrackOrderModal } from './components/TrackOrderModal';
import { AppProvider, useApp } from './context/AppContext';
import { AuthPage } from './pages/AuthPage';
import { BrandOffersPage } from './pages/BrandOffersPage';
import { CartPage } from './pages/CartPage';
import { CategoryPage } from './pages/CategoryPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

const MainContent: React.FC = () => {
  const { activeRoute } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121212] text-[#1F1D1A] dark:text-[#EDE7DE] transition-colors">
      <Header />

      <main className="flex-1">
        {activeRoute === 'home' && <HomePage />}
        {activeRoute === 'product-details' && <ProductDetailsPage />}
        {activeRoute === 'category' && <CategoryPage />}
        {activeRoute === 'brand' && <BrandOffersPage mode="brand" />}
        {activeRoute === 'offers' && <BrandOffersPage mode="offers" />}
        {activeRoute === 'cart' && <CartPage />}
        {activeRoute === 'login' && <AuthPage initialMode="login" />}
        {activeRoute === 'register' && <AuthPage initialMode="register" />}
      </main>

      <Footer />

      {/* Global Modals for Quick Interaction */}
      <CartDrawer />
      <CheckoutModal />
      <InvoiceModal />
      <TrackOrderModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
