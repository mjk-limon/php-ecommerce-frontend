# WellSell BD - Next.js E-Commerce Store

Full-featured Next.js App Router migration with Server-Side Rendering (SSR), slug-based routing, dedicated checkout page, and mock API route handlers.

## Highlights & Features

- **Next.js App Router with Full SSR**: The server renders complete HTML for the page body (Hero banners, categories, trending products, prices, descriptions, reviews, specifications, and footer). In browser "View Page Source", full semantic HTML content is present for optimal SEO and instant initial page load.
- **Slug-Based Dynamic Routing**:
  - `/products/[slug]`: Dynamic product details pages (e.g. `/products/victorias-secret-very-sexy-eau-de-parfum-100ml`) with server-rendered metadata (title, OpenGraph, description) and related products.
  - `/category/[slug]`: Dynamic category department pages (e.g. `/category/health-beauty`, `/category/health-vitamin`, `/category/men`, `/category/mom-kids`, `/category/watch-collection`, `/category/korean-collection`).
- **Dedicated Checkout Page (`/checkout`)**:
  - Customer contact details & delivery address form
  - Delivery location zone selection (Inside Dhaka City Tk. 60 / Outside Dhaka City Tk. 130)
  - Payment method choices (Cash on Delivery, bKash / Nagad mobile banking, Credit/Debit Cards)
  - Order items review list
  - Promo coupon support (`WELLSELL10` for 10% discount)
  - Full price breakdown and order submission to `/api/v1/order/create`
- **Other Dedicated Page Routes**:
  - `/`: Home Page with departments menu, hero slider, and category showcases
  - `/cart`: Dedicated shopping bag page
  - `/brand` & `/brands`: Official brand partners showcase
  - `/offers`: Deals and flash sales
  - `/login`: Customer sign-in page
  - `/register`: Customer registration page
  - `/track-order`: Courier parcel tracking with timeline
  - `/invoice/[invoiceNo]`: Printable order invoice receipt
- **Built-in Next.js Route Handlers (`app/api/v1/...`)**:
  - `/api/v1/customer/login`
  - `/api/v1/customer/register`
  - `/api/v1/customer/me`
  - `/api/v1/order/create`
  - `/api/v1/order/invoice`
  - `/api/v1/order/track`

## Getting Started

```bash
# Development server (Port 3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start
```
