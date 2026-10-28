import {
  MOCK_CATEGORIES,
  MOCK_PAYMENT_METHODS,
  MOCK_PRODUCTS,
  MOCK_QUESTIONS,
  MOCK_REVIEWS,
  MOCK_SHIPPING_LOCATIONS,
  MOCK_SHIPPING_METHODS,
  MOCK_USER,
  STORE_CONTACT,
} from "../data/mockData";

import {
  Category,
  OrderCreatePayload,
  OrderInvoice,
  PaymentMethod,
  Product,
  ProductQuestion,
  ProductReview,
  ShippingLocation,
  ShippingMethod,
  User,
} from "../types";
import { getAssetUrl } from "@/lib/assetHelper";

const ORDERS_STORAGE_KEY = "wellsell_orders_v2";
const REVIEWS_STORAGE_KEY = "wellsell_reviews_v2";
const QUESTIONS_STORAGE_KEY = "wellsell_questions_v2";
const USER_STORAGE_KEY = "wellsell_user_v2";

const API_BASE = (process.env.ECOM_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ilmcomm-v2.services.my').replace(/\/$/, "");
const API_APP_KEY = process.env.ECOM_APP_KEY || process.env.NEXT_PUBLIC_APP_KEY || 'abcd';

async function requestApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const [endpoint, query] = path.split("&", 2);
  const url = new URL(
    `/api/proxy/v1/${endpoint}${query ? `?${query}` : ""}`,
    window.location.origin,
  );
  url.searchParams.set("app_key", API_APP_KEY);

  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });

  const result = await response.json();

  if (!response.ok || result?.success === false) {
    throw new Error(result?.error || `Request failed (${response.status})`);
  }

  return result as T;
}

function normalizeProduct(raw: any): Product {
  const variants = Array.isArray(raw.variants) ? raw.variants : [];
  const firstVariant = variants[0];
  let images: any = raw.images;

  try {
    if (typeof images === "string") images = JSON.parse(images);
  } catch {
    images = [];
  }

  const sourceImage =
    raw.image ||
    raw.thumbnail ||
    raw.cover_image ||
    (Array.isArray(images) ? images[0] : images?.[0]) ||
    firstVariant?.image ||
    "/assets/images/product_skincare_cleanser_botanical_1792385521171.jpg";
  const image = getAssetUrl(sourceImage);
  const thumbnail = getAssetUrl(raw.thumbnail || image);
  return {
    ...raw,
    brand: raw.brand || "",
    image,
    thumbnail,
    price: Number(raw.price ?? raw.minimum_price ?? firstVariant?.price ?? 0),
    stock: Number(raw.stock ?? firstVariant?.stock ?? 0),
    variants,
  } as Product;
}

// Seed demo order
function initializeStorage() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(ORDERS_STORAGE_KEY)) {
    const defaultOrder: OrderInvoice = {
      id: 33,
      tenant_id: 1,
      invoice: "684058321",
      customer_id: 1,
      shipping_id: 1,
      location_id: 1,
      shipping_name: "Jahid Limon",
      shipping_phone: "01894084242",
      shipping_address: "Sector 3, Uttara, Dhaka",
      shipment_type: "normal",
      total_cart_item: 1,
      total_cart_item_price: "3960.00",
      total_discount: "540.00",
      total_shipping_cost: "60.00",
      subtotal: "3480.00",
      status: 1, // 0: Placed, 1: Processing, 2: Dispatched, 3: Delivered
      created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
      updated_at: new Date().toISOString(),
      items: [
        {
          id: 18,
          order_id: 33,
          product_id: 108565,
          variant_id: 1,
          product_name: "Victoria's Secret Very Sexy Eau De Parfum Spray 100ml",
          variant_info: '{"size":"100ml","bottle":"Signature"}',
          quantity: 1,
          unit_price: 3960,
          price_total: 3960,
          shipping_total: 60,
          discount_total: 540,
          item_total: 3480,
        },
      ],
      payments: [
        {
          id: 13,
          order_id: 33,
          method_id: 3,
          trxn_id: "TRX-BKASH-894084242",
          amount: 3480,
          status: 1,
          created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
        },
      ],
    };
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([defaultOrder]));
  }
}

