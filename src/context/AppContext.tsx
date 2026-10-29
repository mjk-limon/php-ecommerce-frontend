"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product, ProductVariant, User } from "../types";

interface ToastMessage {
  id: string;
  type: "success" | "info" | "error";
  message: string;
}

interface AppContextType {
  // Theme & Currency
  theme: "light" | "dark";
  toggleTheme: () => void;
  currency: string;
  setCurrency: (c: string) => void;
  formatPrice: (amountInTk: number, discountPercentage?: number) => string;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number, options?: { openDrawer?: boolean }) => void;
  removeFromCart: (productId: number, variantId: number) => void;
  updateQuantity: (productId: number, variantId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartUnitTotal: number;
  cartTotalDiscount: number;
  cartSubtotal: number;

  // Quick Buy
  quickBuy: (product: Product, variant: ProductVariant, quantity?: number) => void;

  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme initialization
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wellsell_theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("wellsell_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Currency (Tk / USD)
  const [currency, setCurrency] = useState<string>("Tk.");
  const formatPrice = (amountInTk: number, discountPercentage: number = 0) => {
    const dicountedPrice = amountInTk * (1 - discountPercentage / 100);

    if (currency === "$") {
      return `$${(dicountedPrice / 120).toFixed(2)}`;
    }

    return `Tk. ${dicountedPrice.toLocaleString()}`;
  };

  const [searchQuery, setSearchQuery] = useState<string>("");

  // Auth state
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wellsell_user_v2");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("wellsell_token_v2");
    }
    return null;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wellsell_cart_v2");

      if (saved) {
        setCart(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wellsell_cart_v2", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product,
    variant: ProductVariant,
    quantity: number = 1,
    options?: { openDrawer?: boolean },
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id && item.variant.id === variant.id);

      if (existingIndex > -1) {
        const next = [...prev];

        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };

        return next;
      }

      const unitTotal = quantity * variant.price;
      const unitTotalDiscountAmount = unitTotal * (product.discount / 100);
      const totalPrice = unitTotal - unitTotalDiscountAmount;

      return [
        ...prev,
        {
          product,
          variant,
          quantity,
          unit_price: variant.price,
          unit_total: unitTotal,
          discount_total: unitTotalDiscountAmount,
          total_price: totalPrice,
        },
      ];
    });

    showToast(`Added "${product.name.slice(0, 24)}..." to cart`, "success");

    if (options?.openDrawer !== false) {
      setIsCartDrawerOpen(true);
    }
  };

  // Quick Buy opens the compact delivery checkout directly.
  const quickBuy = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const unitTotal = quantity * variant.price;
    const unitTotalDiscountAmount = unitTotal * (product.discount / 100);
    const totalPrice = unitTotal - unitTotalDiscountAmount;

    setCart([
      {
        product,
        quantity,
        variant,
        unit_price: variant.price,
        unit_total: unitTotal,
        discount_total: unitTotalDiscountAmount,
        total_price: totalPrice,
      },
    ]);

    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const removeFromCart = (productId: number, variantId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId && item.variant.id !== variantId));

    showToast("Item removed from cart", "info");
  };

  const updateQuantity = (productId: number, variantId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variant.id === variantId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartUnitTotal = cart.reduce((acc, item) => acc + item.unit_total, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.total_price, 0);
  const cartTotalDiscount = cart.reduce((acc, item) => acc + item.discount_total, 0);

  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wellsell_wishlist_v2");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("wellsell_wishlist_v2", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from wishlist", "info");
        return prev.filter((id) => id !== productId);
      }
      showToast("Saved to wishlist", "success");
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  // Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
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
        searchQuery,
        setSearchQuery,
        user,
        token,
        isAuthenticated: !!token,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalCount,
        cartUnitTotal,
        cartTotalDiscount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        quickBuy,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
