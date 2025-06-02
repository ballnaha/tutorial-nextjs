'use client';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Stack,
  Avatar,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Storage,
  Assignment,
  Settings,
  Code,
  Speed,
  ContentCopy,
  Check,
  AccountTree,
  Link as LinkIcon,
  Group,
  Person,
  Business,
  Timer,
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
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Lesson4Page() {
  const [activeStep, setActiveStep] = useState(0);
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

  const relationSteps = [
    {
      label: 'ทำความเข้าใจ Relations',
      description: 'เรียนรู้ประเภทของความสัมพันธ์ในฐานข้อมูล',
      content: 'Relations คือความสัมพันธ์ระหว่างตารางต่างๆ ใน database'
    },
    {
      label: 'One-to-One Relations',
      description: 'ความสัมพันธ์แบบหนึ่งต่อหนึ่ง',
      content: 'หนึ่ง record ในตาราง A เชื่อมโยงกับหนึ่ง record ในตาราง B'
    },
    {
      label: 'One-to-Many Relations',
      description: 'ความสัมพันธ์แบบหนึ่งต่อหลาย',
      content: 'หนึ่ง record ในตาราง A เชื่อมโยงกับหลาย records ในตาราง B'
    },
    {
      label: 'Many-to-Many Relations',
      description: 'ความสัมพันธ์แบบหลายต่อหลาย',
      content: 'หลาย records ในตาราง A เชื่อมโยงกับหลาย records ในตาราง B'
    },
    {
      label: 'Best Practices',
      description: 'แนวทางปฏิบัติที่ดีสำหรับ Relations',
      content: 'เรียนรู้เทคนิคและกฎเกณฑ์สำหรับการออกแบบ Relations'
    }
  ];

  const relationTypes = [
    {
      icon: <Person />,
      title: 'One-to-One',
      description: 'หนึ่งผู้ใช้มีหนึ่งโปรไฟล์',
      example: 'User ↔ Profile',
      color: 'success',
      difficulty: 'ง่าย'
    },
    {
      icon: <Group />,
      title: 'One-to-Many',
      description: 'หนึ่งผู้ใช้มีหลายโพสต์',
      example: 'User → Posts',
      color: 'info',
      difficulty: 'ง่าย'
    },
    {
      icon: <AccountTree />,
      title: 'Many-to-Many',
      description: 'หลายผู้ใช้มีหลาย roles',
      example: 'Users ↔ Roles',
      color: 'warning',
      difficulty: 'ปานกลาง'
    },
    {
      icon: <Business />,
      title: 'Self Relations',
      description: 'ผู้ใช้มีหัวหน้าเป็นผู้ใช้คนอื่น',
      example: 'User → Manager (User)',
      color: 'error',
      difficulty: 'ขั้นสูง'
    }
  ];

  const codeExamples = {
    oneToOne: `model User {
  id      Int     @id @default(autoincrement())
  email   String  @unique
  name    String?
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  avatar String?
  userId Int    @unique
  user   User   @relation(fields: [userId], references: [id])
}`,

    oneToMany: `model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}`,

    manyToMany: `model User {
  id         Int          @id @default(autoincrement())
  email      String       @unique
  name       String?
  categories UserCategory[]
}

model Category {
  id    Int            @id @default(autoincrement())
  name  String         @unique
  users UserCategory[]
}

model UserCategory {
  userId     Int
  categoryId Int
  user       User     @relation(fields: [userId], references: [id])
  category   Category @relation(fields: [categoryId], references: [id])
  
  @@id([userId, categoryId])
}`,

    clientUsage: `// ค้นหาผู้ใช้พร้อมโพสต์ทั้งหมด
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true,
    profile: true
  }
})

// ค้นหาโพสต์พร้อมข้อมูลผู้เขียน
const postsWithAuthor = await prisma.post.findMany({
  include: {
    author: {
      select: {
        name: true,
        email: true
      }
    }
  }
})

// สร้างผู้ใช้พร้อมโปรไฟล์
const newUser = await prisma.user.create({
  data: {
    email: "john@example.com",
    name: "John Doe",
    profile: {
      create: {
        bio: "Software Developer",
        avatar: "avatar.jpg"
      }
    }
  }
})`
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
            <AccountTree color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 4: Relations และ Associations
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การสร้างความสัมพันธ์ระหว่างตารางใน Prisma Schema! 🔗
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Timer />} label="40 นาที" color="primary" />
            <Chip icon={<Assignment />} label="ระดับปานกลาง" color="warning" />
            <Chip icon={<Code />} label="Database Design" color="secondary" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> เข้าใจและสร้าง Relations ในฐานข้อมูลได้อย่างมืออาชีพ
              <br />
              📋 <strong>สิ่งที่ต้องมี:</strong> ความเข้าใจพื้นฐานเรื่อง Database และ Prisma Schema จากบทที่ 2
            </Typography>
          </Alert>
        </Box>

        {/* Relations Overview */}
        <Typography variant="h4" sx={{ mb: 3 }}>🔗 ประเภทของ Relations</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          {relationTypes.map((type, index) => (
            <Card key={index}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${type.color}.main`, mr: 2 }}>
                    {type.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {type.title}
                    </Typography>
                    <Chip 
                      label={type.difficulty} 
                      size="small" 
                      color={type.color as any}
                      variant="outlined"
                    />
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {type.description}
                </Typography>
                
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  ตัวอย่าง:
                </Typography>
                <Chip 
                  label={type.example} 
                  size="small" 
                  variant="outlined"
                  sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Code Examples Tabs */}
        <Typography variant="h4" sx={{ mb: 3 }}>📖 ตัวอย่าง Relations แบบละเอียด</Typography>

        <Box sx={{ width: '100%', mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab 
              label="👤 One-to-One" 
              icon={<Person />}
              iconPosition="start"
            />
            <Tab 
              label="📝 One-to-Many" 
              icon={<Group />}
              iconPosition="start"
            />
            <Tab 
              label="🔗 Many-to-Many" 
              icon={<AccountTree />}
              iconPosition="start"
            />
            <Tab 
              label="💻 Prisma Client" 
              icon={<Code />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            One-to-One Relations
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            ความสัมพันธ์แบบหนึ่งต่อหนึ่ง ใช้สำหรับข้อมูลที่มีความเชื่อมโยงกันแบบเฉพาะเจาะจง
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.oneToOne}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.oneToOne, 'oneToOne')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'oneToOne' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก One-to-One Schema แล้ว!
            </Alert>
          )}
          
          <Alert severity="success">
            <Typography variant="body2">
              ✨ <strong>เทคนิค:</strong> ใช้ <code>@unique</code> กับ foreign key เพื่อบังคับให้เป็น one-to-one relation
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            One-to-Many Relations
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            ความสัมพันธ์แบบหนึ่งต่อหลาย เป็นรูปแบบที่ใช้บ่อยที่สุดในฐานข้อมูล
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.oneToMany}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.oneToMany, 'oneToMany')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'oneToMany' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก One-to-Many Schema แล้ว!
            </Alert>
          )}
          
          <Alert severity="info">
            <Typography variant="body2">
              🔍 <strong>เทคนิค:</strong> ใช้ array notation <code>Post[]</code> ในฝั่ง parent และ foreign key ในฝั่ง child
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            Many-to-Many Relations
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            ความสัมพันธ์แบบหลายต่อหลาย ใช้ตารางกลาง (junction table) ในการเชื่อมโยง
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.manyToMany}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.manyToMany, 'manyToMany')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'manyToMany' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก Many-to-Many Schema แล้ว!
            </Alert>
          )}
          
          <Alert severity="warning">
            <Typography variant="body2">
              ⚡ <strong>เทคนิค:</strong> ใช้ composite primary key <code>@@id([userId, categoryId])</code> เพื่อป้องกันข้อมูลซ้ำ
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ mb: 2, pl: 2 }}>
            การใช้งาน Relations ใน Prisma Client
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, pl: 2 }}>
            ตัวอย่างการค้นหาข้อมูลพร้อม relations แบบ type-safe และมีประสิทธิภาพ
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <pre style={{ 
              fontSize: '0.875rem',
              flex: 1,
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {codeExamples.clientUsage}
            </pre>
            <Button
              size="small"
              onClick={() => handleCopyCode(codeExamples.clientUsage, 'clientUsage')}
              sx={{ color: 'white', minWidth: 'auto', ml: 1 }}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </Button>
          </Box>
          
          {copiedCode === 'clientUsage' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              คัดลอก Prisma Client Examples แล้ว!
            </Alert>
          )}
          
          <Alert severity="error">
            <Typography variant="body2">
              ⚠️ <strong>ระวัง:</strong> การใช้ <code>include</code> กับ relations ลึกเกินไปอาจทำให้ query ช้า ใช้ <code>select</code> แทนถ้าต้องการเฉพาะข้อมูลบางส่วน
            </Typography>
          </Alert>
        </TabPanel>

        {/* Best Practices */}
        <Typography variant="h4" sx={{ mb: 3 }}>💡 Best Practices สำหรับ Relations</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: 'success.main', mb: 2 }}>
                ✅ สิ่งที่ควรทำ
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  ใช้ชื่อ field ที่สื่อความหมาย เช่น authorId แทน userId
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  เพิ่ม @unique ใน foreign key สำหรับ one-to-one relations
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  ใช้ onDelete: Cascade สำหรับ dependent records
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  ออกแบบ indexes สำหรับ foreign keys ที่ค้นหาบ่อย
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: 'error.main', mb: 2 }}>
                ❌ สิ่งที่ไม่ควรทำ
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  สร้าง circular dependencies ระหว่าง models
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  ใช้ many-to-many เมื่อ one-to-many เพียงพอ
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  ลืมตั้งค่า referential actions อย่างเหมาะสม
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  ค้นหาข้อมูล relations ลึกเกินไปใน production
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Quick Reference */}
        <Typography variant="h4" sx={{ mb: 3 }}>📖 Quick Reference</Typography>
        
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: 'black' }}>Relation Type</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'black' }}>Schema Pattern</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'black' }}>Use Case</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'black' }}>Example</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>One-to-One</TableCell>
                    <TableCell>foreign key + @unique</TableCell>
                    <TableCell>ข้อมูลเสริมที่ไม่บังคับ</TableCell>
                    <TableCell>User ↔ Profile</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>One-to-Many</TableCell>
                    <TableCell>foreign key</TableCell>
                    <TableCell>ความเป็นเจ้าของ</TableCell>
                    <TableCell>User → Posts</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Many-to-Many</TableCell>
                    <TableCell>junction table</TableCell>
                    <TableCell>การจัดหมวดหมู่</TableCell>
                    <TableCell>Users ↔ Roles</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Self Relation</TableCell>
                    <TableCell>foreign key → same table</TableCell>
                    <TableCell>โครงสร้างลำดับชั้น</TableCell>
                    <TableCell>User → Manager</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/prisma-tutorial/lesson-3"
            variant="outlined"
          >
            บทที่ 3: Prisma Client API
          </Button>
          
          <Chip 
            label="4 / 12"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/prisma-tutorial/lesson-5"
            variant="contained"
            disabled
          >
            บทที่ 5: Migrations (เร็วๆ นี้)
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
