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
  Storage,
  Build,
  Speed,
  Assignment,
  Timer,
  ContentCopy,
  Link as LinkIcon,
  Settings,
  Security,
  CloudSync,
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

const installationSteps = [
  {
    label: 'ติดตั้ง Prisma CLI และ Client',
    description: 'ติดตั้ง Prisma ORM และ Prisma Client สำหรับ Next.js application',
    command: 'npm install prisma @prisma/client',
    expectedOutput: 'Prisma ORM และ Client ถูกติดตั้งเรียบร้อย'
  },
  {
    label: 'เริ่มต้น Prisma Project',
    description: 'สร้างไฟล์ schema.prisma และ .env สำหรับ configuration',
    command: 'npx prisma init',
    expectedOutput: 'สร้างไฟล์ prisma/schema.prisma และ .env แล้ว'
  },
  {
    label: 'ติดตั้ง Database Driver',
    description: 'ติดตั้ง driver สำหรับฐานข้อมูลที่เลือกใช้',
    command: 'npm install mysql2  # สำหรับ MySQL\nnpm install pg @types/pg  # สำหรับ PostgreSQL\nnpm install sqlite3  # สำหรับ SQLite',
    expectedOutput: 'Database driver พร้อมใช้งาน'
  },
  {
    label: 'กำหนดค่าฐานข้อมูลใน .env',
    description: 'ตั้งค่า CONNECTION_STRING ให้ Prisma เชื่อมต่อกับฐานข้อมูล',
    command: 'แก้ไขไฟล์ .env ให้ตรงกับฐานข้อมูลที่ใช้',
    expectedOutput: 'Prisma สามารถเชื่อมต่อฐานข้อมูลได้'
  }
];

const prismaFeatures = [
  {
    title: 'Type-Safe Database Access',
    description: 'Prisma สร้าง TypeScript types อัตโนมัติจาก schema ทำให้การเขียนโค้ดปลอดภัยและมี auto-completion',
    icon: '🔒',
    examples: ['Auto-generated types', 'Compile-time error checking', 'IntelliSense support']
  },
  {
    title: 'Declarative Data Modeling',
    description: 'ออกแบบ database schema ด้วย Prisma Schema Language ที่อ่านง่ายและจัดการได้ง่าย',
    icon: '📊',
    examples: ['Schema-first approach', 'Relations modeling', 'Database migration']
  },
  {
    title: 'Query Builder & Raw SQL',
    description: 'ใช้ Prisma Client สำหรับ queries ทั่วไป หรือใช้ Raw SQL สำหรับ queries ที่ซับซ้อน',
    icon: '⚡',
    examples: ['Fluent API', 'Type-safe queries', 'Raw SQL support']
  }
];

const databaseExamples = [
  {
    name: 'PostgreSQL',
    description: 'ฐานข้อมูลที่แนะนำสำหรับ production',
    envExample: 'DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"',
    provider: 'postgresql'
  },
  {
    name: 'MySQL',
    description: 'ฐานข้อมูลยอดนิยมสำหรับ web applications',
    envExample: 'DATABASE_URL="mysql://username:password@localhost:3306/mydb"',
    provider: 'mysql'
  },
  {
    name: 'SQLite',
    description: 'ฐานข้อมูลไฟล์เดียว เหมาะสำหรับ development',
    envExample: 'DATABASE_URL="file:./dev.db"',
    provider: 'sqlite'
  },
  {
    name: 'MongoDB',
    description: 'NoSQL database สำหรับข้อมูลแบบ document',
    envExample: 'DATABASE_URL="mongodb://username:password@localhost:27017/mydb"',
    provider: 'mongodb'
  }
];

const setupCode = {
  schema: `// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // หรือ "mysql", "sqlite", "mongodb"
  url      = env("DATABASE_URL")
}

// ตัวอย่าง model แรก
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("posts")
}`,
  
  env: `# .env
# Database Connection String
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase?schema=public"

# สำหรับ MySQL
# DATABASE_URL="mysql://username:password@localhost:3306/mydatabase"

# สำหรับ SQLite (สำหรับ development)
# DATABASE_URL="file:./dev.db"

# สำหรับ MongoDB
# DATABASE_URL="mongodb://username:password@localhost:27017/mydatabase"

# Next.js Environment Variables
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"`,

  client: `// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// สร้าง global Prisma instance เพื่อป้องกัน connection pool exhaustion
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // แสดง SQL queries ใน development
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma`,

  usage: `// app/api/users/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true, // รวม posts ของ user ด้วย
      },
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    })
    
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}`
};

