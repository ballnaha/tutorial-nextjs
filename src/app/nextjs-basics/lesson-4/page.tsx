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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  PlayArrow,
  ExpandMore,
  Lightbulb,
  Warning,
  Info,
  Computer,
  Link as LinkIcon,
  Navigation,
  Home,
  Search,
  Speed,
  RouteOutlined,
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

const navigationComparison = [
  {
    feature: 'การโหลดหน้า',
    traditional: 'Full page reload',
    nextjs: 'Client-side navigation',
    tradColor: 'error',
    nextColor: 'success'
  },
  {
    feature: 'ความเร็ว',
    traditional: 'ช้า (ดาวน์โหลดใหม่)',
    nextjs: 'เร็ว (prefetch แต่ไม่ cache by default ใน 15)',
    tradColor: 'error',
    nextColor: 'success'
  },
  {
    feature: 'SEO',
    traditional: 'ดี',
    nextjs: 'ดีมาก',
    tradColor: 'success',
    nextColor: 'success'
  },
  {
    feature: 'User Experience',
    traditional: 'มี loading ระหว่างหน้า',
    nextjs: 'เปลี่ยนหน้าไม่มี loading (แต่ fresh data)',
    tradColor: 'warning',
    nextColor: 'success'
  },
  {
    feature: 'JavaScript Bundle',
    traditional: 'ดาวน์โหลดทุกครั้ง',
    nextjs: 'Shared และ cached',
    tradColor: 'error',
    nextColor: 'success'
  },
  {
    feature: 'Data Freshness (Next.js 15)',
    traditional: 'Fresh data ทุกครั้ง',
    nextjs: 'Fresh data by default (ไม่ cache page)',
    tradColor: 'info',
    nextColor: 'success'
  }
];

const linkFeatures = [
  {
    title: 'Prefetching (Enhanced)',
    description: 'โหลดข้อมูลล่วงหน้าสำหรับ links ที่อยู่ใน viewport (ปรับปรุงใน Next.js 15)',
    icon: <Speed />,
    example: 'เมื่อ Link ปรากฏบนหน้าจอ Next.js จะ prefetch route นั้นโดยอัตโนมัติ'
  },
  {
    title: 'Client-side Navigation',
    description: 'เปลี่ยนหน้าโดยไม่ต้องโหลดทั้งหน้าใหม่ พร้อม fresh data',
    icon: <Navigation />,
    example: 'ใช้ History API เพื่อเปลี่ยน URL โดยไม่ refresh หน้า (data จะ fresh ใน Next.js 15)'
  },
  {
    title: 'Code Splitting',
    description: 'โหลดเฉพาะโค้ดที่จำเป็นสำหรับหน้านั้นๆ ด้วย Turbopack',
    icon: <Code />,
    example: 'แต่ละ route จะมี JavaScript bundle แยกกัน (เร็วขึ้นด้วย Turbopack)'
  },
  {
    title: 'State Preservation',
    description: 'รักษา state ของ layout components แต่ page data จะ fresh',
    icon: <RouteOutlined />,
    example: 'layout state จะคงอยู่ แต่ page components จะได้ข้อมูลใหม่ (Next.js 15)'
  }
];

