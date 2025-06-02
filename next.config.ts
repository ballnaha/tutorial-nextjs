import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static Export Configuration
  output: 'export',
  
  // ปิด ESLint ระหว่าง build สำหรับ production
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // ปิด TypeScript check ระหว่าง build (optional)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ปิด Image Optimization สำหรับ static hosting
  images: {
    unoptimized: true,
  },
  
  // Base path สำหรับ subdirectory (ถ้าจำเป็น)
  // basePath: '/your-subdirectory',
  
  // Asset prefix สำหรับ CDN (optional)
  // assetPrefix: 'https://your-cdn.com',
  
  // Trailing slash
  trailingSlash: true,
  
  // ปิด i18n สำหรับ static export
  // i18n: undefined,
};

export default nextConfig;
