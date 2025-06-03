'use client';
import React from 'react';
import {
  Box,
  Typography,
  Alert,
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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  PlayArrow,
  ExpandMore,
  Lightbulb,
  Warning,
  Info,
  Storage,
  CloudQueue,
  Speed,
  Security,
  Api,
  Web,
  Settings,
  DataObject,
  Timer,
  Refresh,
  CloudDownload,
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

const fetchingMethods = [
  {
    method: 'Server Components',
    description: 'ใช้ fetch โดยตรงใน async components',
    when: 'SEO สำคัญ, ข้อมูลคงที่',
    icon: <Storage />,
    pros: ['SEO ดี', 'เร็ว', 'ไม่มี loading state'],
    cons: ['ไม่ interactive', 'ไม่ real-time']
  },
  {
    method: 'Client Components',
    description: 'ใช้ useEffect + fetch หรือ SWR/React Query',
    when: 'ต้องการ interactivity, real-time updates',
    icon: <Web />,
    pros: ['Interactive', 'Real-time', 'Loading states'],
    cons: ['ไม่ดีต่อ SEO', 'ช้ากว่า server']
  },
  {
    method: 'API Routes',
    description: 'สร้าง backend API endpoints ใน Next.js',
    when: 'ต้องการ API สำหรับ external หรือ complex logic',
    icon: <Api />,
    pros: ['Flexible', 'Secure', 'Reusable'],
    cons: ['Extra request', 'ซับซ้อนกว่า']
  }
];

const cachingStrategies = [
  {
    strategy: 'Static Generation (ISG)',
    description: 'Generate ที่ build time และ cache',
    example: 'Blog posts, Product pages',
    icon: <Storage />,
    color: 'success'
  },
  {
    strategy: 'Server-side Rendering (SSR)',
    description: 'Generate ทุกครั้งที่ request',
    example: 'User dashboard, Real-time data',
    icon: <CloudQueue />,
    color: 'info'
  },
  {
    strategy: 'Client-side Fetching',
    description: 'Fetch ใน browser หลัง hydration',
    example: 'Interactive data, User actions',
    icon: <Web />,
    color: 'warning'
  },
  {
    strategy: 'Incremental Static Regeneration',
    description: 'Re-generate static pages เมื่อมีการเปลี่ยนแปลง',
    example: 'E-commerce, CMS content',
    icon: <Refresh />,
    color: 'secondary'
  }
];

export default function Lesson5Page() {
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
          📡 บทที่ 5: Data Fetching & API Routes
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
          เรียนรู้การดึงข้อมูลและสร้าง API endpoints ใน Next.js 15+ App Router พร้อม React 19
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
          <Chip label="ปานกลาง" color="secondary" size="small" />
          <Chip label="สำคัญมาก" color="error" size="small" />
          <Chip label="Next.js 15" color="success" size="small" />
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
              'เข้าใจการ fetch ข้อมูลใน Server Components พร้อม React 19',
              'สามารถสร้าง API Routes ใน Next.js 15+ พร้อม async request APIs ได้',
              'เข้าใจ Enhanced Caching strategies ใน Next.js 15 (ไม่ cache by default)',
              'รู้จัก Error Handling และ Loading States ที่ดีขึ้น'
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

      {/* Introduction */}
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
          🤔 Data Fetching ใน Next.js 15 คืออะไร?
        </Typography>
        
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3, 
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}
          >
          <strong>Data Fetching</strong> หมายถึงการดึงข้อมูลจากแหล่งต่างๆ เช่น API, Database, หรือ File system 
          โดย Next.js 15 มีการเปลี่ยนแปลงสำคัญในระบบ caching และ async request APIs ที่ทำให้การจัดการข้อมูลดีขึ้น
        </Typography>

          <Alert severity="info" sx={{ mb: 4, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
            🎉 <strong>ใหม่ใน Next.js 15:</strong> ไม่ cache โดย default อีกต่อไป! 
            Async request APIs (cookies, headers, params) และ Enhanced caching control
        </Alert>

          <Alert severity="warning" sx={{ mb: 4, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
            ⚠️ <strong>Breaking Changes ใน Next.js 15:</strong> API Routes ไม่ cache GET requests by default, 
            params เป็น async, และ fetch requests ไม่ cache by default
        </Alert>

        {/* Fetching Methods Comparison */}
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600
            }}
          >
          🎯 วิธีการ Fetch ข้อมูลใน Next.js
        </Typography>

          <Stack spacing={2} sx={{ mb: 4 }}>
          {fetchingMethods.map((method, index) => (
              <Card key={index} sx={{ boxShadow: 1 }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ color: 'primary.main' }}>
                      {React.cloneElement(method.icon, { 
                        sx: { fontSize: { xs: 20, sm: 24 } }
                      })}
                  </Box>
                    <Typography 
                      variant="h6"
                      sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                    >
                    {method.method}
                  </Typography>
                </Box>
                
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.4
                    }}
                  >
                  {method.description}
                </Typography>
                
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.8rem', sm: '0.85rem' }
                    }}
                  >
                  <strong>ใช้เมื่อ:</strong> {method.when}
                </Typography>
                
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={1} 
                    sx={{ mt: 2 }}
                  >
                  <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="caption" 
                        color="success.main" 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: { xs: '0.75rem', sm: '0.8rem' }
                        }}
                      >
                      ข้อดี:
                    </Typography>
                    {method.pros.map((pro, i) => (
                        <Typography 
                          key={i} 
                          variant="caption" 
                          display="block" 
                          color="success.main"
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                        >
                        • {pro}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="caption" 
                        color="error.main" 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: { xs: '0.75rem', sm: '0.8rem' }
                        }}
                      >
                      ข้อเสีย:
                    </Typography>
                    {method.cons.map((con, i) => (
                        <Typography 
                          key={i} 
                          variant="caption" 
                          display="block" 
                          color="error.main"
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                        >
                        • {con}
                      </Typography>
                    ))}
                  </Box>
                  </Stack>
              </CardContent>
            </Card>
          ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Caching Strategies */}
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
          🚀 Caching Strategies
        </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              lineHeight: 1.6
            }}
          >
          Next.js มี caching strategies หลายแบบที่ช่วยเพิ่มประสิทธิภาพ
        </Typography>

          <Stack spacing={2} sx={{ mb: 4 }}>
          {cachingStrategies.map((strategy, index) => (
              <Card key={index} sx={{ boxShadow: 1 }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ color: `${strategy.color}.main` }}>
                      {React.cloneElement(strategy.icon, { 
                        sx: { fontSize: { xs: 20, sm: 24 } }
                      })}
                    </Box>
                    <Typography 
                      variant="h6"
                      sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                    >
                      {strategy.strategy}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.4
                    }}
                  >
                    {strategy.description}
                  </Typography>
                  <Chip 
                    label={strategy.example} 
                    color={strategy.color as any}
                    size="small" 
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                  />
                </CardContent>
              </Card>
          ))}
          </Stack>

          <Alert severity="success" sx={{ mb: 3, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
            ✅ <strong>Performance Tip:</strong> Next.js 15 มีระบบ caching ที่ยืดหยุ่นมากขึ้น 
            และสามารถกำหนด revalidate time ได้
        </Alert>
        </CardContent>
      </Card>

      {/* Server Components Data Fetching */}
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
          🖥️ Server Components Data Fetching
        </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              lineHeight: 1.6
            }}
          >
          ใน Next.js 13+ สามารถใช้ fetch โดยตรงใน Server Components ได้ โดยไม่ต้องใช้ getServerSideProps
        </Typography>

          <Stack spacing={1.5}>
            <Accordion sx={{ boxShadow: 1 }}>
              <AccordionSummary 
                expandIcon={<ExpandMore />}
                sx={{ 
                  '& .MuiAccordionSummary-content': {
                    margin: { xs: '8px 0', sm: '12px 0' }
                  }
                }}
              >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Storage 
                    color="success" 
                    sx={{ fontSize: { xs: 18, sm: 20 } }}
                  />
                  <Typography 
                    variant="h6"
                    sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                  >
                    Basic Server-side Fetching
                  </Typography>
            </Box>
          </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
              ตัวอย่างการ fetch ข้อมูลพื้นฐานใน Server Component
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
{`// app/products/page.tsx
async function ProductsPage() {
  // Fetch ข้อมูลบนเซิร์ฟเวอร์
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();

  return (
    <div>
      <h1>รายการโพสต์</h1>
      {posts.slice(0, 10).map((post: any) => (
        <div key={post.id} style={{ 
          border: '1px solid #ccc', 
          padding: '15px', 
          margin: '10px 0' 
        }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;`}
              </Typography>
                  </CardContent>
                </Card>

                <Alert severity="success" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                ✅ <strong>ข้อดี:</strong> ข้อมูลจะถูก render บนเซิร์ฟเวอร์ ทำให้ SEO ดีและโหลดเร็ว
            </Alert>
          </AccordionDetails>
        </Accordion>
          </Stack>
        </CardContent>
      </Card>

      {/* API Routes */}
      <Card sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🚀 API Routes
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          API Routes ใน Next.js 13+ ใช้ App Router และอยู่ในโฟลเดอร์ app/api/
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Api color="primary" />
              <Typography variant="h6">สร้าง API Route พื้นฐาน</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การสร้าง API endpoint ด้วย route.ts
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET request
export async function GET() {
  return NextResponse.json({
    message: 'Hello from API!',
    timestamp: new Date().toISOString()
  });
}

