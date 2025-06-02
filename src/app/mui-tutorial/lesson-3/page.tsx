'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  ViewModule,
  GridView,
  Layers,
  AspectRatio,
  Assignment,
  Code,
  PlayArrow,
  Lightbulb,
  Warning,
  Info,
  Build,
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

const layoutConcepts = [
  {
    component: 'Container',
    purpose: 'กำหนดความกว้างสูงสุดและจัดกึ่งกลาง',
    description: 'เหมือนกรอบรูปที่กำหนดขนาดและจัดกึ่งกลางเนื้อหา',
    useCase: 'ใช้เป็น wrapper หลักของทุกหน้า',
    icon: '📄',
    color: 'primary'
  },
  {
    component: 'Box',
    purpose: 'ตัวจัด Layout ที่ยืดหยุ่นที่สุด',
    description: 'เหมือน div ที่มีพลังพิเศษ ปรับแต่งได้ทุกอย่าง',
    useCase: 'ใช้แทน div ในการจัด layout ทุกรูปแบบ',
    icon: '📦',
    color: 'secondary'
  },
  {
    component: 'Stack',
    purpose: 'จัดเรียง elements แนวตั้งหรือแนวนอน',
    description: 'เหมือนการเรียงของต่อกัน มีช่องว่างสม่ำเสมอ',
    useCase: 'ใช้เมื่อต้องการเรียง components อย่างเป็นระเบียบ',
    icon: '📚',
    color: 'success'
  }
];

const boxFeatures = [
  {
    feature: 'Flexbox Built-in',
    description: 'ใช้ display: flex โดยง่าย',
    code: `<Box sx={{ display: 'flex', justifyContent: 'center' }}>
  <Typography>กึ่งกลาง</Typography>
</Box>`,
    benefit: 'จัด layout ได้ง่ายกว่า CSS ธรรมดา'
  },
  {
    feature: 'Spacing System',
    description: 'ระบบ padding/margin ที่สม่ำเสมอ',
    code: `<Box sx={{ p: 2, m: 1 }}>
  {/* p: 2 = padding: 16px */}
  {/* m: 1 = margin: 8px */}
</Box>`,
    benefit: 'spacing ที่เป็นระบบและสวยงาม'
  },
  {
    feature: 'Responsive Design',
    description: 'ปรับขนาดตาม screen ได้อัตโนมัติ',
    code: `<Box sx={{
  width: { xs: '100%', md: '50%' },
  p: { xs: 2, md: 4 }
}}>
  Responsive Box
</Box>`,
    benefit: 'ทำ responsive ได้ในบรรทัดเดียว'
  },
  {
    feature: 'Theme Integration',
    description: 'เชื่อมต่อกับ theme อัตโนมัติ',
    code: `<Box sx={{
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  borderRadius: 1
}}>
  Theme-aware Box
</Box>`,
    benefit: 'สีและ styling สอดคล้องกับ theme'
  }
];

const layoutExamples = [
  {
    title: 'Two Column Layout',
    description: 'แบ่งหน้าจอเป็น 2 คอลัมน์',
    code: `<Box sx={{ display: 'flex', gap: 2 }}>
  <Box sx={{ flex: 1, bgcolor: 'grey.100', p: 2 }}>
    <Typography>คอลัมน์ซ้าย</Typography>
  </Box>
  <Box sx={{ flex: 2, bgcolor: 'grey.200', p: 2 }}>
    <Typography>คอลัมน์ขวา (กว้างกว่า)</Typography>
  </Box>
</Box>`,
    result: 'หน้าจอแบ่งเป็น 1:2 ratio'
  },
  {
    title: 'Card Grid',
    description: 'จัดเรียง Cards แบบ Grid',
    code: `<Box sx={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 2
}}>
  {cards.map(card => (
    <Card key={card.id}>
      <CardContent>{card.content}</CardContent>
    </Card>
  ))}
</Box>`,
    result: 'Cards จัดเรียงแบบ responsive grid'
  },
  {
    title: 'Center Everything',
    description: 'จัดทุกอย่างให้อยู่กึ่งกลาง',
    code: `<Box sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh'
}}>
  <Typography variant="h3">กึ่งกลางทั้งหน้าจอ</Typography>
</Box>`,
    result: 'เนื้อหาอยู่กึ่งกลางทั้งแนวตั้งและแนวนอน'
  }
];

