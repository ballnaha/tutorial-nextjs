import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 7: React Hooks (useState & useEffect) | ใน Next.js 15',
  description: 'เรียนรู้ React Hooks สำคัญและการใช้งานใน Next.js 15 useState useEffect Custom Hooks และ State Management',
  keywords: [
    'React Hooks',
    'useState',
    'useEffect',
    'Custom Hooks',
    'State Management',
    'React Next.js',
    'Hooks ไทย',
    'React Tutorial'
  ],
  openGraph: {
    title: 'บทที่ 7: React Hooks (useState & useEffect) | ใน Next.js 15',
    description: 'เรียนรู้ React Hooks สำคัญและการใช้งานใน Next.js 15',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-7',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['React Hooks', 'useState', 'useEffect', 'State Management'],
    images: [
      {
        url: '/og-nextjs-lesson-7.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 7: React Hooks (useState & useEffect)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 7: React Hooks (useState & useEffect)',
    description: 'เรียนรู้ React Hooks สำคัญและการใช้งาน',
    images: ['/og-nextjs-lesson-7.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-7',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson7Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 7: React Hooks (useState & useEffect)",
    "description": "เรียนรู้ React Hooks สำคัญและการใช้งานใน Next.js 15 useState useEffect Custom Hooks และ State Management",
    "educationalLevel": "Intermediate",
    "learningResourceType": "Tutorial",
    "teaches": [
      "useState",
      "useEffect",
      "Custom Hooks",
      "State Management"
    ],
    "timeRequired": "PT35M",
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