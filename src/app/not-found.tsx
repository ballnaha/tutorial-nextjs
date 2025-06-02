'use client';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Stack,
  Avatar,
  Grid,
  Paper,
  Divider
} from '@mui/material';
import {
  Home,
  School,
  Construction,
  Code,
  DataObject,
  Architecture,
  Speed,
  Build,
  AutoStories,
  Lightbulb,
  Schedule,
  TrendingUp,
  Rocket,
  Star
} from '@mui/icons-material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// สร้าง floating animation สำหรับไอคอน
const FloatingIcon = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <Box
    sx={{
      animation: `float 3s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      '@keyframes float': {
        '0%': {
          transform: 'translateY(0px)',
        },
        '50%': {
          transform: 'translateY(-10px)',
        },
        '100%': {
          transform: 'translateY(0px)',
        },
      },
    }}
  >
    {children}
  </Box>
);

// รายการบทเรียนที่กำลังจะมา
const upcomingLessons = [
  {
    id: 3,
    title: 'Prisma Client API',
    description: 'เรียนรู้ CRUD operations, การ query ข้อมูล และ type-safe database access',
    icon: <Code />,
    progress: 85,
    estimatedTime: '3 วัน'
  },
  {
    id: 4,
    title: 'Advanced Relations & Queries',
    description: 'Join queries, การจัดการ nested relations และ complex filtering',
    icon: <DataObject />,
    progress: 65,
    estimatedTime: '5 วัน'
  },
  {
    id: 5,
    title: 'Migrations & Schema Evolution',
    description: 'จัดการการเปลี่ยนแปลง schema, migration files และ database versioning',
    icon: <Architecture />,
    progress: 40,
    estimatedTime: '1 สัปดาห์'
  },
  {
    id: 6,
    title: 'Performance & Optimization',
    description: 'Query optimization, indexing strategies และ connection pooling',
    icon: <Speed />,
    progress: 25,
    estimatedTime: '10 วัน'
  },
  {
    id: 7,
    title: 'Prisma with Next.js API Routes',
    description: 'สร้าง RESTful API และ GraphQL endpoints ด้วย Prisma และ Next.js',
    icon: <Build />,
    progress: 15,
    estimatedTime: '2 สัปดาห์'
  },
  {
    id: 8,
    title: 'Authentication & Security',
    description: 'จัดการ user authentication, authorization และ data security',
    icon: <TrendingUp />,
    progress: 10,
    estimatedTime: '2 สัปดาห์'
  }
];

export default function NotFoundPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const progressTimer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 2;
      });
    }, 150);

    return () => clearInterval(progressTimer);
  }, [mounted]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6, textAlign: 'center' }}>
        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 4 }}>
            <FloatingIcon delay={0}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60 }}>
                <Construction sx={{ fontSize: 30 }} />
              </Avatar>
            </FloatingIcon>
            <FloatingIcon delay={0.5}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 60, height: 60 }}>
                <AutoStories sx={{ fontSize: 30 }} />
              </Avatar>
            </FloatingIcon>
            <FloatingIcon delay={1}>
              <Avatar sx={{ bgcolor: 'success.main', width: 60, height: 60 }}>
                <Lightbulb sx={{ fontSize: 30 }} />
              </Avatar>
            </FloatingIcon>
          </Stack>

          <Typography 
            variant="h1" 
            sx={{ 
              mb: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '3rem', md: '4rem' }
            }}
          >
            404
          </Typography>
          
          <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
            🚧 บทเรียนนี้กำลังสร้าง!
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            เราขออภัยที่บทเรียนที่คุณต้องการยังไม่พร้อม<br />
            แต่ทีมงานกำลังทำงานอย่างหนักเพื่อส่งมอบเนื้อหาคุณภาพให้คุณ! ✨
          </Typography>

          {/* Loading Progress */}
          <Box sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                🔨 กำลังสร้างเนื้อหา...
              </Typography>
              <Typography variant="body2" color="primary" suppressHydrationWarning>
                {Math.round(loadingProgress)}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={loadingProgress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                }
              }} 
            />
          </Box>

          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Chip 
              icon={<Schedule />} 
              label={currentTime ? `อัพเดต: ${currentTime.toLocaleTimeString('th-TH')}` : 'อัพเดต: --:--:--'}
              variant="outlined"
              color="primary"
              suppressHydrationWarning
            />
            <Chip 
              icon={<Star />} 
              label="คุณภาพระดับมืออาชีพ"
              variant="outlined"
              color="secondary"
            />
          </Stack>
        </Box>

        {/* Upcoming Lessons */}
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'left' }}>
          📚 บทเรียนที่กำลังจะมา
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
          gap: 3, 
          mb: 6 
        }}>
          {upcomingLessons.map((lesson, index) => (
            <Card 
              key={lesson.id}
              sx={{ 
                height: '100%',
                position: 'relative',
                overflow: 'visible',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar sx={{ bgcolor: `hsl(${index * 60}, 70%, 50%)`, mt: 0.5 }}>
                    {lesson.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      บทที่ {lesson.id}: {lesson.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {lesson.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          ความคืบหนา้
                        </Typography>
                        <Typography variant="caption" color="primary">
                          {lesson.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={lesson.progress} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          backgroundColor: 'grey.200'
                        }} 
                      />
                    </Box>
                    
                    <Chip 
                      icon={<Schedule />}
                      label={`เหลืออีก ${lesson.estimatedTime}`}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>


        {/* Call to Action */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            🚀 เริ่มต้นเรียนรู้ Prisma วันนี้!
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            ขณะที่รอบทเรียนใหม่ ลองเริ่มจากบทเรียนพื้นฐานเพื่อสร้างฐานความรู้ที่แข็งแกร่ง
            หรือกลับไปทบทวนเนื้อหาที่ผ่านมา
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Home />}
              component={Link}
              href="/"
              sx={{ 
                px: 4,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #0288D1 90%)',
                }
              }}
            >
              กลับหน้าหลัก
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<School />}
              component={Link}
              href="/prisma-tutorial"
              sx={{ px: 4 }}
            >
              ดูบทเรียน Prisma
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<Rocket />}
              component={Link}
              href="/nextjs-basics"
              sx={{ px: 4 }}
            >
              เรียน Next.js
            </Button>
          </Stack>

          <Divider sx={{ my: 4 }} />
          
          <Typography variant="body2" color="text.secondary">
            💡 <strong>เกร็ดความรู้:</strong> Prisma เป็น ORM ที่ช่วยให้การทำงานกับฐานข้อมูลง่ายและปลอดภัยขึ้น 
            พร้อม Type Safety และ Auto-completion ที่ยอดเยี่ยม!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
} 