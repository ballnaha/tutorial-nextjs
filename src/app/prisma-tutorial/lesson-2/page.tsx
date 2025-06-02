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
  Grid,
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

const schemaSteps = [
  {
    label: 'วางแผนและวิเคราะห์ข้อมูล (Data Planning)',
    description: 'วิเคราะห์ business requirements และออกแบบโครงสร้างข้อมูลก่อนเขียนโค้ด - ขั้นตอนสำคัญที่จะกำหนดความสำเร็จของโปรเจค',
    subSteps: [
      'ระบุ entities หลัก (Users, Posts, Categories)',
      'กำหนด attributes ของแต่ละ entity',
      'วิเคราะห์ relationships ระหว่าง entities',
      'วางแผน data validation และ constraints'
    ],
    command: 'วาดแผนผัง ER Diagram และวิเคราะห์ business logic',
    expectedOutput: 'แผนผังโครงสร้างข้อมูลที่ชัดเจนและเข้าใจง่าย',
    codeExample: `// ตัวอย่างการวางแผน - ระบบบล็อก
/*
Business Requirements:
- ผู้ใช้สามารถสร้างบัญชีและล็อกอิน
- ผู้ใช้เขียนโพสต์ได้หลายโพสต์
- โพสต์สามารถมีหลายแท็ก
- ผู้ใช้คอมเมนต์โพสต์ได้
- ผู้ใช้มีโปรไฟล์ส่วนตัว

Entity Analysis:
1. User (ผู้ใช้)
   - id, email, name, password
   - has one Profile
   - has many Posts
   - has many Comments

2. Profile (โปรไฟล์)
   - id, bio, avatar, userId
   - belongs to one User

3. Post (โพสต์)
   - id, title, content, authorId
   - belongs to one User (author)
   - has many Comments
   - has many Tags (many-to-many)

4. Comment (คอมเมนต์)
   - id, content, postId, authorId
   - belongs to one Post
   - belongs to one User (author)

5. Tag (แท็ก)
   - id, name, color
   - belongs to many Posts
*/`,
    tips: [
      '🎯 เริ่มจาก core entities ก่อน แล้วค่อยเพิ่ม features',
      '📝 เขียน user stories เพื่อเข้าใจ business logic',
      '🔗 ระบุ relationships อย่างละเอียด',
      '⚡ คิดถึง performance ตั้งแต่ขั้นวางแผน'
    ]
  },
  {
    label: 'สร้าง Database Schema (Schema Definition)',
    description: 'เขียน schema.prisma ตาม design ที่วางแผนไว้ พร้อมกำหนด field types, constraints และ attributes ที่เหมาะสม',
    subSteps: [
      'สร้างไฟล์ prisma/schema.prisma',
      'กำหนด generator และ datasource',
      'สร้าง models ตาม entities ที่วางแผน',
      'เพิ่ม field types และ attributes'
    ],
    command: 'เขียน Models และ Fields ใน schema.prisma',
    expectedOutput: 'Schema ที่มี Models พื้นฐานพร้อม field types',
    codeExample: `// prisma/schema.prisma - ขั้นตอนที่ 2
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // หรือ mysql, sqlite
  url      = env("DATABASE_URL")
}

// สร้าง Models พื้นฐานก่อน (ยังไม่มี relations)
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String   // จะเป็น hash แน่นอน
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("users")
}

model Profile {
  id        Int      @id @default(autoincrement())
  bio       String?  // optional field
  avatar    String?  // URL หรือ path ของรูป
  userId    Int      @unique  // foreign key
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("profiles")
}

model Post {
  id          Int      @id @default(autoincrement())
  title       String
  content     String?  // ใช้ Text สำหรับเนื้อหายาว
  slug        String   @unique  // สำหรับ SEO-friendly URLs
  published   Boolean  @default(false)
  publishedAt DateTime?
  authorId    Int      // foreign key
  views       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("posts")
  @@index([authorId])  // index สำหรับ query ที่เร็วขึ้น
  @@index([published])
}`,
    tips: [
      '🔢 เริ่มจาก scalar fields ก่อน (String, Int, DateTime)',
      '🔑 ใช้ @unique สำหรับ fields ที่ไม่ซ้ำ เช่น email, slug',
      '📅 เพิ่ม createdAt และ updatedAt ให้ทุก model',
      '📍 ใช้ @@map() เพื่อกำหนดชื่อ table ที่เป็น snake_case'
    ]
  },
  {
    label: 'กำหนด Relations และ Constraints',
    description: 'เพิ่ม relationships ระหว่าง models พร้อมกำหนด foreign keys, indexes และ constraints เพื่อรักษา data integrity',
    subSteps: [
      'เพิ่ม relation fields ใน models',
      'กำหนด foreign keys และ references',
      'เพิ่ม indexes สำหรับ performance',
      'ตั้งค่า onDelete และ onUpdate behaviors'
    ],
    command: 'เพิ่ม relations, foreign keys และ indexes',
    expectedOutput: 'Models ที่มี relationships สมบูรณ์',
    codeExample: `// prisma/schema.prisma - เพิ่ม Relations
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations (หนึ่งผู้ใช้มีได้...)
  profile   Profile? // หนึ่งโปรไฟล์ (optional)
  posts     Post[]   // หลายโพสต์
  comments  Comment[] // หลายคอมเมนต์
  
  @@map("users")
}

model Profile {
  id        Int      @id @default(autoincrement())
  bio       String?
  avatar    String?
  userId    Int      @unique  // Foreign Key
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("profiles")
}

model Post {
  id          Int       @id @default(autoincrement())
  title       String
  content     String?
  slug        String    @unique
  published   Boolean   @default(false)
  publishedAt DateTime?
  authorId    Int       // Foreign Key
  views       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Relations
  author      User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  comments    Comment[]
  tags        Tag[]     // Many-to-many relation
  
  @@map("posts")
  @@index([authorId])
  @@index([published])
  @@index([slug])       // สำหรับ SEO URLs
}`,
    tips: [
      '🔗 ใช้ onDelete: Cascade เมื่อต้องการลบ related records',
      '📊 เพิ่ม @@index สำหรับ foreign keys',
      '🏷️ Many-to-many ใน Prisma จะสร้าง junction table อัตโนมัติ',
      '⚠️ ระวัง circular references ใน relations'
    ]
  },
  {
    label: 'Generate Client และ Testing',
    description: 'สร้าง Prisma Client ใหม่ ทดสอบ schema และสร้าง database ให้ตรงกับ schema ที่ออกแบบ',
    subSteps: [
      'Generate Prisma Client ใหม่',
      'สร้าง migration files',
      'Apply migrations ไปยังฐานข้อมูล',
      'ทดสอบ schema ด้วย Prisma Studio'
    ],
    command: 'npx prisma generate && npx prisma db push',
    expectedOutput: 'ฐานข้อมูลและ Client พร้อมใช้งาน',
    codeExample: `# คำสั่งที่ต้องรันตามลำดับ

# 1. Generate Prisma Client จาก schema
npx prisma generate

# 2. สร้าง migration (สำหรับ production)
npx prisma migrate dev --name init

# หรือใช้ db push สำหรับ development
npx prisma db push

# 3. เปิด Prisma Studio เพื่อดูโครงสร้าง
npx prisma studio

# 4. ทดสอบ connection
npx prisma db seed  # ถ้ามี seed file

# Validation Commands
npx prisma validate      # ตรวจสอบ schema syntax
npx prisma format        # จัดรูปแบบ schema file
npx prisma migrate status # ดู migration status`,
    tips: [
      '🔄 รัน generate หลังแก้ไข schema ทุกครั้ง',
      '🗄️ ใช้ migrate สำหรับ production, db push สำหรับ development',
      '🎨 ใช้ Prisma Studio เพื่อ visualize data',
      '🧪 ทดสอบ basic CRUD operations ก่อน deploy'
    ]
  },
  {
    label: 'Optimization และ Advanced Features',
    description: 'ปรับปรุง performance ด้วย indexes, views, และ advanced features ของ Prisma เพื่อให้พร้อมใช้งานจริง',
    subSteps: [
      'เพิ่ม composite indexes สำหรับ queries ที่ซับซ้อน',
      'ตั้งค่า connection pooling',
      'เพิ่ม data validation และ custom types',
      'สร้าง seed script สำหรับ initial data'
    ],
    command: 'ปรับแต่ง performance และเพิ่ม advanced features',
    expectedOutput: 'Schema ที่เหมาะสำหรับการใช้งานจริงในระดับ production',
    codeExample: `// prisma/schema.prisma - Advanced Features
model Post {
  id          Int       @id @default(autoincrement())
  title       String
  content     String?
  slug        String    @unique
  published   Boolean   @default(false)
  publishedAt DateTime?
  authorId    Int
  categoryId  Int?
  views       Int       @default(0)
  likes       Int       @default(0)
  
  // Advanced fields
  metadata    Json?     // สำหรับ SEO data, custom fields
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Relations
  author      User      @relation(fields: [authorId], references: [id])
  category    Category? @relation(fields: [categoryId], references: [id])
  comments    Comment[]
  tags        Tag[]
  
  @@map("posts")
  
  // Performance Indexes
  @@index([authorId, published])     // Composite index
  @@index([categoryId, published])   // สำหรับ filter by category
  @@index([createdAt])               // สำหรับ sorting by date
  @@index([views])                   // สำหรับ popular posts
}`,
    tips: [
      '📈 ใช้ composite indexes สำหรับ queries ที่มี multiple conditions',
      '🔍 เพิ่ม full-text search สำหรับ content-heavy applications',
      '🌱 สร้าง seed script เพื่อ populate initial data',
      '⚡ ใช้ connection pooling สำหรับ high-traffic applications',
      '🔒 เพิ่ม validation ด้วย Zod หรือ libraries อื่น'
    ]
  }
];

