'use client';
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Stack,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  Folder,
  FolderOpen,
  PlayArrow,
  ExpandMore,
  Lightbulb,
  Warning,
  Info,
  CompareArrows,
  Settings,
  Route,
  Dashboard,
  Article,
  Person,
  ShoppingCart,
  Web,
  FilePresent,
  Build,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

const routingExamples = [
  {
    type: 'Static Route',
    path: 'app/about/page.tsx',
    url: '/about',
    description: 'หน้าแบบคงที่ สร้างโดยการใส่ไฟล์ page.tsx ในโฟลเดอร์ (จะมี Static Route Indicator ใน Next.js 15)',
    code: `// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>เกี่ยวกับเรา</h1>
      <p>ยินดีต้อนรับสู่เว็บไซต์ของเรา</p>
    </div>
  );
}`
  },
  {
    type: 'Dynamic Route',
    path: 'app/blog/[slug]/page.tsx',
    url: '/blog/my-first-post',
    description: 'Route ที่รับพารามิเตอร์แบบไดนามิก ใน Next.js 15 params เป็น async',
    code: `// app/blog/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  
  return (
    <div>
      <h1>บทความ: {slug}</h1>
      <p>เนื้อหาบทความ...</p>
    </div>
  );
}`
  },
  {
    type: 'Nested Route',
    path: 'app/blog/category/[id]/page.tsx',
    url: '/blog/category/tech',
    description: 'Route ที่ซ้อนกันหลายระดับ เหมาะสำหรับโครงสร้างที่ซับซ้อน (Next.js 15 async params)',
    code: `// app/blog/category/[id]/page.tsx
interface Props {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  
  return (
    <div>
      <h1>หมวดหมู่: {id}</h1>
      <p>รายการบทความในหมวดหมู่นี้</p>
    </div>
  );
}`
  },
  {
    type: 'Catch-all Route',
    path: 'app/docs/[...slug]/page.tsx',
    url: '/docs/api/users/create',
    description: 'Route ที่จับพารามิเตอร์แบบหลายระดับ ใช้ [...slug] (Next.js 15 async params)',
    code: `// app/docs/[...slug]/page.tsx
interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join('/');
  
  return (
    <div>
      <h1>เอกสาร: {path}</h1>
      <p>เนื้อหาเอกสาร...</p>
    </div>
  );
}`
  }
];

const routeGroups = [
  {
    name: '(marketing)',
    description: 'กลุ่ม routes สำหรับหน้า marketing ไม่ส่งผลต่อ URL',
    structure: [
      'app/(marketing)/about/page.tsx → /about',
      'app/(marketing)/pricing/page.tsx → /pricing',
      'app/(marketing)/contact/page.tsx → /contact'
    ]
  },
  {
    name: '(auth)',
    description: 'กลุ่ม routes สำหรับระบบ authentication',
    structure: [
      'app/(auth)/login/page.tsx → /login',
      'app/(auth)/register/page.tsx → /register',
      'app/(auth)/forgot-password/page.tsx → /forgot-password'
    ]
  },
  {
    name: '(dashboard)',
    description: 'กลุ่ม routes สำหรับหน้า dashboard',
    structure: [
      'app/(dashboard)/admin/page.tsx → /admin',
      'app/(dashboard)/settings/page.tsx → /settings',
      'app/(dashboard)/profile/page.tsx → /profile'
    ]
  }
];

const specialFiles = [
  {
    file: 'layout.tsx',
    description: 'Layout ที่ใช้ร่วมกันสำหรับ routes ในโฟลเดอร์นั้นๆ',
    icon: <Dashboard />,
    color: 'primary'
  },
  {
    file: 'page.tsx',
    description: 'หน้าเว็บหลักของ route นั้นๆ',
    icon: <Article />,
    color: 'secondary'
  },
  {
    file: 'loading.tsx',
    description: 'UI ที่แสดงขณะกำลังโหลดข้อมูล',
    icon: <Settings />,
    color: 'warning'
  },
  {
    file: 'error.tsx',
    description: 'หน้าที่แสดงเมื่อเกิดข้อผิดพลาด',
    icon: <Warning />,
    color: 'error'
  },
  {
    file: 'not-found.tsx',
    description: 'หน้าที่แสดงเมื่อไม่พบ route (404)',
    icon: <Web />,
    color: 'info'
  }
];

