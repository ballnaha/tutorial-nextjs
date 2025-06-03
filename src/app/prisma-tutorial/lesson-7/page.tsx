'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Tab,
  Tabs,
  Card,
  CardContent,
  Stack,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  ArrowBack,
  Assignment,
  Timer,
  ContentCopy,
  Api,
  Psychology,
  Build,
  Security,
  Check,
  ExpandMore,
  Warning,
  Lightbulb,
  Rocket,
  Http,
  Error as ErrorIcon,
  Shield,
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

const apiConcepts = [
  {
    concept: 'API Routes Setup',
    description: 'การตั้งค่า API routes ใน Next.js App Router',
    icon: <Build />,
    methods: ['route.ts', 'GET/POST/PUT/DELETE', 'Request/Response'],
    difficulty: 'ง่าย',
    color: 'success'
  },
  {
    concept: 'RESTful API',
    description: 'การสร้าง REST API ที่สมบูรณ์',
    icon: <Http />,
    methods: ['CRUD operations', 'Status codes', 'JSON responses'],
    difficulty: 'ปานกลาง',
    color: 'info'
  },
  {
    concept: 'Error Handling',
    description: 'การจัดการ errors และ validation',
    icon: <ErrorIcon />,
    methods: ['try-catch', 'status codes', 'error messages'],
    difficulty: 'ปานกลาง',
    color: 'warning'
  },
  {
    concept: 'Authentication',
    description: 'การจัดการ authentication และ authorization',
    icon: <Shield />,
    methods: ['JWT', 'middleware', 'protected routes'],
    difficulty: 'ขั้นสูง',
    color: 'error'
  }
];

const codeExamples = {
  basicSetup: `// lib/prisma.ts - Prisma Client Setup
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// lib/response.ts - Response Helpers
export function successResponse(data: any, message = 'Success') {
  return Response.json({
    success: true,
    message,
    data
  }, { status: 200 })
}

export function errorResponse(message: string, status = 400) {
  return Response.json({
    success: false,
    message,
    error: message
  }, { status })
}`,

  usersCrud: `// app/api/users/route.ts - Users CRUD API
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/response'

// GET /api/users - ดึงรายการ users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        } : {},
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          _count: {
            select: {
              posts: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.user.count({
        where: search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        } : {}
      })
    ])

    return successResponse({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('GET /api/users error:', error)
    return errorResponse('Failed to fetch users', 500)
  }
}

// POST /api/users - สร้าง user ใหม่
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role = 'USER' } = body

    // Validation
    if (!name || !email || !password) {
      return errorResponse('Name, email, and password are required')
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return errorResponse('Email already exists')
    }

    // Hash password (ในการใช้งานจริงควรใช้ bcrypt)
    const hashedPassword = password // ควรใช้ bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return successResponse(user, 'User created successfully')
  } catch (error) {
    console.error('POST /api/users error:', error)
    return errorResponse('Failed to create user', 500)
  }
}`,

  userById: `// app/api/users/[id]/route.ts - User by ID operations
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/response'

// GET /api/users/[id] - ดึงข้อมูล user ตาม ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id)

    if (isNaN(userId)) {
      return errorResponse('Invalid user ID')
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        posts: {
          select: {
            id: true,
            title: true,
            published: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        _count: {
          select: {
            posts: true,
            comments: true
          }
        }
      }
    })

    if (!user) {
      return errorResponse('User not found', 404)
    }

    return successResponse(user)
  } catch (error) {
    console.error('GET /api/users/[id] error:', error)
    return errorResponse('Failed to fetch user', 500)
  }
}

// PUT /api/users/[id] - อัปเดต user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id)
    const body = await request.json()
    const { name, email, role } = body

    if (isNaN(userId)) {
      return errorResponse('Invalid user ID')
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return errorResponse('User not found', 404)
    }

    // Check if email is taken by another user
    if (email && email !== existingUser.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email }
      })

      if (emailTaken) {
        return errorResponse('Email already exists')
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role })
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true
      }
    })

    return successResponse(updatedUser, 'User updated successfully')
  } catch (error) {
    console.error('PUT /api/users/[id] error:', error)
    return errorResponse('Failed to update user', 500)
  }
}

// DELETE /api/users/[id] - ลบ user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id)

    if (isNaN(userId)) {
      return errorResponse('Invalid user ID')
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return errorResponse('User not found', 404)
    }

    // Delete user (cascade delete จะลบ posts และ comments ที่เกี่ยวข้อง)
    await prisma.user.delete({
      where: { id: userId }
    })

    return successResponse(null, 'User deleted successfully')
  } catch (error) {
    console.error('DELETE /api/users/[id] error:', error)
    return errorResponse('Failed to delete user', 500)
  }
}`,

  errorHandling: `// lib/errors.ts - Error Handling Utilities
export class ApiError extends Error {
  statusCode: number
  
  constructor(message: string, statusCode: number = 400) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ApiError'
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, 400)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}

// lib/validation.ts - Validation Helpers
import { z } from 'zod'

export const userCreateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['USER', 'ADMIN']).optional()
})

export const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(['USER', 'ADMIN']).optional()
})

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(err => err.message).join(', ')
      throw new ValidationError(messages)
    }
    throw error
  }
}

// middleware.ts - Global Error Handler
import { NextRequest, NextResponse } from 'next/server'

export function withErrorHandler(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context)
    } catch (error) {
      console.error('API Error:', error)

      if (error instanceof ApiError) {
        return Response.json({
          success: false,
          message: error.message,
          error: error.name
        }, { status: error.statusCode })
      }

      // Prisma errors
      if (error.code === 'P2002') {
        return Response.json({
          success: false,
          message: 'Unique constraint violation',
          error: 'DUPLICATE_ENTRY'
        }, { status: 409 })
      }

      // Generic error
      return Response.json({
        success: false,
        message: 'Internal server error',
        error: 'INTERNAL_ERROR'
      }, { status: 500 })
    }
  }
}`,

  authentication: `// lib/auth.ts - Authentication Utilities
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { prisma } from './prisma'
import { UnauthorizedError } from './errors'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface JWTPayload {
  userId: number
  email: string
  role: string
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    throw new UnauthorizedError('Invalid token')
  }
}

export async function getAuthUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided')
  }

  const token = authHeader.substring(7)
  const payload = verifyToken(token)

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  })

  if (!user) {
    throw new UnauthorizedError('User not found')
  }

  return user
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    const user = await getAuthUser(request)
    return handler(request, context, user)
  }
}

export function requireRole(role: string) {
  return function(handler: Function) {
    return async (request: NextRequest, context?: any) => {
      const user = await getAuthUser(request)
      
      if (user.role !== role) {
        throw new UnauthorizedError('Insufficient permissions')
      }
      
      return handler(request, context, user)
    }
  }
}

// app/api/auth/login/route.ts - Login API
import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/response'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return errorResponse('Email and password are required')
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return errorResponse('Invalid credentials', 401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return errorResponse('Invalid credentials', 401)
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    return successResponse({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, 'Login successful')
  } catch (error) {
    console.error('Login error:', error)
    return errorResponse('Login failed', 500)
  }
}`,

  clientUsage: `// การใช้งาน API ใน Client Component
'use client'
import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
}

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

// Custom Hook สำหรับ API calls
export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const apiCall = async <T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<T> => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: \`Bearer \${token}\` }),
          ...options.headers
        }
      })

      const data: ApiResponse<T> = await response.json()

      if (!data.success) {
        throw new Error(data.message)
      }

      return data.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { apiCall, loading, error }
}

// ตัวอย่างการใช้งาน
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const { apiCall, loading, error } = useApi()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await apiCall<{users: User[]}>('/api/users')
      setUsers(data.users)
    } catch (err) {
      console.error('Failed to load users:', err)
    }
  }

  const createUser = async (userData: Partial<User>) => {
    try {
      await apiCall('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      })
      loadUsers() // Reload users
    } catch (err) {
      console.error('Failed to create user:', err)
    }
  }

  const deleteUser = async (id: number) => {
    try {
      await apiCall(\`/api/users/\${id}\`, {
        method: 'DELETE'
      })
      loadUsers() // Reload users
    } catch (err) {
      console.error('Failed to delete user:', err)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}`
};

