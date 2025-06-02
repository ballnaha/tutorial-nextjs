'use client';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
  Divider,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Security,
  Key,
  Shield,
  AccountCircle,
  Lock,
  CheckCircle,
  Code,
  PlayArrow,
  Visibility,
  VisibilityOff,
  Login,
  Logout,
  PersonAdd,
  Lightbulb,
  Warning,
  Info,
  Palette,
  Speed,
  Build,
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

export default function Lesson9Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const authProviders = [
    { name: 'Google', icon: '🔍', color: '#4285F4' },
    { name: 'GitHub', icon: '🐙', color: '#333' },
    { name: 'Facebook', icon: '📘', color: '#1877F2' },
    { name: 'Discord', icon: '🎮', color: '#5865F2' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/nextjs-basics"
            sx={{ mb: 2 }}
          >
            กลับไปหน้าหลัก
          </Button>
          
          <Typography variant="h1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Security color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 9: Authentication & Authorization
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Key />} label="NextAuth.js" color="primary" />
            <Chip icon={<Shield />} label="JWT Tokens" color="secondary" />
            <Chip icon={<Lock />} label="Session Management" color="info" />
            <Chip icon={<AccountCircle />} label="Protected Routes" color="success" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              ⏱️ <strong>ระยะเวลา:</strong> 60 นาที | 
              📊 <strong>ระดับ:</strong> ขั้นสูง | 
              🎯 <strong>เป้าหมาย:</strong> เรียนรู้การสร้างระบบ authentication และ authorization ที่ปลอดภัย
            </Typography>
          </Alert>
        </Box>

        {/* Tabs */}
        <Paper sx={{ mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="🏁 เริ่มต้น" />
            <Tab label="🔑 NextAuth.js" />
            <Tab label="🎫 JWT Tokens" />
            <Tab label="🔐 Session Management" />
            <Tab label="🛡️ Protected Routes" />
            <Tab label="💡 Best Practices" />
            <Tab label="🚀 Demo" />
          </Tabs>
        </Paper>

        {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>🏁 Authentication vs Authorization</Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Login color="primary" />
                  Authentication (การยืนยันตัวตน)
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  การตรวจสอบว่าผู้ใช้เป็นใครจริงๆ
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="Login/Register" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="OAuth (Google, GitHub)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="JWT Tokens" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="Session Management" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Shield color="warning" />
                  Authorization (การอนุญาต)
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  การตรวจสอบว่าผู้ใช้มีสิทธิ์ทำอะไรได้บ้าง
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="Role-based Access (Admin, User)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="Permission-based Access" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="Protected API Routes" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="Middleware Protection" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>สำคัญ:</strong> การรักษาความปลอดภัยต้องทำทั้ง Frontend และ Backend 
              เพราะ Frontend สามารถถูก bypass ได้ง่าย
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>🔑 NextAuth.js Setup</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>1. การติดตั้ง</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2">
                $ npm install next-auth
              </Typography>
            </Box>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>2. Environment Variables</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret`}
              </Typography>
            </Box>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>3. การตั้งค่า NextAuth.js</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    
    // Email/Password Login
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // ตรวจสอบ credentials กับฐานข้อมูล
        if (credentials?.email === 'admin@example.com' && 
            credentials?.password === 'password') {
          return {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin'
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  }
});

export { handler as GET, handler as POST };`}
              </Typography>
            </Box>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>4. Session Provider</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`// app/providers.tsx
'use client'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}`}
            </Typography>
          </Paper>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎫 JWT Tokens</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>JWT คืออะไร?</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            JSON Web Token (JWT) เป็นมาตรฐานสำหรับการส่งข้อมูลอย่างปลอดภัยระหว่าง parties 
            ประกอบด้วย 3 ส่วน: Header, Payload, และ Signature
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>โครงสร้าง JWT Token</Typography>
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'error.main' }}>
                  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
                </Typography>
                <Typography variant="caption" color="error">Header (Algorithm & Token Type)</Typography>
              </Box>
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'warning.main' }}>
                  eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
                </Typography>
                <Typography variant="caption" color="warning.main">Payload (Claims/Data)</Typography>
              </Box>
              <Box className="code-block" sx={{ p: 2, borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'success.main' }}>
                  SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
                </Typography>
                <Typography variant="caption" color="success.main">Signature (Verification)</Typography>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>การใช้งาน JWT ใน Next.js</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`// lib/jwt.ts
import jwt from 'jsonwebtoken'

export function signJWT(payload: any, expiresIn: string = '7d') {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn,
    algorithm: 'HS256',
  })
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch (error) {
    return null
  }
}

// การสร้าง Access & Refresh Token
export function generateTokens(userId: string) {
  const accessToken = signJWT({ userId }, '15m')  // 15 นาที
  const refreshToken = signJWT({ userId }, '7d')   // 7 วัน
  
  return { accessToken, refreshToken }
}

// การตรวจสอบ token ใน API route
export async function validateToken(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.substring(7)
  const payload = verifyJWT(token)
  
  return payload
}`}
            </Typography>
          </Paper>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Best Practice:</strong> ใช้ Access Token (อายุสั้น) สำหรับการเข้าถึงข้อมูล 
              และ Refresh Token (อายุยาว) สำหรับการต่ออายุ token
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>🔐 Session Management</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>การใช้งาน useSession Hook</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`// components/UserProfile.tsx
'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function SessionDemo() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>กำลังโหลด...</p>;

  if (session) {
    return (
      <div>
        <h2>ยินดีต้อนรับ {session.user?.name}</h2>
        <p>อีเมล: {session.user?.email}</p>
        <p>สิทธิ์: {session.user?.role}</p>
        <button onClick={() => signOut()}>ออกจากระบบ</button>
      </div>
    );
  }

  return (
    <div>
      <h2>คุณยังไม่ได้เข้าสู่ระบบ</h2>
      <button onClick={() => signIn('google')}>
        เข้าสู่ระบบด้วย Google
      </button>
      <button onClick={() => signIn('credentials')}>
        เข้าสู่ระบบด้วย Email
      </button>
    </div>
  );
}`}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>Server-side Session Handling</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`// Server Component
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return <div>กรุณาเข้าสู่ระบบ</div>
  }
  
  return (
    <div>
      <h1>Protected Content</h1>
      <p>สวัสดี {session.user?.name}</p>
    </div>
  )
}

// API Route Protection
import { getServerSession } from 'next-auth'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Protected API logic here
  return Response.json({ message: 'Success' })
}`}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>Custom Session Store</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`// lib/session.ts
import { prisma } from './prisma'

export async function createSession(userId: string) {
  const sessionToken = crypto.randomUUID()
  const expires = new Date()
  expires.setDate(expires.getDate() + 30) // 30 วัน

  await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires,
    },
  })

  return sessionToken
}

export async function getSession(sessionToken: string) {
  return await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  })
}

export async function deleteSession(sessionToken: string) {
  await prisma.session.delete({
    where: { sessionToken },
  })
}`}
            </Typography>
          </Paper>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🛡️ Protected Routes</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>Middleware Protection</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`// middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // เพิ่ม logic เพิ่มเติมได้ที่นี่
    console.log('Token:', req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // ตรวจสอบ role สำหรับ admin pages
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin'
        }
        
        // ตรวจสอบการ login สำหรับ protected pages
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/protected/:path*']
}`}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>Component-level Protection</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`// components/ProtectedComponent.tsx
'use client';
import { useSession } from 'next-auth/react';

interface ProtectedComponentProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

export default function ProtectedComponent({ 
  children, 
  requiredRole, 
  fallback = <div>คุณไม่มีสิทธิ์เข้าถึง</div>
}: ProtectedComponentProps) {
  const { data: session } = useSession();

  if (!session) {
    return <div>กรุณาเข้าสู่ระบบ</div>;
  }

  if (requiredRole && session.user?.role !== requiredRole) {
    return fallback;
  }

  return <>{children}</>;
}

// การใช้งาน
function AdminPanel() {
  return (
    <ProtectedComponent requiredRole="admin">
      <h1>Admin Panel</h1>
      <p>เฉพาะ admin เท่านั้นที่เห็น</p>
    </ProtectedComponent>
  );
}`}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>HOC Pattern</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`// utils/withAuth.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export function withAuth<T extends any[]>(
  Component: (...args: T) => Promise<JSX.Element>,
  requiredRole?: string
) {
  return async function AuthenticatedComponent(...args: T) {
    const session = await getServerSession();

    if (!session) {
      redirect('/auth/signin');
    }

    if (requiredRole && session.user?.role !== requiredRole) {
      redirect('/unauthorized');
    }

    return Component(...args);
  };
}

// การใช้งาน
const AdminPage = withAuth(
  async function AdminPageComponent() {
    return <div>Admin Only Content</div>;
  },
  'admin'
);`}
            </Typography>
          </Paper>
        </TabPanel>

        <TabPanel value={activeTab} index={5}>
          <Typography variant="h3" sx={{ mb: 3 }}>💡 Security Best Practices</Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>✅ ควรทำ</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="ใช้ HTTPS ในทุกสถานการณ์" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="Hash passwords ด้วย bcrypt" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="ใช้ secure cookies" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="Validate inputs ทั้ง client & server" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="ตั้ง token expiration ที่เหมาะสม" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="ใช้ CSRF protection" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>❌ ไม่ควรทำ</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="เก็บ sensitive data ใน localStorage" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="ส่ง passwords ใน URL parameters" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="Trust client-side validation เพียงอย่างเดียว" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="ใช้ tokens ที่ไม่มีวันหมดอายุ" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="Log sensitive information" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="ใช้ weak secrets/keys" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>Environment Security</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`// .env.local (Never commit to git!)
NEXTAUTH_SECRET=super-secret-key-at-least-32-characters
JWT_SECRET=another-super-secret-key-for-jwt-signing
DATABASE_URL=postgresql://user:password@localhost:5432/db

// .env.example (Commit this as template)
NEXTAUTH_SECRET=your-nextauth-secret
JWT_SECRET=your-jwt-secret
DATABASE_URL=your-database-url
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret`}
            </Typography>
          </Paper>

          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>สำคัญมาก:</strong> อย่า commit .env files ที่มี secrets จริงลง git repository!
              ใช้ .env.example เป็น template แทน
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={activeTab} index={6}>
          <Typography variant="h3" sx={{ mb: 3 }}>🚀 Interactive Demo</Typography>
          
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>Login Demo</Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>OAuth Providers</Typography>
                  <Stack spacing={2}>
                    {authProviders.map((provider) => (
                      <Button
                        key={provider.name}
                        variant="outlined"
                        fullWidth
                        startIcon={<span>{provider.icon}</span>}
                        onClick={() => alert(`จำลองการ login ด้วย ${provider.name}`)}
                        sx={{ 
                          borderColor: provider.color,
                          color: provider.color,
                          '&:hover': {
                            bgcolor: `${provider.color}10`,
                            borderColor: provider.color,
                          }
                        }}
                      >
                        Continue with {provider.name}
                      </Button>
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>Session Status</Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccountCircle 
                          sx={{ 
                            fontSize: 40, 
                            mr: 2, 
                            color: isLoggedIn ? 'success.main' : 'grey.400' 
                          }} 
                        />
                        <Box>
                          <Typography variant="h6">
                            {isLoggedIn ? 'John Doe' : 'Not logged in'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {isLoggedIn ? 'john@example.com' : 'Please sign in'}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Button
                        variant={isLoggedIn ? 'outlined' : 'contained'}
                        color={isLoggedIn ? 'error' : 'primary'}
                        startIcon={isLoggedIn ? <Logout /> : <Login />}
                        onClick={() => setIsLoggedIn(!isLoggedIn)}
                        fullWidth
                      >
                        {isLoggedIn ? 'Sign Out' : 'Sign In'}
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>ยินดีด้วย!</strong> คุณได้เรียนรู้การสร้างระบบ Authentication & Authorization แล้ว
              ตอนนี้คุณสามารถสร้างแอปที่ปลอดภัยและมีการจัดการผู้ใช้ได้แล้ว! 🎉
            </Typography>
          </Alert>
        </TabPanel>

        {/* Navigation */}
        <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.dark' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            🎯 ยินดีด้วย! คุณเรียนจบบทที่ 9 แล้ว
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            ตอนนี้คุณสามารถสร้างระบบ Authentication & Authorization ที่ปลอดภัยได้แล้ว
            พร้อมสำหรับการเรียนรู้ State Management ในบทถัดไป
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              💡 <strong>บทถัดไป:</strong> เรียนรู้ State Management เพื่อจัดการ state ในแอปพลิเคชันขนาดใหญ่
            </Typography>
          </Alert>
        </Paper>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/nextjs-basics/lesson-8"
            variant="outlined"
          >
            บทที่ 8: Zod Validation
          </Button>
          
          <Chip 
            label="9 / 16"
            color="primary"
            variant="outlined"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/nextjs-basics/lesson-10"
            variant="contained"
            color="primary"
          >
            บทที่ 10: State Management
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 