const fieldTypes = [
  {
    category: 'String Types',
    types: [
      { name: 'String', description: 'ข้อความทั่วไป', example: 'name String' },
      { name: 'String?', description: 'ข้อความที่อาจเป็น null', example: 'nickname String?' },
      { name: 'String @unique', description: 'ข้อความที่ไม่ซ้ำ', example: 'email String @unique' },
    ]
  },
  {
    category: 'Number Types',
    types: [
      { name: 'Int', description: 'จำนวนเต็ม', example: 'age Int' },
      { name: 'Float', description: 'จำนวนทศนิยม', example: 'price Float' },
      { name: 'BigInt', description: 'จำนวนเต็มขนาดใหญ่', example: 'views BigInt' },
    ]
  },
  {
    category: 'Date & Boolean',
    types: [
      { name: 'DateTime', description: 'วันที่และเวลา', example: 'createdAt DateTime @default(now())' },
      { name: 'Boolean', description: 'true หรือ false', example: 'isPublished Boolean @default(false)' },
    ]
  },
  {
    category: 'Special Types',
    types: [
      { name: 'Json', description: 'ข้อมูล JSON', example: 'metadata Json?' },
      { name: 'Bytes', description: 'ข้อมูล binary', example: 'avatar Bytes?' },
    ]
  }
];

