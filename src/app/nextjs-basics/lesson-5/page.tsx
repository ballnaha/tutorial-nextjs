'use client';
import {
  Container,
  Typography,
  Box,
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
  Tabs,
  Tab,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    icon: <Storage />,
    color: 'info'
  },
  {
    strategy: 'Client-side Fetching',
    description: 'Fetch ใน browser หลัง hydration',
    example: 'Interactive data, User actions',
    icon: <Storage />,
    color: 'warning'
  },
  {
    strategy: 'Incremental Static Regeneration',
    description: 'Re-generate static pages เมื่อมีการเปลี่ยนแปลง',
    example: 'E-commerce, CMS content',
    icon: <Storage />,
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
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          📡 บทที่ 5: Data Fetching & API Routes
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          เรียนรู้การดึงข้อมูลและสร้าง API endpoints ใน Next.js 15+ App Router พร้อม React 19
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Chip label="30 นาที" color="primary" />
          <Chip label="ปานกลาง" color="secondary" />
          <Chip label="สำคัญมาก" color="error" />
          <Chip label="Next.js 15" color="success" />
        </Box>
      </Box>

      {/* Learning Objectives */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Lightbulb /> วัตถุประสงค์การเรียนรู้
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="เข้าใจการ fetch ข้อมูลใน Server Components พร้อม React 19" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="สามารถสร้าง API Routes ใน Next.js 15+ พร้อม async request APIs ได้" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="เข้าใจ Enhanced Caching strategies ใน Next.js 15 (ไม่ cache by default)" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="สามารถจัดการ Loading states และ Error handling ได้" />
          </ListItem>
        </List>
      </Paper>

      {/* Introduction */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🤔 Data Fetching ใน Next.js 15 คืออะไร?
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          <strong>Data Fetching</strong> หมายถึงการดึงข้อมูลจากแหล่งต่างๆ เช่น API, Database, หรือ File system 
          โดย Next.js 15 มีการเปลี่ยนแปลงสำคัญในระบบ caching และ async request APIs ที่ทำให้การจัดการข้อมูลดีขึ้น
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            🎉 <strong>ใหม่ใน Next.js 15:</strong> ไม่ cache โดย default อีกต่อไป! 
            Async request APIs (cookies, headers, params) และ Enhanced caching control
          </Typography>
        </Alert>

        <Alert severity="warning" sx={{ mb: 4 }}>
          <Typography variant="body2">
            ⚠️ <strong>Breaking Changes ใน Next.js 15:</strong> API Routes ไม่ cache GET requests by default, 
            params เป็น async, และ fetch requests ไม่ cache by default
          </Typography>
        </Alert>

        {/* Fetching Methods Comparison */}
        <Typography variant="h5" sx={{ mb: 3 }}>
          🎯 วิธีการ Fetch ข้อมูลใน Next.js
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 3, 
          mb: 4 
        }}>
          {fetchingMethods.map((method, index) => (
            <Card key={index} sx={{ flex: 1 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ color: 'primary.main' }}>
                    {method.icon}
                  </Box>
                  <Typography variant="h6">
                    {method.method}
                  </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {method.description}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>ใช้เมื่อ:</strong> {method.when}
                </Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold' }}>
                      ข้อดี:
                    </Typography>
                    {method.pros.map((pro, i) => (
                      <Typography key={i} variant="caption" display="block" color="success.main">
                        • {pro}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="error.main" sx={{ fontWeight: 'bold' }}>
                      ข้อเสีย:
                    </Typography>
                    {method.cons.map((con, i) => (
                      <Typography key={i} variant="caption" display="block" color="error.main">
                        • {con}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Caching Strategies */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🚀 Caching Strategies
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Next.js มี caching strategies หลายแบบที่ช่วยเพิ่มประสิทธิภาพ
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2,
          flexWrap: 'wrap',
          mb: 4
        }}>
          {cachingStrategies.map((strategy, index) => (
            <Box key={index} sx={{ flex: 1, minWidth: '250px' }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ color: `${strategy.color}.main` }}>
                      {strategy.icon}
                    </Box>
                    <Typography variant="h6">
                      {strategy.strategy}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {strategy.description}
                  </Typography>
                  <Chip 
                    label={strategy.example} 
                    color={strategy.color as any}
                    size="small" 
                  />
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            ✅ <strong>Performance Tip:</strong> Next.js จะ cache fetch requests โดยอัตโนมัติ 
            และสามารถกำหนด revalidate time ได้
          </Typography>
        </Alert>
      </Paper>

      {/* Server Components Data Fetching */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🖥️ Server Components Data Fetching
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          ใน Next.js 13+ สามารถใช้ fetch โดยตรงใน Server Components ได้ โดยไม่ต้องใช้ getServerSideProps
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Storage color="success" />
              <Typography variant="h6">Basic Server-side Fetching</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ตัวอย่างการ fetch ข้อมูลพื้นฐานใน Server Component
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
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
            </Box>

            <Alert severity="success">
              <Typography variant="body2">
                ✅ <strong>ข้อดี:</strong> ข้อมูลจะถูก render บนเซิร์ฟเวอร์ ทำให้ SEO ดีและโหลดเร็ว
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Timer color="info" />
              <Typography variant="h6">Caching และ Revalidation</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การกำหนด cache และ revalidate time สำหรับ fetch requests
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/news/page.tsx
async function NewsPage() {
  // Cache เป็นเวลา 60 วินาที
  const response = await fetch('https://api.example.com/news', {
    next: { revalidate: 60 }
  });
  const news = await response.json();

  return (
    <div>
      <h1>ข่าวสาร (อัพเดททุก 60 วินาที)</h1>
      {news.map((item: any) => (
        <article key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <small>อัพเดท: {new Date(item.publishedAt).toLocaleDateString('th-TH')}</small>
        </article>
      ))}
    </div>
  );
}

// สำหรับข้อมูลแบบ Static (ไม่เปลี่ยนแปลง)
async function StaticPage() {
  const response = await fetch('https://api.example.com/config', {
    cache: 'force-cache' // Cache ตลอดไป
  });
  const config = await response.json();

  return <div>{/* render config */}</div>;
}

// สำหรับข้อมูลแบบ Dynamic (เปลี่ยนแปลงบ่อย)
async function DynamicPage() {
  const response = await fetch('https://api.example.com/live-data', {
    cache: 'no-store' // ไม่ cache เลย
  });
  const data = await response.json();

  return <div>{/* render real-time data */}</div>;
}`}
              </Typography>
            </Box>

            <Alert severity="info">
              <Typography variant="body2">
                💡 <strong>Revalidate Options:</strong> next.revalidate สำหรับ time-based, 
                cache: 'no-store' สำหรับ real-time, cache: 'force-cache' สำหรับ static
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Warning color="error" />
              <Typography variant="h6">Error Handling</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การจัดการ errors และ fallbacks ใน Server Components
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/products/page.tsx
async function ProductsPage() {
  try {
    const response = await fetch('https://api.example.com/products');
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const products = await response.json();

    return (
      <div>
        <h1>สินค้าทั้งหมด ({products.length} รายการ)</h1>
        {products.map((product: any) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>ราคา: {product.price} บาท</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    
    return (
      <div>
        <h1>เกิดข้อผิดพลาด</h1>
        <p>ไม่สามารถโหลดข้อมูลสินค้าได้ในขณะนี้</p>
        <p>กรุณาลองใหม่อีกครั้ง</p>
      </div>
    );
  }
}

// หรือใช้ error.tsx สำหรับ error boundary
export default ProductsPage;`}
              </Typography>
            </Box>

            <Alert severity="warning">
              <Typography variant="body2">
                ⚠️ <strong>สำคัญ:</strong> สำหรับ production ควรสร้าง error.tsx ใน route เพื่อจัดการ errors อย่างสวยงาม
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DataObject color="warning" />
              <Typography variant="h6">Multiple Data Sources</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การดึงข้อมูลจากหลายแหล่งพร้อมกัน
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/dashboard/page.tsx
async function DashboardPage() {
  // Fetch หลาย API พร้อมกัน
  const [postsResponse, usersResponse, commentsResponse] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts'),
    fetch('https://jsonplaceholder.typicode.com/users'), 
    fetch('https://jsonplaceholder.typicode.com/comments')
  ]);

  const [posts, users, comments] = await Promise.all([
    postsResponse.json(),
    usersResponse.json(),
    commentsResponse.json()
  ]);

  return (
    <div>
      <h1>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div>
          <h2>Posts ({posts.length})</h2>
          {posts.slice(0, 3).map((post: any) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
        
        <div>
          <h2>Users ({users.length})</h2>
          {users.slice(0, 3).map((user: any) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
        
        <div>
          <h2>Comments ({comments.length})</h2>
          {comments.slice(0, 3).map((comment: any) => (
            <div key={comment.id}>{comment.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;`}
              </Typography>
            </Box>

            <Alert severity="success">
              <Typography variant="body2">
                ✅ <strong>Performance Tip:</strong> ใช้ Promise.all() เพื่อ fetch หลาย APIs พร้อมกัน
                แทนการ fetch ทีละตัว
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* API Routes */}
      <Paper sx={{ p: 4, mb: 4 }}>
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
      </Paper>

      {/* Client Components Data Fetching */}
      <Paper sx={{ p: 4, mb: 4 }}>
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
      </Paper>

      {/* Hands-on Practice */}
      <Paper sx={{ p: 4, mb: 4 }}>
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
                <Typography variant="body2">
                  💡 ใช้ Suspense เพื่อแสดง loading state ขณะ fetch ข้อมูล
                </Typography>
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
          <Paper sx={{ p: 3, mt: 3, bgcolor: 'success.light' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🎉 ยินดีด้วย! คุณสร้าง Data Fetching System แล้ว
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ตอนนี้คุณมี system ที่ครบครัน รวมถึง API Routes, Server Components และ Client Components!
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              ลองใหม่
            </Button>
          </Paper>
        )}
      </Paper>

      {/* Performance Tips */}
      <Paper sx={{ p: 4, mb: 4 }}>
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
      </Paper>

      {/* Best Practices */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'warning.light' }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'warning.dark' }}>
          💡 Best Practices สำคัญ
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ Server Components สำหรับ initial data loading"
              secondary="เพื่อ SEO และ performance ที่ดี"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ API Routes เพื่อซ่อน sensitive data"
              secondary="เช่น API keys, database credentials"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ appropriate caching strategies"
              secondary="force-cache สำหรับ static data, revalidate สำหรับ time-based updates"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="เสมอต้องมี error handling"
              secondary="ใช้ try-catch, error boundaries และ fallback UIs"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ TypeScript interfaces สำหรับ data types"
              secondary="เพื่อ type safety และ better developer experience"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ loading states และ Suspense"
              secondary="เพื่อ user experience ที่ดี"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Next Steps */}
      <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.dark' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 5 แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          เยี่ยมมาก! ตอนนี้คุณเข้าใจ Data Fetching และ API Routes แล้ว 
          พร้อมสำหรับการเรียนรู้การใช้ Prisma สำหรับจัดการฐานข้อมูลในบทถัดไป
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>บทถัดไป:</strong> เรียนรู้การใช้ Prisma สำหรับจัดการฐานข้อมูลอย่างมีประสิทธิภาพ
          </Typography>
        </Alert>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-4"
          variant="outlined"
        >
          บทที่ 4: Link และ Navigation
        </Button>
        
        <Chip 
          label="5 / 16"
          color="primary"
          variant="outlined"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-6"
          variant="contained"
          color="primary"
        >
          บทที่ 6: Prisma & Database
        </Button>
      </Box>
    </Container>
  );
} 