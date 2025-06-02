'use client';
import {
  Container,
  Typography,
  Box,
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
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  Terminal,
  Folder,
  PlayArrow,
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
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          🚀 บทที่ 1: เริ่มต้นกับ Next.js
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          ทำความรู้จักกับ Next.js และการติดตั้งโปรเจคแรกของคุณ
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Chip label="20 นาที" color="primary" />
          <Chip label="เริ่มต้น" color="secondary" />
          <Chip label="บังคับ" color="error" />
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
            <ListItemText primary="เข้าใจว่า Next.js คืออะไรและแตกต่างจาก React อย่างไร" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="สามารถติดตั้งและสร้างโปรเจค Next.js ใหม่ได้" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="เข้าใจโครงสร้างไฟล์และโฟลเดอร์ของ Next.js" />
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="รู้จักฟีเจอร์หลักๆ ของ Next.js" />
          </ListItem>
        </List>
      </Paper>

      {/* What is Next.js */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🤔 Next.js คืออะไร?
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          <strong>Next.js</strong> เป็น React Framework ที่ถูกพัฒนาโดย Vercel เพื่อช่วยให้การสร้างเว็บแอปพลิเคชันด้วย React 
          ง่ายและมีประสิทธิภาพมากขึ้น โดย Next.js มาพร้อมกับฟีเจอร์ที่จำเป็นสำหรับการ production ทั้งหมด
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            🎉 <strong>Next.js 15 ใหม่!</strong> เวอร์ชันล่าสุดมาพร้อม React 19, Turbopack (stable), 
            enhanced caching system และ performance improvements มากมาย
          </Typography>
        </Alert>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>เปรียบเทียบง่ายๆ:</strong> หาก React เป็นเหมือน "เครื่องมือสำหรับสร้างบ้าน" 
            แล้ว Next.js เป็นเหมือน "บ้านสำเร็จรูปที่มีฟีเจอร์ครบครัน" พร้อมใช้งานได้ทันที
          </Typography>
        </Alert>

        <Typography variant="h6" sx={{ mb: 2 }}>
          ความแตกต่างหลักระหว่าง React และ Next.js 15:
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
          <Paper sx={{ p: 3, flex: 1, bgcolor: 'grey.50' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              ⚛️ React (Library)
            </Typography>
            <List dense>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• ต้องตั้งค่าเองทุกอย่าง" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Client-side rendering เท่านั้น" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• ต้องติดตั้ง routing เพิ่ม" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• ไม่มี SEO optimization" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• ต้องจัดการ bundling เอง" />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3, flex: 1, bgcolor: 'success.light', color: 'success.contrastText' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ⚡ Next.js 15 (Framework)
            </Typography>
            <List dense>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• มาพร้อมการตั้งค่าเบื้องต้น" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• SSR, SSG, CSR ในตัว" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• File-based routing ง่าย" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• SEO-friendly ตั้งแต่แรก" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Turbopack (เร็วกว่า Webpack 96%)" />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• React 19 พร้อมใช้" />
              </ListItem>
            </List>
          </Paper>
        </Box>

        {/* Features Grid */}
        <Typography variant="h6" sx={{ mb: 3 }}>
          🌟 ฟีเจอร์เด่นของ Next.js:
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2,
          flexWrap: 'wrap'
        }}>
          {features.map((feature, index) => (
            <Paper key={index} sx={{ p: 2, flex: 1, minWidth: '250px' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {feature.icon} {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Paper>

      {/* Installation */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          💻 การติดตั้ง Next.js
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
            <strong>ข้อกำหนดเบื้องต้น:</strong> ต้องมี Node.js เวอร์ชัน 18.18.0 หรือใหม่กว่า
          </Typography>
        </Alert>

        <Stepper activeStep={activeStep} orientation="vertical">
          {installationSteps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="h6">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {step.description}
                </Typography>
                
                <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Terminal sx={{ fontSize: 16 }} />
                    <Typography variant="body2">คำสั่ง:</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    $ {step.command}
                  </Typography>
                </Box>

                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>ผลลัพธ์ที่คาดหวัง:</strong> {step.expectedOutput}
                  </Typography>
                </Alert>

                <Box sx={{ mb: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={index === installationSteps.length - 1}
                  >
                    {index === installationSteps.length - 1 ? 'เสร็จสิ้น' : 'ถัดไป'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    ย้อนกลับ
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {activeStep === installationSteps.length && (
          <Paper sx={{ p: 3, mt: 3, bgcolor: 'success.light' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🎉 ยินดีด้วย! คุณติดตั้ง Next.js 15 สำเร็จแล้ว
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              ตอนนี้คุณสามารถเปิดเบราว์เซอร์แล้วไปที่ <code>http://localhost:3000</code> 
              เพื่อดูเว็บไซต์แรกของคุณพร้อม Next.js 15 และ React 19
            </Typography>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                💡 <strong>Turbopack Tips:</strong> หากต้องการใช้ Turbopack เพิ่มเติม สามารถรันด้วย 
                <code> npm run dev --turbo</code> หรือเพิ่ม <code>--turbo</code> flag
              </Typography>
            </Alert>
            
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              ฟีเจอร์ใหม่ใน Next.js 15 ที่คุณจะได้เรียนรู้:
              • React 19 Server Components • Enhanced Caching • Static Route Indicator 
              • Improved Error Handling • และอื่นๆ อีกมากมาย
            </Typography>
            
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              เริ่มใหม่
            </Button>
          </Paper>
        )}
      </Paper>

      {/* Project Structure */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          📁 โครงสร้างโปรเจค Next.js
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          หลังจากสร้างโปรเจคเสร็จแล้ว คุณจะพบโครงสร้างไฟล์และโฟลเดอร์ดังนี้:
        </Typography>

        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', color: '#f8f8f2', fontSize: '0.9rem' }}>
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
        </Box>

        {projectStructure.map((item, index) => (
          <Accordion key={index} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Folder color="primary" />
                <Typography variant="subtitle1" sx={{ fontFamily: 'monospace' }}>
                  {item.path}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                {item.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* Next Steps */}
      <Paper sx={{ p: 4, bgcolor: 'success.light', color: 'success.dark' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 1 แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          ตอนนี้คุณรู้จัก Next.js 15 และติดตั้งเรียบร้อยแล้ว! 
          พร้อมสำหรับการเรียนรู้เรื่อง File-based Routing ในบทถัดไป
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>บทถัดไป:</strong> เรียนรู้ File-based Routing ซึ่งเป็นหนึ่งในฟีเจอร์ที่ทำให้ Next.js พิเศษ
          </Typography>
        </Alert>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics"
          variant="outlined"
        >
          หน้าหลักบทเรียน
        </Button>
        
        <Chip 
          label="1 / 16"
          color="primary"
          variant="outlined"
        />
        
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-2"
          variant="contained"
          color="primary"
        >
          บทที่ 2: File-based Routing
        </Button>
      </Box>
    </Container>
  );
} 