const relationTypes = [
  {
    title: 'One-to-Many (1:M)',
    description: 'ผู้ใช้หนึ่งคนมีหลายโพสต์',
    icon: '📝',
    example: `model User {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  title    String
  authorId Int
  author   User @relation(fields: [authorId], references: [id])
}`,
    explanation: 'User มี posts หลายตัว, Post มี author เพียงคนเดียว'
  },
  {
    title: 'Many-to-Many (M:M)',
    description: 'โพสต์หนึ่งโพสต์มีหลาย tags, tag หนึ่งตัวอยู่ในหลายโพสต์',
    icon: '🏷️',
    example: `model Post {
  id   Int    @id @default(autoincrement())
  title String
  tags  Tag[]
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}`,
    explanation: 'ใช้ implicit many-to-many relation ที่ Prisma จัดการให้'
  },
  {
    title: 'One-to-One (1:1)',
    description: 'ผู้ใช้หนึ่งคนมีโปรไฟล์เพียงหนึ่งโปรไฟล์',
    icon: '👤',
    example: `model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  userId Int    @unique
  user   User   @relation(fields: [userId], references: [id])
}`,
    explanation: 'ใช้ @unique เพื่อให้แน่ใจว่าเป็น 1:1 relation'
  }
];

const codeExamples = {
  basicSchema: `// prisma/schema.prisma - Schema สำหรับระบบบล็อกง่ายๆ
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // หรือ mysql, sqlite
  url      = env("DATABASE_URL")
}

// Model สำหรับผู้ใช้
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  profile   Profile?
  posts     Post[]
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users") // ชื่อ table ในฐานข้อมูล
}

// Model สำหรับโปรไฟล์ผู้ใช้
model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  avatar String?
  userId Int     @unique
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("profiles")
}

// Model สำหรับโพสต์
model Post {
  id          Int       @id @default(autoincrement())
  title       String
  content     String?
  slug        String    @unique
  published   Boolean   @default(false)
  publishedAt DateTime?
  authorId    Int
  author      User      @relation(fields: [authorId], references: [id])
  comments    Comment[]
  tags        Tag[]
  views       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("posts")
  @@index([authorId])
  @@index([published])
}

// Model สำหรับคอมเมนต์
model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  postId    Int
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())

  @@map("comments")
  @@index([postId])
  @@index([authorId])
}

// Model สำหรับแท็ก
model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  color String @default("#3B82F6")
  posts Post[]

  @@map("tags")
}

// Enum สำหรับบทบาทผู้ใช้
enum Role {
  USER
  ADMIN
  MODERATOR
}`,

  advancedSchema: `// prisma/schema.prisma - Schema ขั้นสูงสำหรับ E-commerce
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  firstName String
  lastName  String
  phone     String?
  status    UserStatus @default(ACTIVE)
  
  // Relations
  profile   Profile?
  addresses Address[]
  orders    Order[]
  reviews   Review[]
  cart      CartItem[]
  
  // Metadata
  lastLoginAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("users")
  @@index([email])
  @@index([status])
}

model Product {
  id          Int           @id @default(autoincrement())
  name        String
  description String?
  price       Decimal       @db.Decimal(10, 2)
  sku         String        @unique
  stock       Int           @default(0)
  status      ProductStatus @default(ACTIVE)
  categoryId  Int
  category    Category      @relation(fields: [categoryId], references: [id])
  
  // Relations
  images      ProductImage[]
  cartItems   CartItem[]
  orderItems  OrderItem[]
  reviews     Review[]
  
  // SEO และ metadata
  slug        String        @unique
  tags        String[]      // PostgreSQL array
  metadata    Json?         // ข้อมูลเพิ่มเติมในรูป JSON
  
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@map("products")
  @@index([categoryId])
  @@index([status])
  @@index([price])
  @@fulltext([name, description]) // MySQL full-text search
}

model Order {
  id           Int         @id @default(autoincrement())
  orderNumber  String      @unique @default(uuid())
  status       OrderStatus @default(PENDING)
  totalAmount  Decimal     @db.Decimal(10, 2)
  shippingCost Decimal     @db.Decimal(10, 2) @default(0)
  taxAmount    Decimal     @db.Decimal(10, 2) @default(0)
  
  // Relations
  userId       Int
  user         User        @relation(fields: [userId], references: [id])
  items        OrderItem[]
  shippingId   Int?
  shipping     Address?    @relation(fields: [shippingId], references: [id])
  
  // Timestamps
  orderDate    DateTime    @default(now())
  shippedAt    DateTime?
  deliveredAt  DateTime?
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt

  @@map("orders")
  @@index([userId])
  @@index([status])
  @@index([orderDate])
}

// Enum types
enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

enum ProductStatus {
  ACTIVE
  INACTIVE
  OUT_OF_STOCK
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}`,

  migrations: `-- สร้าง migration แรก
npx prisma migrate dev --name init

-- ดู migration history
npx prisma migrate status

-- Reset ฐานข้อมูล (ระวัง! จะลบข้อมูลทั้งหมด)
npx prisma migrate reset

-- Deploy migration ไป production
npx prisma migrate deploy

-- สร้าง migration สำหรับการเปลี่ยนแปลง
npx prisma migrate dev --name add_user_profile

-- แก้ไข migration ก่อน deploy
npx prisma migrate diff \\
  --from-empty \\
  --to-schema-datamodel prisma/schema.prisma \\
  --script`,

  studioUsage: `# เปิด Prisma Studio (GUI สำหรับจัดการข้อมูล)
npx prisma studio

# Studio จะเปิดที่ http://localhost:5555
# คุณสามารถ:
# - ดูข้อมูลในตาราง
# - เพิ่ม/แก้ไข/ลบข้อมูล
# - Filter และ search
# - ดู relationships

# สำหรับ production ใช้ environment variable
DATABASE_URL="your-production-url" npx prisma studio`
};

