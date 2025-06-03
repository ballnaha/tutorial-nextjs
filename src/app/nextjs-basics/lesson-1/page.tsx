'use client';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import {
  CheckCircle,
  Terminal,
  Folder,
  ExpandMore,
  Lightbulb,
  Warning,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

const installationSteps = [
  {
    label: 'ตรวจสอบ Node.js',
    description: 'ตรวจสอบว่าติดตั้ง Node.js เวอร์ชัน 18.18.0 หรือใหม่กว่า (Next.js 15 ต้องการ Node.js 18.18.0+)',
    command: 'node --version',
    expectedOutput: 'v18.18.0 หรือสูงกว่า'
  },
  {
    label: 'สร้างโปรเจค Next.js ใหม่',
    description: 'ใช้ create-next-app เพื่อสร้างโปรเจคใหม่พร้อม TypeScript และ React 19',
    command: 'npx create-next-app@latest my-nextjs-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"',
    expectedOutput: 'โปรเจคถูกสร้างเรียบร้อย พร้อม Next.js 15 และ React 19'
  },
  {
    label: 'เข้าไปในโฟลเดอร์โปรเจค',
    description: 'เปลี่ยนเส้นทางไปยังโฟลเดอร์ที่สร้างขึ้น',
    command: 'cd my-nextjs-app',
    expectedOutput: 'อยู่ในโฟลเดอร์โปรเจค'
  },
  {
    label: 'รันเซิร์ฟเวอร์ Development',
    description: 'เริ่มต้นเซิร์ฟเวอร์สำหรับการพัฒนา (ใช้ Turbopack ที่เร็วขึ้น)',
    command: 'npm run dev',
    expectedOutput: 'Server running on http://localhost:3000 พร้อม Turbopack (stable)'
  }
];

const projectStructure = [
  { path: 'app/', description: 'โฟลเดอร์หลักสำหรับ App Router (Next.js 13+) พร้อม React 19 support' },
  { path: 'app/layout.tsx', description: 'Layout หลักของเว็บไซต์ รองรับ React 19 features' },
  { path: 'app/page.tsx', description: 'หน้าแรก (Home page) พร้อม enhanced performance' },
  { path: 'app/globals.css', description: 'CSS สำหรับทั้งเว็บไซต์' },
  { path: 'public/', description: 'ไฟล์ static เช่น รูปภาพ, favicon' },
  { path: 'next.config.js', description: 'การตั้งค่า Next.js 15 (รองรับ next.config.ts แล้ว)' },
  { path: 'package.json', description: 'รายการ dependencies และ scripts พร้อม Next.js 15' },
  { path: 'tsconfig.json', description: 'การตั้งค่า TypeScript' },
];

const features = [
  {
    title: 'React 19 Support',
    description: 'รองรับ React 19 เต็มรูปแบบ พร้อม Server Components และ Actions',
    icon: '⚛️'
  },
  {
    title: 'Turbopack (Stable)',
    description: 'bundler ใหม่ที่เร็วกว่า Webpack ถึง 96.3% สำหรับ development',
    icon: '⚡'
  },
  {
    title: 'Enhanced Caching',
    description: 'Caching system ใหม่ที่ไม่ cache โดย default แต่ควบคุมได้ง่ายขึ้น',
    icon: '💾'
  },
  {
    title: 'Static Route Indicator',
    description: 'แสดงสถานะ route ว่าเป็น static หรือ dynamic ใน development',
    icon: '📊'
  },
  {
    title: 'API Routes (Enhanced)',
    description: 'สร้าง API endpoints ในโปรเจคเดียวกัน พร้อม async request APIs',
    icon: '🔌'
  },
  {
    title: 'File-based Routing',
    description: 'สร้าง routes โดยการสร้างไฟล์ในโฟลเดอร์ app/',
    icon: '📁'
  }
];

export default function Lesson1Page() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
          🚀 บทที่ 1: เริ่มต้นกับ Next.js
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
          ทำความรู้จักกับ Next.js และการติดตั้งโปรเจคแรกของคุณ
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
          <Chip label="45 นาที" color="primary" size="small" />
          <Chip label="เริ่มต้น" color="secondary" size="small" />
          <Chip label="บังคับ" color="error" size="small" />
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
              'เข้าใจว่า Next.js คืออะไรและแตกต่างจาก React อย่างไร',
              'สามารถติดตั้งและสร้างโปรเจค Next.js ใหม่ได้',
              'เข้าใจโครงสร้างไฟล์และโฟลเดอร์ของ Next.js',
              'รู้จักฟีเจอร์หลักๆ ของ Next.js'
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

      {/* What is Next.js */}
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
          🤔 Next.js คืออะไร?
        </Typography>
        
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3, 
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}
          >
          <strong>Next.js</strong> เป็น React Framework ที่ถูกพัฒนาโดย Vercel เพื่อช่วยให้การสร้างเว็บแอปพลิเคชันด้วย React 
          ง่ายและมีประสิทธิภาพมากขึ้น โดย Next.js มาพร้อมกับฟีเจอร์ที่จำเป็นสำหรับการ production ทั้งหมด
        </Typography>

          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="info" sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
            🎉 <strong>Next.js 15 ใหม่!</strong> เวอร์ชันล่าสุดมาพร้อม React 19, Turbopack (stable), 
            enhanced caching system และ performance improvements มากมาย
        </Alert>

            <Alert severity="success" sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
            💡 <strong>เปรียบเทียบง่ายๆ:</strong> หาก React เป็นเหมือน "เครื่องมือสำหรับสร้างบ้าน" 
            แล้ว Next.js เป็นเหมือน "บ้านสำเร็จรูปที่มีฟีเจอร์ครบครัน" พร้อมใช้งานได้ทันที
            </Alert>
          </Stack>

          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 600
            }}
          >
            ความแตกต่างหลักระหว่าง React และ Next.js 15:
          </Typography>

          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={2} 
            sx={{ mb: 4 }}
          >
            <Card sx={{ flex: 1, bgcolor: 'grey.50', boxShadow: 1 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    color: 'primary.main',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}
                >
              ⚛️ React (Library)
            </Typography>
                <Stack spacing={0.5}>
                  {[
                    'ต้องตั้งค่าเองทุกอย่าง',
                    'Client-side rendering เท่านั้น',
                    'ต้องติดตั้ง routing เพิ่ม',
                    'ไม่มี SEO optimization',
                    'ต้องจัดการ bundling เอง'
                  ].map((item, index) => (
                    <Typography 
                      key={index}
                      variant="body2" 
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                    >
                      • {item}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ 
              flex: 1, 
              bgcolor: 'success.light', 
              color: 'success.contrastText',
              boxShadow: 1
            }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                  }}
                >
              ⚡ Next.js 15 (Framework)
            </Typography>
                <Stack spacing={0.5}>
                  {[
                    'มาพร้อมการตั้งค่าเบื้องต้น',
                    'SSR, SSG, CSR ในตัว',
                    'File-based routing ง่าย',
                    'SEO-friendly ตั้งแต่แรก',
                    'Turbopack (เร็วกว่า Webpack 96%)',
                    'React 19 พร้อมใช้'
                  ].map((item, index) => (
                    <Typography 
                      key={index}
                      variant="body2" 
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                    >
                      • {item}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          {/* Features */}
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 600
            }}
          >
          🌟 ฟีเจอร์เด่นของ Next.js:
        </Typography>
        
          <Stack spacing={1.5}>
          {features.map((feature, index) => (
              <Card key={index} sx={{ boxShadow: 1 }}>
                <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      mb: 1,
                      fontSize: { xs: '0.95rem', sm: '1rem' },
                      fontWeight: 600
                    }}
                  >
                {feature.icon} {feature.title}
              </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      lineHeight: 1.4
                    }}
                  >
                {feature.description}
              </Typography>
                </CardContent>
              </Card>
          ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Installation */}
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
          💻 การติดตั้ง Next.js
        </Typography>

          <Alert 
            severity="warning" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.85rem', sm: '0.9rem' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Warning sx={{ fontSize: { xs: 16, sm: 20 } }} />
          <Typography variant="body2">
            <strong>ข้อกำหนดเบื้องต้น:</strong> ต้องมี Node.js เวอร์ชัน 18.18.0 หรือใหม่กว่า
          </Typography>
            </Box>
        </Alert>

          <Stepper 
            activeStep={activeStep} 
            orientation="vertical"
            sx={{
              '& .MuiStepLabel-label': {
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }
            }}
          >
          {installationSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                  <Typography 
                    variant="h6"
                    sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                  >
                    {step.label}
                  </Typography>
              </StepLabel>
              <StepContent>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      lineHeight: 1.5
                    }}
                  >
                  {step.description}
                </Typography>
                
                  <Card sx={{ 
                    mb: 2, 
                    boxShadow: 1
                  }} 
                    className="code-block"
                  >
                    <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Terminal sx={{ fontSize: { xs: 14, sm: 16 } }} />
                        <Typography 
                          variant="body2"
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                        >
                          คำสั่ง:
                        </Typography>
                  </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                          wordBreak: 'break-all'
                        }}
                      >
                    $ {step.command}
                  </Typography>
                    </CardContent>
                  </Card>

                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.8rem', sm: '0.85rem' }
                    }}
                  >
                  <Typography variant="body2">
                    <strong>ผลลัพธ์ที่คาดหวัง:</strong> {step.expectedOutput}
                  </Typography>
                </Alert>

                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                      size="small"
                    disabled={index === installationSteps.length - 1}
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                  >
                    {index === installationSteps.length - 1 ? 'เสร็จสิ้น' : 'ถัดไป'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                      size="small"
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                  >
                    ย้อนกลับ
                  </Button>
                  </Stack>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {activeStep === installationSteps.length && (
            <Card sx={{ mt: 3, bgcolor: 'success.light', boxShadow: 1 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    fontWeight: 600
                  }}
                >
              🎉 ยินดีด้วย! คุณติดตั้ง Next.js 15 สำเร็จแล้ว
            </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: 1.5
                  }}
                >
                  ตอนนี้คุณสามารถเปิดเบราว์เซอร์แล้วไปที่{' '}
                  <Box 
                    component="code" 
                    sx={{ 
                      bgcolor: 'rgba(0,0,0,0.1)',
                      px: 1,
                      py: 0.5,
                      borderRadius: 0.5,
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      fontFamily: 'monospace'
                    }}
                  >
                    http://localhost:3000
                  </Box>{' '}
              เพื่อดูเว็บไซต์แรกของคุณพร้อม Next.js 15 และ React 19
            </Typography>
            
                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '0.8rem', sm: '0.85rem' }
                  }}
                >
                  💡 <strong>Turbopack Tips:</strong> หากต้องการใช้ Turbopack เพิ่มเติม สามารถรันด้วย{' '}
                  <code>npm run dev --turbo</code> หรือเพิ่ม <code>--turbo</code> flag
            </Alert>
            
                <Button 
                  onClick={handleReset} 
                  size="small"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
              เริ่มใหม่
            </Button>
              </CardContent>
            </Card>
        )}
        </CardContent>
      </Card>

      {/* Project Structure */}
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
          📁 โครงสร้างโปรเจค Next.js
        </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.5
            }}
          >
          หลังจากสร้างโปรเจคเสร็จแล้ว คุณจะพบโครงสร้างไฟล์และโฟลเดอร์ดังนี้:
        </Typography>

          <Card sx={{ 
            mb: 3, 
            boxShadow: 1
          }}
            className="code-block"
          >
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
{`my-nextjs-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── next.svg
│   └── vercel.svg
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json`}
          </Typography>
            </CardContent>
          </Card>

          <Stack spacing={1}>
        {projectStructure.map((item, index) => (
              <Accordion key={index} sx={{ boxShadow: 1 }}>
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    '& .MuiAccordionSummary-content': {
                      margin: { xs: '8px 0', sm: '12px 0' }
                    }
                  }}
                >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Folder 
                      color="primary" 
                      sx={{ fontSize: { xs: 18, sm: 20 } }} 
                    />
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.85rem', sm: '0.95rem' }
                      }}
                    >
                  {item.path}
                </Typography>
              </Box>
            </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Typography 
                    variant="body2"
                    sx={{ 
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      lineHeight: 1.4
                    }}
                  >
                {item.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Next Steps */}
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
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 1 แล้ว
        </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.5
            }}
          >
          ตอนนี้คุณรู้จัก Next.js 15 และติดตั้งเรียบร้อยแล้ว! 
          พร้อมสำหรับการเรียนรู้เรื่อง File-based Routing ในบทถัดไป
        </Typography>
        
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.8rem', sm: '0.85rem' }
            }}
          >
            💡 <strong>บทถัดไป:</strong> เรียนรู้ File-based Routing ซึ่งเป็นหนึ่งในฟีเจอร์ที่ทำให้ Next.js พิเศษ
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
          href="/nextjs-basics"
          variant="outlined"
          size="small"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          หน้าหลักบทเรียน
        </Button>
        
        <Chip 
          label="1 / 18"
          color="primary"
          variant="outlined"
          size="small"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-2"
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