const quickCommands = [
  {
    title: 'Generate Prisma Client',
    command: 'npx prisma generate',
    description: 'สร้าง Prisma Client จาก schema ใหม่หลังจากแก้ไข schema.prisma'
  },
  {
    title: 'Push Schema Changes',
    command: 'npx prisma db push',
    description: 'อัพเดตฐานข้อมูลให้ตรงกับ schema (สำหรับ development)'
  },
  {
    title: 'Open Prisma Studio',
    command: 'npx prisma studio',
    description: 'เปิด GUI สำหรับดูและแก้ไขข้อมูลในฐานข้อมูล'
  },
  {
    title: 'Reset Database',
    command: 'npx prisma db reset',
    description: 'ลบข้อมูลทั้งหมดและสร้างฐานข้อมูลใหม่ตาม schema'
  }
];

export default function PrismaLesson1Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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
            <Storage color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 1: เริ่มต้นกับ Prisma ORM
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            ทำความรู้จักกับ Prisma และการติดตั้งร่วมกับ Next.js อย่างถูกต้อง! 🗄️
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Timer />} label="30 นาที" color="primary" />
            <Chip icon={<Assignment />} label="เริ่มต้น" color="success" />
            <Chip icon={<Code />} label="Hands-on" color="secondary" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> ติดตั้งและตั้งค่า Prisma ORM ให้พร้อมใช้งานกับ Next.js
              <br />
              📋 <strong>สิ่งที่ต้องมี:</strong> Node.js, Next.js project, และฐานข้อมูล (PostgreSQL/MySQL/SQLite)
            </Typography>
          </Alert>

          {/* Learning Progress */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.50', border: '2px solid', borderColor: 'primary.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="primary" /> 💡 Prisma คืออะไร?
            </Typography>
            
            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🗄️ <strong>Next-generation ORM:</strong> Object-Relational Mapping ที่ออกแบบมาสำหรับ TypeScript
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🔒 <strong>Type-safe:</strong> สร้าง TypeScript types อัตโนมัติจาก database schema
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🚀 <strong>Developer Experience:</strong> Auto-completion, error checking และ database GUI
              </Typography>
              <Typography variant="body2">
                • ⚡ <strong>Performance:</strong> Query optimization และ connection pooling ในตัว
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> เขียนโค้ดจัดการฐานข้อมูลที่ปลอดภัย รวดเร็ว และง่ายต่อการบำรุงรักษา!
              </Typography>
            </Alert>
          </Paper>
        </Box>

        {/* Prisma Features Overview */}
        <Typography variant="h4" sx={{ mb: 3 }}>🎨 ทำไมต้องใช้ Prisma ORM?</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
          {prismaFeatures.map((feature, index) => (
            <Card key={index}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    bgcolor: 'primary.light', 
                    color: 'primary.main', 
                    p: 1, 
                    borderRadius: 1, 
                    mr: 2,
                    fontSize: '1.5rem'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {feature.description}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {feature.examples.map((example, i) => (
                    <Chip 
                      key={i}
                      label={example} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Installation Steps */}
        <Typography variant="h4" sx={{ mb: 3 }}>⚙️ ขั้นตอนการติดตั้ง</Typography>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {installationSteps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === installationSteps.length - 1 ? (
                      <Typography variant="caption">ขั้นตอนสุดท้าย</Typography>
                    ) : null
                  }
                >
                  <Typography variant="h6">{step.label}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                  
                  <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <pre style={{ 
                      flex: 1,
                      margin: 0,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {step.command}
                    </pre>
                    <Button
                      size="small"
                      onClick={() => handleCopyCode(step.command, `step-${index}`)}
                      sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
                    >
                      <ContentCopy sx={{ fontSize: 16 }} />
                    </Button>
                  </Box>
                  
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      ✅ <strong>ผลลัพธ์:</strong> {step.expectedOutput}
                    </Typography>
                  </Alert>
                  
                  <Box sx={{ mb: 1 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === installationSteps.length - 1 ? 'เสร็จสิ้น' : 'ขั้นตอนถัดไป'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      กลับ
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          
          {activeStep === installationSteps.length && (
            <Paper square elevation={0} sx={{ p: 3, bgcolor: 'success.light' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎉 ติดตั้ง Prisma เรียบร้อยแล้ว!
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                ตอนนี้คุณพร้อมใช้งาน Prisma ORM กับ Next.js แล้ว ขั้นตอนต่อไปคือการตั้งค่าฐานข้อมูลและสร้าง schema
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                ดูขั้นตอนอีกครั้ง
              </Button>
              <Button
                variant="contained"
                component={Link}
                href="/prisma-tutorial/lesson-2"
                sx={{ mt: 1 }}
              >
                ไปบทเรียนถัดไป
              </Button>
            </Paper>
          )}
        </Paper>

        {/* Database Configuration Examples */}
        <Typography variant="h4" sx={{ mb: 3 }}>🔗 การเชื่อมต่อฐานข้อมูล</Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            ตัวอย่างการตั้งค่า Database URL ในไฟล์ .env
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
            {databaseExamples.map((db, index) => (
              <Card key={index}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: 'primary.main', 
                      mr: 2,
                      fontSize: '1.2rem'
                    }}>
                      <Storage />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {db.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {db.description}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box className="code-block" sx={{ p: 2 }}>
                    <pre style={{ 
                      fontSize: '0.8rem',
                      wordBreak: 'break-all',
                      whiteSpace: 'pre-wrap',
                      margin: 0
                    }}>
                      {db.envExample}
                    </pre>
                  </Box>
                  
                  <Button
                    size="small"
                    onClick={() => handleCopyCode(db.envExample, `db-${index}`)}
                    startIcon={<ContentCopy />}
                    sx={{ fontSize: '0.8rem' }}
                  >
                    Copy URL
                  </Button>
                  
                  {copiedCode === `db-${index}` && (
                    <Chip 
                      label="Copied!" 
                      size="small" 
                      color="success" 
                      sx={{ ml: 1 }}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Code Examples Tabs */}
        <Typography variant="h4" sx={{ mb: 3 }}>💻 ตัวอย่างโค้ดและการตั้งค่า</Typography>

        {/* Tabs */}
        <Box sx={{ width: '100%', mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab 
              label="📋 Schema" 
              icon={<Assignment />}
              iconPosition="start"
            />
            <Tab 
              label="🔧 Environment" 
              icon={<Settings />}
              iconPosition="start"
            />
            <Tab 
              label="📦 Prisma Client" 
              icon={<Code />}
              iconPosition="start"
            />
            <Tab 
              label="🚀 Usage" 
              icon={<Speed />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            Prisma Schema (prisma/schema.prisma)
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            ไฟล์หลักที่กำหนดโครงสร้างฐานข้อมูลและ Prisma Client configuration
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {setupCode.schema}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(setupCode.schema, 'schema')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'schema' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอกโค้ด Schema แล้ว!
            </Alert>
          )}
          
          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>คำแนะนำ:</strong> เปลี่ยน provider เป็นฐานข้อมูลที่ต้องการใช้ และปรับ model ตามความต้องการ
            </Typography>
          </Alert>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            Environment Variables (.env)
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            การตั้งค่า environment variables สำหรับการเชื่อมต่อฐานข้อมูลและ Next.js
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {setupCode.env}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(setupCode.env, 'env')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'env' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก Environment Variables แล้ว!
            </Alert>
          )}
          
          <Alert severity="warning">
            <Typography variant="body2">
              ⚠️ <strong>ความปลอดภัย:</strong> อย่าเพิ่มไฟล์ .env ลง Git repository และใช้ environment variables ที่แข็งแรงใน production
            </Typography>
          </Alert>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            Prisma Client Setup (lib/prisma.ts)
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            การสร้าง Prisma Client instance ที่ใช้ร่วมกันทั้ง application เพื่อป้องกัน connection pool exhaustion
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {setupCode.client}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(setupCode.client, 'client')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'client' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก Prisma Client setup แล้ว!
            </Alert>
          )}
          
          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>Best Practice:</strong> การใช้ global instance ป้องกันการสร้าง connection มากเกินไปใน development mode
            </Typography>
          </Alert>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            การใช้งานใน API Routes
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            ตัวอย่างการใช้ Prisma Client ใน Next.js API Routes สำหรับ CRUD operations
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {setupCode.usage}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(setupCode.usage, 'usage')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'usage' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอกตัวอย่างการใช้งานแล้ว!
            </Alert>
          )}
          
          <Alert severity="success">
            <Typography variant="body2">
              ✨ <strong>ผลลัพธ์:</strong> API endpoints ที่ type-safe และสามารถจัดการข้อมูลได้อย่างมีประสิทธิภาพ
            </Typography>
          </Alert>
        </TabPanel>

        {/* Quick Commands Reference */}
        <Typography variant="h4" sx={{ mb: 3 }}>⚡ คำสั่งที่ใช้บ่อย</Typography>
        
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'black', fontWeight: 600 }}>คำสั่ง</TableCell>
                <TableCell sx={{ color: 'black', fontWeight: 600 }}>ความหมาย</TableCell>
                <TableCell sx={{ color: 'black', fontWeight: 600 }}>เมื่อใช้</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quickCommands.map((cmd, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                    {cmd.command}
                  </TableCell>
                  <TableCell>{cmd.title}</TableCell>
                  <TableCell>{cmd.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/prisma-tutorial"
            variant="outlined"
          >
            กลับหน้าหลัก
          </Button>
          
          <Chip 
            label="1 / 12"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/prisma-tutorial/lesson-2"
            variant="contained"
          >
            บทที่ 2: Schema Design
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 