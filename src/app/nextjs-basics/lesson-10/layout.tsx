import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 10: State Management (Zustand) | การจัดการ Global State',
  description: 'การจัดการ global state ด้วย Zustand อย่างมีประสิทธิภาพ Zustand Store Persist Middleware Devtools และ TypeScript Integration',
  keywords: [
    'Zustand',
    'State Management',
    'Global State',
    'Zustand Store',
    'Persist Middleware',
    'Devtools',
    'TypeScript Integration',
    'State management ไทย'
  ],
  openGraph: {
    title: 'บทที่ 10: State Management (Zustand) | การจัดการ Global State',
    description: 'การจัดการ global state ด้วย Zustand อย่างมีประสิทธิภาพ',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-10',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Zustand', 'State Management', 'Global State', 'TypeScript'],
    images: [
      {
        url: '/og-nextjs-lesson-10.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 10: State Management (Zustand)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 10: State Management (Zustand)',
    description: 'การจัดการ global state ด้วย Zustand อย่างมีประสิทธิภาพ',
    images: ['/og-nextjs-lesson-10.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-10',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson10Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 10: State Management (Zustand)",
    "description": "การจัดการ global state ด้วย Zustand อย่างมีประสิทธิภาพ Zustand Store Persist Middleware Devtools และ TypeScript Integration",
    "educationalLevel": "Intermediate",
    "learningResourceType": "Tutorial",
    "teaches": [
      "Zustand Store",
      "Persist Middleware",
      "Devtools",
      "TypeScript Integration"
    ],
    "timeRequired": "PT45M",
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