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
  Chip,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Stack,
  Avatar,
  Switch,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  IconButton,
  Collapse,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import {
  Security,
  Code,
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Warning,
  Info,
  Error as ErrorIcon,
  Speed,
  Shield,
  Lock,
  Public,
  VpnLock,
  Gavel,
  Visibility,
  VisibilityOff,
  ExpandMore,
  ExpandLess,
  Language,
  Block,
  AccessTime,
  PlayArrow,
  Lightbulb,
  BugReport,
  Science,
  Quiz,
  Assessment,
  CheckBox,
  CheckBoxOutlineBlank,
  Timer,
  Build,
  Refresh,
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

// Demo Components
interface TestResult {
  name: string;
  status: 'waiting' | 'running' | 'passed' | 'failed';
  result: string | null;
}

function TestRunnerDemo() {
  const [testResults, setTestResults] = useState<TestResult[]>([
    { name: 'add(2, 3)', status: 'waiting', result: null },
    { name: 'multiply(4, 5)', status: 'waiting', result: null },
    { name: 'divide(10, 0)', status: 'waiting', result: null },
  ]);

  const runTests = async () => {
    for (let i = 0; i < testResults.length; i++) {
      setTestResults(prev => prev.map((test, index) => 
        index === i ? { ...test, status: 'running' as const } : test
      ));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const results = [
        { status: 'passed' as const, result: '✅ Expected: 5, Got: 5' },
        { status: 'passed' as const, result: '✅ Expected: 20, Got: 20' },
        { status: 'failed' as const, result: '❌ Expected: Error, Got: Infinity' },
      ];
      
      setTestResults(prev => prev.map((test, index) => 
        index === i ? { ...test, ...results[i] } : test
      ));
    }
  };

  const resetTests = () => {
    setTestResults([
      { name: 'add(2, 3)', status: 'waiting', result: null },
      { name: 'multiply(4, 5)', status: 'waiting', result: null },
      { name: 'divide(10, 0)', status: 'waiting', result: null },
    ]);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🧪 Test Runner Simulator
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={runTests}
            disabled={testResults.some(test => test.status === 'running')}
            startIcon={<PlayArrow />}
            sx={{ mr: 2 }}
          >
            Run Tests
          </Button>
          <Button
            variant="outlined"
            onClick={resetTests}
            startIcon={<Refresh />}
          >
            Reset
          </Button>
        </Box>

        <Stack spacing={2}>
          {testResults.map((test, index) => (
            <Paper key={index} sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ minWidth: 200 }}>
                  <Typography variant="subtitle2" sx={{ fontFamily: 'monospace' }}>
                    {test.name}
                  </Typography>
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  {test.status === 'running' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={16} />
                      <Typography variant="body2" color="primary">Running...</Typography>
                    </Box>
                  )}
                  {test.status === 'waiting' && (
                    <Typography variant="body2" color="text.secondary">Waiting...</Typography>
                  )}
                  {test.status === 'passed' && (
                    <Typography variant="body2" color="success.main">{test.result}</Typography>
                  )}
                  {test.status === 'failed' && (
                    <Typography variant="body2" color="error.main">{test.result}</Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function ComponentTestDemo() {
  const [showComponent, setShowComponent] = useState(true);
  const [testResults, setTestResults] = useState<'running' | 'passed' | null>(null);

  const runComponentTest = () => {
    setTestResults('running');
    setTimeout(() => {
      setTestResults('passed');
    }, 2000);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🔧 Component Testing Demo
        </Typography>
        
        {showComponent && (
          <Paper sx={{ p: 2, mb: 2, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.main' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Sample Component to Test:</Typography>
            <Button variant="contained" color="primary">
              Click Me!
            </Button>
          </Paper>
        )}

        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setShowComponent(!showComponent)}
            sx={{ mr: 2 }}
          >
            {showComponent ? 'Hide' : 'Show'} Component
          </Button>
          <Button
            variant="contained"
            onClick={runComponentTest}
            disabled={testResults === 'running'}
            startIcon={<Science />}
          >
            Test Component
          </Button>
        </Box>

        {testResults && (
          <Alert severity={testResults === 'passed' ? 'success' : 'info'}>
            <Typography variant="body2">
              {testResults === 'running' && '⏳ Testing component rendering and interactions...'}
              {testResults === 'passed' && '✅ Component test passed! Button renders correctly and responds to clicks.'}
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default function Lesson13Page() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

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
            <Science color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 13: Testing สำหรับมือใหม่
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การทดสอบโค้ดด้วย Jest และ Testing Library อย่างง่ายๆ 
            เพื่อให้มั่นใจว่าเว็บไซต์ของคุณทำงานได้ถูกต้องและไม่มีบัค! 🧪
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Science />} label="Testing Basics" color="primary" />
            <Chip icon={<BugReport />} label="Debug & Fix" color="error" />
            <Chip icon={<CheckCircle />} label="Quality Assurance" color="success" />
            <Chip icon={<Quiz />} label="Test Writing" color="warning" />
            <Chip icon={<Code />} label="Jest & Testing Library" color="info" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> ทำให้คุณเขียน Test เพื่อตรวจสอบการทำงานของโค้ดได้
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 60 นาที | 
              📊 <strong>ระดับ:</strong> มือใหม่ที่พร้อมเรียนรู้การทดสอบ
            </Typography>
          </Alert>

          {/* What is Testing in Simple Terms */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.50', border: '2px solid', borderColor: 'primary.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="primary" /> 🤔 Testing คืออะไร? (อธิบายแบบง่ายๆ)
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              ลองนึกภาพว่าการเขียนโค้ดเป็นเหมือน <strong>การทำอาหาร</strong> และ Testing เป็น <strong>"การชิมรสก่อนเสิร์ฟ"</strong>:
            </Typography>

            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 👨‍🍳 <strong>ทำอาหาร:</strong> เขียนโค้ดเหมือนทำอาหารตามสูตร
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🍴 <strong>ชิมรส:</strong> เขียน Test เพื่อทดสอบว่าโค้ดทำงานถูกต้องไหม
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • ✅ <strong>อร่อยแล้ว:</strong> Test ผ่าน = โค้ดทำงานได้ดี
              </Typography>
              <Typography variant="body2">
                • 🔧 <strong>ปรับปรุง:</strong> Test ไม่ผ่าน = ต้องแก้ไขโค้ด
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ข้อดี:</strong> Testing ช่วยให้คุณมั่นใจว่าโค้ดทำงานถูกต้อง และจับบัคได้ก่อนผู้ใช้เจอ!
              </Typography>
            </Alert>
          </Paper>
        </Box>

        {/* Learning Objectives for Beginners */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle color="primary" /> 🎯 เมื่อเรียนจบบทนี้ คุณจะสามารถ:
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Box>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เข้าใจว่า Testing คืออะไร" 
                    secondary="รู้หลักการและประโยชน์ของการทดสอบ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ติดตั้งและใช้ Jest" 
                    secondary="เขียน Unit Test แรกของคุณ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ทดสอบ React Components" 
                    secondary="ใช้ Testing Library เทสต์หน้าเว็บ"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Mock Functions และ APIs" 
                    secondary="จำลองการทำงานเพื่อการทดสอบ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Test Coverage และ Debugging" 
                    secondary="วัดความครอบคลุมและแก้ไขปัญหา"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="CI/CD Integration" 
                    secondary="รัน Test อัตโนมัติเมื่อ Deploy"
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>

        {/* Tabs */}
        <Box sx={{ width: '100%' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab 
              label="💡 เริ่มต้น Testing" 
              icon={<Lightbulb />}
              iconPosition="start"
            />
            <Tab 
              label="🧪 Unit Testing" 
              icon={<Science />}
              iconPosition="start"
            />
            <Tab 
              label="🔧 Component Testing" 
              icon={<Build />}
              iconPosition="start"
            />
            <Tab 
              label="🎯 Integration Testing" 
              icon={<Assessment />}
              iconPosition="start"
            />
            <Tab 
              label="🎮 ทดลองใช้งาน" 
              icon={<PlayArrow />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: Introduction to Testing */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>📚 เริ่มต้นกับ Testing</Typography>
          
          {/* Why Testing is Important */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'error.50', border: '2px solid', borderColor: 'error.200' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>
              😱 ถ้าไม่มี Testing จะเกิดอะไรขึ้น?
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, color: 'error.main' }}>🚨 ปัญหาที่เกิดขึ้น:</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><BugReport color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText 
                      primary="บัคซ่อนอยู่" 
                      secondary="ไม่รู้ว่ามีข้อผิดพลาดอยู่ในโค้ด"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><ErrorIcon color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText 
                      primary="แก้อันนี้ พังอันนั้น" 
                      secondary="การเปลี่ยนโค้ดทำให้ส่วนอื่นเสีย"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Warning color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText 
                      primary="ลูกค้าโกรธ" 
                      secondary="ผู้ใช้เจอบัคก่อนที่เราจะรู้"
                    />
                  </ListItem>
                </List>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, color: 'error.main' }}>💸 ค่าใช้จ่ายที่เพิ่มขึ้น:</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><Timer color="warning" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="เสียเวลาแก้บัค" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><ErrorIcon color="warning" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="เสียชื่อเสียง" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Warning color="warning" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="ลูกค้าหนีไป" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Paper>

          {/* Types of Testing */}
          <Typography variant="h5" sx={{ mb: 3 }}>🧪 ประเภทของการทดสอบ (เข้าใจง่าย)</Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'info.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Science color="info" /> Unit Testing
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>เปรียบเทียบ:</strong> เหมือนตรวจสอบส่วนผสมแต่ละอย่าง
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • ทดสอบฟังก์ชันเดี่ยวๆ
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • เร็วที่สุด และง่ายที่สุด
                </Typography>
                <Typography variant="body2">
                  • เหมาะสำหรับตรวจ logic
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'warning.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Build color="warning" /> Component Testing
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>เปรียบเทียบ:</strong> เหมือนทดสอบจานเดี่ยวๆ
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • ทดสอบ React Component
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • ตรวจสอบการแสดงผล
                </Typography>
                <Typography variant="body2">
                  • เทสต์การคลิกปุ่ม input
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'success.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Assessment color="success" /> Integration Testing
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>เปรียบเทียบ:</strong> เหมือนทดสอบเมนูเต็มโต๊ะ
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • ทดสอบหลายส่วนร่วมกัน
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • ตรวจสอบ API + Database
                </Typography>
                <Typography variant="body2">
                  • ใช้เวลานานกว่า แต่ครอบคลุม
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Setup Instructions */}
          <Typography variant="h5" sx={{ mb: 2 }}>⚙️ การติดตั้ง Testing Tools</Typography>
          
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ️ <strong>สำหรับโปรเจค Next.js ใหม่:</strong>
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="body2" component="pre" sx={{ color: 'success.dark' }}>
{`# สร้างโปรเจค Next.js พร้อม Testing (แนะนำ)
npx create-next-app@latest my-app --typescript --eslint
cd my-app

# ติดตั้ง Testing packages
npm install --save-dev jest jest-environment-jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event`}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              📝 <strong>สร้างไฟล์ config (jest.config.js):</strong>
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="body2" component="pre">
{`// jest.config.js (สร้างไฟล์นี้ใน root ของโปรเจค)
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    // Handle module aliases (this will match the paths you added)
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config
module.exports = createJestConfig(customJestConfig)`}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              🔧 <strong>สร้างไฟล์ setup (jest.setup.js):</strong>
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="body2" component="pre">
{`// jest.setup.js (สร้างไฟล์นี้ใน root ของโปรเจค)
import '@testing-library/jest-dom'

// Mock การทำงานของ Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
    }
  },
}))`}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              📦 <strong>เพิ่ม scripts ใน package.json:</strong>
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1 }}>
              <Typography variant="body2" component="pre">
{`{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}`}
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✅ <strong>เสร็จแล้ว!</strong> ตอนนี้คุณพร้อมเขียน Test แรกแล้ว! 
                รัน <code>npm test</code> เพื่อเริ่มทดสอบ
              </Typography>
            </Alert>
          </Paper>

          {/* First Test Example */}
          <Typography variant="h5" sx={{ mb: 2 }}>🚀 ตัวอย่างแรก: Test ง่ายๆ</Typography>
          
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              มาสร้าง Test แรกที่ทดสอบฟังก์ชันง่ายๆ:
            </Typography>
            
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              1. สร้างฟังก์ชันที่จะทดสอบ (utils/math.js):
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="body2" component="pre">
{`// utils/math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}`}
              </Typography>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              2. สร้าง Test ไฟล์ (__tests__/math.test.js):
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="body2" component="pre">
{`// __tests__/math.test.js
import { add, multiply, divide } from '../utils/math';

// กลุ่มของ test สำหรับ math functions
describe('Math functions', () => {
  
  // ทดสอบฟังก์ชัน add
  test('should add two numbers correctly', () => {
    // Arrange: เตรียมข้อมูล
    const a = 2;
    const b = 3;
    
    // Act: เรียกใช้ฟังก์ชัน
    const result = add(a, b);
    
    // Assert: ตรวจสอบผลลัพธ์
    expect(result).toBe(5);
  });

  test('should multiply two numbers correctly', () => {
    expect(multiply(4, 5)).toBe(20);
    expect(multiply(0, 100)).toBe(0);
    expect(multiply(-2, 3)).toBe(-6);
  });

  test('should divide two numbers correctly', () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(9, 3)).toBe(3);
  });

  test('should throw error when dividing by zero', () => {
    expect(() => {
      divide(10, 0);
    }).toThrow('Cannot divide by zero');
  });
});`}
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                💡 <strong>รูปแบบ AAA:</strong> Arrange (เตรียม) → Act (ทำงาน) → Assert (ตรวจสอบ)
                เป็นรูปแบบมาตรฐานในการเขียน Test
              </Typography>
            </Alert>

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              3. รัน Test:
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1 }}>
              <Typography variant="body2" component="pre">
{`npm test

# ผลลัพธ์ที่ควรเห็น:
✓ Math functions › should add two numbers correctly
✓ Math functions › should multiply two numbers correctly  
✓ Math functions › should divide two numbers correctly
✓ Math functions › should throw error when dividing by zero

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total`}
              </Typography>
            </Box>
          </Paper>
        </TabPanel>

        {/* Tab 2: Unit Testing */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>🧪 Unit Testing</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Unit Testing คือการทดสอบฟังก์ชันหรือส่วนย่อยของโค้ดแต่ละตัวแยกกัน
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>1. Basic Jest Matchers</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// ตัวอย่าง Jest Matchers ที่ใช้บ่อย
describe('Basic Jest Matchers', () => {
  test('equality matchers', () => {
    expect(2 + 2).toBe(4);                    // ตรวจสอบค่าเท่ากัน
    expect({ name: 'John' }).toEqual({ name: 'John' }); // ตรวจสอบ object
  });

  test('truthiness matchers', () => {
    expect(true).toBeTruthy();                // ค่าที่เป็น true
    expect(false).toBeFalsy();                // ค่าที่เป็น false
    expect('hello').toBeTruthy();             // string ไม่ว่าง = truthy
    expect('').toBeFalsy();                   // string ว่าง = falsy
    expect(null).toBeNull();                  // ตรวจสอบ null
    expect(undefined).toBeUndefined();        // ตรวจสอบ undefined
  });

  test('number matchers', () => {
    expect(2 + 2).toBeGreaterThan(3);         // มากกว่า
    expect(2 + 2).toBeGreaterThanOrEqual(4);  // มากกว่าหรือเท่ากับ
    expect(2 + 2).toBeLessThan(5);            // น้อยกว่า
    expect(0.1 + 0.2).toBeCloseTo(0.3);       // ใกล้เคียง (สำหรับ float)
  });

  test('string matchers', () => {
    expect('hello world').toMatch(/world/);    // ตรงกับ regex
    expect('hello world').toContain('hello');  // มีคำนี้อยู่
  });

  test('array matchers', () => {
    expect(['apple', 'banana', 'orange']).toContain('banana');
    expect(['apple', 'banana']).toHaveLength(2);
  });

  test('exception matchers', () => {
    const throwError = () => {
      throw new Error('Something went wrong');
    };
    expect(throwError).toThrow();
    expect(throwError).toThrow('Something went wrong');
  });
});`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>2. Testing Functions with Side Effects</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// utils/storage.js - ฟังก์ชันที่มี side effects
export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

export function getFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
}

// __tests__/storage.test.js
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

// Mock localStorage เพราะ Jest ไม่มี localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('Local Storage Utils', () => {
  beforeEach(() => {
    // ล้าง mock ก่อนแต่ละ test
    jest.clearAllMocks();
  });

  test('should save data to localStorage', () => {
    const testData = { name: 'John', age: 30 };
    
    const result = saveToLocalStorage('user', testData);
    
    expect(result).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user', 
      JSON.stringify(testData)
    );
  });

  test('should retrieve data from localStorage', () => {
    const testData = { name: 'John', age: 30 };
    localStorage.getItem.mockReturnValue(JSON.stringify(testData));
    
    const result = getFromLocalStorage('user');
    
    expect(result).toEqual(testData);
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
  });

  test('should handle localStorage errors', () => {
    localStorage.setItem.mockImplementation(() => {
      throw new Error('Storage full');
    });
    
    const result = saveToLocalStorage('user', { name: 'John' });
    
    expect(result).toBe(false);
  });
});`}
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              💡 <strong>Mock คืออะไร?</strong> Mock คือการจำลองการทำงานของสิ่งต่างๆ เช่น localStorage, API calls 
              เพื่อให้เราทดสอบโค้ดได้โดยไม่ต้องพึ่งสิ่งภายนอก
            </Typography>
          </Alert>
        </TabPanel>

        {/* Tab 3: Component Testing */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>🔧 Component Testing</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            การทดสอบ React Components ด้วย Testing Library เพื่อให้มั่นใจว่า UI ทำงานถูกต้อง
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>1. Basic Component Testing</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// components/Button.jsx - Component ที่จะทดสอบ
export function CustomButton({ children, onClick, disabled = false, variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
      data-testid="custom-button"
    >
      {children}
    </button>
  );
}

// __tests__/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomButton } from '../components/Button';

describe('CustomButton Component', () => {
  test('renders button with correct text', () => {
    render(<CustomButton>Click Me</CustomButton>);
    
    // ตรวจสอบว่ามีข้อความใน button
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn(); // สร้าง mock function
    
    render(<CustomButton onClick={handleClick}>Click Me</CustomButton>);
    
    const button = screen.getByTestId('custom-button');
    fireEvent.click(button); // จำลองการคลิก
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<CustomButton disabled>Click Me</CustomButton>);
    
    const button = screen.getByTestId('custom-button');
    expect(button).toBeDisabled();
  });

  test('has correct CSS class based on variant', () => {
    render(<CustomButton variant="secondary">Click Me</CustomButton>);
    
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveClass('btn-secondary');
  });
});`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>2. Testing Forms and User Input</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// components/LoginForm.jsx
import { useState } from 'react';

export function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
    
    setError('');
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-testid="username-input"
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
        />
      </div>
      
      {error && <div data-testid="error-message">{error}</div>}
      
      <button type="submit" data-testid="submit-button">
        Login
      </button>
    </form>
  );
}

// __tests__/LoginForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../components/LoginForm';

describe('LoginForm Component', () => {
  test('renders all form elements', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('updates input values when user types', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    
    await user.type(usernameInput, 'john@example.com');
    await user.type(passwordInput, 'password123');
    
    expect(usernameInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('shows error when submitting empty form', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);
    
    expect(screen.getByTestId('error-message')).toHaveTextContent('กรุณากรอกข้อมูลให้ครบ');
  });

  test('calls onSubmit with correct data when form is valid', async () => {
    const mockOnSubmit = jest.fn();
    const user = userEvent.setup();
    
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    await user.type(screen.getByTestId('username-input'), 'john@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.click(screen.getByTestId('submit-button'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: 'john@example.com',
      password: 'password123'
    });
  });
});`}
            </Typography>
          </Box>

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              ⚠️ <strong>userEvent vs fireEvent:</strong> ใช้ <code>userEvent</code> แทน <code>fireEvent</code> เมื่อเป็นไปได้ 
              เพราะมันจำลองการใช้งานจริงของผู้ใช้ได้ดีกว่า
            </Typography>
          </Alert>
        </TabPanel>

        {/* Tab 4: Integration Testing */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎯 Integration Testing</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            การทดสอบหลายส่วนที่ทำงานร่วมกัน รวมถึง API calls และ Database interactions
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>1. Testing API Calls</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// services/userService.js - API service
export async function getUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  
  return response.json();
}

export async function createUser(userData) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  
  return response.json();
}

// __tests__/userService.test.js
import { getUser, createUser } from '../services/userService';

// Mock fetch globally
global.fetch = jest.fn();

describe('User Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should fetch user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const user = await getUser(1);

    expect(fetch).toHaveBeenCalledWith('/api/users/1');
    expect(user).toEqual(mockUser);
  });

  test('should throw error when fetch fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getUser(1)).rejects.toThrow('Failed to fetch user');
  });

  test('should create user successfully', async () => {
    const newUser = { name: 'Jane Doe', email: 'jane@example.com' };
    const createdUser = { id: 2, ...newUser };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createdUser,
    });

    const result = await createUser(newUser);

    expect(fetch).toHaveBeenCalledWith('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    expect(result).toEqual(createdUser);
  });
});`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>2. Testing with MSW (Mock Service Worker)</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// เติดตั้ง MSW
npm install --save-dev msw

// mocks/handlers.js - กำหนด API responses
import { rest } from 'msw';

export const handlers = [
  // GET /api/users/:id
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    
    return res(
      ctx.json({
        id: parseInt(id),
        name: 'John Doe',
        email: 'john@example.com'
      })
    );
  }),

  // POST /api/users
  rest.post('/api/users', async (req, res, ctx) => {
    const newUser = await req.json();
    
    return res(
      ctx.json({
        id: 123,
        ...newUser,
        createdAt: new Date().toISOString()
      })
    );
  }),

  // Error case
  rest.get('/api/users/999', (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({ error: 'User not found' })
    );
  }),
];

// mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// jest.setup.js - เพิ่มใน setup file
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// __tests__/userIntegration.test.js - ทดสอบกับ MSW
import { getUser, createUser } from '../services/userService';

describe('User Service Integration', () => {
  test('should get user with real-like API', async () => {
    const user = await getUser(1);
    
    expect(user).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    });
  });

  test('should create user with real-like API', async () => {
    const newUser = { name: 'Jane Doe', email: 'jane@example.com' };
    const result = await createUser(newUser);
    
    expect(result).toMatchObject({
      id: expect.any(Number),
      name: 'Jane Doe',
      email: 'jane@example.com',
      createdAt: expect.any(String)
    });
  });
});`}
            </Typography>
          </Box>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              ✨ <strong>ข้อดีของ MSW:</strong> ทำให้การทดสอบเหมือนจริงมากขึ้น และไม่ต้อง mock fetch เอง
              ใช้ได้ทั้งใน test และ development
            </Typography>
          </Alert>
        </TabPanel>

        {/* Tab 5: Interactive Demo */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎮 ทดลองใช้งาน</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            ทดลองเรียกใช้ Test แบบ Interactive เพื่อดูวิธีการทำงาน
          </Typography>

          <Stack spacing={4}>
            <TestRunnerDemo />
            <ComponentTestDemo />
          </Stack>

          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📊 Test Coverage
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Test Coverage คือการวัดว่าโค้ดของเราถูกทดสอบไปแล้วกี่เปอร์เซ็นต์:
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Lines Covered</Typography>
                <Typography variant="body2">85%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={85} color="success" />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Functions Covered</Typography>
                <Typography variant="body2">92%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={92} color="success" />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Branches Covered</Typography>
                <Typography variant="body2">78%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={78} color="warning" />
            </Box>

            <Alert severity="info">
              <Typography variant="body2">
                💡 <strong>เป้าหมาย:</strong> ควรมี Test Coverage อย่างน้อย 80% 
                แต่ไม่จำเป็นต้อง 100% เสมอไป ให้เน้นทดสอบส่วนสำคัญ
              </Typography>
            </Alert>
          </Paper>
        </TabPanel>

        {/* Navigation */}
        <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.dark' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            🎯 ยินดีด้วย! คุณเรียนจบบทที่ 13 แล้ว
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            ตอนนี้คุณสามารถเขียน Test เพื่อตรวจสอบการทำงานของโค้ดและ React Components ได้แล้ว
            โค้ดของคุณจะมีคุณภาพและความน่าเชื่อถือมากขึ้น!
          </Typography>
          
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎉 <strong>เก่งมาก!</strong> คุณได้เรียนรู้การทดสอบโค้ดที่เป็นพื้นฐานสำคัญของการพัฒนาซอฟต์แวร์
            </Typography>
          </Alert>
        </Paper>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/nextjs-basics/lesson-12"
            variant="outlined"
          >
            บทที่ 12: Middleware & Security
          </Button>
          
          <Chip 
            label="13 / 13"
            color="success"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/nextjs-basics"
            variant="contained"
            color="success"
          >
            กลับไปหน้าหลัก
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 