// POST request
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'Data received!',
    data: body,
    timestamp: new Date().toISOString()
  });
}

// PUT request
export async function PUT(request: NextRequest) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'Data updated!',
    data: body
  });
}

// DELETE request
export async function DELETE() {
  return NextResponse.json({
    message: 'Data deleted!'
  });
}`}
              </Typography>
            </Box>

            <Alert severity="info">
              <Typography variant="body2">
                💡 <strong>การเข้าถึง:</strong> API นี้จะอยู่ที่ /api/hello และรองรับ HTTP methods ต่างๆ
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Api color="success" />
              <Typography variant="h6">Dynamic API Routes</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การสร้าง API routes ที่รับพารามิเตอร์
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ข้อมูลจำลอง
const products = [
  { id: '1', name: 'iPhone 15', price: 35000 },
  { id: '2', name: 'Samsung Galaxy S24', price: 30000 },
  { id: '3', name: 'Google Pixel 8', price: 25000 }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  products[productIndex] = { ...products[productIndex], ...body };
  
  return NextResponse.json(products[productIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  products.splice(productIndex, 1);
  
  return NextResponse.json({ message: 'Product deleted successfully' });
}`}
              </Typography>
            </Box>

            <Alert severity="success">
              <Typography variant="body2">
                ✅ <strong>การใช้งาน:</strong> API นี้จะอยู่ที่ /api/products/[id] เช่น /api/products/1
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Security color="warning" />
              <Typography variant="h6">API Middleware และ Validation</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การเพิ่ม authentication, validation และ error handling
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Middleware สำหรับตรวจสอบ authentication
function checkAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.split(' ')[1];
  // ตรวจสอบ token ที่นี่ (เช่น JWT verification)
  
  return token === 'valid-token'; // สำหรับตัวอย่าง
}

