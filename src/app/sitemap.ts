import { MetadataRoute } from 'next'

// กำหนดค่าสำหรับ static export
export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nextjs-tutorial-thai.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/nextjs-basics`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mui-tutorial`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/prisma-tutorial`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Next.js lessons
  const nextjsLessons = Array.from({ length: 16 }, (_, i) => ({
    url: `${baseUrl}/nextjs-basics/lesson-${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // MUI tutorial lessons
  const muiLessons = Array.from({ length: 8 }, (_, i) => ({
    url: `${baseUrl}/mui-tutorial/lesson-${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Prisma tutorial lessons
  const prismaLessons = Array.from({ length: 10 }, (_, i) => ({
    url: `${baseUrl}/prisma-tutorial/lesson-${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...nextjsLessons,
    ...muiLessons,
    ...prismaLessons,
  ]
} 