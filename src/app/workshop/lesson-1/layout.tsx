import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'บทที่ 1: Theme Template & Vertical Menu Pro | Workshop Next.js',
  description: 'เรียนรู้การสร้าง Professional Theme Template และ Vertical Menu System ที่ responsive พร้อม submenu, active states, และ TypeScript support แบบครบวงจร สำหรับ Next.js 15 และ Material-UI',
  keywords: [
    'Next.js Workshop',
    'Material-UI Tutorial',
    'Vertical Menu',
    'Theme Template',
    'React Components',
    'TypeScript',
    'Responsive Design',
    'Admin Dashboard',
    'Workshop Thai',
    'Next.js 15',
    'MUI Components',
    'Professional UI',
    'Mobile Menu',
    'Submenu System'
  ],
  authors: [{ name: 'Next.js Tutorial ไทย' }],
  creator: 'Next.js Tutorial ไทย',
  publisher: 'Next.js Tutorial ไทย',
  category: 'Education',
  
  // Open Graph
  openGraph: {
    title: 'บทที่ 1: Theme Template & Vertical Menu Pro | Workshop Next.js',
    description: 'เรียนรู้การสร้าง Professional Theme Template และ Vertical Menu System ที่ responsive พร้อม submenu, active states, และ TypeScript support แบบครบวงจร',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/workshop/lesson-1',
    siteName: 'Next.js Tutorial ไทย',
    type: 'article',
    locale: 'th_TH',
    images: [
      {
        url: '/images/workshop/lesson-1-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Workshop บทที่ 1: Theme Template & Vertical Menu Pro',
        type: 'image/jpeg',
      }
    ],
    videos: [
      {
        url: '/videos/workshop/lesson-1-demo.mp4',
        width: 1280,
        height: 720,
        type: 'video/mp4',
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@nextjs_tutorial_th',
    creator: '@nextjs_tutorial_th',
    title: 'บทที่ 1: Theme Template & Vertical Menu Pro | Workshop Next.js',
    description: 'เรียนรู้การสร้าง Professional Theme Template และ Vertical Menu System ที่ responsive พร้อม submenu, active states, และ TypeScript support แบบครบวงจร',
    images: ['/images/workshop/lesson-1-twitter.jpg'],
  },

  // Robots
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

  // Verification
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    other: {
      'msvalidate.01': 'your-bing-verification',
    },
  },

  // Alternates
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/workshop/lesson-1',
    languages: {
      'th-TH': 'https://tutorial-nextjs-tau-one.vercel.app/workshop/lesson-1',
      'en-US': 'https://tutorial-nextjs-tau-one.vercel.app/en/workshop/lesson-1',
    },
  },

  // Additional metadata
  other: {
    'article:author': 'Next.js Tutorial ไทย',
    'article:published_time': '2024-01-15T00:00:00.000Z',
    'article:modified_time': new Date().toISOString(),
    'article:section': 'Workshop',
    'article:tag': 'Next.js, Material-UI, Workshop, TypeScript, React',
    'og:video:duration': '1800', // 30 minutes
    'difficulty': 'Intermediate',
    'duration': '90 minutes',
    'workshop:lesson': '1',
    'workshop:topic': 'Theme Template & Vertical Menu',
    'workshop:level': 'Professional',
  },

  // App specific
  applicationName: 'Next.js Tutorial ไทย',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1976d2' },
    { media: '(prefers-color-scheme: dark)', color: '#1976d2' },
  ],

  // Icons
  icons: {
    icon: [
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },

  // Manifest
  manifest: '/manifest.json',

  // Archive
  archives: ['https://tutorial-nextjs-tau-one.vercel.app/workshop'],

  // Bookmarks
  bookmarks: ['https://tutorial-nextjs-tau-one.vercel.app/workshop/lesson-1'],

  // Classification
  classification: 'Educational Content',

  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function WorkshopLesson1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            '@id': 'https://tutorial-nextjs-tau-one.vercel.app/workshop/lesson-1',
            'name': 'บทที่ 1: Theme Template & Vertical Menu Pro',
            'description': 'เรียนรู้การสร้าง Professional Theme Template และ Vertical Menu System ที่ responsive พร้อม submenu, active states, และ TypeScript support แบบครบวงจร',
            'url': 'https://tutorial-nextjs-tau-one.vercel.app/workshop/lesson-1',
            'image': 'https://tutorial-nextjs-tau-one.vercel.app/images/workshop/lesson-1-og.jpg',
            'author': {
              '@type': 'Organization',
              'name': 'Next.js Tutorial ไทย',
              'url': 'https://tutorial-nextjs-tau-one.vercel.app'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Next.js Tutorial ไทย',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://tutorial-nextjs-tau-one.vercel.app/logo.png'
              }
            },
            'datePublished': '2024-01-15T00:00:00.000Z',
            'dateModified': new Date().toISOString(),
            'inLanguage': 'th-TH',
            'learningResourceType': 'Workshop',
            'educationalLevel': 'Intermediate',
            'timeRequired': 'PT1H30M',
            'teaches': [
              'Professional Theme Configuration',
              'Advanced Vertical Menu System',
              'TypeScript Interfaces & Types',
              'Responsive Design Patterns',
              'Component Architecture',
              'State Management Patterns'
            ],
            'courseMode': 'online',
            'isAccessibleForFree': true,
            'hasPart': [
              {
                '@type': 'LearningResource',
                'name': 'Live Demo',
                'description': 'Interactive demonstration of Professional Vertical Menu'
              },
              {
                '@type': 'LearningResource',
                'name': 'Complete Code Examples',
                'description': 'Full implementation guide with TypeScript'
              },
              {
                '@type': 'LearningResource',
                'name': 'Best Practices',
                'description': 'Professional tips and responsive design patterns'
              }
            ],
            'about': {
              '@type': 'Thing',
              'name': 'Web Development',
              'sameAs': 'https://en.wikipedia.org/wiki/Web_development'
            },
            'audience': {
              '@type': 'EducationalAudience',
              'educationalRole': 'student',
              'audienceType': 'Web Developers'
            },
            'breadcrumb': {
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': 'หน้าหลัก',
                  'item': 'https://tutorial-nextjs-tau-one.vercel.app'
                },
                {
                  '@type': 'ListItem',
                  'position': 2,
                  'name': 'Workshop',
                  'item': 'https://tutorial-nextjs-tau-one.vercel.app/workshop'
                },
                {
                  '@type': 'ListItem',
                  'position': 3,
                  'name': 'บทที่ 1: Theme Template & Vertical Menu Pro',
                  'item': 'https://tutorial-nextjs-tau-one.vercel.app/workshop/lesson-1'
                }
              ]
            }
          })
        }}
      />

      {/* Additional SEO Tags */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      
      {/* Preload critical resources */}
      <link 
        rel="preload" 
        href="/images/workshop/lesson-1-hero.webp" 
        as="image" 
        type="image/webp"
      />

      {children}
    </>
  );
} 