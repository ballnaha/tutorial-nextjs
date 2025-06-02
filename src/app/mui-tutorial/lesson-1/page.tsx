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

const installationSteps = [
  {
    label: 'ติดตั้ง Material-UI core v7',
    description: 'ติดตั้ง package หลักของ Material-UI v7 ล่าสุด พร้อม emotion สำหรับ styling',
    command: 'npm install @mui/material@^7.0.0 @emotion/react @emotion/styled',
    expectedOutput: 'Material-UI v7 และ emotion ถูกติดตั้งเรียบร้อย'
  },
  {
    label: 'ติดตั้ง Material Icons v7',
    description: 'ติดตั้ง icon library ของ Material-UI version 7',
    command: 'npm install @mui/icons-material@^7.0.0',
    expectedOutput: 'Material Icons v7 พร้อมใช้งาน'
  },
  {
    label: 'ติดตั้ง Roboto Font (เสริม)',
    description: 'ติดตั้ง font ที่แนะนำสำหรับ Material Design 3',
    command: 'npm install @fontsource/roboto',
    expectedOutput: 'Roboto font พร้อมใช้งาน'
  },
  {
    label: 'Setup ใน Next.js 15 (สำคัญ!)',
    description: 'สร้างไฟล์ theme.ts และ registry.tsx เพื่อให้ MUI ทำงานร่วมกับ Next.js App Router ได้อย่างถูกต้อง เพราะ MUI ใช้ CSS-in-JS ที่ต้องการการตั้งค่าพิเศษสำหรับ Server-Side Rendering',
    command: 'สร้างไฟล์ theme.ts (กำหนดสีและรูปแบบ) และ registry.tsx (จัดการ SSR)',
    expectedOutput: 'MUI v7 พร้อมใช้งานใน Next.js 15 โดยไม่มีปัญหา hydration และ styling'
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
  theme: `// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // สีน้ำเงิน
    },
    secondary: {
      main: '#dc004e', // สีแดง
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;`,
  
  registry: `// registry.tsx (App Router)
'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

export default function MUIRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}`,
  
  layout: `// app/layout.tsx
import MUIRegistry from './registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <MUIRegistry>
          {children}
        </MUIRegistry>
      </body>
    </html>
  );
}`,
  
  firstPage: `// app/page.tsx
import { Button, Typography, Container, Box } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          ยินดีต้อนรับสู่ Material-UI!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          เริ่มต้นสร้าง UI ที่สวยงามด้วย MUI
        </Typography>
        <Button variant="contained" size="large">
          เริ่มใช้งาน
        </Button>
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
            บทที่ 1: เริ่มต้นกับ Material-UI
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            ทำความรู้จักกับ Material-UI และเริ่มสร้าง UI ที่สวยงามสำหรับมือใหม่! 🎨
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Palette />} label="Material-UI v7" color="primary" />
            <Chip icon={<DesignServices />} label="Material Design 3" color="secondary" />
            <Chip icon={<Build />} label="Component Library" color="success" />
            <Chip icon={<Speed />} label="Fast Development" color="warning" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> เข้าใจและใช้ Material-UI ได้อย่างมั่นใจ
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 25 นาที | 
              📊 <strong>ระดับ:</strong> เริ่มต้นสำหรับมือใหม่
            </Typography>
          </Alert>

          {/* What is Material-UI */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.50', border: '2px solid', borderColor: 'primary.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="primary" /> 🤔 Material-UI คืออะไร? (อธิบายแบบง่ายๆ)
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              ลองนึกภาพว่าคุณเป็น <strong>นักสร้างบ้าน</strong>:
            </Typography>

            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🧱 <strong>React:</strong> เหมือนวัสดุก่อสร้าง (อิฐ ซีเมนต์ เหล็ก)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🏠 <strong>Material-UI:</strong> เหมือนส่วนประกอบสำเร็จรูป (ประตู หน้าต่าง ห้องน้ำ)
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
                    primary="เข้าใจ Material-UI พื้นฐาน" 
                    secondary="Component Library, Material Design, Theme"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ติดตั้งและตั้งค่า MUI" 
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
              label="⚙️ การติดตั้ง" 
              icon={<Build />}
              iconPosition="start"
            />
            <Tab 
              label="🎨 Material Design" 
              icon={<DesignServices />}
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
          <Typography variant="h3" sx={{ mb: 3 }}>🤔 Material-UI (MUI) คืออะไร?</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Material-UI (MUI)</strong> เป็น React Component Library ที่ใหญ่ที่สุดและได้รับความนิยมสูงสุด 
            ที่ใช้หลักการ <strong>Material Design</strong> จาก Google ในการออกแบบ Component ต่างๆ
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>✨ ข้อดีของ Material-UI</Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    🚀 ความเร็วในการพัฒนา
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Component สำเร็จรูป ไม่ต้องสร้าง CSS เอง ประหยัดเวลาได้มาก
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label="50+ Components" size="small" variant="outlined" />
                    <Chip label="No CSS needed" size="small" variant="outlined" />
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
                    ใช้หลักการ Material Design ทำให้ UI ดูทันสมัย เหมือนแอป Google
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label="Material Design 3" size="small" variant="outlined" />
                    <Chip label="Google Standard" size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🏆 <strong>สถิติน่าสนใจ:</strong> MUI มี download มากกว่า 3.5 ล้านครั้งต่อสัปดาห์ 
              และถูกใช้งานโดยบริษัทใหญ่ๆ เช่น Spotify, Amazon, Netflix
            </Typography>
          </Alert>
        </TabPanel>

        {/* Tab 2: Installation */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>⚙️ การติดตั้ง Material-UI</Typography>

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              📋 <strong>สิ่งที่ต้องมีก่อน:</strong> Node.js, Next.js project และความรู้พื้นฐาน React
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
                🎉 ติดตั้งเรียบร้อยแล้ว!
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                ตอนนี้คุณพร้อมใช้งาน Material-UI ใน Next.js แล้ว
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                เริ่มใหม่
              </Button>
            </Paper>
          )}
        </TabPanel>

        {/* Tab 3: Material Design */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎨 หลักการ Material Design</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Material Design</strong> เป็นระบบออกแบบที่พัฒนาโดย Google 
            เพื่อสร้างประสบการณ์ผู้ใช้ที่สม่ำเสมอและสวยงามในทุกแพลตฟอร์ม
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              💡 <strong>คิดง่ายๆ:</strong> Material Design เหมือนการออกแบบที่ได้แรงบันดาลใจจากกระดาษและหมึก 
              แต่เพิ่มเทคโนโลจีและจินตนาการเข้าไป
            </Typography>
          </Alert>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 หลักการสำคัญ 3 ข้อ</Typography>
          
          <Box sx={{ display: 'grid', gap: 3 }}>
            {materialDesignPrinciples.map((principle, index) => (
              <Card key={index}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Typography variant="h4">{principle.icon}</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {principle.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {principle.description}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        ตัวอย่าง:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {principle.examples.map((example, idx) => (
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
              🎨 <strong>ทำไมต้อง Material Design?</strong> ทำให้ UI/UX สอดคล้องกับที่ผู้ใช้คุ้นเคย 
              เพราะใช้งานใน Android, Gmail, Google Drive และแอปอื่นๆ ของ Google
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

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🚨 <strong>สำคัญ!</strong> Next.js App Router ใช้ Server-Side Rendering (SSR) ซึ่งทำให้ MUI 
              ต้องการการตั้งค่าพิเศษเพื่อป้องกันปัญหา &quot;hydration mismatch&quot; และ &quot;stylesheet loading&quot;
            </Typography>
          </Alert>

          <Typography variant="h5" sx={{ mb: 2 }}>📁 ไฟล์ที่ต้องสร้าง และ เหตุผล</Typography>

          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  1. สร้างไฟล์ theme.ts - &quot;ศูนย์กลางของการออกแบบ&quot;
                </Typography>
                
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    💡 <strong>ทำไมต้องมี theme.ts?</strong>
                    <br />• เก็บการตั้งค่าสี, font, spacing ไว้ที่เดียว
                    <br />• ทำให้เปลี่ยน design ได้ง่าย (เปลี่ยนที่เดียว ได้ทั้งแอป)
                    <br />• สร้างความสอดคล้องของ UI ทั้งแอป
                  </Typography>
                </Alert>

                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {setupCode.theme}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                  2. สร้าง MUI Registry - &quot;ตัวจัดการ SSR และ Theme&quot;
                </Typography>
                
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    ⚡ <strong>ทำไมต้องมี registry.tsx?</strong>
                    <br />• Next.js เรนเดอร์ HTML บน server ก่อน แล้วส่งไป browser
                    <br />• MUI ใช้ CSS-in-JS ที่ต้องรอ JavaScript load เสร็จ
                    <br />• ถ้าไม่มี registry จะเกิด &quot;flash&quot; (UI กระพริบ) เมื่อโหลดหน้า
                    <br />• registry ช่วยให้ CSS ถูกส่งมาพร้อม HTML เลย
                  </Typography>
                </Alert>

                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {setupCode.registry}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                  3. ปรับ Layout หลัก - &quot;เชื่อม Registry เข้ากับแอป&quot;
                </Typography>
                
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    🔗 <strong>วิธีการทำงาน:</strong>
                    <br />• layout.tsx คือไฟล์หลักที่ครอบทุกหน้า
                    <br />• เรา wrap children ด้วย MUIRegistry
                    <br />• ทำให้ทุกหน้าใช้ theme และ CSS ได้อย่างถูกต้อง
                  </Typography>
                </Alert>

                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {setupCode.layout}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
                  4. หน้าแรกพร้อมใช้งาน - &quot;ทดสอบการทำงาน&quot;
                </Typography>
                
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    🧪 <strong>การทดสอบ:</strong>
                    <br />• ใช้ MUI components โดยไม่ต้อง import ThemeProvider
                    <br />• สีจาก theme ทำงานอัตโนมัติ
                    <br />• ไม่มี flash หรือ hydration error
                  </Typography>
                </Alert>

                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {setupCode.firstPage}
                  </Typography>
                </Box>
                <Alert severity="success">
                  <Typography variant="body2">
                    🎉 <strong>ผลลัพธ์:</strong> หน้าเว็บที่สวยงามพร้อม Material-UI styling เต็มรูปแบบ 
                    โดยไม่มีปัญหา SSR!
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Stack>

          <Paper sx={{ p: 3, mt: 4, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
              🤔 สรุป: ทำไมต้องมีไฟล์เหล่านี้?
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>theme.ts:</strong> เก็บการตั้งค่า design ไว้ที่เดียว (single source of truth)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>registry.tsx:</strong> แก้ปัญหา CSS-in-JS กับ SSR ใน Next.js
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • <strong>layout.tsx:</strong> นำ registry ไปใช้ในแอปทั้งหมด
              </Typography>
              <Typography variant="body2">
                • <strong>ผลลัพธ์:</strong> MUI ทำงานได้อย่างสมบูรณ์โดยไม่มี bugs!
              </Typography>
            </Box>
          </Paper>
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