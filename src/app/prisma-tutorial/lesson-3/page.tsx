'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Tab,
  Tabs,
  Card,
  CardContent,
  Stack,
  Avatar,
  LinearProgress,
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
  Terminal,
  Folder,
  PlayArrow,
  ExpandMore,
  Lightbulb,
  Warning,
  ArrowBack,
  ArrowForward,
  Schema,
  Build,
  Speed,
  Assignment,
  Timer,
  ContentCopy,
  Link as LinkIcon,
  Settings,
  Security,
  AccountTree,
  Storage,
  Architecture,
  DataObject,
  Category,
  Psychology,
  Create,
  Search,
  Update,
  Delete,
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

const crudOperations = [
  {
    operation: 'Create',
    description: 'สร้างข้อมูลใหม่ในฐานข้อมูล',
    icon: <Create />,
    methods: ['create()', 'createMany()'],
    difficulty: 'ง่าย',
    color: 'success'
  },
  {
    operation: 'Read',
    description: 'อ่านและค้นหาข้อมูลจากฐานข้อมูล',
    icon: <Search />,
    methods: ['findMany()', 'findFirst()', 'findUnique()'],
    difficulty: 'ง่าย',
    color: 'info'
  },
  {
    operation: 'Update',
    description: 'แก้ไขข้อมูลที่มีอยู่ในฐานข้อมูล',
    icon: <Update />,
    methods: ['update()', 'updateMany()'],
    difficulty: 'ปานกลาง',
    color: 'warning'
  },
  {
    operation: 'Delete',
    description: 'ลบข้อมูลออกจากฐานข้อมูล',
    icon: <Delete />,
    methods: ['delete()', 'deleteMany()'],
    difficulty: 'ปานกลาง',
    color: 'error'
  }
];

