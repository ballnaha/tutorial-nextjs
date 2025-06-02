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
  Tab,
  Tabs,
  Card,
  CardContent,
  Stack,
  Avatar,
  LinearProgress,
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
  Palette,
  Build,
  DesignServices,
  Speed,
  Assignment,
  Timer,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';
import { useColorScheme } from '@mui/material/styles';

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

const installationSteps = [
  {
    label: 'ติดตั้ง Material-UI v7 core',
    description: 'ติดตั้ง package หลักของ Material-UI v7 พร้อม emotion สำหรับ styling',
    command: 'npm install @mui/material@latest @emotion/react @emotion/styled',
    expectedOutput: 'Material-UI v7 และ emotion ถูกติดตั้งเรียบร้อย'
  },
  {
    label: 'ติดตั้ง Material Icons',
    description: 'ติดตั้ง icon library ของ Material-UI',
    command: 'npm install @mui/icons-material@latest',
    expectedOutput: 'Material Icons v7 พร้อมใช้งาน'
  },
  {
    label: 'ติดตั้ง Next.js integration',
    description: 'ติดตั้ง package สำหรับ integration กับ Next.js 15',
    command: 'npm install @mui/material-nextjs@latest',
    expectedOutput: 'Next.js 15 integration พร้อมใช้งาน'
  },
  {
    label: 'Setup ใน Next.js 15',
    description: 'ตั้งค่า MUI v7 ให้ทำงานร่วมกับ Next.js 15 และ React 19',
    command: 'สร้างไฟล์ theme.ts และ registry.tsx',
    expectedOutput: 'MUI v7 พร้อมใช้งานใน Next.js 15 + React 19'
  }
];

const materialDesignPrinciples = [
  {
    title: 'Material is the metaphor',
    description: 'ใช้แนวคิดของวัสดุในโลกจริง เช่น กระดาษ หิน ที่มีความหนา เงา และการเคลื่อนไหวตามธรรมชาติ',
    icon: '📄',
    examples: ['Card components มีเงา', 'Button มี elevation', 'การเคลื่อนไหวที่สมจริง']
  },
  {
    title: 'Bold, graphic, intentional',
    description: 'ใช้สี typography และภาพที่โดดเด่น มีจุดมุ่งหมาย และสื่อความหมายชัดเจน',
    icon: '🎨',
    examples: ['สีที่มีความหมาย', 'Typography hierarchy', 'Iconography ที่ชัดเจน']
  },
  {
    title: 'Motion provides meaning',
    description: 'การเคลื่อนไหวต้องมีจุดประสงค์ ช่วยให้ผู้ใช้เข้าใจการทำงานและการนำทางได้ดีขึ้น',
    icon: '⚡',
    examples: ['Transition ที่มีความหมาย', 'Feedback animations', 'การนำทางที่ลื่นไหล']
  }
];

const firstComponents = [
  {
    name: 'Button',
    description: 'Component พื้นฐานสำหรับการกระทำ',
    code: `import { Button } from '@mui/material';

<Button variant="contained">
  Hello Material-UI
</Button>`,
    preview: 'ปุ่มสีน้ำเงินพร้อมเงา'
  },
  {
    name: 'Typography',
    description: 'Component สำหรับแสดงข้อความ',
    code: `import { Typography } from '@mui/material';

<Typography variant="h4" component="h1">
  หัวข้อหลัก
</Typography>
<Typography variant="body1">
  เนื้อหาในย่อหน้า
</Typography>`,
    preview: 'ข้อความที่มี hierarchy ชัดเจน'
  },
  {
    name: 'Card',
    description: 'Container สำหรับจัดกลุมข้อมูล',
    code: `import { Card, CardContent } from '@mui/material';

<Card>
  <CardContent>
    <Typography variant="h5">
      Card Title
    </Typography>
    <Typography variant="body2">
      Card content goes here
    </Typography>
  </CardContent>
</Card>`,
    preview: 'กล่องขาวพร้อมเงาและเนื้อหา'
  }
];

