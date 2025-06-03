import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'บทที่ 11: Forms & React Hook Form | การสร้างฟอร์มที่มีประสิทธิภาพ',
  description: 'การสร้างฟอร์มที่มีประสิทธิภาพด้วย React Hook Form และ Zod React Hook Form Form Validation Dynamic Forms และ File Upload',
  keywords: [
    'React Hook Form',
    'Form Validation',
    'Dynamic Forms',
    'File Upload',
    'Forms Next.js',
    'Zod validation',
    'Form handling',
    'React forms ไทย'
  ],
  openGraph: {
    title: 'บทที่ 11: Forms & React Hook Form | การสร้างฟอร์มที่มีประสิทธิภาพ',
    description: 'การสร้างฟอร์มที่มีประสิทธิภาพด้วย React Hook Form และ Zod',
    url: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-11',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z',
    modifiedTime: '2024-01-01T00:00:00Z',
    section: 'Tutorial',
    tags: ['React Hook Form', 'Forms', 'Validation', 'File Upload'],
    images: [
      {
        url: '/og-nextjs-lesson-11.png',
        width: 1200,
        height: 630,
        alt: 'บทที่ 11: Forms & React Hook Form',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บทที่ 11: Forms & React Hook Form',
    description: 'การสร้างฟอร์มที่มีประสิทธิภาพด้วย React Hook Form',
    images: ['/og-nextjs-lesson-11.png'],
  },
  alternates: {
    canonical: 'https://tutorial-nextjs-tau-one.vercel.app/nextjs-basics/lesson-11',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Lesson11Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "บทที่ 11: Forms & React Hook Form",
    "description": "การสร้างฟอร์มที่มีประสิทธิภาพด้วย React Hook Form และ Zod React Hook Form Form Validation Dynamic Forms และ File Upload",
    "educationalLevel": "Intermediate",
    "learningResourceType": "Tutorial",
    "teaches": [
      "React Hook Form",
      "Form Validation",
      "Dynamic Forms",
      "File Upload"
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