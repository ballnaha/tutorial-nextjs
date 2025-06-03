import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 14: Advanced Features | ฟีเจอร์ขั้นสูงใน Next.js 15',
  description: 'เรียนรู้ Internationalization (i18n) PWA Service Workers และ Advanced Routing ใน Next.js 15',
  keywords: [
    'Next.js Advanced Features',
    'Internationalization i18n',
    'PWA Next.js',
    'Service Workers',
    'Advanced Routing',
    'Next.js advanced ไทย',
    'Multi-language',
    'Progressive Web App'
  ],
  openGraph: {
    title: 'บทที่ 14: Advanced Features | ฟีเจอร์ขั้นสูงใน Next.js 15',
    description: 'เรียนรู้ Internationalization PWA Service Workers และ Advanced Routing ใน Next.js 15',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-14',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Advanced Features', 'i18n', 'PWA', 'Service Workers'],
    images: [
      {
        url: '/og-nextjs-lesson-14.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 14: Advanced Features',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 14: Advanced Features ใน Next.js 15',
    description: 'เรียนรู้ฟีเจอร์ขั้นสูงและ PWA',
    images: ['/og-nextjs-lesson-14.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-14',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson14Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 14: Advanced Features",
    "description": "เรียนรู้ Internationalization (i18n) PWA Service Workers และ Advanced Routing ใน Next.js 15",
    "educationalLevel": "Expert",
    "learningResourceType": "Tutorial",
    "teaches": [
      "Internationalization",
      "Progressive Web Apps",
      "Service Workers",
      "Advanced Routing",
      "Multi-language Support"
    ],
    "timeRequired": "PT70M",
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