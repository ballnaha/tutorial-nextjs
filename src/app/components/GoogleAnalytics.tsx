'use client';

import Script from 'next/script';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-RVGWQD59JV';

export function GoogleAnalytics() {
  // ไม่โหลด GA ใน development mode
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            // ปิด automatic page view tracking
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}

// Helper functions สำหรับ tracking events
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

// Track page views
export const pageview = (url: string) => {
  if (process.env.NODE_ENV === 'production') {
    gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (process.env.NODE_ENV === 'production') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}; 