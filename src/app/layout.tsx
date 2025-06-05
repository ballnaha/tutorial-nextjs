import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { Navbar } from './components/Navbar';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { Box } from '@mui/material';
import { Prompt } from 'next/font/google';
import { Metadata, Viewport } from 'next';

const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
});

// Global SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://tutorial-nextjs-tau-one.vercel.app'),
  title: {
    default: 'Next.js Tutorial ไทย - เรียนรู้ Next.js, Material-UI และ Prisma ฟรี',
    template: '%s | Next.js Tutorial ไทย'
  },
  description: 'บทเรียน Next.js ภาษาไทยที่สมบูรณ์แบบ เรียนรู้ตั้งแต่พื้นฐานจนใช้งานได้จริง พร้อม Material-UI และ Prisma สำหรับสร้างเว็บแอปพลิเคชันครบครัน',
  keywords: [
    'Next.js tutorial ไทย',
    'เรียน Next.js',
    'React tutorial',
    'Material-UI tutorial', 
    'Prisma tutorial',
    'เรียนโปรแกรม',
    'เรียนเว็บไซต์',
    'JavaScript tutorial',
    'TypeScript tutorial',
    'Full Stack tutorial',
    'บทเรียนโปรแกรม',
    'เขียนเว็บไซต์',
    'React.js',
    'Node.js tutorial'
  ],
  authors: [{ name: 'Next.js Tutorial Thai', url: 'https://tutorial-nextjs-tau-one.vercel.app' }],
  creator: 'Next.js Tutorial Thai',
  publisher: 'Next.js Tutorial Thai',
  applicationName: 'Next.js Tutorial ไทย',
  referrer: 'origin-when-cross-origin',
  category: 'Education',
  classification: 'Educational Website',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://tutorial-nextjs-tau-one.vercel.app',
    siteName: 'Next.js Tutorial ไทย',
    title: 'Next.js Tutorial ไทย - เรียนรู้การสร้างเว็บแอปพลิเคชันฟรี',
    description: 'บทเรียน Next.js ภาษาไทยครบครัน เรียนรู้ Next.js, Material-UI และ Prisma ตั้งแต่เริ่มต้นจนใช้งานได้จริง',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Next.js Tutorial ไทย - เรียนรู้การสร้างเว็บแอปพลิเคชัน',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nextjs_tutorial_th',
    creator: '@nextjs_tutorial_th',
    title: 'Next.js Tutorial ไทย - เรียนรู้ Next.js ฟรี',
    description: 'บทเรียน Next.js ภาษาไทยครบครัน เรียนรู้ตั้งแต่พื้นฐานจนใช้งานได้จริง',
    images: ['/twitter-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app',
    languages: {
      'th-TH': 'https://tutorial-nextjs-tau-one.vercel.app',
      'en-US': 'https://tutorial-nextjs-tau-one.vercel.app',
    },
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1976d2' },
    { media: '(prefers-color-scheme: dark)', color: '#1976d2' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light',
};

// Global Structured Data
const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://tutorial-nextjs-tau-one.vercel.app/#website",
      "url": "https://tutorial-nextjs-tau-one.vercel.app/",
      "name": "Next.js Tutorial ไทย",
      "description": "บทเรียน Next.js ภาษาไทยที่สมบูรณ์แบบ เรียนรู้ตั้งแต่พื้นฐานจนใช้งานได้จริง",
      "publisher": {
        "@id": "https://tutorial-nextjs-tau-one.vercel.app/#organization"
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://tutorial-nextjs-tau-one.vercel.app/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "inLanguage": "th-TH"
    },
    {
      "@type": "Organization",
      "@id": "https://tutorial-nextjs-tau-one.vercel.app/#organization",
      "name": "Next.js Tutorial ไทย",
      "url": "https://tutorial-nextjs-tau-one.vercel.app/",
      "logo": {
        "@type": "ImageObject",
        "inLanguage": "th-TH",
        "url": "https://tutorial-nextjs-tau-one.vercel.app/logo.png",
        "contentUrl": "https://tutorial-nextjs-tau-one.vercel.app/logo.png",
        "width": 512,
        "height": 512,
        "caption": "Next.js Tutorial ไทย"
      },
      "image": {
        "@id": "https://tutorial-nextjs-tau-one.vercel.app/logo.png"
      },
      "sameAs": [
        "https://github.com/nextjs-tutorial-thai",
        "https://youtube.com/nextjs-tutorial-thai",
        "https://facebook.com/nextjs-tutorial-thai"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://tutorial-nextjs-tau-one.vercel.app/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "หน้าแรก",
          "item": "https://tutorial-nextjs-tau-one.vercel.app/"
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={prompt.className}>
      <head>
        {/* Global Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalStructuredData)
          }}
        />
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Next.js Tutorial ไทย" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional Meta for SEO */}
        <meta name="language" content="Thai" />
        <meta name="geo.region" content="TH" />
        <meta name="geo.country" content="Thailand" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="1 days" />
        
        {/* Rich Snippets */}
        <meta property="article:publisher" content="https://tutorial-nextjs-tau-one.vercel.app/" />
        <meta property="article:author" content="Next.js Tutorial Thai" />
        <meta property="article:section" content="Education" />
        <meta property="article:tag" content="Next.js, React, Tutorial, Programming" />
      </head>
      <body>
        <GoogleAnalytics />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
              </Box>
              
              {/* Footer for SEO */}
              <Box 
                component="footer" 
                sx={{ 
                  mt: 'auto',
                  py: 3, 
                  px: 3,
                  bgcolor: 'grey.100',
                  borderTop: '1px solid',
                  borderColor: 'grey.300'
                }}
              >
                <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                  <p>© 2025 Next.js Tutorial ไทย - เรียนรู้การสร้างเว็บแอปพลิเคชันฟรี</p>
                  <p>บทเรียน Next.js, Material-UI และ Prisma ภาษาไทยครบครัน</p>
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
