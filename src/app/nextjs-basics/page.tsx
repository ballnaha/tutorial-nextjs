'use client';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Stack,
  Avatar,
  LinearProgress,
  Breadcrumbs,
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  Speed,
  Security,
  Code,
  TrendingUp,
  CheckCircle,
  Schedule,
  Star,
  Rocket,
  Home,
  NavigateNext,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: 'เริ่มต้น' | 'ปานกลาง' | 'ขั้นสูง';
  topics: string[];
  emoji: string;
  status: 'available' | 'coming-soon';
  estimatedTime?: number;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'เริ่มต้นกับ Next.js',
    description: 'เรียนรู้พื้นฐานการติดตั้งและใช้งาน Next.js 15 พร้อม TypeScript และ MUI',
    duration: '45 นาที',
    level: 'เริ่มต้น',
    topics: ['การติดตั้ง Next.js', 'โครงสร้างโปรเจค', 'TypeScript', 'MUI Setup'],
    emoji: '🚀',
    status: 'available',
    estimatedTime: 45
  },
  {
    id: 2,
    title: 'File-based Routing',
    description: 'ทำความเข้าใจ App Router และการจัดการ routing ใน Next.js 15',
    duration: '30 นาที',
    level: 'เริ่มต้น',
    topics: ['App Router', 'Dynamic Routes', 'Route Groups', 'Layout'],
    emoji: '📁',
    status: 'available',
    estimatedTime: 30
  },
  {
    id: 3,
    title: 'Server vs Client Components',
    description: 'เข้าใจความแตกต่างระหว่าง Server และ Client Components ใน React 19',
    duration: '25 นาที',
    level: 'ปานกลาง',
    topics: ['Server Components', 'Client Components', 'Hydration', 'Performance'],
    emoji: '🔄',
    status: 'available',
    estimatedTime: 25
  },
  {
    id: 4,
    title: 'Link และ Navigation',
    description: 'การใช้งาน Next.js Link และ Navigation ที่มีประสิทธิภาพ',
    duration: '20 นาที',
    level: 'เริ่มต้น',
    topics: ['Next.js Link', 'useRouter', 'Programmatic Navigation', 'Prefetching'],
    emoji: '🔗',
    status: 'available',
    estimatedTime: 20
  },
  {
    id: 5,
    title: 'Data Fetching & API Routes',
    description: 'เรียนรู้การดึงข้อมูลและสร้าง API ใน Next.js 15',
    duration: '40 นาที',
    level: 'ปานกลาง',
    topics: ['fetch API', 'API Routes', 'Server Actions', 'Error Handling'],
    emoji: '📊',
    status: 'available',
    estimatedTime: 40
  },
  {
    id: 6,
    title: 'Prisma & Database',
    description: 'การใช้งาน Prisma 6.8.0 สำหรับจัดการฐานข้อมูลพร้อมฟีเจอร์ใหม่',
    duration: '50 นาที',
    level: 'ปานกลาง',
    topics: ['Prisma Setup', 'Schema Design', 'CRUD Operations', 'TypedSQL'],
    emoji: '🗄️',
    status: 'available',
    estimatedTime: 50
  },
  {
    id: 7,
    title: 'React Hooks (useState & useEffect)',
    description: 'เรียนรู้ React Hooks สำคัญและการใช้งานใน Next.js 15',
    duration: '35 นาที',
    level: 'ปานกลาง',
    topics: ['useState', 'useEffect', 'Custom Hooks', 'State Management'],
    emoji: '🪝',
    status: 'available',
    estimatedTime: 35
  },
  {
    id: 8,
    title: 'Zod Validation',
    description: 'การใช้ Zod สำหรับ type-safe validation และ schema validation',
    duration: '40 นาที',
    level: 'ปานกลาง',
    topics: ['Schema Validation', 'Form Validation', 'API Validation', 'Type Inference'],
    emoji: '🛡️',
    status: 'available',
    estimatedTime: 40
  },
  {
    id: 9,
    title: 'Authentication & Authorization',
    description: 'การสร้างระบบ authentication ด้วย NextAuth.js และ JWT',
    duration: '60 นาที',
    level: 'ขั้นสูง',
    topics: ['NextAuth.js', 'JWT', 'Session Management', 'Protected Routes'],
    emoji: '🔐',
    status: 'available',
    estimatedTime: 60
  },
  {
    id: 10,
    title: 'State Management (Zustand)',
    description: 'การจัดการ global state ด้วย Zustand อย่างมีประสิทธิภาพ',
    duration: '45 นาที',
    level: 'ปานกลาง',
    topics: ['Zustand Store', 'Persist Middleware', 'Devtools', 'TypeScript Integration'],
    emoji: '🏪',
    status: 'available',
    estimatedTime: 45
  },
  {
    id: 11,
    title: 'Forms & React Hook Form',
    description: 'การสร้างฟอร์มที่มีประสิทธิภาพด้วย React Hook Form และ Zod',
    duration: '50 นาที',
    level: 'ปานกลาง',
    topics: ['React Hook Form', 'Form Validation', 'Dynamic Forms', 'File Upload'],
    emoji: '📝',
    status: 'available',
    estimatedTime: 50
  },
  {
    id: 12,
    title: 'Middleware & Security',
    description: 'การใช้ Next.js Middleware สำหรับ security และ request handling',
    duration: '40 นาที',
    level: 'ขั้นสูง',
    topics: ['Middleware', 'CORS', 'Rate Limiting', 'Security Headers'],
    emoji: '🛡️',
    status: 'available',
    estimatedTime: 40
  },
  {
    id: 13,
    title: 'Testing (Jest & Testing Library)',
    description: 'การเขียน unit tests และ integration tests สำหรับ Next.js',
    duration: '55 นาที',
    level: 'ขั้นสูง',
    topics: ['Jest Setup', 'Testing Library', 'Component Testing', 'API Testing'],
    emoji: '🧪',
    status: 'available',
    estimatedTime: 55
  },
  {
    id: 14,
    title: 'Performance Optimization',
    description: 'การเพิ่มประสิทธิภาพแอปพลิเคชัน Next.js ด้วยเทคนิคต่างๆ',
    duration: '45 นาที',
    level: 'ขั้นสูง',
    topics: ['Image Optimization', 'Code Splitting', 'Caching', 'Bundle Analysis'],
    emoji: '⚡',
    status: 'available',
    estimatedTime: 45
  },
  {
    id: 15,
    title: 'Deployment & DevOps',
    description: 'การ deploy Next.js app ไปยัง Vercel, Docker และ cloud platforms',
    duration: '50 นาที',
    level: 'ขั้นสูง',
    topics: ['Vercel Deployment', 'Docker', 'Environment Variables', 'CI/CD'],
    emoji: '🚀',
    status: 'available',
    estimatedTime: 50
  },
  {
    id: 16,
    title: 'Advanced Patterns & Best Practices',
    description: 'รูปแบบขั้นสูงและ best practices สำหรับ Next.js applications',
    duration: '60 นาที',
    level: 'ขั้นสูง',
    topics: ['Design Patterns', 'Architecture', 'Error Boundaries', 'Production Tips'],
    emoji: '🎯',
    status: 'available',
    estimatedTime: 60
  },
  {
    id: 17,
    title: 'TypeScript & Interface ใน Next.js',
    description: 'เรียนรู้การใช้ TypeScript และการสร้าง Interface เพื่อเขียนโค้ดที่ปลอดภัย',
    duration: '50 นาที',
    level: 'ปานกลาง',
    topics: ['TypeScript Basics', 'Interface Definition', 'Component Props', 'Generic Types'],
    emoji: '🛡️',
    status: 'available',
    estimatedTime: 50
  },
  {
    id: 18,
    title: 'Functions & Constants อย่างละเอียด',
    description: 'เรียนรู้การเขียน Functions และการใช้ Constants ใน JavaScript/TypeScript',
    duration: '45 นาที',
    level: 'เริ่มต้น',
    topics: ['Function Types', 'Arrow Functions', 'Constants & Scope', 'Best Practices'],
    emoji: '⚡',
    status: 'available',
    estimatedTime: 45
  }
];

