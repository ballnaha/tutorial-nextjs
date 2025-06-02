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
  Divider,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          📁 บทที่ 2: File-based Routing
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          เรียนรู้ระบบการนำทางที่ใช้ไฟล์และโฟลเดอร์ในการสร้าง routes
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Chip label="25 นาที" color="primary" />
          <Chip label="เริ่มต้น" color="secondary" />
          <Chip label="สำคัญ" color="warning" />
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
            <ListItemText primary="เข้าใจความแตกต่างระหว่าง Pages Router และ App Router" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="สามารถสร้าง Static Routes และ Dynamic Routes ได้" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="รู้จักการใช้ Route Groups และ Special Files" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="เข้าใจโครงสร้าง Nested Routes และ Catch-all Routes" />
          </ListItem>
        </List>
      </Paper>

      {/* What is File-based Routing */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🤔 File-based Routing คืออะไร?
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          <strong>File-based Routing</strong> เป็นระบบการสร้าง routes โดยใช้โครงสร้างไฟล์และโฟลเดอร์ 
          แทนการเขียนการตั้งค่า routing แบบ manual ทำให้การจัดการ routes ง่ายและเป็นระเบียบมากขึ้น
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>ข้อดี:</strong> ไม่ต้องเขียน routing config แยก, โครงสร้างชัดเจน, 
            แยกแยะหน้าต่างๆ ได้ง่าย, และ IDE สามารถ autocomplete path ได้
          </Typography>
        </Alert>

        {/* Pages Router vs App Router Comparison */}
        <Typography variant="h5" sx={{ mb: 3 }}>
          🔄 Pages Router vs App Router
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Pages Router (เก่า)" />
          <Tab label="App Router (ใหม่)" />
          <Tab label="เปรียบเทียบ" />
        </Tabs>

        <CustomTabPanel value={tabValue} index={0}>
          <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
              📂 Pages Router (Next.js 12 และเก่ากว่า)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              ใช้โฟลเดอร์ `pages/` และไฟล์แต่ละไฟล์เป็น route
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`pages/
├── index.js        → /
├── about.js        → /about  
├── blog/
│   ├── index.js    → /blog
│   └── [slug].js   → /blog/:slug
└── api/
    └── users.js    → /api/users`}
              </Typography>
            </Box>

            <Alert severity="warning">
              <Typography variant="body2">
                ⚠️ Pages Router ยังคงใช้ได้ แต่ App Router เป็น default ใน Next.js 13+
              </Typography>
            </Alert>
          </Paper>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 3, bgcolor: 'success.light' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'success.dark' }}>
              🎯 App Router (Next.js 13+)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              ใช้โฟลเดอร์ `app/` และไฟล์ `page.tsx` เป็น route
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
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
            </Box>

            <Alert severity="success">
              <Typography variant="body2">
                ✅ App Router รองรับ Server Components, Streaming, และฟีเจอร์ใหม่ๆ
              </Typography>
            </Alert>
          </Paper>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>คุณสมบัติ</strong></TableCell>
                  <TableCell><strong>Pages Router</strong></TableCell>
                  <TableCell><strong>App Router</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>โฟลเดอร์หลัก</TableCell>
                  <TableCell>pages/</TableCell>
                  <TableCell>app/</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ไฟล์ route</TableCell>
                  <TableCell>index.js, about.js</TableCell>
                  <TableCell>page.tsx</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Layout</TableCell>
                  <TableCell>_app.js, _document.js</TableCell>
                  <TableCell>layout.tsx</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>API Routes</TableCell>
                  <TableCell>pages/api/</TableCell>
                  <TableCell>app/api/.../route.ts</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Server Components</TableCell>
                  <TableCell>❌</TableCell>
                  <TableCell>✅ (default)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Streaming</TableCell>
                  <TableCell>❌</TableCell>
                  <TableCell>✅</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
      </Paper>

      {/* Route Types */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🛣️ ประเภทของ Routes
        </Typography>

        {routingExamples.map((example, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Route color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{example.type}</Typography>
                  <Typography variant="body2" color="text.secondary">
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
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {example.description}
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, fontFamily: 'monospace' }}>
                <Typography variant="body2" component="pre">
                  {example.code}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* Route Groups */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          📦 Route Groups
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          Route Groups ช่วยให้เราจัดกลุ่ม routes โดยไม่ส่งผลต่อ URL structure 
          โดยใช้วงเล็บ () ครอบชื่อโฟลเดอร์
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>ประโยชน์:</strong> จัดระเบียบโค้ด, แยก layout ตามกลุ่ม, 
            และสามารถมี layout ต่างกันในแต่ละกลุ่ม
          </Typography>
        </Alert>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 3,
          flexWrap: 'wrap'
        }}>
          {routeGroups.map((group, index) => (
            <Box key={index} sx={{ flex: 1, minWidth: '300px' }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    {group.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {group.description}
                  </Typography>
                  
                  <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                    {group.structure.map((item, i) => (
                      <Typography key={i} variant="body2" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Special Files */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          📄 Special Files
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          App Router มีไฟล์พิเศษที่มีหน้าที่เฉพาะ ช่วยให้เราสร้าง UX ที่ดีขึ้น
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2,
          flexWrap: 'wrap'
        }}>
          {specialFiles.map((file, index) => (
            <Box key={index} sx={{ flex: 1, minWidth: '200px' }}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Box sx={{ color: `${file.color}.main`, mb: 2 }}>
                  {file.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontFamily: 'monospace' }}>
                  {file.file}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {file.description}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography variant="body2">
            ⚠️ <strong>หมายเหตุ:</strong> ไฟล์เหล่านี้จะถูกใช้โดยอัตโนมัติ 
            เมื่อ Next.js ตรวจพบในโฟลเดอร์ route
          </Typography>
        </Alert>
      </Paper>

      {/* Practical Example */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🛠️ ตัวอย่างการใช้งานจริง
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          มาลองสร้างโครงสร้าง routes สำหรับเว็บไซต์ e-commerce กัน
        </Typography>

        <Box className="code-block" sx={{ p: 3, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
          <Typography variant="body2" component="pre">
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
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>
          💡 ข้อดีของโครงสร้างนี้:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText primary="แยก layout ตามประเภทหน้า (marketing, shop, auth)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText primary="โครงสร้างชัดเจน เข้าใจง่าย" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText primary="สามารถปรับแต่ง layout แต่ละกลุ่มได้อิสระ" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText primary="รองรับ nested routes ที่ซับซ้อน" />
          </ListItem>
        </List>
      </Paper>

      {/* Hands-on Practice */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          ✋ ฝึกปฏิบัติ: สร้าง Routes
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          ลองทำตามขั้นตอนนี้เพื่อสร้าง routes ต่างๆ ในโปรเจค Next.js ของคุณ
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <Typography variant="h6">สร้าง Static Route</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้างหน้า About โดยการสร้างโฟลเดอร์และไฟล์ดังนี้:
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  $ mkdir -p app/about<br/>
                  $ touch app/about/page.tsx
                </Typography>
              </Box>

              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
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
              </Box>

              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  ✅ ตอนนี้คุณสามารถเข้าถึงหน้านี้ได้ที่ http://localhost:3000/about
                </Typography>
              </Alert>

              <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                ถัดไป
              </Button>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              <Typography variant="h6">สร้าง Dynamic Route</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้างหน้าบทความที่รับพารามิเตอร์ slug:
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  $ mkdir -p app/blog/[slug]<br/>
                  $ touch app/blog/[slug]/page.tsx
                </Typography>
              </Box>

              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
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
              </Box>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  💡 ลองเข้าไป /blog/my-first-post หรือ /blog/learning-nextjs
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
              <Typography variant="h6">สร้าง Route Group</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้าง Route Group สำหรับหน้า dashboard:
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  $ mkdir -p app/(dashboard)/admin<br/>
                  $ touch app/(dashboard)/layout.tsx<br/>
                  $ touch app/(dashboard)/admin/page.tsx
                </Typography>
              </Box>

              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
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
              </Box>

              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  ✅ หน้า /admin จะใช้ layout พิเศษสำหรับ dashboard
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
              🎉 ยินดีด้วย! คุณเรียนรู้ File-based Routing แล้ว
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ตอนนี้คุณสามารถสร้าง routes แบบต่างๆ ได้แล้ว และเข้าใจโครงสร้างของ App Router
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              ลองใหม่
            </Button>
          </Paper>
        )}
      </Paper>

      {/* Best Practices */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'warning.light' }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'warning.dark' }}>
          💡 Best Practices
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ Route Groups เพื่อจัดระเบียบโค้ด"
              secondary="แยกกลุ่ม routes ตามหน้าที่ เช่น (marketing), (dashboard), (auth)"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ตั้งชื่อโฟลเดอร์ให้สื่อความหมาย"
              secondary="ใช้ชื่อที่อธิบายหน้าที่ชัดเจน เช่น products, user-profile"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ TypeScript สำหรับ props"
              secondary="กำหนด type ให้ params และ searchParams เพื่อ type safety"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="สร้าง error.tsx และ loading.tsx"
              secondary="เพื่อให้ UX ดีขึ้นเมื่อเกิดข้อผิดพลาดหรือกำลังโหลด"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Next Steps */}
      <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.dark' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 2 แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          ตอนนี้คุณเข้าใจ File-based Routing แล้ว! 
          พร้อมสำหรับการเรียนรู้เรื่อง Server Components vs Client Components ในบทถัดไป
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>บทถัดไป:</strong> เรียนรู้ Server Components vs Client Components ซึ่งเป็นฟีเจอร์ใหม่ที่สำคัญของ Next.js 13+
          </Typography>
        </Alert>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-1"
          variant="outlined"
        >
          บทที่ 1: เริ่มต้นกับ Next.js
        </Button>
        
        <Chip 
          label="2 / 16"
          color="primary"
          variant="outlined"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-3"
          variant="contained"
          color="primary"
        >
          บทที่ 3: Server vs Client Components
        </Button>
      </Box>
    </Container>
  );
} 