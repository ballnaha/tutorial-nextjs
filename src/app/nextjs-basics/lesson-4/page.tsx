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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
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
          🔗 บทที่ 4: Link และ Navigation
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
          เรียนรู้การนำทางระหว่างหน้าด้วย Next.js Link component และ navigation hooks ใน Next.js 15
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
          <Chip label="20 นาที" color="primary" size="small" />
          <Chip label="เริ่มต้น" color="secondary" size="small" />
          <Chip label="จำเป็น" color="warning" size="small" />
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
              'เข้าใจการทำงานของ Next.js Link component ใน Next.js 15',
              'รู้จักความแตกต่างระหว่าง Link และ <a> tag ปกติ',
              'สามารถใช้ navigation hooks สำหรับจัดการ routing',
              'เข้าใจ prefetching และ fresh data behavior ใน Next.js 15'
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
            🤔 Navigation ใน Next.js คืออะไร?
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3, 
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}
          >
            <strong>Navigation ใน Next.js</strong> หมายถึงการเปลี่ยนหน้าระหว่าง routes ต่างๆ โดยไม่ต้องโหลดหน้าเว็บใหม่ทั้งหมด 
            ทำให้การใช้งานเร็วและลื่นไหลมากขึ้น พร้อมกับ fresh data ใน Next.js 15
          </Typography>

          <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
            💡 <strong>สำคัญ:</strong> ใน Next.js 15 navigation จะได้ fresh data โดย default 
            แต่ยังคงได้ประโยชน์จาก client-side navigation และ prefetching
          </Alert>

          {/* Comparison */}
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600
            }}
          >
            ⚡ เปรียบเทียบ Traditional vs Next.js Navigation
          </Typography>

          <Card sx={{ boxShadow: 1 }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      <strong>คุณสมบัติ</strong>
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      <strong>Traditional HTML</strong>
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      <strong>Next.js</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {navigationComparison.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        {item.feature}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={item.traditional} 
                          color={item.tradColor as any}
                          size="small" 
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={item.nextjs} 
                          color={item.nextColor as any}
                          size="small" 
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </CardContent>
      </Card>

      {/* Link Component Features */}
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
            🌟 ฟีเจอร์ของ Next.js Link
          </Typography>

          <Stack spacing={2} sx={{ mb: 4 }}>
            {linkFeatures.map((feature, index) => (
              <Card key={index} sx={{ boxShadow: 1 }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ color: 'primary.main' }}>
                      {React.cloneElement(feature.icon, { 
                        sx: { fontSize: { xs: 20, sm: 24 } }
                      })}
                    </Box>
                    <Typography 
                      variant="h6"
                      sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                    >
                      {feature.title}
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
                    {feature.description}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                  >
                    <strong>ตัวอย่าง:</strong> {feature.example}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Alert severity="success" sx={{ mb: 3, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
            ✅ <strong>Performance Tip:</strong> Next.js จะ prefetch routes โดยอัตโนมัติ 
            เมื่อ Link component ปรากฏใน viewport (มองเห็นได้บนหน้าจอ)
          </Alert>
        </CardContent>
      </Card>

      {/* Basic Link Usage */}
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
            📖 การใช้ Link Component
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
                  <LinkIcon 
                    color="primary" 
                    sx={{ fontSize: { xs: 18, sm: 20 } }}
                  />
                  <Typography 
                    variant="h6"
                    sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                  >
                    การใช้งานพื้นฐาน
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
                  ตัวอย่างการใช้ Link component แบบง่ายๆ
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
                  </CardContent>
                </Card>

                <Alert severity="info" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                  💡 Link component จะสร้าง &lt;a&gt; tag โดยอัตโนมัติ และจัดการ client-side navigation
                </Alert>
              </AccordionDetails>
            </Accordion>

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
                  <ArrowForward 
                    color="success" 
                    sx={{ fontSize: { xs: 18, sm: 20 } }}
                  />
                  <Typography 
                    variant="h6"
                    sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                  >
                    Dynamic Routes
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
                  การใช้ Link กับ dynamic routes และการส่งพารามิเตอร์
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
        </div>
      ))}
    </div>
  );
}`}
                    </Typography>
                  </CardContent>
                </Card>

                <Alert severity="success" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                  ✅ สามารถใช้ template literal สำหรับ dynamic routes ได้ง่าย
                </Alert>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </CardContent>
      </Card>

      {/* useRouter Hook */}
      <Card sx={{ p: 4, mb: 4 }}>
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
      </Card>

      {/* usePathname Hook */}
      <Card sx={{ p: 4, mb: 4 }}>
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
            ✋ ฝึกปฏิบัติ: สร้าง Navigation System
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              lineHeight: 1.6
            }}
          >
            ลองทำตามขั้นตอนนี้เพื่อสร้าง navigation system ที่สมบูรณ์
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
                  สร้าง Basic Navigation
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
                  สร้าง navigation component พื้นฐาน:
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
{`// app/components/Navigation.tsx
'use client';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><Link href="/">หน้าแรก</Link></li>
        <li><Link href="/about">เกี่ยวกับ</Link></li>
        <li><Link href="/products">สินค้า</Link></li>
        <li><Link href="/contact">ติดต่อ</Link></li>
      </ul>
    </nav>
  );
}`}
                    </Typography>
                  </CardContent>
                </Card>

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
                  เพิ่ม Active States
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
                  เพิ่ม active states เพื่อแสดงหน้าปัจจุบัน:
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
{`// app/components/Navigation.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li>
          <Link 
            href="/" 
            style={{ 
              color: pathname === '/' ? 'blue' : 'black',
              fontWeight: pathname === '/' ? 'bold' : 'normal'
            }}
          >
            หน้าแรก
          </Link>
        </li>
        {/* เพิ่ม active state สำหรับลิงก์อื่นๆ */}
      </ul>
    </nav>
  );
}`}
                    </Typography>
                  </CardContent>
                </Card>

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
                  เพิ่ม Programmatic Navigation
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
                  เพิ่มปุ่มสำหรับ navigation แบบ programmatic:
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
{`// app/components/NavigationButtons.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function NavigationButtons() {
  const router = useRouter();

  return (
    <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
      <button onClick={() => router.push('/')}>
        หน้าแรก
      </button>
      <button onClick={() => router.push('/about')}>
        เกี่ยวกับเรา
      </button>
      <button onClick={() => router.push('/contact')}>
        ติดต่อเรา
      </button>
    </div>
  );
}`}
                    </Typography>
                  </CardContent>
                </Card>

                <Alert severity="success" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                  ✅ ตอนนี้คุณมี navigation system ที่สมบูรณ์แล้ว!
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
                  เสร็จสิ้น
                </Button>
                <Button 
                  onClick={handleBack} 
                  size="small"
                  sx={{ 
                    mt: 1, 
                    mr: 1,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                >
                  ย้อนกลับ
                </Button>
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
                  🎉 ยินดีด้วย! คุณสร้าง Navigation System แล้ว
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.5
                  }}
                >
                  ตอนนี้คุณมี navigation ที่สมบูรณ์ รวมถึง active states และ programmatic navigation
                </Typography>
                <Button 
                  onClick={handleReset} 
                  size="small"
                  sx={{ 
                    mt: 1, 
                    mr: 1,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                >
                  ลองใหม่
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Performance Tips */}
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
            ⚡ Performance และ Advanced Tips
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
            <Tab label="Prefetching" />
            <Tab label="Loading States" />
            <Tab label="Error Handling" />
          </Tabs>

          <CustomTabPanel value={tabValue} index={0}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: 'success.main',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              🚀 Prefetching Strategies
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
              </CardContent>
            </Card>

            <Alert severity="info" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
              💡 <strong>การใช้งาน:</strong> ปิด prefetch สำหรับหน้าที่มีข้อมูลเยอะ หรือต้องการ authentication
            </Alert>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: 'info.main',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              ⏳ Loading States
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
              </CardContent>
            </Card>

            <Alert severity="warning" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
              ⚠️ ใช้ useTransition เพื่อจัดการ loading states ระหว่างการเปลี่ยนหน้า
            </Alert>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: 'error.main',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              🛠️ Error Handling
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
              </CardContent>
            </Card>

            <Alert severity="error" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
              ❌ เสมอต้อง validate URLs และจัดการ errors ที่อาจเกิดขึ้น
            </Alert>
          </CustomTabPanel>
        </CardContent>
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
              'ใช้ Link component แทน <a> tag เพื่อให้ Next.js จัดการ client-side navigation',
              'ใช้ absolute paths สำหรับ internal links (เริ่มต้นด้วย /)',
              'ระวังการใช้ prefetch={false} เพราะจะลด performance',
              'ใช้ usePathname สำหรับ active states แทน window.location',
              'ใช้ router.replace() สำหรับ redirects ที่ไม่ต้องการ back navigation',
              'จัดการ loading states ด้วย useTransition หรือ loading.tsx'
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
            🎯 ยินดีด้วย! คุณเรียนจบบทที่ 4 แล้ว
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.5
            }}
          >
            ตอนนี้คุณเข้าใจการใช้ Link component และ navigation hooks ใน Next.js 15 แล้ว! 
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
          href="/nextjs-basics/lesson-3"
          variant="outlined"
          size="small"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          บทที่ 3
        </Button>
        
        <Chip 
          label="4 / 18"
          color="primary"
          variant="outlined"
          size="small"
        />

        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-5"
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