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
  CircularProgress,
  Tooltip,
  Grid,
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
  Architecture,
  PlayArrow,
  Lightbulb,
  Timer,
  Refresh,
  Security,
  BugReport,
  TrendingUp,
  Code,
  Build,
  Speed,
  CheckBox,
  ExpandMore,
  Star,
  AutoFixHigh,
  Psychology,
  Engineering,
  Settings,
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
interface Pattern {
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  useCase: string;
  pros: string[];
  cons: string[];
}

function PatternComparison() {
  const [selectedPattern, setSelectedPattern] = useState<string>('compound-component');
  
  const patterns: Record<string, Pattern> = {
    'compound-component': {
      name: 'Compound Component Pattern',
      description: 'Components ที่ทำงานร่วมกันเป็นกลุ่ม เหมือนชิ้นส่วนของตัวต่อ',
      difficulty: 'medium',
      useCase: 'Modal, Dropdown, Tabs ที่มี sub-components',
      pros: ['ใช้งานยืดหยุ่น', 'แยกส่วนชัดเจน', 'Re-usable สูง'],
      cons: ['ซับซ้อนขึ้น', 'ต้องเข้าใจ Context']
    },
    'render-props': {
      name: 'Render Props Pattern',
      description: 'ส่ง function เป็น prop เพื่อแชร์ logic ระหว่าง components',
      difficulty: 'hard',
      useCase: 'Data fetching, Mouse tracking, Form handling',
      pros: ['แชร์ logic ได้ดี', 'ยืดหยุ่นสูง', 'Testable'],
      cons: ['Callback hell', 'ยากต่อการอ่าน']
    },
    'custom-hooks': {
      name: 'Custom Hooks Pattern',
      description: 'แยก logic ออกมาเป็น hook ที่ใช้ซ้ำได้',
      difficulty: 'easy',
      useCase: 'API calls, Form validation, Local storage',
      pros: ['ง่ายต่อการใช้', 'Reusable', 'Testable'],
      cons: ['อาจ over-abstract', 'ต้องรู้ rules of hooks']
    },
    'hoc': {
      name: 'Higher-Order Component (HOC)',
      description: 'Function ที่รับ component และ return component ใหม่',
      difficulty: 'hard',
      useCase: 'Authentication, Logging, Theme wrapping',
      pros: ['Reusable logic', 'Separation of concerns'],
      cons: ['Wrapper hell', 'Props collision', 'Debugging ยาก']
    }
  };

  const currentPattern = patterns[selectedPattern];
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🧩 Design Patterns Comparison
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          {Object.entries(patterns).map(([key, pattern]) => (
            <Button
              key={key}
              variant={selectedPattern === key ? 'contained' : 'outlined'}
              onClick={() => setSelectedPattern(key)}
              sx={{ mr: 1, mb: 1 }}
              size="small"
            >
              {pattern.name.split(' ')[0]}
            </Button>
          ))}
        </Box>

        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Psychology />
            </Avatar>
            <Box>
              <Typography variant="h6">{currentPattern.name}</Typography>
              <Chip 
                label={currentPattern.difficulty.toUpperCase()} 
                color={getDifficultyColor(currentPattern.difficulty) as any}
                size="small"
              />
            </Box>
          </Box>

          <Typography variant="body2" sx={{ mb: 2 }}>
            {currentPattern.description}
          </Typography>
          
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            🎯 Use Case:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
            {currentPattern.useCase}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'success.main' }}>
                ✅ ข้อดี:
              </Typography>
              <List dense>
                {currentPattern.pros.map((pro, index) => (
                  <ListItem key={index} sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <CheckCircle color="success" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={pro}
                      primaryTypographyProps={{ fontSize: '0.85rem' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'error.main' }}>
                ⚠️ ข้อเสีย:
              </Typography>
              <List dense>
                {currentPattern.cons.map((con, index) => (
                  <ListItem key={index} sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <Warning color="error" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={con}
                      primaryTypographyProps={{ fontSize: '0.85rem' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            💡 <strong>เลือก Pattern ยังไง?</strong> เริ่มจาก Custom Hooks ก่อน (ง่ายที่สุด) 
            แล้วค่อยไป Compound Components เมื่อต้องการความยืดหยุ่นมากขึ้น
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
}

function BestPracticesChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  
  const practices = [
    { id: 'folder-structure', category: 'โครงสร้าง', text: 'จัดโฟลเดอร์แบบ feature-based', impact: 'high' },
    { id: 'typescript', category: 'Type Safety', text: 'ใช้ TypeScript อย่างเต็มที่', impact: 'high' },
    { id: 'error-boundaries', category: 'Error Handling', text: 'ใส่ Error Boundaries', impact: 'high' },
    { id: 'loading-states', category: 'UX', text: 'มี Loading states ทุกที่', impact: 'medium' },
    { id: 'seo', category: 'SEO', text: 'ใส่ meta tags และ structured data', impact: 'high' },
    { id: 'performance', category: 'Performance', text: 'ใช้ Next.js Image และ dynamic imports', impact: 'high' },
    { id: 'testing', category: 'Testing', text: 'เขียน tests สำหรับ critical paths', impact: 'medium' },
    { id: 'env-vars', category: 'Security', text: 'เก็บ secrets ใน environment variables', impact: 'high' },
    { id: 'code-review', category: 'Team', text: 'ทำ code review ก่อน merge', impact: 'medium' },
    { id: 'monitoring', category: 'Production', text: 'ตั้ง error monitoring', impact: 'medium' },
  ];

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const completionRate = (checkedItems.size / practices.length) * 100;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ✅ Production-Ready Checklist
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2">ความพร้อมสำหรับ Production</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {Math.round(completionRate)}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={completionRate}
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                bgcolor: completionRate === 100 ? 'success.main' : 'primary.main'
              }
            }}
          />
        </Box>

        <Stack spacing={1}>
          {practices.map((practice) => (
            <Card 
              key={practice.id}
              variant="outlined"
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.2s',
                bgcolor: checkedItems.has(practice.id) ? 'success.50' : 'transparent',
                borderColor: checkedItems.has(practice.id) ? 'success.main' : 'divider',
                '&:hover': {
                  bgcolor: checkedItems.has(practice.id) ? 'success.100' : 'grey.50'
                }
              }}
              onClick={() => toggleCheck(practice.id)}
            >
              <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckBox 
                    color={checkedItems.has(practice.id) ? 'success' : 'disabled'}
                    sx={{ fontSize: 20 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {practice.text}
                    </Typography>
                  </Box>
                  <Chip 
                    label={practice.category} 
                    size="small" 
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                  <Chip 
                    label={practice.impact}
                    size="small"
                    color={getImpactColor(practice.impact) as any}
                    sx={{ fontSize: '0.7rem', minWidth: 60 }}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {completionRate === 100 && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              🎉 <strong>ยินดีด้วย!</strong> โปรเจคของคุณพร้อมสำหรับ Production แล้ว!
            </Typography>
          </Alert>
        )}

        {completionRate < 70 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              ⚠️ <strong>คำแนะนำ:</strong> ควรทำให้ครบอย่างน้อย 70% ก่อนเอาขึ้น Production
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default function Lesson16Page() {
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
            <Architecture color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 16: Advanced Patterns & Best Practices
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้รูปแบบการเขียนโค้ดขั้นสูงและแนวทางปฏิบัติที่ดี 
            เพื่อสร้างแอปพลิเคชันที่มีคุณภาพระดับมืออาชีพ! 🎯
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Psychology />} label="Design Patterns" color="primary" />
            <Chip icon={<Engineering />} label="Architecture" color="secondary" />
            <Chip icon={<BugReport />} label="Error Handling" color="error" />
            <Chip icon={<Speed />} label="Performance" color="success" />
            <Chip icon={<Security />} label="Security" color="warning" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> ยกระดับโค้ดของคุณให้เป็นมืออาชีพ
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 60 นาที | 
              📊 <strong>ระดับ:</strong> ขั้นสูงสำหรับมือใหม่
            </Typography>
          </Alert>

          {/* What are Advanced Patterns */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.50', border: '2px solid', borderColor: 'primary.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="primary" /> 🤔 Advanced Patterns คืออะไร? (อธิบายแบบง่ายๆ)
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              ลองนึกภาพว่าคุณเป็น <strong>สถาปนิกที่ออกแบบบ้าน</strong>:
            </Typography>

            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🏠 <strong>บ้านธรรมดา:</strong> แค่มีห้อง ๆ โดยไม่คิดการใช้งาน (โค้ดพื้นฐาน)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🏛️ <strong>บ้านที่ออกแบบดี:</strong> มี patterns และหลักการ (Advanced Patterns)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🔧 <strong>Best Practices:</strong> วิธีการก่อสร้างที่ถูกต้อง ปลอดภัย
              </Typography>
              <Typography variant="body2">
                • 📏 <strong>Standards:</strong> มาตรฐานที่ทำให้บ้านอยู่ได้นาน ๆ
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> โค้ดที่เข้าใจง่าย บำรุงรักษาได้ ขยายได้ และทำงานได้เสถียร!
              </Typography>
            </Alert>
          </Paper>
        </Box>

        {/* Learning Objectives */}
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
                    primary="ใช้ Design Patterns สำคัญ" 
                    secondary="Compound Component, Custom Hooks, etc."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="จัดโครงสร้างโปรเจค" 
                    secondary="แบบ scalable และ maintainable"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Handle Errors อย่างมืออาชีพ" 
                    secondary="Error Boundaries, Graceful degradation"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เขียนโค้ดที่ Production-ready" 
                    secondary="Performance, Security, Monitoring"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ทำ Code Review ได้" 
                    secondary="รู้จักมาตรฐานการเขียนโค้ดที่ดี"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="วางแผน Architecture" 
                    secondary="สำหรับโปรเจคขนาดใหญ่"
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
              label="🧩 Design Patterns" 
              icon={<Psychology />}
              iconPosition="start"
            />
            <Tab 
              label="🏗️ Architecture" 
              icon={<Engineering />}
              iconPosition="start"
            />
            <Tab 
              label="🚨 Error Handling" 
              icon={<BugReport />}
              iconPosition="start"
            />
            <Tab 
              label="🎯 Production Tips" 
              icon={<Star />}
              iconPosition="start"
            />
            <Tab 
              label="🎮 ทดลองใช้งาน" 
              icon={<PlayArrow />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: Design Patterns */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>🧩 Design Patterns</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            รูปแบบการเขียนโค้ดที่ช่วยให้การพัฒนาเป็นไปอย่างมีประสิทธิภาพ
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎨 Patterns สำคัญที่ควรรู้</Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    🔧 Custom Hooks Pattern
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    แยก logic ออกมาเป็น hook ที่ใช้ซ้ำได้
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`// useApi.ts
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
                  <Alert severity="success" sx={{ fontSize: '0.8rem' }}>
                    ✅ ใช้ในหลาย component ได้, เทสต์ง่าย
                  </Alert>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                    🧱 Compound Component
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Components ที่ทำงานร่วมกันเป็นกลุ่ม
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`// Modal.tsx
export function Modal({ children }) {
  return <div className="modal">{children}</div>;
}

Modal.Header = ({ children }) => (
  <div className="modal-header">{children}</div>
);

Modal.Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

// การใช้งาน
<Modal>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
</Modal>`}
                    </Typography>
                  </Box>
                  <Alert severity="info" sx={{ fontSize: '0.8rem' }}>
                    ✅ ยืดหยุ่น, มี structure ชัดเจน
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 2: Architecture */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>🏗️ Architecture</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>📁 โครงสร้างโฟลเดอร์แบบ Feature-based</Typography>
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`src/
├── app/                    # Next.js 13+ App Router
├── components/             # Shared components
│   ├── ui/                # Base UI components (Button, Input)
│   └── layout/            # Layout components (Header, Footer)
├── features/              # Feature-based modules
│   ├── auth/
│   │   ├── components/    # Auth-specific components
│   │   ├── hooks/         # Auth-related hooks
│   │   ├── services/      # Auth API calls
│   │   └── types/         # Auth type definitions
│   └── dashboard/
├── lib/                   # Utilities, configurations
├── hooks/                 # Global custom hooks
└── types/                 # Global type definitions`}
            </Typography>
          </Box>
        </TabPanel>

        {/* Tab 3: Error Handling */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>🚨 Error Handling</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>🛡️ Error Boundary</Typography>
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`'use client';
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    // ส่งไปยัง error reporting service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}`}
            </Typography>
          </Box>
        </TabPanel>

        {/* Tab 4: Production Tips */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎯 Production Tips</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>⚡ Performance Best Practices</Typography>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">🖼️ Image Optimization</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`// ใช้ Next.js Image component
import Image from 'next/image';

// ✅ ดี
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority={true}  // สำหรับรูป above-the-fold
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, 800px"
/>

// ❌ ไม่ดี
<img src="/hero.jpg" alt="Hero" style={{width: '100%'}} />`}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">🔐 Security Checklist</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemIcon><CheckBox color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ HTTPS ทุกที่" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckBox color="success" /></ListItemIcon>
                  <ListItemText primary="Validate input ทั้ง client และ server" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckBox color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ Content Security Policy (CSP)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckBox color="success" /></ListItemIcon>
                  <ListItemText primary="เก็บ secrets ใน environment variables" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </TabPanel>

        {/* Tab 5: Interactive Demo */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎮 ทดลองใช้งาน</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            ทดลองเปรียบเทียบ Design Patterns และตรวจสอบความพร้อมสำหรับ Production
          </Typography>

          <Stack spacing={4}>
            <PatternComparison />
            <BestPracticesChecklist />
          </Stack>
        </TabPanel>

        {/* Conclusion */}
        <Paper sx={{ p: 4, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.200' }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'success.main' }}>
            🎉 ยินดีด้วย! คุณจบหลักสูตรแล้ว!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            ตอนนี้คุณมีความรู้ครบครันตั้งแต่พื้นฐานจนถึงระดับขั้นสูง 
            พร้อมที่จะสร้างแอปพลิเคชัน Next.js ระดับมืออาชีพได้แล้ว!
          </Typography>
          
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🚀 <strong>ขั้นตอนต่อไป:</strong> สร้างโปรเจคของตัวเอง, 
              เข้าร่วมชุมชน developer, และแชร์ความรู้ให้คนอื่น!
            </Typography>
          </Alert>
        </Paper>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/nextjs-basics/lesson-15"
            variant="outlined"
          >
            บทที่ 15: Deployment
          </Button>
          
          <Chip 
            label="16 / 16"
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
            กลับหน้าหลัก
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 