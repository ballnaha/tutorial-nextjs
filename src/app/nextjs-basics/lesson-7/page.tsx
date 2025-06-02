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
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  PlayArrow,
  ExpandMore,
  Lightbulb,
  Warning,
  Info,
  Refresh,
  Storage,
  Timer,
  Settings,
  BugReport,
  Speed,
  Memory,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

const hookFeatures = [
  {
    title: 'useState',
    description: 'จัดการ state ใน functional components ได้ง่ายและมีประสิทธิภาพ',
    icon: <Storage />,
    color: 'primary'
  },
  {
    title: 'useEffect',
    description: 'จัดการ side effects เช่น API calls, subscriptions, cleanup',
    icon: <Refresh />,
    color: 'secondary'
  },
  {
    title: 'Dependency Array',
    description: 'ควบคุมการ re-run ของ effects ด้วย dependency array',
    icon: <Settings />,
    color: 'info'
  },
  {
    title: 'Performance',
    description: 'Optimize การ render และ prevent unnecessary updates',
    icon: <Speed />,
    color: 'success'
  }
];

// Demo Components
function CounterDemo() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🔢 Counter Demo
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h4">{count}</Typography>
          <Box>
            <Button 
              variant="contained" 
              onClick={() => setCount(count + step)}
              sx={{ mr: 1 }}
            >
              +{step}
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setCount(count - step)}
            >
              -{step}
            </Button>
          </Box>
        </Box>
        <TextField
          label="Step Size"
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          size="small"
        />
      </CardContent>
    </Card>
  );
}

