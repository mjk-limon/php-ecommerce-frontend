"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { api } from "../services/api";

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
  login: (username: string, pass: string) => Promise<boolean>;
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

  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Non-Cart Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: "login" | "register";
  setAuthModalTab: (tab: "login" | "register") => void;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: (open: boolean) => void;
  activeInvoiceNumber: string | null;
  openInvoice: (invoiceNo: string) => void;
  isTrackModalOpen: boolean;
  setIsTrackModalOpen: (open: boolean) => void;

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
    const discountedPrice = amountInTk * (1 - discountPercentage / 100);

    if (currency === "$") {
      return `$${(discountedPrice / 120).toFixed(2)}`;
    }

    return `Tk. ${Math.round(discountedPrice).toLocaleString()}`;
  };

  const [searchQuery, setSearchQuery] = useState<string>("");

  // Auth state
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("wellsell_user_v2");
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("wellsell_token_v2");
    }
    return null;
  });

  const login = async (username: string, pass: string): Promise<boolean> => {
    try {
      const res = await api.login({ username, password: pass });
      if (res.success && res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("wellsell_token_v2", res.data.token);
        localStorage.setItem("wellsell_user_v2", JSON.stringify(res.data.user));
        showToast(`Welcome back, ${res.data.user.first_name || "Member"}!`, "success");
        setIsAuthModalOpen(false);
        return true;
      }
    } catch {
      showToast("Login failed. Please check credentials.", "error");
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
        if (auth.success && auth.data) {
          setUser(auth.data.user);
          setToken(auth.data.token);
          localStorage.setItem("wellsell_token_v2", auth.data.token);
          localStorage.setItem("wellsell_user_v2", JSON.stringify(auth.data.user));
        }
        showToast("Registration successful! Welcome to WellSell BD.", "success");
        setIsAuthModalOpen(false);
        return true;
      }
    } catch {
      showToast("Registration failed. Please verify details.", "error");
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("wellsell_token_v2");
      localStorage.removeItem("wellsell_user_v2");
    }
    showToast("You have been signed out.", "info");
  };

  // Wishlist
  const [wishlist, setWishlist] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("wellsell_wishlist_v2");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);
  const [activeInvoiceNumber, setActiveInvoiceNumber] = useState<string | null>(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState<boolean>(false);

  const openInvoice = (invoiceNo: string) => {
    setActiveInvoiceNumber(invoiceNo);
    setIsInvoiceModalOpen(true);
  };

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
        login,
        register,
        logout,
        wishlist,
        toggleWishlist,
        isInWishlist,
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
