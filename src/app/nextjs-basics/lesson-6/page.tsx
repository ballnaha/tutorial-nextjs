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
  Storage,
  Speed,
  Security,
  Cloud,
  Web,
  Settings,
  TableChart,
  ApiOutlined,
  DataObject,
  Memory,
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

const prismaFeatures = [
  {
    title: 'Type Safety (Enhanced)',
    description: 'Generated TypeScript types ที่อัพเดตอัตโนมัติตาม database schema (Prisma 6.x)',
    icon: <Security />,
    color: 'success'
  },
  {
    title: 'Prisma Postgres (GA)',
    description: 'Managed PostgreSQL service ของ Prisma พร้อม zero cold starts',
    icon: <Cloud />,
    color: 'primary'
  },
  {
    title: 'TypedSQL',
    description: 'Type-safe raw SQL queries ด้วย .sql files และ auto-completion',
    icon: <Code />,
    color: 'info'
  },
  {
    title: 'Omit API (GA)',
    description: 'ซ่อน fields ที่ไม่ต้องการในการ query (ผ่าน GA แล้ว)',
    icon: <Security />,
    color: 'warning'
  }
];

export default function Lesson6Page() {
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
          🗄️ บทที่ 6: Prisma & Database
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          เรียนรู้การใช้ Prisma ORM เวอร์ชันล่าสุด (6.8.0) กับ Next.js 15 สำหรับจัดการฐานข้อมูลอย่างมีประสิทธิภาพ
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Chip label="50 นาที" color="primary" />
          <Chip label="ขั้นสูง" color="secondary" />
          <Chip label="สำคัญมาก" color="error" />
          <Chip label="Prisma 6.8.0" color="success" />
          <Chip label="Prisma Postgres" color="info" />
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
            <ListItemText primary="เข้าใจ Prisma ORM 6.x และการติดตั้งใน Next.js 15" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="สามารถสร้าง Database Schema และ Migrations ได้" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="ใช้ Prisma Client กับ Server Components และ API Routes" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="เรียนรู้ Prisma Postgres และ TypedSQL (ฟีเจอร์ใหม่ล่าสุด)" />
          </ListItem>
        </List>
      </Paper>

      {/* What is Prisma */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🤔 Prisma คืออะไร?
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          <strong>Prisma</strong> เป็น Next-generation ORM (Object-Relational Mapping) ที่ช่วยให้การทำงานกับฐานข้อมูลใน Node.js/TypeScript 
          ง่ายและปลอดภัยขึ้น พร้อมด้วย type safety และ developer experience ที่ยอดเยี่ยม
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            🎉 <strong>Prisma 6.8.0 + Next.js 15:</strong> เวอร์ชันล่าสุดรองรับ React 19, 
            Prisma Postgres (GA), TypedSQL, omit API, enhanced caching และ performance improvements มากมาย
          </Typography>
        </Alert>

        {/* Features Grid */}
        <Typography variant="h6" sx={{ mb: 3 }}>
          🌟 ฟีเจอร์เด่นของ Prisma 6.x:
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2,
          flexWrap: 'wrap',
          mb: 4
        }}>
          {prismaFeatures.map((feature, index) => (
            <Box key={index} sx={{ flex: 1, minWidth: '250px' }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ color: `${feature.color}.main` }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Architecture */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          🏗️ สถาปัตยกรรม Prisma:
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
          <Paper sx={{ p: 3, flex: 1, bgcolor: 'grey.50' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              📄 Prisma Schema
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              กำหนดโครงสร้างฐานข้อมูลด้วยภาษา DSL ที่เข้าใจง่าย
            </Typography>
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2">
                schema.prisma
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, flex: 1, bgcolor: 'success.light' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'success.dark' }}>
              🔧 Prisma Client
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Type-safe client ที่ generated จาก schema พร้อม autocomplete
            </Typography>
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2">
                @prisma/client
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, flex: 1, bgcolor: 'info.light' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'info.dark' }}>
              🗄️ Database
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              รองรับ PostgreSQL, MySQL, SQLite, MongoDB และอื่นๆ
            </Typography>
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2">
                Various Databases
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Paper>

      {/* Installation & Setup */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          💻 การติดตั้งและ Setup Prisma
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
            <strong>ข้อกำหนดเบื้องต้น:</strong> ต้องมี Node.js 18.18.0+ และ Next.js 15
          </Typography>
        </Alert>

        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <Typography variant="h6">ติดตั้ง Prisma</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                ติดตั้ง Prisma CLI และ Client สำหรับ Next.js 15
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
{`# ติดตั้ง Prisma CLI
npm install prisma@latest --save-dev

# ติดตั้ง Prisma Client
npm install @prisma/client@latest

# ติดตั้ง database driver (ตัวอย่าง PostgreSQL)
npm install pg @types/pg

# หรือใช้ Prisma Postgres (แนะนำ)
# ไม่ต้องติดตั้ง driver เพิ่ม`}
                </Typography>
              </Box>

              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  ✅ <strong>Prisma 6.8.0:</strong> รองรับ Prisma Postgres, TypedSQL และ Edge Runtime
                </Typography>
              </Alert>

              <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                ถัดไป
              </Button>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              <Typography variant="h6">Initialize Prisma</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้างไฟล์ Prisma schema และ environment variables
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Box sx={{ bgcolor: 'grey.900', color: 'white', p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
                  <Typography variant="body2">
                    $ npx prisma init
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  หรือใช้ Prisma Postgres (แนะนำสำหรับโปรเจคใหม่):
                </Typography>

                <Box sx={{ bgcolor: 'grey.900', color: 'white', p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
                  <Typography variant="body2">
                    $ npx prisma@latest init --db prisma
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  คำสั่งนี้จะสร้างไฟล์:
                </Typography>

                <List dense sx={{ mb: 2 }}>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="prisma/schema.prisma - Schema ของฐานข้อมูล" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary=".env - Environment variables" />
                  </ListItem>
                </List>

                <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                  ถัดไป
                </Button>
                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  ย้อนกลับ
                </Button>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              <Typography variant="h6">ตั้งค่า Environment Variables</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                แก้ไขไฟล์ .env เพื่อกำหนด DATABASE_URL
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
{`# .env
# Prisma Postgres (แนะนำ)
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your_api_key"

# หรือ PostgreSQL ทั่วไป
# DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"

# สำหรับ SQLite (development)
# DATABASE_URL="file:./dev.db"`}
                </Typography>
              </Box>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  💡 <strong>Prisma Postgres:</strong> Zero cold starts, global caching, และ connection pooling built-in
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
              <Typography variant="h6">สร้าง Prisma Client Instance</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                สร้างไฟล์สำหรับจัดการ Prisma Client instance
              </Typography>
              
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  $ mkdir lib && touch lib/prisma.ts
                </Typography>
              </Box>

              <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre">
{`// lib/prisma.ts - Prisma 6.x compatible
import { PrismaClient } from '@prisma/client';

const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
    
    // Prisma 6.x: Enhanced transaction options
    transactionOptions: {
      timeout: 10000, // 10 seconds
      maxWait: 5000,  // 5 seconds
      isolationLevel: 'ReadCommitted'
    }
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Connection monitoring
export async function checkConnection() {
  try {
    await prisma.$queryRaw\`SELECT 1\`;
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

// Graceful shutdown
export async function closeConnection() {
  await prisma.$disconnect();
}`}
                </Typography>
              </Box>

              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  ⚠️ <strong>Prisma 6.x:</strong> Enhanced connection management และ transaction options
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

        {activeStep === 4 && (
          <Paper sx={{ p: 3, mt: 3, bgcolor: 'success.light' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🎉 Setup เสร็จสิ้น!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ตอนนี้คุณพร้อมใช้งาน Prisma กับ Next.js 15 แล้ว
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              เริ่มใหม่
            </Button>
          </Paper>
        )}
      </Paper>

      {/* Database Schema */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          📝 การสร้าง Database Schema
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          มาเรียนรู้การเขียน Prisma Schema เพื่อกำหนดโครงสร้างฐานข้อมูล
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Basic Schema" />
          <Tab label="Relations" />
          <Tab label="Advanced Features" />
        </Tabs>

        <CustomTabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            📄 Basic Schema Structure (Prisma 6.x)
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  // Prisma 6.x features
  previewFeatures = ["typedSql", "relationJoins"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid(7)) // UUIDv7 support
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  posts     Post[]
  profile   Profile?
  
  @@map("users")
}

model Post {
  id        String   @id @default(uuid(7))
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  author    User     @relation(fields: [authorId], references: [id])
  
  @@map("posts")
}`}
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>Prisma 6.x:</strong> uuid(7) สำหรับ temporally sortable IDs, typedSql และ relationJoins
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
            🔗 Database Relations
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
            <Typography variant="body2" component="pre">
{`model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
  
  // One-to-Many: User มี Posts หลายอัน
  posts    Post[]
  
  // One-to-One: User มี Profile หนึ่งอัน
  profile  Profile?
  
  // Many-to-Many: User สามารถ follow Users อื่นได้
  following Follow[] @relation("UserFollows")
  followers Follow[] @relation("UserFollowers")
}

model Post {
  id       Int     @id @default(autoincrement())
  title    String
  content  String?
  authorId Int
  
  // Many-to-One: Post เป็นของ User หนึ่งคน
  author   User    @relation(fields: [authorId], references: [id])
  
  // Many-to-Many: Post มี Categories หลายอัน
  categories PostCategory[]
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  avatar String?
  userId Int     @unique
  
  // One-to-One: Profile เป็นของ User หนึ่งคน
  user   User    @relation(fields: [userId], references: [id])
}

model Follow {
  id          Int @id @default(autoincrement())
  followerId  Int
  followingId Int
  
  follower  User @relation("UserFollowers", fields: [followerId], references: [id])
  following User @relation("UserFollows", fields: [followingId], references: [id])
  
  @@unique([followerId, followingId])
}`}
            </Typography>
          </Box>

          <Alert severity="success">
            <Typography variant="body2">
              ✅ <strong>Relations:</strong> One-to-One, One-to-Many, Many-to-Many
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
            ⚡ Advanced Features (Prisma 6.x)
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// Prisma 6.x Advanced Features
model User {
  id    String @id @default(uuid(7)) // UUIDv7
  email String @unique
  name  String
  role  Role   @default(USER)
  
  // Indexes สำหรับ performance
  @@index([email])
  @@index([name, email])
}

model Product {
  id          String  @id @default(uuid(7))
  name        String
  price       Decimal @db.Decimal(10, 2)
  description String? @db.Text
  metadata    Json?   // Enhanced JSON support
  
  @@check(price > 0)
}

// Enums
enum Role {
  USER
  ADMIN
  MODERATOR
}

// TypedSQL files (NEW in Prisma 6.x)
// Create: sql/getUserWithPosts.sql
/*
SELECT u.id, u.name, u.email,
       COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON p.author_id = u.id
WHERE u.id = $1
GROUP BY u.id, u.name, u.email;
*/`}
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              ✨ <strong>TypedSQL:</strong> Type-safe raw SQL queries ด้วย .sql files
            </Typography>
          </Alert>
        </CustomTabPanel>
      </Paper>

      {/* Migrations */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🔄 Database Migrations
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Migrations คือการจัดการการเปลี่ยนแปลง database schema อย่างปลอดภัยและควบคุมได้
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TableChart color="primary" />
              <Typography variant="h6">สร้าง Migration แรก</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              หลังจากสร้าง schema แล้ว ต้องสร้าง migration เพื่อสร้างตารางในฐานข้อมูล
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2">
                $ npx prisma migrate dev --name init
              </Typography>
            </Box>

            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2">
                $ npx prisma generate
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mb: 2 }}>
              <Typography variant="body2">
                ✅ คำสั่งนี้จะสร้างไฟล์ migration ใน prisma/migrations/ และ generate Prisma Client
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Settings color="warning" />
              <Typography variant="h6">Migration Commands</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
              <Typography variant="body2" component="pre">
{`# Development commands
npx prisma migrate dev           # สร้างและ apply migration
npx prisma migrate reset         # รีเซ็ต database และ apply migrations ใหม่
npx prisma db push              # Push schema ไป database (no migration)

# Production commands  
npx prisma migrate deploy       # Apply pending migrations
npx prisma migrate status       # ตรวจสอบ migration status

# Utility commands
npx prisma generate             # Generate Prisma Client
npx prisma generate --sql       # Generate TypedSQL queries
npx prisma db seed              # Run seed script
npx prisma studio              # เปิด Database GUI

# Prisma Postgres commands
npx prisma dev                  # Start local Prisma Postgres
npx prisma studio --browser none # Studio without browser`}
              </Typography>
            </Box>

            <Alert severity="success">
              <Typography variant="body2">
                ✅ <strong>Prisma 6.x:</strong> Enhanced CLI commands และ Prisma Postgres support
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* CRUD Operations */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          📊 CRUD Operations กับ Prisma
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          เรียนรู้การใช้ Prisma Client เพื่อทำ CRUD operations ใน Next.js 15
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DataObject color="success" />
              <Typography variant="h6">Server Components Data Fetching</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ใช้ Prisma ใน Server Components สำหรับ data fetching ด้วย React 19 และ Prisma 6.x
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/users/page.tsx (Server Component)
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  // Prisma 6.x: Enhanced query performance
  const users = await prisma.user.findMany({
    relationLoadStrategy: 'join', // New in Prisma 6.x
    include: {
      posts: true,
      _count: {
        posts: true
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div>
      <h1>รายชื่อผู้ใช้ ({users.length} คน)</h1>
      {users.map(user => (
        <div key={user.id} className="border p-4 mb-4">
          <h3>{user.name || 'No Name'}</h3>
          <p>อีเมล: {user.email}</p>
          <p>จำนวนโพสต์: {user._count.posts}</p>
          <p>สมัครเมื่อ: {user.createdAt.toLocaleDateString('th-TH')}</p>
        </div>
      ))}
    </div>
  );
}

// TypedSQL Example (NEW in Prisma 6.x)
import { getUserWithPosts } from '@/generated/sql';

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const userWithStats = await prisma.$queryRawTyped(
    getUserWithPosts(params.id)
  );
  
  return {
    props: { user: userWithStats[0] }
  };
}`}
              </Typography>
            </Box>

            <Alert severity="info">
              <Typography variant="body2">
                💡 <strong>Prisma 6.x:</strong> relationLoadStrategy และ TypedSQL สำหรับ performance ที่ดีขึ้น
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ApiOutlined color="primary" />
              <Typography variant="h6">API Routes สำหรับ CRUD</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              สร้าง API routes สำหรับ CRUD operations ด้วย Next.js 15 async APIs
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/api/users/route.ts (Prisma 6.x)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: ดึงข้อมูล users พร้อม omit sensitive fields
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      omit: {
        // Omit API - GA in Prisma 6.x
        password: true,
        resetToken: true
      },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'ไม่สามารถดึงข้อมูลได้' },
      { status: 500 }
    );
  }
}

// POST: สร้าง user ใหม่ พร้อม enhanced validation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Enhanced validation
    if (!email || !name) {
      return NextResponse.json(
        { error: 'กรุณากรอก name และ email' },
        { status: 400 }
      );
    }

    // Prisma 6.x: createManyAndReturn for better performance
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(), // or use uuid(7) in schema
        name,
        email,
      },
      omit: {
        password: true // ซ่อน sensitive data
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    // Handle Prisma 6.x errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'อีเมลนี้ถูกใช้แล้ว' },
        { status: 400 }
      );
    }

    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'ไม่สามารถสร้างผู้ใช้ได้' },
      { status: 500 }
    );
  }
}`}
              </Typography>
            </Box>

            <Alert severity="success">
              <Typography variant="body2">
                ✅ <strong>Omit API (GA):</strong> ซ่อน sensitive fields โดยไม่ต้องใช้ select
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Memory color="warning" />
              <Typography variant="h6">Dynamic Routes สำหรับ Individual Records</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              สร้าง API routes สำหรับจัดการ record เดี่ยวๆ ด้วย async params
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
              <Typography variant="body2" component="pre">
{`// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: ดึงข้อมูล user โดย ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'ID ไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'ไม่สามารถดึงข้อมูลได้' },
      { status: 500 }
    );
  }
}

// PUT: อัพเดท user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    const body = await request.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: body
    });

    return NextResponse.json(user);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'ไม่สามารถอัพเดทได้' },
      { status: 500 }
    );
  }
}

// DELETE: ลบ user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    await prisma.user.delete({
      where: { id: userId }
    });

    return NextResponse.json(
      { message: 'ลบผู้ใช้เรียบร้อย' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'ไม่สามารถลบได้' },
      { status: 500 }
    );
  }
}`}
              </Typography>
            </Box>

            <Alert severity="warning">
              <Typography variant="body2">
                ⚠️ <strong>Next.js 15:</strong> params เป็น Promise ต้องใช้ await
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* Best Practices */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'warning.light' }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'warning.dark' }}>
          💡 Best Practices สำหรับ Prisma + Next.js 15
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ Prisma Client Singleton (Enhanced)"
              secondary="ป้องกัน connection limit ด้วย global instance pattern และ transaction options"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="Leverage Prisma Postgres"
              secondary="ใช้ Prisma Postgres สำหรับ zero cold starts และ global performance"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ TypedSQL สำหรับ Complex Queries"
              secondary="Type-safe raw SQL queries ด้วย .sql files และ $queryRawTyped"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ Omit API แทน Select"
              secondary="ซ่อน sensitive fields ด้วย omit option (GA ใน Prisma 6.x)"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="Optimize Queries ด้วย relationLoadStrategy"
              secondary="เลือก 'join' หรือ 'query' strategy สำหรับ relation loading"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ UUIDv7 สำหรับ Primary Keys"
              secondary="Temporally sortable UUIDs ด้วย uuid(7) function"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Performance & Caching */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          ⚡ Performance และ Caching ใน Next.js 15
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Next.js 15 Caching" />
          <Tab label="Query Optimization" />
          <Tab label="Connection Pooling" />
        </Tabs>

        <CustomTabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
            🔄 Prisma 6.x Caching & Performance
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// Server Components - Enhanced with Prisma 6.x
export default async function PostsPage() {
  // Prisma 6.x: relationLoadStrategy for better performance
  const posts = await prisma.post.findMany({
    relationLoadStrategy: 'join', // Database-level joins
    include: {
      author: {
        omit: {
          email: true // Hide sensitive data
        }
      }
    }
  });
  
  return <PostList posts={posts} />;
}

// TypedSQL for complex queries
import { getPostsWithStats } from '@/generated/sql';

export async function getComplexData() {
  const result = await prisma.$queryRawTyped(
    getPostsWithStats({ 
      limit: 10, 
      offset: 0 
    })
  );
  
  return result;
}

// Prisma Postgres with global caching (built-in)
const prisma = new PrismaClient({
  // Prisma Postgres handles caching automatically
  log: ['query', 'info', 'warn', 'error'],
});`}
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>Prisma 6.x:</strong> Built-in performance optimizations และ Prisma Postgres caching
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
            📊 Advanced Query Optimization (Prisma 6.x)
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// Prisma 6.x: Enhanced query strategies
const posts = await prisma.post.findMany({
  relationLoadStrategy: 'join', // Use database joins
  include: {
    author: true,
    comments: {
      include: {
        author: true
      }
    }
  }
});

// Omit API for cleaner data fetching
const users = await prisma.user.findMany({
  omit: {
    password: true,
    resetToken: true,
    internalNotes: true
  },
  include: {
    posts: {
      omit: {
        draft: true // Hide drafts
      }
    }
  }
});

// TypedSQL for complex analytics
// sql/getUserAnalytics.sql
/*
SELECT 
  u.id,
  u.name,
  COUNT(p.id) as total_posts,
  AVG(p.view_count) as avg_views,
  MAX(p.created_at) as last_post_date
FROM users u
LEFT JOIN posts p ON p.author_id = u.id
WHERE u.created_at >= $1
GROUP BY u.id, u.name
HAVING COUNT(p.id) > $2
ORDER BY total_posts DESC
LIMIT $3;
*/

import { getUserAnalytics } from '@/generated/sql';

const analytics = await prisma.$queryRawTyped(
  getUserAnalytics(
    new Date('2024-01-01'),
    5, // minimum posts
    20  // limit
  )
);`}
            </Typography>
          </Box>

          <Alert severity="success">
            <Typography variant="body2">
              ✅ <strong>Performance:</strong> relationLoadStrategy, Omit API และ TypedSQL
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
            🏊 Prisma Postgres & Connection Management
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// Prisma Postgres setup (แนะนำ)
// .env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your_api_key"

// lib/prisma.ts - Prisma 6.x optimized
import { PrismaClient } from '@prisma/client';

const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
    
    // Prisma 6.x: Enhanced transaction options
    transactionOptions: {
      timeout: 10000, // 10 seconds
      maxWait: 5000,  // 5 seconds
      isolationLevel: 'ReadCommitted'
    }
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Connection monitoring
export async function checkConnection() {
  try {
    await prisma.$queryRaw\`SELECT 1\`;
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

// Graceful shutdown
export async function closeConnection() {
  await prisma.$disconnect();
}`}
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>Prisma Postgres:</strong> Zero cold starts, global caching และ automatic connection pooling
            </Typography>
          </Alert>
        </CustomTabPanel>
      </Paper>

      {/* Next Steps */}
      <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.dark' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 6 แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          ตอนนี้คุณมีความรู้เกี่ยวกับ Prisma ORM 6.8 และการจัดการฐานข้อมูลแล้ว 
          พร้อมสำหรับการเรียนรู้เรื่อง React Hooks ในบทถัดไป
        </Typography>
        
        <Typography variant="h6" sx={{ mb: 2 }}>
          📚 สิ่งที่คุณได้เรียนรู้ในบทนี้:
        </Typography>
        <List dense sx={{ mb: 3 }}>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="การติดตั้งและตั้งค่า Prisma 6.8" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="การออกแบบ Schema และ Migration" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="CRUD Operations และ Prisma Client" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="TypedSQL และ Omit API (ฟีเจอร์ใหม่)" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="Prisma Postgres และ Connection Management" />
          </ListItem>
        </List>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>บทถัดไป:</strong> เรียนรู้ React Hooks (useState, useEffect) สำหรับ state management และ side effects
          </Typography>
        </Alert>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-5"
          variant="outlined"
        >
          บทที่ 5: Data Fetching
        </Button>
        
        <Chip 
          label="6 / 16"
          color="primary"
          variant="outlined"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-7"
          variant="contained"
          color="primary"
        >
          บทที่ 7: React Hooks
        </Button>
      </Box>
    </Container>
  );
} 