function TimerDemo() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ⏱️ Timer Demo
        </Typography>
        <Typography variant="h3" sx={{ mb: 2, fontFamily: 'monospace' }}>
          {String(Math.floor(seconds / 60)).padStart(2, '0')}:
          {String(seconds % 60).padStart(2, '0')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="contained" 
            onClick={() => setIsRunning(!isRunning)}
            color={isRunning ? 'secondary' : 'primary'}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button variant="outlined" onClick={reset}>
            Reset
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function FetchDemo() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          👥 Fetch Demo
        </Typography>
        
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <CircularProgress size={20} />
            <Typography>Loading users...</Typography>
          </Box>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <List dense>
          {users.map(user => (
            <ListItem key={user.id}>
              <ListItemText 
                primary={user.name} 
                secondary={user.email}
              />
            </ListItem>
          ))}
        </List>
        
        <Button 
          variant="outlined" 
          onClick={fetchUsers}
          disabled={loading}
        >
          Refresh
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Lesson7Page() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          🪝 บทที่ 7: React Hooks (useState & useEffect)
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          เรียนรู้การใช้ React Hooks สำหรับการจัดการ state และ side effects ใน Next.js 15
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Chip label="35 นาที" color="primary" />
          <Chip label="ปานกลาง" color="secondary" />
          <Chip label="สำคัญ" color="warning" />
          <Chip label="Interactive" color="success" />
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
            <ListItemText primary="เข้าใจการใช้ useState สำหรับจัดการ state" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="เข้าใจการใช้ useEffect สำหรับ side effects" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="เรียนรู้ dependency arrays และการ cleanup" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="สร้าง interactive components ด้วย hooks" />
          </ListItem>
        </List>
      </Paper>

      {/* What are React Hooks */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🤔 React Hooks คืออะไร?
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          <strong>React Hooks</strong> เป็นฟังก์ชันพิเศษที่ให้เราสามารถใช้ React features เช่น state และ lifecycle methods 
          ใน functional components ได้ โดยไม่ต้องเขียน class components
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>Next.js 15 + React 19:</strong> Hooks ยังคงเป็นวิธีหลักในการจัดการ state และ side effects 
            พร้อมกับ Server Components และ Client Components
          </Typography>
        </Alert>

        {/* Features Grid */}
        <Typography variant="h6" sx={{ mb: 3 }}>
          🌟 ฟีเจอร์เด่นของ React Hooks:
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
          gap: 3 
        }}>
          {hookFeatures.map((feature, index) => (
            <Card key={index} sx={{ height: '100%' }}>
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
          ))}
        </Box>

        {/* Rules of Hooks */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          📜 กฎของ Hooks:
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
            ⚠️ กฎสำคัญที่ต้องจำ:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="1. เรียก Hooks ใน top level ของ function เท่านั้น (ไม่ใส่ใน loops, conditions, nested functions)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="2. เรียก Hooks ใน React functions เท่านั้น (components หรือ custom hooks)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="3. ใช้ 'use client' directive สำหรับ Client Components ใน Next.js 15" />
            </ListItem>
          </List>
        </Alert>
      </Paper>

      {/* useState Hook */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          📦 useState Hook
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          <code>useState</code> เป็น Hook ที่ใช้สำหรับเพิ่ม state ให้กับ functional components
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Basic Usage" />
          <Tab label="Multiple States" />
          <Tab label="Object State" />
          <Tab label="Array State" />
        </Tabs>

        <CustomTabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            📝 Basic useState Usage
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
            <Typography variant="body2" component="pre">
{`'use client';
import { useState } from 'react';

export default function Counter() {
  // useState hook สำหรับจัดการ state
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>ตัวนับ: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        เพิ่ม (+1)
      </button>
      <button onClick={() => setCount(count - 1)}>
        ลด (-1)
      </button>
      <button onClick={() => setCount(0)}>
        รีเซ็ต
      </button>
    </div>
  );
}`}
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              💡 <strong>useState</strong> returns array: [currentState, setterFunction]
            </Typography>
          </Alert>

          <CounterDemo />
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
            🔢 Multiple State Variables
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
            <Typography variant="body2" component="pre">
{`'use client';
import { useState } from 'react';

export default function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <button type="submit">Submit</button>
      
      {isSubmitted && (
        <div>
          <h3>Submitted Data:</h3>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Age: {age}</p>
        </div>
      )}
    </form>
  );
}`}
            </Typography>
          </Box>

          <Alert severity="success">
            <Typography variant="body2">
              ✅ <strong>Best Practice:</strong> แยก state variables ให้เป็นอิสระจากกัน
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
            📋 Object State
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
            <Typography variant="body2" component="pre">
{`'use client';
import { useState } from 'react';

interface User {
  name: string;
  email: string;
  age: number;
}

export default function UserProfile() {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    age: 0
  });

  const updateUser = (field: keyof User, value: string | number) => {
    setUser(prevUser => ({
      ...prevUser,  // Spread เพื่อรักษา properties อื่นๆ
      [field]: value
    }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={user.age}
        onChange={(e) => updateUser('age', Number(e.target.value))}
      />
      
      <div>
        <h3>Current User:</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}`}
            </Typography>
          </Box>

          <Alert severity="warning">
            <Typography variant="body2">
              ⚠️ <strong>สำคัญ:</strong> ต้องใช้ spread operator (...) เพื่อสร้าง object ใหม่
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={3}>
          <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
            📚 Array State
          </Typography>
          
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 3 }}>
            <Typography variant="body2" component="pre">
{`'use client';
import { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos(prevTodos => [...prevTodos, inputValue]);
      setInputValue('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(prevTodos => prevTodos.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={clearAll}>Clear All</button>
      </div>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
      
      <p>Total todos: {todos.length}</p>
    </div>
  );
}`}
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>Array Methods:</strong> ใช้ filter, map, spread operator สำหรับ immutable updates
            </Typography>
          </Alert>
        </CustomTabPanel>
      </Paper>

      {/* useEffect Hook */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          ⚡ useEffect Hook
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          <code>useEffect</code> ใช้สำหรับจัดการ side effects เช่น API calls, subscriptions, DOM manipulation
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Timer color="primary" />
              <Typography variant="h6">Basic useEffect</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              useEffect พื้นฐาน - รันทุกครั้งที่ component render
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
              <Typography variant="body2" component="pre">
{`'use client';
import { useState, useEffect } from 'react';

export default function BasicEffect() {
  const [count, setCount] = useState(0);

  // รันทุกครั้งที่ component render
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  });

  // รันเฉพาะครั้งแรก (component mount)
  useEffect(() => {
    console.log('Component mounted');
  }, []); // Empty dependency array

  // รันเมื่อ count เปลี่ยน
  useEffect(() => {
    console.log(\`Count changed to: \${count}\`);
  }, [count]); // count ใน dependency array

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
              </Typography>
            </Box>

            <Alert severity="info">
              <Typography variant="body2">
                💡 <strong>Dependency Array:</strong> [] = รันครั้งเดียว, [value] = รันเมื่อ value เปลี่ยน, ไม่มี = รันทุกครั้ง
              </Typography>
            </Alert>

            <TimerDemo />
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Refresh color="secondary" />
              <Typography variant="h6">API Calls with useEffect</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การใช้ useEffect สำหรับดึงข้อมูลจาก API
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
              <Typography variant="body2" component="pre">
{`'use client';
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const userData = await response.json();
        setUsers(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // รันครั้งเดียวเมื่อ component mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}`}
              </Typography>
            </Box>

            <Alert severity="success">
              <Typography variant="body2">
                ✅ <strong>Best Practice:</strong> จัดการ loading และ error states เสมอ
              </Typography>
            </Alert>

            <FetchDemo />
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <BugReport color="warning" />
              <Typography variant="h6">Cleanup Functions</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ mb: 2 }}>
              การทำความสะอาด (cleanup) เพื่อป้องกัน memory leaks
            </Typography>
            
            <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
              <Typography variant="body2" component="pre">
{`'use client';
import { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }

    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div>
      <div>{seconds}s</div>
      <button onClick={toggle}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`}
              </Typography>
            </Box>

            <Alert severity="warning">
              <Typography variant="body2">
                ⚠️ <strong>สำคัญ:</strong> ทำ cleanup เสมอเพื่อป้องกัน memory leaks
              </Typography>
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* Common Patterns */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🎯 Common Patterns & Best Practices
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
          gap: 3 
        }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                💡 Custom Hooks
              </Typography>
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
                <Typography variant="body2" component="pre">
{`// hooks/useCounter.ts
import { useState } from 'react';

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return {
    count,
    increment,
    decrement,
    reset
  };
}

// Usage
export default function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                🔄 Async useEffect
              </Typography>
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
                <Typography variant="body2" component="pre">
{`// ❌ ไม่ถูกต้อง
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);

