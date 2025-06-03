import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 13: Performance Optimization | เพิ่มประสิทธิภาพใน Next.js 15',
  description: 'เรียนรู้การเพิ่มประสิทธิภาพ Code Splitting Lazy Loading Caching และ Bundle Optimization ใน Next.js 15',
  keywords: [
    'Next.js Performance',
    'Code Splitting',
    'Lazy Loading',
    'Bundle Optimization',
    'Caching Strategies',
    'Performance optimization ไทย',
    'Next.js speed',
    'Web Vitals'
  ],
  openGraph: {
    title: 'บทที่ 13: Performance Optimization | เพิ่มประสิทธิภาพใน Next.js 15',
    description: 'เรียนรู้การเพิ่มประสิทธิภาพและ Bundle Optimization ใน Next.js 15',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-13',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Performance', 'Optimization', 'Code Splitting', 'Caching'],
    images: [
      {
        url: '/og-nextjs-lesson-13.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 13: Performance Optimization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 13: Performance Optimization ใน Next.js 15',
    description: 'เรียนรู้การเพิ่มประสิทธิภาพและ Code Splitting',
    images: ['/og-nextjs-lesson-13.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-13',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson13Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 13: Performance Optimization",
    "description": "เรียนรู้การเพิ่มประสิทธิภาพ Code Splitting Lazy Loading Caching และ Bundle Optimization ใน Next.js 15",
    "educationalLevel": "Advanced",
    "learningResourceType": "Tutorial",
    "teaches": [
      "Performance Optimization",
      "Code Splitting",
      "Lazy Loading",
      "Caching Strategies",
      "Bundle Analysis"
    ],
    "timeRequired": "PT60M",
    "inLanguage": "th",
    "isPartOf": {
      "@type": "Course",
      "name": "หลักสูตร Next.js 15 สำหรับมือใหม่",
      "description": "เรียนรู้ Next.js 15, React 19, TypeScript และ Prisma จากศูนย์สู่มืออาชีพ",
      "provider": {
        "@type": "Organization",
        "name": "Next.js Tutorial Thailand"
      }
    },
    "author": {
      "@type": "Organization",
      "name": "Next.js Tutorial Thailand"
    },
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  )
}