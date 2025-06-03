import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 5: Data Fetching & API Routes | การดึงข้อมูลใน Next.js 15',
  description: 'เรียนรู้การดึงข้อมูลและสร้าง API ใน Next.js 15 fetch API API Routes Server Actions และ Error Handling',
  keywords: [
    'Next.js Data Fetching',
    'fetch API',
    'API Routes',
    'Server Actions',
    'Error Handling',
    'Next.js API ไทย',
    'Data fetching Next.js',
    'RESTful API'
  ],
  openGraph: {
    title: 'บทที่ 5: Data Fetching & API Routes | การดึงข้อมูลใน Next.js 15',
    description: 'เรียนรู้การดึงข้อมูลและสร้าง API ใน Next.js 15',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-5',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Data Fetching', 'API Routes', 'Server Actions', 'Next.js'],
    images: [
      {
        url: '/og-nextjs-lesson-5.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 5: Data Fetching & API Routes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 5: Data Fetching & API Routes',
    description: 'เรียนรู้การดึงข้อมูลและสร้าง API ใน Next.js 15',
    images: ['/og-nextjs-lesson-5.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-5',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson5Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 5: Data Fetching & API Routes",
    "description": "เรียนรู้การดึงข้อมูลและสร้าง API ใน Next.js 15 fetch API API Routes Server Actions และ Error Handling",
    "educationalLevel": "Intermediate",
    "learningResourceType": "Tutorial",
    "teaches": [
      "fetch API",
      "API Routes",
      "Server Actions",
      "Error Handling"
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