// ✅ ถูกต้อง
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    }
  };

  fetchData();
}, []);`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
                🎛️ Conditional Effects
              </Typography>
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
                <Typography variant="body2" component="pre">
{`export default function ConditionalEffect() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // รันเมื่อมี user เท่านั้น
  useEffect(() => {
    if (user) {
      fetch(\`/api/users/\${user.id}/posts\`)
        .then(res => res.json())
        .then(setPosts);
    }
  }, [user]);

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <ul>
            {posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                📱 Event Listeners
              </Typography>
              <Box className="code-block" sx={{ p: 2, borderRadius: 1, fontFamily: 'monospace', mb: 2 }}>
                <Typography variant="body2" component="pre">
{`export default function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // empty dependency - run once

  return (
    <div>
      <h2>ขนาดหน้าต่างเบราว์เซอร์</h2>
      <p>ความกว้าง: {windowSize.width}px</p>
      <p>ความสูง: {windowSize.height}px</p>
      <p>ลองปรับขนาดหน้าต่างดู!</p>
    </div>
  );
}`}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Paper>

      {/* Best Practices */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'warning.light' }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'warning.dark' }}>
          💡 Best Practices สำหรับ React Hooks
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ TypeScript"
              secondary="กำหนด types สำหรับ state และ props เพื่อ type safety"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="แยก state ให้เหมาะสม"
              secondary="ไม่ควรรวม state ที่ไม่เกี่ยวข้องกันในตัวแปรเดียว"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ระวัง dependency arrays"
              secondary="ใส่ dependencies ครบถ้วนเพื่อป้องกัน bugs"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ทำ cleanup เสมอ"
              secondary="cleanup intervals, event listeners, subscriptions"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="สร้าง Custom Hooks"
              secondary="แยก logic ที่ใช้ซ้ำออกมาเป็น custom hooks"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ 'use client' ใน Next.js 15"
              secondary="ระบุ Client Components เมื่อใช้ hooks"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Navigation */}
      <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.dark' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 7 แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          ตอนนี้คุณสามารถใช้ useState และ useEffect เพื่อสร้าง interactive components ได้แล้ว
          พร้อมสำหรับการเรียนรู้ Zod Validation ในบทถัดไป
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>บทถัดไป:</strong> เรียนรู้ Zod Validation เพื่อตรวจสอบข้อมูลอย่างปลอดภัย
          </Typography>
        </Alert>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-6"
          variant="outlined"
        >
          บทที่ 6: Prisma & Database
        </Button>
        
        <Chip 
          label="7 / 16"
          color="primary"
          variant="outlined"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-8"
          variant="contained"
          color="primary"
        >
          บทที่ 8: Zod Validation
        </Button>
      </Box>
    </Container>
  );
} 