export default function Lesson4Page() {
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
          🔗 บทที่ 4: Link และ Navigation
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          เรียนรู้การนำทางระหว่างหน้าด้วย Next.js Link component และ navigation hooks
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Chip label="15 นาที" color="primary" />
          <Chip label="เริ่มต้น" color="secondary" />
          <Chip label="จำเป็น" color="warning" />
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
            <ListItemText primary="เข้าใจการทำงานของ Next.js Link component" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="สามารถใช้ useRouter และ usePathname hooks ได้" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="เข้าใจ Programmatic Navigation" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="สามารถสร้าง active states สำหรับ navigation ได้" />
          </ListItem>
        </List>
      </Paper>

      {/* Introduction */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🤔 Navigation ใน Next.js คืออะไร?
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          <strong>Navigation</strong> ใน Next.js หมายถึงการเปลี่ยนหน้าเว็บไปมาระหว่าง routes ต่างๆ 
          โดย Next.js มี built-in components และ hooks ที่ทำให้การนำทางเร็วและ efficient มากขึ้น
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>ข้อดี:</strong> Next.js ใช้ client-side navigation ทำให้เปลี่ยนหน้าเร็ว 
            และมี features เช่น prefetching ที่ช่วยปรับปรุง performance
          </Typography>
        </Alert>

        {/* Comparison */}
        <Typography variant="h5" sx={{ mb: 3 }}>
          ⚡ เปรียบเทียบ Traditional vs Next.js Navigation
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>คุณสมบัติ</strong></TableCell>
                <TableCell><strong>Traditional HTML</strong></TableCell>
                <TableCell><strong>Next.js</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {navigationComparison.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.feature}</TableCell>
                  <TableCell>
                    <Chip 
                      label={item.traditional} 
                      color={item.tradColor as any}
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={item.nextjs} 
                      color={item.nextColor as any}
                      size="small" 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Link Component Features */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🌟 ฟีเจอร์ของ Next.js Link
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2,
          flexWrap: 'wrap',
          mb: 4
        }}>
          {linkFeatures.map((feature, index) => (
            <Box key={index} sx={{ flex: 1, minWidth: '250px' }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ color: 'primary.main' }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ตัวอย่าง:</strong> {feature.example}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            ✅ <strong>Performance Tip:</strong> Next.js จะ prefetch routes โดยอัตโนมัติ 
            เมื่อ Link component ปรากฏใน viewport (มองเห็นได้บนหน้าจอ)
          </Typography>
        </Alert>
      </Paper>

      {/* Basic Link Usage */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          📖 การใช้ Link Component
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinkIcon color="primary" />
              <Typography variant="h6">การใช้งานพื้นฐาน</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ตัวอย่างการใช้ Link component แบบง่ายๆ
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/components/Navigation.tsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">หน้าแรก</Link>
        </li>
        <li>
          <Link href="/about">เกี่ยวกับเรา</Link>
        </li>
        <li>
          <Link href="/products">สินค้า</Link>
        </li>
        <li>
          <Link href="/contact">ติดต่อเรา</Link>
        </li>
      </ul>
    </nav>
  );
}`}
              </Typography>
            </Box>

            <Alert severity="info">
              <Typography variant="body2">
                💡 Link component จะสร้าง &lt;a&gt; tag โดยอัตโนมัติ และจัดการ client-side navigation
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArrowForward color="success" />
              <Typography variant="h6">Dynamic Routes</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การใช้ Link กับ dynamic routes และการส่งพารามิเตอร์
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/components/ProductList.tsx
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div>
      <h2>รายการสินค้า</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>ราคา: {product.price} บาท</p>
          
          {/* Dynamic route */}
          <Link href={\`/products/\${product.id}\`}>
            ดูรายละเอียด
          </Link>
          
          {/* ใช้ object format */}
          <Link 
            href={{
              pathname: '/products/[id]',
              query: { id: product.id }
            }}
          >
            ดูรายละเอียด (แบบ object)
          </Link>
        </div>
      ))}
    </div>
  );
}`}
              </Typography>
            </Box>

            <Alert severity="success">
              <Typography variant="body2">
                ✅ สามารถใช้ template literal หรือ object format ก็ได้
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <RouteOutlined color="warning" />
              <Typography variant="h6">Link Properties</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Properties ต่างๆ ที่สามารถใช้กับ Link component
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`import Link from 'next/link';

export default function AdvancedLinks() {
  return (
    <div>
      {/* ปิด prefetching */}
      <Link href="/heavy-page" prefetch={false}>
        หน้าที่ไม่ต้อง prefetch
      </Link>

      {/* เปิดหน้าใหม่ */}
      <Link href="/external" target="_blank" rel="noopener noreferrer">
        เปิดหน้าใหม่
      </Link>

      {/* Replace แทน push */}
      <Link href="/login" replace>
        Login (replace history)
      </Link>

      {/* Scroll to top */}
      <Link href="/products" scroll={false}>
        ไปหน้าสินค้า (ไม่ scroll ขึ้นบน)
      </Link>

      {/* Custom className */}
      <Link 
        href="/about" 
        className="text-blue-500 hover:text-blue-700"
      >
        เกี่ยวกับเรา
      </Link>
    </div>
  );
}`}
              </Typography>
            </Box>

            <Alert severity="warning">
              <Typography variant="body2">
                ⚠️ prefetch={false} ใช้เมื่อไม่ต้องการให้ prefetch (เช่น หน้าที่มีข้อมูลเยอะ)
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* useRouter Hook */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🔧 useRouter Hook
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          useRouter hook ใช้สำหรับ programmatic navigation และเข้าถึงข้อมูล router
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <RouteOutlined color="primary" />
              <Typography variant="h6">Basic useRouter</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`'use client';
import { useRouter } from 'next/navigation';

export default function NavigationButtons() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // กลับหน้าก่อนหน้า
  };

  const handleGoForward = () => {
    router.forward(); // ไปหน้าถัดไป
  };

  const handleGoHome = () => {
    router.push('/'); // ไปหน้าแรก
  };

  const handleReplace = () => {
    router.replace('/dashboard'); // replace current page
  };

  const handleRefresh = () => {
    router.refresh(); // refresh current page
  };

  return (
    <div>
      <button onClick={handleGoBack}>← ย้อนกลับ</button>
      <button onClick={handleGoForward}>ถัดไป →</button>
      <button onClick={handleGoHome}>🏠 หน้าแรก</button>
      <button onClick={handleReplace}>📊 Dashboard</button>
      <button onClick={handleRefresh}>🔄 รีเฟรช</button>
    </div>
  );
}`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Home color="info" />
              <Typography variant="h6">Conditional Navigation</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ส่งข้อมูล login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        // ... login logic
      });

      if (response.ok) {
        // Login สำเร็จ - redirect ไป dashboard
        router.push('/dashboard');
      } else {
        // Login ไม่สำเร็จ - แสดง error
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
      </button>
    </form>
  );
}`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* usePathname Hook */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          📍 usePathname Hook
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          usePathname hook ใช้สำหรับดึงข้อมูล current pathname และสร้าง active states
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Home color="success" />
              <Typography variant="h6">Active Navigation</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/products', label: 'สินค้า' },
  { href: '/contact', label: 'ติดต่อเรา' }
];

export default function ActiveNavigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex space-x-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={\`px-3 py-2 rounded \${
                  isActive 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }\`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <RouteOutlined color="warning" />
              <Typography variant="h6">Advanced Pathname Matching</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdvancedNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    // Exact match
    if (path === pathname) return true;
    
    // Starts with (for nested routes)
    if (path !== '/' && pathname.startsWith(path)) return true;
    
    return false;
  };

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      return { path, label: segment };
    });
  };

  return (
    <div>
      {/* Main Navigation */}
      <nav>
        <Link 
          href="/" 
          className={isActive('/') ? 'active' : ''}
        >
          หน้าแรก
        </Link>
        <Link 
          href="/products" 
          className={isActive('/products') ? 'active' : ''}
        >
          สินค้า
        </Link>
      </nav>

      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        {getBreadcrumbs().map((crumb, index) => (
          <span key={crumb.path}>
            {' > '}
            <Link href={crumb.path}>{crumb.label}</Link>
          </span>
        ))}
      </div>

      {/* Current Page Info */}
      <div>
        <p>Current pathname: {pathname}</p>
        <p>Is products page: {pathname.startsWith('/products')}</p>
      </div>
    </div>
  );
}`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* Hands-on Practice */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          ✋ ฝึกปฏิบัติ: สร้าง Navigation System
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          ลองสร้าง navigation system ที่สมบูรณ์ตามขั้นตอนนี้
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <Typography variant="h6">สร้าง Navigation Component</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้าง navigation bar ที่มี active states
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  $ mkdir -p app/components/navigation<br/>
                  $ touch app/components/navigation/Navbar.tsx
                </Typography>
              </Box>

              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
{`// app/components/navigation/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, AppBar, Toolbar, Button } from '@mui/material';

const navItems = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/products', label: 'สินค้า' },
  { href: '/blog', label: 'บล็อก' },
  { href: '/contact', label: 'ติดต่อเรา' }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                sx={{
                  color: 'white',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}`}
                </Typography>
              </Box>

              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  ✅ นำ component นี้ไปใส่ใน layout.tsx เพื่อแสดงทุกหน้า
                </Typography>
              </Alert>

              <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                ถัดไป
              </Button>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              <Typography variant="h6">สร้าง Breadcrumbs Component</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้าง breadcrumbs ที่อัพเดตตาม current path
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  $ touch app/components/navigation/Breadcrumbs.tsx
                </Typography>
              </Box>

              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
{`// app/components/navigation/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';

const pathNames: Record<string, string> = {
  '': 'หน้าแรก',
  'about': 'เกี่ยวกับเรา',
  'products': 'สินค้า',
  'blog': 'บล็อก',
  'contact': 'ติดต่อเรา'
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (pathname === '/') return null;

  return (
    <MUIBreadcrumbs sx={{ py: 2 }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Home sx={{ mr: 0.5 }} fontSize="inherit" />
        หน้าแรก
      </Link>
      
      {segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;
        const displayName = pathNames[segment] || segment;

        return isLast ? (
          <Typography key={path} color="text.primary">
            {displayName}
          </Typography>
        ) : (
          <Link key={path} href={path}>
            {displayName}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
}`}
                </Typography>
              </Box>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  💡 ใช้ pathNames object เพื่อแปลง URL segments เป็นชื่อที่อ่านง่าย
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
              <Typography variant="h6">สร้าง Navigation Actions</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้าง component ที่ใช้ useRouter สำหรับ programmatic navigation
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  $ touch app/components/navigation/NavigationActions.tsx
                </Typography>
              </Box>

              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
{`// app/components/navigation/NavigationActions.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button, ButtonGroup, Paper } from '@mui/material';
import { 
  ArrowBack, 
  ArrowForward, 
  Home, 
  Refresh 
} from '@mui/icons-material';

export default function NavigationActions() {
  const router = useRouter();

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <ButtonGroup variant="outlined" aria-label="navigation actions">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
        >
          ย้อนกลับ
        </Button>
        
        <Button
          startIcon={<ArrowForward />}
          onClick={() => router.forward()}
        >
          ถัดไป
        </Button>
        
        <Button
          startIcon={<Home />}
          onClick={() => router.push('/')}
        >
          หน้าแรก
        </Button>
        
        <Button
          startIcon={<Refresh />}
          onClick={() => router.refresh()}
        >
          รีเฟรช
        </Button>
      </ButtonGroup>
      
      {/* Quick Navigation */}
      <ButtonGroup variant="contained" sx={{ ml: 2 }}>
        <Button onClick={() => router.push('/products')}>
          สินค้า
        </Button>
        <Button onClick={() => router.push('/about')}>
          เกี่ยวกับเรา
        </Button>
        <Button onClick={() => router.push('/contact')}>
          ติดต่อเรา
        </Button>
      </ButtonGroup>
    </Paper>
  );
}`}
                </Typography>
              </Box>

              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  ✅ ตอนนี้คุณมี navigation system ที่สมบูรณ์แล้ว!
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
              🎉 ยินดีด้วย! คุณสร้าง Navigation System แล้ว
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ตอนนี้คุณมี navigation ที่สมบูรณ์ รวมถึง active states, breadcrumbs และ programmatic navigation
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
          ⚡ Performance และ Advanced Tips
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Prefetching" />
          <Tab label="Loading States" />
          <Tab label="Error Handling" />
        </Tabs>

        <CustomTabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
            🚀 Prefetching Strategies
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" component="pre">
{`// การควบคุม prefetching
<Link href="/products" prefetch={false}>
  หน้าสินค้า (ไม่ prefetch)
</Link>

// Hover prefetch
<Link 
  href="/products" 
  onMouseEnter={() => router.prefetch('/products')}
>
  หน้าสินค้า (prefetch เมื่อ hover)
</Link>

// Conditional prefetch
{isLoggedIn && (
  <Link href="/dashboard" prefetch={true}>
    Dashboard
  </Link>
)}`}
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>การใช้งาน:</strong> ปิด prefetch สำหรับหน้าที่มีข้อมูลเยอะ หรือต้องการ authentication
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
            ⏳ Loading States
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" component="pre">
{`'use client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function NavigationWithLoading() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (url: string) => {
    startTransition(() => {
      router.push(url);
    });
  };

  return (
    <div>
      <button 
        onClick={() => handleNavigation('/products')}
        disabled={isPending}
      >
        {isPending ? 'กำลังโหลด...' : 'ไปหน้าสินค้า'}
      </button>
      
      {isPending && <div>กำลังเปลี่ยนหน้า...</div>}
    </div>
  );
}`}
            </Typography>
          </Box>

          <Alert severity="warning">
            <Typography variant="body2">
              ⚠️ ใช้ useTransition เพื่อจัดการ loading states ระหว่างการเปลี่ยนหน้า
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>
            🛠️ Error Handling
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" component="pre">
{`'use client';
import { useRouter } from 'next/navigation';

export default function SafeNavigation() {
  const router = useRouter();

  const handleSafeNavigation = async (url: string) => {
    try {
      // ตรวจสอบ URL ก่อน
      if (!url || !url.startsWith('/')) {
        throw new Error('Invalid URL');
      }

      router.push(url);
    } catch (error) {
      console.error('Navigation error:', error);
      alert('ไม่สามารถเปลี่ยนหน้าได้');
    }
  };

  return (
    <div>
      <button onClick={() => handleSafeNavigation('/products')}>
        ไปหน้าสินค้า (ปลอดภัย)
      </button>
    </div>
  );
}`}
            </Typography>
          </Box>

          <Alert severity="error">
            <Typography variant="body2">
              ❌ เสมอต้อง validate URLs และจัดการ errors ที่อาจเกิดขึ้น
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
              primary="ใช้ Link component แทน <a> tag"
              secondary="ให้ Next.js จัดการ client-side navigation และ prefetching"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ absolute paths สำหรับ internal links"
              secondary="เริ่มต้นด้วย / เสมอ เช่น /products แทน products"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ระวังการใช้ prefetch={false}"
              secondary="ใช้เฉพาะเมื่อจำเป็น เพราะจะลด performance"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ usePathname สำหรับ active states"
              secondary="แทนการใช้ window.location ที่ไม่ optimal"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ router.replace() สำหรับ redirects"
              secondary="เมื่อไม่ต้องการให้ user กลับไปหน้าเก่าได้"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="จัดการ loading states อย่างเหมาะสม"
              secondary="ใช้ useTransition หรือ loading.tsx สำหรับ UX ที่ดี"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Next Steps */}
      <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.dark' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 4 แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          ยอดเยี่ยม! ตอนนี้คุณเข้าใจการทำ Navigation ใน Next.js แล้ว 
          พร้อมสำหรับการเรียนรู้เรื่อง Data Fetching และ API Routes ในบทถัดไป
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>บทถัดไป:</strong> เรียนรู้ Data Fetching และ API Routes เพื่อจัดการข้อมูลในแอปพลิเคชัน
          </Typography>
        </Alert>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-3"
          variant="outlined"
        >
          บทที่ 3: Server vs Client Components
        </Button>
        
        <Chip 
          label="4 / 16"
          color="primary"
          variant="outlined"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-5"
          variant="contained"
          color="primary"
        >
          บทที่ 5: Data Fetching & API Routes
        </Button>
      </Box>
    </Container>
  );
} 