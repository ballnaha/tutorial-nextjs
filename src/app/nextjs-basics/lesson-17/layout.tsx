import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 17: Real-time Features | WebSocket และ Streaming ใน Next.js 15',
  description: 'เรียนรู้ WebSocket Socket.io Server-Sent Events และ Real-time Communication ใน Next.js 15',
  keywords: [
    'Next.js WebSocket',
    'Socket.io Next.js',
    'Server-Sent Events',
    'Real-time Next.js',
    'Streaming Next.js',
    'WebSocket ไทย',
    'Real-time communication',
    'Live updates'
  ],
  openGraph: {
    title: 'บทที่ 17: Real-time Features | WebSocket และ Streaming ใน Next.js 15',
    description: 'เรียนรู้ WebSocket Socket.io และ Real-time Communication ใน Next.js 15',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-17',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['WebSocket', 'Real-time', 'Streaming', 'Socket.io'],
    images: [
      {
        url: '/og-nextjs-lesson-17.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 17: Real-time Features',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 17: Real-time Features ใน Next.js 15',
    description: 'เรียนรู้ WebSocket และ Real-time Communication',
    images: ['/og-nextjs-lesson-17.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-17',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson17Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 17: Real-time Features",
    "description": "เรียนรู้ WebSocket Socket.io Server-Sent Events และ Real-time Communication ใน Next.js 15",
    "educationalLevel": "Expert",
    "learningResourceType": "Tutorial",
    "teaches": [
      "WebSocket Implementation",
      "Socket.io Integration",
      "Server-Sent Events",
      "Real-time Communication",
      "Live Updates"
    ],
    "timeRequired": "PT75M",
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