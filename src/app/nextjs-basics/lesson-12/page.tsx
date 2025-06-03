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
  Chip,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Stack,
  Avatar,
  Switch,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  Security,
  Code,
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Warning,
  Info,
  Error as ErrorIcon,
  Speed,
  Shield,
  Lock,
  Public,
  VpnLock,
  Gavel,
  Visibility,
  VisibilityOff,
  ExpandMore,
  ExpandLess,
  Language,
  Block,
  AccessTime,
  PlayArrow,
  Lightbulb,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lesson-tabpanel-${index}`}
      aria-labelledby={`lesson-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Demo Components
function SecurityHeadersDemo() {
  const [headersVisible, setHeadersVisible] = useState(false);
  
  const securityHeaders = [
    {
      name: 'Content-Security-Policy',
      value: "default-src 'self'; script-src 'self' 'unsafe-inline'",
      description: 'ป้องกัน XSS attacks'
    },
    {
      name: 'X-Frame-Options',
      value: 'DENY',
      description: 'ป้องกัน clickjacking'
    },
    {
      name: 'X-Content-Type-Options',
      value: 'nosniff',
      description: 'ป้องกัน MIME type sniffing'
    },
    {
      name: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
      description: 'ควบคุมการส่ง referrer'
    },
    {
      name: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()',
      description: 'ควบคุม browser features'
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🛡️ Security Headers Demo
        </Typography>
        
        <Button
          variant="outlined"
          onClick={() => setHeadersVisible(!headersVisible)}
          endIcon={headersVisible ? <ExpandLess /> : <ExpandMore />}
          sx={{ mb: 2 }}
        >
          {headersVisible ? 'ซ่อน' : 'แสดง'} Security Headers
        </Button>
        
        <Collapse in={headersVisible}>
          <Stack spacing={2}>
            {securityHeaders.map((header, index) => (
              <Paper key={index} sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                  {header.name}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1, bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                  {header.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {header.description}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  );
}

function RateLimitDemo() {
  const [requestCount, setRequestCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [resetTime, setResetTime] = useState(60);

  const makeRequest = () => {
    if (isBlocked) return;
    
    const newCount = requestCount + 1;
    setRequestCount(newCount);
    
    if (newCount >= 5) {
      setIsBlocked(true);
      setResetTime(60);
      
      // Simulate reset after 60 seconds
      const interval = setInterval(() => {
        setResetTime(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setRequestCount(0);
            clearInterval(interval);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ⏱️ Rate Limiting Demo
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="body2">
            Requests: {requestCount}/5
          </Typography>
          <Box sx={{ flex: 1, bgcolor: 'grey.200', borderRadius: 1, height: 8 }}>
            <Box 
              sx={{ 
                width: `${(requestCount / 5) * 100}%`, 
                bgcolor: requestCount >= 5 ? 'error.main' : 'primary.main',
                height: '100%', 
                borderRadius: 1,
                transition: 'all 0.3s ease'
              }} 
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={makeRequest}
          disabled={isBlocked}
          startIcon={<Speed />}
          sx={{ mb: 2 }}
        >
          {isBlocked ? `Blocked (${resetTime}s)` : 'Make API Request'}
        </Button>

        {isBlocked && (
          <Alert severity="error">
            <Typography variant="body2">
              <strong>Rate Limit Exceeded!</strong><br />
              คุณส่ง request เกิน 5 ครั้งต่อนาที กรุณารอ {resetTime} วินาที
            </Typography>
          </Alert>
        )}
        
        {requestCount > 0 && !isBlocked && (
          <Alert severity="warning">
            <Typography variant="body2">
              เหลือ {5 - requestCount} requests ก่อนถูก rate limit
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default function Lesson12Page() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      maxWidth: '100vw',
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 2, sm: 3 },
      overflow: 'hidden',
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics"
          sx={{ mb: 2, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
        >
          กลับไปหน้าหลัก
        </Button>
        <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, fontWeight: 600, mb: 2, lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Security color="primary" sx={{ fontSize: { xs: '2.2rem', sm: '3rem' } }} />
          บทที่ 12: Security
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3, '& .MuiChip-root': { fontSize: { xs: '0.75rem', sm: '0.8rem' } } }}>
          <Chip icon={<Shield />} label="Headers" color="primary" size="small" />
          <Chip icon={<Lock />} label="Rate Limit" color="secondary" size="small" />
          <Chip icon={<Speed />} label="Performance" color="info" size="small" />
          <Chip icon={<Code />} label="Best Practice" color="success" size="small" />
        </Stack>
        <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
          <Typography variant="body2">
            ⏱️ <strong>ระยะเวลา:</strong> 40 นาที | 
            📊 <strong>ระดับ:</strong> ปานกลาง | 
            🎯 <strong>เป้าหมาย:</strong> เรียนรู้ Security & Best Practices ใน Next.js
          </Typography>
        </Alert>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: { xs: 3, sm: 4 } }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="🛡️ Headers" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="⏱️ Rate Limit" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="⚡ Performance" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="💡 Best Practice" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        <Typography variant="h3" sx={{ mb: 3 }}>📚 รู้จักกับ Middleware</Typography>
        
        {/* What happens without middleware */}
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'error.50', border: '2px solid', borderColor: 'error.200' }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>
            😰 ถ้าไม่มี Middleware จะเกิดอะไรขึ้น?
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'error.main' }}>🚨 ปัญหาที่อาจเกิด:</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="คนเลวเข้ามาง่าย" 
                    secondary="ไม่มีการตรวจสอบใครเป็นใคร"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เซิร์ฟเวอร์ล่มง่าย" 
                    secondary="คนเข้ามาพร้อมกันมากเกินไป"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ข้อมูลรั่วไหล" 
                    secondary="ไม่มีการป้องกันการโจมตี"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'error.main' }}>💸 ผลกระทบ:</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Warning color="warning" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText primary="ค่าใช้จ่ายเพิ่มขึ้น" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText primary="ลูกค้าไม่พอใจ" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText primary="เสียชื่อเสียง" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>

        {/* How Middleware Works */}
        <Typography variant="h5" sx={{ mb: 3 }}>🔄 Middleware ทำงานอย่างไร?</Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'success.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle /> ✅ ข้อดีของ Middleware
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Speed color="primary" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เร็วมาก" 
                    secondary="ทำงานที่ Edge (ใกล้ผู้ใช้)" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Security color="primary" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ตรวจสอบก่อน" 
                    secondary="เช็คสิทธิ์ก่อนเข้าหน้าเว็บ" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Shield color="primary" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ปลอดภัย" 
                    secondary="ป้องกันการโจมตีได้ดี" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Language color="primary" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ยืดหยุ่น" 
                    secondary="ปรับแต่งได้ตามต้องการ" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
                🔄 ขั้นตอนการทำงาน (เข้าใจง่าย)
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'primary.50', border: '2px solid', borderColor: 'primary.main' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    1. 👤 ลูกค้าเข้าเว็บไซต์
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    เหมือนเดินเข้าร้าน
                  </Typography>
                </Paper>
                <Box sx={{ textAlign: 'center', py: 1, color: 'primary.main', fontWeight: 'bold' }}>↓</Box>
                
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'warning.50', border: '2px solid', borderColor: 'warning.main' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    2. 🛡️ Middleware ตรวจสอบ
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ยามรักษาความปลอดภัยเช็ค
                  </Typography>
                </Paper>
                <Box sx={{ textAlign: 'center', py: 1, color: 'warning.main', fontWeight: 'bold' }}>↓</Box>
                
                <Paper sx={{ p: 2, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.main' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    3. ✅ ได้เข้าหน้าเว็บ
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ผ่านการตรวจสอบแล้ว
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* File Structure for Beginners */}
        <Typography variant="h5" sx={{ mb: 2 }}>📁 ไฟล์ที่ต้องรู้จักจับ (สำหรับมือใหม่)</Typography>
        
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            🏗️ <strong>โครงสร้างโปรเจค Next.js พร้อม Middleware:</strong>
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ color: 'success.dark' }}>
{`my-website/                    👈 โปรเจคของคุณ
├── middleware.ts              👈 ⭐ ไฟล์สำคัญ! (ยามรักษาความปลอดภัย)
├── src/
│   ├── app/
│   │   ├── page.tsx          👈 หน้าแรก
│   │   ├── about/
│   │   │   └── page.tsx      👈 หน้า About
│   │   └── api/
│   │       └── route.ts      👈 API endpoints
│   └── components/
└── next.config.js             👈 การตั้งค่า Next.js`}
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>จำให้ได้:</strong> ไฟล์ <code>middleware.ts</code> ต้องอยู่ใน root ของโปรเจค 
              (ข้างๆ กับ package.json) เพื่อให้ Next.js เจอและใช้งานได้!
            </Typography>
          </Alert>
        </Paper>

        {/* Simple Example */}
        <Typography variant="h5" sx={{ mb: 2 }}>🚀 ตัวอย่างแรก: Middleware ง่ายๆ</Typography>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            มาสร้าง Middleware ตัวแรกที่จะทักทายทุกคนที่เข้าเว็บไซต์:
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// middleware.ts (สร้างไฟล์นี้ใน root ของโปรเจค)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ฟังก์ชันที่จะทำงานทุกครั้งที่มีคนเข้าเว็บไซต์
export function middleware(request: NextRequest) {
  // พิมพ์ข้อความใน console (ดูได้ใน terminal)
  console.log('🎉 มีคนเข้าเว็บไซต์!', request.nextUrl.pathname)
  
  // บอกให้ไปต่อได้ (ไม่ปฏิเสธ)
  return NextResponse.next()
}

// กำหนดว่า middleware นี้จะทำงานกับ path ไหนบ้าง
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
  // หมายความ: ทำงานกับทุกหน้า ยกเว้น api, static files
}`}
            </Typography>
          </Box>
        </Paper>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Typography variant="h3" sx={{ mb: 3 }}>🛡️ การรักษาความปลอดภัย</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          ใช้ Middleware สำหรับตรวจสอบ authentication ก่อนที่ user จะเข้าถึงหน้าที่ต้อง login
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>1. JWT Token Validation</Typography>
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre">
{`// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function middleware(request: NextRequest) {
  // Protected paths ที่ต้อง authentication
  const protectedPaths = ['/dashboard', '/profile', '/admin']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      // ไม่มี token ให้ redirect ไป login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // ตรวจสอบ JWT token
      const { payload } = await jwtVerify(token, JWT_SECRET)
      
      // เพิ่ม user info ใน header สำหรับ pages
      const response = NextResponse.next()
      response.headers.set('x-user-id', payload.sub as string)
      response.headers.set('x-user-role', payload.role as string)
      
      return response
    } catch (error) {
      // Token ไม่ valid ให้ redirect ไป login
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*', 
    '/admin/:path*',
  ],
}`}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mb: 2 }}>2. Role-Based Access Control</Typography>
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre">
{`// middleware.ts
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userRole = payload.role as string

    // Admin-only paths
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (userRole !== 'admin') {
        return new NextResponse('Forbidden', { status: 403 })
      }
    }

    // Manager-only paths
    if (request.nextUrl.pathname.startsWith('/manage')) {
      if (!['admin', 'manager'].includes(userRole)) {
        return new NextResponse('Forbidden', { status: 403 })
      }
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*', '/manage/:path*', '/dashboard/:path*'],
}`}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mb: 2 }}>3. Session-Based Authentication</Typography>
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre">
{`// middleware.ts
export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get('session-id')?.value

  if (!sessionId) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // ตรวจสอบ session จาก database/redis
    const session = await getSession(sessionId)
    
    if (!session || session.expiresAt < new Date()) {
      // Session หมดอายุ
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('session-id')
      return response
    }

    // อัพเดต last activity
    await updateSessionActivity(sessionId)

    const response = NextResponse.next()
    response.headers.set('x-user-id', session.userId)
    return response
    
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// Helper functions (ต้องใช้ compatible กับ Edge Runtime)
async function getSession(sessionId: string) {
  // ใช้ Redis หรือ Database query
  // ต้องใช้ Edge-compatible client
}

async function updateSessionActivity(sessionId: string) {
  // อัพเดต last_activity timestamp
}`}
          </Typography>
        </Box>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            ⚠️ <strong>Edge Runtime Limitations:</strong> ไม่สามารถใช้ Node.js libraries ทั้งหมดได้ 
            ต้องใช้ Edge-compatible libraries เช่น `jose` แทน `jsonwebtoken`
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Typography variant="h3" sx={{ mb: 3 }}>⏱️ จำกัดการเข้าถึง</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          ใช้ Middleware สำหรับตรวจสอบ authentication ก่อนที่ user จะเข้าถึงหน้าที่ต้อง login
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>1. JWT Token Validation</Typography>
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre">
{`// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function middleware(request: NextRequest) {
  // Protected paths ที่ต้อง authentication
  const protectedPaths = ['/dashboard', '/profile', '/admin']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      // ไม่มี token ให้ redirect ไป login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // ตรวจสอบ JWT token
      const { payload } = await jwtVerify(token, JWT_SECRET)
      
      // เพิ่ม user info ใน header สำหรับ pages
      const response = NextResponse.next()
      response.headers.set('x-user-id', payload.sub as string)
      response.headers.set('x-user-role', payload.role as string)
      
      return response
    } catch (error) {
      // Token ไม่ valid ให้ redirect ไป login
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*', 
    '/admin/:path*',
  ],
}`}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mb: 2 }}>2. Role-Based Access Control</Typography>
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre">
{`// middleware.ts
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userRole = payload.role as string

    // Admin-only paths
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (userRole !== 'admin') {
        return new NextResponse('Forbidden', { status: 403 })
      }
    }

    // Manager-only paths
    if (request.nextUrl.pathname.startsWith('/manage')) {
      if (!['admin', 'manager'].includes(userRole)) {
        return new NextResponse('Forbidden', { status: 403 })
      }
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*', '/manage/:path*', '/dashboard/:path*'],
}`}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mb: 2 }}>3. Session-Based Authentication</Typography>
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre">
{`// middleware.ts
export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get('session-id')?.value

  if (!sessionId) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // ตรวจสอบ session จาก database/redis
    const session = await getSession(sessionId)
    
    if (!session || session.expiresAt < new Date()) {
      // Session หมดอายุ
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('session-id')
      return response
    }

    // อัพเดต last activity
    await updateSessionActivity(sessionId)

    const response = NextResponse.next()
    response.headers.set('x-user-id', session.userId)
    return response
    
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// Helper functions (ต้องใช้ compatible กับ Edge Runtime)
async function getSession(sessionId: string) {
  // ใช้ Redis หรือ Database query
  // ต้องใช้ Edge-compatible client
}

async function updateSessionActivity(sessionId: string) {
  // อัพเดต last_activity timestamp
}`}
          </Typography>
        </Box>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            ⚠️ <strong>Edge Runtime Limitations:</strong> ไม่สามารถใช้ Node.js libraries ทั้งหมดได้ 
            ต้องใช้ Edge-compatible libraries เช่น `jose` แทน `jsonwebtoken`
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        <Typography variant="h3" sx={{ mb: 3 }}>💡 Best Practices</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          แนวทางปฏิบัติที่ดีสำหรับ Security ใน Next.js
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>สำคัญ:</strong> ใช้ Environment Variables สำหรับ secrets 
            และอย่าเก็บข้อมูลสำคัญใน client-side code
          </Typography>
        </Alert>
      </TabPanel>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: { xs: 4, sm: 6 }, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-11"
          variant="outlined"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 2, sm: 1 } }}
        >
          บทที่ 11: React Hook Form
        </Button>
        <Chip
          label="12 / 18"
          color="primary"
          variant="outlined"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' }, order: { xs: 1, sm: 2 } }}
        />
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-13"
          variant="contained"
          color="primary"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 3, sm: 3 } }}
        >
          บทที่ 13: Testing
        </Button>
      </Box>
    </Box>
  );
}