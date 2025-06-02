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
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Warning,
  Functions,
  PlayArrow,
  Lightbulb,
  Code,
  Build,
  Speed,
  ExpandMore,
  Psychology,
  Engineering,
  Settings,
  DataObject,
  Memory,
  Star,
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
function FunctionDemo() {
  const [selectedType, setSelectedType] = useState<string>('regular');
  const [inputValue, setInputValue] = useState<string>('Hello World');
  const [result, setResult] = useState<string>('');

  const functionExamples = {
    regular: {
      title: 'Regular Function',
      description: 'Function แบบปกติที่มี hoisting',
      code: `// Regular Function Declaration
function greetUser(name) {
  return \`สวัสดี \${name}!\`;
}

// Function Expression
const greetUser2 = function(name) {
  return \`สวัสดี \${name}!\`;
};

// การใช้งาน
greetUser('สมชาย'); // "สวัสดี สมชาย!"`,
      demo: (input: string) => `สวัสดี ${input}!`
    },
    arrow: {
      title: 'Arrow Function',
      description: 'Function แบบ => สั้น กระชับ ไม่มี this binding',
      code: `// Arrow Function แบบสั้น
const greet = (name) => \`สวัสดี \${name}!\`;

// Arrow Function แบบยาว
const greetWithTime = (name) => {
  const time = new Date().toLocaleTimeString('th-TH');
  return \`สวัสดี \${name}! เวลา \${time}\`;
};

// Arrow Function ไม่มี parameter
const getCurrentTime = () => new Date().toLocaleTimeString('th-TH');

// การใช้งาน
greet('สมหญิง'); // "สวัสดี สมหญิง!"`,
      demo: (input: string) => `สวัสดี ${input}! (Arrow Function)`
    },
    async: {
      title: 'Async Function',
      description: 'Function ที่ทำงานแบบ asynchronous',
      code: `// Async Function
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Async Arrow Function
const fetchUser = async (id) => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
};

// การใช้งาน
const user = await fetchUserData(123);`,
      demo: (input: string) => `กำลังโหลดข้อมูล: ${input}... (Async)`
    },
    higher: {
      title: 'Higher-Order Function',
      description: 'Function ที่รับหรือคืน function อื่น',
      code: `// Higher-Order Function
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

// การใช้งาน
const double = createMultiplier(2);
const triple = createMultiplier(3);

double(5); // 10
triple(5); // 15

// Array Methods (Higher-Order Functions)
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]`,
      demo: (input: string) => `Processed: ${input.toUpperCase()} (Higher-Order)`
    }
  };

  const currentExample = functionExamples[selectedType as keyof typeof functionExamples];

  const runDemo = () => {
    setResult(currentExample.demo(inputValue));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🎯 Function Types Demo
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          {Object.entries(functionExamples).map(([key, example]) => (
            <Button
              key={key}
              variant={selectedType === key ? 'contained' : 'outlined'}
              onClick={() => setSelectedType(key)}
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
              <Functions />
            </Avatar>
            <Box>
              <Typography variant="h6">{currentExample.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {currentExample.description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2, bgcolor: 'grey.900', borderRadius: 1, mb: 2 }}>
            <Typography 
              variant="body2" 
              component="pre" 
              className="code-block"
              sx={{ p: 2 }}
            >
              {currentExample.code}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
            <TextField
              label="ทดสอบ Input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              size="small"
              sx={{ flex: 1 }}
            />
            <Button 
              variant="contained" 
              onClick={runDemo}
              startIcon={<PlayArrow />}
            >
              ทดสอบ
            </Button>
          </Box>

          {result && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>ผลลัพธ์:</strong> {result}
              </Typography>
            </Alert>
          )}
        </Paper>
      </CardContent>
    </Card>
  );
}

function ConstantDemo() {
  const [showScope, setShowScope] = useState<boolean>(false);
  const [constType, setConstType] = useState<string>('primitive');

  const constantExamples = {
    primitive: {
      title: 'Primitive Constants',
      description: 'ค่าคงที่แบบพื้นฐาน',
      code: `// String Constants
const APP_NAME = 'My Next.js App';
const API_URL = 'https://api.example.com';
const VERSION = '1.0.0';

// Number Constants
const MAX_ITEMS = 100;
const DEFAULT_TIMEOUT = 5000;
const PI = 3.14159;

// Boolean Constants
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const ENABLE_LOGGING = true;

// การใช้งาน
console.log(\`Welcome to \${APP_NAME} v\${VERSION}\`);
if (IS_PRODUCTION) {
  console.log('Running in production mode');
}`
    },
    object: {
      title: 'Object Constants',
      description: 'Object และ Array ที่เป็น const',
      code: `// Object Constants
const CONFIG = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3
  },
  ui: {
    theme: 'dark',
    language: 'th'
  }
} as const; // as const = ทำให้เป็น readonly

// Array Constants
const SUPPORTED_LANGUAGES = ['th', 'en', 'zh'] as const;
const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const;

// การใช้งาน
fetch(\`\${CONFIG.api.baseUrl}/users\`);
console.log(SUPPORTED_LANGUAGES[0]); // 'th'`
    },
    enum: {
      title: 'Enum Constants',
      description: 'กลุ่มค่าคงที่ที่เกี่ยวข้องกัน',
      code: `// Enum Constants
const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
} as const;

const OrderStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const;

// Type จาก Enum
type UserRoleType = typeof UserRole[keyof typeof UserRole];
type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

// การใช้งาน
function checkUserPermission(role: UserRoleType) {
  return role === UserRole.ADMIN;
}`
    },
    environment: {
      title: 'Environment Constants',
      description: 'ค่าคงที่จาก environment variables',
      code: `// Environment Constants
const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
} as const;

// Validation
if (!ENV.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

// การใช้งาน
const apiClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000
});

// สำหรับ Client-side ใช้ NEXT_PUBLIC_ prefix
console.log('API URL:', ENV.API_URL);`
    }
  };

  const currentExample = constantExamples[constType as keyof typeof constantExamples];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          📊 Constants & Scope Demo
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          {Object.entries(constantExamples).map(([key, example]) => (
            <Button
              key={key}
              variant={constType === key ? 'contained' : 'outlined'}
              onClick={() => setConstType(key)}
              sx={{ mr: 1, mb: 1 }}
              size="small"
            >
              {example.title}
            </Button>
          ))}
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={showScope}
              onChange={(e) => setShowScope(e.target.checked)}
            />
          }
          label="แสดง Scope Examples"
          sx={{ mb: 2 }}
        />

        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <Memory />
            </Avatar>
            <Box>
              <Typography variant="h6">{currentExample.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {currentExample.description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2, bgcolor: 'grey.900', borderRadius: 1, mb: 2 }}>
            <Typography 
              variant="body2" 
              component="pre" 
              className="code-block"
              sx={{ p: 2 }}
            >
              {currentExample.code}
            </Typography>
          </Box>

          {showScope && (
            <Box sx={{ p: 2, bgcolor: 'warning.50', borderRadius: 1, border: '1px solid', borderColor: 'warning.200' }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'warning.dark' }}>
                🔍 Variable Scope Examples:
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.900', borderRadius: 1 }}>
                <Typography 
                  variant="body2" 
                  component="pre" 
                  className="code-block"
                  sx={{ p: 2 }}
                >
{`// Global Scope
const GLOBAL_CONFIG = { theme: 'dark' };

function demonstrateScope() {
  // Function Scope
  const functionVariable = 'ใน function';
  
  if (true) {
    // Block Scope
    const blockVariable = 'ใน block';
    let mutableBlock = 'เปลี่ยนได้';
    
    console.log(GLOBAL_CONFIG); // ✅ เข้าถึงได้
    console.log(functionVariable); // ✅ เข้าถึงได้
    console.log(blockVariable); // ✅ เข้าถึงได้
  }
  
  // console.log(blockVariable); // ❌ Error! ไม่เข้าถึงได้
  console.log(functionVariable); // ✅ เข้าถึงได้
}

// const vs let vs var
const immutable = 'ไม่เปลี่ยน'; // ไม่สามารถ reassign
let mutable = 'เปลี่ยนได้'; // สามารถ reassign
var oldStyle = 'แบบเก่า'; // function scope (หลีกเลี่ยง)`}
                </Typography>
              </Box>
            </Box>
          )}

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              💡 <strong>คำแนะนำ:</strong> ใช้ const เป็นค่าเริ่มต้น, ใช้ let เมื่อต้องเปลี่ยนค่า, หลีกเลี่ยง var
            </Typography>
          </Alert>
        </Paper>
      </CardContent>
    </Card>
  );
}

