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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Avatar,
  Breadcrumbs,
  LinearProgress,
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  Code,
  CheckCircle,
  Palette,
  Brush,
  Dashboard,
  TableChart,
  Edit,
  Widgets,
  DevicesOther,
  ColorLens,
  Schedule,
  Star,
  Speed,
  Security,
  Home,
  NavigateNext,
  Storage,
  Dataset,
  Build,
  CloudSync,
  AccountTree,
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
  code?: string;
  status: 'available' | 'coming-soon';
  estimatedTime?: number;
  emoji: string;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'เริ่มต้นกับ Prisma ORM',
    description: 'ทำความรู้จักกับ Prisma และการติดตั้งร่วมกับ MySQL/PostgreSQL',
    duration: '30 นาที',
    level: 'เริ่มต้น',
    topics: ['Prisma คืออะไร?', 'ข้อดีของ ORM', 'การติดตั้ง Prisma', 'การตั้งค่าฐานข้อมูล', 'Prisma Client'],
    status: 'available',
    estimatedTime: 30,
    emoji: '🗄️',
    code: `npm install prisma @prisma/client
npx prisma init

// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}`
  },
  {
    id: 2,
    title: 'Prisma Schema Design',
    description: 'การออกแบบและเขียน Schema สำหรับฐานข้อมูลอย่างมีประสิทธิภาพ',
    duration: '35 นาที',
    level: 'เริ่มต้น',
    topics: ['Data Types', 'Fields และ Attributes', 'Primary Key และ Unique', 'Default Values', 'Schema Validation'],
    status: 'available',
    estimatedTime: 35,
    emoji: '📋',
    code: `model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}`
  },
  {
    id: 3,
    title: 'Prisma Client API',
    description: 'เรียนรู้การใช้งาน Prisma Client สำหรับ CRUD operations แบบ type-safe',
    duration: '50 นาที',
    level: 'ปานกลาง',
    topics: ['Setup Prisma Client', 'Create Operations', 'Read Operations', 'Update Operations', 'Delete Operations'],
    status: 'available',
    estimatedTime: 50,
    emoji: '💻',
    code: `// การสร้างข้อมูล
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John Doe'
  }
})

// การค้นหาข้อมูล
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: '@example.com'
    }
  },
  include: {
    posts: true
  }
})`
  },
  {
    id: 4,
    title: 'Relations และ Associations',
    description: 'การสร้างความสัมพันธ์ระหว่างตารางต่างๆ และการจัดการ Foreign Keys',
    duration: '40 นาที',
    level: 'ปานกลาง',
    topics: ['One-to-One Relations', 'One-to-Many Relations', 'Many-to-Many Relations', 'Self Relations', 'Referential Actions'],
    status: 'available',
    estimatedTime: 40,
    emoji: '🔗',
  },
  {
    id: 5,
    title: 'Migrations และ Database Management',
    description: 'การจัดการการเปลี่ยนแปลงโครงสร้างฐานข้อมูลด้วย Prisma Migrate',
    duration: '25 นาที',
    level: 'ปานกลาง',
    topics: ['การสร้าง Migration', 'Migration History', 'Database Reset', 'Production Migrations', 'Schema Drift'],
    status: 'available',
    estimatedTime: 25,
    emoji: '🔄',
  },
  {
    id: 6,
    title: 'Advanced Queries และ Performance',
    description: 'การค้นหาและกรองข้อมูลขั้นสูงพร้อมเทคนิคเพิ่มประสิทธิภาพ',
    duration: '50 นาที',
    level: 'ปานกลาง',
    topics: ['Where Conditions', 'Sorting และ Ordering', 'Pagination', 'Select และ Include', 'Query Optimization'],
    status: 'available',
    estimatedTime: 50,
    emoji: '🔍',
  },
  {
    id: 7,
    title: 'Prisma with Next.js API Routes',
    description: 'การสร้าง RESTful API และ GraphQL endpoints ด้วย Prisma และ Next.js',
    duration: '45 นาที',
    level: 'ปานกลาง',
    topics: ['API Routes Setup', 'RESTful API', 'GraphQL Integration', 'Error Handling', 'Authentication'],
    status: 'available',
    estimatedTime: 45,
    emoji: '🚀',
  },
  {
    id: 8,
    title: 'Authentication และ Security',
    description: 'การจัดการ user authentication, authorization และ data security',
    duration: '35 นาที',
    level: 'ปานกลาง',
    topics: ['User Authentication', 'Role-based Access', 'Data Validation', 'Security Best Practices', 'JWT Integration'],
    status: 'available',
    estimatedTime: 35,
    emoji: '🔐',
  },
  {
    id: 9,
    title: 'Prisma Studio และ Tools',
    description: 'การใช้ Prisma Studio และเครื่องมือต่างๆ สำหรับจัดการฐานข้อมูล',
    duration: '20 นาที',
    level: 'เริ่มต้น',
    topics: ['Prisma Studio', 'Database Browser', 'Visual Query Builder', 'Data Seeding', 'Database Introspection'],
    status: 'available',
    estimatedTime: 20,
    emoji: '🎨',
  },
  {
    id: 10,
    title: 'TypedSQL และ Raw Queries',
    description: 'การใช้ Raw SQL queries และ TypedSQL ใน Prisma 6.8+',
    duration: '40 นาที',
    level: 'ขั้นสูง',
    topics: ['Raw SQL Queries', 'TypedSQL', 'SQL Template Literals', 'Performance Optimization', 'Complex Queries'],
    status: 'available',
    estimatedTime: 40,
    emoji: '💾',
  },
  {
    id: 11,
    title: 'Testing กับ Prisma',
    description: 'การเขียน unit tests และ integration tests สำหรับ Prisma',
    duration: '40 นาที',
    level: 'ขั้นสูง',
    topics: ['Test Database Setup', 'Mocking Prisma', 'Integration Testing', 'Database Fixtures', 'Test Isolation'],
    status: 'available',
    estimatedTime: 40,
    emoji: '🧪',
  },
  {
    id: 12,
    title: 'Deployment และ Production',
    description: 'การ deploy Prisma application ใน production environments',
    duration: '50 นาที',
    level: 'ขั้นสูง',
    topics: ['Environment Setup', 'Migration Deployment', 'Connection Security', 'Monitoring', 'Backup Strategies'],
    status: 'available',
    estimatedTime: 50,
    emoji: '🌐',
  },
];

