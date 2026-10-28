// Lightweight robust class merge
export function cn(
  ...inputs: (
    | string
    | number
    | boolean
    | undefined
    | null
    | { [key: string]: boolean }
  )[]
): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (typeof input === "object") {
      for (const [key, val] of Object.entries(input)) {
        if (val) classes.push(key);
      }
    }
  }

  return classes.join(" ").trim();
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