const codeExamples = {
  setup: `// lib/prisma.ts - Global Prisma Client Setup
import { PrismaClient } from '@prisma/client'

// ป้องกันการสร้าง instance หลายตัวใน development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // เปิด logging
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// การใช้งานใน API route หรือ component
import { prisma } from '@/lib/prisma'

// ตัวอย่างการทดสอบ connection
async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully!')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}`,

  create: `// การสร้างข้อมูลใหม่ (Create Operations)

// 1. สร้าง User เดียว
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John Doe',
    password: 'hashed_password'
  }
})

// 2. สร้าง User พร้อม Profile (Nested Create)
const userWithProfile = await prisma.user.create({
  data: {
    email: 'jane@example.com',
    name: 'Jane Smith',
    password: 'hashed_password',
    profile: {
      create: {
        bio: 'Software Developer',
        avatar: 'https://example.com/avatar.jpg'
      }
    }
  },
  include: {
    profile: true // รวม profile ในผลลัพธ์
  }
})

// 3. สร้างหลาย records พร้อมกัน
const manyUsers = await prisma.user.createMany({
  data: [
    { email: 'user1@example.com', name: 'User 1', password: 'pass1' },
    { email: 'user2@example.com', name: 'User 2', password: 'pass2' },
    { email: 'user3@example.com', name: 'User 3', password: 'pass3' }
  ],
  skipDuplicates: true // ข้าม record ที่ซ้ำ
})

// 4. สร้าง Post พร้อมเชื่อม User และ Tags
const post = await prisma.post.create({
  data: {
    title: 'Getting Started with Prisma',
    content: 'Learn how to use Prisma ORM...',
    slug: 'getting-started-prisma',
    published: true,
    author: {
      connect: { id: user.id } // เชื่อมกับ User ที่มีอยู่
    },
    tags: {
      connectOrCreate: [
        {
          where: { name: 'Prisma' },
          create: { name: 'Prisma', color: '#2D3748' }
        },
        {
          where: { name: 'TypeScript' },
          create: { name: 'TypeScript', color: '#3178C6' }
        }
      ]
    }
  },
  include: {
    author: true,
    tags: true
  }
})`,

  read: `// การอ่านและค้นหาข้อมูล (Read Operations)

// 1. ค้นหา User ตาม ID (Unique)
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    profile: true,
    posts: true
  }
})

// 2. ค้นหา User คนแรกที่ตรงเงื่อนไข
const firstActiveUser = await prisma.user.findFirst({
  where: {
    status: 'ACTIVE',
    posts: {
      some: {
        published: true
      }
    }
  },
  orderBy: { createdAt: 'desc' }
})

// 3. ค้นหา Users หลายคน
const users = await prisma.user.findMany({
  where: {
    email: {
      endsWith: '@example.com'
    },
    createdAt: {
      gte: new Date('2024-01-01') // หลังวันที่ 1 ม.ค. 2024
    }
  },
  select: {
    id: true,
    name: true,
    email: true,
    _count: {
      posts: true // นับจำนวน posts
    }
  },
  orderBy: { name: 'asc' },
  take: 10, // จำกัด 10 records
  skip: 0   // pagination
})

// 4. ค้นหาพร้อม Relations
const postsWithDetails = await prisma.post.findMany({
  where: {
    published: true,
    author: {
      status: 'ACTIVE'
    }
  },
  include: {
    author: {
      select: {
        name: true,
        email: true
      }
    },
    tags: true,
    comments: {
      include: {
        author: {
          select: { name: true }
        }
      }
    },
    _count: {
      comments: true,
      tags: true
    }
  }
})

// 5. Full-text Search (ถ้าฐานข้อมูลรองรับ)
const searchResults = await prisma.post.findMany({
  where: {
    OR: [
      { title: { contains: 'Prisma', mode: 'insensitive' } },
      { content: { contains: 'Prisma', mode: 'insensitive' } }
    ]
  }
})`,

  update: `// การแก้ไขข้อมูล (Update Operations)

// 1. แก้ไข User เดียว
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: {
    name: 'John Smith Updated',
    email: 'john.smith@newdomain.com'
  }
})

// 2. แก้ไขพร้อม Relations
const updatedPost = await prisma.post.update({
  where: { id: 1 },
  data: {
    title: 'Updated Title',
    published: true,
    publishedAt: new Date(),
    tags: {
      disconnect: [{ id: 1 }], // ตัดการเชื่อม tag
      connect: [{ id: 3 }]     // เชื่อม tag ใหม่
    }
  },
  include: {
    tags: true
  }
})

// 3. แก้ไขหลาย records
const updatedManyPosts = await prisma.post.updateMany({
  where: {
    authorId: 1,
    published: false
  },
  data: {
    published: true,
    publishedAt: new Date()
  }
})

// 4. Upsert (Update หรือ Create)
const upsertUser = await prisma.user.upsert({
  where: { email: 'admin@example.com' },
  update: {
    name: 'Admin Updated'
  },
  create: {
    email: 'admin@example.com',
    name: 'Admin User',
    password: 'admin_password'
  }
})

// 5. Atomic Operations (การอัพเดตแบบปลอดภัย)
const incrementViews = await prisma.post.update({
  where: { id: 1 },
  data: {
    views: {
      increment: 1 // เพิ่ม views ทีละ 1
    },
    likes: {
      decrement: 2 // ลด likes ลง 2
    }
  }
})`,

  delete: `// การลบข้อมูล (Delete Operations)

// 1. ลบ User เดียว
const deletedUser = await prisma.user.delete({
  where: { id: 1 }
})

// 2. ลบหลาย records
const deletedPosts = await prisma.post.deleteMany({
  where: {
    published: false,
    createdAt: {
      lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // เก่ากว่า 30 วัน
    }
  }
})

// 3. ลบพร้อม Relations (Cascade Delete)
// ต้องตั้งค่า onDelete: Cascade ใน schema ก่อน
const deleteUserWithPosts = await prisma.user.delete({
  where: { id: 1 },
  include: {
    posts: true // เพื่อดูว่าลบ posts อะไรบ้าง
  }
})

// 4. Soft Delete (ไม่ลบจริง แต่ mark ว่าลบ)
const softDeletePost = await prisma.post.update({
  where: { id: 1 },
  data: {
    deletedAt: new Date(),
    published: false
  }
})

// Query เฉพาะที่ไม่ได้ลบ
const activePosts = await prisma.post.findMany({
  where: {
    deletedAt: null
  }
})`
};

