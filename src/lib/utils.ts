import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Lightweight robust class merge
export function cn(...inputs: (string | number | boolean | undefined | null | { [key: string]: boolean })[]): string {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number | string, currency = "Tk."): string {
  const num = typeof amount === "string" ? parseFloat(amount) || 0 : amount;
  return `${currency} ${num.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function asset(path: string | null | undefined, fallback: string | null = null): string {
  if (path == null) {
    return fallback ?? "";
  }

  const base = process.env.ECOM_ASSET_URL.replace(/\/+$/, "");
  const cleanPath = path.trim().replace(/^\/+/, "");

  return `${base}/${cleanPath}`;
}
