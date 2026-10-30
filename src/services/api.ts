import { MOCK_QUESTIONS, MOCK_REVIEWS } from "../data/mockData";

import { getAssetUrl } from "@/lib/assetHelper";
import {
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

const ORDERS_STORAGE_KEY = "wellsell_orders_v2";
const REVIEWS_STORAGE_KEY = "wellsell_reviews_v2";
const QUESTIONS_STORAGE_KEY = "wellsell_questions_v2";
const USER_STORAGE_KEY = "wellsell_user_v2";

const API_BASE = (
  process.env.ECOM_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://ilmcomm-v2.services.my"
).replace(/\/$/, "");
const API_APP_KEY = process.env.ECOM_APP_KEY || process.env.NEXT_PUBLIC_APP_KEY || "abcd";

async function requestApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const [endpoint, query] = path.split("&", 2);
  const url = new URL(`/api/proxy/v1/${endpoint}${query ? `?${query}` : ""}`, window.location.origin);
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

  async getMe(token?: string): Promise<{ success: boolean; data: { user: User } }> {
    const savedToken = token || localStorage.getItem("wellsell_token_v2") || "";
    const remote = await requestApi<any>("customer/me", {
      headers: { Authorization: `Bearer ${savedToken}` },
    });
    return { success: true, data: { user: remote.data.user } };
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
  },

  async getProductReviews(productId: number): Promise<{ success: boolean; data: ProductReview[] }> {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    let allReviews: ProductReview[] = stored ? JSON.parse(stored) : MOCK_REVIEWS;
    const filtered = allReviews.filter((r) => r.product_id === productId || productId === 108565);
    return { success: true, data: filtered };
  },

  async addProductReview(
    review: Omit<ProductReview, "id" | "created_at" | "status">,
  ): Promise<{ success: boolean; data: ProductReview }> {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    let allReviews: ProductReview[] = stored ? JSON.parse(stored) : [...MOCK_REVIEWS];
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

  async getProductQuestions(productId: number): Promise<{ success: boolean; data: ProductQuestion[] }> {
    const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    let allQuestions: ProductQuestion[] = stored ? JSON.parse(stored) : MOCK_QUESTIONS;
    const filtered = allQuestions.filter((q) => q.product_id === productId || productId === 108565);
    return { success: true, data: filtered };
  },

  async addProductQuestion(
    question: Omit<ProductQuestion, "id" | "created_at" | "status">,
  ): Promise<{ success: boolean; data: ProductQuestion }> {
    const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    let allQuestions: ProductQuestion[] = stored ? JSON.parse(stored) : [...MOCK_QUESTIONS];
    const newQuestion: ProductQuestion = {
      ...question,
      id: Date.now(),
      status: 1,
      created_at: new Date().toISOString(),
      answer: "Thank you for your inquiry! Our product specialist is preparing a detailed reply.",
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
  },

  async getOrderInvoice(invoiceNumber: string): Promise<{ success: boolean; data: OrderInvoice | null }> {
    const remote = await requestApi<any>(`order/invoice&invoice=${encodeURIComponent(invoiceNumber)}`);
    return { success: true, data: remote.data?.invoice || remote.data || null };
  },

  async trackOrder(invoiceNumber: string): Promise<{ success: boolean; data: OrderInvoice | null }> {
    const remote = await requestApi<any>(`order/track&invoice=${encodeURIComponent(invoiceNumber)}`);
    return { success: true, data: remote.data?.invoice || remote.data || null };
  },
};
