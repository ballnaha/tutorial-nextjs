import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 9: Authentication & Authorization | NextAuth.js และ JWT',
  description: 'การสร้างระบบ authentication ด้วย NextAuth.js และ JWT NextAuth.js JWT Session Management และ Protected Routes',
  keywords: [
    'NextAuth.js',
    'JWT',
    'Session Management',
    'Protected Routes',
    'Authentication Next.js',
    'Authorization',
    'Login system',
    'Authentication ไทย'
  ],
  openGraph: {
    title: 'บทที่ 9: Authentication & Authorization | NextAuth.js และ JWT',
    description: 'การสร้างระบบ authentication ด้วย NextAuth.js และ JWT',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-9',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['NextAuth', 'JWT', 'Authentication', 'Authorization'],
    images: [
      {
        url: '/og-nextjs-lesson-9.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 9: Authentication & Authorization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 9: Authentication & Authorization',
    description: 'การสร้างระบบ authentication ด้วย NextAuth.js และ JWT',
    images: ['/og-nextjs-lesson-9.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-9',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson9Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 9: Authentication & Authorization",
    "description": "การสร้างระบบ authentication ด้วย NextAuth.js และ JWT NextAuth.js JWT Session Management และ Protected Routes",
    "educationalLevel": "Advanced",
    "learningResourceType": "Tutorial",
    "teaches": [
      "NextAuth.js",
      "JWT",
      "Session Management",
      "Protected Routes"
    ],
    "timeRequired": "PT60M",
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