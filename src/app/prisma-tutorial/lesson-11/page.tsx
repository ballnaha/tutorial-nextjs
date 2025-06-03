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
  Storage,
  DataObject,
  Build,
  Speed,
  Check,
  ExpandMore,
  Warning,
  Lightbulb,
  Terminal,
  BugReport,
  TrendingUp,
  Memory,
  Psychology,
  Tune,
  Security,
  Error as ErrorIcon,
  Info,
  AutoFixHigh,
  QueryStats,
  Search,
  FilterList,
  Analytics,
  Dashboard,
  Science,
  PlayArrow,
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

export default function Lesson11() {
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
            <Science sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              บทที่ 11: Testing กับ Prisma
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              การเขียน unit tests และ integration tests สำหรับ Prisma
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip icon={<Timer />} label="40 นาที" color="primary" />
          <Chip icon={<Assignment />} label="ขั้นสูง" color="error" />
          <Chip icon={<Science />} label="Testing" color="secondary" />
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>สิ่งที่จะได้เรียนรู้:</strong> Test Database Setup, Mocking Prisma, Integration Testing, Database Fixtures และ Test Isolation
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
          <Tab icon={<Build />} label="Test Setup" {...a11yProps(1)} />
          <Tab icon={<BugReport />} label="Unit Testing" {...a11yProps(2)} />
          <Tab icon={<Analytics />} label="Integration Testing" {...a11yProps(3)} />
          <Tab icon={<DataObject />} label="Test Data" {...a11yProps(4)} />
          <Tab icon={<CheckCircle />} label="Best Practices" {...a11yProps(5)} />
        </Tabs>
      </Paper>

      {/* Tab 1: แนวคิด */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🧪 ทำความเข้าใจ Testing กับ Prisma
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          การทดสอบ application ที่ใช้ Prisma มีความซับซ้อนเพราะต้องจัดการกับ database operations
        </Alert>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <BugReport color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Unit Testing</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                การทดสอบส่วนย่อยของโค้ดแบบแยกจากฐานข้อมูล
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Mock Prisma Client" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Test business logic" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Fast execution" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Analytics color="secondary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Integration Testing</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                การทดสอบการทำงานร่วมกันกับฐานข้อมูลจริง
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Real database operations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="End-to-end workflows" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Database constraints testing" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🤔 ประเภทของการทดสอบ
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell><strong>ประเภท</strong></TableCell>
                <TableCell><strong>วิธีการ</strong></TableCell>
                <TableCell><strong>ข้อดี</strong></TableCell>
                <TableCell><strong>ข้อเสีย</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Unit Tests</TableCell>
                <TableCell>Mock Prisma Client</TableCell>
                <TableCell>เร็ว, แยกส่วน</TableCell>
                <TableCell>ไม่ทดสอบ DB จริง</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Integration Tests</TableCell>
                <TableCell>Test Database</TableCell>
                <TableCell>ทดสอบ workflow จริง</TableCell>
                <TableCell>ช้า, ซับซ้อน</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E2E Tests</TableCell>
                <TableCell>Full Application</TableCell>
                <TableCell>ทดสอบครบ user journey</TableCell>
                <TableCell>ช้าที่สุด, ยากแก้ไข</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>⚠️ ข้อท้าทายในการทดสอบ Prisma</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="Database state management" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="Test data isolation" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="Migration testing" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="Performance testing" />
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
                <ListItemText primary="การติดตั้ง testing framework" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Mock Prisma Client สำหรับ unit tests" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="การตั้งค่า test database" />
              </ListItem>
            </List>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Integration testing strategies" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Test data management" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Testing best practices" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </TabPanel>

      {/* Tab 2: Test Setup */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🔧 การตั้งค่า Testing Environment
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          การตั้งค่า testing environment ที่ดีจะช่วยให้การทดสอบมีประสิทธิภาพและน่าเชื่อถือ
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📦 การติดตั้ง Dependencies
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Install Testing Packages</Typography>
            <IconButton onClick={() => copyToClipboard(`# Core testing packages
npm install --save-dev jest @types/jest ts-jest

# Prisma testing utilities
npm install --save-dev jest-mock-extended

# For integration tests
npm install --save-dev @testcontainers/postgresql
# หรือ sqlite สำหรับ testing ที่เร็วกว่า
npm install --save-dev sqlite3

# Additional testing utilities
npm install --save-dev supertest @types/supertest
npm install --save-dev faker @faker-js/faker`)}>
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
{`# Core testing packages
npm install --save-dev jest @types/jest ts-jest

# Prisma testing utilities
npm install --save-dev jest-mock-extended

# For integration tests
npm install --save-dev @testcontainers/postgresql
# หรือ sqlite สำหรับ testing ที่เร็วกว่า
npm install --save-dev sqlite3

# Additional testing utilities
npm install --save-dev supertest @types/supertest
npm install --save-dev faker @faker-js/faker`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          ⚙️ Jest Configuration
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">jest.config.js</Typography>
            <IconButton onClick={() => copyToClipboard(`/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testTimeout: 60000, // 60 seconds for integration tests
  // Separate test environments
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
      testEnvironment: 'node'
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
      testEnvironment: 'node'
    }
  ]
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
{`/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testTimeout: 60000, // 60 seconds for integration tests
  // Separate test environments
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
      testEnvironment: 'node'
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
      testEnvironment: 'node'
    }
  ]
}`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🗂️ โครงสร้างไฟล์ Testing
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Project Structure</Typography>
            <IconButton onClick={() => copyToClipboard(`project/
├── src/
│   ├── services/
│   │   ├── userService.ts
│   │   └── postService.ts
│   └── utils/
│       └── prisma.ts
├── tests/
│   ├── setup.ts              # Test setup และ global config
│   ├── helpers/              # Test utilities
│   │   ├── testDb.ts        # Database helpers
│   │   └── fixtures.ts      # Test data generators
│   ├── unit/                # Unit tests
│   │   ├── services/
│   │   │   ├── userService.test.ts
│   │   │   └── postService.test.ts
│   │   └── utils/
│   └── integration/         # Integration tests
│       ├── api/
│       │   ├── users.test.ts
│       │   └── posts.test.ts
│       └── database/
│           └── migrations.test.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── jest.config.js
└── package.json`)}>
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
{`project/
├── src/
│   ├── services/
│   │   ├── userService.ts
│   │   └── postService.ts
│   └── utils/
│       └── prisma.ts
├── tests/
│   ├── setup.ts              # Test setup และ global config
│   ├── helpers/              # Test utilities
│   │   ├── testDb.ts        # Database helpers
│   │   └── fixtures.ts      # Test data generators
│   ├── unit/                # Unit tests
│   │   ├── services/
│   │   │   ├── userService.test.ts
│   │   │   └── postService.test.ts
│   │   └── utils/
│   └── integration/         # Integration tests
│       ├── api/
│       │   ├── users.test.ts
│   │   └── posts.test.ts
│   └── database/
│       └── migrations.test.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── jest.config.js
└── package.json`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔧 Test Database Configuration
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                SQLite (เร็ว)
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                เหมาะสำหรับ unit tests และ CI/CD
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="เร็วมาก" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="ไม่ต้องติดตั้งเพิ่ม" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="Feature set จำกัด" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="secondary">
                PostgreSQL/MySQL (สมจริง)
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                เหมาะสำหรับ integration tests
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Feature set เต็ม" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="ใกล้เคียง production" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="ช้ากว่า" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>🎯 Setup Best Practices</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="แยก test database จาก development database" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ environment variables สำหรับ database URLs" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Setup automated test database cleanup" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Configure CI/CD สำหรับ automated testing" />
            </ListItem>
          </List>
        </Alert>
      </TabPanel>

      {/* Tab 3: Unit Testing */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🧪 Unit Testing กับ Mock Prisma
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          Unit testing ช่วยให้เราทดสอบ business logic โดยไม่ต้องพึ่งพาฐานข้อมูลจริง
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🎭 การ Mock Prisma Client
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Mock Setup</Typography>
            <IconButton onClick={() => copyToClipboard(`// tests/helpers/mockPrisma.ts
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

export type MockPrisma = DeepMockProxy<PrismaClient>

const mockPrisma = mockDeep<PrismaClient>()

// Reset mock before each test
beforeEach(() => {
  mockReset(mockPrisma)
})

export { mockPrisma }

// tests/setup.ts
import { mockPrisma } from './helpers/mockPrisma'

// Mock Prisma module
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}))`)} size="small">
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
{`// tests/helpers/mockPrisma.ts
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

