'use client';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Paper,
  Divider,
  Avatar,
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  Code,
  CheckCircle,
  Storage,
  Dataset,
  TableChart,
  Security,
  Speed,
  Build,
  CloudSync,
  AccountTree,
} from '@mui/icons-material';
import Link from 'next/link';

const lessons = [
  {
    id: 1,
    title: '🗄️ เริ่มต้นกับ Prisma ORM',
    description: 'ทำความรู้จักกับ Prisma และการติดตั้งร่วมกับ MySQL',
    duration: '30 นาที',
    level: 'เริ่มต้น',
    topics: [
      'Prisma คืออะไร?',
      'ข้อดีของ ORM',
      'การติดตั้ง Prisma',
      'การตั้งค่า MySQL',
      'การสร้าง Schema แรก',
    ],
    code: `# ติดตั้ง Prisma
npm install prisma @prisma/client
npm install mysql2

# เริ่มต้น Prisma
npx prisma init

# .env
DATABASE_URL="mysql://user:password@localhost:3306/mydatabase"

# schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}`
  },
  {
    id: 2,
    title: '📋 Prisma Schema',
    description: 'การออกแบบและเขียน Schema สำหรับฐานข้อมูล',
    duration: '35 นาที',
    level: 'เริ่มต้น',
    topics: [
      'Data Types ใน Prisma',
      'Fields และ Attributes',
      'Primary Key และ Unique',
      'Default Values',
      'Optional Fields',
    ],
    code: `model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?  @db.Text
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  
  @@map("posts")
}

enum Role {
  USER
  ADMIN
}`
  },
  {
    id: 3,
    title: '🔗 Relations (ความสัมพันธ์)',
    description: 'การสร้างความสัมพันธ์ระหว่างตารางต่างๆ',
    duration: '40 นาที',
    level: 'ปานกลาง',
    topics: [
      'One-to-One Relations',
      'One-to-Many Relations',
      'Many-to-Many Relations',
      'Self Relations',
      'Referential Actions',
    ],
    code: `// One-to-One
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  userId Int    @unique
  user   User   @relation(fields: [userId], references: [id])
}

// One-to-Many
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  authorId Int
  author   User @relation(fields: [authorId], references: [id])
}

// Many-to-Many
model Post {
  id         Int        @id @default(autoincrement())
  categories Category[]
}

model Category {
  id    Int    @id @default(autoincrement())
  posts Post[]
}`
  },
  {
    id: 4,
    title: '🔄 Migrations',
    description: 'การจัดการการเปลี่ยนแปลงโครงสร้างฐานข้อมูล',
    duration: '25 นาที',
    level: 'ปานกลาง',
    topics: [
      'การสร้าง Migration แรก',
      'Migration History',
      'การ Reset Database',
      'Migration ใน Production',
      'การแก้ไข Migration Conflicts',
    ],
    code: `# สร้าง migration จาก schema
npx prisma migrate dev --name init

# ดู migration history
npx prisma migrate status

# reset database
npx prisma migrate reset

# deploy migrations to production
npx prisma migrate deploy

# generate Prisma client
npx prisma generate`
  },
  {
    id: 5,
    title: '📊 CRUD Operations',
    description: 'การสร้าง อ่าน อัปเดต และลบข้อมูล',
    duration: '45 นาที',
    level: 'ปานกลาง',
    topics: [
      'Create Operations',
      'Read Operations',
      'Update Operations',
      'Delete Operations',
      'Batch Operations',
      'Transactions',
    ],
    code: `import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John Doe',
    posts: {
      create: [
        { title: 'Hello World', content: 'This is my first post' }
      ]
    }
  },
  include: { posts: true }
})

// Read
const users = await prisma.user.findMany({
  where: { email: { contains: '@gmail.com' } },
  include: { posts: true },
  orderBy: { createdAt: 'desc' }
})

// Update
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane Doe' }
})

// Delete
await prisma.user.delete({
  where: { id: 1 }
})`
  },
  {
    id: 6,
    title: '🔍 Advanced Queries',
    description: 'การ Query ข้อมูลขั้นสูงและการเพิ่มประสิทธิภาพ',
    duration: '35 นาที',
    level: 'ขั้นสูง',
    topics: [
      'Filtering และ Sorting',
      'Pagination',
      'Aggregation',
      'Raw Queries',
      'Query Optimization',
    ],
    code: `// Advanced filtering
const posts = await prisma.post.findMany({
  where: {
    AND: [
      { published: true },
      {
        OR: [
          { title: { contains: 'prisma' } },
          { content: { contains: 'database' } }
        ]
      }
    ]
  }
})

// Pagination
const posts = await prisma.post.findMany({
  skip: 10,
  take: 5,
  orderBy: { createdAt: 'desc' }
})

// Aggregation
const result = await prisma.user.aggregate({
  _count: { id: true },
  _avg: { age: true },
  _sum: { score: true }
})

// Raw query
const users = await prisma.$queryRaw\`
  SELECT * FROM users WHERE age > \${minAge}
\``
  },
  {
    id: 7,
    title: '🔐 Authentication & Authorization',
    description: 'การสร้างระบบ Authentication ด้วย Prisma',
    duration: '40 นาที',
    level: 'ขั้นสูง',
    topics: [
      'User Registration',
      'Password Hashing',
      'JWT Tokens',
      'Session Management',
      'Role-based Access Control',
    ],
    code: `import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// สร้างผู้ใช้ใหม่
async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    }
  })
}

// เข้าสู่ระบบ
async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  })
  
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials')
  }
  
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )
  
  return { user, token }
}`
  },
  {
    id: 8,
    title: '🚀 Production Best Practices',
    description: 'การนำ Prisma ไปใช้งานจริงและการเพิ่มประสิทธิภาพ',
    duration: '30 นาที',
    level: 'ขั้นสูง',
    topics: [
      'Connection Pooling',
      'Environment Variables',
      'Error Handling',
      'Logging และ Monitoring',
      'Database Seeding',
      'Backup Strategies',
    ],
    code: `// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      { email: 'admin@example.com', name: 'Admin', role: 'ADMIN' },
      { email: 'user@example.com', name: 'User', role: 'USER' }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// Connection pooling configuration
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  connectionLimit = 10
}`
  },
];

