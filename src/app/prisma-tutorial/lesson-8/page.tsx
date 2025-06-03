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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  ArrowBack,
  Assignment,
  Timer,
  ContentCopy,
  Security,
  Psychology,
  Build,
  AccountCircle,
  Check,
  ExpandMore,
  Warning,
  Lightbulb,
  Shield,
  Key,
  Lock,
  VpnKey,
  Verified,
  Error as ErrorIcon,
  Info,
  Person,
  Group,
  AdminPanelSettings,
  Https,
  Fingerprint,
  VisibilityOff,
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
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `lesson-tab-${index}`,
    'aria-controls': `lesson-tabpanel-${index}`,
  };
}

export default function Lesson8() {
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          component={Link}
          href="/prisma-tutorial"
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          กลับไปหน้าหลัก
        </Button>
        
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <Security sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              บทที่ 8: Authentication และ Security
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              การจัดการ user authentication, authorization และ data security
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip icon={<Timer />} label="35 นาที" color="primary" />
          <Chip icon={<Assignment />} label="ปานกลาง" color="warning" />
          <Chip icon={<Security />} label="Security" color="error" />
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>สิ่งที่จะได้เรียนรู้:</strong> การสร้างระบบ Authentication, JWT, Hashing passwords, Role-based Access Control, Data validation และ Security best practices
          </Typography>
        </Alert>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab icon={<Psychology />} label="แนวคิด" {...a11yProps(0)} />
          <Tab icon={<AccountCircle />} label="User Model" {...a11yProps(1)} />
          <Tab icon={<VpnKey />} label="Authentication" {...a11yProps(2)} />
          <Tab icon={<AdminPanelSettings />} label="Authorization" {...a11yProps(3)} />
          <Tab icon={<Shield />} label="Security" {...a11yProps(4)} />
          <Tab icon={<Build />} label="Implementation" {...a11yProps(5)} />
        </Tabs>
      </Paper>

      {/* Tab 1: แนวคิด */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🔐 ทำความเข้าใจ Authentication และ Security
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <AccountCircle color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Authentication (การยืนยันตัวตน)</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                การพิสูจน์ว่าผู้ใช้เป็นใครจริงๆ ผ่านการให้ข้อมูลประจำตัว เช่น username/password
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="ใครคือผู้ใช้นี้?" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="ข้อมูลประจำตัวถูกต้องไหม?" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="สร้าง Session หรือ Token" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <AdminPanelSettings color="secondary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Authorization (การให้สิทธิ์)</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                การกำหนดว่าผู้ใช้สามารถทำอะไรได้บ้าง หลังจากยืนยันตัวตนแล้ว
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="ผู้ใช้มีสิทธิ์อะไรบ้าง?" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="เข้าถึงข้อมูลไหนได้?" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="ทำงานใดได้บ้าง?" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>💡 ความแตกต่าง</Typography>
          <Typography>
            <strong>Authentication:</strong> "คุณเป็นใคร?" | 
            <strong>Authorization:</strong> "คุณสามารถทำอะไรได้บ้าง?"
          </Typography>
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔒 Security Concepts ที่สำคัญ
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 1fr' }, gap: 2, mb: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Lock color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" gutterBottom>Password Hashing</Typography>
            <Typography variant="body2" color="text.secondary">
              เข้ารหัสรหัสผ่านด้วย bcrypt เพื่อความปลอดภัย
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <VpnKey color="secondary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" gutterBottom>JWT Tokens</Typography>
            <Typography variant="body2" color="text.secondary">
              JSON Web Token สำหรับจัดการ session แบบ stateless
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Shield color="success" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" gutterBottom>Role-based Access</Typography>
            <Typography variant="body2" color="text.secondary">
              กำหนดสิทธิ์ตาม role เช่น admin, user, moderator
            </Typography>
          </Paper>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🏗️ Authentication Flow ทั่วไป
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper orientation="vertical" activeStep={-1}>
            <Step>
              <StepLabel>
                <Typography variant="h6">1. User Registration</Typography>
              </StepLabel>
              <StepContent>
                <Typography>ผู้ใช้สร้างบัญชีใหม่ → Hash password → บันทึกลง database</Typography>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="h6">2. User Login</Typography>
              </StepLabel>
              <StepContent>
                <Typography>ผู้ใช้ส่ง email/password → ตรวจสอบกับ database → สร้าง JWT token</Typography>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="h6">3. Protected Routes</Typography>
              </StepLabel>
              <StepContent>
                <Typography>ตรวจสอบ JWT token → ดึงข้อมูล user → ตรวจสอบสิทธิ์ → อนุญาตหรือปฏิเสธ</Typography>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="h6">4. Token Refresh</Typography>
              </StepLabel>
              <StepContent>
                <Typography>Token หมดอายุ → Refresh token → สร้าง token ใหม่</Typography>
              </StepContent>
            </Step>
          </Stepper>
        </Paper>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>⚠️ สิ่งที่ต้องระวัง</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="ห้ามเก็บ password แบบ plain text" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="JWT secret key ต้องเก็บเป็นความลับ" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="ใช้ HTTPS ใน production เสมอ" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="กำหนด token expiration time" />
            </ListItem>
          </List>
        </Alert>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            📚 ในบทเรียนนี้เราจะเรียนรู้:
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="สร้าง User model ด้วย Prisma" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Hash passwords ด้วย bcrypt" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="สร้างและตรวจสอบ JWT tokens" />
              </ListItem>
            </List>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Middleware สำหรับ authentication" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Role-based authorization" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Security best practices" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </TabPanel>

      {/* Tab 2: User Model */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          👤 สร้าง User Model สำหรับ Authentication
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          เราจะสร้าง User model ที่มีฟิลด์ที่จำเป็นสำหรับระบบ authentication และ authorization
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📝 Schema.prisma - User Model
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">prisma/schema.prisma</Typography>
            <IconButton onClick={() => copyToClipboard(`// User model สำหรับ Authentication
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String?  @unique
  password  String
  firstName String?
  lastName  String?
  avatar    String?
  role      Role     @default(USER)
  isActive  Boolean  @default(true)
  emailVerified Boolean @default(false)
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  lastLogin DateTime?
  
  // Relations
  posts     Post[]
  comments  Comment[]
  sessions  Session[]
  
  @@map("users")
}

// Enum สำหรับ User Roles
enum Role {
  USER
  MODERATOR  
  ADMIN
  SUPER_ADMIN
}

// Model สำหรับจัดการ Sessions
model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  
  // Relations
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("sessions")
}`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`// User model สำหรับ Authentication
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String?  @unique
  password  String
  firstName String?
  lastName  String?
  avatar    String?
  role      Role     @default(USER)
  isActive  Boolean  @default(true)
  emailVerified Boolean @default(false)
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  lastLogin DateTime?
  
  // Relations
  posts     Post[]
  comments  Comment[]
  sessions  Session[]
  
  @@map("users")
}

// Enum สำหรับ User Roles
enum Role {
  USER
  MODERATOR  
  ADMIN
  SUPER_ADMIN
}

// Model สำหรับจัดการ Sessions
model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  
  // Relations
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("sessions")
}`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom fontWeight="bold">
          🔍 อธิบาย Fields สำคัญ
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                🔐 Authentication Fields
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Key color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="email" 
                    secondary="อีเมลที่ unique สำหรับ login" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Person color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="username" 
                    secondary="ชื่อผู้ใช้ (optional)" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Lock color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="password" 
                    secondary="รหัสผ่านที่ hash แล้ว" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Verified color="primary" /></ListItemIcon>
                  <ListItemText 
                    primary="emailVerified" 
                    secondary="สถานะการยืนยันอีเมล" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="secondary">
                👥 Authorization Fields
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><AdminPanelSettings color="secondary" /></ListItemIcon>
                  <ListItemText 
                    primary="role" 
                    secondary="สิทธิ์ของผู้ใช้ (USER, ADMIN, etc.)" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="secondary" /></ListItemIcon>
                  <ListItemText 
                    primary="isActive" 
                    secondary="สถานะการใช้งานของบัญชี" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Timer color="secondary" /></ListItemIcon>
                  <ListItemText 
                    primary="lastLogin" 
                    secondary="เวลา login ครั้งล่าสุด" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Build color="secondary" /></ListItemIcon>
                  <ListItemText 
                    primary="sessions" 
                    secondary="จัดการ login sessions" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🏷️ Role-based Access Control
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>สิทธิ์</strong></TableCell>
                <TableCell><strong>คำอธิบาย</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Chip label="USER" color="default" size="small" />
                </TableCell>
                <TableCell>อ่าน, เขียนเนื้อหาของตัวเอง</TableCell>
                <TableCell>ผู้ใช้ทั่วไป สามารถสร้างและแก้ไขโพสต์ของตัวเองได้</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Chip label="MODERATOR" color="info" size="small" />
                </TableCell>
                <TableCell>จัดการเนื้อหา, ลบคอมเมนต์</TableCell>
                <TableCell>ผู้ดูแลเนื้อหา สามารถลบโพสต์และคอมเมนต์ที่ไม่เหมาะสมได้</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Chip label="ADMIN" color="warning" size="small" />
                </TableCell>
                <TableCell>จัดการผู้ใช้, สถิติ</TableCell>
                <TableCell>ผู้ดูแลระบบ สามารถจัดการผู้ใช้และดูสถิติการใช้งานได้</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Chip label="SUPER_ADMIN" color="error" size="small" />
                </TableCell>
                <TableCell>ทุกสิทธิ์, จัดการระบบ</TableCell>
                <TableCell>ผู้ดูแลสูงสุด สามารถเข้าถึงทุกฟังก์ชันในระบบได้</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔧 สร้าง Migration
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Terminal Commands</Typography>
            <IconButton onClick={() => copyToClipboard(`# สร้าง migration สำหรับ User model
npx prisma migrate dev --name add-user-authentication

# Generate Prisma Client
npx prisma generate

# (Optional) สร้างข้อมูลทดสอบ
npx prisma db seed`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`# สร้าง migration สำหรับ User model
npx prisma migrate dev --name add-user-authentication

# Generate Prisma Client
npx prisma generate

# (Optional) สร้างข้อมูลทดสอบ
npx prisma db seed`}
          </Box>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>✅ ผลลัพธ์ที่ได้</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="User table ถูกสร้างใน database" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Role enum ถูกกำหนด" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Session table สำหรับจัดการ login" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Prisma Client ถูก generate ใหม่" />
            </ListItem>
          </List>
        </Alert>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'warning.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="warning.main">
            💡 เคล็ดลับ
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
              <ListItemText primary="ใช้ @unique สำหรับ email และ username เพื่อป้องกันข้อมูลซ้ำ" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
              <ListItemText primary="กำหนด default values สำหรับ role และ isActive" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
              <ListItemText primary="ใช้ onDelete: Cascade สำหรับ sessions เพื่อทำความสะอาดอัตโนมัติ" />
            </ListItem>
          </List>
        </Box>
      </TabPanel>

      {/* Tab 3: Authentication */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🔑 การสร้างระบบ Authentication
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          เราจะสร้างระบบ authentication ที่สมบูรณ์ รวมถึง registration, login, password hashing และ JWT tokens
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📦 ติดตั้ง Dependencies
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Package Installation</Typography>
            <IconButton onClick={() => copyToClipboard(`npm install bcryptjs jsonwebtoken
npm install @types/bcryptjs @types/jsonwebtoken --save-dev`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`npm install bcryptjs jsonwebtoken
npm install @types/bcryptjs @types/jsonwebtoken --save-dev`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔧 Auth Utilities
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">lib/auth.ts</Typography>
            <IconButton onClick={() => copyToClipboard(`import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Compare password
export async function comparePassword(
  password: string, 
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(userId: string): string {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// Verify JWT token
export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Get user from token
export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      isActive: true,
    }
  });

  return user;
}`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Compare password
export async function comparePassword(
  password: string, 
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(userId: string): string {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// Verify JWT token
export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Get user from token
export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      isActive: true,
    }
  });

  return user;
}`}
          </Box>
        </Paper>
      </TabPanel>

      {/* Tab 4: Authorization */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🛡️ Authorization และ Role-based Access Control
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          หลังจาก authenticate ผู้ใช้แล้ว เราต้องตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงข้อมูลหรือทำงานนั้นๆ หรือไม่
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔒 Middleware สำหรับ Authentication
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">middleware/auth.ts</Typography>
            <IconButton onClick={() => copyToClipboard(`import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';

export async function authenticateUser(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json(
      { error: 'Access token is required' },
      { status: 401 }
    );
  }

  const user = await getUserFromToken(token);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  if (!user.isActive) {
    return NextResponse.json(
      { error: 'Account is deactivated' },
      { status: 403 }
    );
  }

  return user;
}

// Role-based authorization
export function authorizeRoles(requiredRoles: string[]) {
  return function(user: any) {
    if (!requiredRoles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }
    return true;
  };
}

// Check if user owns resource
export function authorizeOwnership(userId: string, resourceUserId: string) {
  if (userId !== resourceUserId) {
    return NextResponse.json(
      { error: 'You can only access your own resources' },
      { status: 403 }
    );
  }
  return true;
}`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';

export async function authenticateUser(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json(
      { error: 'Access token is required' },
      { status: 401 }
    );
  }

  const user = await getUserFromToken(token);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  if (!user.isActive) {
    return NextResponse.json(
      { error: 'Account is deactivated' },
      { status: 403 }
    );
  }

  return user;
}

// Role-based authorization
export function authorizeRoles(requiredRoles: string[]) {
  return function(user: any) {
    if (!requiredRoles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }
    return true;
  };
}

// Check if user owns resource
export function authorizeOwnership(userId: string, resourceUserId: string) {
  if (userId !== resourceUserId) {
    return NextResponse.json(
      { error: 'You can only access your own resources' },
      { status: 403 }
    );
  }
  return true;
}`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🎯 Permission Matrix
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell><strong>Action</strong></TableCell>
                <TableCell><strong>USER</strong></TableCell>
                <TableCell><strong>MODERATOR</strong></TableCell>
                <TableCell><strong>ADMIN</strong></TableCell>
                <TableCell><strong>SUPER_ADMIN</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Read own profile</TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Edit own profile</TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>View all users</TableCell>
                <TableCell><ErrorIcon color="error" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Delete user posts</TableCell>
                <TableCell><ErrorIcon color="error" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ban/Unban users</TableCell>
                <TableCell><ErrorIcon color="error" /></TableCell>
                <TableCell><ErrorIcon color="error" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>System settings</TableCell>
                <TableCell><ErrorIcon color="error" /></TableCell>
                <TableCell><ErrorIcon color="error" /></TableCell>
                <TableCell><ErrorIcon color="error" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>⚠️ Security Tips</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="ตรวจสอบ authentication ก่อน authorization เสมอ" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="ใช้ Principle of Least Privilege (ให้สิทธิ์น้อยที่สุดที่จำเป็น)" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="ไม่ส่ง sensitive data เช่น password ใน response" />
            </ListItem>
          </List>
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔐 Protected API Routes
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">app/api/users/[id]/route.ts</Typography>
            <IconButton onClick={() => copyToClipboard(`import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, authorizeRoles, authorizeOwnership } from '@/middleware/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Authenticate user
  const user = await authenticateUser(request);
  if (user instanceof NextResponse) return user;

  const { id } = params;

  // Check if user owns this resource or is admin
  if (user.id !== id && user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }

  try {
    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        // ไม่ส่ง password!
      }
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(targetUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Admin only - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Authenticate user
  const user = await authenticateUser(request);
  if (user instanceof NextResponse) return user;

  // Check admin role
  const roleCheck = authorizeRoles(['ADMIN', 'SUPER_ADMIN'])(user);
  if (roleCheck instanceof NextResponse) return roleCheck;

  try {
    await prisma.user.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, authorizeRoles, authorizeOwnership } from '@/middleware/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Authenticate user
  const user = await authenticateUser(request);
  if (user instanceof NextResponse) return user;

  const { id } = params;

  // Check if user owns this resource or is admin
  if (user.id !== id && user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }

  try {
    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        // ไม่ส่ง password!
      }
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(targetUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Admin only - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Authenticate user
  const user = await authenticateUser(request);
  if (user instanceof NextResponse) return user;

  // Check admin role
  const roleCheck = authorizeRoles(['ADMIN', 'SUPER_ADMIN'])(user);
  if (roleCheck instanceof NextResponse) return roleCheck;

  try {
    await prisma.user.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}`}
          </Box>
        </Paper>
      </TabPanel>

      {/* Tab 5: Security Best Practices */}
      <TabPanel value={tabValue} index={4}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🔒 Security Best Practices
        </Typography>

        <Alert severity="warning" sx={{ mb: 4 }}>
          Security เป็นเรื่องที่ต้องคำนึงถึงตั้งแต่ออกแบบระบบ ไม่ใช่เพิ่มเติมทีหลัง
        </Alert>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Lock color="error" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Password Security</Typography>
              </Stack>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ bcrypt ด้วย salt rounds อย่างน้อย 12" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="กำหนด password requirements" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ไม่เก็บ password เป็น plain text" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ password reset token ที่มีอายุ" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <VpnKey color="warning" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Token Security</Typography>
              </Stack>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ strong JWT secret key" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="กำหนด token expiration time" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ refresh tokens" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ตรวจสอบ token signature" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🛡️ Environment Variables
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">.env</Typography>
            <IconButton onClick={() => copyToClipboard(`# Database
DATABASE_URL="mysql://user:password@localhost:3306/myapp"

# JWT Secret (ควรเป็น random string ที่ยาวและซับซ้อน)
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"

# Environment
NODE_ENV="production"

# Email service (สำหรับ password reset)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Rate limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000  # 15 minutes`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`# Database
DATABASE_URL="mysql://user:password@localhost:3306/myapp"

# JWT Secret (ควรเป็น random string ที่ยาวและซับซ้อน)
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"

# Environment
NODE_ENV="production"

# Email service (สำหรับ password reset)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Rate limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000  # 15 minutes`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🚨 Common Security Vulnerabilities
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">SQL Injection</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Prisma ป้องกัน SQL injection โดยอัตโนมัติผ่าน parameterized queries
              </Typography>
              <Alert severity="success">
                <Typography variant="body2">
                  ✅ Prisma: <code>prisma.user.findMany({`{ where: { email: userInput } }`})</code>
                </Typography>
              </Alert>
              <Alert severity="error" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  ❌ Raw SQL: <code>SELECT * FROM users WHERE email = '{'${userInput}'}'</code>
                </Typography>
              </Alert>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">JWT Token Leakage</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                ป้องกันการรั่วไหลของ JWT tokens:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Shield color="primary" /></ListItemIcon>
                  <ListItemText primary="เก็บ tokens ใน httpOnly cookies" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Shield color="primary" /></ListItemIcon>
                  <ListItemText primary="ใช้ HTTPS ใน production" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Shield color="primary" /></ListItemIcon>
                  <ListItemText primary="กำหนด SameSite cookie attribute" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Brute Force Attacks</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                ป้องกันการโจมตีแบบ brute force:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Shield color="primary" /></ListItemIcon>
                  <ListItemText primary="ใช้ rate limiting" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Shield color="primary" /></ListItemIcon>
                  <ListItemText primary="Account lockout หลัง login ผิดหลายครั้ง" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Shield color="primary" /></ListItemIcon>
                  <ListItemText primary="CAPTCHA สำหรับ suspicious activities" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </TabPanel>

      {/* Tab 6: Implementation */}
      <TabPanel value={tabValue} index={5}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🚀 Complete Implementation
        </Typography>

        <Alert severity="success" sx={{ mb: 4 }}>
          มาดูตัวอย่างการ implement ระบบ authentication ที่สมบูรณ์กันครับ
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📝 Registration API
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">app/api/auth/register/route.ts</Typography>
            <IconButton onClick={() => copyToClipboard(`import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      }
    });

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user 
      },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      }
    });

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user 
      },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔑 Login API
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">app/api/auth/login/route.ts</Typography>
            <IconButton onClick={() => copyToClipboard(`import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Return user data and token
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Return user data and token
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`}
          </Box>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>🎉 ขอแสดงความยินดี!</Typography>
          <Typography>
            คุณได้เรียนรู้การสร้างระบบ Authentication และ Security แบบสมบูรณ์แล้ว 
            ตอนนี้คุณสามารถสร้างระบบรักษาความปลอดภัยสำหรับแอปพลิเคชันของคุณได้แล้ว!
          </Typography>
        </Alert>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            📚 สิ่งที่คุณได้เรียนรู้:
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="การสร้าง User model และ Role system" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Password hashing ด้วย bcrypt" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="JWT token generation และ verification" />
              </ListItem>
            </List>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Middleware สำหรับ authentication" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Role-based authorization" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Security best practices" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </TabPanel>
    </Container>
  );
}
