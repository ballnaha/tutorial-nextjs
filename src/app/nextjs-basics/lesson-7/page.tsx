'use client';
import React from 'react';
import {
  Box,
  Typography,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  TextField,
  CircularProgress,
  Stack,
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
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
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
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            fontSize: { xs: '1rem', sm: '1.1rem' }
          }}
        >
          🔢 Counter Demo
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' }, 
          gap: 2, 
          mb: 2 
        }}>
          <Typography 
            variant="h4"
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            {count}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            justifyContent: { xs: 'center', sm: 'flex-start' }
          }}>
            <Button 
              variant="contained" 
              onClick={() => setCount(count + step)}
              size="small"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
            >
              +{step}
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setCount(count - step)}
              size="small"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
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
          fullWidth
          sx={{
            '& .MuiInputBase-input': {
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }
          }}
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
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            fontSize: { xs: '1rem', sm: '1.1rem' }
          }}
        >
          ⏱️ Timer Demo
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            mb: 2, 
            fontFamily: 'monospace',
            textAlign: 'center',
            fontSize: { xs: '2rem', sm: '3rem' }
          }}
        >
          {String(Math.floor(seconds / 60)).padStart(2, '0')}:
          {String(seconds % 60).padStart(2, '0')}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Button 
            variant="contained" 
            onClick={() => setIsRunning(!isRunning)}
            color={isRunning ? 'secondary' : 'primary'}
            size="small"
            sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button 
            variant="outlined" 
            onClick={reset}
            size="small"
            sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
          >
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
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
      ];
      setUsers(mockUsers);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            fontSize: { xs: '1rem', sm: '1.1rem' }
          }}
        >
          📡 Fetch Demo
        </Typography>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {users.length > 0 && !loading && (
          <Stack spacing={1} sx={{ mb: 2 }}>
          {users.map(user => (
              <Box 
                key={user.id}
                sx={{ 
                  p: { xs: 1, sm: 1.5 },
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 1,
                  bgcolor: 'grey.50'
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                >
                  {user.name}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                >
                  {user.email}
                </Typography>
              </Box>
          ))}
          </Stack>
        )}
        
        <Button 
          variant="contained" 
          onClick={fetchUsers}
          disabled={loading}
          fullWidth
          size="small"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          Fetch Users
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
    <Box 
      sx={{ 
        minHeight: '100vh',
        maxWidth: '100vw',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3 }
      }}
    >
      {/* Header */}
      <Box sx={{ py: { xs: 2, sm: 4 } }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            mb: 2, 
            fontWeight: 600,
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          บทที่ 7: React Hooks (useState & useEffect)
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            lineHeight: 1.6,
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
          }}
        >
          เรียนรู้การใช้งาน React Hooks สำหรับจัดการ state และ side effects ใน Next.js 15
        </Typography>
      </Box>

      {/* Learning Objectives */}
      <Card sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        mb: { xs: 3, sm: 4 }, 
        bgcolor: 'primary.light', 
        color: 'primary.contrastText',
        boxShadow: 1 
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          <Lightbulb /> วัตถุประสงค์การเรียนรู้
        </Typography>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle sx={{ fontSize: { xs: 16, sm: 20 } }} />
            <Typography 
              variant="body1"
              sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
            >
              เข้าใจการใช้ useState สำหรับจัดการ state
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle sx={{ fontSize: { xs: 16, sm: 20 } }} />
            <Typography 
              variant="body1"
              sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
            >
              เข้าใจการใช้ useEffect สำหรับ side effects
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle sx={{ fontSize: { xs: 16, sm: 20 } }} />
            <Typography 
              variant="body1"
              sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
            >
              เรียนรู้ dependency arrays และการ cleanup
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircle sx={{ fontSize: { xs: 16, sm: 20 } }} />
            <Typography 
              variant="body1"
              sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
            >
              สร้าง interactive components ด้วย hooks
            </Typography>
          </Stack>
        </Stack>
      </Card>

      {/* What are React Hooks */}
      <Card sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        mb: { xs: 3, sm: 4 },
        boxShadow: 1
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '1.5rem', sm: '2rem' },
            fontWeight: 600
          }}
        >
          🤔 React Hooks คืออะไร?
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3, 
            lineHeight: 1.7,
            fontSize: { xs: '0.95rem', sm: '1rem' }
          }}
        >
          <strong>React Hooks</strong> คือ functions พิเศษที่ให้เราใช้ React features ต่างๆ ได้ใน functional components 
          เช่น state management, lifecycle methods, และอื่นๆ โดยไม่ต้องเขียน class components
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
          gap: { xs: 2, sm: 3 }, 
          mb: 3 
        }}>
          {hookFeatures.map((feature, index) => (
            <Card 
              key={index} 
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                border: '1px solid', 
                borderColor: 'grey.200',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  mr: 2, 
                  color: `${feature.color}.main`,
                  fontSize: { xs: 20, sm: 24 }
                }}>
                    {feature.icon}
                  </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}
                >
                    {feature.title}
                  </Typography>
                </Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  lineHeight: 1.5,
                  fontSize: { xs: '0.85rem', sm: '0.9rem' }
                }}
              >
                  {feature.description}
                </Typography>
            </Card>
          ))}
        </Box>

        <Alert 
          severity="warning" 
          sx={{ 
            mt: 3,
            fontSize: { xs: '0.85rem', sm: '0.9rem' }
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 600, 
              mb: 1,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            ⚠️ กฎสำคัญที่ต้องจำ:
          </Typography>
          <Stack spacing={1}>
            <Typography 
              variant="body2"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
            >
              1. เรียก Hooks ใน top level ของ function เท่านั้น (ไม่ใส่ใน loops, conditions, nested functions)
            </Typography>
            <Typography 
              variant="body2"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
            >
              2. เรียก Hooks ใน React functions เท่านั้น (components หรือ custom hooks)
            </Typography>
            <Typography 
              variant="body2"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
            >
              3. ใช้ 'use client' directive สำหรับ Client Components ใน Next.js 15
            </Typography>
          </Stack>
        </Alert>
      </Card>

      {/* useState Hook */}
      <Card sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        mb: { xs: 3, sm: 4 },
        boxShadow: 1
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '1.5rem', sm: '2rem' },
            fontWeight: 600
          }}
        >
          📦 useState Hook
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3, 
            lineHeight: 1.7,
            fontSize: { xs: '0.95rem', sm: '1rem' }
          }}
        >
          <strong>useState</strong> เป็น Hook สำหรับจัดการ state ใน functional components 
          ช่วยให้เราสามารถเก็บและอัพเดตข้อมูลได้
        </Typography>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            mb: 3,
            '& .MuiTab-root': {
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              minWidth: { xs: 120, sm: 160 }
            }
          }}
        >
          <Tab label="🎯 พื้นฐาน" />
          <Tab label="📊 Demo" />
          <Tab label="🔄 เทคนิค" />
        </Tabs>

        <CustomTabPanel value={tabValue} index={0}>
          <Box className="code-block" sx={{ 
            p: { xs: 2, sm: 3 }, 
            borderRadius: 1, 
            fontFamily: 'monospace', 
            mb: 3,
            bgcolor: 'grey.50',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            overflow: 'auto'
          }}>
            <Typography variant="body2" component="pre">
{`'use client';
import { useState } from 'react';

export default function Counter() {
  // ประกาศ state variable ชื่อ 'count' เริ่มต้นที่ 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        เพิ่ม
      </button>
      <button onClick={() => setCount(count - 1)}>
        ลด
      </button>
      <button onClick={() => setCount(0)}>
        รีเซ็ต
      </button>
    </div>
  );
}`}
            </Typography>
          </Box>

          <Alert 
            severity="info" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.85rem', sm: '0.9rem' }
            }}
          >
            <Typography 
              variant="body2"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
            >
              💡 <strong>useState</strong> คืนค่า array ที่มี 2 elements: [value, setter] 
              ใช้ array destructuring เพื่อเข้าถึง
            </Typography>
          </Alert>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, 
            gap: { xs: 2, sm: 3 } 
          }}>
            <CounterDemo />
            <TimerDemo />
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            🔄 เทคนิคขั้นสูง
          </Typography>
          
          <Box className="code-block" sx={{ 
            p: { xs: 2, sm: 3 }, 
            borderRadius: 1, 
            fontFamily: 'monospace', 
            mb: 3,
            bgcolor: 'grey.50',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            overflow: 'auto'
          }}>
            <Typography variant="body2" component="pre">
{`// ✅ Functional Updates
const [count, setCount] = useState(0);

// ใช้ function เพื่อป้องกัน stale closure
const increment = () => {
  setCount(prevCount => prevCount + 1);
};

// ✅ Object State
const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

const updateName = (newName) => {
    setUser(prevUser => ({
    ...prevUser,  // spread existing properties
    name: newName // update only name
    }));
  };

// ✅ Array State
const [items, setItems] = useState([]);

const addItem = (newItem) => {
  setItems(prevItems => [...prevItems, newItem]);
  };

const removeItem = (id) => {
  setItems(prevItems => 
    prevItems.filter(item => item.id !== id)
  );
};`}
            </Typography>
          </Box>
        </CustomTabPanel>
      </Card>

      {/* useEffect Hook */}
      <Card sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        mb: { xs: 3, sm: 4 },
        boxShadow: 1
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '1.5rem', sm: '2rem' },
            fontWeight: 600
          }}
        >
          ⚡ useEffect Hook
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3, 
            lineHeight: 1.7,
            fontSize: { xs: '0.95rem', sm: '1rem' }
          }}
        >
          <strong>useEffect</strong> เป็น Hook สำหรับจัดการ side effects เช่น API calls, 
          subscriptions, หรือการเปลี่ยนแปลง DOM หลังจากที่ component render
        </Typography>

        <Accordion sx={{ mb: 3 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography 
              variant="h6"
              sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
            >
              🎯 รูปแบบการใช้งาน useEffect
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
        <Box sx={{ 
          display: 'grid', 
              gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, 
              gap: { xs: 2, sm: 3 } 
        }}>
              <Card>
            <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      color: 'primary.main',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    🔄 Run Every Render
              </Typography>
                  <Box className="code-block" sx={{ 
                    p: { xs: 1.5, sm: 2 }, 
                    borderRadius: 1, 
                    fontFamily: 'monospace',
                    bgcolor: 'grey.50',
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    overflow: 'auto'
                  }}>
                <Typography variant="body2" component="pre">
{`useEffect(() => {
  console.log('Rendered');
});`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

              <Card>
            <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      color: 'success.main',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    🎬 Run Once (Mount)
              </Typography>
                  <Box className="code-block" sx={{ 
                    p: { xs: 1.5, sm: 2 }, 
                    borderRadius: 1, 
                    fontFamily: 'monospace',
                    bgcolor: 'grey.50',
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    overflow: 'auto'
                  }}>
                <Typography variant="body2" component="pre">
{`useEffect(() => {
  fetchData();
}, []); // empty dependency`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

              <Card>
            <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      color: 'warning.main',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    👀 Watch Dependencies
              </Typography>
                  <Box className="code-block" sx={{ 
                    p: { xs: 1.5, sm: 2 }, 
                    borderRadius: 1, 
                    fontFamily: 'monospace',
                    bgcolor: 'grey.50',
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    overflow: 'auto'
                  }}>
                <Typography variant="body2" component="pre">
{`useEffect(() => {
  updateTitle(count);
}, [count]); // watch count`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

              <Card>
            <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      color: 'error.main',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    🧹 Cleanup Function
              </Typography>
                  <Box className="code-block" sx={{ 
                    p: { xs: 1.5, sm: 2 }, 
                    borderRadius: 1, 
                    fontFamily: 'monospace',
                    bgcolor: 'grey.50',
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    overflow: 'auto'
                  }}>
                <Typography variant="body2" component="pre">
{`useEffect(() => {
  const timer = setInterval(...);
  return () => clearInterval(timer);
}, []);`}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
          </AccordionDetails>
        </Accordion>

        {/* Demo with useEffect */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' }, 
          gap: { xs: 2, sm: 3 } 
        }}>
          <FetchDemo />
        </Box>
      </Card>

      {/* Best Practices */}
      <Card sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        mb: { xs: 3, sm: 4 }, 
        bgcolor: 'warning.light',
        boxShadow: 1
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2, 
            color: 'warning.dark',
            fontSize: { xs: '1.3rem', sm: '1.5rem' },
            fontWeight: 600
          }}
        >
          💡 Best Practices สำหรับ React Hooks
        </Typography>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <CheckCircle 
              color="success" 
              sx={{ 
                fontSize: { xs: 16, sm: 20 },
                mt: 0.5,
                flexShrink: 0
              }} 
            />
            <Box>
              <Typography 
                variant="body1"
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                ใช้ TypeScript
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
              >
                กำหนด types สำหรับ state และ props เพื่อ type safety
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <CheckCircle 
              color="success" 
              sx={{ 
                fontSize: { xs: 16, sm: 20 },
                mt: 0.5,
                flexShrink: 0
              }} 
            />
            <Box>
              <Typography 
                variant="body1"
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                แยก state ให้เหมาะสม
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
              >
                ไม่ควรรวม state ที่ไม่เกี่ยวข้องกันในตัวแปรเดียว
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <CheckCircle 
              color="success" 
              sx={{ 
                fontSize: { xs: 16, sm: 20 },
                mt: 0.5,
                flexShrink: 0
              }} 
            />
            <Box>
              <Typography 
                variant="body1"
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                ระวัง dependency arrays
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
              >
                ใส่ dependencies ครบถ้วนเพื่อป้องกัน bugs
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <CheckCircle 
              color="success" 
              sx={{ 
                fontSize: { xs: 16, sm: 20 },
                mt: 0.5,
                flexShrink: 0
              }} 
            />
            <Box>
              <Typography 
                variant="body1"
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                ทำ cleanup เสมอ
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
              >
                cleanup intervals, event listeners, subscriptions
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <CheckCircle 
              color="success" 
              sx={{ 
                fontSize: { xs: 16, sm: 20 },
                mt: 0.5,
                flexShrink: 0
              }} 
            />
            <Box>
              <Typography 
                variant="body1"
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                สร้าง Custom Hooks
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
              >
                แยก logic ที่ใช้ซ้ำออกมาเป็น custom hooks
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <CheckCircle 
              color="success" 
              sx={{ 
                fontSize: { xs: 16, sm: 20 },
                mt: 0.5,
                flexShrink: 0
              }} 
            />
            <Box>
              <Typography 
                variant="body1"
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                ใช้ 'use client' ใน Next.js 15
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
              >
                ระบุ Client Components เมื่อใช้ hooks
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Card>

      {/* Success Message */}
      <Card sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        bgcolor: 'success.light', 
        color: 'success.dark',
        mb: { xs: 3, sm: 4 },
        boxShadow: 1
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2,
            fontSize: { xs: '1.3rem', sm: '1.5rem' },
            fontWeight: 600
          }}
        >
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 7 แล้ว
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            lineHeight: 1.6
          }}
        >
          ตอนนี้คุณสามารถใช้ useState และ useEffect เพื่อสร้าง interactive components ได้แล้ว
          พร้อมสำหรับการเรียนรู้ Zod Validation ในบทถัดไป
        </Typography>
        
        <Alert 
          severity="info" 
          sx={{ 
            mb: 3,
            bgcolor: 'info.50',
            border: '1px solid',
            borderColor: 'info.200'
          }}
        >
          <Typography 
            variant="body2"
            sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
          >
            💡 <strong>บทถัดไป:</strong> เรียนรู้ Zod Validation เพื่อตรวจสอบข้อมูลอย่างปลอดภัย
          </Typography>
        </Alert>
      </Card>

      {/* Navigation */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: { xs: 4, sm: 6 },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-6"
          variant="outlined"
          sx={{ 
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            order: { xs: 2, sm: 1 }
          }}
        >
          บทที่ 6: Prisma & Database
        </Button>
        
        <Chip 
          label="7 / 18"
          color="primary"
          variant="outlined"
          sx={{ 
            fontSize: { xs: '0.8rem', sm: '0.85rem' },
            order: { xs: 1, sm: 2 }
          }}
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-8"
          variant="contained"
          color="primary"
          sx={{ 
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            order: { xs: 3, sm: 3 }
          }}
        >
          บทที่ 8: Zod Validation
        </Button>
      </Box>
    </Box>
  );
} 