const setupCode = {
  theme: `// theme.ts (MUI v7 + CSS Variables)
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true, // เปิดใช้ CSS Variables ใน v7
  colorSchemes: {
    light: true,
    dark: true, // รองรับ dark mode อัตโนมัติ
  },
  palette: {
    primary: {
      main: '#1976d2', // สีน้ำเงิน
    },
    secondary: {
      main: '#dc004e', // สีแดง
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto), Roboto, Arial, sans-serif',
  },
  // ใช้ applyStyles แทน palette.mode เพื่อป้องกัน SSR flickering
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          textTransform: 'none',
          ...theme.applyStyles('dark', {
            color: theme.vars.palette.primary.light,
          }),
        }),
      },
    },
  },
});

export default theme;`,
  
  registry: `// registry.tsx (Next.js 15 App Router + MUI v7)
'use client';
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

export default function MUIRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider
      options={{
        enableCssLayer: true, // รองรับ CSS Layers ใน v7
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}`,
  
  layout: `// app/layout.tsx (Next.js 15 + React 19)
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import MUIRegistry from './registry';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Material-UI v7 App',
  description: 'Next.js 15 + React 19 + Material-UI v7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={roboto.variable}>
      <body>
        <MUIRegistry>
          {children}
        </MUIRegistry>
      </body>
    </html>
  );
}`,
  
  firstPage: `// app/page.tsx (MUI v7 + React 19 features)
import { 
  Button, 
  Typography, 
  Container, 
  Box, 
  Card,
  CardContent,
  Chip,
  Stack
} from '@mui/material';
import { Palette, DarkMode, LightMode } from '@mui/icons-material';
import { useColorScheme } from '@mui/material/styles';

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  
  if (!mode) return null;
  
  return (
    <Button
      variant="outlined"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      startIcon={mode === 'light' ? <DarkMode /> : <LightMode />}
    >
      เปลี่ยนเป็น {mode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          ยินดีต้อนรับสู่ Material-UI v7! 🎉
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          เริ่มต้นสร้าง UI ที่สวยงามด้วย MUI v7 + Next.js 15 + React 19
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Chip label="MUI v7" color="primary" />
          <Chip label="Next.js 15" color="secondary" />
          <Chip label="React 19" color="success" />
          <Chip label="CSS Variables" color="info" />
        </Stack>
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ✨ Features ใหม่ใน v7:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              • ESM Support ที่ดีขึ้น<br />
              • CSS Layers support<br />
              • React 19 compatibility<br />
              • Slots pattern ที่สมบูรณ์<br />
              • ลบ deprecated APIs
            </Typography>
          </CardContent>
        </Card>
        
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<Palette />}
          >
            เริ่มใช้งาน MUI v7
          </Button>
          
          <ThemeToggle />
        </Stack>
      </Box>
    </Container>
  );
}`
};