export type MockPrisma = DeepMockProxy<PrismaClient>

const mockPrisma = mockDeep<PrismaClient>()

// Reset mock before each test
beforeEach(() => {
  mockReset(mockPrisma)
})

export { mockPrisma }

// tests/setup.ts
import { mockPrisma } from './helpers/mockPrisma'

// Mock Prisma module
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}))`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📝 Service Layer Testing
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">User Service Example</Typography>
            <IconButton onClick={() => copyToClipboard(`// src/services/userService.ts
import { PrismaClient } from '@prisma/client'

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: { email: string; name?: string }) {
    // Validate email format
    if (!this.isValidEmail(data.email)) {
      throw new Error('Invalid email format')
    }

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      throw new Error('User already exists')
    }

    // Create new user
    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name || null,
      }
    })
  }

  async getUserWithPosts(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          where: { published: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return {
      ...user,
      postCount: user.posts.length
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
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
{`// src/services/userService.ts
import { PrismaClient } from '@prisma/client'

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: { email: string; name?: string }) {
    // Validate email format
    if (!this.isValidEmail(data.email)) {
      throw new Error('Invalid email format')
    }

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      throw new Error('User already exists')
    }

    // Create new user
    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name || null,
      }
    })
  }

  async getUserWithPosts(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          where: { published: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return {
      ...user,
      postCount: user.posts.length
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🧪 Unit Test Examples
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">tests/unit/services/userService.test.ts</Typography>
            <IconButton onClick={() => copyToClipboard(`import { UserService } from '../../../src/services/userService'
import { mockPrisma } from '../../helpers/mockPrisma'

describe('UserService', () => {
  let userService: UserService

  beforeEach(() => {
    userService = new UserService(mockPrisma)
  })

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      // Arrange
      const userData = { email: 'test@example.com', name: 'Test User' }
      const expectedUser = { id: 1, ...userData, createdAt: new Date() }

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockPrisma.user.create.mockResolvedValue(expectedUser)

      // Act
      const result = await userService.createUser(userData)

      // Assert
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: userData.email }
      })
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: { email: userData.email, name: userData.name }
      })
      expect(result).toEqual(expectedUser)
    })

    it('should throw error for invalid email', async () => {
      // Arrange
      const invalidData = { email: 'invalid-email', name: 'Test' }

      // Act & Assert
      await expect(userService.createUser(invalidData))
        .rejects.toThrow('Invalid email format')
      
      // Verify no database calls were made
      expect(mockPrisma.user.findUnique).not.toHaveBeenCalled()
      expect(mockPrisma.user.create).not.toHaveBeenCalled()
    })

    it('should throw error for existing user', async () => {
      // Arrange
      const userData = { email: 'existing@example.com' }
      const existingUser = { id: 1, email: userData.email, name: 'Existing' }

      mockPrisma.user.findUnique.mockResolvedValue(existingUser)

      // Act & Assert
      await expect(userService.createUser(userData))
        .rejects.toThrow('User already exists')
      
      expect(mockPrisma.user.create).not.toHaveBeenCalled()
    })
  })

  describe('getUserWithPosts', () => {
    it('should return user with posts and post count', async () => {
      // Arrange
      const userId = 1
      const mockUser = {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        posts: [
          { id: 1, title: 'Post 1', published: true, createdAt: new Date() },
          { id: 2, title: 'Post 2', published: true, createdAt: new Date() }
        ]
      }

      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      // Act
      const result = await userService.getUserWithPosts(userId)

      // Assert
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: {
          posts: {
            where: { published: true },
            orderBy: { createdAt: 'desc' }
          }
        }
      })
      expect(result).toEqual({
        ...mockUser,
        postCount: 2
      })
    })

    it('should throw error for non-existent user', async () => {
      // Arrange
      const userId = 999
      mockPrisma.user.findUnique.mockResolvedValue(null)

      // Act & Assert
      await expect(userService.getUserWithPosts(userId))
        .rejects.toThrow('User not found')
    })
  })
})`)} size="small">
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
{`import { UserService } from '../../../src/services/userService'
import { mockPrisma } from '../../helpers/mockPrisma'

