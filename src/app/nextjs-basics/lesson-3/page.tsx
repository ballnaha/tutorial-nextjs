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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  PlayArrow,
  ExpandMore,
  Lightbulb,
  Warning,
  Info,
  Computer,
  CloudQueue,
  Security,
  Speed,
  Web,
  Storage as StorageIcon,
  Cloud,
  Phone,
  Visibility,
  Compare,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

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

const componentComparison = [
  {
    feature: 'ที่ทำงาน',
    server: 'เซิร์ฟเวอร์',
    client: 'เบราว์เซอร์',
    serverColor: 'success',
    clientColor: 'info'
  },
  {
    feature: 'JavaScript Bundle',
    server: 'ไม่ส่งไปยัง client',
    client: 'ส่งไปยัง client',
    serverColor: 'success',
    clientColor: 'warning'
  },
  {
    feature: 'State Management',
    server: 'ไม่รองรับ',
    client: 'รองรับ (useState, useEffect)',
    serverColor: 'error',
    clientColor: 'success'
  },
  {
    feature: 'Event Handlers',
    server: 'ไม่รองรับ',
    client: 'รองรับ (onClick, onChange)',
    serverColor: 'error',
    clientColor: 'success'
  },
  {
    feature: 'Browser APIs',
    server: 'ไม่เข้าถึงได้',
    client: 'เข้าถึงได้ (localStorage, window)',
    serverColor: 'error',
    clientColor: 'success'
  },
  {
    feature: 'Data Fetching',
    server: 'ใช้ async/await โดยตรง',
    client: 'ใช้ useEffect + fetch',
    serverColor: 'success',
    clientColor: 'info'
  },
  {
    feature: 'SEO',
    server: 'ดีมาก (เรนเดอร์ที่เซิร์ฟเวอร์)',
    client: 'ต้องการ hydration',
    serverColor: 'success',
    clientColor: 'warning'
  },
  {
    feature: 'Performance',
    server: 'Bundle เล็ก, โหลดเร็ว',
    client: 'Bundle ใหญ่กว่า',
    serverColor: 'success',
    clientColor: 'warning'
  }
];

const useCases = {
  server: [
    {
      title: 'การดึงข้อมูลจาก API (React 19)',
      description: 'ดึงข้อมูลจากฐานข้อมูลหรือ external API ด้วย async/await ใน React 19',
      example: 'รายการสินค้า, ข้อมูลผู้ใช้, บทความ พร้อม enhanced caching',
      icon: <StorageIcon />
    },
    {
      title: 'การแสดงข้อมูลคงที่',
      description: 'แสดงข้อมูลที่ไม่ต้องการ interaction พร้อม Static Route Indicator',
      example: 'หน้า About, Footer, Header (จะมี static indicator ใน dev)',
      icon: <Web />
    },
    {
      title: 'การประมวลผลข้อมูล',
      description: 'คำนวณหรือประมวลผลข้อมูลที่ซับซ้อนด้วย React 19 Server Components',
      example: 'การคำนวณราคา, สถิติ, รายงาน ด้วย async functions',
      icon: <Computer />
    },
    {
      title: 'การเข้าถึงฐานข้อมูล',
      description: 'เชื่อมต่อและดึงข้อมูลจากฐานข้อมูลด้วย enhanced caching',
      example: 'Prisma queries, MongoDB operations (ไม่ cache by default ใน Next.js 15)',
      icon: <Cloud />
    }
  ],
  client: [
    {
      title: 'การโต้ตอบกับผู้ใช้ (React 19)',
      description: 'จัดการ events และ user interactions ด้วย React 19 features',
      example: 'ปุ่มกด, forms, dropdowns พร้อม React 19 Actions',
      icon: <Phone />
    },
    {
      title: 'State Management (Enhanced)',
      description: 'จัดการสถานะของ components ด้วย React 19 hooks',
      example: 'useActionState, useState, useOptimistic',
      icon: <Visibility />
    },
    {
      title: 'Browser APIs',
      description: 'ใช้งาน browser-specific features',
      example: 'localStorage, geolocation, notifications',
      icon: <Computer />
    },
    {
      title: 'Real-time Updates',
      description: 'อัพเดทข้อมูลแบบ real-time ด้วย React 19 concurrent features',
      example: 'chat applications, live feeds, streaming data',
      icon: <Speed />
    }
  ]
};

