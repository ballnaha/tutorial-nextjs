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
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
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
    <Box sx={{ 
      minHeight: '100vh',
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 2, sm: 3 },
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      {/* Header Section */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography 
          variant="h2" 
          component="h1"
          sx={{ 
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 600,
            mb: 2,
            lineHeight: 1.2
          }}
        >
          ⚛️ บทที่ 3: Server Components vs Client Components
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary', 
            mb: 3,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            lineHeight: 1.5
          }}
        >
          เรียนรู้ความแตกต่างและการใช้งาน Server Components และ Client Components ใน Next.js 15 + React 19
        </Typography>

        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            flexWrap: 'wrap', 
            gap: 1,
            '& .MuiChip-root': {
              fontSize: { xs: '0.75rem', sm: '0.8rem' }
            }
          }}
        >
          <Chip label="35 นาที" color="primary" size="small" />
          <Chip label="ปานกลาง" color="secondary" size="small" />
          <Chip label="สำคัญมาก" color="error" size="small" />
        </Stack>
      </Box>

      {/* Learning Objectives */}
      <Card sx={{ 
        mb: { xs: 3, sm: 4 }, 
        bgcolor: 'primary.light', 
        color: 'primary.contrastText',
        border: 'none',
        boxShadow: 1
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Lightbulb sx={{ fontSize: { xs: 20, sm: 24 } }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                fontWeight: 600
              }}
            >
              วัตถุประสงค์การเรียนรู้
            </Typography>
          </Box>
          
          <Stack spacing={1}>
            {[
              'เข้าใจความแตกต่างระหว่าง Server Components และ Client Components',
              'รู้ว่าเมื่อไหร่ควรใช้ Server Components หรือ Client Components',
              'สามารถสร้างและใช้งาน Server Components พร้อม React 19',
              'เข้าใจการทำงานของ hydration และ React 19 concurrent features'
            ].map((objective, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <CheckCircle sx={{ 
                  fontSize: { xs: 16, sm: 20 }, 
                  mt: 0.5,
                  flexShrink: 0
                }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    lineHeight: 1.4
                  }}
                >
                  {objective}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
            🤔 React Server Components คืออะไร?
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3, 
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}
          >
            <strong>React Server Components</strong> เป็นฟีเจอร์ใหม่ที่ให้เราสามารถเรนเดอร์ React components บนเซิร์ฟเวอร์ได้ 
            โดยไม่ต้องส่ง JavaScript ไปยังเบราว์เซอร์ ทำให้แอปพลิเคชันเร็วขึ้นและมี bundle size ที่เล็กลง
          </Typography>

          <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
            💡 <strong>สำคัญ:</strong> ใน Next.js 15 + React 19, components เป็น Server Components โดย default 
            หากต้องการใช้เป็น Client Component ต้องเพิ่ม 'use client' ที่ด้านบนของไฟล์
          </Alert>

          {/* Visual Comparison */}
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={2} 
            sx={{ mb: 4 }}
          >
            <Card sx={{ flex: 1, bgcolor: 'success.light', boxShadow: 1 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Cloud sx={{ 
                    color: 'success.dark',
                    fontSize: { xs: 20, sm: 24 }
                  }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'success.dark',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    Server Components
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    lineHeight: 1.4
                  }}
                >
                  เรนเดอร์บนเซิร์ฟเวอร์ และส่งผลลัพธ์ที่เป็น HTML ไปยังเบราว์เซอร์
                </Typography>
                <Stack spacing={0.5}>
                  {[
                    '✅ ไม่มี JavaScript ส่งไป client',
                    '✅ เข้าถึงฐานข้อมูลได้โดยตรง',
                    '✅ SEO-friendly',
                    '❌ ไม่รองรับ interactivity'
                  ].map((item, index) => (
                    <Typography 
                      key={index}
                      variant="body2" 
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1, bgcolor: 'info.light', boxShadow: 1 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Computer sx={{ 
                    color: 'info.dark',
                    fontSize: { xs: 20, sm: 24 }
                  }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'info.dark',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    Client Components
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    lineHeight: 1.4
                  }}
                >
                  เรนเดอร์บนเบราว์เซอร์ เหมือนกับ React components แบบปกติ
                </Typography>
                <Stack spacing={0.5}>
                  {[
                    '✅ รองรับ interactivity เต็มรูปแบบ',
                    '✅ ใช้ React hooks ได้',
                    '✅ เข้าถึง browser APIs ได้',
                    '❌ ส่ง JavaScript ไป client'
                  ].map((item, index) => (
                    <Typography 
                      key={index}
                      variant="body2" 
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </CardContent>
      </Card>

      {/* Detailed Comparison */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
            📊 เปรียบเทียบรายละเอียด
          </Typography>

          <Card sx={{ boxShadow: 1 }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      <strong>คุณสมบัติ</strong>
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      <strong>Server Components</strong>
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                      <strong>Client Components</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {componentComparison.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        {item.feature}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={item.server} 
                          color={item.serverColor as any}
                          size="small" 
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={item.client} 
                          color={item.clientColor as any}
                          size="small" 
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </CardContent>
      </Card>

      {/* When to Use */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
            🎯 เมื่อไหร่ควรใช้อันไหน?
          </Typography>

          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            sx={{ 
              mb: 3,
              '& .MuiTab-root': {
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                minWidth: { xs: 'auto', sm: 120 },
                px: { xs: 1, sm: 2 }
              }
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Server Components" />
            <Tab label="Client Components" />
            <Tab label="เปรียบเทียบ Use Cases" />
          </Tabs>

          <CustomTabPanel value={tabValue} index={0}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                color: 'success.main',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              🖥️ ใช้ Server Components เมื่อ:
            </Typography>
            
            <Stack spacing={2}>
              {useCases.server.map((useCase, index) => (
                <Card key={index} sx={{ boxShadow: 1 }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ color: 'success.main' }}>
                        {React.cloneElement(useCase.icon, { 
                          sx: { fontSize: { xs: 20, sm: 24 } }
                        })}
                      </Box>
                      <Typography 
                        variant="h6"
                        sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                      >
                        {useCase.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 2,
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        lineHeight: 1.4
                      }}
                    >
                      {useCase.description}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                    >
                      <strong>ตัวอย่าง:</strong> {useCase.example}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                color: 'info.main',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              💻 ใช้ Client Components เมื่อ:
            </Typography>
            
            <Stack spacing={2}>
              {useCases.client.map((useCase, index) => (
                <Card key={index} sx={{ boxShadow: 1 }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ color: 'info.main' }}>
                        {React.cloneElement(useCase.icon, { 
                          sx: { fontSize: { xs: 20, sm: 24 } }
                        })}
                      </Box>
                      <Typography 
                        variant="h6"
                        sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                      >
                        {useCase.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 2,
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                        lineHeight: 1.4
                      }}
                    >
                      {useCase.description}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                    >
                      <strong>ตัวอย่าง:</strong> {useCase.example}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              🔄 เปรียบเทียบ Use Cases
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={2}
            >
              <Card sx={{ flex: 1, bgcolor: 'success.light', boxShadow: 1 }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      color: 'success.dark',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    ✅ Server Components เหมาะสำหรับ:
                  </Typography>
                  <Stack spacing={0.5}>
                    {[
                      '• หน้าแสดงรายการสินค้า',
                      '• บทความหรือเนื้อหาคงที่',
                      '• Dashboard ที่แสดงข้อมูล',
                      '• รายงานและสถิติ'
                    ].map((item, index) => (
                      <Typography 
                        key={index}
                        variant="body2" 
                        sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ flex: 1, bgcolor: 'info.light', boxShadow: 1 }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      color: 'info.dark',
                      fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                  >
                    ✅ Client Components เหมาะสำหรับ:
                  </Typography>
                  <Stack spacing={0.5}>
                    {[
                      '• ฟอร์มและ input fields',
                      '• ปุ่มและ interactive elements',
                      '• Modal และ dropdown',
                      '• Real-time features'
                    ].map((item, index) => (
                      <Typography 
                        key={index}
                        variant="body2" 
                        sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </CustomTabPanel>
        </CardContent>
      </Card>

      {/* Hydration Section */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 600
            }}
          >
            <Speed 
              color="primary" 
              sx={{ fontSize: { xs: 20, sm: 24 } }}
            />
            Hydration และการแก้ปัญหา
          </Typography>

          <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 600, 
                mb: 1,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              💡 Hydration คืออะไร?
            </Typography>
            <Typography 
              variant="body2"
              sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
            >
              <strong>Hydration</strong> คือกระบวนการที่ Next.js เชื่อมต่อ Server-rendered HTML 
              กับ Client-side JavaScript เพื่อให้เว็บไซต์มี interactivity
            </Typography>
          </Alert>

          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2,
                fontSize: { xs: '1.3rem', sm: '1.5rem' },
                fontWeight: 600
              }}
            >
              🔄 กระบวนการ Hydration
            </Typography>
            
            <Stepper 
              orientation="vertical"
              sx={{
                '& .MuiStepLabel-label': {
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }
              }}
            >
              {[
                {
                  title: '1. Server Rendering',
                  description: 'เซิร์ฟเวอร์สร้าง HTML จาก Server Components และส่งให้เบราว์เซอร์'
                },
                {
                  title: '2. HTML Display',
                  description: 'เบราว์เซอร์แสดง HTML ทันที (ผู้ใช้เห็นเนื้อหาได้แล้ว แต่ยังกดไม่ได้)'
                },
                {
                  title: '3. JavaScript Loading',
                  description: 'เบราว์เซอร์ดาวน์โหลดและรัน JavaScript สำหรับ Client Components'
                },
                {
                  title: '4. Hydration Complete',
                  description: 'React เชื่อมต่อ event handlers และทำให้เว็บไซต์ interactive'
                }
              ].map((step, index) => (
                <Step key={index} active>
                  <StepLabel>
                    <Typography 
                      variant="h6"
                      sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                    >
                      {step.title}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                    >
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2, 
                color: 'error.main',
                fontSize: { xs: '1.3rem', sm: '1.5rem' },
                fontWeight: 600
              }}
            >
              ⚠️ Hydration Errors ที่พบบ่อย
            </Typography>

            <Stack spacing={1.5}>
              <Accordion sx={{ boxShadow: 1 }}>
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    '& .MuiAccordionSummary-content': {
                      margin: { xs: '8px 0', sm: '12px 0' }
                    }
                  }}
                >
                  <Typography 
                    variant="h6"
                    sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                  >
                    1. Text Content Mismatch
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Alert severity="error" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                    Warning: Text content does not match. Server: "..." Client: "..."
                  </Alert>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }
                    }}
                  >
                    <strong>สาเหตุ:</strong> เนื้อหาที่เรนเดอร์บนเซิร์ฟเวอร์ไม่ตรงกับที่เรนเดอร์บน client
                  </Typography>
                  
                  <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                    <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                      <Typography 
                        component="pre" 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          lineHeight: 1.4,
                          margin: 0,
                          overflow: 'auto'
                        }}
                      >
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
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow: 1 }}>
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    '& .MuiAccordionSummary-content': {
                      margin: { xs: '8px 0', sm: '12px 0' }
                    }
                  }}
                >
                  <Typography 
                    variant="h6"
                    sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                  >
                    2. Browser-only APIs
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Alert severity="error" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                    ReferenceError: window is not defined
                  </Alert>
                  
                  <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                    <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                      <Typography 
                        component="pre" 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          lineHeight: 1.4,
                          margin: 0,
                          overflow: 'auto'
                        }}
                      >
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
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow: 1 }}>
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    '& .MuiAccordionSummary-content': {
                      margin: { xs: '8px 0', sm: '12px 0' }
                    }
                  }}
                >
                  <Typography 
                    variant="h6"
                    sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                  >
                    3. Random Values
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Card className="code-block" sx={{ mb: 2, boxShadow: 1 }}>
                    <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                      <Typography 
                        component="pre" 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          lineHeight: 1.4,
                          margin: 0,
                          overflow: 'auto'
                        }}
                      >
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
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card sx={{ 
        mb: { xs: 3, sm: 4 }, 
        bgcolor: 'warning.light',
        boxShadow: 1
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2, 
              color: 'warning.dark',
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600
            }}
          >
            💡 Best Practices สำคัญ
          </Typography>
          
          <Stack spacing={1.5}>
            {[
              'ใช้ Server Components เป็น default และเปลี่ยนเป็น Client เมื่อจำเป็น',
              'แยกไฟล์ Server และ Client Components เพื่อความชัดเจน',
              'ใช้ dynamic imports สำหรับ Client Components ที่ไม่จำเป็นต้องโหลดทันที',
              'หลีกเลี่ยงการใช้ browser APIs ใน Server Components',
              'ใช้ Suspense boundaries สำหรับ loading states ที่ดีขึ้น'
            ].map((practice, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <CheckCircle 
                  color="success" 
                  sx={{ 
                    fontSize: { xs: 16, sm: 20 }, 
                    mt: 0.5,
                    flexShrink: 0
                  }} 
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    lineHeight: 1.4
                  }}
                >
                  {practice}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card sx={{ 
        mb: { xs: 3, sm: 4 }, 
        bgcolor: 'success.light', 
        color: 'success.dark',
        boxShadow: 1
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontWeight: 600
            }}
          >
            🎯 ยินดีด้วย! คุณเรียนจบบทที่ 3 แล้ว
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.5
            }}
          >
            ตอนนี้คุณเข้าใจความแตกต่างระหว่าง Server Components และ Client Components แล้ว! 
            พร้อมสำหรับการเรียนรู้เรื่อง Data Fetching และ Caching ในบทถัดไป
          </Typography>
          
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.8rem', sm: '0.85rem' }
            }}
          >
            💡 <strong>บทถัดไป:</strong> เรียนรู้เรื่อง Data Fetching, Caching และ Server Actions 
            ใน Next.js 15 พร้อม React 19 features
          </Alert>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-2"
          variant="outlined"
          size="small"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          บทที่ 2
        </Button>
        
        <Chip 
          label="3 / 18"
          color="primary"
          variant="outlined"
          size="small"
        />

        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-4"
          variant="contained"
          size="small"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          บทถัดไป
        </Button>
      </Box>
    </Box>
  );
} 