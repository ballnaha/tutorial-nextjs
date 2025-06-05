import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  School,
  Web,
  Storage,
  CheckCircle,
  Code,
  Palette,
  Build,
  Security,
  Star,
  Language,
  Speed,
  Public,
} from '@mui/icons-material';
import Link from 'next/link';
import { Metadata } from 'next';
import { DonationBalloon } from './components/DonationBalloon';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Next.js Tutorial ไทย - เรียนรู้ Next.js, Material-UI และ Prisma ฟรี',
  description: 'บทเรียน Next.js ภาษาไทยที่สมบูรณ์แบบ เรียนรู้ตั้งแต่พื้นฐานจนใช้งานได้จริง พร้อม Material-UI และ Prisma สำหรับสร้างเว็บแอปพลิเคชันครบครัน',
  keywords: [
    'Next.js tutorial ไทย',
    'เรียน Next.js',
    'React tutorial',
    'Material-UI tutorial',
    'Prisma tutorial',
    'เรียนโปรแกรม',
    'เรียนเว็บไซต์',
    'JavaScript tutorial',
    'TypeScript tutorial',
    'Full Stack tutorial'
  ],
  authors: [{ name: 'Next.js Tutorial Thai' }],
  creator: 'Next.js Tutorial Thai',
  publisher: 'Next.js Tutorial Thai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Next.js Tutorial ไทย - เรียนรู้การสร้างเว็บแอปพลิเคชันฟรี',
    description: 'บทเรียน Next.js ภาษาไทยครบครัน เรียนรู้ Next.js, Material-UI และ Prisma ตั้งแต่เริ่มต้นจนใช้งานได้จริง',
    url: 'https://nextjs-tutorial-thai.com',
    siteName: 'Next.js Tutorial ไทย',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Next.js Tutorial ไทย - เรียนรู้การสร้างเว็บแอปพลิเคชัน'
      }
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Tutorial ไทย - เรียนรู้ Next.js ฟรี',
    description: 'บทเรียน Next.js ภาษาไทยครบครัน เรียนรู้ตั้งแต่พื้นฐานจนใช้งานได้จริง',
    images: ['/twitter-image.png'],
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
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://nextjs-tutorial-thai.com',
    languages: {
      'th': 'https://nextjs-tutorial-thai.com',
      'en': 'https://nextjs-tutorial-thai.com/en',
    },
  },
};

const tutorialCards = [
  {
    title: 'Next.js พื้นฐาน',
    description: 'เรียนรู้ Next.js 15 ตั้งแต่เริ่มต้นจนใช้งานได้จริง ครอบคลุมทุกสิ่งที่จำเป็นสำหรับการพัฒนาเว็บแอปพลิเคชันสมัยใหม่ รวมถึง TypeScript และ Functions',
    icon: <Web sx={{ fontSize: 40 }} />,
    color: '#000000',
    lessons: 18,
    difficulty: 'เริ่มต้น',
    duration: '12-15 ชั่วโมง',
    href: '/nextjs-basics',
    features: [
      'App Router และ Server Components',
      'Client Components และ Hydration',
      'TypeScript & Interface Programming',
      'Functions & Constants ขั้นสูง',
      'API Routes และ Database Integration',
      'Static Site Generation (SSG)',
      'Server-Side Rendering (SSR)',
      'File-based Routing',
      'Authentication และ Authorization',
      'Middleware และ Security',
      'Performance Optimization',
      'Deployment และ Production',
      'Advanced Patterns & Best Practices',
      'Testing และ Code Quality'
    ]
  },
  {
    title: 'Material-UI (MUI)',
    description: 'เรียนรู้การใช้งาน Material-UI Component Library ที่ใหญ่ที่สุดของ React สำหรับสร้าง UI ที่สวยงามและใช้งานง่าย',
    icon: <Palette sx={{ fontSize: 40 }} />,
    color: '#007FFF',
    lessons: 8,
    difficulty: 'ปานกลาง',
    duration: '4-6 ชั่วโมง',
    href: '/mui-tutorial',
    features: [
      'Theme System และ Custom Styling',
      'Material Design Components',
      'Responsive Layout System',
      'Icons และ Typography',
      'Form Components และ Validation',
      'Data Grid และ Data Visualization',
      'Advanced Components',
      'Performance Best Practices'
    ]
  },
  {
    title: 'Prisma & MySQL',
    description: 'เรียนรู้การจัดการฐานข้อมูลด้วย Prisma ORM ที่ทันสมัยที่สุด พร้อม MySQL สำหรับการพัฒนาแอปพลิเคชันระดับ Production',
    icon: <Storage sx={{ fontSize: 40 }} />,
    color: '#2D3748',
    lessons: 10,
    difficulty: 'ปานกลาง',
    duration: '6-8 ชั่วโมง',
    href: '/prisma-tutorial',
    features: [
      'Prisma Schema และ Data Modeling',
      'Database Migrations และ Seeding',
      'CRUD Operations และ Query Building',
      'Relations และ Advanced Queries',
      'Type Safety และ Auto-completion',
      'Performance Optimization',
      'Authentication Integration',
      'Production Deployment'
    ]
  },
  {
    title: 'Workshop',
    description: 'เรียนรู้การสร้างโปรเจคจริงแบบ Hands-on Learning พร้อม Professional Theme Template, Advanced Components และ Best Practices ระดับ Production',
    icon: <Build sx={{ fontSize: 40 }} />,
    color: '#FF6B35',
    lessons: 3,
    difficulty: 'ปานกลาง - สูง',
    duration: '8-12 ชั่วโมง',
    href: '/workshop',
    features: [
      'Professional Theme Template System',
      'Advanced Vertical Menu & Navigation',
      'Smart Submenu Management',
      'Responsive Design Patterns',
      'TypeScript Best Practices',
      'Component Architecture ขั้นสูง',
      'State Management Patterns',
      'Performance Optimization',
      'Production-Ready Code',
      'Interactive Live Demos',
      'Complete Source Code',
      'Real-world Project Examples'
    ]
  },
];

