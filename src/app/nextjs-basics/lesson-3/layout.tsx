import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 3: Server vs Client Components | ใน React 19 และ Next.js 15',
  description: 'เข้าใจความแตกต่างระหว่าง Server และ Client Components ใน React 19 Hydration และ Performance',
  keywords: [
    'Server Components',
    'Client Components',
    'React 19',
    'Hydration',
    'Performance',
    'Next.js 15',
    'React Server Components',
    'Client-side rendering'
  ],
  openGraph: {
    title: 'บทที่ 3: Server vs Client Components | ใน React 19 และ Next.js 15',
    description: 'เข้าใจความแตกต่างระหว่าง Server และ Client Components ใน React 19',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-3',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Server Components', 'Client Components', 'React 19', 'Performance'],
    images: [
      {
        url: '/og-nextjs-lesson-3.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 3: Server vs Client Components',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 3: Server vs Client Components',
    description: 'เข้าใจความแตกต่างและการใช้งาน Server และ Client Components',
    images: ['/og-nextjs-lesson-3.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-3',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 3: Server vs Client Components",
    "description": "เข้าใจความแตกต่างระหว่าง Server และ Client Components ใน React 19 Hydration และ Performance",
    "educationalLevel": "Intermediate",
    "learningResourceType": "Tutorial",
    "teaches": [
      "Server Components",
      "Client Components",
      "Hydration",
      "Performance"
    ],
    "timeRequired": "PT25M",
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