export default function PrismaLesson3Page() {
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
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/prisma-tutorial"
            sx={{ mb: 2 }}
          >
            กลับไปหน้าหลัก
          </Button>
          
          <Typography variant="h1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <DataObject color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 3: Prisma Client API
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การใช้งาน Prisma Client สำหรับ CRUD operations แบบ type-safe! 🚀
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Timer />} label="50 นาที" color="primary" />
            <Chip icon={<Assignment />} label="ระดับง่าย-กลาง" color="success" />
            <Chip icon={<Code />} label="Hands-on" color="secondary" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> เข้าใจและใช้งาน Prisma Client สำหรับ CRUD operations ได้อย่างเชี่ยวชาญ
              <br />
              📋 <strong>สิ่งที่ต้องมี:</strong> Schema จากบทที่ 2 และ Prisma Client ที่ generate แล้ว
            </Typography>
          </Alert>
        </Box>

        {/* CRUD Operations Overview */}
        <Typography variant="h4" sx={{ mb: 3 }}>💻 CRUD Operations ใน Prisma</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          {crudOperations.map((op, index) => (
            <Card key={index}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${op.color}.main`, mr: 2 }}>
                    {op.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {op.operation}
                    </Typography>
                    <Chip 
                      label={op.difficulty} 
                      size="small" 
                      color={op.color as any}
                      variant="outlined"
                    />
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {op.description}
                </Typography>
                
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Methods หลัก:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {op.methods.map((method, idx) => (
                    <Chip 
                      key={idx}
                      label={method} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Code Examples Tabs */}
        <Typography variant="h4" sx={{ mb: 3 }}>📖 ตัวอย่าง Code แบบละเอียด</Typography>

        <Box sx={{ width: '100%', mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab 
              label="🔧 Setup Client" 
              icon={<Settings />}
              iconPosition="start"
            />
            <Tab 
              label="➕ Create" 
              icon={<Create />}
              iconPosition="start"
            />
            <Tab 
              label="🔍 Read" 
              icon={<Search />}
              iconPosition="start"
            />
            <Tab 
              label="✏️ Update" 
              icon={<Update />}
              iconPosition="start"
            />
            <Tab 
              label="🗑️ Delete" 
              icon={<Delete />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            การตั้งค่า Prisma Client
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            การสร้าง global instance ของ Prisma Client เพื่อใช้งานในทั้ง application
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.setup}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.setup, 'setup')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'setup' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก Setup Code แล้ว!
            </Alert>
          )}
          
          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>เทคนิค:</strong> การใช้ global instance ป้องกันการสร้าง connection หลายตัวใน development mode
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            Create Operations - สร้างข้อมูลใหม่
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            การสร้างข้อมูลแบบต่างๆ รวมถึง nested creates และ bulk operations
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.create}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.create, 'create')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'create' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก Create Examples แล้ว!
            </Alert>
          )}
          
          <Alert severity="success">
            <Typography variant="body2">
              ✨ <strong>เทคนิค:</strong> ใช้ <code>include</code> เพื่อรวม relations และ <code>connectOrCreate</code> เพื่อจัดการ tags
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            Read Operations - การค้นหาและอ่านข้อมูล
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            วิธีการ query ข้อมูลแบบต่างๆ รวมถึง filtering, sorting และ pagination
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.read}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.read, 'read')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'read' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก Read Examples แล้ว!
            </Alert>
          )}
          
          <Alert severity="info">
            <Typography variant="body2">
              🔍 <strong>เทคนิค:</strong> ใช้ <code>select</code> เพื่อเลือก fields และ <code>_count</code> เพื่อนับ relations
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            Update Operations - การแก้ไขข้อมูล
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            การอัพเดตข้อมูลแบบต่างๆ รวมถึง atomic operations และ upsert
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.update}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.update, 'update')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'update' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก Update Examples แล้ว!
            </Alert>
          )}
          
          <Alert severity="warning">
            <Typography variant="body2">
              ⚡ <strong>เทคนิค:</strong> ใช้ <code>increment/decrement</code> สำหรับ atomic updates ที่ปลอดภัย
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            Delete Operations - การลบข้อมูล
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            การลบข้อมูลแบบต่างๆ รวมถึง cascade delete และ soft delete patterns
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.delete}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.delete, 'delete')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'delete' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก Delete Examples แล้ว!
            </Alert>
          )}
          
          <Alert severity="error">
            <Typography variant="body2">
              ⚠️ <strong>ระวัง:</strong> Cascade delete จะลบ related records ทั้งหมด ให้ระมัดระวังเมื่อใช้ในข้อมูลจริง
            </Typography>
          </Alert>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/prisma-tutorial/lesson-2"
            variant="outlined"
          >
            บทที่ 2: การออกแบบ Schema
          </Button>
          
          <Chip 
            label="3 / 12"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/prisma-tutorial/lesson-4"
            variant="contained"
          >
            บทที่ 4: Advanced Relations
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