const bestPractices = [
  {
    title: '📝 การตั้งชื่อ Models และ Fields',
    description: 'ใช้ PascalCase สำหรับ Models และ camelCase สำหรับ fields',
    examples: [
      'Model: User, BlogPost, ProductCategory',
      'Fields: firstName, createdAt, isPublished',
      'Relations: posts, author, comments'
    ]
  },
  {
    title: '🔑 Primary Keys และ IDs',
    description: 'ใช้ @id และ @default(autoincrement()) สำหรับ primary key',
    examples: [
      'id Int @id @default(autoincrement())',
      'uuid String @id @default(uuid())',
      'รวม composite key: @@id([userId, postId])'
    ]
  },
  {
    title: '📅 Timestamps',
    description: 'เพิ่ม createdAt และ updatedAt ให้ทุก Model',
    examples: [
      'createdAt DateTime @default(now())',
      'updatedAt DateTime @updatedAt',
      'publishedAt DateTime? // อาจเป็น null'
    ]
  },
  {
    title: '🔍 Indexes และ Performance',
    description: 'เพิ่ม index สำหรับ fields ที่ใช้ query บ่อย',
    examples: [
      '@@index([email]) // single field',
      '@@index([userId, status]) // composite',
      '@@unique([slug]) // unique constraint'
    ]
  }
];

