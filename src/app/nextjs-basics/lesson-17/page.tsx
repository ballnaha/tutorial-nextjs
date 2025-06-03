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
  Stack,
  Avatar,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Code,
  PlayArrow,
  Lightbulb,
  Timer,
  Refresh,
  Security,
  BugReport,
  TrendingUp,
  Build,
  Speed,
  CheckBox,
  ExpandMore,
  Star,
  AutoFixHigh,
  Psychology,
  Engineering,
  Settings,
  Language,
  DataObject,
  AccessibilityNew,
  Assessment,
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
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  profile?: {
    avatar?: string;
    bio?: string;
    location?: string;
  };
}

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  inStock: boolean;
  tags: string[];
  metadata: Record<string, unknown>;
}

function TypeScriptDemo() {
  const [activeExample, setActiveExample] = useState<string>('basic');
  
  const examples = {
    basic: {
      title: 'Basic Types',
      description: 'ประเภทข้อมูลพื้นฐานใน TypeScript',
      code: `// Basic Types
let userName: string = 'สมชาย';
let age: number = 25;
let isActive: boolean = true;
let skills: string[] = ['React', 'Next.js', 'TypeScript'];
let profile: object = { name: 'สมชาย', age: 25 };

// Union Types
let status: 'pending' | 'approved' | 'rejected' = 'pending';
let id: string | number = 'user-123';

// Optional Properties
let config: {
  apiUrl: string;
  timeout?: number; // optional
  retries?: number; // optional
} = {
  apiUrl: 'https://api.example.com'
};`
    },
    interface: {
      title: 'Interface Definition',
      description: 'การกำหนด interface สำหรับ objects',
      code: `// User Interface
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  profile?: {
    avatar?: string;
    bio?: string;
    location?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Product Interface
interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  inStock: boolean;
  tags: string[];
  metadata: Record<string, unknown>;
}

// การใช้งาน
const user: User = {
  id: 1,
  name: 'สมชาย ใจดี',
  email: 'somchai@example.com',
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
};`
    },
    component: {
      title: 'Component Props',
      description: 'การใช้ TypeScript กับ React Components',
      code: `// Props Interface
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

// Component with TypeScript
function CustomButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick 
}: ButtonProps) {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// การใช้งาน
<CustomButton variant="primary" size="lg" onClick={() => alert('Clicked!')}>
  คลิกที่นี่
</CustomButton>`
    }
  };

  const currentExample = examples[activeExample as keyof typeof examples];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          💻 TypeScript Examples
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          {Object.entries(examples).map(([key, example]) => (
            <Button
              key={key}
              variant={activeExample === key ? 'contained' : 'outlined'}
              onClick={() => setActiveExample(key)}
              sx={{ mr: 1, mb: 1 }}
              size="small"
            >
              {example.title}
            </Button>
          ))}
        </Box>

        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Language />
            </Avatar>
            <Box>
              <Typography variant="h6">{currentExample.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {currentExample.description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 2}}>
            <Typography 
              variant="body2" 
              component="pre" 
              className="code-block"
              sx={{ p: 2 }}
            >
              {currentExample.code}
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              💡 <strong>คำแนะนำ:</strong> ลองคัดลอกโค้ดไปใส่ในโปรเจคของคุณและดู IntelliSense ทำงาน!
            </Typography>
          </Alert>
        </Paper>
      </CardContent>
    </Card>
  );
}