describe('UserService', () => {
  let userService: UserService

  beforeEach(() => {
    userService = new UserService(mockPrisma)
  })

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      // Arrange
      const userData = { email: 'test@example.com', name: 'Test User' }
      const expectedUser = { id: 1, ...userData, createdAt: new Date() }

      mockPrisma.user.findUnique.mockResolvedValue(null)
      mockPrisma.user.create.mockResolvedValue(expectedUser)

      // Act
      const result = await userService.createUser(userData)

      // Assert
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: userData.email }
      })
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: { email: userData.email, name: userData.name }
      })
      expect(result).toEqual(expectedUser)
    })

    it('should throw error for invalid email', async () => {
      // Arrange
      const invalidData = { email: 'invalid-email', name: 'Test' }

      // Act & Assert
      await expect(userService.createUser(invalidData))
        .rejects.toThrow('Invalid email format')
      
      // Verify no database calls were made
      expect(mockPrisma.user.findUnique).not.toHaveBeenCalled()
      expect(mockPrisma.user.create).not.toHaveBeenCalled()
    })

    it('should throw error for existing user', async () => {
      // Arrange
      const userData = { email: 'existing@example.com' }
      const existingUser = { id: 1, email: userData.email, name: 'Existing' }

      mockPrisma.user.findUnique.mockResolvedValue(existingUser)

      // Act & Assert
      await expect(userService.createUser(userData))
        .rejects.toThrow('User already exists')
      
      expect(mockPrisma.user.create).not.toHaveBeenCalled()
    })
  })

  describe('getUserWithPosts', () => {
    it('should return user with posts and post count', async () => {
      // Arrange
      const userId = 1
      const mockUser = {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        posts: [
          { id: 1, title: 'Post 1', published: true, createdAt: new Date() },
          { id: 2, title: 'Post 2', published: true, createdAt: new Date() }
        ]
      }

      mockPrisma.user.findUnique.mockResolvedValue(mockUser)

      // Act
      const result = await userService.getUserWithPosts(userId)

      // Assert
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: {
          posts: {
            where: { published: true },
            orderBy: { createdAt: 'desc' }
          }
        }
      })
      expect(result).toEqual({
        ...mockUser,
        postCount: 2
      })
    })

    it('should throw error for non-existent user', async () => {
      // Arrange
      const userId = 999
      mockPrisma.user.findUnique.mockResolvedValue(null)

      // Act & Assert
      await expect(userService.getUserWithPosts(userId))
        .rejects.toThrow('User not found')
    })
  })
})`}
          </Box>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>✅ Unit Testing Benefits</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Fast execution - ไม่ต้องรอ database" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Isolated testing - ทดสอบเฉพาะ business logic" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Predictable results - ไม่ขึ้นกับ external dependencies" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Easy to debug - เห็นปัญหาได้ชัดเจน" />
            </ListItem>
          </List>
        </Alert>
      </TabPanel>

      {/* Tab 4: Integration Testing */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🔗 Integration Testing กับ Real Database
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          Integration testing ทดสอบการทำงานร่วมกันของ components กับฐานข้อมูลจริง
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🗄️ Test Database Setup
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Database Helper</Typography>
            <IconButton onClick={() => copyToClipboard(`// tests/helpers/testDb.ts
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