export default function Lesson2Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 2, sm: 3 },
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      {/* Header Section */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography 
          variant="h2" 
          component="h1"
          sx={{ 
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 600,
            mb: 2,
            lineHeight: 1.2
          }}
        >
          📁 บทที่ 2: File-based Routing
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary', 
            mb: 3,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            lineHeight: 1.5
          }}
        >
          เรียนรู้ระบบการนำทางที่ใช้ไฟล์และโฟลเดอร์ในการสร้าง routes
        </Typography>

        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            flexWrap: 'wrap', 
            gap: 1,
            '& .MuiChip-root': {
              fontSize: { xs: '0.75rem', sm: '0.8rem' }
            }
          }}
        >
          <Chip label="30 นาที" color="primary" size="small" />
          <Chip label="เริ่มต้น" color="secondary" size="small" />
          <Chip label="สำคัญ" color="warning" size="small" />
        </Stack>
      </Box>

      {/* Learning Objectives */}
      <Card sx={{ 
        mb: { xs: 3, sm: 4 }, 
        bgcolor: 'primary.light', 
        color: 'primary.contrastText',
        border: 'none',
        boxShadow: 1
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Lightbulb sx={{ fontSize: { xs: 20, sm: 24 } }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                fontWeight: 600
              }}
            >
              วัตถุประสงค์การเรียนรู้
        </Typography>
          </Box>
          
          <Stack spacing={1}>
            {[
              'เข้าใจความแตกต่างระหว่าง Pages Router และ App Router',
              'สามารถสร้าง Static Routes และ Dynamic Routes ได้',
              'รู้จักการใช้ Route Groups และ Special Files',
              'เข้าใจโครงสร้าง Nested Routes และ Catch-all Routes'
            ].map((objective, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <CheckCircle sx={{ 
                  fontSize: { xs: 16, sm: 20 }, 
                  mt: 0.5,
                  flexShrink: 0
                }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    lineHeight: 1.4
                  }}
                >
                  {objective}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* What is File-based Routing */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
          🤔 File-based Routing คืออะไร?
        </Typography>
        
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3, 
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}
          >
          <strong>File-based Routing</strong> เป็นระบบการสร้าง routes โดยใช้โครงสร้างไฟล์และโฟลเดอร์ 
          แทนการเขียนการตั้งค่า routing แบบ manual ทำให้การจัดการ routes ง่ายและเป็นระเบียบมากขึ้น
        </Typography>

          <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
            💡 <strong>ข้อดี:</strong> ไม่ต้องเขียน routing config แยก, โครงสร้างชัดเจน, 
            แยกแยะหน้าต่างๆ ได้ง่าย, และ IDE สามารถ autocomplete path ได้
        </Alert>

        {/* Pages Router vs App Router Comparison */}
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600
            }}
          >
          🔄 Pages Router vs App Router
        </Typography>

          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            sx={{ 
              mb: 3,
              '& .MuiTab-root': {
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                minWidth: { xs: 'auto', sm: 120 },
                px: { xs: 1, sm: 2 }
              }
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
          <Tab label="Pages Router (เก่า)" />
          <Tab label="App Router (ใหม่)" />
          <Tab label="เปรียบเทียบ" />
        </Tabs>

        <CustomTabPanel value={tabValue} index={0}>
            <Card sx={{ bgcolor: 'grey.50', boxShadow: 1 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    color: 'warning.main',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}
                >
              📂 Pages Router (Next.js 12 และเก่ากว่า)
            </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }
                  }}
                >
              ใช้โฟลเดอร์ `pages/` และไฟล์แต่ละไฟล์เป็น route
            </Typography>
            
                <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      component="pre" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        lineHeight: 1.4,
                        margin: 0,
                        overflow: 'auto'
                      }}
                    >
{`pages/
├── index.js        → /
├── about.js        → /about  
├── blog/
│   ├── index.js    → /blog
│   └── [slug].js   → /blog/:slug
└── api/
    └── users.js    → /api/users`}
              </Typography>
                  </CardContent>
                </Card>

                <Alert severity="warning" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                ⚠️ Pages Router ยังคงใช้ได้ แต่ App Router เป็น default ใน Next.js 13+
            </Alert>
              </CardContent>
            </Card>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
            <Card sx={{ bgcolor: 'success.light', boxShadow: 1 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    color: 'success.dark',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}
                >
              🎯 App Router (Next.js 13+)
            </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }
                  }}
                >
              ใช้โฟลเดอร์ `app/` และไฟล์ `page.tsx` เป็น route
            </Typography>
            
                <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      component="pre" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        lineHeight: 1.4,
                        margin: 0,
                        overflow: 'auto'
                      }}
                    >
{`app/
├── page.tsx           → /
├── about/
│   └── page.tsx       → /about
├── blog/
│   ├── page.tsx       → /blog
│   └── [slug]/
│       └── page.tsx   → /blog/:slug
└── api/
    └── users/
        └── route.ts   → /api/users`}
              </Typography>
                  </CardContent>
                </Card>

                <Alert severity="success" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                ✅ App Router รองรับ Server Components, Streaming, และฟีเจอร์ใหม่ๆ
            </Alert>
              </CardContent>
            </Card>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2}>
            <Card sx={{ boxShadow: 1 }}>
              <TableContainer>
                <Table size="small">
              <TableHead>
                <TableRow>
                      <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                        <strong>คุณสมบัติ</strong>
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                        <strong>Pages Router</strong>
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                        <strong>App Router</strong>
                      </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        โฟลเดอร์หลัก
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        pages/
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        app/
                      </TableCell>
                </TableRow>
                <TableRow>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        ไฟล์หน้าเว็บ
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        index.js, about.js
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        page.tsx
                      </TableCell>
                </TableRow>
                <TableRow>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        Server Components
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        ไม่รองรับ
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        รองรับเต็มรูปแบบ
                      </TableCell>
                </TableRow>
                <TableRow>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        Layout ซ้อนกัน
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        ยาก
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        ง่าย
                      </TableCell>
                </TableRow>
                <TableRow>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        Loading/Error UI
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        Manual
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        Built-in
                      </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
            </Card>
        </CustomTabPanel>
        </CardContent>
      </Card>

      {/* Route Types */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
          🛣️ ประเภทของ Routes
        </Typography>

          <Stack spacing={1.5}>
        {routingExamples.map((example, index) => (
              <Accordion key={index} sx={{ boxShadow: 1 }}>
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    '& .MuiAccordionSummary-content': {
                      margin: { xs: '8px 0', sm: '12px 0' }
                    }
                  }}
                >
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={1}
                    sx={{ width: '100%', alignItems: { xs: 'flex-start', sm: 'center' } }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Route color="primary" sx={{ fontSize: { xs: 18, sm: 20 } }} />
                      <Typography 
                        variant="h6"
                        sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                      >
                        {example.type}
                      </Typography>
                    </Box>
                <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: { xs: '0.75rem', sm: '0.85rem' }
                        }}
                      >
                    {example.path} → {example.url}
                  </Typography>
                </Box>
                <Chip 
                  label={example.type.split(' ')[0]} 
                  size="small" 
                  color={
                    example.type.includes('Dynamic') ? 'warning' :
                    example.type.includes('Nested') ? 'info' :
                    example.type.includes('Catch') ? 'error' : 'primary'
                  }
                      sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                />
                  </Stack>
            </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      lineHeight: 1.5
                    }}
                  >
                {example.description}
              </Typography>
              
                  <Card className="code-block" sx={{ boxShadow: 1 }}>
                    <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                      <Typography 
                        component="pre" 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          lineHeight: 1.4,
                          margin: 0,
                          overflow: 'auto'
                        }}
                      >
                  {example.code}
                </Typography>
                    </CardContent>
                  </Card>
            </AccordionDetails>
          </Accordion>
        ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Route Groups */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
          📦 Route Groups
        </Typography>
        
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              lineHeight: 1.6
            }}
          >
          Route Groups ช่วยให้เราจัดกลุ่ม routes โดยไม่ส่งผลต่อ URL structure 
          โดยใช้วงเล็บ () ครอบชื่อโฟลเดอร์
        </Typography>

          <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
            💡 <strong>ประโยชน์:</strong> จัดระเบียบโค้ด, แยก layout ตามกลุ่ม, 
            และสามารถมี layout ต่างกันในแต่ละกลุ่ม
        </Alert>

          <Stack spacing={2}>
          {routeGroups.map((group, index) => (
              <Card key={index} sx={{ boxShadow: 1 }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      color: 'primary.main',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    {group.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.4
                    }}
                  >
                    {group.description}
                  </Typography>
                  
                  <Card sx={{ bgcolor: 'grey.50', boxShadow: 0 }}>
                    <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                      <Stack spacing={0.5}>
                    {group.structure.map((item, i) => (
                          <Typography 
                            key={i} 
                            variant="body2" 
                            sx={{ 
                              fontFamily: 'monospace',
                              fontSize: { xs: '0.75rem', sm: '0.85rem' }
                            }}
                          >
                        {item}
                      </Typography>
                    ))}
                      </Stack>
                </CardContent>
              </Card>
                </CardContent>
              </Card>
          ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Special Files */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
          📄 Special Files
        </Typography>
        
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              lineHeight: 1.6
            }}
          >
          App Router มีไฟล์พิเศษที่มีหน้าที่เฉพาะ ช่วยให้เราสร้าง UX ที่ดีขึ้น
        </Typography>

          <Stack spacing={1.5}>
          {specialFiles.map((file, index) => (
              <Card key={index} sx={{ boxShadow: 1 }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    {React.cloneElement(file.icon, { 
                      color: file.color as any,
                      sx: { fontSize: { xs: 20, sm: 24 } }
                    })}
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.95rem', sm: '1rem' }
                      }}
                    >
                  {file.file}
                </Typography>
                  </Box>
                  <Typography 
                    variant="body2"
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.4
                    }}
                  >
                  {file.description}
                </Typography>
                </CardContent>
              </Card>
          ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Practical Example */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
          🛠️ ตัวอย่างการใช้งานจริง
        </Typography>
        
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              lineHeight: 1.6
            }}
          >
          มาลองสร้างโครงสร้าง routes สำหรับเว็บไซต์ e-commerce กัน
        </Typography>

          <Card className="code-block" sx={{ mb: 3, boxShadow: 1 }}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
              <Typography 
                component="pre" 
                sx={{ 
                  fontFamily: 'monospace',
                  fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' },
                  lineHeight: 1.4,
                  margin: 0,
                  overflow: 'auto'
                }}
              >
{`app/
├── (marketing)/
│   ├── layout.tsx        # Layout สำหรับ marketing pages
│   ├── page.tsx          # หน้าแรก (/)
│   ├── about/
│   │   └── page.tsx      # เกี่ยวกับเรา (/about)
│   └── contact/
│       └── page.tsx      # ติดต่อเรา (/contact)
├── (shop)/
│   ├── layout.tsx        # Layout สำหรับ shop pages  
│   ├── products/
│   │   ├── page.tsx      # รายการสินค้า (/products)
│   │   └── [id]/
│   │       ├── page.tsx  # รายละเอียดสินค้า (/products/123)
│   │       └── reviews/
│   │           └── page.tsx # รีวิวสินค้า (/products/123/reviews)
│   └── cart/
│       └── page.tsx      # ตะกร้าสินค้า (/cart)
├── (auth)/
│   ├── login/
│   │   └── page.tsx      # เข้าสู่ระบบ (/login)
│   └── register/
│       └── page.tsx      # สมัครสมาชิก (/register)
└── api/
    ├── products/
    │   └── route.ts      # API สำหรับสินค้า
    └── auth/
        └── route.ts      # API สำหรับ authentication`}
          </Typography>
            </CardContent>
          </Card>

          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 600
            }}
          >
          💡 ข้อดีของโครงสร้างนี้:
        </Typography>
          
          <Stack spacing={1}>
            {[
              'แยก layout ตามประเภทหน้า (marketing, shop, auth)',
              'โครงสร้างชัดเจน เข้าใจง่าย',
              'สามารถปรับแต่ง layout แต่ละกลุ่มได้อิสระ',
              'รองรับ nested routes ที่ซับซ้อน'
            ].map((benefit, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <CheckCircle 
                  color="success" 
                  sx={{ 
                    fontSize: { xs: 16, sm: 20 }, 
                    mt: 0.5,
                    flexShrink: 0
                  }} 
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    lineHeight: 1.4
                  }}
                >
                  {benefit}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Hands-on Practice */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
          ✋ ฝึกปฏิบัติ: สร้าง Routes
        </Typography>
        
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              lineHeight: 1.6
            }}
          >
          ลองทำตามขั้นตอนนี้เพื่อสร้าง routes ต่างๆ ในโปรเจค Next.js ของคุณ
        </Typography>

          <Stepper 
            activeStep={activeStep} 
            orientation="vertical"
            sx={{
              '& .MuiStepLabel-label': {
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }
            }}
          >
          <Step>
            <StepLabel>
                <Typography 
                  variant="h6"
                  sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                >
                  สร้าง Static Route
                </Typography>
            </StepLabel>
            <StepContent>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.5
                  }}
                >
                สร้างหน้า About โดยการสร้างโฟลเดอร์และไฟล์ดังนี้:
              </Typography>
              
                <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        wordBreak: 'break-all'
                      }}
                    >
                  $ mkdir -p app/about<br/>
                  $ touch app/about/page.tsx
                </Typography>
                  </CardContent>
                </Card>

                <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      component="pre" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        lineHeight: 1.4,
                        margin: 0,
                        overflow: 'auto'
                      }}
                    >
{`// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>เกี่ยวกับเรา</h1>
      <p>ยินดีต้อนรับสู่เว็บไซต์ของเรา</p>
    </div>
  );
}`}
                </Typography>
                  </CardContent>
                </Card>

                <Alert severity="success" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                  ✅ ตอนนี้คุณสามารถเข้าถึงหน้านี้ได้ที่ http://localhost:3000/about
              </Alert>

                <Button 
                  variant="contained" 
                  onClick={handleNext} 
                  size="small"
                  sx={{ 
                    mt: 1, 
                    mr: 1,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                >
                ถัดไป
              </Button>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
                <Typography 
                  variant="h6"
                  sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                >
                  สร้าง Dynamic Route
                </Typography>
            </StepLabel>
            <StepContent>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.5
                  }}
                >
                สร้างหน้าบทความที่รับพารามิเตอร์ slug:
              </Typography>
              
                <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                        wordBreak: 'break-all'
                      }}
                    >
                  $ mkdir -p app/blog/[slug]<br/>
                  $ touch app/blog/[slug]/page.tsx
                </Typography>
                  </CardContent>
                </Card>

                <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      component="pre" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        lineHeight: 1.4,
                        margin: 0,
                        overflow: 'auto'
                      }}
                    >
{`// app/blog/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  
  return (
    <div>
      <h1>บทความ: {slug}</h1>
      <p>เนื้อหาบทความ...</p>
    </div>
  );
}`}
                </Typography>
                  </CardContent>
                </Card>

                <Alert severity="info" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                  💡 ลองเข้าไป /blog/my-first-post หรือ /blog/learning-nextjs
              </Alert>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button 
                    variant="contained" 
                    onClick={handleNext} 
                    size="small"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                  >
                ถัดไป
              </Button>
                  <Button 
                    onClick={handleBack} 
                    size="small"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                  >
                ย้อนกลับ
              </Button>
                </Stack>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
                <Typography 
                  variant="h6"
                  sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                >
                  สร้าง Route Group
                </Typography>
            </StepLabel>
            <StepContent>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.5
                  }}
                >
                สร้าง Route Group สำหรับหน้า dashboard:
              </Typography>
              
                <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        wordBreak: 'break-all'
                      }}
                    >
                  $ mkdir -p app/(dashboard)/admin<br/>
                  $ touch app/(dashboard)/layout.tsx<br/>
                  $ touch app/(dashboard)/admin/page.tsx
                </Typography>
                  </CardContent>
                </Card>

                <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                      component="pre" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        lineHeight: 1.4,
                        margin: 0,
                        overflow: 'auto'
                      }}
                    >
{`// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </div>
  );
}`}
                </Typography>
                  </CardContent>
                </Card>

                <Alert severity="success" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                  ✅ URL จะเป็น /admin (ไม่มี /dashboard ใน URL)
              </Alert>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button 
                    variant="contained" 
                    onClick={handleNext} 
                    size="small"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                  >
                เสร็จสิ้น
              </Button>
                  <Button 
                    onClick={handleBack} 
                    size="small"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                  >
                ย้อนกลับ
              </Button>
                </Stack>
            </StepContent>
          </Step>
        </Stepper>

        {activeStep === 3 && (
            <Card sx={{ mt: 3, bgcolor: 'success.light', boxShadow: 1 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    fontWeight: 600
                  }}
                >
              🎉 ยินดีด้วย! คุณเรียนรู้ File-based Routing แล้ว
            </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.5
                  }}
                >
                  ตอนนี้คุณรู้วิธีสร้าง routes แบบต่างๆ แล้ว! ลองไปทดลองสร้าง routes ใหม่ๆ ดู
            </Typography>
                
                <Button 
                  onClick={handleReset} 
                  size="small"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
                  เริ่มใหม่
            </Button>
              </CardContent>
            </Card>
        )}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card sx={{ 
        mb: { xs: 3, sm: 4 }, 
        bgcolor: 'success.light', 
        color: 'success.dark',
        boxShadow: 1
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600
            }}
          >
            🎯 สรุปบทเรียน
        </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.5
            }}
          >
            ในบทนี้คุณได้เรียนรู้ File-based Routing ซึ่งเป็นหัวใจสำคัญของ Next.js 
            ที่ทำให้การจัดการ routes ง่ายและมีระเบียบ
        </Typography>
        
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.8rem', sm: '0.85rem' }
            }}
          >
            💡 <strong>บทถัดไป:</strong> เรียนรู้เรื่อง Server Components และ Client Components 
            ซึ่งเป็นฟีเจอร์สำคัญของ Next.js 13+
        </Alert>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-1"
          variant="outlined"
          size="small"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          บทที่ 1
        </Button>
        
        <Chip 
          label="2 / 18"
          color="primary"
          variant="outlined"
          size="small"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-3"
          variant="contained"
          size="small"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          บทถัดไป
        </Button>
      </Box>
    </Box>
  );
} 