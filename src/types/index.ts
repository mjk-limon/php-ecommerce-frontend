export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  size?: string | null;
  color?: string | null;
  price: number;
  stock: number;
  images?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  category_id?: number;
  category_name?: string;
  discount?: number;
  old_price?: number;
  price: number;
  stock?: number;
  views?: number;
  rating?: number;
  reviews_count?: number;
  sku?: string;
  product_code?: string;
  image: string;
  thumbnails?: string[];
  description?: string;
  short_description?: string;
  variants?: ProductVariant[];
  status?: number;
  featered_flags?: number;
  category?: Category[];
  merchant?: Array<{
    id: number;
    name?: string;
    company_name?: string;
    email?: string;
    phone?: string;
  }>;
}

export interface Category {
  id: number;
  tenant_id?: number;
  name: string;
  slug: string;
  parent_main_id?: number | null;
  parent_sub_id?: number | null;
  position?: number;
  images?: string | null;
  icon?: string;
  total_views?: string | number;
  childs?: Category[];
  child_ids?: number[];
  products?: Product[] | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_tags?: string | null;
}

export interface CampaignItem {
  id: number;
  campaign_id: number;
  product_id?: number | null;
  category_id?: number | null;
}

export interface Campaign {
  id: number;
  name: string;
  slug: string;
  thumbnail?: string | null;
  start_from?: string | null;
  ends_in?: string | null;
  discount?: number;
  items?: CampaignItem[];
}

export interface FilterObjects {
  brands: Record<string, string>;
  min_price: number;
  max_price: number;
  available_sizes: string[];
  available_colors: string[];
}

export interface ShippingMethod {
  id: number;
  tenant_flag?: number | null;
  method_logo?: string | null;
  method_name: string;
  status: number;
}

export interface CostTime {
  id: number;
  method_id: number;
  location_id: number;
  cost: number;
  estimate_time: string;
  created_at?: string;
}

export interface ShippingLocation {
  id: number;
  tenant_flag?: number | null;
  location: string;
  city: string;
  status: number;
  cost_times?: CostTime[] | null;
}

export interface PaymentMethod {
  id: number;
  tenant_flag?: number | null;
  handler?: string | null;
  name: string;
  ins_1?: string;
  ins_2?: string;
  ins_3?: string;
  additional?: string;
  status: number;
}

export interface CartItem {
  product: Product;
  variant_id?: number;
  quantity: number;
  selected_size?: string;
  selected_color?: string;
}

export interface OrderItemPayload {
  product_id: number;
  variant_id: number;
  product_name: string;
  variant_info: Record<string, string>;
  quantity: number;
  unit_price: number;
  price_total: number;
  shipping_total: number;
  discount_total: number;
  item_total: number;
}

export interface OrderCreatePayload {
  location_id: number;
  shipping_id: number;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipment_type: string;
  total_cart_item: number;
  total_cart_item_price: number;
  total_discount: number;
  total_shipping_cost: number;
  subtotal: number;
  coupon_ids: string[];
  payment: {
    method_id: number;
    amount: number;
    gateway_response: unknown[];
  };
  items: OrderItemPayload[];
}

export interface OrderInvoice {
  id: number;
  tenant_id: number;
  invoice: string;
  customer_id?: number | null;
  shipping_id: number;
  location_id: number;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipment_type: string;
  total_cart_item: number;
  total_cart_item_price: string | number;
  total_discount: string | number;
  total_shipping_cost: string | number;
  subtotal: string | number;
  status: number;
  created_at: string;
  updated_at: string;
  items: Array<{
    id: number;
    order_id: number;
    product_id: number;
    variant_id: number;
    product_name: string;
    variant_info: string;
    quantity: number;
    unit_price: number;
    price_total: number;
    shipping_total: number;
    discount_total: number;
    item_total: number;
  }>;
  payments?: Array<{
    id: number;
    order_id: number;
    method_id: number;
    trxn_id: string;
    amount: number;
    status: number;
    created_at: string;
  }>;
}

export interface ProductReview {
  id: number;
  user_id: number;
  user_name?: string;
  product_id: number;
  review: string;
  rating: number;
  status: number;
  created_at: string;
}

export interface ProductQuestion {
  id: number;
  product_id: number;
  parent_id?: number | null;
  question: string;
  answer?: string;
  status: number;
  created_at: string;
}

export interface StoreMeta {
  id: number;
  tenant_id: number;
  meta_key: string;
  meta_sub_key?: string | null;
  meta_value: string;
  visibility: string;
  updated_at: string;
}
