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
    <Box sx={{
      minHeight: '100vh',
      maxWidth: '100vw',
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 2, sm: 3 },
      overflow: 'hidden',
    }}>
        {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/nextjs-basics"
          sx={{ mb: 2, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
          >
            กลับไปหน้าหลัก
          </Button>
        <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, fontWeight: 600, mb: 2, lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <BugReport color="primary" sx={{ fontSize: { xs: '2.2rem', sm: '3rem' } }} />
          บทที่ 13: Testing
          </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3, '& .MuiChip-root': { fontSize: { xs: '0.75rem', sm: '0.8rem' } } }}>
          <Chip icon={<Science />} label="Unit Test" color="primary" size="small" />
          <Chip icon={<Quiz />} label="Integration" color="secondary" size="small" />
          <Chip icon={<Assessment />} label="E2E" color="info" size="small" />
          <Chip icon={<Code />} label="Best Practice" color="success" size="small" />
        </Stack>
        <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
            <Typography variant="body2">
            ⏱️ <strong>ระยะเวลา:</strong> 40 นาที | 
            📊 <strong>ระดับ:</strong> ปานกลาง | 
            🎯 <strong>เป้าหมาย:</strong> เรียนรู้ Testing & Best Practices ใน Next.js
            </Typography>
          </Alert>
            </Box>

        {/* Tabs */}
      <Paper sx={{ mb: { xs: 3, sm: 4 } }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="🧪 Unit Test" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="🔗 Integration" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="🚦 E2E" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="💡 Best Practice" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          </Tabs>
      </Paper>

      {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
        <Typography variant="h3" sx={{ mb: 3 }}>🧪 Unit Test</Typography>
          
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

      <TabPanel value={activeTab} index={1}>
        <Typography variant="h3" sx={{ mb: 3 }}>🎯 Integration Test</Typography>
          
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

      <TabPanel value={activeTab} index={2}>
        <Typography variant="h3" sx={{ mb: 3 }}>🎯 Integration Test</Typography>
          
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

      <TabPanel value={activeTab} index={3}>
        <Typography variant="h3" sx={{ mb: 3 }}>🎯 Integration Test</Typography>
          
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

        {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: { xs: 4, sm: 6 }, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/nextjs-basics/lesson-12"
            variant="outlined"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 2, sm: 1 } }}
          >
          บทที่ 12: Security
          </Button>
          <Chip 
          label="13 / 18"
          color="primary"
          variant="outlined"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' }, order: { xs: 1, sm: 2 } }}
        />
          <Button
            endIcon={<ArrowForward />}
            component={Link}
          href="/nextjs-basics/lesson-14"
            variant="contained"
          color="primary"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 3, sm: 3 } }}
          >
          บทที่ 14: Performance
          </Button>
        </Box>
      </Box>
  );
} 