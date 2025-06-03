import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 8: Zod Validation | Type-safe validation',
  description: 'การใช้ Zod สำหรับ type-safe validation และ schema validation Schema Validation Form Validation API Validation และ Type Inference',
  keywords: [
    'Zod Validation',
    'Schema Validation',
    'Form Validation',
    'API Validation',
    'Type Inference',
    'TypeScript validation',
    'Zod ไทย',
    'Type-safe validation'
  ],
  openGraph: {
    title: 'บทที่ 8: Zod Validation | Type-safe validation',
    description: 'การใช้ Zod สำหรับ type-safe validation และ schema validation',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-8',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Zod', 'Validation', 'TypeScript', 'Schema'],
    images: [
      {
        url: '/og-nextjs-lesson-8.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 8: Zod Validation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 8: Zod Validation',
    description: 'การใช้ Zod สำหรับ type-safe validation',
    images: ['/og-nextjs-lesson-8.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-8',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson8Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 8: Zod Validation",
    "description": "การใช้ Zod สำหรับ type-safe validation และ schema validation Schema Validation Form Validation API Validation และ Type Inference",
    "educationalLevel": "Intermediate",
    "learningResourceType": "Tutorial",
    "teaches": [
      "Schema Validation",
      "Form Validation",
      "API Validation",
      "Type Inference"
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