export default function MUILesson3Page() {
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
            href="/mui-tutorial"
            sx={{ mb: 2 }}
          >
            กลับไปหน้าหลัก
          </Button>
          
          <Typography variant="h1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <ViewModule color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 3: Layout Components
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การจัด Layout ด้วย Box, Container, Stack สำหรับมือใหม่! 📦
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<ViewModule />} label="Box Component" color="primary" />
            <Chip icon={<AspectRatio />} label="Container" color="secondary" />
            <Chip icon={<Layers />} label="Stack" color="success" />
            <Chip icon={<GridView />} label="Responsive" color="warning" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> เชี่ยวชาญการจัด Layout ด้วย MUI
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 35 นาที | 
              📊 <strong>ระดับ:</strong> เริ่มต้นสู่ปานกลาง
            </Typography>
          </Alert>

          {/* Why Box over Grid */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'warning.50', border: '2px solid', borderColor: 'warning.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="warning" /> 💡 ทำไม MUI v7 แนะนำ Box แทน Grid?
            </Typography>
            
            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'warning.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🚀 <strong>Performance ดีกว่า:</strong> Box ใช้ CSS Grid/Flexbox โดยตรง
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🎯 <strong>ยืดหยุ่นกว่า:</strong> ปรับแต่งได้ทุกอย่างผ่าน sx prop
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 📱 <strong>Responsive ง่ายกว่า:</strong> breakpoints ใน sx prop
              </Typography>
              <Typography variant="body2">
                • 🔧 <strong>Bundle size เล็กกว่า:</strong> ไม่มี extra JavaScript logic
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> Layout ที่เร็วกว่า ยืดหยุ่นกว่า และเขียนโค้ดน้อยกว่า!
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
                    primary="ใช้ Box จัด Layout ได้" 
                    secondary="Flexbox, Grid, Positioning"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Container & Stack อย่างเป็นระบบ" 
                    secondary="การกำหนดขนาดและจัดเรียง"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Responsive Layout" 
                    secondary="ปรับตาม screen size"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Layout Patterns" 
                    secondary="Two columns, Card grid, Center"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Spacing System" 
                    secondary="padding, margin, gap อย่างเป็นระบบ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="สร้างหน้าเว็บจริง" 
                    secondary="ใช้ความรู้ประยุกต์ทำโปรเจค"
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
              label="📦 Layout Components" 
              icon={<Assignment />}
              iconPosition="start"
            />
            <Tab 
              label="🎯 Box Master" 
              icon={<ViewModule />}
              iconPosition="start"
            />
            <Tab 
              label="📄 Container & Stack" 
              icon={<Layers />}
              iconPosition="start"
            />
            <Tab 
              label="📱 Responsive Layout" 
              icon={<GridView />}
              iconPosition="start"
            />
            <Tab 
              label="🚀 Real Project" 
              icon={<PlayArrow />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: Layout Components Overview */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>📦 รู้จัก Layout Components</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Layout Components ใน MUI คือเครื่องมือสำหรับจัดวางและจัดระเบียบ UI elements 
            ให้อยู่ในตำแหน่งที่ต้องการ
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🔧 Components หลักที่ใช้บ่อย</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {layoutConcepts.map((concept, index) => (
              <Card key={index} sx={{ height: '100%' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${concept.color}.light`, 
                        color: `${concept.color}.main`,
                        mr: 2,
                        fontSize: '1.5rem'
                      }}
                    >
                      {concept.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {concept.component}
                    </Typography>
                  </Box>
                  
                  <Typography variant="subtitle1" sx={{ mb: 1, color: `${concept.color}.main`, fontWeight: 600 }}>
                    {concept.purpose}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2, flex: 1, lineHeight: 1.6 }}>
                    {concept.description}
                  </Typography>
                  
                  <Alert severity="info" sx={{ mt: 'auto' }}>
                    <Typography variant="body2">
                      <strong>ใช้เมื่อ:</strong> {concept.useCase}
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Alert severity="warning" sx={{ mt: 4 }}>
            <Typography variant="body2">
              💡 <strong>เคล็ดลับ:</strong> เริ่มต้นด้วย Container เป็น wrapper หลัก 
              จากนั้นใช้ Box สำหรับ layout และ Stack สำหรับการเรียงลำดับ
            </Typography>
          </Alert>
        </TabPanel>

        {/* Tab 2: Box Master */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎯 Box - Layout Master</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Box เป็น component ที่ทรงพลังที่สุดใน MUI สำหรับการจัด layout 
            เพราะใช้ CSS Grid และ Flexbox ได้อย่างเต็มประสิทธิภาพ
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>⚡ ความสามารถของ Box</Typography>

          <Stack spacing={3}>
            {boxFeatures.map((feature, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    {feature.feature}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    💻 ตัวอย่างโค้ด:
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {feature.code}
                    </Typography>
                  </Box>
                  
                  <Alert severity="success">
                    <Typography variant="body2">
                      ✅ <strong>ประโยชน์:</strong> {feature.benefit}
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>🔥 Box vs div ธรรมดา</Typography>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, color: 'error.main' }}>
                    ❌ div + CSS ธรรมดา
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
{`<div className="container">
  <div className="flex-center">
    <h1>Title</h1>
  </div>
</div>

/* CSS */
.container {
  padding: 24px;
  background: #f5f5f5;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}`}
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, color: 'success.main' }}>
                    ✅ Box + sx prop
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
{`<Box sx={{
  p: 3,
  bgcolor: 'grey.100',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 200
}}>
  <Typography variant="h4">
    Title
  </Typography>
</Box>

/* ไม่ต้องเขียน CSS เลย! */`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  🚀 <strong>ข้อดี Box:</strong> เขียนน้อยกว่า, เชื่อมต่อ theme, responsive ง่าย, type-safe
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 3: Container & Stack */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>📄 Container & Stack</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Container และ Stack เป็น components ที่ช่วยให้การจัด layout เป็นระบบและสวยงาม
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>📄 Container Component</Typography>
          
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                🎯 หน้าที่ของ Container
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                Container ทำหน้าที่เป็น &quot;กรอบ&quot; ของเนื้อหา กำหนดความกว้างสูงสุดและจัดกึ่งกลาง
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                💻 วิธีใช้งาน:
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// ขนาดต่างๆ ของ Container
<Container maxWidth="xs">    {/* 444px */}
<Container maxWidth="sm">    {/* 600px */}
<Container maxWidth="md">    {/* 900px */}
<Container maxWidth="lg">    {/* 1200px */}
<Container maxWidth="xl">    {/* 1536px */}
<Container maxWidth={false}> {/* ไม่จำกัดขนาด */}

// การใช้งานพื้นฐาน
<Container maxWidth="lg" sx={{ py: 4 }}>
  <Typography variant="h3">
    เนื้อหาหลัก
  </Typography>
</Container>`}
                </Typography>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {['xs (444px)', 'md (900px)', 'lg (1200px)'].map((size, index) => (
                  <Box 
                    key={size}
                    sx={{ 
                      p: 2, 
                      border: '2px solid', 
                      borderColor: 'primary.main',
                      borderRadius: 1,
                      textAlign: 'center',
                      bgcolor: 'primary.50'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {size}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>📚 Stack Component</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                🔄 การเรียงลำดับแบบมืออาชีพ
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                Stack ช่วยจัดเรียง elements แนวตั้งหรือแนวนอน พร้อมระยะห่างที่สม่ำเสมอ
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                💻 ตัวอย่างการใช้งาน:
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Stack แนวตั้ง (default)
<Stack spacing={2}>
  <Typography>Item 1</Typography>
  <Typography>Item 2</Typography>
  <Typography>Item 3</Typography>
</Stack>

// Stack แนวนอน
<Stack direction="row" spacing={2}>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
  <Button>Button 3</Button>
</Stack>

// Stack แบบ responsive
<Stack 
  direction={{ xs: 'column', md: 'row' }}
  spacing={{ xs: 1, md: 2 }}
  alignItems="center"
>
  <Typography>Responsive Stack</Typography>
  <Button variant="contained">Action</Button>
</Stack>`}
                </Typography>
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                🎯 ตัวอย่างจริง:
              </Typography>
              
              <Box sx={{ p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
                <Stack spacing={2}>
                  <Typography variant="h6">Stack แนวตั้ง</Typography>
                  <Button variant="outlined" size="small">ปุ่ม 1</Button>
                  <Button variant="outlined" size="small">ปุ่ม 2</Button>
                  <Button variant="outlined" size="small">ปุ่ม 3</Button>
                </Stack>
                
                <Divider sx={{ my: 2 }} />
                
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Typography variant="body2">Stack แนวนอน:</Typography>
                  <Chip label="Chip 1" size="small" />
                  <Chip label="Chip 2" size="small" />
                  <Chip label="Chip 3" size="small" />
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 4: Responsive Layout */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>📱 Responsive Layout</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            การทำ responsive layout ด้วย Box และ MUI breakpoints ทำได้ง่ายและยืดหยุ่นมาก
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>📐 Breakpoint System</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📊 MUI Breakpoints (เหมือนบทที่ 2)
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 3 }}>
                {[
                  { name: 'xs', range: '0px+', desc: 'มือถือ', icon: '📱' },
                  { name: 'sm', range: '600px+', desc: 'แท็บเล็ต', icon: '📱' },
                  { name: 'md', range: '900px+', desc: 'แล็ปท็อป', icon: '💻' },
                  { name: 'lg', range: '1200px+', desc: 'เดสก์ท็อป', icon: '🖥️' },
                  { name: 'xl', range: '1536px+', desc: 'จอใหญ่', icon: '🖥️' },
                ].map((bp) => (
                  <Box key={bp.name} sx={{ p: 2, border: '1px solid', borderColor: 'grey.200', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>{bp.icon}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{bp.name}</Typography>
                    <Typography variant="body2" color="primary.main">{bp.range}</Typography>
                    <Typography variant="caption" color="text.secondary">{bp.desc}</Typography>
                  </Box>
                ))}
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                💻 Responsive Box:
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`<Box sx={{
  // ความกว้าง responsive
  width: {
    xs: '100%',    // มือถือ: เต็มความกว้าง
    md: '50%',     // เดสก์ท็อป: ครึ่งหนึ่ง
  },
  // padding responsive  
  p: {
    xs: 2,         // มือถือ: 16px
    md: 4,         // เดสก์ท็อป: 32px
  },
  // flex direction responsive
  display: 'flex',
  flexDirection: {
    xs: 'column',  // มือถือ: แนวตั้ง
    md: 'row',     // เดสก์ท็อป: แนวนอน
  }
}}>`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 Layout Patterns ที่ใช้บ่อย</Typography>

          <Stack spacing={3}>
            {layoutExamples.map((example, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    {example.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {example.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    💻 โค้ด:
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {example.code}
                    </Typography>
                  </Box>
                  
                  <Alert severity="info">
                    <Typography variant="body2">
                      📱 <strong>ผลลัพธ์:</strong> {example.result}
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </TabPanel>

        {/* Tab 5: Real Project */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🚀 โปรเจคจริง: Dashboard Layout</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            มาสร้าง Dashboard layout ง่ายๆ โดยใช้ความรู้ทั้งหมดที่เรียนมา
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>โปรเจคนี้รวม:</strong> Container, Box layouts, Stack, Responsive design และ Cards
            </Typography>
          </Alert>

          <Typography variant="h5" sx={{ mb: 2 }}>💻 โค้ดเต็ม Dashboard</Typography>

          <Card>
            <CardContent>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
{`// Dashboard/page.tsx
import { Container, Box, Typography, Card, CardContent, Stack, Chip, Alert } from '@mui/material';

export default function Dashboard() {
  const stats = [
    { title: 'ผู้ใช้ทั้งหมด', value: '1,234', color: 'primary' },
    { title: 'ยอดขายวันนี้', value: '฿45,678', color: 'success' },
    { title: 'คำสั่งซื้อ', value: '89', color: 'warning' },
    { title: 'รายได้เดือนนี้', value: '฿567,890', color: 'error' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          📊 Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ภาพรวมข้อมูลธุรกิจ
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',                    // มือถือ: 1 คอลัมน์
          sm: 'repeat(2, 1fr)',         // แท็บเล็ต: 2 คอลัมน์
          md: 'repeat(4, 1fr)'          // เดสก์ท็อป: 4 คอลัมน์
        },
        gap: 3,
        mb: 4
      }}>
        {stats.map((stat, index) => (
          <Card key={index} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {stat.title}
              </Typography>
              <Typography variant="h4" sx={{ color: \`\${stat.color}.main\` }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Main Content Area */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 3
      }}>
        {/* Left Column - Charts */}
        <Box sx={{ flex: 2 }}>
          <Card sx={{ height: 400, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📈 กราฟยอดขาย
              </Typography>
              <Box sx={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 1
              }}>
                <Typography color="text.secondary">
                  [Chart Component จะอยู่ตรงนี้]
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📋 รายการล่าสุด
              </Typography>
              <Stack spacing={2}>
                {['คำสั่งซื้อ #1234', 'คำสั่งซื้อ #1235', 'คำสั่งซื้อ #1236'].map((order) => (
                  <Box key={order} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 1
                  }}>
                    <Typography>{order}</Typography>
                    <Chip label="เสร็จสิ้น" color="success" size="small" />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Right Column - Sidebar */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔔 การแจ้งเตือน
              </Typography>
              <Stack spacing={2}>
                <Alert severity="info">
                  มีคำสั่งซื้อใหม่ 3 รายการ
                </Alert>
                <Alert severity="warning">
                  สินค้าในคลังใกล้หมด
                </Alert>
                <Alert severity="success">
                  ยอดขายเดือนนี้เพิ่มขึ้น 25%
                </Alert>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}`}
                </Typography>
              </Box>

              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  🎉 <strong>ผลลัพธ์:</strong> Dashboard ที่ responsive และใช้งานได้จริง!
                </Typography>
              </Alert>

              <Typography variant="h6" sx={{ mb: 2 }}>
                🔍 สิ่งที่ใช้ในโปรเจคนี้:
              </Typography>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label="Container maxWidth" size="small" variant="outlined" />
                <Chip label="CSS Grid responsive" size="small" variant="outlined" />
                <Chip label="Flexbox layout" size="small" variant="outlined" />
                <Chip label="Breakpoint responsive" size="small" variant="outlined" />
                <Chip label="Stack component" size="small" variant="outlined" />
                <Chip label="Card grid" size="small" variant="outlined" />
              </Stack>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/mui-tutorial/lesson-2"
            variant="outlined"
          >
            บทที่ 2: Theme และ Styling
          </Button>
          
          <Chip 
            label="3 / 8"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/mui-tutorial/lesson-4"
            variant="contained"
          >
            บทที่ 4: Buttons และ Actions
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 