export default function Lesson3Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          🔄 บทที่ 3: Server Components vs Client Components
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          ทำความเข้าใจความแตกต่างและการใช้งาน Components ทั้งสองแบบใน Next.js 13+
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Chip label="30 นาที" color="primary" />
          <Chip label="ปานกลาง" color="secondary" />
          <Chip label="สำคัญมาก" color="error" />
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
            <ListItemText primary="เข้าใจความแตกต่างระหว่าง Server Components และ Client Components" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="รู้ว่าเมื่อไหร่ควรใช้ Server Components หรือ Client Components" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="สามารถใช้ 'use client' directive ได้อย่างถูกต้อง" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="เข้าใจการ fetch ข้อมูลใน Server Components" />
          </ListItem>
        </List>
      </Paper>

      {/* Introduction */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🤔 React Server Components คืออะไร?
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          <strong>React Server Components</strong> เป็นฟีเจอร์ใหม่ที่ให้เราสามารถเรนเดอร์ React components บนเซิร์ฟเวอร์ได้ 
          โดยไม่ต้องส่ง JavaScript ไปยังเบราว์เซอร์ ทำให้แอปพลิเคชันเร็วขึ้นและมี bundle size ที่เล็กลง
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>สำคัญ:</strong> ใน Next.js 13+ App Router, components เป็น Server Components โดย default 
            หากต้องการใช้เป็น Client Component ต้องเพิ่ม 'use client' ที่ด้านบนของไฟล์
          </Typography>
        </Alert>

        {/* Visual Comparison */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
          <Paper sx={{ p: 3, flex: 1, bgcolor: 'success.light' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Cloud sx={{ color: 'success.dark' }} />
              <Typography variant="h6" sx={{ color: 'success.dark' }}>
                Server Components
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              เรนเดอร์บนเซิร์ฟเวอร์ และส่งผลลัพธ์ที่เป็น HTML ไปยังเบราว์เซอร์
            </Typography>
            <List dense>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="✅ ไม่มี JavaScript ส่งไป client" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="✅ เข้าถึงฐานข้อมูลได้โดยตรง" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="✅ SEO-friendly" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="❌ ไม่รองรับ interactivity" />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3, flex: 1, bgcolor: 'info.light' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Computer sx={{ color: 'info.dark' }} />
              <Typography variant="h6" sx={{ color: 'info.dark' }}>
                Client Components
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              เรนเดอร์บนเบราว์เซอร์ เหมือนกับ React components แบบปกติ
            </Typography>
            <List dense>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="✅ รองรับ interactivity เต็มรูปแบบ" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="✅ ใช้ React hooks ได้" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="✅ เข้าถึง browser APIs ได้" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="❌ ส่ง JavaScript ไป client" />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Paper>

      {/* Detailed Comparison */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          📊 เปรียบเทียบรายละเอียด
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>คุณสมบัติ</strong></TableCell>
                <TableCell><strong>Server Components</strong></TableCell>
                <TableCell><strong>Client Components</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {componentComparison.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.feature}</TableCell>
                  <TableCell>
                    <Chip 
                      label={item.server} 
                      color={item.serverColor as any}
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={item.client} 
                      color={item.clientColor as any}
                      size="small" 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* When to Use */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🎯 เมื่อไหร่ควรใช้อันไหน?
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Server Components" />
          <Tab label="Client Components" />
          <Tab label="เปรียบเทียบ Use Cases" />
        </Tabs>

        <CustomTabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 3, color: 'success.main' }}>
            🖥️ ใช้ Server Components เมื่อ:
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 2,
            flexWrap: 'wrap'
          }}>
            {useCases.server.map((useCase, index) => (
              <Box key={index} sx={{ flex: 1, minWidth: '250px' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ color: 'success.main' }}>
                        {useCase.icon}
                      </Box>
                      <Typography variant="h6">
                        {useCase.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {useCase.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>ตัวอย่าง:</strong> {useCase.example}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 3, color: 'info.main' }}>
            💻 ใช้ Client Components เมื่อ:
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 2,
            flexWrap: 'wrap'
          }}>
            {useCases.client.map((useCase, index) => (
              <Box key={index} sx={{ flex: 1, minWidth: '250px' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ color: 'info.main' }}>
                        {useCase.icon}
                      </Box>
                      <Typography variant="h6">
                        {useCase.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {useCase.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>ตัวอย่าง:</strong> {useCase.example}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={tabValue} index={2}>
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              💡 <strong>กฎง่ายๆ:</strong> เริ่มต้นด้วย Server Components ก่อนเสมอ 
              เปลี่ยนเป็น Client Components เมื่อต้องการ interactivity เท่านั้น
            </Typography>
          </Alert>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Paper sx={{ p: 3, flex: 1, bgcolor: 'success.light' }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'success.dark' }}>
                ✅ Server Components เหมาะสำหรับ:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• หน้าแสดงรายการสินค้า" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• บทความหรือเนื้อหาคงที่" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Dashboard ที่แสดงข้อมูล" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• รายงานและสถิติ" />
                </ListItem>
              </List>
            </Paper>

            <Paper sx={{ p: 3, flex: 1, bgcolor: 'info.light' }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'info.dark' }}>
                ✅ Client Components เหมาะสำหรับ:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• ฟอร์มและ input fields" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• ปุ่มและ interactive elements" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Modal และ dropdown" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary="• Real-time features" />
                </ListItem>
              </List>
            </Paper>
          </Box>
        </CustomTabPanel>
      </Paper>

      {/* Hydration Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Speed color="primary" />
            Hydration และการแก้ปัญหา
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              💡 Hydration คืออะไร?
            </Typography>
            <Typography variant="body2">
              <strong>Hydration</strong> คือกระบวนการที่ Next.js เชื่อมต่อ Server-rendered HTML 
              กับ Client-side JavaScript เพื่อให้เว็บไซต์มี interactivity
            </Typography>
          </Alert>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              🔄 กระบวนการ Hydration
            </Typography>
            
            <Stepper orientation="vertical">
              <Step active>
                <StepLabel>
                  <Typography variant="h6">1. Server Rendering</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary">
                    เซิร์ฟเวอร์สร้าง HTML จาก Server Components และส่งให้เบราว์เซอร์
                  </Typography>
                </StepContent>
              </Step>
              
              <Step active>
                <StepLabel>
                  <Typography variant="h6">2. HTML Display</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary">
                    เบราว์เซอร์แสดง HTML ทันที (ผู้ใช้เห็นเนื้อหาได้แล้ว แต่ยังกดไม่ได้)
                  </Typography>
                </StepContent>
              </Step>
              
              <Step active>
                <StepLabel>
                  <Typography variant="h6">3. JavaScript Loading</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary">
                    เบราว์เซอร์ดาวน์โหลดและรัน JavaScript สำหรับ Client Components
                  </Typography>
                </StepContent>
              </Step>
              
              <Step active>
                <StepLabel>
                  <Typography variant="h6">4. Hydration Complete</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary">
                    React เชื่อมต่อ event handlers และทำให้เว็บไซต์ interactive
                  </Typography>
                </StepContent>
              </Step>
            </Stepper>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
              ⚠️ Hydration Errors ที่พบบ่อย
            </Typography>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">1. Text Content Mismatch</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    Warning: Text content does not match. Server: "..." Client: "..."
                  </Typography>
                </Alert>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>สาเหตุ:</strong> เนื้อหาที่เรนเดอร์บนเซิร์ฟเวอร์ไม่ตรงกับที่เรนเดอร์บน client
                </Typography>
                
                <Paper className="code-block" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="body2" component="pre">
{`// ❌ ผิด - เวลาต่างกันระหว่าง server และ client
function CurrentTime() {
  return <div>เวลาปัจจุบัน: {new Date().toLocaleTimeString()}</div>
}

// ✅ ถูก - ใช้ useEffect
function CurrentTime() {
  const [time, setTime] = useState('')
  
  useEffect(() => {
    setTime(new Date().toLocaleTimeString())
  }, [])
  
  return <div>เวลาปัจจุบัน: {time || 'กำลังโหลด...'}</div>
}`}
                  </Typography>
                </Paper>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">2. Browser-only APIs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    ReferenceError: window is not defined
                  </Typography>
                </Alert>
                
                <Paper className="code-block" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="body2" component="pre">
{`// ❌ ผิด - window ไม่มีบน server
function WindowWidth() {
  return <div>หน้าจอกว้าง: {window.innerWidth}px</div>
}

// ✅ ถูก - ตรวจสอบก่อนใช้
function WindowWidth() {
  const [width, setWidth] = useState(0)
  
  useEffect(() => {
    setWidth(window.innerWidth)
    
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return <div>หน้าจอกว้าง: {width || 'กำลังตรวจสอบ...'}px</div>
}`}
                  </Typography>
                </Paper>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">3. Random Values</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper className="code-block" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="body2" component="pre">
{`// ❌ ผิด - Math.random() ให้ค่าต่างกันระหว่าง server และ client
function RandomColor() {
  const color = \`#\${Math.floor(Math.random() * 16777215).toString(16)}\`
  return <div style={{ color }}>สีสุ่ม</div>
}

// ✅ ถูก - สร้างค่าสุ่มหลัง hydration
function RandomColor() {
  const [color, setColor] = useState('#000000')
  
  useEffect(() => {
    const randomColor = \`#\${Math.floor(Math.random() * 16777215).toString(16)}\`
    setColor(randomColor)
  }, [])
  
  return <div style={{ color }}>สีสุ่ม</div>
}`}
                  </Typography>
                </Paper>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'success.main' }}>
              ✅ การแยกไฟล์ Client และ Server Components
            </Typography>

            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                🎯 Best Practice: แยกไฟล์เพื่อความชัดเจน
              </Typography>
              <Typography variant="body2">
                แยก Server Components (page.tsx) และ Client Components (client.tsx) 
                เพื่อให้โค้ดอ่านง่ายและจัดการได้ดีขึ้น
              </Typography>
            </Alert>

            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="📄 page.tsx (Server)" />
              <Tab label="💻 client.tsx (Client)" />
              <Tab label="🔧 การใช้งาน" />
            </Tabs>

            <CustomTabPanel value={tabValue} index={0}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📄 app/products/page.tsx (Server Component)
              </Typography>
              <Paper className="code-block" sx={{ p: 2 }}>
                <Typography variant="body2" component="pre">
{`// Server Component - ทำงานบนเซิร์ฟเวอร์
import { ProductList } from './client'

// ดึงข้อมูลโดยตรงในฟังก์ชัน (ไม่ต้อง useEffect)
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache' // Next.js 15 caching
  })
  return res.json()
}

export default async function ProductsPage() {
  // Server Component สามารถเป็น async function
  const products = await getProducts()
  
  return (
    <div>
      <h1>รายการสินค้า</h1>
      <p>ข้อมูล {products.length} รายการ</p>
      
      {/* ส่งข้อมูลไปยัง Client Component */}
      <ProductList initialProducts={products} />
    </div>
  )
}

// Export metadata สำหรับ SEO
export const metadata = {
  title: 'รายการสินค้า',
  description: 'ดูสินค้าทั้งหมดของเรา'
}`}
                </Typography>
              </Paper>
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={1}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                💻 app/products/client.tsx (Client Component)
              </Typography>
              <Paper className="code-block" sx={{ p: 2 }}>
                <Typography variant="body2" component="pre">
{`'use client'
import { useState, useEffect } from 'react'

interface Product {
  id: number
  name: string
  price: number
}

interface Props {
  initialProducts: Product[]
}

export function ProductList({ initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts)
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)

  // Client-side filtering
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  )

  // Client-side data refresh
  const refreshData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      const newProducts = await res.json()
      setProducts(newProducts)
    } catch (error) {
      console.error('Failed to refresh:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Interactive elements - ต้องใช้ Client Component */}
      <input
        type="text"
        placeholder="ค้นหาสินค้า..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ 
          padding: '8px',
          marginBottom: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      
      <button 
        onClick={refreshData}
        disabled={loading}
        style={{
          padding: '8px 16px',
          marginLeft: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'กำลังโหลด...' : 'รีเฟรช'}
      </button>

      {/* แสดงผลลัพธ์ */}
      <div style={{ marginTop: '16px' }}>
        {filteredProducts.map(product => (
          <div 
            key={product.id}
            style={{
              padding: '12px',
              border: '1px solid #eee',
              marginBottom: '8px',
              borderRadius: '4px'
            }}
          >
            <h3>{product.name}</h3>
            <p>ราคา: ฿{product.price}</p>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p>ไม่พบสินค้าที่ค้นหา</p>
      )}
    </div>
  )
}`}
                </Typography>
              </Paper>
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={2}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔧 ข้อดีของการแยกไฟล์
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="โค้ดอ่านง่าย"
                    secondary="แยกหน้าที่ชัดเจนระหว่าง server และ client logic"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Performance ดีขึ้น"
                    secondary="Client Component มีขนาดเล็กลง เพราะแยกออกจาก Server Component"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="จัดการง่าย"
                    secondary="แก้ไขและดูแลรักษาโค้ดได้ง่ายขึ้น"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="SEO Friendly"
                    secondary="Server Component ให้ HTML เต็มรูปแบบสำหรับ search engines"
                  />
                </ListItem>
              </List>

              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>💡 เคล็ดลับ:</strong> ใช้ Server Component สำหรับการดึงข้อมูลและแสดงผล 
                  ส่วน Client Component ใช้สำหรับ user interactions เท่านั้น
                </Typography>
              </Alert>
            </CustomTabPanel>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              🛠️ เครื่องมือ Debug Hydration
            </Typography>

            <Paper className="code-block" sx={{ p: 2, mb: 3 }}>
              <Typography variant="body2" component="pre">
{`// next.config.js - เปิด debug mode
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // แสดง hydration errors แบบละเอียด
    serverComponentsExternalPackages: [],
  },
  // Development mode - แสดง warnings
  reactStrictMode: true,
}

module.exports = nextConfig`}
              </Typography>
            </Paper>

            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                🔍 วิธี Debug Hydration Issues
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="1. เปิด Chrome DevTools Console"
                    secondary="ดู error messages ที่ขึ้นต้นด้วย 'Warning: Text content does not match'"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="2. ใช้ suppressHydrationWarning"
                    secondary="เฉพาะกรณีที่รู้ว่าเนื้อหาต่างกันเป็นเรื่องปกติ (เช่น เวลา, random values)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="3. ใช้ useEffect สำหรับ browser-only code"
                    secondary="วางโค้ดที่ใช้ browser APIs ใน useEffect เสมอ"
                  />
                </ListItem>
              </List>
            </Alert>

            <Paper className="code-block" sx={{ p: 2 }}>
              <Typography variant="body2" component="pre">
{`// suppressHydrationWarning - ใช้เฉพาะเมื่อจำเป็น
function CurrentDateTime() {
  const [dateTime, setDateTime] = useState('')
  
  useEffect(() => {
    setDateTime(new Date().toLocaleString('th-TH'))
  }, [])
  
  return (
    <div suppressHydrationWarning>
      {/* เนื้อหานี้จะต่างกันระหว่าง server และ client */}
      เวลาปัจจุบัน: {dateTime || 'กำลังโหลด...'}
    </div>
  )
}`}
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'warning.light' }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'warning.dark' }}>
          💡 Best Practices สำคัญ
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="เริ่มต้นด้วย Server Components เสมอ"
              secondary="เปลี่ยนเป็น Client Components เมื่อจำเป็นเท่านั้น"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ 'use client' เฉพาะ components ที่ต้องการ"
              secondary="ไม่ใช่ทั้งแอปพลิเคชัน เพื่อลด bundle size"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="Server Components สำหรับ data fetching"
              secondary="Client Components สำหรับ user interactions"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ composition pattern"
              secondary="ส่ง Client Components เป็น children ของ Server Components"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ระวังการใช้ browser APIs"
              secondary="ใช้ได้เฉพาะใน Client Components และต้องมี error handling"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ useEffect สำหรับ hydration-safe code"
              secondary="วางโค้ดที่อาจทำให้เกิด hydration mismatch ใน useEffect"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="แยกไฟล์ client.tsx และ page.tsx"
              secondary="เพื่อความชัดเจนและง่ายต่อการจัดการโค้ด"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Next Steps */}
      <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.dark' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 3 แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          ตอนนี้คุณเข้าใจความแตกต่างระหว่าง Server และ Client Components รวมถึงการแก้ปัญหา Hydration แล้ว! 
          พร้อมสำหรับการเรียนรู้เรื่อง Link และ Navigation ในบทถัดไป
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>สิ่งที่คุณได้เรียนรู้:</strong> Server vs Client Components, Hydration Process, 
            การแก้ปัญหา Hydration Errors, การแยกไฟล์เพื่อความชัดเจน และ Best Practices ต่างๆ
          </Typography>
        </Alert>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>บทถัดไป:</strong> เรียนรู้ Link และ Navigation ใน Next.js เพื่อสร้างประสบการณ์การใช้งานที่ดี
          </Typography>
        </Alert>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-2"
          variant="outlined"
        >
          บทที่ 2: File-based Routing
        </Button>
        
        <Chip 
          label="3 / 16"
          color="primary"
          variant="outlined"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-4"
          variant="contained"
          color="primary"
        >
          บทที่ 4: Link และ Navigation
        </Button>
      </Box>
    </Container>
  );
} 