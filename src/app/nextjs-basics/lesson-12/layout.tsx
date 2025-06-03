import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 12: Middleware & Security | การใช้ Next.js Middleware',
  description: 'การใช้ Next.js Middleware สำหรับ security และ request handling Middleware CORS Rate Limiting และ Security Headers',
  keywords: [
    'Next.js Middleware',
    'Security Headers',
    'CORS',
    'Rate Limiting',
    'Request handling',
    'Middleware ไทย',
    'Web Security',
    'Next.js security'
  ],
  openGraph: {
    title: 'บทที่ 12: Middleware & Security | การใช้ Next.js Middleware',
    description: 'การใช้ Next.js Middleware สำหรับ security และ request handling',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-12',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Middleware', 'Security', 'CORS', 'Rate Limiting'],
    images: [
      {
        url: '/og-nextjs-lesson-12.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 12: Middleware & Security',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 12: Middleware & Security',
    description: 'การใช้ Next.js Middleware สำหรับ security',
    images: ['/og-nextjs-lesson-12.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-12',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson12Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 12: Middleware & Security",
    "description": "การใช้ Next.js Middleware สำหรับ security และ request handling Middleware CORS Rate Limiting และ Security Headers",
    "educationalLevel": "Advanced",
    "learningResourceType": "Tutorial",
    "teaches": [
      "Middleware",
      "CORS",
      "Rate Limiting",
      "Security Headers"
    ],
    "timeRequired": "PT40M",
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