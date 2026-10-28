/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  env: {
    ECOM_API_BASE_URL: process.env.ECOM_API_BASE_URL || 'http://ilmcomm-v2.services.my/',
    ECOM_ASSET_URL: process.env.ECOM_ASSET_URL || process.env.NEXT_PUBLIC_ASSET_URL || 'http://ilmcomm-v2.services.my/',
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.ECOM_API_BASE_URL || 'http://ilmcomm-v2.services.my/',
    NEXT_PUBLIC_ASSET_URL: process.env.NEXT_PUBLIC_ASSET_URL || process.env.ECOM_ASSET_URL || 'http://ilmcomm-v2.services.my/',
    ECOM_API_VERSION: process.env.ECOM_API_VERSION || 'v1',
    ECOM_APP_KEY: process.env.ECOM_APP_KEY || 'abcd',
  },
};

export default nextConfig;
