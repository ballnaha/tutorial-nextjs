import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 16: Forms และ Validation | การจัดการฟอร์มใน Next.js 15',
  description: 'เรียนรู้ React Hook Form Zod Validation FormData และ Server Actions ใน Next.js 15 พร้อม React 19',
  keywords: [
    'Next.js Forms',
    'React Hook Form',
    'Zod Validation',
    'FormData Next.js',
    'Server Actions',
    'Form Validation ไทย',
    'Next.js forms tutorial',
    'React 19 forms'
  ],
  openGraph: {
    title: 'บทที่ 16: Forms และ Validation | การจัดการฟอร์มใน Next.js 15',
    description: 'เรียนรู้ React Hook Form Zod Validation และ Server Actions ใน Next.js 15',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-16',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Forms', 'Validation', 'React Hook Form', 'Zod'],
    images: [
      {
        url: '/og-nextjs-lesson-16.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 16: Forms และ Validation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 16: Forms และ Validation ใน Next.js 15',
    description: 'เรียนรู้การจัดการฟอร์มและ Validation',
    images: ['/og-nextjs-lesson-16.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-16',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson16Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 16: Forms และ Validation",
    "description": "เรียนรู้ React Hook Form Zod Validation FormData และ Server Actions ใน Next.js 15 พร้อม React 19",
    "educationalLevel": "Intermediate",
    "learningResourceType": "Tutorial",
    "teaches": [
      "React Hook Form",
      "Zod Validation",
      "FormData Handling",
      "Server Actions",
      "Form Patterns"
    ],
    "timeRequired": "PT55M",
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