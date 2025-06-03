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
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Speed,
  PlayArrow,
  Lightbulb,
  Timer,
  Refresh,
  Image,
  Memory,
  TrendingUp,
  Analytics,
  Cached,
  PhotoSizeSelectActual,
  CompareArrows,
  Insights,
  CheckBox,
  Build,
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
interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'needs-improvement' | 'poor';
  description: string;
}

function PerformanceMetricsDemo() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([
    { name: 'First Contentful Paint (FCP)', value: 1.2, unit: 's', status: 'good', description: 'เวลาที่ใช้แสดงเนื้อหาแรก' },
    { name: 'Largest Contentful Paint (LCP)', value: 2.1, unit: 's', status: 'good', description: 'เวลาที่ใช้แสดงเนื้อหาหลัก' },
    { name: 'Cumulative Layout Shift (CLS)', value: 0.08, unit: '', status: 'needs-improvement', description: 'การเลื่อนไหลของเลย์เอาต์' },
    { name: 'First Input Delay (FID)', value: 45, unit: 'ms', status: 'good', description: 'เวลาตอบสนองการโต้ตอบแรก' },
  ]);

  const [isOptimized, setIsOptimized] = useState(false);

  const optimizePerformance = () => {
    setIsOptimized(true);
    setMetrics([
      { name: 'First Contentful Paint (FCP)', value: 0.8, unit: 's', status: 'good', description: 'เวลาที่ใช้แสดงเนื้อหาแรก' },
      { name: 'Largest Contentful Paint (LCP)', value: 1.4, unit: 's', status: 'good', description: 'เวลาที่ใช้แสดงเนื้อหาหลัก' },
      { name: 'Cumulative Layout Shift (CLS)', value: 0.02, unit: '', status: 'good', description: 'การเลื่อนไหลของเลย์เอาต์' },
      { name: 'First Input Delay (FID)', value: 12, unit: 'ms', status: 'good', description: 'เวลาตอบสนองการโต้ตอบแรก' },
    ]);
  };

  const resetMetrics = () => {
    setIsOptimized(false);
    setMetrics([
      { name: 'First Contentful Paint (FCP)', value: 1.2, unit: 's', status: 'good', description: 'เวลาที่ใช้แสดงเนื้อหาแรก' },
      { name: 'Largest Contentful Paint (LCP)', value: 2.1, unit: 's', status: 'good', description: 'เวลาที่ใช้แสดงเนื้อหาหลัก' },
      { name: 'Cumulative Layout Shift (CLS)', value: 0.08, unit: '', status: 'needs-improvement', description: 'การเลื่อนไหลของเลย์เอาต์' },
      { name: 'First Input Delay (FID)', value: 45, unit: 'ms', status: 'good', description: 'เวลาตอบสนองการโต้ตอบแรก' },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'success';
      case 'needs-improvement': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'ดี';
      case 'needs-improvement': return 'ต้องปรับปรุง';
      case 'poor': return 'ย่ำแย่';
      default: return 'ไม่ทราบ';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          📊 Web Vitals Performance Demo
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={optimizePerformance}
            disabled={isOptimized}
            startIcon={<TrendingUp />}
            sx={{ mr: 2 }}
          >
            เพิ่มประสิทธิภาพ
          </Button>
          <Button
            variant="outlined"
            onClick={resetMetrics}
            startIcon={<Refresh />}
          >
            รีเซ็ต
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
          {metrics.map((metric, index) => (
            <Paper key={index} sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {metric.name}
                </Typography>
                <Chip 
                  label={getStatusText(metric.status)}
                  color={getStatusColor(metric.status) as any}
                  size="small"
                />
              </Box>
              <Typography variant="h4" sx={{ fontFamily: 'monospace', mb: 1 }}>
                {metric.value}{metric.unit}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {metric.description}
              </Typography>
            </Paper>
          ))}
        </Box>

        {isOptimized && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              🎉 <strong>เยี่ยม!</strong> ประสิทธิภาพของเว็บไซต์ดีขึ้นอย่างเห็นได้ชัด! 
              ผู้ใช้จะได้รับประสบการณ์ที่เร็วและลื่นไหลมากขึ้น
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function ImageOptimizationDemo() {
  const [currentImage, setCurrentImage] = useState<'unoptimized' | 'optimized'>('unoptimized');
  const [loadingTime, setLoadingTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const images = {
    unoptimized: {
      size: '2.4 MB',
      loadTime: 3200,
      format: 'PNG',
      dimensions: '4000x3000',
      description: 'รูปภาพต้นฉบับที่ไม่ได้ปรับแต่ง'
    },
    optimized: {
      size: '185 KB',
      loadTime: 420,
      format: 'WebP',
      dimensions: '1200x900',
      description: 'รูปภาพที่ปรับขนาดและ format แล้ว'
    }
  };

  const switchImage = (type: 'unoptimized' | 'optimized') => {
    setIsLoading(true);
    setLoadingTime(0);
    
    const interval = setInterval(() => {
      setLoadingTime(prev => prev + 100);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setCurrentImage(type);
      setIsLoading(false);
    }, images[type].loadTime);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🖼️ Image Optimization Demo
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Button
            variant={currentImage === 'unoptimized' ? 'contained' : 'outlined'}
            onClick={() => switchImage('unoptimized')}
            disabled={isLoading}
            sx={{ mr: 2 }}
          >
            ภาพต้นฉบับ
          </Button>
          <Button
            variant={currentImage === 'optimized' ? 'contained' : 'outlined'}
            onClick={() => switchImage('optimized')}
            disabled={isLoading}
            color="success"
          >
            ภาพที่เพิ่มประสิทธิภาพ
          </Button>
        </Box>

        <Paper sx={{ p: 3, mb: 2, bgcolor: 'grey.50' }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            {isLoading ? (
              <Box>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  กำลังโหลด... {loadingTime}ms
                </Typography>
              </Box>
            ) : (
              <Box>
                <PhotoSizeSelectActual 
                  sx={{ 
                    fontSize: 120, 
                    color: currentImage === 'optimized' ? 'success.main' : 'grey.400',
                    mb: 2 
                  }} 
                />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {images[currentImage].description}
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">ขนาดไฟล์:</Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                {images[currentImage].size}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">เวลาโหลด:</Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                {images[currentImage].loadTime}ms
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">รูปแบบ:</Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                {images[currentImage].format}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">ขนาด:</Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                {images[currentImage].dimensions}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Alert 
          severity={currentImage === 'optimized' ? 'success' : 'warning'} 
          sx={{ mb: 2 }}
        >
          <Typography variant="body2">
            {currentImage === 'optimized' ? (
              <>
                ✅ <strong>ดีเยี่ยม!</strong> ภาพนี้ได้รับการเพิ่มประสิทธิภาพแล้ว 
                ลดขนาดลง 92% และโหลดเร็วขึ้น 87%
              </>
            ) : (
              <>
                ⚠️ <strong>ต้องปรับปรุง:</strong> ภาพนี้ใหญ่เกินไปและโหลดช้า 
                ควรปรับขนาดและเปลี่ยน format
              </>
            )}
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default function Lesson14Page() {
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
          <Speed color="primary" sx={{ fontSize: { xs: '2.2rem', sm: '3rem' } }} />
          บทที่ 14: Performance
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3, '& .MuiChip-root': { fontSize: { xs: '0.75rem', sm: '0.8rem' } } }}>
          <Chip icon={<Speed />} label="Optimize" color="primary" size="small" />
          <Chip icon={<Build />} label="Tools" color="secondary" size="small" />
          <Chip icon={<Assessment />} label="Analyze" color="info" size="small" />
          <Chip icon={<Code />} label="Best Practice" color="success" size="small" />
        </Stack>
        <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
          <Typography variant="body2">
            ⏱️ <strong>ระยะเวลา:</strong> 40 นาที | 
            📊 <strong>ระดับ:</strong> ปานกลาง | 
            🎯 <strong>เป้าหมาย:</strong> เรียนรู้ Performance & Best Practices ใน Next.js
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
          <Tab label="⚡ Optimize" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="🔧 Tools" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="📊 Analyze" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="💡 Best Practice" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        <Typography variant="h3" sx={{ mb: 3 }}>💡 เริ่มต้นกับ Performance</Typography>
        
        {/* Why Performance Matters */}
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'warning.50', border: '2px solid', borderColor: 'warning.200' }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'warning.main' }}>
            ⚠️ เว็บไซต์ช้า = เสียโอกาส!
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'warning.main' }}>📉 สถิติที่น่าตกใจ:</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Timer color="warning" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="1 วินาที = สูญเสีย 7% conversion" 
                    secondary="ลูกค้าหายไป!"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><TrendingUp color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="3 วินาที = 53% ออกจากเว็บ" 
                    secondary="ผู้คนไม่อดทนรอ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Google ลดอันดับ SEO" 
                    secondary="เว็บช้า = อันดับแย่"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'success.main' }}>✅ เว็บเร็ว = ข้อดีเพียบ:</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText primary="ลูกค้าซื้อมากขึ้น" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText primary="Google ให้อันดับดี" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText primary="ประหยัดค่า server" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>

        {/* Core Web Vitals */}
        <Typography variant="h5" sx={{ mb: 2 }}>📊 Core Web Vitals (ตัวชี้วัดหลัก)</Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'info.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Timer color="info" /> LCP
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Largest Contentful Paint</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                เวลาที่เนื้อหาหลักแสดงครบ
              </Typography>
              <Typography variant="body2" color="success.main">
                ✅ ดี: น้อยกว่า 2.5s
              </Typography>
              <Typography variant="body2" color="warning.main">
                ⚠️ ปรับปรุง: 2.5-4s
              </Typography>
              <Typography variant="body2" color="error.main">
                ❌ แย่: มากกว่า 4s
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'warning.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                <CompareArrows color="warning" /> FID/INP
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>First Input Delay</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                เวลาตอบสนองเมื่อผู้ใช้คลิก
              </Typography>
              <Typography variant="body2" color="success.main">
                ✅ ดี: น้อยกว่า 100ms
              </Typography>
              <Typography variant="body2" color="warning.main">
                ⚠️ ปรับปรุง: 100-300ms
              </Typography>
              <Typography variant="body2" color="error.main">
                ❌ แย่: มากกว่า 300ms
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'error.main', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Insights color="error" /> CLS
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Cumulative Layout Shift</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                การเปลี่ยนแปลงเลย์เอาต์
              </Typography>
              <Typography variant="body2" color="success.main">
                ✅ ดี: น้อยกว่า 0.1
              </Typography>
              <Typography variant="body2" color="warning.main">
                ⚠️ ปรับปรุง: 0.1-0.25
              </Typography>
              <Typography variant="body2" color="error.main">
                ❌ แย่: มากกว่า 0.25
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Performance Tools */}
        <Typography variant="h5" sx={{ mb: 2 }}>🛠️ เครื่องมือวัด Performance</Typography>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            เครื่องมือสำคัญที่ควรรู้จัก:
          </Typography>
          
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# 1. Lighthouse (ในเบราว์เซอร์)
- เปิด Chrome DevTools (F12)
- ไปที่แท็บ Lighthouse
- คลิก "Generate report"

# 2. PageSpeed Insights (ออนไลน์)
https://pagespeed.web.dev/

# 3. Next.js Bundle Analyzer
npm install --save-dev @next/bundle-analyzer

# 4. Web Vitals ใน Next.js
npm install web-vitals`}
            </Typography>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              💡 <strong>เทคนิค:</strong> วัด performance ก่อนและหลังการปรับปรุง
              เพื่อดูความแตกต่างอย่างชัดเจน
            </Typography>
          </Alert>
        </Paper>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Typography variant="h3" sx={{ mb: 3 }}>🖼️ Image Optimization</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          รูปภาพมักเป็นสาเหตุหลักที่ทำให้เว็บไซต์โหลดช้า เรียนรู้วิธีเพิ่มประสิทธิภาพกันเถอะ!
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>1. Next.js Image Component</Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`// แทนที่ <img> ธรรมดาด้วย Next.js Image
import Image from 'next/image';

// ❌ แบบเก่า (ไม่ดี)
<img 
  src="/photo.jpg" 
  alt="Photo" 
  style={{ width: '100%', height: 'auto' }}
/>

// ✅ แบบใหม่ (ดี)
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  priority={true}  // สำหรับรูปสำคัญ
  placeholder="blur" // แสดง blur ก่อนโหลด
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}
          </Typography>
        </Box>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            ✨ <strong>ผลลัพธ์:</strong> Next.js Image จะลดขนาดรูปภาพโดยอัตโนมัติ 
            และเลือก format ที่เหมาะสมกับเบราว์เซอร์ของผู้ใช้
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Typography variant="h3" sx={{ mb: 3 }}>⚡ Code Splitting & Lazy Loading</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          แทนที่จะโหลดโค้ดทั้งหมดครั้งเดียว ให้โหลดเฉพาะส่วนที่จำเป็นก่อน
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>1. Dynamic Imports</Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`// โหลด component เมื่อต้องการใช้งาน
import dynamic from 'next/dynamic';

// ❌ แบบเก่า (โหลดทันที)
import HeavyChart from '../components/HeavyChart';

// ✅ แบบใหม่ (โหลดเมื่อต้องใช้)
const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false,
});`}
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            💡 <strong>เทคนิค:</strong> ใช้ Bundle Analyzer เพื่อดูว่า library ไหนใหญ่ที่สุด
            แล้วนำมา dynamic import
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        <Typography variant="h3" sx={{ mb: 3 }}>🗄️ Caching Strategies</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          การ cache ที่ถูกต้องจะทำให้เว็บไซต์เร็วขึ้นมากและประหยัดค่า server
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>1. Browser Caching</Typography>
        <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`// next.config.js - กำหนด cache headers
module.exports = {
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};`}
          </Typography>
        </Box>
      </TabPanel>

      <TabPanel value={activeTab} index={4}>
        <Typography variant="h3" sx={{ mb: 3 }}>🎮 ทดลองใช้งาน</Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          ทดลองเครื่องมือวัดและเพิ่มประสิทธิภาพแบบ Interactive
        </Typography>

        <Stack spacing={4}>
          <PerformanceMetricsDemo />
          <ImageOptimizationDemo />
        </Stack>

        {/* Code Comparison Section */}
        <Typography variant="h4" sx={{ mb: 3, mt: 6 }}>
          📝 เปรียบเทียบโค้ด: ก่อน VS หลัง การเพิ่มประสิทธิภาพ
        </Typography>

        {/* Image Optimization Code Comparison */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            🖼️ การใช้งานรูปภาพ
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'error.main', fontWeight: 600 }}>
                ❌ ก่อนเพิ่มประสิทธิภาพ
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'error.50', borderRadius: 1, border: '1px solid', borderColor: 'error.200' }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
{`// ไม่ดี - ใช้ <img> ธรรมดา
function ProductCard() {
  return (
    <div>
      <img 
        src="/product-large.jpg" 
        alt="Product"
        style={{ width: '100%' }}
      />
      <h3>Product Name</h3>
    </div>
  );
}

// ปัญหา:
// ❌ รูปใหญ่ 5MB โหลดช้า
// ❌ ไม่ responsive 
// ❌ ไม่มี lazy loading
// ❌ ไม่มี placeholder`}
                </Typography>
              </Box>
              <Alert severity="error" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>ผลลัพธ์:</strong> โหลดช้า 8-15 วินาที, ใช้ bandwidth มาก
                </Typography>
              </Alert>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'success.main', fontWeight: 600 }}>
                ✅ หลังเพิ่มประสิทธิภาพ
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1, border: '1px solid', borderColor: 'success.200' }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
{`// ดี - ใช้ Next.js Image
import Image from 'next/image';

function ProductCard() {
  return (
    <div>
      <Image 
        src="/product-large.jpg" 
        alt="Product"
        width={400}
        height={300}
        placeholder="blur"
        blurDataURL="data:image/jpeg..."
        sizes="(max-width: 768px) 100vw, 400px"
        loading="lazy"
      />
      <h3>Product Name</h3>
    </div>
  );
}

// ข้อดี:
// ✅ Auto optimization -> WebP/AVIF
// ✅ Responsive images
// ✅ Lazy loading built-in
// ✅ Blur placeholder`}
                </Typography>
              </Box>
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>ผลลัพธ์:</strong> โหลดเร็ว 0.5-2 วินาที, ประหยัด bandwidth 80%
                </Typography>
              </Alert>
            </Box>
          </Box>
        </Paper>

        {/* Component Loading Code Comparison */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            ⚡ การโหลด Component
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'error.main', fontWeight: 600 }}>
                ❌ ก่อนเพิ่มประสิทธิภาพ
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'error.50', borderRadius: 1, border: '1px solid', borderColor: 'error.200' }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
{`// ไม่ดี - โหลดทุกอย่างทันที
import Chart from 'recharts';
import Calendar from 'react-big-calendar';
import DataTable from 'react-data-table';

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <h1>Dashboard</h1>
      {showChart && <Chart />}
      <Calendar />
      <DataTable />
    </div>
  );
}

// ปัญหา:
// ❌ Bundle size ใหญ่ 2.5MB
// ❌ โหลดแม้ไม่ได้ใช้
// ❌ First load ช้า`}
                </Typography>
              </Box>
              <Alert severity="error" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Bundle Size:</strong> 2.5MB, <strong>First Load:</strong> 8 วินาที
                </Typography>
              </Alert>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'success.main', fontWeight: 600 }}>
                ✅ หลังเพิ่มประสิทธิภาพ
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1, border: '1px solid', borderColor: 'success.200' }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
{`// ดี - ใช้ Dynamic imports
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('recharts'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false
});

const Calendar = dynamic(() => import('react-big-calendar'));
const DataTable = dynamic(() => import('react-data-table'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <h1>Dashboard</h1>
      {showChart && <Chart />}
      <Calendar />
      <DataTable />
    </div>
  );
}

// ข้อดี:
// ✅ แยก bundle เป็นส่วนๆ
// ✅ โหลดเมื่อต้องใช้เท่านั้น
// ✅ First load เร็ว`}
                </Typography>
              </Box>
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Initial Bundle:</strong> 450KB, <strong>First Load:</strong> 1.2 วินาที
                </Typography>
              </Alert>
            </Box>
          </Box>
        </Paper>

        {/* API Caching Code Comparison */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            🗄️ การ Cache API
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'error.main', fontWeight: 600 }}>
                ❌ ก่อนเพิ่มประสิทธิภาพ
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'error.50', borderRadius: 1, border: '1px solid', borderColor: 'error.200' }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
{`// API Route - ไม่มี cache
export async function GET() {
  const data = await db.posts.findMany();
  
  return NextResponse.json(data);
}

// ปัญหา:
// ❌ Query database ทุกครั้ง
// ❌ Response time ช้า 2-5 วินาที
// ❌ Server load สูง

// ใน Component
useEffect(() => {
  fetch('/api/posts')
    .then(res => res.json())
    .then(setData);
}, []); // โหลดใหม่ทุกครั้ง`}
                </Typography>
              </Box>
              <Alert severity="error" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Response Time:</strong> 3.2 วินาที, <strong>DB Queries:</strong> 50+ ต่อนาที
                </Typography>
              </Alert>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2, color: 'success.main', fontWeight: 600 }}>
                ✅ หลังเพิ่มประสิทธิภาพ
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1, border: '1px solid', borderColor: 'success.200' }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
{`// API Route - มี cache
export async function GET() {
  const data = await db.posts.findMany();
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60'
    }
  });
}

// ข้อดี:
// ✅ Cache 5 นาที
// ✅ Response time เร็ว 0.1 วินาที
// ✅ ลด server load 90%

// ใน Component - ใช้ SWR
import useSWR from 'swr';

const { data } = useSWR('/api/posts', fetcher, {
  revalidateOnFocus: false,
  refreshInterval: 300000 // 5 นาที
});`}
                </Typography>
              </Box>
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Response Time:</strong> 0.1 วินาที, <strong>DB Queries:</strong> 5 ต่อนาที
                </Typography>
              </Alert>
            </Box>
          </Box>
        </Paper>

        {/* Performance Impact Summary */}
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'info.50', border: '2px solid', borderColor: 'info.200' }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
            📊 สรุปผลกระทบของการเพิ่มประสิทธิภาพ
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                  87%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ลดเวลาโหลดหน้า
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  จาก 8s เหลือ 1s
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                  82%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ลด Bundle Size
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  จาก 2.5MB เหลือ 450KB
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                  95%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ลด Server Load
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  จาก 50 เหลือ 5 queries/min
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              💡 <strong>ผลลัพธ์รวม:</strong> เว็บไซต์เร็วขึ้น 8 เท่า, ค่า hosting ลดลง 60%, 
              คะแนน Lighthouse เพิ่มจาก 45 เป็น 95 คะแนน, ผู้ใช้พอใจมากขึ้น 73%
            </Typography>
          </Alert>
        </Paper>

        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🎯 Performance Checklist
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            ตรวจสอบรายการนี้เพื่อให้มั่นใจว่าเว็บไซต์ของคุณเร็วที่สุด:
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon><CheckBox color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ Next.js Image component แทน <img> ธรรมดา" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckBox color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ Dynamic imports สำหรับ component ขนาดใหญ่" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckBox color="success" /></ListItemIcon>
              <ListItemText primary="ตั้งค่า Cache-Control headers ที่เหมาะสม" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckBox color="success" /></ListItemIcon>
              <ListItemText primary="วัด Performance ด้วย Lighthouse เป็นประจำ" />
            </ListItem>
          </List>

          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              🎉 <strong>เป้าหมาย:</strong> LCP น้อยกว่า 2.5s, FID น้อยกว่า 100ms, CLS น้อยกว่า 0.1 
              และ Lighthouse Score มากกว่า 90 คะแนน
            </Typography>
          </Alert>
        </Paper>
      </TabPanel>

      {/* Conclusion */}
      <Paper sx={{ p: 4, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.200' }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'success.main' }}>
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 14 แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          ตอนนี้คุณสามารถเพิ่มประสิทธิภาพเว็บไซต์ Next.js ให้เร็วขึ้นอย่างมีนัยสำคัญได้แล้ว!
          เว็บไซต์ของคุณจะโหลดเร็ว ประหยัดค่าใช้จ่าย และทำให้ผู้ใช้มีความสุขมากขึ้น
        </Typography>
        
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            🚀 <strong>ขั้นตอนต่อไป:</strong> นำเทคนิคเหล่านี้ไปใช้ในโปรเจคจริง 
            และวัด performance เป็นประจำ
          </Typography>
        </Alert>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: { xs: 4, sm: 6 }, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-13"
          variant="outlined"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 2, sm: 1 } }}
        >
          บทที่ 13: Testing
        </Button>
        <Chip
          label="14 / 18"
          color="primary"
          variant="outlined"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' }, order: { xs: 1, sm: 2 } }}
        />
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-15"
          variant="contained"
          color="primary"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 3, sm: 3 } }}
        >
          บทที่ 15: Deployment
        </Button>
      </Box>
    </Box>
  );
} 