export default function MUILesson1Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

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
            href="/mui-tutorial"
            sx={{ mb: 2 }}
          >
            กลับไปหน้าหลัก
          </Button>
          
          <Typography variant="h1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Palette color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 1: เริ่มต้นกับ Material-UI v7
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            ทำความรู้จักกับ Material-UI v7 และเริ่มสร้าง UI ที่สวยงามสำหรับมือใหม่! 🎨
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Palette />} label="Material-UI v7" color="primary" />
            <Chip icon={<DesignServices />} label="Material Design" color="secondary" />
            <Chip icon={<Speed />} label="Next.js 15" color="info" />
            <Chip icon={<Build />} label="React 19" color="warning" />
            <Chip icon={<Build />} label="ESM Support" color="success" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> เข้าใจและใช้ Material-UI v7 ได้อย่างมั่นใจ
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 25 นาที | 
              📊 <strong>ระดับ:</strong> เริ่มต้นสำหรับมือใหม่
            </Typography>
          </Alert>

          {/* What is Material-UI */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.50', border: '2px solid', borderColor: 'primary.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="primary" /> 🤔 Material-UI v7 คืออะไร? (อธิบายแบบง่ายๆ)
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              ลองนึกภาพว่าคุณเป็น <strong>นักสร้างบ้าน</strong>:
            </Typography>

            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🧱 <strong>React:</strong> เหมือนวัสดุก่อสร้าง (อิฐ ซีเมนต์ เหล็ก)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🏠 <strong>Material-UI v7:</strong> เหมือนส่วนประกอบสำเร็จรูป (ประตู หน้าต่าง ห้องน้ำ)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 📐 <strong>Material Design:</strong> แบบแปลนที่ Google ออกแบบให้
              </Typography>
              <Typography variant="body2">
                • ✨ <strong>ผลลัพธ์:</strong> สร้างบ้านสวยเร็วกว่า และมีมาตรฐานเดียวกัน
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> UI ที่สวยงาม, เร็ว, และใช้งานง่าย เหมือนแอป Google!
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
                    primary="เข้าใจ Material-UI v7 พื้นฐาน" 
                    secondary="Component Library, Material Design, Theme"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ติดตั้งและตั้งค่า MUI v7" 
                    secondary="ในโปรเจค Next.js อย่างถูกต้อง"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ใช้ Component พื้นฐาน" 
                    secondary="Button, Typography, Card"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เข้าใจ Material Design" 
                    secondary="หลักการออกแบบและปรัชญา"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ThemeProvider & CssBaseline" 
                    secondary="ตั้งค่าเริ่มต้นสำหรับ MUI"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เขียนโค้ดโปรเจคแรก" 
                    secondary="หน้าเว็บง่ายๆ ด้วย MUI"
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
              label="🤔 MUI คืออะไร?" 
              icon={<Assignment />}
              iconPosition="start"
            />
            <Tab 
              label="⚙️ การติดตั้ง v7" 
              icon={<Build />}
              iconPosition="start"
            />
            <Tab 
              label="🎨 Features ใหม่ v7" 
              icon={<Speed />}
              iconPosition="start"
            />
            <Tab 
              label="🧩 Component แรก" 
              icon={<Palette />}
              iconPosition="start"
            />
            <Tab 
              label="⚡ ตัวอย่างโค้ด" 
              icon={<Code />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: What is MUI */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>🤔 Material-UI v7 (MUI) คืออะไร?</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Material-UI v7 (MUI)</strong> เป็น React Component Library ที่ใหญ่ที่สุดและได้รับความนิยมสูงสุด 
            ที่ใช้หลักการ <strong>Material Design</strong> จาก Google ในการออกแบบ Component ต่างๆ
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>✨ ข้อดีของ Material-UI v7</Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    🚀 ความเร็วในการพัฒนา
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Component สำเร็จรูป พร้อม CSS Variables และ ESM Support ที่ดีขึ้น
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label="50+ Components" size="small" variant="outlined" />
                    <Chip label="CSS Variables" size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                    🎨 ความสวยงามตามมาตรฐาน
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    รองรับ Dark/Light Mode อัตโนมัติ และใช้หลักการ Material Design
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label="Auto Dark Mode" size="small" variant="outlined" />
                    <Chip label="React 19 Ready" size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🏆 <strong>สถิติน่าสนใจ:</strong> MUI v7 มี download มากกว่า 3.5 ล้านครั้งต่อสัปดาห์ 
              และถูกใช้งานโดยบริษัทใหญ่ๆ เช่น Spotify, Amazon, Netflix
            </Typography>
          </Alert>
        </TabPanel>

        {/* Tab 2: Installation */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>⚙️ การติดตั้ง Material-UI v7</Typography>

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              📋 <strong>สิ่งที่ต้องมีก่อน:</strong> Node.js 18+, Next.js 15, React 19 และความรู้พื้นฐาน React
            </Typography>
          </Alert>

          <Typography variant="h5" sx={{ mb: 2 }}>🛠️ ขั้นตอนการติดตั้ง</Typography>

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
                  
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
                      {step.command}
                    </Typography>
                  </Box>
                  
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      ✅ <strong>ผลลัพธ์:</strong> {step.expectedOutput}
                    </Typography>
                  </Alert>

                  <Box sx={{ mb: 1 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
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
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === installationSteps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎉 MUI v7 ติดตั้งเรียบร้อยแล้ว!
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                ตอนนี้คุณพร้อมใช้งาน Material-UI v7 ใน Next.js 15 + React 19 แล้ว
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                เริ่มใหม่
              </Button>
            </Paper>
          )}
        </TabPanel>

        {/* Tab 3: Material Design */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎨 Features ใหม่ใน MUI v7</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Material-UI v7</strong> เป็น major release ที่มาพร้อมกับการปรับปรุงสำคัญ 
            เพื่อประสิทธิภาพและความเข้ากันได้กับเครื่องมือสมัยใหม่
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              💡 <strong>ทำไมต้อง v7?</strong> ESM Support ที่ดีขึ้น, CSS Layers, React 19 และลบ deprecated APIs
            </Typography>
          </Alert>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 Features ใหม่สำคัญ</Typography>
          
          <Box sx={{ display: 'grid', gap: 3 }}>
            {[
              {
                title: 'CSS Variables & Color Schemes',
                description: 'รองรับ CSS Variables และ Dark/Light Mode โดยอัตโนมัติ ป้องกัน SSR flickering',
                icon: '🎨',
                examples: ['theme.vars.palette.primary.main', 'colorSchemes: { dark: true }', 'useColorScheme() hook']
              },
              {
                title: 'ESM Support ที่ดีขึ้น',
                description: 'Package layout ใหม่ที่รองรับ ESM และ CommonJS อย่างถูกต้อง ทำงานได้ดีกับ Vite และ webpack',
                icon: '📦',
                examples: ['Valid ESM exports', 'CommonJS compatibility', 'Better bundler support']
              },
              {
                title: 'CSS Layers & Slots Pattern',
                description: 'รองรับ CSS Layers สำหรับ Tailwind CSS v4 และ Slots pattern ที่สมบูรณ์',
                icon: '🔧',
                examples: ['enableCssLayer: true', 'slots={{ transition: Component }}', 'slotProps integration']
              }
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Typography variant="h4">{feature.icon}</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        ตัวอย่าง:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {feature.examples.map((example, idx) => (
                          <Chip key={idx} label={example} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Alert severity="success" sx={{ mt: 3 }}>
            <Typography variant="body2">
              🚀 <strong>ผลลัพธ์:</strong> Performance ดีขึ้น, Bundle size เล็กลง, และใช้งานได้ดีกับ React 19 + Next.js 15
            </Typography>
          </Alert>
        </TabPanel>

        {/* Tab 4: First Components */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>🧩 Component พื้นฐานแรก</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            มาทำความรู้จักกับ Component พื้นฐานที่จะใช้งานบ่อยที่สุดใน Material-UI
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🔧 Component ที่ต้องรู้</Typography>

          <Stack spacing={3}>
            {firstComponents.map((component, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {component.name} - {component.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    💻 ตัวอย่างโค้ด:
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {component.code}
                    </Typography>
                  </Box>
                  
                  <Alert severity="info">
                    <Typography variant="body2">
                      👀 <strong>ผลลัพธ์:</strong> {component.preview}
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Alert severity="warning" sx={{ mt: 3 }}>
            <Typography variant="body2">
              💡 <strong>เคล็ดลับ:</strong> เริ่มต้นด้วย Component เหล่านี้ก่อน เมื่อคุ้นเคยแล้วค่อยไปเรียนรู้ Component อื่นๆ 
              ที่ซับซ้อนมากขึ้น
            </Typography>
          </Alert>
        </TabPanel>

        {/* Tab 5: Code Examples */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>⚡ ตัวอย่างโค้ดครบครัน</Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            ตัวอย่างการตั้งค่าและใช้งาน Material-UI ใน Next.js แบบสมบูรณ์
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>📁 ไฟล์ที่ต้องสร้าง</Typography>

          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>1. สร้างไฟล์ Theme</Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {setupCode.theme}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>2. สร้าง MUI Registry</Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {setupCode.registry}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>3. ปรับ Layout หลัก</Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {setupCode.layout}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>4. หน้าแรกพร้อมใช้งาน</Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {setupCode.firstPage}
                  </Typography>
                </Box>
                <Alert severity="success">
                  <Typography variant="body2">
                    🎉 <strong>ผลลัพธ์:</strong> หน้าเว็บที่สวยงามพร้อม Material-UI styling เต็มรูปแบบ!
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Stack>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/mui-tutorial"
            variant="outlined"
          >
            กลับหน้าหลัก MUI
          </Button>
          
          <Chip 
            label="1 / 8"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/mui-tutorial/lesson-2"
            variant="contained"
          >
            บทที่ 2: Theme และ Styling
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 