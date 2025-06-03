import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 4: Link และ Navigation | การใช้งาน Next.js Link',
  description: 'การใช้งาน Next.js Link และ Navigation ที่มีประสิทธิภาพ useRouter Programmatic Navigation และ Prefetching',
  keywords: [
    'Next.js Link',
    'useRouter',
    'Programmatic Navigation',
    'Prefetching',
    'Navigation Next.js',
    'Next.js routing',
    'Link component',
    'Next.js navigation ไทย'
  ],
  openGraph: {
    title: 'บทที่ 4: Link และ Navigation | การใช้งาน Next.js Link',
    description: 'การใช้งาน Next.js Link และ Navigation ที่มีประสิทธิภาพ',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-4',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Next.js Link', 'Navigation', 'useRouter', 'Prefetching'],
    images: [
      {
        url: '/og-nextjs-lesson-4.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 4: Link และ Navigation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 4: Link และ Navigation ใน Next.js',
    description: 'เรียนรู้การใช้งาน Next.js Link และ Navigation ที่มีประสิทธิภาพ',
    images: ['/og-nextjs-lesson-4.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-4',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson4Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 4: Link และ Navigation",
    "description": "การใช้งาน Next.js Link และ Navigation ที่มีประสิทธิภาพ useRouter Programmatic Navigation และ Prefetching",
    "educationalLevel": "Beginner",
    "learningResourceType": "Tutorial",
    "teaches": [
      "Next.js Link",
      "useRouter",
      "Programmatic Navigation", 
      "Prefetching"
    ],
    "timeRequired": "PT20M",
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