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
  Navigation,
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
    title: 'เริ่มต้นกับ Material-UI',
    description: 'ติดตั้งและใช้งาน MUI ครั้งแรก พร้อมทำความรู้จัก Design System',
    duration: '25 นาที',
    level: 'เริ่มต้น',
    topics: ['Material-UI คืออะไร?', 'การติดตั้ง MUI', 'Material Design Principles', 'ThemeProvider และ CssBaseline'],
    status: 'available',
    estimatedTime: 25,
    emoji: '🎨',
    code: `npm install @mui/material @emotion/react @emotion/styled

// App.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Button } from '@mui/material'

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant="contained">Hello MUI!</Button>
    </ThemeProvider>
  )
}`
  },
  {
    id: 2,
    title: 'Theme และ Styling',
    description: 'การปรับแต่ง Theme และการใช้งาน sx prop',
    duration: '30 นาที',
    level: 'เริ่มต้น',
    topics: ['การสร้าง Custom Theme', 'Color Palette', 'Typography', 'การใช้งาน sx prop'],
    status: 'available',
    estimatedTime: 30,
    emoji: '🎭',
    code: `const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

// ใช้งาน sx prop
<Box sx={{
  bgcolor: 'primary.main',
  color: 'white',
  p: 2,
  borderRadius: 1,
}}>
  Custom styled box
</Box>`
  },
  {
    id: 3,
    title: 'Layout Components',
    description: 'Container, Grid, Stack, Box สำหรับจัดวาง Layout',
    duration: '35 นาที',
    level: 'เริ่มต้น',
    topics: ['Container component', 'Grid system', 'Stack component', 'Box component', 'Responsive Design'],
    status: 'available',
    estimatedTime: 35,
    emoji: '📝',
  },
  {
    id: 4,
    title: 'Buttons และ Actions',
    description: 'การใช้งาน Button, IconButton, FAB และ ButtonGroup',
    duration: '20 นาที',
    level: 'เริ่มต้น',
    topics: ['Button variants', 'IconButton', 'Floating Action Button', 'ButtonGroup', 'Loading state'],
    status: 'available',
    estimatedTime: 20,
    emoji: '🔘',
  },
  {
    id: 5,
    title: 'Forms และ Inputs',
    description: 'TextField, Select, Checkbox, Radio และการจัดการ Form',
    duration: '40 นาที',
    level: 'ปานกลาง',
    topics: ['TextField variants', 'Select และ MenuItem', 'Checkbox และ Radio', 'Form validation'],
    status: 'available',
    estimatedTime: 40,
    emoji: '📋',
  },
  {
    id: 6,
    title: 'Navigation Components',
    description: 'AppBar, Drawer, Tabs, Breadcrumbs',
    duration: '35 นาที',
    level: 'ปานกลาง',
    topics: ['AppBar & Toolbar', 'Drawer & Menu', 'Tabs', 'Breadcrumbs', 'Layout Design'],
    status: 'available',
    estimatedTime: 35,
    emoji: '📚',
    
  },
  {
    id: 7,
    title: 'Data Display',
    description: 'Table, List, Card, Chip สำหรับแสดงข้อมูล',
    duration: '45 นาที',
    level: 'ปานกลาง',
    topics: ['Table และ DataGrid', 'List และ ListItem', 'Card component', 'Chip และ Badge'],
    status: 'available',
    estimatedTime: 45,
    emoji: '📊',
  },
  {
    id: 8,
    title: 'Feedback Components',
    description: 'Dialog, Snackbar, Alert สำหรับการแจ้งเตือน',
    duration: '30 นาที',
    level: 'ปานกลาง',
    topics: ['Dialog และ Modal', 'Snackbar notifications', 'Alert messages', 'Progress indicators'],
    status: 'available',
    estimatedTime: 30,
    emoji: '💬',
  },
];

