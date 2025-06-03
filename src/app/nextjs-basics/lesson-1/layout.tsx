import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 1: เริ่มต้นกับ Next.js | การติดตั้งและใช้งาน Next.js 15',
  description: 'เรียนรู้พื้นฐานการติดตั้งและใช้งาน Next.js 15 พร้อม TypeScript และ MUI โครงสร้างโปรเจค และการ setup',
  keywords: [
    'Next.js 15 installation',
    'TypeScript setup',
    'MUI installation',
    'Next.js project structure',
    'เริ่มต้น Next.js',
    'ติดตั้ง Next.js',
    'Next.js สำหรับมือใหม่',
    'Next.js tutorial ไทย'
  ],
  openGraph: {
    title: 'บทที่ 1: เริ่มต้นกับ Next.js | การติดตั้งและใช้งาน Next.js 15',
    description: 'เรียนรู้พื้นฐานการติดตั้งและใช้งาน Next.js 15 พร้อม TypeScript และ MUI',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-1',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Next.js', 'TypeScript', 'MUI', 'Installation'],
    images: [
      {
        url: '/og-nextjs-lesson-1.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 1: เริ่มต้นกับ Next.js',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 1: เริ่มต้นกับ Next.js',
    description: 'เรียนรู้การติดตั้งและใช้งาน Next.js 15 พร้อม TypeScript',
    images: ['/og-nextjs-lesson-1.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-1',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 1: เริ่มต้นกับ Next.js",
    "description": "เรียนรู้พื้นฐานการติดตั้งและใช้งาน Next.js 15 พร้อม TypeScript และ MUI โครงสร้างโปรเจค และการ setup",
    "educationalLevel": "Beginner",
    "learningResourceType": "Tutorial",
    "teaches": [
      "การติดตั้ง Next.js",
      "โครงสร้างโปรเจค",
      "TypeScript",
      "MUI Setup"
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