// Validation function
function validateUserData(data: any) {
  const errors: string[] = [];
  
  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!data.email || !data.email.includes('@')) {
    errors.push('Invalid email format');
  }
  
  if (!data.age || data.age < 0 || data.age > 120) {
    errors.push('Age must be between 0 and 120');
  }
  
  return errors;
}

export async function GET(request: NextRequest) {
  // ตรวจสอบ authentication
  if (!checkAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: 'This is protected data',
    data: ['secret1', 'secret2', 'secret3']
  });
}

export async function POST(request: NextRequest) {
  try {
    // ตรวจสอบ authentication
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate ข้อมูล
    const validationErrors = validateUserData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationErrors 
        },
        { status: 400 }
      );
    }

    // สมมติว่าบันทึกข้อมูลลงฐานข้อมูล
    const newUser = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(newUser, { status: 201 });
    
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`}
              </Typography>
            </Box>

            <Alert severity="warning">
              <Typography variant="body2">
                ⚠️ <strong>Security Note:</strong> ในการผลิตจริงควรใช้ JWT libraries 
                และ validation libraries เช่น Zod หรือ Joi
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CloudDownload color="info" />
              <Typography variant="h6">External API Integration</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การเชื่อมต่อกับ external APIs และ proxy requests
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/api/weather/route.ts
import { NextRequest, NextResponse } from 'next/server';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function GET(request: NextRequest) {
  try {
    // รับพารามิเตอร์จาก URL
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    // เรียก external API
    const response = await fetch(
      \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${WEATHER_API_KEY}&units=metric\`,
      {
        next: { revalidate: 300 } // Cache เป็นเวลา 5 นาที
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'City not found' },
          { status: 404 }
        );
      }
      
      throw new Error(\`Weather API error: \${response.status}\`);
    }

    const weatherData = await response.json();

    // ปรับแต่งข้อมูลก่อนส่งกลับ
    const formattedData = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error('Weather API Error:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}`}
              </Typography>
            </Box>

            <Alert severity="info">
              <Typography variant="body2">
                💡 <strong>การใช้งาน:</strong> เรียกใช้ที่ /api/weather?city=Bangkok 
                สำหรับซ่อน API keys จากฝั่ง client
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Card>

      {/* Client Components Data Fetching */}
      <Card sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          💻 Client Components Data Fetching
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          การ fetch ข้อมูลใน Client Components สำหรับ interactive features
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Web color="primary" />
              <Typography variant="h6">useEffect + fetch</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              วิธีพื้นฐานในการ fetch ข้อมูลใน Client Components
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/components/PostsList.tsx
'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const data = await response.json();
        setPosts(data.slice(0, 10)); // แสดงแค่ 10 posts
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>กำลังโหลด...</h2>
        <div>โปรดรอสักครู่</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>เกิดข้อผิดพลาด</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          ลองใหม่
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>รายการโพสต์ ({posts.length} รายการ)</h2>
      {posts.map(post => (
        <div key={post.id} style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          margin: '10px 0',
          borderRadius: '5px'
        }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <small>โดย User #{post.userId}</small>
        </div>
      ))}
    </div>
  );
}`}
              </Typography>
            </Box>

            <Alert severity="success">
              <Typography variant="body2">
                ✅ <strong>Best Practice:</strong> เสมอต้องมี loading states และ error handling
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Refresh color="info" />
              <Typography variant="h6">Interactive Data Updates</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การสร้าง CRUD operations ใน Client Components
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/components/TodoManager.tsx
'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoManager() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Create todo
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo,
          completed: false,
          userId: 1,
        }),
      });

      const newTodoData = await response.json();
      
      // เพิ่ม ID ที่ไม่ซ้ำสำหรับ demo
      newTodoData.id = Date.now();
      
      setTodos([newTodoData, ...todos]);
      setNewTodo('');
      
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update todo
  const handleToggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(\`https://jsonplaceholder.typicode.com/todos/\${id}\`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
        }),
      });

      if (response.ok) {
        setTodos(todos.map(t => 
          t.id === id ? { ...t, completed: !t.completed } : t
        ));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(\`https://jsonplaceholder.typicode.com/todos/\${id}\`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h2>Todo Manager</h2>
      
      {/* Add new todo form */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="เพิ่ม todo ใหม่..."
          style={{ 
            padding: '8px', 
            marginRight: '10px', 
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'กำลังเพิ่ม...' : 'เพิ่ม'}
        </button>
      </form>

      {/* Todos list */}
      <div>
        {todos.map(todo => (
          <div 
            key={todo.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '10px',
              border: '1px solid #eee',
              margin: '5px 0',
              borderRadius: '4px'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <span 
              style={{ 
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#888' : '#000'
              }}
            >
              {todo.title}
            </span>
            <button 
              onClick={() => handleDeleteTodo(todo.id)}
              style={{ 
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ลบ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`}
              </Typography>
            </Box>

            <Alert severity="info">
              <Typography variant="body2">
                💡 <strong>Real-world tip:</strong> ใช้ libraries เช่น SWR หรือ React Query 
                เพื่อจัดการ caching และ synchronization ที่ดีกว่า
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Card>

      {/* Hands-on Practice */}
      <Card sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          ✋ ฝึกปฏิบัติ: สร้าง Data Fetching System
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          ลองสร้าง system ที่ใช้ทั้ง Server Components, API Routes และ Client Components
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <Typography variant="h6">สร้าง API Route</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้าง API endpoint สำหรับจัดการข้อมูลผู้ใช้
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  $ mkdir -p app/api/users<br/>
                  $ touch app/api/users/route.ts
                </Typography>
              </Box>

              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
{`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Mock database
let users = [
  { id: 1, name: 'สมชาย', email: 'somchai@example.com', age: 25 },
  { id: 2, name: 'สมหญิง', email: 'somying@example.com', age: 30 },
  { id: 3, name: 'สมศักดิ์', email: 'somsak@example.com', age: 35 }
];

export async function GET() {
  return NextResponse.json({
    users,
    count: users.length,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.name || !body.email || !body.age) {
      return NextResponse.json(
        { error: 'Name, email และ age จำเป็นต้องมี' },
        { status: 400 }
      );
    }

    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: body.name,
      email: body.email,
      age: parseInt(body.age)
    };

    users.push(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }
}`}
                </Typography>
              </Box>

              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  ✅ ทดสอบ API ที่ http://localhost:3000/api/users
                </Typography>
              </Alert>

              <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                ถัดไป
              </Button>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              <Typography variant="h6">สร้าง Server Component</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้างหน้าแสดงรายชื่อผู้ใช้ด้วย Server Component
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  $ mkdir -p app/users-demo<br/>
                  $ touch app/users-demo/page.tsx
                </Typography>
              </Box>

              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
{`// app/users-demo/page.tsx
import { Suspense } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

async function UsersList() {
  // Fetch ข้อมูลจาก API Route
  const response = await fetch('http://localhost:3000/api/users', {
    next: { revalidate: 30 } // Cache 30 วินาที
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  const data = await response.json();

  return (
    <div>
      <h2>รายชื่อผู้ใช้ ({data.count} คน)</h2>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        {data.users.map((user: User) => (
          <div key={user.id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{user.name}</h3>
            <p style={{ margin: '5px 0' }}>📧 {user.email}</p>
            <p style={{ margin: '5px 0' }}>🎂 {user.age} ปี</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '20px', color: '#666' }}>
        อัพเดทล่าสุด: {new Date(data.timestamp).toLocaleString('th-TH')}
      </p>
    </div>
  );
}

function LoadingUsers() {
  return (
    <div>
      <h2>กำลังโหลดรายชื่อผู้ใช้...</h2>
      <div>โปรดรอสักครู่</div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ระบบจัดการผู้ใช้</h1>
      <Suspense fallback={<LoadingUsers />}>
        <UsersList />
      </Suspense>
    </div>
  );
}`}
                </Typography>
              </Box>

              <Alert severity="info" sx={{ mb: 2 }}>
                  💡 ใช้ Suspense เพื่อแสดง loading state ขณะ fetch ข้อมูล
              </Alert>

              <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                ถัดไป
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                ย้อนกลับ
              </Button>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              <Typography variant="h6">สร้าง Client Component</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้าง form สำหรับเพิ่มผู้ใช้ใหม่ด้วย Client Component
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  $ mkdir -p app/components<br/>
                  $ touch app/components/AddUserForm.tsx
                </Typography>
              </Box>

              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
{`// app/components/AddUserForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(\`เพิ่มผู้ใช้ \${result.name} สำเร็จ!\`);
        setFormData({ name: '', email: '', age: '' });
        
        // Refresh หน้าเพื่อโหลดข้อมูลใหม่
        router.refresh();
      } else {
        setMessage(\`เกิดข้อผิดพลาด: \${result.error}\`);
      }
    } catch (error) {
      setMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '20px', 
      borderRadius: '8px',
      backgroundColor: '#fff',
      marginTop: '20px'
    }}>
      <h3>เพิ่มผู้ใช้ใหม่</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            ชื่อ:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            อีเมล:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            อายุ:
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'กำลังเพิ่ม...' : 'เพิ่ม'}
        </button>
      </form>

      {message && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          borderRadius: '4px',
          backgroundColor: message.includes('สำเร็จ') ? '#d4edda' : '#f8d7da',
          color: message.includes('สำเร็จ') ? '#155724' : '#721c24'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}`}
                </Typography>
              </Box>

              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  ✅ อย่าลืมเพิ่ม AddUserForm ในหน้า users-demo/page.tsx
                </Typography>
              </Alert>

              <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                เสร็จสิ้น
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                ย้อนกลับ
              </Button>
            </StepContent>
          </Step>
        </Stepper>

        {activeStep === 3 && (
          <Card sx={{ p: 3, mt: 3, bgcolor: 'success.light' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🎉 ยินดีด้วย! คุณสร้าง Data Fetching System แล้ว
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ตอนนี้คุณมี system ที่ครบครัน รวมถึง API Routes, Server Components และ Client Components!
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              ลองใหม่
            </Button>
          </Card>
        )}
      </Card>

      {/* Performance Tips */}
      <Card sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          ⚡ Performance Tips
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Caching Strategies" />
          <Tab label="Error Handling" />
          <Tab label="Loading States" />
        </Tabs>

        <CustomTabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
            🚀 การใช้ Cache อย่างมีประสิทธิภาพ
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" component="pre">
{`// Static data - cache ตลอดไป
const staticData = await fetch('https://api.example.com/config', {
  cache: 'force-cache'
});

// Dynamic data - ไม่ cache
const liveData = await fetch('https://api.example.com/live', {
  cache: 'no-store'
});

// Time-based revalidation
const newsData = await fetch('https://api.example.com/news', {
  next: { revalidate: 3600 } // 1 ชั่วโมง
});

// Tag-based revalidation
const productData = await fetch('https://api.example.com/products', {
  next: { tags: ['products'] }
});`}
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>Strategy:</strong> ใช้ force-cache สำหรับข้อมูลคงที่, revalidate สำหรับข้อมูลที่เปลี่ยนแปลงเป็นระยะ
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>
            🛠️ Error Handling Best Practices
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" component="pre">
{`// Server Component Error Handling
async function DataPage() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      // ส่ง error ไปยัง error boundary
      throw new Error(\`API Error: \${response.status}\`);
    }
    
    const data = await response.json();
    return <div>{/* render data */}</div>;
    
  } catch (error) {
    // Fallback UI
    return (
      <div>
        <h2>ไม่สามารถโหลดข้อมูลได้</h2>
        <p>กรุณาลองใหม่อีกครั้ง</p>
      </div>
    );
  }
}

// API Route Error Handling
export async function GET() {
  try {
    const data = await fetchExternalData();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}`}
            </Typography>
          </Box>

          <Alert severity="warning">
            <Typography variant="body2">
              ⚠️ <strong>สำคัญ:</strong> สร้าง error.tsx ใน route segments เพื่อจัดการ errors อย่างสวยงาม
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
            ⏳ Loading States และ Suspense
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" component="pre">
{`// loading.tsx ใน route segment
export default function Loading() {
  return (
    <div>
      <div>กำลังโหลด...</div>
      <div>โปรดรอสักครู่</div>
    </div>
  );
}

// Suspense boundaries
function DataPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<div>กำลังโหลดสถิติ...</div>}>
        <StatsComponent />
      </Suspense>
      
      <Suspense fallback={<div>กำลังโหลดรายการ...</div>}>
        <ListComponent />
      </Suspense>
    </div>
  );
}

// Client Component Loading States
function ClientComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <div>กำลังโหลด...</div>;
  return <div>{/* render data */}</div>;
}`}
            </Typography>
          </Box>

          <Alert severity="success">
            <Typography variant="body2">
              ✅ ใช้ loading.tsx สำหรับ route-level loading และ Suspense สำหรับ component-level
            </Typography>
          </Alert>
        </CustomTabPanel>
      </Card>

      {/* Best Practices */}
      <Card sx={{ 
        mb: { xs: 3, sm: 4 }, 
        bgcolor: 'warning.light',
        boxShadow: 1
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2, 
              color: 'warning.dark',
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600
            }}
          >
          💡 Best Practices สำคัญ
        </Typography>
          
          <Stack spacing={1.5}>
            {[
              'ใช้ Server Components สำหรับ initial data loading เพื่อ SEO และ performance ที่ดี',
              'ใช้ API Routes เพื่อซ่อน sensitive data เช่น API keys, database credentials',
              'ใช้ appropriate caching strategies: force-cache สำหรับ static data, revalidate สำหรับ time-based updates',
              'เสมอต้องมี error handling: ใช้ try-catch, error boundaries และ fallback UIs',
              'ใช้ TypeScript interfaces สำหรับ data types เพื่อ type safety และ better developer experience',
              'ใช้ loading states และ Suspense เพื่อ user experience ที่ดี'
            ].map((practice, index) => (
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
                  {practice}
                </Typography>
              </Box>
            ))}
          </Stack>
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
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 5 แล้ว
        </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.5
            }}
          >
            เยี่ยมมาก! ตอนนี้คุณเข้าใจ Data Fetching และ API Routes ใน Next.js 15 แล้ว 
            พร้อมสำหรับการเรียนรู้เรื่อง Layouts และ Templates ในบทถัดไป
          </Typography>
          
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.8rem', sm: '0.85rem' }
            }}
          >
            💡 <strong>บทถัดไป:</strong> เรียนรู้เรื่อง Layouts, Templates และ Nested Layouts 
            ใน Next.js 15 สำหรับสร้าง UI structure ที่ยืดหยุ่น
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
          href="/nextjs-basics/lesson-4"
          variant="outlined"
          size="small"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          บทที่ 4
        </Button>
        
        <Chip 
          label="5 / 18"
          color="primary"
          variant="outlined"
          size="small"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-6"
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