export default function Lesson18Page() {
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
            <Functions color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 18: Functions & Constants อย่างละเอียด
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การเขียน Functions และการใช้ Constants 
            ใน JavaScript/TypeScript อย่างถูกต้องและมีประสิทธิภาพ! ⚡
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Functions />} label="Functions" color="primary" />
            <Chip icon={<Memory />} label="Constants" color="secondary" />
            <Chip icon={<Code />} label="Arrow Functions" color="success" />
            <Chip icon={<Engineering />} label="Scope" color="warning" />
            <Chip icon={<Speed />} label="Performance" color="error" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> เข้าใจ Functions และ Constants อย่างลึกซึ้ง
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 45 นาที | 
              📊 <strong>ระดับ:</strong> พื้นฐานที่สำคัญ
            </Typography>
          </Alert>

          {/* What are Functions */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.50', border: '2px solid', borderColor: 'primary.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="primary" /> 🤔 Functions & Constants คืออะไร?
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              ลองนึกภาพว่าคุณเป็น <strong>เชฟในครัว</strong>:
            </Typography>

            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 👨‍🍳 <strong>Functions:</strong> สูตรอาหารที่ทำซ้ำได้ (รับวัตถุดิบ → ปรุง → ได้อาหาร)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 📋 <strong>Constants:</strong> ส่วนผสมที่ไม่เปลี่ยน (เกลือ = เกลือ เสมอ)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🔄 <strong>Variables:</strong> ส่วนผสมที่เปลี่ยนได้ (น้ำตาลมากน้อยตามใจ)
              </Typography>
              <Typography variant="body2">
                • 🏠 <strong>Scope:</strong> ขอบเขตครัว (ใครเข้าห้องไหนได้บ้าง)
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> โค้ดที่ใช้ซ้ำได้, จัดการง่าย, และมีประสิทธิภาพ!
              </Typography>
            </Alert>
          </Paper>
        </Box>

        {/* Learning Objectives */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle color="primary" /> 🎯 เมื่อเรียนจบบทนี้ คุณจะสามารถ:
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เขียน Functions ทุกแบบ" 
                    secondary="Regular, Arrow, Async, Higher-Order"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="จัดการ Constants ถูกต้อง" 
                    secondary="Primitive, Object, Enum Constants"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เข้าใจ Scope & Hoisting" 
                    secondary="Global, Function, Block Scope"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ใช้ Modern JavaScript" 
                    secondary="ES6+, Destructuring, Spread"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Performance Optimization" 
                    secondary="Memoization, Pure Functions"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Best Practices" 
                    secondary="Clean Code, Naming, Testing"
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
              label="⚡ Function Types" 
              icon={<Functions />}
              iconPosition="start"
            />
            <Tab 
              label="📊 Constants & Scope" 
              icon={<Memory />}
              iconPosition="start"
            />
            <Tab 
              label="🚀 Advanced Functions" 
              icon={<Psychology />}
              iconPosition="start"
            />
            <Tab 
              label="⚛️ React Functions" 
              icon={<Code />}
              iconPosition="start"
            />
            <Tab 
              label="🎮 ทดลองใช้งาน" 
              icon={<PlayArrow />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: Function Types */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>⚡ Function Types</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            เรียนรู้ Functions ทุกแบบที่ใช้ใน JavaScript และ TypeScript
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 การประกาศ Functions</Typography>
          
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">📝 Function Declaration</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// Function Declaration (มี hoisting)
function calculateArea(width, height) {
  return width * height;
}

// สามารถเรียกใช้ก่อนประกาศได้
console.log(calculateArea(5, 10)); // 50

// Function Expression (ไม่มี hoisting)
const calculatePerimeter = function(width, height) {
  return 2 * (width + height);
};

// Named Function Expression
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};

// การใช้งาน
calculateArea(5, 3); // 15
calculatePerimeter(5, 3); // 16
factorial(5); // 120`}
                </Typography>
              </Box>
              <Alert severity="info">
                <Typography variant="body2">
                  💡 Function Declaration มี hoisting ทำให้เรียกใช้ก่อนประกาศได้
                </Typography>
              </Alert>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">🏹 Arrow Functions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// Arrow Function แบบสั้น
const add = (a, b) => a + b;
const square = x => x * x; // parameter เดียวไม่ต้องมีวงเล็บ
const greet = () => "Hello!"; // ไม่มี parameter

// Arrow Function แบบยาว
const processUser = (user) => {
  const fullName = \`\${user.firstName} \${user.lastName}\`;
  const age = calculateAge(user.birthDate);
  return { fullName, age };
};

// Arrow Function กับ Object Return
const createUser = (name, email) => ({
  id: Date.now(),
  name,
  email,
  createdAt: new Date()
});

// Arrow Function ใน Array Methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens); // [2, 4]
console.log(sum); // 15`}
                </Typography>
              </Box>
              <Alert severity="success">
                <Typography variant="body2">
                  ✅ Arrow Functions สั้น กระชับ และไม่มี this binding
                </Typography>
              </Alert>
            </AccordionDetails>
          </Accordion>
        </TabPanel>

        {/* Tab 2: Constants & Scope */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>📊 Constants & Scope</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>🔒 const vs let vs var</Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                    🟢 const (แนะนำ)
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                    <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// ค่าคงที่ - ไม่สามารถ reassign
const PI = 3.14159;
const APP_NAME = 'My App';
const API_URL = 'https://api.example.com';

// Object/Array ใน const เปลี่ยนเนื้อหาได้
const user = { name: 'John' };
user.name = 'Jane'; // ✅ ได้
user.age = 25; // ✅ ได้

const numbers = [1, 2, 3];
numbers.push(4); // ✅ ได้
// numbers = [5, 6, 7]; // ❌ Error!

// Block scope
if (true) {
  const blockVar = 'ใน block';
  console.log(blockVar); // ✅
}
// console.log(blockVar); // ❌ Error!`}
                    </Typography>
                  </Box>
                  <Alert severity="success" sx={{ fontSize: '0.8rem' }}>
                    ✅ ใช้เป็นค่าเริ่มต้น, ป้องกัน reassign
                  </Alert>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
                    🟡 let (เมื่อต้องเปลี่ยนค่า)
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                    <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// ตัวแปรที่เปลี่ยนค่าได้
let counter = 0;
let userName = 'guest';
let isLoading = false;

// สามารถ reassign ได้
counter = 1;
counter += 1;
userName = 'admin';

// Block scope
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
// console.log(i); // ❌ Error!

// ใช้ใน conditions
let status;
if (user.isActive) {
  status = 'active';
} else {
  status = 'inactive';
}`}
                    </Typography>
                  </Box>
                  <Alert severity="warning" sx={{ fontSize: '0.8rem' }}>
                    ⚠️ ใช้เมื่อจำเป็นต้องเปลี่ยนค่า
                  </Alert>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>🌍 Scope Examples</Typography>
          
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// Global Scope
const GLOBAL_CONFIG = { theme: 'dark', lang: 'th' };

function demonstrateScope() {
  // Function Scope
  const functionVariable = 'ใน function';
  let mutableVar = 'เปลี่ยนได้';
  
  if (true) {
    // Block Scope  
    const blockVariable = 'ใน block';
    let blockMutable = 'เปลี่ยนได้ใน block';
    
    // เข้าถึงได้ทั้งหมด
    console.log(GLOBAL_CONFIG); // ✅
    console.log(functionVariable); // ✅
    console.log(blockVariable); // ✅
    
    mutableVar = 'เปลี่ยนแล้ว'; // ✅
  }
  
  console.log(functionVariable); // ✅
  console.log(mutableVar); // ✅ 'เปลี่ยนแล้ว'
  // console.log(blockVariable); // ❌ Error!
}

// Closure Example
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter = createCounter();
console.log(counter.getValue()); // 0
counter.increment();
console.log(counter.getValue()); // 1`}
            </Typography>
          </Box>
        </TabPanel>

        {/* Tab 3: Advanced Functions */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>🚀 Advanced Functions</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>🔄 Higher-Order Functions</Typography>

          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// Function ที่รับ function เป็น parameter
function withLogging(fn) {
  return function(...args) {
    console.log(\`Calling \${fn.name} with args:\`, args);
    const result = fn(...args);
    console.log(\`Result:\`, result);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3); // จะ log การทำงาน

// Function ที่สร้าง function อื่น
function createValidator(rules) {
  return function(data) {
    return rules.every(rule => rule(data));
  };
}

const userValidator = createValidator([
  user => user.name && user.name.length > 0,
  user => user.email && user.email.includes('@'),
  user => user.age && user.age >= 18
]);

userValidator({ name: 'John', email: 'john@example.com', age: 25 }); // true

// Curry Function
const multiply = (a) => (b) => a * b;
const double = multiply(2);
const triple = multiply(3);

double(5); // 10
triple(5); // 15`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>⚡ Async Functions</Typography>

          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre" className="code-block" sx={{ p: 2 }}>
{`// Basic Async Function
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Async Arrow Function
const fetchMultipleUsers = async (userIds) => {
  const promises = userIds.map(id => fetchUserData(id));
  const users = await Promise.all(promises);
  return users;
};

// Sequential vs Parallel
async function sequentialFetch() {
  const user1 = await fetchUserData(1); // รอ
  const user2 = await fetchUserData(2); // รอ
  return [user1, user2];
}

async function parallelFetch() {
  const [user1, user2] = await Promise.all([
    fetchUserData(1), // ทำงานพร้อมกัน
    fetchUserData(2)  // ทำงานพร้อมกัน
  ]);
  return [user1, user2];
}

// Error Handling
async function safeApiCall(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return { error: error.message, data: null };
  }
}`}
            </Typography>
          </Box>
        </TabPanel>

        {/* Tab 4: React Functions */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>⚛️ React Functions</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>🎣 Function Components & Hooks</Typography>

          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre" className="code-block">
{`// Function Component
function UserProfile({ user, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // Event Handlers
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user);
  };
  
  const handleSave = async () => {
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  // Render functions
  const renderViewMode = () => (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={handleEdit}>แก้ไข</button>
    </div>
  );

  const renderEditMode = () => (
    <form onSubmit={handleSave}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <button type="submit">บันทึก</button>
      <button type="button" onClick={handleCancel}>ยกเลิก</button>
    </form>
  );

  return isEditing ? renderEditMode() : renderViewMode();
}

// Custom Hook
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}`}
            </Typography>
          </Box>
        </TabPanel>

        {/* Tab 5: Interactive Demo */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎮 ทดลองใช้งาน</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            ทดลองใช้ Functions และ Constants ด้วยตัวอย่างที่หลากหลาย
          </Typography>

          <Stack spacing={4}>
            <FunctionDemo />
            <ConstantDemo />
          </Stack>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/nextjs-basics/lesson-17"
            variant="outlined"
          >
            บทที่ 17: TypeScript & Interface
          </Button>
          
          <Chip 
            label="18 / 18"
            color="success"
            variant="filled"
          />
          
          <Button
            endIcon={<Star />}
            component={Link}
            href="/nextjs-basics"
            variant="contained"
            color="success"
          >
            เสร็จสมบูรณ์!
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 