const features = [
  {
    icon: <Storage />,
    title: 'Type-Safe Database',
    desc: 'ฐานข้อมูลที่ปลอดภัยด้วย TypeScript และ auto-completion เต็มรูปแบบ',
    color: '#1976d2'
  },
  {
    icon: <Code />,
    title: 'Modern ORM',
    desc: 'ORM รุ่นใหม่ที่ออกแบบมาสำหรับ JavaScript/TypeScript โดยเฉพาะ',
    color: '#388e3c'
  },
  {
    icon: <Speed />,
    title: 'High Performance',
    desc: 'ประสิทธิภาพสูงด้วย connection pooling และ query optimization',
    color: '#f57c00'
  },
  {
    icon: <Build />,
    title: 'Developer Experience',
    desc: 'เครื่องมือครบครันสำหรับนักพัฒนา พร้อม Prisma Studio และ CLI',
    color: '#7b1fa2'
  }
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
    case 'เริ่มต้น': return 30;
    case 'ปานกลาง': return 60;
    case 'ขั้นสูง': return 90;
    default: return 0;
  }
};

export default function PrismaTutorialPage() {
  const [expandedLesson, setExpandedLesson] = useState<number | false>(false);
  
  const totalLessons = lessons.length;
  const availableLessons = lessons.filter(lesson => lesson.status === 'available').length;
  const totalTime = lessons.reduce((sum, lesson) => sum + (lesson.estimatedTime || 0), 0);
  const comingSoonLessons = lessons.filter(lesson => lesson.status === 'coming-soon');

  const handleAccordionChange = (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedLesson(isExpanded ? panel : false);
  };

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "หลักสูตร Prisma ORM สำหรับมือใหม่",
    "description": "เรียนรู้ Prisma ORM จากศูนย์สู่มืออาชีพ พร้อมการจัดการฐานข้อมูลแบบ type-safe หลักสูตรฟรีสำหรับมือใหม่",
    "provider": {
      "@type": "Organization",
      "name": "Prisma Tutorial Thailand",
      "url": "https://your-domain.com"
    },
    "educationalLevel": "Beginner to Advanced",
    "programmingLanguage": ["JavaScript", "TypeScript"],
    "teaches": [
      "Prisma ORM",
      "Database Design", 
      "TypeScript",
      "SQL",
      "Database Management",
      "Query Optimization",
      "Performance Tuning",
      "Testing"
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
        "name": "Prisma Tutorial Thailand"
      }
    }
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
            <Storage sx={{ fontSize: 16 }} />
            Prisma Tutorial
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
            <Avatar sx={{ bgcolor: '#2D3748', width: 48, height: 48 }}>
              <Storage />
            </Avatar>
            Prisma ORM Tutorial
              </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 3, maxWidth: '600px' }}
          >
            เรียนรู้ Prisma ORM จากศูนย์สู่มืออาชีพ ครอบคลุมการออกแบบฐานข้อมูล, migrations, และ type-safe queries
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
              ทำไมต้องเรียน Prisma ORM?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              หลักสูตรที่ออกแบบมาเพื่อสอนการใช้ Prisma ORM อย่างมืออาชีพ พร้อมตัวอย่างจริงและ best practices
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
                { name: 'Prisma 6.8', color: '#2D3748' },
                { name: 'TypeScript', color: '#5C9EE8' },
                { name: 'PostgreSQL', color: '#336791' },
                { name: 'MySQL', color: '#4479A1' },
                { name: 'SQLite', color: '#003B57' },
                { name: 'MongoDB', color: '#47A248' },
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
          {availableLessons > 0 && (
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
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>🗄️ Database Design:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Schema Design, Relations, Migrations, Data Modeling
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>🔍 Query Operations:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      CRUD Operations, Filtering, Sorting, Aggregations, TypedSQL
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>⚡ Performance:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Query Optimization, Connection Pooling, Caching, Monitoring
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>🎯 เหมาะสำหรับ:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      นักพัฒนาที่ต้องการจัดการฐานข้อมูลแบบ type-safe และมีประสิทธิภาพ
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
                {lessons.filter(lesson => lesson.status === 'available').map((lesson) => (
                  <Card 
                    key={lesson.id}
                    component={Link}
                    href={`/prisma-tutorial/lesson-${lesson.id}`}
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
              )}

          {/* Coming Soon Lessons */}
          {comingSoonLessons.length > 0 && (
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
                        เร็วๆ นี้ ({comingSoonLessons.length} บทเรียน)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        บทเรียน Prisma ที่กำลังพัฒนา
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                    {comingSoonLessons.map((lesson) => (
                      <Box 
                        key={lesson.id}
                        sx={{ 
                          p: 2, 
                          border: '1px solid', 
                          borderColor: 'grey.200',
                          borderRadius: 1,
                          bgcolor: 'grey.50'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                            {lesson.emoji}
                          </Typography>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              บทที่ {lesson.id}: {lesson.title}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Chip label={lesson.duration} size="small" variant="outlined" />
                              <Chip label={lesson.level} size="small" color={getLevelColor(lesson.level) as any} variant="outlined" />
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {lesson.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {lesson.topics.slice(0, 2).map((topic, index) => (
                            <Typography key={index} variant="caption" color="text.secondary">
                              • {topic}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    ))}
              </Box>
            </AccordionDetails>
          </Accordion>
            </Box>
          )}

          {/* Learning Path */}
          <Paper sx={{ p: 4, mb: 4, bgcolor: 'grey.50' }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
              🎯 เส้นทางการเรียนรู้ Prisma
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
              เรียนรู้ Prisma ORM อย่างเป็นระบบ จากพื้นฐานจนใช้งานใน production
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
                  เรียนรู้พื้นฐาน
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ติดตั้ง Prisma, ออกแบบ Schema และเข้าใจ ORM concepts
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
                  ฝึกใช้งาน
        </Typography>
                <Typography variant="body2" color="text.secondary">
                  CRUD Operations, Relations, Migrations และ Query Optimization
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
                  Production Ready
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Performance Tuning, Testing, Deployment และ Best Practices
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>

        {/* Call to Action */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            mb: 4,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }
          }}
        >
          <CardContent sx={{ py: 6, position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 , color: 'white' }}>
              พร้อมเป็นมืออาชีพ Prisma ORM แล้วหรือยัง?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' , color: 'white' }}>
              เริ่มต้นการเดินทางสู่การเป็น Database Expert ด้วย Prisma ORM
              จากพื้นฐานไปจนถึงระดับมืออาชีพ
            </Typography>
          <Button
            variant="contained"
            size="large"
              startIcon={<Storage />}
              component={Link}
              href="/prisma-tutorial/lesson-1"
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
              เริ่มเรียน Prisma เลย!
          </Button>
          </CardContent>
        </Card>
    </Container>
    </>
  );
} 