initializeStorage();

export const api = {
  // --- Customer Authentication & Profile ---
  async login(credentials: { username: string; password: string }): Promise<{
    success: boolean;
    data: { token: string; expires: number; user: User };
  }> {
    const remote = await requestApi<any>("customer/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    const token = remote.data.token;
    localStorage.setItem("wellsell_token_v2", token);
    const profile = await requestApi<any>("customer/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = profile.data.user as User;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return {
      success: true,
      data: { token, expires: remote.data.expires, user },
    };
  },

  async getMe(
    token?: string,
  ): Promise<{ success: boolean; data: { user: User } }> {
    const savedToken = token || localStorage.getItem("wellsell_token_v2") || "";
    const remote = await requestApi<any>("customer/me", {
      headers: { Authorization: `Bearer ${savedToken}` },
    });
    return { success: true, data: { user: remote.data.user } };
    await new Promise((resolve) => setTimeout(resolve, 200));
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    const user: User = saved ? JSON.parse(saved) : MOCK_USER;
    return {
      success: true,
      data: { user },
    };
  },

  async register(payload: {
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
  }): Promise<{ success: boolean; data: { last_row: number; user: User } }> {
    const remote = await requestApi<any>("customer/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return {
      success: true,
      data: {
        last_row: remote.data.last_row,
        user: { ...payload, id: remote.data.last_row } as User,
      },
    };
    await new Promise((resolve) => setTimeout(resolve, 400));
    const user: User = {
      id: Math.floor(Math.random() * 9000) + 1000,
      username: payload.username,
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      city: payload.city,
      state: payload.state || "Dhaka",
      country: payload.country || "Bangladesh",
      postal_code: payload.postal_code || "1230",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return {
      success: true,
      data: {
        last_row: user.id,
        user,
      },
    };
  },

  // --- Store & Layout Metadata ---
  async getStoreMetadata(): Promise<{
    success: boolean;
    data: typeof STORE_CONTACT;
  }> {
    return { success: true, data: STORE_CONTACT };
  },

  async getCategories(): Promise<{ success: boolean; data: Category[] }> {
    const remote = await requestApi<any>("store/categories");
    return {
      success: true,
      data: remote.data?.categories || remote.data || [],
    };
    return { success: true, data: MOCK_CATEGORIES };
  },

  async getShipping(): Promise<{
    success: boolean;
    data: { methods: ShippingMethod[]; locations: ShippingLocation[] };
  }> {
    const remote = await requestApi<any>("store/shipping");
    return {
      success: true,
      data: {
        methods: remote.data.methods || [],
        locations: remote.data.locations || [],
      },
    };
    return {
      success: true,
      data: {
        methods: MOCK_SHIPPING_METHODS,
        locations: MOCK_SHIPPING_LOCATIONS,
      },
    };
  },

  async getPaymentMethods(): Promise<{
    success: boolean;
    data: PaymentMethod[];
  }> {
    const remote = await requestApi<any>("store/payment-methods");
    return {
      success: true,
      data: remote.data?.payment_methods || remote.data || [],
    };
    return {
      success: true,
      data: MOCK_PAYMENT_METHODS,
    };
  },

  // --- Products ---
  async getProducts(params?: {
    category_slug?: string;
    search?: string;
    campaign_slug?: string;
    price_from?: number;
    price_to?: number;
    brand?: string;
  }): Promise<{
    success: boolean;
    data: { products: Product[]; available_products: number };
  }> {
    const query = new URLSearchParams();
    if (params?.category_slug) query.set("category_slug", params.category_slug);
    if (params?.campaign_slug) query.set("campaign_slug", params.campaign_slug);
    if (params?.search) query.set("search", params.search);
    if (params?.price_from !== undefined)
      query.set("price[from]", String(params.price_from));
    if (params?.price_to !== undefined)
      query.set("price[to]", String(params.price_to));
    if (params?.brand) query.set("brands", params.brand);
    const remote = await requestApi<any>(`products&${query.toString()}`);
    const data = remote.data || {};
    const products = (data.products || []).map(normalizeProduct);
    return {
      success: true,
      data: {
        products,
        available_products: Number(
          products[0]?.["full_count" as keyof Product] || products.length,
        ),
      },
    };
    await new Promise((resolve) => setTimeout(resolve, 150));
    let list = [...MOCK_PRODUCTS];

    if (params?.search) {
      const q = params.search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.category_name && p.category_name.toLowerCase().includes(q)),
      );
    }

    if (params?.category_slug) {
      list = list.filter(
        (p) =>
          p.category_name
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .includes(params.category_slug!) ||
          p.slug.includes(params.category_slug!),
      );
    }

    if (params?.brand) {
      list = list.filter(
        (p) => p.brand.toLowerCase() === params.brand!.toLowerCase(),
      );
    }

    if (params?.price_from !== undefined && params.price_from > 0) {
      list = list.filter((p) => p.price >= params.price_from!);
    }

    if (params?.price_to !== undefined && params.price_to > 0) {
      list = list.filter((p) => p.price <= params.price_to!);
    }

    return {
      success: true,
      data: {
        products: list,
        available_products: list.length,
      },
    };
  },

  async getProductDetails(
    slugOrId: string | number,
  ): Promise<{ success: boolean; data: Product }> {
    const remote = await requestApi<any>(
      `product/details&slug=${encodeURIComponent(String(slugOrId))}`,
    );
    return {
      success: true,
      data: normalizeProduct(remote.data?.product || remote.data),
    };
    await new Promise((resolve) => setTimeout(resolve, 120));
    const found = MOCK_PRODUCTS.find(
      (p) => p.slug === String(slugOrId) || p.id === Number(slugOrId),
    );
    if (found) {
      return { success: true, data: found };
    }
    // Return default product (Victoria's Secret) if not explicitly matched
    return { success: true, data: MOCK_PRODUCTS[0] };
  },

  async getProductReviews(
    productId: number,
  ): Promise<{ success: boolean; data: ProductReview[] }> {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    let allReviews: ProductReview[] = stored
      ? JSON.parse(stored)
      : MOCK_REVIEWS;
    const filtered = allReviews.filter(
      (r) => r.product_id === productId || productId === 108565,
    );
    return { success: true, data: filtered };
  },

  async addProductReview(
    review: Omit<ProductReview, "id" | "created_at" | "status">,
  ): Promise<{ success: boolean; data: ProductReview }> {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    let allReviews: ProductReview[] = stored
      ? JSON.parse(stored)
      : [...MOCK_REVIEWS];
    const newReview: ProductReview = {
      ...review,
      id: Date.now(),
      status: 1,
      created_at: new Date().toISOString(),
    };
    allReviews.unshift(newReview);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(allReviews));
    return { success: true, data: newReview };
  },

  async getProductQuestions(
    productId: number,
  ): Promise<{ success: boolean; data: ProductQuestion[] }> {
    const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    let allQuestions: ProductQuestion[] = stored
      ? JSON.parse(stored)
      : MOCK_QUESTIONS;
    const filtered = allQuestions.filter(
      (q) => q.product_id === productId || productId === 108565,
    );
    return { success: true, data: filtered };
  },

  async addProductQuestion(
    question: Omit<ProductQuestion, "id" | "created_at" | "status">,
  ): Promise<{ success: boolean; data: ProductQuestion }> {
    const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    let allQuestions: ProductQuestion[] = stored
      ? JSON.parse(stored)
      : [...MOCK_QUESTIONS];
    const newQuestion: ProductQuestion = {
      ...question,
      id: Date.now(),
      status: 1,
      created_at: new Date().toISOString(),
      answer:
        "Thank you for your inquiry! Our product specialist is preparing a detailed reply.",
    };
    allQuestions.unshift(newQuestion);
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(allQuestions));
    return { success: true, data: newQuestion };
  },

  // --- Orders & Invoicing ---
  async createOrder(payload: OrderCreatePayload): Promise<{
    success: boolean;
    data: { order_id: number; invoice_number: string; callback_url: null };
  }> {
    const remote = await requestApi<any>("order/create", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("wellsell_token_v2") || ""}`,
      },
    });
    return {
      success: true,
      data: {
        order_id: remote.data.order_id,
        invoice_number: remote.data.invoice_number || remote.data.invoice,
        callback_url: remote.data.callback_url || null,
      },
    };
    await new Promise((resolve) => setTimeout(resolve, 400));
    const invoiceNumber = Math.floor(
      100000000 + Math.random() * 900000000,
    ).toString();
    const orderId = Math.floor(100 + Math.random() * 900);

    const newInvoice: OrderInvoice = {
      id: orderId,
      tenant_id: 1,
      invoice: invoiceNumber,
      shipping_id: payload.shipping_id,
      location_id: payload.location_id,
      shipping_name: payload.shipping_name,
      shipping_phone: payload.shipping_phone,
      shipping_address: payload.shipping_address,
      shipment_type: payload.shipment_type,
      total_cart_item: payload.total_cart_item,
      total_cart_item_price: payload.total_cart_item_price.toFixed(2),
      total_discount: payload.total_discount.toFixed(2),
      total_shipping_cost: payload.total_shipping_cost.toFixed(2),
      subtotal: payload.subtotal.toFixed(2),
      status: 0, // Placed
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: payload.items.map((item, idx) => ({
        id: idx + 1,
        order_id: orderId,
        product_id: item.product_id,
        variant_id: item.variant_id,
        product_name: item.product_name,
        variant_info: JSON.stringify(item.variant_info),
        quantity: item.quantity,
        unit_price: item.unit_price,
        price_total: item.price_total,
        shipping_total: item.shipping_total,
        discount_total: item.discount_total,
        item_total: item.item_total,
      })),
      payments: [
        {
          id: 1,
          order_id: orderId,
          method_id: payload.payment.method_id,
          trxn_id: `TRX-${invoiceNumber.substring(0, 6)}`,
          amount: payload.payment.amount,
          status: 0,
          created_at: new Date().toISOString(),
        },
      ],
    };

    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders: OrderInvoice[] = stored ? JSON.parse(stored) : [];
    orders.unshift(newInvoice);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

    return {
      success: true,
      data: {
        order_id: orderId,
        invoice_number: invoiceNumber,
        callback_url: null,
      },
    };
  },

  async getOrderInvoice(
    invoiceNumber: string,
  ): Promise<{ success: boolean; data: OrderInvoice | null }> {
    const remote = await requestApi<any>(
      `order/invoice&invoice=${encodeURIComponent(invoiceNumber)}`,
    );
    return { success: true, data: remote.data?.invoice || remote.data || null };
    await new Promise((resolve) => setTimeout(resolve, 250));
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders: OrderInvoice[] = stored ? JSON.parse(stored) : [];
    const found = orders.find((o) => o.invoice.trim() === invoiceNumber.trim());
    return {
      success: !!found,
      data: found || null,
    };
  },

  async trackOrder(
    invoiceNumber: string,
  ): Promise<{ success: boolean; data: OrderInvoice | null }> {
    const remote = await requestApi<any>(
      `order/track&invoice=${encodeURIComponent(invoiceNumber)}`,
    );
    return { success: true, data: remote.data?.invoice || remote.data || null };
    await new Promise((resolve) => setTimeout(resolve, 250));
    return this.getOrderInvoice(invoiceNumber);
  },
};
