import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 18: สร้างโปรเจคจริง | Full-stack App ด้วย Next.js 15',
  description: 'สร้างเว็บแอปพลิเคชันจริงด้วย Next.js 15 React 19 TypeScript Prisma และ Material-UI รวมทุกสิ่งที่เรียนมา',
  keywords: [
    'Next.js Project',
    'Full-stack Next.js',
    'Next.js 15 tutorial',
    'React 19 project',
    'TypeScript project',
    'Prisma project',
    'Material-UI project',
    'Next.js โปรเจคจริง'
  ],
  openGraph: {
    title: 'บทที่ 18: สร้างโปรเจคจริง | Full-stack App ด้วย Next.js 15',
    description: 'สร้างเว็บแอปพลิเคชันจริงด้วย Next.js 15 React 19 TypeScript Prisma รวมทุกสิ่งที่เรียนมา',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-18',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['Full-stack', 'Project', 'Real Application', 'Complete Tutorial'],
    images: [
      {
        url: '/og-nextjs-lesson-18.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 18: สร้างโปรเจคจริง',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 18: สร้างโปรเจคจริง ด้วย Next.js 15',
    description: 'สร้าง Full-stack App รวมทุกสิ่งที่เรียนมา',
    images: ['/og-nextjs-lesson-18.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-18',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson18Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 18: สร้างโปรเจคจริง",
    "description": "สร้างเว็บแอปพลิเคชันจริงด้วย Next.js 15 React 19 TypeScript Prisma และ Material-UI รวมทุกสิ่งที่เรียนมา",
    "educationalLevel": "Expert",
    "learningResourceType": "Tutorial",
    "teaches": [
      "Full-stack Development",
      "Project Architecture",
      "Integration Skills",
      "Best Practices",
      "Production Ready App"
    ],
    "timeRequired": "PT120M",
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