export default function PrismaLesson7Page() {
  const [tabValue, setTabValue] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCopyCode = (code: string, codeType: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(codeType);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <Rocket />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              บทที่ 7: Prisma with Next.js API Routes
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              เรียนรู้การสร้าง RESTful API และจัดการ authentication ด้วย Prisma และ Next.js
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip icon={<Timer />} label="45 นาที" color="primary" />
          <Chip icon={<Assignment />} label="ปานกลาง" color="warning" />
          <Chip icon={<Code />} label="Hands-on" color="success" />
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>API Routes</strong> ใน Next.js ช่วยให้เราสร้าง backend API ได้ง่าย 
            พร้อมการใช้งาน Prisma สำหรับจัดการฐานข้อมูล
          </Typography>
        </Alert>
      </Box>

      {/* Navigation */}
      <Paper sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab icon={<Psychology />} label="แนวคิด" />
          <Tab icon={<Build />} label="Setup & Basic API" />
          <Tab icon={<Http />} label="CRUD Operations" />
          <Tab icon={<ErrorIcon />} label="Error Handling" />
          <Tab icon={<Shield />} label="Authentication" />
          <Tab icon={<Code />} label="Client Usage" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🧠 ทำความเข้าใจ API Routes
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>สำคัญ:</strong> API Routes ทำงานบน server-side เท่านั้น 
            ไม่สามารถใช้ browser APIs ได้
          </Typography>
        </Alert>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          {apiConcepts.map((concept, index) => (
            <Card key={index} sx={{ height: '100%', border: `2px solid`, borderColor: `${concept.color}.main` }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${concept.color}.main` }}>
                    {concept.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {concept.concept}
                    </Typography>
                    <Chip 
                      label={concept.difficulty} 
                      size="small" 
                      color={concept.color as 'success' | 'info' | 'warning' | 'error'} 
                    />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {concept.description}
                </Typography>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                    เทคนิคที่ใช้:
                  </Typography>
                  {concept.methods.map((method, i) => (
                    <Chip key={i} label={method} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            💡 ทำไมต้องใช้ API Routes?
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Full-stack ในที่เดียว"
                secondary="ไม่ต้องแยก frontend และ backend"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Type Safety"
                secondary="ใช้ TypeScript ร่วมกันทั้ง client และ server"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Easy Deployment"
                secondary="Deploy ทั้งหมดพร้อมกันใน Vercel หรือ platforms อื่นๆ"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Built-in Optimization"
                secondary="Next.js จัดการ caching และ optimization ให้"
              />
            </ListItem>
          </List>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🔧 Setup และ Basic API
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          การตั้งค่าพื้นฐานสำหรับ API Routes และ Prisma
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            การตั้งค่าพื้นฐาน
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Basic Setup</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.basicSetup, 'basicSetup')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'basicSetup' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.basicSetup}
            </pre>
          </Paper>
        </Paper>

        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>HTTP Method</strong></TableCell>
                <TableCell><strong>การใช้งาน</strong></TableCell>
                <TableCell><strong>ตัวอย่าง</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><code>GET</code></TableCell>
                <TableCell>ดึงข้อมูล</TableCell>
                <TableCell>ดึงรายการ users</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>POST</code></TableCell>
                <TableCell>สร้างข้อมูลใหม่</TableCell>
                <TableCell>สร้าง user ใหม่</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>PUT</code></TableCell>
                <TableCell>อัปเดตข้อมูล</TableCell>
                <TableCell>แก้ไขข้อมูล user</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>DELETE</code></TableCell>
                <TableCell>ลบข้อมูล</TableCell>
                <TableCell>ลบ user</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Alert severity="info">
          <Typography variant="body2">
            <strong>เทคนิค:</strong> ใช้ helper functions เพื่อให้โค้ดสะอาดและใช้ซ้ำได้
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🔄 CRUD Operations
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          การสร้าง API สำหรับ Create, Read, Update, Delete operations
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Users CRUD API
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">app/api/users/route.ts</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.usersCrud, 'usersCrud')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'usersCrud' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.usersCrud}
            </pre>
          </Paper>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            User by ID Operations
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">app/api/users/[id]/route.ts</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.userById, 'userById')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'userById' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.userById}
            </pre>
          </Paper>
        </Paper>

        <Alert severity="info">
          <Typography variant="body2">
            <strong>เทคนิค:</strong> ใช้ dynamic routes [id] สำหรับ operations ที่ต้องการ parameter
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          ⚠️ Error Handling และ Validation
        </Typography>

        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>สำคัญมาก:</strong> การจัดการ errors ที่ดีจะทำให้ API มีความน่าเชื่อถือ 
            และง่ายต่อการ debug
          </Typography>
        </Alert>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Error Handling และ Validation
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Error Handling</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.errorHandling, 'errorHandling')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'errorHandling' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.errorHandling}
            </pre>
          </Paper>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="success.main">
                ✅ Best Practices
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ proper HTTP status codes" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Validate input data" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Log errors สำหรับ debugging" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Return consistent error format" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="error.main">
                ❌ ควรหลีกเลี่ยง
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="Expose sensitive error details" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="ไม่ validate input data" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="Return generic error messages" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="ไม่ handle database errors" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🔐 Authentication และ Authorization
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          การจัดการ authentication และ authorization ใน API Routes
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Authentication System
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Authentication</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.authentication, 'authentication')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'authentication' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.authentication}
            </pre>
          </Paper>
        </Paper>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" fontWeight="bold">
              🔑 JWT Authentication Flow
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
                <ListItemText 
                  primary="1. User Login"
                  secondary="ส่ง email/password ไป /api/auth/login"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
                <ListItemText 
                  primary="2. Verify Credentials"
                  secondary="ตรวจสอบ password กับ database"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
                <ListItemText 
                  primary="3. Generate JWT"
                  secondary="สร้าง JWT token ที่มี user info"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
                <ListItemText 
                  primary="4. Send Token"
                  secondary="ส่ง token กลับไปให้ client"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
                <ListItemText 
                  primary="5. Use Token"
                  secondary="ส่ง token ใน Authorization header"
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          💻 การใช้งาน API ใน Client
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          ตัวอย่างการเรียกใช้ API จาก React Components
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Client-side API Usage
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Client Usage</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.clientUsage, 'clientUsage')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'clientUsage' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.clientUsage}
            </pre>
          </Paper>
        </Paper>

        <Alert severity="success">
          <Typography variant="body2">
            <strong>เทคนิค:</strong> ใช้ custom hooks เพื่อจัดการ API calls และ state management
          </Typography>
        </Alert>
      </TabPanel>

      {/* Navigation */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          component={Link}
          href="/prisma-tutorial/lesson-6"
          startIcon={<ArrowBack />}
          variant="outlined"
        >
          บทที่ 6: Advanced Queries
        </Button>
        <Button
          component={Link}
          href="/prisma-tutorial"
          variant="contained"
        >
          กลับหน้าหลัก
        </Button>
      </Box>
    </Container>
  );
} 