function InterfaceBuilder() {
  const [interfaceName, setInterfaceName] = useState<string>('UserProfile');
  const [properties, setProperties] = useState<Array<{
    name: string;
    type: string;
    optional: boolean;
  }>>([
    { name: 'id', type: 'number', optional: false },
    { name: 'name', type: 'string', optional: false },
    { name: 'email', type: 'string', optional: false },
    { name: 'avatar', type: 'string', optional: true }
  ]);

  const generateInterface = () => {
    let code = `interface ${interfaceName} {\n`;
    properties.forEach(prop => {
      code += `  ${prop.name}${prop.optional ? '?' : ''}: ${prop.type};\n`;
    });
    code += '}';
    return code;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🏗️ Interface Builder
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 3 }}>
          สร้าง interface ของคุณเองและดูผลลัพธ์แบบ real-time
        </Typography>

        <Paper sx={{ p: 3, bgcolor: 'primary.50', border: '2px solid', borderColor: 'primary.200' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Generated Interface:</Typography>
          
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 2 }}>
            <Typography 
              variant="body2" 
              component="pre" 
              className="code-block"
              sx={{ p: 2 }}
            >
              {generateInterface()}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Properties ({properties.length}):</strong>
          </Typography>

          <Stack spacing={1}>
            {properties.map((prop, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                p: 1,
                bgcolor: 'white',
                borderRadius: 1
              }}>
                <Code color="primary" sx={{ fontSize: 16 }} />
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {prop.name}{prop.optional ? '?' : ''}: <strong>{prop.type}</strong>
                </Typography>
                <Chip 
                  label={prop.optional ? 'Optional' : 'Required'}
                  size="small"
                  color={prop.optional ? 'default' : 'primary'}
                  variant="outlined"
                />
              </Box>
            ))}
          </Stack>

          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              ✅ <strong>ข้อดีของ Interface:</strong> Type safety, IntelliSense, Error detection, 
              และ Code documentation ที่ดีขึ้น!
            </Typography>
          </Alert>
        </Paper>
      </CardContent>
    </Card>
  );
}

export default function Lesson17Page() {
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
          <Language color="primary" sx={{ fontSize: { xs: '2.2rem', sm: '3rem' } }} />
          บทที่ 17: TypeScript & Interface ใน Next.js
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3, '& .MuiChip-root': { fontSize: { xs: '0.75rem', sm: '0.8rem' } } }}>
          <Chip icon={<Language />} label="TypeScript" color="primary" size="small" />
          <Chip icon={<DataObject />} label="Interface" color="secondary" size="small" />
          <Chip icon={<Security />} label="Type Safety" color="success" size="small" />
          <Chip icon={<Code />} label="IntelliSense" color="warning" size="small" />
        </Stack>
        <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
          <Typography variant="body2">
            ⏱️ <strong>ระยะเวลา:</strong> 50 นาที | 
            📊 <strong>ระดับ:</strong> ปานกลางสำหรับมือใหม่ | 
            🎯 <strong>เป้าหมาย:</strong> เรียนรู้ TypeScript และ Interface ใน Next.js
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
          <Tab label="💡 TypeScript พื้นฐาน" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="🏗️ Interface & Types" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="⚛️ React TypeScript" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="🎮 ทดลองใช้งาน" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        <Typography variant="h3" sx={{ mb: 3 }}>💡 TypeScript พื้นฐาน</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          TypeScript เป็น superset ของ JavaScript ที่เพิ่ม type system เข้าไป 
          ช่วยให้เขียนโค้ดที่ปลอดภัยและมีคุณภาพมากขึ้น
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>🎯 ประเภทข้อมูลพื้นฐาน</Typography>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  📝 Primitive Types
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// String
let name: string = 'สมชาย';

// Number  
let age: number = 25;
let price: number = 99.99;

// Boolean
let isActive: boolean = true;

// Array
let skills: string[] = ['React', 'TypeScript'];
let numbers: number[] = [1, 2, 3, 4, 5];