const features = [
  { icon: <Dataset />, title: 'Type-safe', desc: 'TypeScript support' },
  { icon: <Speed />, title: 'Performance', desc: 'Optimized queries' },
  { icon: <Build />, title: 'Developer Experience', desc: 'Great tooling' },
  { icon: <Security />, title: 'Secure', desc: 'SQL injection protection' },
];

export default function PrismaTutorialPage() {
  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Storage color="primary" sx={{ fontSize: '3rem' }} />
          Prisma & MySQL Tutorial
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          เรียนรู้การจัดการฐานข้อมูลด้วย Prisma ORM และ MySQL อย่างครบครัน
        </Typography>

        <Alert severity="warning" sx={{ mb: 4 }}>
          <Typography variant="body1">
            📋 <strong>สิ่งที่ต้องมีก่อนเรียน:</strong> ความรู้พื้นฐาน Next.js, TypeScript, SQL และ MySQL
          </Typography>
        </Alert>

        {/* Features */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2, 
          mb: 4 
        }}>
          {features.map((feature, index) => (
            <Paper key={index} sx={{ p: 2, flex: 1, textAlign: 'center' }}>
              <Box sx={{ color: 'primary.main', mb: 1 }}>
                {feature.icon}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.desc}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* What you'll learn */}
        <Paper sx={{ p: 3, bgcolor: 'grey.50', mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🎯 สิ่งที่จะได้เรียนรู้:
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 2 
          }}>
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="การติดตั้งและตั้งค่า Prisma" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="การออกแบบ Schema" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Database Relations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Migration Management" />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="CRUD Operations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Advanced Queries" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Authentication System" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Production Best Practices" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>

        {/* Prerequisites */}
        <Alert severity="info" icon={<Dataset />} sx={{ mb: 4 }}>
          <Typography variant="body1">
            <strong>เตรียมพร้อม:</strong> ติดตั้ง MySQL Server, MySQL Workbench (หรือ phpMyAdmin) และ Node.js ล่วงหน้า
          </Typography>
        </Alert>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Lessons */}
      <Typography variant="h2" sx={{ mb: 3 }}>
        📚 บทเรียนทั้งหมด ({lessons.length} บท)
      </Typography>

      <Box sx={{ mb: 4 }}>
        {lessons.map((lesson) => (
          <Accordion key={lesson.id} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  บทที่ {lesson.id}: {lesson.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={lesson.duration} size="small" color="primary" />
                  <Chip label={lesson.level} size="small" color="secondary" />
                </Box>
              </Box>
            </AccordionSummary>
            
            <AccordionDetails>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {lesson.description}
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                🎯 หัวข้อที่จะเรียน:
              </Typography>
              <List dense>
                {lesson.topics.map((topic, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <CheckCircle color="primary" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))}
              </List>

              {lesson.code && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                    💻 ตัวอย่างโค้ด:
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.100', fontFamily: 'monospace' }}>
                    <pre style={{ margin: 0, fontSize: '0.875rem', overflowX: 'auto' }}>
                      {lesson.code}
                    </pre>
                  </Paper>
                </Box>
              )}

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  component={Link}
                  href={`/prisma-tutorial/lesson-${lesson.id}`}
                >
                  เริ่มเรียนบทนี้
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Dataset />}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Schema Examples
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Getting Started */}
      <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.contrastText' }}>
        <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
          🗄️ พร้อมจัดการฐานข้อมูลแล้วใช่ไหม?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          เริ่มต้นจากบทที่ 1 และเรียนรู้การใช้งาน Prisma ORM อย่างเป็นระบบ
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            sx={{ 
              bgcolor: 'white', 
              color: 'success.main',
              '&:hover': { bgcolor: 'grey.100' }
            }}
            startIcon={<PlayArrow />}
            component={Link}
            href="/prisma-tutorial/lesson-1"
          >
            เริ่มเรียนบทที่ 1
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 