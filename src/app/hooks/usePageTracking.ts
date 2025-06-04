'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '../components/GoogleAnalytics';

export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    
    // Track page view
    pageview(url);
    
    // Optional: Console log สำหรับ debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Page view tracked:', url);
    }
  }, [pathname, searchParams]);
} 