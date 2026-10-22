'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_PRODUCTS } from '../data/mockData';
import { api } from '../services/api';
import { CartItem, Product, User } from '../types';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  // Theme & Currency
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currency: string;
  setCurrency: (c: string) => void;
  formatPrice: (amountInTk: number) => string;

  // Routing navigation
  activeRoute: 'home' | 'product-details' | 'category' | 'track-order' | 'brand' | 'offers' | 'cart' | 'login' | 'register' | 'checkout';
  setActiveRoute: (route: 'home' | 'product-details' | 'category' | 'track-order' | 'brand' | 'offers' | 'cart' | 'login' | 'register' | 'checkout') => void;
  activeProductSlug: string;
  setActiveProductSlug: (slug: string) => void;
  activeCategorySlug: string | null;
  setActiveCategorySlug: (slug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  navigateToProduct: (slugOrId: string | number) => void;
  navigateToCategory: (slug: string) => void;
  navigateToHome: () => void;
  navigateToCart: () => void;
  navigateToLogin: () => void;
  navigateToRegister: () => void;
  navigateToCheckout: () => void;

  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (data: {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state?: string;
    country?: string;
    postal_code?: string;
  }) => Promise<boolean>;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: { size?: string; color?: string; openDrawer?: boolean }) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  cartTotalDiscount: number;

  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: (open: boolean) => void;
  activeInvoiceNumber: string | null;
  openInvoice: (invoiceNo: string) => void;
  isTrackModalOpen: boolean;
  setIsTrackModalOpen: (open: boolean) => void;

  // Quick Buy
  quickBuy: (product: Product, quantity?: number) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  // Theme initialization
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wellsell_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('wellsell_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Currency (Tk / USD)
  const [currency, setCurrency] = useState<string>('Tk.');
  const formatPrice = (amountInTk: number) => {
    if (currency === '$') {
      return `$${(amountInTk / 120).toFixed(2)}`;
    }
    return `Tk. ${amountInTk.toLocaleString()}`;
  };

  // Navigation state
  const [activeRoute, setActiveRoute] = useState<'home' | 'product-details' | 'category' | 'track-order' | 'brand' | 'offers' | 'cart' | 'login' | 'register' | 'checkout'>('home');
  const [activeProductSlug, setActiveProductSlug] = useState<string>('victorias-secret-very-sexy-eau-de-parfum-100ml');
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigateToProduct = (slugOrId: string | number) => {
    const prod = MOCK_PRODUCTS.find((p) => p.slug === String(slugOrId) || p.id === Number(slugOrId));
    const targetSlug = prod ? prod.slug : String(slugOrId);
    setActiveProductSlug(targetSlug);
    setActiveRoute('product-details');
    router.push(`/product/${targetSlug}`);
  };

  const navigateToCategory = (slug: string) => {
    setActiveCategorySlug(slug);
    setActiveRoute('category');
    if (slug) {
      router.push(`/category/${slug}`);
    } else {
      router.push('/category/all');
    }
  };

  const navigateToHome = () => {
    setActiveRoute('home');
    setActiveCategorySlug(null);
    setSearchQuery('');
    router.push('/');
  };

  const navigateToCart = () => {
    setActiveRoute('cart');
    router.push('/cart');
  };

  const navigateToLogin = () => {
    setActiveRoute('login');
    router.push('/login');
  };

  const navigateToRegister = () => {
    setActiveRoute('register');
    router.push('/register');
  };

  const navigateToCheckout = () => {
    setActiveRoute('checkout');
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(false);
    router.push('/checkout');
  };

  // Auth state
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wellsell_user_v2');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('wellsell_token_v2');
    }
    return null;
  });

  const login = async (username: string, pass: string): Promise<boolean> => {
    try {
      const res = await api.login({ username, password: pass });
      if (res.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('wellsell_token_v2', res.data.token);
        localStorage.setItem('wellsell_user_v2', JSON.stringify(res.data.user));
        showToast(`Welcome back, ${res.data.user.first_name || 'Member'}!`, 'success');
        setIsAuthModalOpen(false);
        return true;
      }
    } catch {
      showToast('Login failed. Please check credentials.', 'error');
    }
    return false;
  };

  const register = async (data: {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state?: string;
    country?: string;
    postal_code?: string;
  }): Promise<boolean> => {
    try {
      const res = await api.register(data);
      if (res.success) {
        const auth = await api.login({ username: data.username, password: data.password });
        setUser(auth.data.user);
        setToken(auth.data.token);
        localStorage.setItem('wellsell_token_v2', auth.data.token);
        localStorage.setItem('wellsell_user_v2', JSON.stringify(auth.data.user));
        showToast('Account registered successfully!', 'success');
        setIsAuthModalOpen(false);
        return true;
      }
    } catch {
      showToast('Registration encountered an issue.', 'error');
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('wellsell_token_v2');
    localStorage.removeItem('wellsell_user_v2');
    showToast('Logged out of session.', 'info');
  };

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wellsell_cart_v2');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('wellsell_cart_v2', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1, options?: { size?: string; color?: string; openDrawer?: boolean }) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selected_size: options?.size,
          selected_color: options?.color
        }
      ];
    });

    showToast(`Added "${product.name.slice(0, 24)}..." to cart`, 'success');
    if (options?.openDrawer !== false) {
      setIsCartDrawerOpen(true);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartTotalDiscount = cart.reduce(
    (acc, item) =>
      acc + (item.product.old_price ? (item.product.old_price - item.product.price) * item.quantity : 0),
    0
  );

  // Quick Buy opens the compact delivery checkout directly.
  const quickBuy = (product: Product, quantity: number = 1) => {
    setCart([{ product, quantity, variant_id: product.variants?.[0]?.id }]);
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wellsell_wishlist_v2');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('wellsell_wishlist_v2', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      }
      showToast('Saved to wishlist', 'success');
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  // Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);
  const [activeInvoiceNumber, setActiveInvoiceNumber] = useState<string | null>(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState<boolean>(false);

  const openInvoice = (invoiceNo: string) => {
    setActiveInvoiceNumber(invoiceNo);
    router.push(`/invoice/${invoiceNo}`);
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currency,
        setCurrency,
        formatPrice,
        activeRoute,
        setActiveRoute,
        activeProductSlug,
        setActiveProductSlug,
        activeCategorySlug,
        setActiveCategorySlug,
        searchQuery,
        setSearchQuery,
        navigateToProduct,
        navigateToCategory,
        navigateToHome,
        navigateToCart,
        navigateToLogin,
        navigateToRegister,
        navigateToCheckout,
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        cartTotalDiscount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        activeInvoiceNumber,
        openInvoice,
        isTrackModalOpen,
        setIsTrackModalOpen,
        quickBuy,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