const features = [
  {
    icon: <Speed />,
    title: 'Material Design 3.0',
    description: 'ใช้ Material Design ล่าสุดจาก Google พร้อม theme system ที่ทันสมัย',
    color: '#1976d2'
  },
  {
    icon: <Widgets />,
    title: '50+ Components',
    description: 'Component ครบครันสำหรับสร้าง UI ทุกประเภท พร้อมการปรับแต่งที่ยืดหยุ่น',
    color: '#388e3c'
  },
  {
    icon: <DevicesOther />,
    title: 'Responsive Design',
    description: 'รองรับทุกหน้าจออัตโนมัติ ด้วย breakpoint system ที่ทรงพลัง',
    color: '#f57c00'
  },
  {
    icon: <Security />,
    title: 'TypeScript Ready',
    description: 'Type safety เต็มรูปแบบ พร้อม auto-completion และ IntelliSense',
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

export default function MUITutorialPage() {
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
    "name": "หลักสูตร Material-UI (MUI) สำหรับมือใหม่",
    "description": "เรียนรู้ Material-UI Component Library สำหรับสร้าง UI ที่สวยงามและทันสมัย หลักสูตรฟรีสำหรับมือใหม่",
    "provider": {
      "@type": "Organization",
      "name": "Next.js Tutorial Thailand",
      "url": "https://your-domain.com"
    },
    "educationalLevel": "Beginner to Intermediate",
    "programmingLanguage": ["JavaScript", "TypeScript"],
    "teaches": [
      "Material-UI",
      "React Components", 
      "Material Design",
      "UI/UX Design",
      "Frontend Development",
      "Responsive Design",
      "Theme Customization"
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
            <Palette sx={{ fontSize: 16 }} />
            Material-UI Tutorial
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
            <Avatar sx={{ bgcolor: '#007FFF', width: 48, height: 48 }}>
              <Palette />
            </Avatar>
            Material-UI (MUI) Tutorial
              </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 3, maxWidth: '600px' }}
          >
            เรียนรู้การใช้งาน MUI Component Library ที่ใหญ่ที่สุดของ React สำหรับสร้าง UI ที่สวยงามและใช้งานง่าย
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
              ทำไมต้องเรียน Material-UI?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              หลักสูตรที่ออกแบบมาเพื่อสอนการสร้าง UI ที่สวยงามและมีประสิทธิภาพด้วย MUI
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
                    {feature.description}
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
                { name: 'Material-UI v6', color: '#007FFF' },
                { name: 'React 19', color: '#63B3ED' },
                { name: 'TypeScript', color: '#5C9EE8' },
                { name: 'Material Design', color: '#8BB7ED' },
                { name: 'Emotion CSS', color: '#4A5568' },
                { name: 'Responsive Design', color: '#2D3748' },
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
            <Box id="course-content" sx={{ mb: { xs: 6, sm: 8 } }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between', 
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 2, md: 0 },
                mb: { xs: 3, sm: 4 }
              }}>
                <Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      fontSize: { xs: '1.8rem', sm: '2rem', md: '2rem' }
                    }}
                  >
                    📚 บทเรียนที่พร้อมใช้งาน
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                      lineHeight: 1.4
                    }}
                  >
                    {availableLessons} บทเรียน • เริ่มเรียนได้ทันที • อัพเดตเนื้อหาสม่ำเสมอ
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: { xs: 1, sm: 2 },
                  flexDirection: { xs: 'column', sm: 'row' },
                  width: { xs: '100%', md: 'auto' }
                }}>
                  <Chip 
                    icon={<CheckCircle />}
                    label={`${availableLessons}/${totalLessons} พร้อมใช้งาน`}
                    color="success"
                    variant="outlined"
                    size="small"
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '0.75rem', sm: '0.8rem' },
                      width: { xs: '100%', sm: 'auto' }
                    }}
                  />
                  <Chip 
                    label={`${Math.round(totalTime / 60)} ชม. ${totalTime % 60} นาที`}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '0.75rem', sm: '0.8rem' },
                      width: { xs: '100%', sm: 'auto' }
                    }}
                  />
                </Box>
              </Box>

              {/* SEO Content for Lessons */}
              <Box sx={{ 
                bgcolor: 'primary.50', 
                p: { xs: 2, sm: 3 }, 
                borderRadius: 2, 
                mb: { xs: 3, sm: 4 },
                border: '1px solid',
                borderColor: 'primary.100'
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    color: 'primary.main', 
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}
                >
                  🎯 เนื้อหาหลักสูตรที่คุณจะได้เรียนรู้
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
                  gap: { xs: 2, sm: 2 }
                }}>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1,
                        fontSize: { xs: '0.875rem', sm: '0.9rem' }
                      }}
                    >
                      🎨 UI Components:
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        lineHeight: 1.4
                      }}
                    >
                      Buttons, Forms, Navigation, Data Display, Layout Components
                    </Typography>
                  </Box>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1,
                        fontSize: { xs: '0.875rem', sm: '0.9rem' }
                      }}
                    >
                      🎭 Theming & Styling:
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        lineHeight: 1.4
                      }}
                    >
                      Custom Themes, sx prop, styled() function, Color Palettes
                    </Typography>
                  </Box>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1,
                        fontSize: { xs: '0.875rem', sm: '0.9rem' }
                      }}
                    >
                      📱 Responsive Design:
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        lineHeight: 1.4
                      }}
                    >
                      Grid System, Breakpoints, Mobile-first Approach
                    </Typography>
                  </Box>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 1,
                        fontSize: { xs: '0.875rem', sm: '0.9rem' }
                      }}
                    >
                      🎯 เหมาะสำหรับ:
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        lineHeight: 1.4
                      }}
                    >
                      นักพัฒนา React ที่ต้องการสร้าง UI ที่สวยงามและมีมาตรฐาน
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { 
                  xs: '1fr', 
                  sm: 'repeat(2, 1fr)', 
                  lg: 'repeat(3, 1fr)' 
                }, 
                gap: { xs: 2, sm: 3 }
              }}>
                {lessons.filter(lesson => lesson.status === 'available').map((lesson) => (
                  <Card 
                    key={lesson.id}
                    component={Link}
                    href={`/mui-tutorial/lesson-${lesson.id}`}
                    sx={{ 
                      height: '100%',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: { xs: '0 4px 12px rgba(0,0,0,0.1)', sm: '0 8px 24px rgba(0,0,0,0.08)' },
                        transform: { xs: 'translateY(-2px)', sm: 'translateY(-4px)' }
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
                    <CardContent sx={{ 
                      p: { xs: 2, sm: 3 }, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column' 
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        mb: { xs: 1.5, sm: 2 },
                        gap: { xs: 1, sm: 2 }
                      }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: 'grey.100', 
                            color: 'text.primary',
                            width: { xs: 40, sm: 48 },
                            height: { xs: 40, sm: 48 },
                            fontSize: { xs: '1.2rem', sm: '1.5rem' },
                            flexShrink: 0
                          }}
                        >
                          {lesson.emoji}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              mb: 0.5, 
                              lineHeight: 1.3,
                              fontSize: { xs: '1rem', sm: '1.1rem' }
                            }}
                          >
                            บทที่ {lesson.id}: {lesson.title}
                          </Typography>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            flexWrap: 'wrap'
                          }}>
                            <Chip 
                              label={lesson.level} 
                              size="small"
                              color={getLevelColor(lesson.level) as any}
                              variant="outlined"
                              sx={{ 
                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                height: { xs: 20, sm: 24 }
                              }}
                            />
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              color: 'text.secondary' 
                            }}>
                              <Schedule sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5 }} />
                              <Typography 
                                variant="caption"
                                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                              >
                                {lesson.duration}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: { xs: 1.5, sm: 2 }, 
                          flex: 1, 
                          lineHeight: 1.5,
                          fontSize: { xs: '0.8rem', sm: '0.875rem' },
                          display: '-webkit-box',
                          WebkitLineClamp: { xs: 2, sm: 3 },
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {lesson.description}
                      </Typography>

                      <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          mb: 1 
                        }}>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                          >
                            ความยาก
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                          >
                            {getLevelProgress(lesson.level)}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={getLevelProgress(lesson.level)}
                          sx={{
                            height: { xs: 3, sm: 4 },
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
                      
                      <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: { xs: 0.3, sm: 0.5 }
                      }}>
                        {lesson.topics.slice(0, 3).map((topic, index) => (
                          <Chip 
                            key={index}
                            label={topic} 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                              fontSize: { xs: '0.6rem', sm: '0.7rem' },
                              height: { xs: 20, sm: 24 },
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
                              fontSize: { xs: '0.6rem', sm: '0.7rem' },
                              height: { xs: 20, sm: 24 },
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
                        บทเรียน Material-UI ที่กำลังพัฒนา
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
              🎯 เส้นทางการเรียนรู้
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
              เรียนรู้ Material-UI อย่างเป็นระบบ ตั้งแต่พื้นฐานจนใช้งานได้จริง
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
                  ติดตั้ง MUI, ทำความเข้าใจ Material Design และใช้งาน Component พื้นฐาน
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
                  ฝึกทำ Layout
        </Typography>
                <Typography variant="body2" color="text.secondary">
                  เรียนรู้ Grid System, Responsive Design และการจัดวาง UI ที่สวยงาม
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
                  สร้างแอปจริง
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ประยุกต์ใช้ MUI ในการสร้างแอปพลิเคชันจริง พร้อม best practices
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>

        {/* Call to Action */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              พร้อมสร้าง UI สวยๆ ด้วย Material-UI แล้วหรือยัง?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              เริ่มต้นการเดินทางสู่การเป็น UI Developer ด้วย Material-UI
              จากพื้นฐานไปจนถึงระดับมืออาชีพ
            </Typography>
          <Button
            variant="contained"
            size="large"
              startIcon={<Palette />}
              component={Link}
              href="/mui-tutorial/lesson-1"
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
              เริ่มเรียน Material-UI เลย!
          </Button>
          </CardContent>
        </Card>
    </Container>
    </>
  );
} 