const features = [
  { 
    icon: <Speed />, 
    title: 'High Performance', 
    desc: 'Built-in optimizations for lightning-fast applications',
    color: '#8BB7ED'
  },
  { 
    icon: <Security />, 
    title: 'Enterprise Security', 
    desc: 'Production-ready security features out of the box',
    color: '#68D391'
  },
  { 
    icon: <Code />, 
    title: 'Developer Experience', 
    desc: 'Modern tooling with TypeScript and hot reload',
    color: '#FBD38D'
  },
  { 
    icon: <TrendingUp />, 
    title: 'Scalable Architecture', 
    desc: 'From prototype to enterprise-grade applications',
    color: '#FC8181'
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'เริ่มต้น': return 'success';
    case 'ปานกลาง': return 'warning';
    case 'ขั้นสูง': return 'error';
    default: return 'default';
  }
};

const getLevelProgress = (level: string) => {
  switch (level) {
    case 'เริ่มต้น': return 25;
    case 'ปานกลาง': return 65;
    case 'ขั้นสูง': return 90;
    default: return 0;
  }
};

export default function NextJSBasicsPage() {
  const [expandedLesson, setExpandedLesson] = useState<number | false>(false);
  
  const totalLessons = lessons.length;
  const availableLessons = lessons.filter(lesson => lesson.status === 'available').length;
  const totalTime = lessons.reduce((sum, lesson) => sum + (lesson.estimatedTime || 0), 0);
  const completionRate = (availableLessons / totalLessons) * 100;

  const handleAccordionChange = (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedLesson(isExpanded ? panel : false);
  };

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "หลักสูตร Next.js 15 สำหรับมือใหม่",
    "description": "เรียนรู้ Next.js 15, React 19, TypeScript และ Prisma จากศูนย์สู่มืออาชีพ หลักสูตรฟรีสำหรับมือใหม่หัดเขียนโปรแกรม",
    "provider": {
      "@type": "Organization",
      "name": "Next.js Tutorial Thailand",
      "url": "https://your-domain.com"
    },
    "educationalLevel": "Beginner to Advanced",
    "programmingLanguage": ["JavaScript", "TypeScript"],
    "teaches": [
      "Next.js 15",
      "React 19", 
      "TypeScript",
      "Prisma 6.8",
      "Full-stack Development",
      "Database Management",
      "Authentication",
      "API Development"
    ],
    "courseMode": "online",
    "inLanguage": "th",
    "isAccessibleForFree": true,
    "totalTime": `PT${Math.floor(totalTime / 60)}H${totalTime % 60}M`,
    "numberOfLessons": lessons.length,
    "availableLessons": availableLessons,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "instructor": {
        "@type": "Person",
        "name": "Next.js Tutorial Thailand"
      }
    },
    "about": [
      {
        "@type": "DefinedTerm",
        "name": "Next.js",
        "description": "React framework for production"
      },
      {
        "@type": "DefinedTerm", 
        "name": "React",
        "description": "JavaScript library for building user interfaces"
      },
      {
        "@type": "DefinedTerm",
        "name": "TypeScript", 
        "description": "Typed superset of JavaScript"
      },
      {
        "@type": "DefinedTerm",
        "name": "Prisma",
        "description": "Next-generation database toolkit"
      }
    ]
  };

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          aria-label="breadcrumb" 
          sx={{ py: 2 }}
          separator={<NavigateNext fontSize="small" />}
        >
          <Link href="/" style={{ 
            textDecoration: 'none', 
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Home sx={{ fontSize: 16 }} />
            หน้าหลัก
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Code sx={{ fontSize: 16 }} />
            Next.js พื้นฐาน
          </Typography>
        </Breadcrumbs>

        {/* Minimal Banner */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
              <Code />
            </Avatar>
            Next.js พื้นฐาน
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 3, maxWidth: '600px' }}
          >
            เรียนรู้ Next.js 15 ตั้งแต่เริ่มต้นจนใช้งานได้จริง ครอบคลุม Server Components, 
            App Router และฟีเจอร์ใหม่ล่าสุด
          </Typography>

          {/* Quick Stats */}
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <Chip 
              icon={<CheckCircle />}
              label={`${availableLessons}/${totalLessons} บทเรียน`} 
              color="primary" 
              variant="outlined"
            />
            <Chip 
              icon={<Schedule />}
              label={`${Math.floor(totalTime / 60)} ชั่วโมง ${totalTime % 60} นาที`} 
              color="secondary" 
              variant="outlined"
            />
            <Chip 
              label="ฟรี 100%" 
              color="success" 
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Course Features Section */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Why Choose This Course */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              ทำไมต้องเรียนหลักสูตรนี้?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              หลักสูตรที่ออกแบบมาเพื่อมือใหม่โดยเฉพาะ พร้อมตัวอย่างจริงและ interactive demos
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, 
              gap: 3 
            }}>
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: feature.color + '20',
                      color: feature.color,
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Technology Stack */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              เทคโนโลยีที่จะได้เรียนรู้
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
              {[
                { name: 'Next.js 15', color: '#2D3748' },
                { name: 'React 19', color: '#63B3ED' },
                { name: 'TypeScript', color: '#5C9EE8' },
                { name: 'MUI v6', color: '#8BB7ED' },
                { name: 'Prisma 6.8', color: '#4A5568' },
                { name: 'Zod', color: '#2D3748' },
              ].map((tech) => (
                <Chip
                  key={tech.name}
                  label={tech.name}
                  sx={{
                    px: 2,
                    py: 0.5,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    bgcolor: `${tech.color}15`,
                    color: tech.color,
                    border: `2px solid ${tech.color}25`,
                    '&:hover': {
                      bgcolor: `${tech.color}20`,
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Available Lessons */}
          <Box id="course-content" sx={{ mb: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  📚 บทเรียนที่พร้อมใช้งาน
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {availableLessons} บทเรียน • เริ่มเรียนได้ทันที • อัพเดตเนื้อหาสม่ำเสมอ
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip 
                  icon={<CheckCircle />}
                  label={`${availableLessons}/${totalLessons} พร้อมใช้งาน`}
                  color="success"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
                <Chip 
                  label={`${Math.round(totalTime / 60)} ชม. ${totalTime % 60} นาที`}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Box>
            
            {/* SEO Content for Lessons */}
            <Box sx={{ 
              bgcolor: 'primary.50', 
              p: 3, 
              borderRadius: 2, 
              mb: 4,
              border: '1px solid',
              borderColor: 'primary.100'
            }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                🎯 เนื้อหาหลักสูตรที่คุณจะได้เรียนรู้
              </Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
                gap: 2 
              }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>📱 Frontend Development:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Next.js 15, React 19, TypeScript, MUI v6, React Hook Form, State Management
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>🗄️ Backend Development:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    API Routes, Prisma 6.8, Database, Authentication, Middleware, Security
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>🛠️ Tools & Libraries:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Zod Validation, Zustand, Testing, Performance, Deployment
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>🎯 เหมาะสำหรับ:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    มือใหม่หัดเขียนโปรแกรม, นักเรียน, นักศึกษา, นักพัฒนาที่ต้องการอัพสกิล
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
              {lessons.map((lesson) => (
                <Card 
                  key={lesson.id}
                  component={Link}
                  href={`/nextjs-basics/lesson-${lesson.id}`}
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      bgcolor: getLevelColor(lesson.level) === 'success' ? '#48BB78' : 
                                getLevelColor(lesson.level) === 'warning' ? '#F6AD55' : '#F56565',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'grey.100', 
                          color: 'text.primary',
                          width: 48,
                          height: 48,
                          fontSize: '1.5rem',
                          mr: 2
                        }}
                      >
                        {lesson.emoji}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, lineHeight: 1.3 }}>
                          บทที่ {lesson.id}: {lesson.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={lesson.level} 
                            size="small"
                            color={getLevelColor(lesson.level) as any}
                            variant="outlined"
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                            <Schedule sx={{ fontSize: 14, mr: 0.5 }} />
                            <Typography variant="caption">{lesson.duration}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1, lineHeight: 1.5 }}>
                      {lesson.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          ความยาก
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {getLevelProgress(lesson.level)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={getLevelProgress(lesson.level)}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 2,
                            bgcolor: getLevelColor(lesson.level) === 'success' ? '#48BB78' : 
                                     getLevelColor(lesson.level) === 'warning' ? '#F6AD55' : '#F56565',
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {lesson.topics.slice(0, 3).map((topic, index) => (
                        <Chip 
                          key={index}
                          label={topic} 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.7rem',
                            height: 24,
                            bgcolor: 'grey.50',
                          }}
                        />
                      ))}
                      {lesson.topics.length > 3 && (
                        <Chip 
                          label={`+${lesson.topics.length - 3}`} 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.7rem',
                            height: 24,
                            bgcolor: 'grey.50',
                          }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Coming Soon Lessons */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              บทเรียนที่กำลังจะมา
            </Typography>
            
            <Accordion 
              sx={{ 
                bgcolor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                borderRadius: 2,
                '&:before': { display: 'none' }
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMore />}
                sx={{ 
                  px: 3,
                  py: 2,
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'grey.100' }}>
                    <Star color="warning" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      เร็วๆ นี้ ({lessons.filter(l => l.status === 'coming-soon').length} บทเรียน)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      บทเรียนขั้นสูงที่กำลังพัฒนา
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                  {lessons.filter(l => l.status === 'coming-soon').map((lesson) => (
                    <Card 
                      key={lesson.id} 
                      sx={{ 
                        opacity: 0.8,
                        border: '2px dashed',
                        borderColor: 'grey.300',
                        bgcolor: 'grey.50',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          opacity: 1,
                          borderColor: 'primary.main',
                          bgcolor: 'primary.50',
                        }
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 500, mr: 1 }}>
                            {lesson.emoji} {lesson.title}
                          </Typography>
                          <Chip 
                            label={lesson.level} 
                            size="small"
                            color={getLevelColor(lesson.level) as any}
                            variant="outlined"
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {lesson.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 1 }}>
                          <Schedule sx={{ fontSize: 14, mr: 0.5 }} />
                          <Typography variant="caption">{lesson.duration}</Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {lesson.topics.slice(0, 2).map((topic, index) => (
                            <Chip 
                              key={index}
                              label={topic} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontSize: '0.65rem', opacity: 0.7 }}
                            />
                          ))}
                          {lesson.topics.length > 2 && (
                            <Chip 
                              label={`+${lesson.topics.length - 2} เพิ่มเติม`} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontSize: '0.65rem', opacity: 0.7 }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Call to Action */}
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #5C9EE8 0%, #4285C7 100%)',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M20 20c0-11.05 8.95-20 20-20s20 8.95 20 20-8.95 20-20 20-20-8.95-20-20z"/%3E%3C/g%3E%3C/svg%3E")',
              }
            }}
          >
            <CardContent sx={{ py: 6, position: 'relative', zIndex: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                พร้อมเป็น Next.js Developer แล้วหรือยัง?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                เริ่มต้นการเดินทางสู่การเป็น Full-stack Developer ด้วย Next.js
                จากพื้นฐานไปจนถึงระดับมืออาชีพ
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Rocket />}
                component={Link}
                href="/nextjs-basics/lesson-1"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                  }
                }}
              >
                เริ่มเรียนบทที่ 1
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Container>
    </>
  );
} 