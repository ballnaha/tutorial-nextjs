import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 15: State Management | การจัดการ State ใน Next.js 15',
  description: 'เรียนรู้ Context API Redux Toolkit Zustand และ State Management Patterns ใน Next.js 15 พร้อม React 19',
  keywords: [
    'Next.js State Management',
    'Context API Next.js',
    'Redux Toolkit',
    'Zustand',
    'React State',
    'State Management ไทย',
    'Global State',
    'State Patterns'
  ],
  openGraph: {
    title: 'บทที่ 15: State Management | การจัดการ State ใน Next.js 15',
    description: 'เรียนรู้ Context API Redux Toolkit Zustand และ State Management Patterns ใน Next.js 15',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-15',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['State Management', 'Context API', 'Redux', 'Zustand'],
    images: [
      {
        url: '/og-nextjs-lesson-15.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 15: State Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 15: State Management ใน Next.js 15',
    description: 'เรียนรู้การจัดการ State และ Global State',
    images: ['/og-nextjs-lesson-15.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-15',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson15Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 15: State Management",
    "description": "เรียนรู้ Context API Redux Toolkit Zustand และ State Management Patterns ใน Next.js 15 พร้อม React 19",
    "educationalLevel": "Advanced",
    "learningResourceType": "Tutorial",
    "teaches": [
      "State Management",
      "Context API",
      "Redux Toolkit",
      "Zustand",
      "Global State Patterns"
    ],
    "timeRequired": "PT65M",
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