class TestDatabase {
  private static instance: TestDatabase
  public prisma: PrismaClient

  private constructor() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.TEST_DATABASE_URL || 'file:./test.db'
        }
      }
    })
  }

  static getInstance(): TestDatabase {
    if (!TestDatabase.instance) {
      TestDatabase.instance = new TestDatabase()
    }
    return TestDatabase.instance
  }

  async setup() {
    // Apply migrations
    execSync('npx prisma migrate deploy', {
      env: { ...process.env, DATABASE_URL: process.env.TEST_DATABASE_URL }
    })
    
    // Connect to database
    await this.prisma.$connect()
  }

  async cleanup() {
    // Clean all tables
    const tablenames = await this.prisma.$queryRaw\`
      SELECT name FROM sqlite_master WHERE type='table'
    \` as Array<{ name: string }>

    for (const { name } of tablenames) {
      if (name !== '_prisma_migrations') {
        await this.prisma.$executeRawUnsafe(\`DELETE FROM \${name}\`)
      }
    }
  }

  async teardown() {
    await this.prisma.$disconnect()
  }
}

export default TestDatabase`)}>
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
{`// tests/helpers/testDb.ts
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

class TestDatabase {
  private static instance: TestDatabase
  public prisma: PrismaClient

  private constructor() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.TEST_DATABASE_URL || 'file:./test.db'
        }
      }
    })
  }

  static getInstance(): TestDatabase {
    if (!TestDatabase.instance) {
      TestDatabase.instance = new TestDatabase()
    }
    return TestDatabase.instance
  }

  async setup() {
    // Apply migrations
    execSync('npx prisma migrate deploy', {
      env: { ...process.env, DATABASE_URL: process.env.TEST_DATABASE_URL }
    })
    
    // Connect to database
    await this.prisma.$connect()
  }

  async cleanup() {
    // Clean all tables
    const tablenames = await this.prisma.$queryRaw\`
      SELECT name FROM sqlite_master WHERE type='table'
    \` as Array<{ name: string }>

    for (const { name } of tablenames) {
      if (name !== '_prisma_migrations') {
        await this.prisma.$executeRawUnsafe(\`DELETE FROM \${name}\`)
      }
    }
  }

  async teardown() {
    await this.prisma.$disconnect()
  }
}

export default TestDatabase`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🧪 Integration Test Example
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">tests/integration/database/userOperations.test.ts</Typography>
            <IconButton onClick={() => copyToClipboard(`import TestDatabase from '../../helpers/testDb'
import { UserService } from '../../../src/services/userService'

describe('User Operations Integration Tests', () => {
  let testDb: TestDatabase
  let userService: UserService

  beforeAll(async () => {
    testDb = TestDatabase.getInstance()
    await testDb.setup()
    userService = new UserService(testDb.prisma)
  })

  afterAll(async () => {
    await testDb.teardown()
  })

  beforeEach(async () => {
    await testDb.cleanup()
  })

  describe('User CRUD Operations', () => {
    it('should create, read, update, and delete user', async () => {
      // Create
      const userData = {
        email: 'integration@test.com',
        name: 'Integration Test User'
      }
      
      const createdUser = await userService.createUser(userData)
      expect(createdUser).toMatchObject(userData)
      expect(createdUser.id).toBeDefined()

      // Read
      const foundUser = await testDb.prisma.user.findUnique({
        where: { id: createdUser.id }
      })
      expect(foundUser).toMatchObject(userData)

      // Update
      const updatedUser = await testDb.prisma.user.update({
        where: { id: createdUser.id },
        data: { name: 'Updated Name' }
      })
      expect(updatedUser.name).toBe('Updated Name')

      // Delete
      await testDb.prisma.user.delete({
        where: { id: createdUser.id }
      })

      const deletedUser = await testDb.prisma.user.findUnique({
        where: { id: createdUser.id }
      })
      expect(deletedUser).toBeNull()
    })

    it('should handle user with posts relationship', async () => {
      // Create user
      const user = await testDb.prisma.user.create({
        data: {
          email: 'author@test.com',
          name: 'Test Author'
        }
      })

      // Create posts
      await testDb.prisma.post.createMany({
        data: [
          {
            title: 'Test Post 1',
            content: 'Content 1',
            published: true,
            authorId: user.id
          },
          {
            title: 'Test Post 2', 
            content: 'Content 2',
            published: false,
            authorId: user.id
          }
        ]
      })

      // Test getUserWithPosts
      const userWithPosts = await userService.getUserWithPosts(user.id)
      
      expect(userWithPosts.posts).toHaveLength(1) // Only published posts
      expect(userWithPosts.postCount).toBe(1)
      expect(userWithPosts.posts[0].title).toBe('Test Post 1')
    })
  })

  describe('Data Constraints', () => {
    it('should enforce unique email constraint', async () => {
      // Create first user
      await testDb.prisma.user.create({
        data: {
          email: 'unique@test.com',
          name: 'First User'
        }
      })

      // Try to create second user with same email
      await expect(
        testDb.prisma.user.create({
          data: {
            email: 'unique@test.com',
            name: 'Second User'
          }
        })
      ).rejects.toThrow()
    })

    it('should handle foreign key constraints', async () => {
      // Try to create post without valid author
      await expect(
        testDb.prisma.post.create({
          data: {
            title: 'Orphan Post',
            content: 'This should fail',
            authorId: 9999 // Non-existent user
          }
        })
      ).rejects.toThrow()
    })
  })
})`)}>
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
{`import TestDatabase from '../../helpers/testDb'
import { UserService } from '../../../src/services/userService'

describe('User Operations Integration Tests', () => {
  let testDb: TestDatabase
  let userService: UserService

  beforeAll(async () => {
    testDb = TestDatabase.getInstance()
    await testDb.setup()
    userService = new UserService(testDb.prisma)
  })

  afterAll(async () => {
    await testDb.teardown()
  })

  beforeEach(async () => {
    await testDb.cleanup()
  })

  describe('User CRUD Operations', () => {
    it('should create, read, update, and delete user', async () => {
      // Create
      const userData = {
        email: 'integration@test.com',
        name: 'Integration Test User'
      }
      
      const createdUser = await userService.createUser(userData)
      expect(createdUser).toMatchObject(userData)
      expect(createdUser.id).toBeDefined()

      // Read
      const foundUser = await testDb.prisma.user.findUnique({
        where: { id: createdUser.id }
      })
      expect(foundUser).toMatchObject(userData)

      // Update
      const updatedUser = await testDb.prisma.user.update({
        where: { id: createdUser.id },
        data: { name: 'Updated Name' }
      })
      expect(updatedUser.name).toBe('Updated Name')

      // Delete
      await testDb.prisma.user.delete({
        where: { id: createdUser.id }
      })

      const deletedUser = await testDb.prisma.user.findUnique({
        where: { id: createdUser.id }
      })
      expect(deletedUser).toBeNull()
    })

    it('should handle user with posts relationship', async () => {
      // Create user
      const user = await testDb.prisma.user.create({
        data: {
          email: 'author@test.com',
          name: 'Test Author'
        }
      })

      // Create posts
      await testDb.prisma.post.createMany({
        data: [
          {
            title: 'Test Post 1',
            content: 'Content 1',
            published: true,
            authorId: user.id
          },
          {
            title: 'Test Post 2', 
            content: 'Content 2',
            published: false,
            authorId: user.id
          }
        ]
      })

      // Test getUserWithPosts
      const userWithPosts = await userService.getUserWithPosts(user.id)
      
      expect(userWithPosts.posts).toHaveLength(1) // Only published posts
      expect(userWithPosts.postCount).toBe(1)
      expect(userWithPosts.posts[0].title).toBe('Test Post 1')
    })
  })

  describe('Data Constraints', () => {
    it('should enforce unique email constraint', async () => {
      // Create first user
      await testDb.prisma.user.create({
        data: {
          email: 'unique@test.com',
          name: 'First User'
        }
      })

      // Try to create second user with same email
      await expect(
        testDb.prisma.user.create({
          data: {
            email: 'unique@test.com',
            name: 'Second User'
          }
        })
      ).rejects.toThrow()
    })

    it('should handle foreign key constraints', async () => {
      // Try to create post without valid author
      await expect(
        testDb.prisma.post.create({
          data: {
            title: 'Orphan Post',
            content: 'This should fail',
            authorId: 9999 // Non-existent user
          }
        })
      ).rejects.toThrow()
    })
  })
})`}
          </Box>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>✅ Integration Testing Benefits</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ทดสอบ database constraints และ relationships" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ตรวจสอบ SQL queries ที่ generate มา" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Test migrations และ schema changes" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Verify end-to-end data flow" />
            </ListItem>
          </List>
        </Alert>
      </TabPanel>

      {/* Tab 5: Test Data */}
      <TabPanel value={tabValue} index={4}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          📊 Test Data Management
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          การจัดการ test data ที่ดีจะช่วยให้ tests เป็นระเบียบและทำงานได้อย่างถูกต้อง
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🏭 Test Data Factories
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">tests/helpers/fixtures.ts</Typography>
            <IconButton onClick={() => copyToClipboard(`import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

export class TestDataFactory {
  constructor(private prisma: PrismaClient) {}

  // User Factory
  async createUser(overrides: Partial<{
    email: string
    name: string
  }> = {}) {
    const userData = {
      email: overrides.email || faker.internet.email(),
      name: overrides.name || faker.person.fullName(),
    }

    return await this.prisma.user.create({
      data: userData
    })
  }

  async createUsers(count: number) {
    const users = []
    for (let i = 0; i < count; i++) {
      users.push(await this.createUser())
    }
    return users
  }

  // Post Factory
  async createPost(authorId: number, overrides: Partial<{
    title: string
    content: string
    published: boolean
  }> = {}) {
    const postData = {
      title: overrides.title || faker.lorem.sentence(),
      content: overrides.content || faker.lorem.paragraphs(3),
      published: overrides.published ?? faker.datatype.boolean(),
      authorId,
    }

    return await this.prisma.post.create({
      data: postData
    })
  }

  async createPostsForUser(userId: number, count: number) {
    const posts = []
    for (let i = 0; i < count; i++) {
      posts.push(await this.createPost(userId))
    }
    return posts
  }

  // Comment Factory
  async createComment(postId: number, authorId: number, overrides: Partial<{
    content: string
  }> = {}) {
    const commentData = {
      content: overrides.content || faker.lorem.paragraph(),
      postId,
      authorId,
    }

    return await this.prisma.comment.create({
      data: commentData
    })
  }

  // Complex scenarios
  async createUserWithPosts(postCount: number = 3) {
    const user = await this.createUser()
    const posts = await this.createPostsForUser(user.id, postCount)
    
    return {
      user,
      posts
    }
  }

  async createBlogScenario() {
    // Create multiple users
    const author = await this.createUser({ name: 'Blog Author' })
    const commenter1 = await this.createUser({ name: 'Commenter One' })
    const commenter2 = await this.createUser({ name: 'Commenter Two' })

    // Create posts
    const publishedPost = await this.createPost(author.id, {
      title: 'Published Blog Post',
      published: true
    })
    const draftPost = await this.createPost(author.id, {
      title: 'Draft Post',
      published: false
    })

    // Create comments
    const comments = [
      await this.createComment(publishedPost.id, commenter1.id),
      await this.createComment(publishedPost.id, commenter2.id),
    ]

    return {
      author,
      commenters: [commenter1, commenter2],
      posts: {
        published: publishedPost,
        draft: draftPost
      },
      comments
    }
  }
}`)}>
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
{`import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

export class TestDataFactory {
  constructor(private prisma: PrismaClient) {}

  // User Factory
  async createUser(overrides: Partial<{
    email: string
    name: string
  }> = {}) {
    const userData = {
      email: overrides.email || faker.internet.email(),
      name: overrides.name || faker.person.fullName(),
    }

    return await this.prisma.user.create({
      data: userData
    })
  }

  async createUsers(count: number) {
    const users = []
    for (let i = 0; i < count; i++) {
      users.push(await this.createUser())
    }
    return users
  }

  // Post Factory
  async createPost(authorId: number, overrides: Partial<{
    title: string
    content: string
    published: boolean
  }> = {}) {
    const postData = {
      title: overrides.title || faker.lorem.sentence(),
      content: overrides.content || faker.lorem.paragraphs(3),
      published: overrides.published ?? faker.datatype.boolean(),
      authorId,
    }

    return await this.prisma.post.create({
      data: postData
    })
  }

  async createPostsForUser(userId: number, count: number) {
    const posts = []
    for (let i = 0; i < count; i++) {
      posts.push(await this.createPost(userId))
    }
    return posts
  }

  // Comment Factory
  async createComment(postId: number, authorId: number, overrides: Partial<{
    content: string
  }> = {}) {
    const commentData = {
      content: overrides.content || faker.lorem.paragraph(),
      postId,
      authorId,
    }

    return await this.prisma.comment.create({
      data: commentData
    })
  }

  // Complex scenarios
  async createUserWithPosts(postCount: number = 3) {
    const user = await this.createUser()
    const posts = await this.createPostsForUser(user.id, postCount)
    
    return {
      user,
      posts
    }
  }

  async createBlogScenario() {
    // Create multiple users
    const author = await this.createUser({ name: 'Blog Author' })
    const commenter1 = await this.createUser({ name: 'Commenter One' })
    const commenter2 = await this.createUser({ name: 'Commenter Two' })

    // Create posts
    const publishedPost = await this.createPost(author.id, {
      title: 'Published Blog Post',
      published: true
    })
    const draftPost = await this.createPost(author.id, {
      title: 'Draft Post',
      published: false
    })

    // Create comments
    const comments = [
      await this.createComment(publishedPost.id, commenter1.id),
      await this.createComment(publishedPost.id, commenter2.id),
    ]

    return {
      author,
      commenters: [commenter1, commenter2],
      posts: {
        published: publishedPost,
        draft: draftPost
      },
      comments
    }
  }
}`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📦 Database Seeding
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">prisma/seed.ts</Typography>
            <IconButton onClick={() => copyToClipboard(`import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create test users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@test.com' },
    update: {},
    create: {
      email: 'alice@test.com',
      name: 'Alice Johnson',
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@test.com' },
    update: {},
    create: {
      email: 'bob@test.com',
      name: 'Bob Smith',
    },
  })

  // Create test posts
  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Getting Started with Prisma',
      content: 'This is a comprehensive guide to Prisma ORM...',
      published: true,
      authorId: alice.id,
    },
  })

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Advanced Prisma Techniques',
      content: 'Learn advanced patterns and techniques...',
      published: false,
      authorId: bob.id,
    },
  })

  console.log({ alice, bob, post1, post2 })
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// Add to package.json:
// "prisma": {
//   "seed": "tsx prisma/seed.ts"
// }`)}>
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
{`import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create test users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@test.com' },
    update: {},
    create: {
      email: 'alice@test.com',
      name: 'Alice Johnson',
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@test.com' },
    update: {},
    create: {
      email: 'bob@test.com',
      name: 'Bob Smith',
    },
  })

  // Create test posts
  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Getting Started with Prisma',
      content: 'This is a comprehensive guide to Prisma ORM...',
      published: true,
      authorId: alice.id,
    },
  })

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Advanced Prisma Techniques',
      content: 'Learn advanced patterns and techniques...',
      published: false,
      authorId: bob.id,
    },
  })

  console.log({ alice, bob, post1, post2 })
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// Add to package.json:
// "prisma": {
//   "seed": "tsx prisma/seed.ts"
// }`}
          </Box>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>📊 Test Data Best Practices</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ factories สำหรับสร้าง test data" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="แยก test data จาก production data" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ faker สำหรับ realistic data" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Clean up test data หลังจากแต่ละ test" />
            </ListItem>
          </List>
        </Alert>
      </TabPanel>

      {/* Tab 6: Best Practices */}
      <TabPanel value={tabValue} index={5}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🎯 Testing Best Practices
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          แนวทางที่ดีที่สุดในการทดสอบ Prisma applications ใน production
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📋 Testing Strategy
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell><strong>Layer</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Tools</strong></TableCell>
                <TableCell><strong>Coverage</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Business Logic</TableCell>
                <TableCell>Unit Tests</TableCell>
                <TableCell>Jest + Mocks</TableCell>
                <TableCell>70-80%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Database Operations</TableCell>
                <TableCell>Integration Tests</TableCell>
                <TableCell>Jest + Real DB</TableCell>
                <TableCell>15-20%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>API Endpoints</TableCell>
                <TableCell>E2E Tests</TableCell>
                <TableCell>Supertest</TableCell>
                <TableCell>5-10%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔧 CI/CD Configuration
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">.github/workflows/test.yml</Typography>
            <IconButton onClick={() => copyToClipboard(`name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Setup test database
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      run: |
        npx prisma migrate deploy
        npx prisma db seed

    - name: Run unit tests
      run: npm run test:unit

    - name: Run integration tests
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      run: npm run test:integration

    - name: Upload coverage reports
      uses: codecov/codecov-action@v3`)}>
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
{`name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Setup test database
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      run: |
        npx prisma migrate deploy
        npx prisma db seed

    - name: Run unit tests
      run: npm run test:unit

    - name: Run integration tests
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      run: npm run test:integration

    - name: Upload coverage reports
      uses: codecov/codecov-action@v3`}
          </Box>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>🎉 ขอแสดงความยินดี!</Typography>
          <Typography>
            คุณได้เรียนรู้การทดสอบ Prisma applications แล้ว! 
            ตอนนี้คุณสามารถเขียน tests ที่มีคุณภาพและน่าเชื่อถือได้
          </Typography>
        </Alert>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            สิ่งที่คุณได้เรียนรู้:
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Test Database Setup" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Unit Testing กับ Mock Prisma" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Integration Testing strategies" />
              </ListItem>
            </List>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Test Data Management" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Database Fixtures และ Seeding" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Testing Best Practices และ CI/CD" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </TabPanel>

      {/* Navigation buttons */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          component={Link}
          href="/prisma-tutorial/lesson-10"
          startIcon={<ArrowBack />}
          variant="outlined"
        >
          บทที่ 10: TypedSQL
        </Button>
        
        <Button
          component={Link}
          href="/prisma-tutorial/lesson-12"
          endIcon={<PlayArrow />}
          variant="contained"
          disabled
        >
          บทที่ 12: Deployment
        </Button>
      </Box>
    </Container>
  );
} 