const highlights = [
  { text: 'บทเรียนภาษาไทยที่เข้าใจง่าย', icon: <Language /> },
  { text: 'ตัวอย่างโค้ดที่ใช้งานได้จริง', icon: <Code /> },
  { text: 'Workshop สำหรับฝึกฝนจริง', icon: <Build /> },
  { text: 'เรียนฟรี 100% ไม่มีค่าใช้จ่าย', icon: <CheckCircle /> },
];

const stats = [
  { number: '39', label: 'บทเรียน', icon: <Web /> },
  { number: '100%', label: 'ฟรี', icon: <CheckCircle /> },
];

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Next.js Tutorial ไทย",
  "description": "บทเรียน Next.js ภาษาไทยที่สมบูรณ์แบบ เรียนรู้ตั้งแต่พื้นฐานจนใช้งานได้จริง",
  "url": "https://nextjs-tutorial-thai.com",
  "logo": "https://nextjs-tutorial-thai.com/logo.png",
  "sameAs": [
    "https://github.com/nextjs-tutorial-thai",
    "https://youtube.com/nextjs-tutorial-thai"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "THB",
    "availability": "https://schema.org/InStock"
  },
  "educationalCredentialAwarded": {
    "@type": "EducationalOccupationalCredential",
    "name": "Next.js Development Certificate"
  }
};

const courseStructuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Next.js Tutorial ไทย - เรียนรู้การสร้างเว็บแอปพลิเคชัน",
  "description": "บทเรียน Next.js ภาษาไทยครบครัน เรียนรู้ Next.js, Material-UI, Prisma และ Workshop สำหรับ Hands-on Learning",
  "provider": {
    "@type": "Organization",
    "name": "Next.js Tutorial ไทย"
  },
  "hasCourseInstance": tutorialCards.map(card => ({
    "@type": "CourseInstance",
    "name": card.title,
    "description": card.description,
    "courseMode": "online",
    "duration": card.duration,
    "inLanguage": "th"
  }))
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseStructuredData)
        }}
      />

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box component="section" sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <img src="/next-js.svg" alt="Next.js Tutorial Logo" style={{ width: '150px', height: '150px' , textAlign: 'center'}} />
          </Box>
          <Typography 
            variant="h1" 
            component="h1"
            color="primary" 
            gutterBottom
            sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            Next.js Tutorial ไทย
          </Typography>
          
          <Typography 
            variant="h2" 
            component="h2"
            color="text.secondary" 
            sx={{ 
              mb: 4, 
              maxWidth: '800px', 
              mx: 'auto',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 400
            }}
          >
            เรียนรู้ Next.js 15, TypeScript, Material-UI และ Prisma อย่างครบครันด้วยบทเรียนภาษาไทยที่เข้าใจง่าย พร้อม Workshop สำหรับ Hands-on Learning
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
          เนื้อหาทั้งหมดสร้างมาจาก AI แต่ด้วยจากการใช้ AI ช่วยทำ project มาประมาณ 3 projects ทำให้พอทราบพื้นฐานมาบ้าง เนื่องจากผู้สร้างบทเรียนเป็นมือใหม่เหมือนกัน และต้องการหาแหล่งเรียน แต่เนื่องด้วยเจอแต่เนื้อหาภาษาอังกฤษ จึงต้องสร้างบทเรียนภาษาไทยขึ้นมาเอง จึงอยากจะทำให้ง่ายต่อการเรียนรู้มากขึ้น
          </Typography>

          {/* Statistics */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: { xs: 2, md: 4 }, 
            mb: 4,
            flexWrap: 'wrap'
          }}>
            {stats.map((stat, index) => (
              <Box key={index} sx={{ textAlign: 'center', minWidth: '100px' }}>
                <Box sx={{ color: 'primary.main', mb: 1 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {stat.number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            {highlights.map((highlight, index) => (
              <Chip
                key={index}
                icon={highlight.icon}
                label={highlight.text}
                color="primary"
                variant="outlined"
                sx={{ '& .MuiChip-label': { px: 1 } }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/nextjs-basics"
              variant="contained"
              size="large"
              startIcon={<School />}
              sx={{ fontSize: '1.1rem', px: 4, py: 1.5 }}
            >
              เริ่มเรียนเลย!
            </Button>
            <Button
              component={Link}
              href="#courses"
              variant="outlined"
              size="large"
              startIcon={<Public />}
              sx={{ fontSize: '1.1rem', px: 4, py: 1.5 }}
            >
              ดูบทเรียนทั้งหมด
            </Button>
          </Box>
        </Box>

        {/* Why Choose Us Section */}
        <Box component="section" sx={{ mb: 6 }}>
          <Typography variant="h2" component="h2" textAlign="center" sx={{ mb: 4 }}>
            ทำไมต้องเรียนกับเรา?
          </Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
            gap: 3
          }}>
            <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Language color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                ภาษาไทย 100%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                บทเรียนทั้งหมดเป็นภาษาไทยที่เข้าใจง่าย ไม่ต้องกังวลเรื่องภาษา
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Speed color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                เทคโนโลยีล่าสุด
              </Typography>
              <Typography variant="body2" color="text.secondary">
                อัปเดตตาม Next.js 15, React 19, TypeScript และเทคโนโลยีใหม่ล่าสุดเสมอ
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Code color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                ใช้งานได้จริง
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ตัวอย่างโค้ดและโปรเจคที่สามารถนำไปใช้งานจริงได้ทันที พร้อม Interactive Demo
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <CheckCircle color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                ฟรี 100%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                เรียนฟรีทุกบทเรียน ไม่มีค่าใช้จ่ายแอบแฝง ไม่ต้องสมัครสมาชิก
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Tutorial Cards Section */}
        <Box component="section" id="courses" sx={{ mb: 6 }}>
          <Typography variant="h2" component="h2" textAlign="center" sx={{ mb: 2 }}>
            บทเรียนทั้งหมด
          </Typography>
          
          <Typography 
            variant="body1" 
            textAlign="center" 
            color="text.secondary" 
            sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
          >
            เรียนรู้การพัฒนาเว็บแอปพลิเคชันครบวงจร ตั้งแต่ Frontend ด้วย Next.js, TypeScript และ Material-UI 
            ไปจนถึง Backend ด้วย Prisma และ MySQL พร้อม Workshop สำหรับฝึกทำโปรเจคจริง
          </Typography>

          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              md: '1fr 1fr', 
              xl: '1fr 1fr 1fr 1fr' 
            },
            gap: 3,
            alignItems: 'stretch'
          }}>
            {tutorialCards.map((card, index) => (
              <Card 
                key={index}
                component="article"
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: 6,
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                    <Avatar sx={{ bgcolor: card.color, mr: 2, width: 56, height: 56 }}>
                      {card.icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                        {card.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <Chip label={`${card.lessons} บท`} size="small" />
                        <Chip label={card.difficulty} size="small" color="secondary" />
                        <Chip label={card.duration} size="small" variant="outlined" />
                      </Box>
                    </Box>
                  </Box>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {card.description}
                  </Typography>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    สิ่งที่จะได้เรียนรู้:
                  </Typography>
                  <List dense>
                    {card.features.slice(0, 6).map((feature, idx) => (
                      <ListItem key={idx} sx={{ py: 0.25, pl: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CheckCircle color="primary" sx={{ fontSize: 16 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                    {card.features.length > 6 && (
                      <ListItem sx={{ py: 0.25, pl: 0 }}>
                        <ListItemText 
                          primary={`และอีก ${card.features.length - 6} หัวข้อ...`}
                          primaryTypographyProps={{ 
                            variant: 'body2', 
                            fontStyle: 'italic',
                            color: 'text.secondary'
                          }}
                        />
                      </ListItem>
                    )}
                  </List>
                </CardContent>
                
                <CardActions sx={{ p: 2 }}>
                  <Button
                    component={Link}
                    href={card.href}
                    variant="contained"
                    fullWidth
                    startIcon={<School />}
                    size="large"
                  >
                    เริ่มเรียน {card.title}
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Getting Started Section */}
        <Paper component="section" sx={{ p: 4, mb: 4, bgcolor: 'grey.50' }}>
          <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 2 }}>
            เริ่มต้นเรียนอย่างไร?
          </Typography>
          
          <Typography 
            variant="body1" 
            textAlign="center" 
            color="text.secondary" 
            sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
          >
            ไม่ต้องมีพื้นฐานการเขียนโปรแกรม เราจะสอนทุกอย่างตั้งแต่เริ่มต้น
          </Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 3
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ 
                bgcolor: 'primary.main', 
                mx: 'auto', 
                mb: 2, 
                width: 64, 
                height: 64,
                fontSize: '1.5rem'
              }}>
                1️⃣
              </Avatar>
              <Typography variant="h6" sx={{ mb: 1 }}>
                เตรียมสภาพแวดล้อม
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ติดตั้ง Node.js และ IDE ที่เหมาะสม เราจะแนะนำทุกขั้นตอน
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ 
                bgcolor: 'secondary.main', 
                mx: 'auto', 
                mb: 2, 
                width: 64, 
                height: 64,
                fontSize: '1.5rem'
              }}>
                2️⃣
              </Avatar>
              <Typography variant="h6" sx={{ mb: 1 }}>
                เรียนตามลำดับ
              </Typography>
              <Typography variant="body2" color="text.secondary">
                เริ่มจาก Next.js พื้นฐานก่อน แล้วไปต่อ Material-UI, Prisma และ Workshop ขั้นสูง
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Avatar sx={{ 
                bgcolor: 'success.main', 
                mx: 'auto', 
                mb: 2, 
                width: 64, 
                height: 64,
                fontSize: '1.5rem'
              }}>
                3️⃣
              </Avatar>
              <Typography variant="h6" sx={{ mb: 1 }}>
                ฝึก Workshop จริง
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ลองสร้างโปรเจคจริงใน Workshop และแอปพลิเคชันตามที่เรียนเพื่อฝึกฝนทักษะ
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* FAQ Section for SEO */}
        <Box component="section" sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" textAlign="center" sx={{ mb: 4 }}>
            คำถามที่พบบ่อย (FAQ)
          </Typography>

          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Paper sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                ต้องมีพื้นฐานการเขียนโปรแกรมมาก่อนไหม?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ไม่จำเป็น! แต่ถ้ามีจะดีมาก บทเรียนของเราเริ่มต้นจากพื้นฐาน อธิบายทุกขั้นตอนอย่างละเอียด 
                แต่หากมีพื้นฐาน HTML, CSS และ JavaScript เล็กน้อยจะช่วยให้เข้าใจได้เร็วขึ้น
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                ใช้เวลาเรียนนานแค่ไหน?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ขึ้นอยู่กับเวลาที่มี หากเรียนวันละ 1-2 ชั่วโมง ใช้เวลาประมาณ 3-4 สัปดาห์ 
                จะสามารถเรียนจบทั้ง 18 บทและสร้างแอปพลิเคชันได้
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                หลังเรียนจบแล้วสามารถทำอะไรได้บ้าง?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                สามารถสร้างเว็บแอปพลิเคชันแบบ Full Stack ได้ เช่น เว็บร้านค้า, Blog, 
                ระบบจัดการข้อมูล หรือแอปพลิเคชันอื่นๆ ตามความต้องการ พร้อม TypeScript ที่ปลอดภัย 
                และสามารถนำ Workshop ไปปรับใช้สร้างระบบ Admin Dashboard ระดับมืออาชีพได้
              </Typography>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                มีค่าใช้จ่ายหรือไม่?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ไม่มีค่าใช้จ่ายเพิ่มเติม เรียนฟรีทั้งหมด เพียงมีคอมพิวเตอร์และอินเทอร์เน็ตก็สามารถเรียนรู้ได้ แต่ถ้าบริจาคค่า AI ให้ทางเราจะขอบคุณมากๆ 🤖
                
              </Typography>
              
            </Paper>

          </Box>
        </Box>

        {/* Call to Action */}
        <Box component="section" sx={{ textAlign: 'center', py: 6, bgcolor: 'primary.light', borderRadius: 2, mb: 4 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 2, color: 'primary.dark' }}>
            พร้อมเริ่มต้นเรียนรู้แล้วใช่ไหม?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'primary.dark', maxWidth: '600px', mx: 'auto' }}>
            เริ่มต้นเรียน Next.js วันนี้ และสร้างเว็บแอปพลิเคชันแรกของคุณ!
          </Typography>
          <Button
            component={Link}
            href="/nextjs-basics"
            variant="contained"
            size="large"
            startIcon={<School />}
            sx={{ 
              fontSize: '1.2rem', 
              px: 6, 
              py: 2,
              bgcolor: 'primary.dark',
              '&:hover': {
                bgcolor: 'primary.main'
              }
            }}
          >
            เริ่มเรียน Next.js เลย!
          </Button>
        </Box>
      </Container>

      {/* Donation Balloon */}
      <DonationBalloon />
    </>
  );
}
