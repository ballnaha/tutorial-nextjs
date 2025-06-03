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
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  CloudUpload,
  PlayArrow,
  Lightbulb,
  Timer,
  Refresh,
  Security,
  Visibility,
  Build,
  Rocket,
  Settings,
  Monitor,
  BugReport,
  CloudDone,
  Storage,
  VpnKey,
  Analytics,
  AutoFixHigh,
  CheckBox,
  GitHub,
  Cloud,
  Computer,
  Assessment,
  Code,
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
interface DeploymentStep {
  id: number;
  title: string;
  description: string;
  status: 'waiting' | 'running' | 'completed' | 'error';
  duration: number;
}

function DeploymentDemo() {
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    { id: 1, title: 'Build Application', description: 'กำลังสร้างไฟล์ production', status: 'waiting', duration: 0 },
    { id: 2, title: 'Run Tests', description: 'ทดสอบโค้ดอัตโนมัติ', status: 'waiting', duration: 0 },
    { id: 3, title: 'Deploy to Server', description: 'อัปโหลดไฟล์ไปยัง server', status: 'waiting', duration: 0 },
    { id: 4, title: 'Health Check', description: 'ตรวจสอบว่าเว็บทำงานปกติ', status: 'waiting', duration: 0 },
  ]);

  const [isDeploying, setIsDeploying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const startDeployment = () => {
    setIsDeploying(true);
    setCurrentStep(0);
    
    // Reset all steps
    setDeploymentSteps(steps => steps.map(step => ({ ...step, status: 'waiting' as const, duration: 0 })));
    
    // Simulate deployment process
    const timeouts: NodeJS.Timeout[] = [];
    
    deploymentSteps.forEach((step, index) => {
      const stepDuration = 2000 + (index * 1500); // Each step takes longer
      
      timeouts.push(setTimeout(() => {
        setCurrentStep(index);
        setDeploymentSteps(prevSteps => 
          prevSteps.map(s => 
            s.id === step.id 
              ? { ...s, status: 'running' as const }
              : s
          )
        );
        
        // Complete step after duration
        timeouts.push(setTimeout(() => {
          setDeploymentSteps(prevSteps => 
            prevSteps.map(s => 
              s.id === step.id 
                ? { ...s, status: 'completed' as const, duration: stepDuration / 1000 }
                : s
            )
          );
          
          if (index === deploymentSteps.length - 1) {
            setIsDeploying(false);
            setCurrentStep(-1);
          }
        }, stepDuration));
      }, index * 3500));
    });
  };

  const resetDeployment = () => {
    setIsDeploying(false);
    setCurrentStep(-1);
    setDeploymentSteps(steps => steps.map(step => ({ ...step, status: 'waiting' as const, duration: 0 })));
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'running': return <CircularProgress size={20} />;
      case 'completed': return <CheckCircle color="success" />;
      case 'error': return <ErrorIcon color="error" />;
      default: return <Timer color="disabled" />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'running': return 'primary';
      case 'completed': return 'success';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🚀 Deployment Pipeline Demo
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={startDeployment}
            disabled={isDeploying}
            startIcon={<Rocket />}
            sx={{ mr: 2 }}
          >
            เริ่ม Deploy
          </Button>
          <Button
            variant="outlined"
            onClick={resetDeployment}
            startIcon={<Refresh />}
            disabled={isDeploying}
          >
            รีเซ็ต
          </Button>
        </Box>

        <Stepper activeStep={currentStep} orientation="vertical">
          {deploymentSteps.map((step, index) => (
            <Step key={step.id}>
              <StepLabel
                icon={getStepIcon(step.status)}
                sx={{
                  '& .MuiStepLabel-label': {
                    color: step.status === 'completed' ? 'success.main' : 'inherit'
                  }
                }}
              >
                <Box>
                  <Typography variant="subtitle2">{step.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                  {step.duration > 0 && (
                    <Typography variant="caption" color="success.main">
                      ✅ เสร็จใน {step.duration.toFixed(1)} วินาที
                    </Typography>
                  )}
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {!isDeploying && deploymentSteps.every(step => step.status === 'completed') && (
          <Alert severity="success" sx={{ mt: 3 }}>
            <Typography variant="body2">
              🎉 <strong>Deploy สำเร็จ!</strong> เว็บไซต์ของคุณออนไลน์แล้วและพร้อมให้ผู้ใช้เข้าถึง
              <br />
              📱 เว็บไซต์: <strong>https://your-app.vercel.app</strong>
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function EnvironmentDemo() {
  const [selectedEnv, setSelectedEnv] = useState<'development' | 'staging' | 'production'>('development');
  
  const environments = {
    development: {
      color: 'info',
      icon: <Computer color="info" />,
      url: 'http://localhost:3000',
      variables: {
        'NODE_ENV': 'development',
        'API_URL': 'http://localhost:3001/api',
        'DEBUG': 'true',
        'DATABASE_URL': 'mongodb://localhost:27017/dev'
      },
      description: 'สำหรับพัฒนาและทดสอบในเครื่อง'
    },
    staging: {
      color: 'warning',
      icon: <Build color="warning" />,
      url: 'https://staging-app.vercel.app',
      variables: {
        'NODE_ENV': 'production',
        'API_URL': 'https://staging-api.vercel.app/api',
        'DEBUG': 'false',
        'DATABASE_URL': 'mongodb+srv://staging.cluster.mongodb.net'
      },
      description: 'สำหรับทดสอบก่อนเผยแพร่จริง'
    },
    production: {
      color: 'success',
      icon: <CloudDone color="success" />,
      url: 'https://your-app.com',
      variables: {
        'NODE_ENV': 'production',
        'API_URL': 'https://api.your-app.com',
        'DEBUG': 'false',
        'DATABASE_URL': 'mongodb+srv://prod.cluster.mongodb.net'
      },
      description: 'เว็บไซต์จริงที่ผู้ใช้เข้าถึง'
    }
  };

  const currentEnv = environments[selectedEnv];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🌍 Environment Variables Demo
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          {Object.entries(environments).map(([key, env]) => (
            <Button
              key={key}
              variant={selectedEnv === key ? 'contained' : 'outlined'}
              onClick={() => setSelectedEnv(key as any)}
              startIcon={env.icon}
              sx={{ mr: 1, mb: 1 }}
              color={env.color as any}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Button>
          ))}
        </Box>

        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            {currentEnv.icon}
            <Box>
              <Typography variant="h6">
                {selectedEnv.charAt(0).toUpperCase() + selectedEnv.slice(1)} Environment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentEnv.description}
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'primary.main' }}>
                {currentEnv.url}
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Environment Variables:
          </Typography>
          
          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
            {Object.entries(currentEnv.variables).map(([key, value]) => (
              <Box key={key} sx={{ display: 'flex', mb: 1, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                <Typography component="span" sx={{ color: 'primary.main', minWidth: 120 }}>
                  {key}=
                </Typography>
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            💡 <strong>ทำไมต้องแยก Environment?</strong> เพื่อให้การพัฒนา การทดสอบ และการใช้งานจริงมีการตั้งค่าที่เหมาะสมแต่ละสถานการณ์
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default function Lesson15Page() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      maxWidth: '100vw',
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 2, sm: 3 },
      overflow: 'hidden',
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics"
          sx={{ mb: 2, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
        >
          กลับไปหน้าหลัก
        </Button>
        <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, fontWeight: 600, mb: 2, lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <CloudUpload color="primary" sx={{ fontSize: { xs: '2.2rem', sm: '3rem' } }} />
          บทที่ 15: Deployment
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3, '& .MuiChip-root': { fontSize: { xs: '0.75rem', sm: '0.8rem' } } }}>
          <Chip icon={<CloudUpload />} label="Vercel" color="primary" size="small" />
          <Chip icon={<Build />} label="CI/CD" color="secondary" size="small" />
          <Chip icon={<Assessment />} label="Monitor" color="info" size="small" />
          <Chip icon={<Code />} label="Best Practice" color="success" size="small" />
        </Stack>
        <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
          <Typography variant="body2">
            ⏱️ <strong>ระยะเวลา:</strong> 40 นาที | 
            📊 <strong>ระดับ:</strong> ปานกลาง | 
            🎯 <strong>เป้าหมาย:</strong> เรียนรู้ Deployment & Best Practices ใน Next.js
          </Typography>
        </Alert>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: { xs: 3, sm: 4 } }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="☁️ Vercel" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="🔧 CI/CD" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="📊 Monitor" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="💡 Best Practice" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        <Typography variant="h3" sx={{ mb: 3 }}>💡 เริ่มต้นกับ Deployment</Typography>
        
        {/* Why Deployment Matters */}
        <Typography variant="h5" sx={{ mb: 2 }}>🌐 ทำไมต้อง Deploy?</Typography>
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'info.50', border: '2px solid', borderColor: 'info.200' }}>            
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'error.main' }}>😭 ก่อน Deploy:</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Computer color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="แค่คุณเดียวที่ใช้ได้" 
                    secondary="อยู่ใน localhost:3000"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ปิดเครื่อง = เว็บหาย" 
                    secondary="ไม่มีใครเข้าถึงได้"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ไม่มีการ backup" 
                    secondary="เสี่ยงข้อมูลหาย"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'success.main' }}>🎉 หลัง Deploy:</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Cloud color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ทุกคนเข้าถึงได้" 
                    secondary="มี URL ใช้งานจริง"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CloudDone color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ออนไลน์ 24/7" 
                    secondary="ไม่ต้องเปิดเครื่องตลอด"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Security color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="มีระบบ backup" 
                    secondary="ข้อมูลปลอดภัย"
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>

        {/* Deployment Options */}
        <Typography variant="h5" sx={{ mb: 2 }}>☁️ ตัวเลือกการ Deploy</Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
          <Card sx={{ border: '2px solid', borderColor: 'success.200' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'success.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                <CloudDone color="success" /> Vercel
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                แพลตฟอร์มหลักสำหรับ Next.js ที่ทำโดยผู้สร้าง Next.js เอง
              </Typography>
              <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
                ✅ ใช้งานง่ายที่สุด
              </Typography>
              <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
                ✅ Deploy ใน 30 วินาที
              </Typography>
              <Typography variant="body2" color="success.main">
                ✅ มี Free plan
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'info.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Cloud color="info" /> Netlify
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                แพลตฟอร์มที่เป็นมิตรกับนักพัฒนา
              </Typography>
              <Typography variant="body2" color="info.main" sx={{ mb: 1 }}>
                ✅ Static site hosting
              </Typography>
              <Typography variant="body2" color="info.main" sx={{ mb: 1 }}>
                ✅ Forms และ Functions
              </Typography>
              <Typography variant="body2" color="info.main">
                ✅ CDN ทั่วโลก
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'warning.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Storage color="warning" /> AWS/GCP
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                สำหรับโปรเจคขนาดใหญ่
              </Typography>
              <Typography variant="body2" color="warning.main" sx={{ mb: 1 }}>
                ⚠️ ตั้งค่าซับซ้อน
              </Typography>
              <Typography variant="body2" color="warning.main" sx={{ mb: 1 }}>
                ⚠️ ต้องมีความรู้ server
              </Typography>
              <Typography variant="body2" color="success.main">
                ✅ Customizable มาก
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Alert severity="success" sx={{ mb: 4 }}>
          <Typography variant="body2">
            💡 <strong>แนะนำสำหรับมือใหม่:</strong> เริ่มต้นด้วย Vercel เพราะง่ายที่สุด 
            และมีความเชี่ยวชาญเฉพาะ Next.js
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Typography variant="h3" sx={{ mb: 3 }}>🚀 Vercel Deployment</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          Vercel เป็นแพลตฟอร์มที่ดีที่สุดสำหรับ Next.js เพราะทำโดยคนเดียวกัน!
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>📋 ขั้นตอนการ Deploy แบบละเอียด</Typography>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper orientation="vertical">
            <Step>
              <StepLabel>
                <Typography variant="subtitle1">เตรียม GitHub Repository</Typography>
              </StepLabel>
              <Box sx={{ mt: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  อัปโหลดโค้ดของคุณไป GitHub ก่อน:
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# ใน terminal
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/your-app.git
git push -u origin main`}
                  </Typography>
                </Box>
              </Box>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="subtitle1">สมัครและเชื่อม Vercel</Typography>
              </StepLabel>
              <Box sx={{ mt: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  1. ไปที่ <strong>vercel.com</strong> และ Sign up ด้วย GitHub
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  2. กด "New Project"
                </Typography>
                <Typography variant="body2">
                  3. เลือก Repository ที่ต้องการ deploy
                </Typography>
              </Box>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="subtitle1">กำหนดค่าการ Deploy</Typography>
              </StepLabel>
              <Box sx={{ mt: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Vercel จะตรวจจับ Next.js อัตโนมัติ แต่คุณสามารถปรับแต่งได้:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Framework: Next.js" 
                      secondary="ตรวจจับอัตโนมัติ"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Build Command: npm run build" 
                      secondary="คำสั่งสร้างไฟล์ production"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Output Directory: .next" 
                      secondary="โฟลเดอร์ไฟล์ที่สร้างแล้ว"
                    />
                  </ListItem>
                </List>
              </Box>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="subtitle1">Deploy!</Typography>
              </StepLabel>
              <Box sx={{ mt: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  กด "Deploy" และรอ 1-2 นาที
                </Typography>
                <Alert severity="success">
                  <Typography variant="body2">
                    🎉 เสร็จแล้ว! คุณจะได้ URL เช่น <strong>your-app.vercel.app</strong>
                  </Typography>
                </Alert>
              </Box>
            </Step>
          </Stepper>
        </Paper>

        <Typography variant="h5" sx={{ mb: 2 }}>⚙️ การตั้งค่าเพิ่มเติม</Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                🌐 Custom Domain
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                ใช้โดเมนของตัวเอง แทน .vercel.app
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, fontSize: '0.875rem' }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  Settings → Domains → Add Domain
                  <br />
                  yoursite.com → Add
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                🔄 Auto Deploy
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Deploy อัตโนมัติเมื่อ push โค้ดใหม่
              </Typography>
              <Typography variant="body2" color="success.main">
                ✅ เปิดใช้งานโดยอัตโนมัติ
                <br />
                ✅ Push = Deploy ทันที
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Typography variant="h3" sx={{ mb: 3 }}>🔄 CI/CD Pipeline</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          CI/CD ทำให้การอัปเดตเว็บไซต์เป็นแบบอัตโนมัติและปลอดภัย
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>🤖 GitHub Actions Workflow</Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}`}
          </Typography>
        </Box>
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        <Typography variant="h3" sx={{ mb: 3 }}>🔐 Environment & Security</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          การจัดการข้อมูลลับและการตั้งค่าที่ปลอดภัย
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>🔑 Environment Variables</Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# .env.local (ไม่ commit ไป git)
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
API_KEY=your-api-key

# .env.example (commit ไป git)
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=your-app-url
API_KEY=your-api-key`}
          </Typography>
        </Box>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            ⚠️ <strong>ข้อควรระวัง:</strong> ห้าม commit ไฟล์ .env.local ไป git 
            เพราะมีข้อมูลลับ ให้เก็บแค่ในเครื่องและใน Vercel เท่านั้น
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={activeTab} index={4}>
        <Typography variant="h3" sx={{ mb: 3 }}>🎮 ทดลองใช้งาน</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          ทดลองกระบวนการ Deploy และจัดการ Environment แบบ Interactive
        </Typography>

        {/* Purpose of Deployment Pipeline Demo */}
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'info.50', border: '2px solid', borderColor: 'info.200' }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'info.main', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Lightbulb color="info" /> 🎯 จุดประสงค์ของ Deployment Pipeline Demo
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            การสร้าง Demo นี้มีจุดประสงค์เพื่อช่วยให้คุณเข้าใจกระบวนการ Deploy แบบจริง:
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
                🎓 การเรียนรู้:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle color="success" sx={{ fontSize: 18 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เห็นขั้นตอนการ Deploy จริง" 
                    secondary="แทนที่จะอ่านแค่ข้อความ"
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle color="success" sx={{ fontSize: 18 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เข้าใจลำดับของขั้นตอน" 
                    secondary="Build → Test → Deploy → Check"
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle color="success" sx={{ fontSize: 18 }} /></ListItemIcon>
                  <ListItemText 
                    primary="รู้เวลาที่ใช้ในแต่ละขั้นตอน" 
                    secondary="เพื่อคาดหวังเวลาจริง"
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItem>
              </List>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'warning.main', fontWeight: 600 }}>
                💼 การใช้งานจริง:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle color="success" sx={{ fontSize: 18 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เตรียมใจก่อน Deploy จริง" 
                    secondary="รู้ว่าจะใช้เวลานานแค่ไหน"
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle color="success" sx={{ fontSize: 18 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เข้าใจขั้นตอนที่อาจล้มเหลว" 
                    secondary="สามารถแก้ไขปัญหาได้"
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckCircle color="success" sx={{ fontSize: 18 }} /></ListItemIcon>
                  <ListItemText 
                    primary="เข้าใจ CI/CD Pipeline" 
                    secondary="ใช้ในการทำงานจริง"
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>ประโยชน์:</strong> Demo นี้จำลองกระบวนการจริงที่เกิดขึ้นใน CI/CD Pipeline 
              ทำให้คุณเข้าใจว่าเมื่อ push โค้ดไป GitHub แล้วเกิดอะไรขึ้นบ้าง และทำไมต้องรอ 1-2 นาทีกว่าจะ deploy เสร็จ
            </Typography>
          </Alert>
        </Paper>

        {/* What You'll Learn Section */}
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.200' }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'success.main', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle color="success" /> 📚 จาก Demo นี้ คุณจะเรียนรู้:
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            <Card sx={{ p: 2, bgcolor: 'white' }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
                🔨 Build Process
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                เข้าใจว่าโค้ด TypeScript ถูกแปลงเป็น JavaScript อย่างไร และทำไมต้อง build ก่อน deploy
              </Typography>
            </Card>

            <Card sx={{ p: 2, bgcolor: 'white' }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'warning.main', fontWeight: 600 }}>
                🧪 Testing Phase
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                ความสำคัญของการทดสอบอัตโนมัติ ก่อนที่โค้ดจะไปถึงผู้ใช้จริง
              </Typography>
            </Card>

            <Card sx={{ p: 2, bgcolor: 'white' }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'success.main', fontWeight: 600 }}>
                ✅ Health Check
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                การตรวจสอบว่าเว็บไซต์ทำงานปกติหลังจาก deploy แล้ว
              </Typography>
            </Card>
          </Box>
        </Paper>

        <Stack spacing={4}>
          <DeploymentDemo />
          <EnvironmentDemo />
        </Stack>

        {/* Real-world Connection */}
        <Paper sx={{ p: 3, mt: 4, mb: 4, bgcolor: 'warning.50', border: '2px solid', borderColor: 'warning.200' }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'warning.main', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rocket color="warning" /> 🌟 การเชื่อมโยงกับการใช้งานจริง
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            หลังจากทดลอง Demo แล้ว คุณจะเข้าใจสิ่งเหล่านี้เมื่อใช้งานจริง:
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, color: 'error.main', fontWeight: 600 }}>
                ⚡ เมื่อใช้ Vercel จริง:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Typography variant="body2">•</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Push โค้ดไป GitHub → Vercel รับสัญญาณอัตโนมัติ"
                    primaryTypographyProps={{ fontSize: '0.85rem' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Typography variant="body2">•</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="ใช้เวลา 1-3 นาที (ขึ้นกับขนาดโปรเจค)"
                    primaryTypographyProps={{ fontSize: '0.85rem' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Typography variant="body2">•</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="ดูสถานะได้ใน Vercel Dashboard"
                    primaryTypographyProps={{ fontSize: '0.85rem' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Typography variant="body2">•</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="ถ้าผิดพลาด จะแจ้งเตือนทาง email"
                    primaryTypographyProps={{ fontSize: '0.85rem' }}
                  />
                </ListItem>
              </List>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                🔧 เมื่อใช้ GitHub Actions:
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Typography variant="body2">•</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="เห็นขั้นตอนทุกอย่างใน Actions tab"
                    primaryTypographyProps={{ fontSize: '0.85rem' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Typography variant="body2">•</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="ดู log แต่ละขั้นตอนได้แบบละเอียด"
                    primaryTypographyProps={{ fontSize: '0.85rem' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Typography variant="body2">•</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="แก้ไขปัญหาได้ง่ายขึ้น"
                    primaryTypographyProps={{ fontSize: '0.85rem' }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Typography variant="body2">•</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="ตั้งค่า notification ได้"
                    primaryTypographyProps={{ fontSize: '0.85rem' }}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>

          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              💭 <strong>คิดไว้ว่า:</strong> ทุกครั้งที่คุณ push โค้ด มีระบบทั้งหมดนี้ทำงานอัตโนมัติเบื้องหลัง 
              Demo ช่วยให้คุณเข้าใจและไม่ตกใจเมื่อต้องรอ หรือเมื่อเกิดข้อผิดพลาด
            </Typography>
          </Alert>
        </Paper>

        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🎯 Deployment Checklist
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            ตรวจสอบรายการนี้ก่อน Deploy เว็บไซต์จริง:
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon><CheckBox color="success" /></ListItemIcon>
              <ListItemText primary="โค้ดผ่าน tests ทั้งหมด" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckBox color="success" /></ListItemIcon>
              <ListItemText primary="ตั้งค่า Environment Variables ใน Vercel" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckBox color="success" /></ListItemIcon>
              <ListItemText primary="ตรวจสอบ Performance ด้วย Lighthouse" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckBox color="success" /></ListItemIcon>
              <ListItemText primary="ทดสอบเว็บไซต์ใน Production URL" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckBox color="success" /></ListItemIcon>
              <ListItemText primary="ตั้งค่า Custom Domain (ถ้าต้องการ)" />
            </ListItem>
          </List>

          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              🎉 <strong>เป้าหมาย:</strong> เว็บไซต์ออนไลน์ 24/7, อัปเดตอัตโนมัติ, 
              มีระบบ monitoring, และปลอดภัย
            </Typography>
          </Alert>
        </Paper>
      </TabPanel>

      {/* Conclusion */}
      <Paper sx={{ p: 4, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.200' }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'success.main' }}>
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 15 แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          ตอนนี้คุณสามารถนำเว็บไซต์ Next.js ขึ้นออนไลน์และจัดการระบบ DevOps 
          ให้ทำงานอัตโนมัติได้แล้ว! เว็บไซต์ของคุณจะมีมาตรฐานระดับมืออาชีพ
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            🚀 <strong>ขั้นตอนต่อไป:</strong> Deploy โปรเจคจริงของคุณ 
            และแชร์ให้เพื่อนๆ ได้ใช้งาน!
          </Typography>
        </Alert>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: { xs: 4, sm: 6 }, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-14"
          variant="outlined"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 2, sm: 1 } }}
        >
          บทที่ 14: Performance
        </Button>
        <Chip
          label="15 / 18"
          color="primary"
          variant="outlined"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' }, order: { xs: 1, sm: 2 } }}
        />
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-16"
          variant="contained"
          color="primary"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 3, sm: 3 } }}
        >
          บทที่ 16: Advanced Patterns
        </Button>
      </Box>
    </Box>
  );
} 