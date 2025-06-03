import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 2: File-based Routing | App Router ใน Next.js 15',
  description: 'ทำความเข้าใจ App Router และการจัดการ routing ใน Next.js 15 Dynamic Routes Route Groups และ Layout',
  keywords: [
    'Next.js App Router',
    'File-based Routing',
    'Dynamic Routes',
    'Route Groups',
    'Layout',
    'Next.js routing ไทย',
    'App Directory',
    'Next.js 15 routing'
  ],
  openGraph: {
    title: 'บทที่ 2: File-based Routing | App Router ใน Next.js 15',
    description: 'ทำความเข้าใจ App Router และการจัดการ routing ใน Next.js 15',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-2',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['App Router', 'Routing', 'Dynamic Routes', 'Next.js'],
    images: [
      {
        url: '/og-nextjs-lesson-2.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 2: File-based Routing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 2: File-based Routing ใน Next.js 15',
    description: 'ทำความเข้าใจ App Router และการจัดการ routing',
    images: ['/og-nextjs-lesson-2.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-2',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 2: File-based Routing",
    "description": "ทำความเข้าใจ App Router และการจัดการ routing ใน Next.js 15 Dynamic Routes Route Groups และ Layout",
    "educationalLevel": "Beginner",
    "learningResourceType": "Tutorial",
    "teaches": [
      "App Router",
      "Dynamic Routes",
      "Route Groups",
      "Layout"
    ],
    "timeRequired": "PT30M",
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