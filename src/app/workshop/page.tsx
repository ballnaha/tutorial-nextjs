'use client';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Avatar,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  TouchApp,
  CheckCircle,
  PlayArrow,
  Build,
  Code,
  Home,
  NavigateNext,
  School,
  Speed,
  Rocket,
  Schedule,
  Star,
} from '@mui/icons-material';
import Link from 'next/link';

interface WorkshopLesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: 'เริ่มต้น' | 'ปานกลาง' | 'ขั้นสูง';
  topics: string[];
  skills: string[];
  href: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'success';
  emoji: string;
  estimatedTime: number;
  status: 'available' | 'coming-soon';
}

const workshopLessons: WorkshopLesson[] = [
  {
    id: 1,
    title: 'Theme Template & Vertical Menu',
    description: 'สร้าง theme template แบบกำหนดเองและ vertical menu ที่ responsive พร้อม submenu และ active states',
    duration: '90 นาที',
    level: 'ปานกลาง',
    topics: [
      'Custom Theme Template',
      'Vertical Menu Design',
      'Submenu Navigation',
      'Active States',
      'Mobile Drawer',
      'TypeScript Interface'
    ],
    skills: ['Material-UI', 'TypeScript', 'Responsive Design', 'State Management'],
    href: '/workshop/lesson-1',
    icon: <MenuIcon />,
    color: 'primary',
    emoji: '🎨',
    estimatedTime: 90,
    status: 'available',
  },
  {
    id: 2,
    title: 'Advanced Layout System',
    description: 'เรียนรู้การสร้าง layout system ที่ซับซ้อน พร้อม sidebar, header, และ content areas',
    duration: '120 นาที',
    level: 'ขั้นสูง',
    topics: [
      'Multi-level Sidebar',
      'Dynamic Header',
      'Content Management',
      'Layout Persistence',
      'Performance Tips',
      'Context API'
    ],
    skills: ['Advanced Layout', 'Context API', 'Performance', 'UX Design'],
    href: '/workshop/lesson-2',
    icon: <Build />,
    color: 'secondary',
    emoji: '🏗️',
    estimatedTime: 120,
    status: 'coming-soon',
  },
  {
    id: 3,
    title: 'Interactive Components',
    description: 'พัฒนา interactive components ที่มีการใช้งานจริง เช่น modal, tooltip, notification',
    duration: '100 นาที',
    level: 'ขั้นสูง',
    topics: [
      'Custom Modal System',
      'Tooltip Components',
      'Notification System',
      'Form Validation UI',
      'Animation Effects',
      'Accessibility'
    ],
    skills: ['Animation', 'Form Handling', 'User Experience', 'Accessibility'],
    href: '/workshop/lesson-3',
    icon: <TouchApp />,
    color: 'success',
    emoji: '🎯',
    estimatedTime: 100,
    status: 'coming-soon',
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
    case 'เริ่มต้น': return 30;
    case 'ปานกลาง': return 60;
    case 'ขั้นสูง': return 90;
    default: return 0;
  }
};

const workshopFeatures = [
  {
    title: 'Hands-on Learning',
    desc: 'เรียนรู้ผ่านการปฏิบัติจริง ไม่ใช่แค่ทฤษฎี',
    icon: <Code />,
    color: '#1976d2',
  },
  {
    title: 'Professional Templates',
    desc: 'Template ที่ใช้งานได้จริงในโปรเจคมืออาชีพ',
    icon: <Star />,
    color: '#388e3c',
  },
  {
    title: 'Interactive Demos',
    desc: 'ทดลองใช้งานได้ทันทีผ่าน browser',
    icon: <PlayArrow />,
    color: '#f57c00',
  },
  {
    title: 'Complete Code',
    desc: 'โค้ดครบชุดพร้อมคำอธิบายทุกส่วน',
    icon: <Build />,
    color: '#7b1fa2',
  },
];

export default function WorkshopPage() {
  const totalLessons = workshopLessons.length;
  const availableLessons = workshopLessons.filter(lesson => lesson.status === 'available').length;
  const totalTime = workshopLessons.reduce((sum, lesson) => sum + lesson.estimatedTime, 0);

  return (
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
          <Build sx={{ fontSize: 16 }} />
          Workshop
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
            <Build />
          </Avatar>
          Workshop Series
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ mb: 3, maxWidth: '600px' }}
        >
          เรียนรู้การสร้าง UI Components และ Layout Systems แบบ hands-on 
          ตั้งแต่ Theme Template จนถึง Interactive Components ที่ใช้งานได้จริง
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
        {/* Why Choose This Workshop */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            ทำไมต้องเรียน Workshop นี้?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Workshop ที่ออกแบบมาเพื่อให้คุณได้สร้าง Components จริงๆ พร้อม Demo และ Code ครบชุด
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, 
            gap: 3 
          }}>
            {workshopFeatures.map((feature, index) => (
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
              { name: 'Material-UI v6', color: '#1976d2' },
              { name: 'TypeScript', color: '#3178c6' },
              { name: 'React Hooks', color: '#61dafb' },
              { name: 'Responsive Design', color: '#ff6b35' },
              { name: 'State Management', color: '#764abc' },
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
        <Box id="workshop-content" sx={{ mb: { xs: 6, sm: 8 } }}>
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
                🛠️ บทเรียน Workshop
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.4
                }}
              >
                {availableLessons} บทเรียน • เริ่มเรียนได้ทันที • โค้ดครบชุดพร้อมใช้งาน
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
          
          {/* SEO Content for Workshop */}
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
              🎯 สิ่งที่คุณจะได้เรียนรู้ใน Workshop
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
                  Theme Templates, Vertical Menus, Interactive Components, Modal Systems
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
                  Mobile-first Design, Breakpoints, Drawer Navigation, Adaptive Layouts
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
                  ⚡ Advanced Patterns:
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    lineHeight: 1.4
                  }}
                >
                  State Management, Performance Optimization, Animation Effects, TypeScript
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
                  🛠️ เหมาะสำหรับ:
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    lineHeight: 1.4
                  }}
                >
                  Frontend Developers, UI/UX Designers, นักพัฒนาที่ต้องการสร้าง Components
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
            {workshopLessons.map((lesson) => (
              <Card 
                key={lesson.id}
                component={lesson.status === 'available' ? Link : 'div'}
                href={lesson.status === 'available' ? lesson.href : undefined}
                sx={{ 
                  height: '100%',
                  transition: 'all 0.2s ease',
                  cursor: lesson.status === 'available' ? 'pointer' : 'default',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: lesson.status === 'coming-soon' ? 0.7 : 1,
                  '&:hover': lesson.status === 'available' ? {
                    boxShadow: { xs: '0 4px 12px rgba(0,0,0,0.1)', sm: '0 8px 24px rgba(0,0,0,0.08)' },
                    transform: { xs: 'translateY(-2px)', sm: 'translateY(-4px)' }
                  } : {},
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
                {lesson.status === 'coming-soon' && (
                  <Chip
                    label="เร็วๆ นี้"
                    color="warning"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 1,
                    }}
                  />
                )}
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

        {/* Call to Action */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 4 }, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
            🚀 พร้อมเริ่มสร้าง Components แล้ว?
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9, fontWeight: 400 }}>
            เริ่มต้นด้วยบทที่ 1 และเรียนรู้การสร้าง Theme Template และ Vertical Menu ระดับมืออาชีพ
          </Typography>
          <Button
            component={Link}
            href="/workshop/lesson-1"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
            startIcon={<Rocket />}
          >
            เริ่มเรียน Workshop
          </Button>
        </Paper>
      </Container>
    </Container>
  );
} 