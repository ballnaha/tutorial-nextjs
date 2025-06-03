import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 6: Prisma & Database | การใช้งาน Prisma 6.8.0',
  description: 'การใช้งาน Prisma 6.8.0 สำหรับจัดการฐานข้อมูลพร้อมฟีเจอร์ใหม่ Prisma Setup Schema Design CRUD Operations และ TypedSQL',
  keywords: [
    'Prisma 6.8.0',
    'Prisma Setup',
    'Schema Design',
    'CRUD Operations',
    'TypedSQL',
    'Database Next.js',
    'Prisma ORM',
    'Database management'
  ],
  openGraph: {
    title: 'บทที่ 6: Prisma & Database | การใช้งาน Prisma 6.8.0',
    description: 'การใช้งาน Prisma 6.8.0 สำหรับจัดการฐานข้อมูลพร้อมฟีเจอร์ใหม่',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-6',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Prisma', 'Database', 'ORM', 'TypedSQL'],
    images: [
      {
        url: '/og-nextjs-lesson-6.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 6: Prisma & Database',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 6: Prisma & Database',
    description: 'การใช้งาน Prisma 6.8.0 สำหรับจัดการฐานข้อมูล',
    images: ['/og-nextjs-lesson-6.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-6',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson6Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 6: Prisma & Database",
    "description": "การใช้งาน Prisma 6.8.0 สำหรับจัดการฐานข้อมูลพร้อมฟีเจอร์ใหม่ Prisma Setup Schema Design CRUD Operations และ TypedSQL",
    "educationalLevel": "Intermediate",
    "learningResourceType": "Tutorial",
    "teaches": [
      "Prisma Setup",
      "Schema Design",
      "CRUD Operations",
      "TypedSQL"
    ],
    "timeRequired": "PT50M",
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