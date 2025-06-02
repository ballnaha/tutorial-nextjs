import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'หลักสูตร Next.js 15 สำหรับมือใหม่ | เรียนฟรี React TypeScript Prisma',
  description: 'เรียนรู้ Next.js 15, React 19, TypeScript และ Prisma จากศูนย์สู่มืออาชีพ หลักสูตรฟรีสำหรับมือใหม่หัดเขียนโปรแกรม พร้อม interactive demos และตัวอย่างจริง',
  keywords: [
    'Next.js 15',
    'React 19', 
    'TypeScript',
    'Prisma 6.8',
    'หลักสูตรมือใหม่',
    'เรียนโปรแกรมฟรี',
    'Full-stack Developer',
    'Frontend Development',
    'Backend Development',
    'MUI v6',
    'Zod Validation',
    'Zustand',
    'React Hook Form',
    'Authentication',
    'Database',
    'API Development',
    'Web Development ไทย',
    'สอนเขียนโปรแกรม',
    'Next.js ภาษาไทย',
    'React Tutorial',
    'TypeScript สำหรับมือใหม่'
  ],
  authors: [{ name: 'Next.js Tutorial Thailand' }],
  creator: 'Next.js Tutorial Thailand',
  publisher: 'Next.js Tutorial Thailand',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'หลักสูตร Next.js 15 สำหรับมือใหม่ | เรียนฟรี',
    description: 'เรียนรู้ Next.js 15, React 19, TypeScript และ Prisma จากศูนย์สู่มืออาชีพ หลักสูตรฟรีสำหรับมือใหม่',
    url: 'https://your-domain.com/nextjs-basics',
    siteName: 'Next.js Tutorial Thailand',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'หลักสูตร Next.js 15 สำหรับมือใหม่',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'หลักสูตร Next.js 15 สำหรับมือใหม่',
    description: 'เรียนรู้ Next.js 15, React 19, TypeScript และ Prisma จากศูนย์สู่มืออาชีพ',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function NextJSBasicsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 