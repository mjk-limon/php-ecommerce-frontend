import { SERVER_API_ERROR_DIGEST } from "@/lib/errors";
import type { Category } from "@/types";
import { log } from "console";
import { cache } from "react";
import "server-only";

const API_ORIGIN = (process.env.ECOM_API_BASE_URL || "http://ilmcomm-v2.services.my").replace(/\/$/, "");
const ASSET_ORIGIN = (process.env.ECOM_ASSET_URL || "/").replace(/\/$/, "");
const API_VERSION = (process.env.ECOM_API_VERSION || "v1").replace(/^\/+|\/+$/g, "");
const APP_KEY = process.env.ECOM_APP_KEY || "";

class ServerApiError extends Error {
  readonly digest = SERVER_API_ERROR_DIGEST;

  constructor(message: string) {
    super(message);
    this.name = "ServerApiError";
  }
}

export function serverApiAssetUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${ASSET_ORIGIN}/${path.replace(/^\/+/, "")}`;
}

// React cache deduplicates identical requests during a server render, including
// requests made by the root layout and the page rendered inside it.
const requestServerApi = cache(async (path: string, query: string) => {
  const url = new URL(`${API_ORIGIN}/api/${API_VERSION}/${path.replace(/^\/+/, "")}`);
  url.searchParams.set("app_key", APP_KEY);
  new URLSearchParams(query).forEach((value, key) => url.searchParams.set(key, value));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  let response: Response;

  try {
    response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("DYNAMIC_")
    ) {
      throw error;
    }

    log(`Server API: fetch failed for ${url}`, error);
    throw new ServerApiError("The server API request failed.");
  } finally {
    clearTimeout(timeout);
  }

  let result: any;
  try {
    result = await response.json();
  } catch {
    throw new ServerApiError("The server API returned an invalid response.");
  }

  if (!response.ok || !result || result?.success === false) {
    throw new ServerApiError(result?.error || result?.message || `API request failed (${response.status})`);
  }

  return result;
});

export function serverApiGet<T>(path: string, params?: Record<string, string | number | boolean | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) query.set(key, String(value));
  });

  return requestServerApi(path, query.toString()) as Promise<T>;
}

export const getServerCategories = cache(async (): Promise<Category[]> => {
  const result = await serverApiGet<any>("store/categories");

  return result.data;
});
