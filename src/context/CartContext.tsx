"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { CartItem, Product, ProductVariant, ShippingLocation, ShippingMethod } from "../types";
import { useApp } from "./AppContext";

export function calculateShipping(
  location?: ShippingLocation | null,
  methodId?: number,
): { cost: number; estimateTime: string } {
  if (methodId === 7) {
    return { cost: 0, estimateTime: "Free / No Charge" };
  }
  if (!location) {
    return { cost: 60, estimateTime: "24-48 Hours" };
  }
  if (location.cost_times && location.cost_times.length > 0) {
    const match = methodId
      ? location.cost_times.find((c) => c.method_id === methodId)
      : location.cost_times[0];
    const ct = match || location.cost_times[0];
    if (ct && typeof ct.cost === "number") {
      return {
        cost: Number(ct.cost),
        estimateTime: ct.estimate_time || "2-4 Days",
      };
    }
  }
  const locName = (location.location || "").toLowerCase();
  const isInsideDhaka = location.id === 14 || locName.includes("inside");
  return {
    cost: isInsideDhaka ? 60 : 130,
    estimateTime: isInsideDhaka ? "24-48 Hours" : "2-4 Days",
  };
}

export interface CartContextType {
  // Cart items & operations
  cart: CartItem[];
  isCartLoaded: boolean;
  addToCart: (
    product: Product,
    variant: ProductVariant,
    quantity?: number,
    options?: { openDrawer?: boolean },
  ) => void;
  removeFromCart: (productId: number, variantId: number) => void;
  updateQuantity: (productId: number, variantId: number, quantity: number) => void;
  clearCart: () => void;
  quickBuy: (product: Product, variant: ProductVariant, quantity?: number) => void;

  // Cart summary calculations
  cartTotalCount: number;
  cartUnitTotal: number;
  cartTotalDiscount: number;
  cartSubtotal: number;

  // Drawers and Modals
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;