// Null & Undefined
let data: null = null;
let value: undefined = undefined;`}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                  🔀 Union & Literal Types
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// Union Types (หรือ)
let id: string | number = 'user-123';
id = 456; // ได้ทั้งสอง

// Literal Types (ค่าที่แน่นอน)
let status: 'pending' | 'approved' | 'rejected';
status = 'pending'; // ได้
// status = 'invalid'; // Error!

// Optional Properties
let user: {
  name: string;
  age?: number; // optional
} = {
  name: 'สมชาย'
  // age ไม่ใส่ก็ได้
};`}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Alert severity="success" sx={{ mt: 2 }}>
          <Typography variant="body2">
            ✨ <strong>ข้อดีของ TypeScript:</strong> Catch errors เร็วขึ้น, IntelliSense ที่ดี, 
            และ refactor ได้ง่าย!
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Typography variant="h3" sx={{ mb: 3 }}>🏗️ Interface & Types</Typography>
        
        <Typography variant="h5" sx={{ mb: 2 }}>📋 Interface คืออะไร?</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Interface คือการกำหนดโครงสร้างของ object ว่าควรมี properties อะไรบ้าง
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">🏷️ Basic Interface</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// User Interface
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  isActive: boolean;
  createdAt: Date;
}

// การใช้งาน
const user: User = {
  id: 1,
  name: 'สมชาย ใจดี',
  email: 'somchai@example.com',
  role: 'admin',
  isActive: true,
  createdAt: new Date()
};

// Function ที่รับ User
function getUserInfo(user: User): string {
  return \`\${user.name} (\${user.role})\`;
}`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">🔧 Interface Extension</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// Base Interface
interface Person {
  name: string;
  age: number;
}

// Extend Interface
interface Employee extends Person {
  employeeId: string;
  department: string;
  salary: number;
}

// การใช้งาน
const employee: Employee = {
  name: 'สมหญิง',
  age: 28,
  employeeId: 'EMP001',
  department: 'IT',
  salary: 50000
};

// Multiple Extensions
interface Manager extends Employee {
  teamSize: number;
  responsibilities: string[];
}`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">🚀 Advanced Types</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// Generic Types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Utility Types
type PartialUser = Partial<User>; // ทุก property เป็น optional
type RequiredUser = Required<User>; // ทุก property เป็น required
type UserEmail = Pick<User, 'email' | 'name'>; // เลือกเฉพาะ properties
type UserWithoutId = Omit<User, 'id'>; // ยกเว้น properties

// Type Unions
type Theme = 'light' | 'dark';
type Size = 'sm' | 'md' | 'lg' | 'xl';`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Typography variant="h3" sx={{ mb: 3 }}>⚛️ React TypeScript</Typography>
        
        <Typography variant="h5" sx={{ mb: 2 }}>🧩 Component Props</Typography>

        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// Props Interface
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

// Component
function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = ''
}: ButtonProps) {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size} \${className}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// การใช้งาน
<Button variant="primary" size="lg" onClick={() => alert('Hello!')}>
  คลิกที่นี่
</Button>`}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mb: 2 }}>🪝 Hooks with TypeScript</Typography>

        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// useState with Type
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [items, setItems] = useState<string[]>([]);

// useEffect with async
useEffect(() => {
  async function fetchUser() {
    setLoading(true);
    try {
      const response = await fetch('/api/user');
      const userData: User = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  }
  
  fetchUser();
}, []);

// Custom Hook with TypeScript
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}`}
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mb: 2 }}>🔧 Next.js TypeScript Setup</Typography>

        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`}
          </Typography>
        </Box>
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        <Typography variant="h3" sx={{ mb: 3 }}>🎮 ทดลองใช้งาน</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          ทดลองเขียน TypeScript และสร้าง Interface ด้วยตัวอย่างที่หลากหลาย
        </Typography>

        <Stack spacing={4}>
          <TypeScriptDemo />
          <InterfaceBuilder />
        </Stack>
      </TabPanel>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-16"
          variant="outlined"
        >
          บทที่ 16: Advanced Patterns
        </Button>
        
        <Chip 
          label="17 / 18"
          color="primary"
          variant="filled"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-18"
          variant="contained"
        >
          บทที่ 18: Functions & Constants
        </Button>
      </Box>
    </Box>
  );
}