export default function PrismaLesson2Page() {
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
            <Architecture color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 2: การออกแบบ Prisma Schema
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            ศึกษาการออกแบบฐานข้อมูลด้วย Prisma Schema Language แบบมืออาชีพ! 🏗️
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Timer />} label="45 นาที" color="primary" />
            <Chip icon={<Assignment />} label="ระดับกลาง" color="warning" />
            <Chip icon={<Code />} label="Hands-on" color="secondary" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> เข้าใจการออกแบบ database schema ด้วย Prisma และสามารถสร้าง Models ที่มี relations ได้
              <br />
              📋 <strong>สิ่งที่ต้องมี:</strong> Prisma ที่ติดตั้งแล้ว (จากบทที่ 1) และฐานข้อมูลที่เชื่อมต่อได้
            </Typography>
          </Alert>

          {/* Learning Progress */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'secondary.50', border: '2px solid', borderColor: 'secondary.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Psychology color="secondary" /> 🧠 ทำไมต้องออกแบบ Schema ให้ดี?
            </Typography>
            
            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'secondary.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🏗️ <strong>Foundation ที่แข็งแรง:</strong> Schema ที่ดีเป็นรากฐานของแอปพลิเคชันที่ยืนยาว
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • ⚡ <strong>Performance:</strong> Index และ relation ที่ถูกต้องทำให้ query เร็วขึ้น
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🔒 <strong>Data Integrity:</strong> Constraints และ validation ป้องกันข้อมูลผิดพลาด
              </Typography>
              <Typography variant="body2">
                • 🚀 <strong>Scalability:</strong> Schema ที่ยืดหยุ่นรองรับการเติบโตในอนาคต
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> เข้าใจการออกแบบฐานข้อมูลแบบมืออาชีพที่ใช้งานได้จริงในโปรเจคใหญ่!
              </Typography>
            </Alert>
          </Paper>
        </Box>

        {/* Field Types Overview */}
        <Typography variant="h4" sx={{ mb: 3 }}>📊 ประเภทของ Fields ใน Prisma</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          {fieldTypes.map((category, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  {category.category}
                </Typography>
                <Stack spacing={1}>
                  {category.types.map((type, idx) => (
                    <Box key={idx} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                        {type.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {type.description}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'primary.main' }}>
                        {type.example}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Schema Design Steps */}
        <Typography variant="h4" sx={{ mb: 3 }}>🛠️ ขั้นตอนการออกแบบ Schema</Typography>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {schemaSteps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === schemaSteps.length - 1 ? (
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
                  
                  {/* Sub Steps */}
                  {step.subSteps && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        📋 ขั้นตอนย่อย:
                      </Typography>
                      <List dense>
                        {step.subSteps.map((subStep, idx) => (
                          <ListItem key={idx} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircle color="primary" sx={{ fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={subStep}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      💡 <strong>สิ่งที่ต้องทำ:</strong> {step.command}
                    </Typography>
                  </Alert>
                  
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      ✅ <strong>ผลลัพธ์:</strong> {step.expectedOutput}
                    </Typography>
                  </Alert>
                  
                  {/* Code Example */}
                  {step.codeExample && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        💻 ตัวอย่างโค้ด:
                      </Typography>
                      <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <pre style={{ 
                          fontSize: '0.75rem',
                          flex: 1,
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                          lineHeight: 1.4
                        }}>
                          {step.codeExample}
                        </pre>
                        <Button
                          size="small"
                          onClick={() => handleCopyCode(step.codeExample, `step-${index}`)}
                          sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
                        >
                          <ContentCopy sx={{ fontSize: 16 }} />
                        </Button>
                      </Box>
                      
                      {copiedCode === `step-${index}` && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                          คัดลอกโค้ดแล้ว!
                        </Alert>
                      )}
                    </Box>
                  )}
                  
                  {/* Tips */}
                  {step.tips && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        💡 เทคนิคและคำแนะนำ:
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {step.tips.map((tip, idx) => (
                          <Chip 
                            key={idx}
                            label={tip} 
                            size="small" 
                            variant="outlined"
                            color="secondary"
                            sx={{ 
                              fontSize: '0.75rem', 
                              alignSelf: 'flex-start',
                              '& .MuiChip-label': {
                                whiteSpace: 'normal',
                                lineHeight: 1.2
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  <Box sx={{ mb: 1 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === schemaSteps.length - 1 ? 'เสร็จสิ้น' : 'ขั้นตอนถัดไป'}
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
          
          {activeStep === schemaSteps.length && (
            <Paper square elevation={0} sx={{ p: 3, bgcolor: 'success.light' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎉 ออกแบบ Schema เรียบร้อยแล้ว!
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                ตอนนี้คุณมี Schema ที่มี Models และ Relations ครบถ้วนแล้ว พร้อมใช้งานใน application ระดับ production
              </Typography>
              
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  🚀 <strong>ขั้นตอนถัดไป:</strong> นำ Schema ไปใช้กับ Prisma Client และสร้าง API endpoints
                </Typography>
              </Alert>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button onClick={handleReset} variant="outlined" sx={{ mt: 1 }}>
                  ดูขั้นตอนอีกครั้ง
                </Button>

              </Box>
            </Paper>
          )}
        </Paper>

        {/* Relations Types */}
        <Typography variant="h4" sx={{ mb: 3 }}>🔗 ประเภทของ Relations</Typography>

        <Stack spacing={3} sx={{ mb: 4 }}>
          {relationTypes.map((relation, index) => (
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
                    {relation.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {relation.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {relation.description}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  💻 ตัวอย่างโค้ด:
                </Typography>
                <Box className="code-block" sx={{ p: 2, mb: 2 }}>
                  <pre style={{ 
                    fontSize: '0.875rem',
                    margin: 0,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {relation.example}
                  </pre>
                </Box>
                
                <Alert severity="info">
                  <Typography variant="body2">
                    💡 <strong>อธิบาย:</strong> {relation.explanation}
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Best Practices */}
        <Typography variant="h4" sx={{ mb: 3 }}>⭐ Best Practices</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          {bestPractices.map((practice, index) => (
            <Card key={index} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {practice.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {practice.description}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  ตัวอย่าง:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {practice.examples.map((example, idx) => (
                    <Chip 
                      key={idx}
                      label={example} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.75rem', alignSelf: 'flex-start' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Code Examples Tabs */}
        <Typography variant="h4" sx={{ mb: 3 }}>💻 ตัวอย่าง Schema ตามสถานการณ์จริง</Typography>

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
              label="📝 Blog Schema" 
              icon={<Assignment />}
              iconPosition="start"
            />
            <Tab 
              label="🛒 E-commerce Schema" 
              icon={<Category />}
              iconPosition="start"
            />
            <Tab 
              label="🚀 Migration Commands" 
              icon={<Build />}
              iconPosition="start"
            />
            <Tab 
              label="🎨 Prisma Studio" 
              icon={<Storage />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            Schema สำหรับระบบบล็อก
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            Schema ที่ครอบคลุม Users, Posts, Comments, Tags และ Profiles พร้อม relations ทั้งหมด
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.basicSchema}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.basicSchema, 'basicSchema')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'basicSchema' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก Blog Schema แล้ว!
            </Alert>
          )}
          
          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>คำแนะนำ:</strong> Schema นี้เหมาะสำหรับเว็บไซต์บล็อก CMS หรือระบบข่าวสาร
            </Typography>
          </Alert>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            Schema สำหรับระบบ E-commerce
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            Schema ที่ซับซ้อนกว่า รองรับสินค้า คำสั่งซื้อ ตะกร้า และระบบรีวิว
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.advancedSchema}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.advancedSchema, 'advancedSchema')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'advancedSchema' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก E-commerce Schema แล้ว!
            </Alert>
          )}
          
          <Alert severity="warning">
            <Typography variant="body2">
              ⚠️ <strong>หมายเหตุ:</strong> Schema นี้ใช้ features ขั้นสูง เช่น Decimal, Arrays, JSON ตรวจสอบว่าฐานข้อมูลรองรับ
            </Typography>
          </Alert>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            คำสั่ง Migration ที่สำคัญ
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            คำสั่งสำหรับจัดการ database migrations ในทุกสถานการณ์
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.migrations}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.migrations, 'migrations')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'migrations' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอกคำสั่ง Migration แล้ว!
            </Alert>
          )}
          
          <Alert severity="error">
            <Typography variant="body2">
              ⚠️ <strong>ระวัง:</strong> คำสั่ง migrate reset จะลบข้อมูลทั้งหมด ใช้เฉพาะใน development เท่านั้น!
            </Typography>
          </Alert>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            การใช้งาน Prisma Studio
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            GUI tool สำหรับดูและจัดการข้อมูลในฐานข้อมูลแบบ visual
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.studioUsage}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.studioUsage, 'studioUsage')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'studioUsage' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอกคำสั่ง Studio แล้ว!
            </Alert>
          )}
          
          <Alert severity="success">
            <Typography variant="body2">
              ✨ <strong>ข้อดี:</strong> Prisma Studio ช่วยให้ debug และจัดการข้อมูลง่ายขึ้นมาก เหมาะสำหรับ development
            </Typography>
          </Alert>
        </TabPanel>

        {/* Quick Reference Table */}
        <Typography variant="h4" sx={{ mb: 3 }}>📋 อ้างอิงเร็ว: Attributes ที่ใช้บ่อย</Typography>
        
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'black', fontWeight: 600 }}>Attribute</TableCell>
                <TableCell sx={{ color: 'black', fontWeight: 600 }}>การใช้งาน</TableCell>
                <TableCell sx={{ color: 'black', fontWeight: 600 }}>ตัวอย่าง</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>@id</TableCell>
                <TableCell>กำหนด Primary Key</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>id Int @id @default(autoincrement())</TableCell>
              </TableRow>
              <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>@unique</TableCell>
                <TableCell>กำหนดให้ค่าไม่ซ้ำ</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>email String @unique</TableCell>
              </TableRow>
              <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>@default()</TableCell>
                <TableCell>กำหนดค่าเริ่มต้น</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>createdAt DateTime @default(now())</TableCell>
              </TableRow>
              <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>@relation</TableCell>
                <TableCell>กำหนด Foreign Key</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>author User @relation(fields: [authorId], references: [id])</TableCell>
              </TableRow>
              <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>@@index</TableCell>
                <TableCell>สร้าง Database Index</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>@@index([email, status])</TableCell>
              </TableRow>
              <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>@@map</TableCell>
                <TableCell>กำหนดชื่อ Table</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>@@map("users")</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/prisma-tutorial/lesson-1"
            variant="outlined"
          >
            บทที่ 1: เริ่มต้น Prisma
          </Button>
          
          <Chip 
            label="2 / 12"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/prisma-tutorial/lesson-3"
            variant="contained"
          >
            บทที่ 3: Prisma Client
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 