  // Shipping locations and methods from API
  locations: ShippingLocation[];
  methods: ShippingMethod[];
  selectedLocationId: number;
  setSelectedLocationId: (id: number) => void;
  selectedLocation: ShippingLocation | undefined;
  selectedMethodId: number;
  setSelectedMethodId: (id: number) => void;
  selectedMethod: ShippingMethod | undefined;
  shippingCost: number;
  shippingEstimateTime: string;
  isLoadingShipping: boolean;
  refreshShipping: () => Promise<void>;
  calculateShippingCost: (locationId?: number, methodId?: number) => { cost: number; estimateTime: string };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useApp();

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("wellsell_cart_v2");
        if (saved) {
          setCart(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load cart from localStorage", e);
      } finally {
        setIsCartLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isCartLoaded && typeof window !== "undefined") {
      localStorage.setItem("wellsell_cart_v2", JSON.stringify(cart));
    }
  }, [cart, isCartLoaded]);

  // Modals & Drawer State
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);

  // Shipping Data State
  const [locations, setLocations] = useState<ShippingLocation[]>([]);
  const [methods, setMethods] = useState<ShippingMethod[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<number>(14); // Default: Dhaka Inside City (id: 14)
  const [selectedMethodId, setSelectedMethodId] = useState<number>(1); // Default: RedX (id: 1)
  const [isLoadingShipping, setIsLoadingShipping] = useState<boolean>(false);

  const refreshShipping = useCallback(async () => {
    setIsLoadingShipping(true);
    try {
      const res = await api.getShipping();
      if (res.success && res.data) {
        if (Array.isArray(res.data.locations) && res.data.locations.length > 0) {
          setLocations(res.data.locations);
          // If current selectedLocationId is not in locations, find Dhaka (Inside City) or first
          setSelectedLocationId((prevId) => {
            const hasPrev = res.data.locations.some((l) => l.id === prevId);
            if (hasPrev) return prevId;
            const dhakaInside = res.data.locations.find(
              (l) => l.id === 14 || (l.location || "").toLowerCase().includes("inside"),
            );
            return dhakaInside ? dhakaInside.id : res.data.locations[0].id;
          });
        }
        if (Array.isArray(res.data.methods) && res.data.methods.length > 0) {
          setMethods(res.data.methods);
          setSelectedMethodId((prevId) => {
            const hasPrev = res.data.methods.some((m) => m.id === prevId);
            return hasPrev ? prevId : res.data.methods[0].id;
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch shipping configuration", error);
    } finally {
      setIsLoadingShipping(false);
    }
  }, []);

  useEffect(() => {
    refreshShipping();
  }, [refreshShipping]);

  // Derived selected location and method
  const selectedLocation = useMemo(
    () => locations.find((l) => l.id === selectedLocationId) || locations[0],
    [locations, selectedLocationId],
  );

  const selectedMethod = useMemo(
    () => methods.find((m) => m.id === selectedMethodId) || methods[0],
    [methods, selectedMethodId],
  );

  const { cost: shippingCost, estimateTime: shippingEstimateTime } = useMemo(
    () => calculateShipping(selectedLocation, selectedMethodId),
    [selectedLocation, selectedMethodId],
  );

  const calculateShippingCost = useCallback(
    (locationId?: number, methodId?: number) => {
      const loc = locations.find((l) => l.id === (locationId ?? selectedLocationId)) || selectedLocation;
      const mId = methodId ?? selectedMethodId;
      return calculateShipping(loc, mId);
    },
    [locations, selectedLocationId, selectedMethodId, selectedLocation],
  );

  // Cart Actions
  const addToCart = (
    product: Product,
    variant: ProductVariant,
    quantity: number = 1,
    options?: { openDrawer?: boolean },
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variant.id === variant.id,
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const existing = next[existingIndex];
        const newQty = existing.quantity + quantity;
        const unitTotal = newQty * variant.price;
        const discountAmount = unitTotal * ((product.discount || 0) / 100);
        const totalPrice = unitTotal - discountAmount;

        next[existingIndex] = {
          ...existing,
          quantity: newQty,
          unit_price: variant.price,
          unit_total: unitTotal,
          discount_total: discountAmount,
          total_price: totalPrice,
        };

        return next;
      }

      const unitTotal = quantity * variant.price;
      const discountAmount = unitTotal * ((product.discount || 0) / 100);
      const totalPrice = unitTotal - discountAmount;

      return [
        ...prev,
        {
          product,
          variant,
          quantity,
          unit_price: variant.price,
          unit_total: unitTotal,
          discount_total: discountAmount,
          total_price: totalPrice,
        },
      ];
    });

    showToast(`Added "${product.name.slice(0, 24)}..." to cart`, "success");

    if (options?.openDrawer !== false) {
      setIsCartDrawerOpen(true);
    }
  };

  const quickBuy = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const unitTotal = quantity * variant.price;
    const discountAmount = unitTotal * ((product.discount || 0) / 100);
    const totalPrice = unitTotal - discountAmount;

    setCart([
      {
        product,
        quantity,
        variant,
        unit_price: variant.price,
        unit_total: unitTotal,
        discount_total: discountAmount,
        total_price: totalPrice,
      },
    ]);

    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const removeFromCart = (productId: number, variantId: number) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.variant.id === variantId)),
    );
    showToast("Item removed from cart", "info");
  };

  const updateQuantity = (productId: number, variantId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.variant.id === variantId) {
          const unitTotal = quantity * item.variant.price;
          const discountAmount = unitTotal * ((item.product.discount || 0) / 100);
          const totalPrice = unitTotal - discountAmount;
          return {
            ...item,
            quantity,
            unit_total: unitTotal,
            discount_total: discountAmount,
            total_price: totalPrice,
          };
        }
        return item;
      }),
    );
  };

  const clearCart = () => setCart([]);

  // Calculated totals
  const cartTotalCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartUnitTotal = useMemo(() => cart.reduce((acc, item) => acc + item.unit_total, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + item.total_price, 0), [cart]);
  const cartTotalDiscount = useMemo(() => cart.reduce((acc, item) => acc + item.discount_total, 0), [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        quickBuy,
        cartTotalCount,
        cartUnitTotal,
        cartTotalDiscount,
        cartSubtotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        locations,
        methods,
        selectedLocationId,
        setSelectedLocationId,
        selectedLocation,
        selectedMethodId,
        setSelectedMethodId,
        selectedMethod,
        shippingCost,
        shippingEstimateTime,
        isLoadingShipping,
        refreshShipping,
        calculateShippingCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
