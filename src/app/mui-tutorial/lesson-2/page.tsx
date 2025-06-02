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
  LinearProgress,
  Slider,
  Switch,
  FormControlLabel,
  TextField,
  Grid,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Palette,
  ColorLens,
  FormatPaint,
  Code,
  Settings,
  Visibility,
  VisibilityOff,
  TextFields,
  Style,
  Tune,
  Assignment,
  PlayArrow,
  AutoFixHigh,
  Lightbulb,
  Timer,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

// Theme Examples
const defaultTheme = createTheme();

const customThemes = {
  blue: createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  }),
  green: createTheme({
    palette: {
      primary: {
        main: '#2e7d32',
      },
      secondary: {
        main: '#ed6c02',
      },
    },
  }),
  purple: createTheme({
    palette: {
      primary: {
        main: '#7b1fa2',
      },
      secondary: {
        main: '#f57c00',
      },
    },
  }),
};

const themeBasics = [
  {
    concept: 'Theme Provider',
    description: 'ตัวหลักที่ wrap แอปทั้งหมด ให้ theme ใช้งานได้ทุกที่',
    code: `import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' }
  }
});

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>`,
    benefit: 'ทำให้ทุก component ใช้ theme เดียวกัน'
  },
  {
    concept: 'Palette (สี)',
    description: 'กำหนดสีหลักของแอป ทั้ง primary, secondary, error, warning, info, success',
    code: `const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },    // สีหลัก
    secondary: { main: '#dc004e' },  // สีรอง
    error: { main: '#d32f2f' },      // สีแจ้งเตือน
    warning: { main: '#ed6c02' },    // สีเตือน
    info: { main: '#0288d1' },       // สีข้อมูล
    success: { main: '#2e7d32' },    // สีสำเร็จ
  },
});`,
    benefit: 'ควบคุมสีทั้งแอปจากที่เดียว'
  },
  {
    concept: 'Typography',
    description: 'กำหนดรูปแบบตัวอักษร ขนาด weight และ font family',
    code: `const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
});`,
    benefit: 'ตัวอักษรสม่ำเสมอทั้งแอป'
  }
];

const sxPropExamples = [
  {
    title: 'Basic Styling',
    description: 'การใช้ sx prop พื้นฐาน',
    before: `// CSS แบบเดิม
.my-box {
  padding: 16px;
  margin: 8px;
  background-color: #f5f5f5;
  border-radius: 8px;
}`,
    after: `// MUI sx prop
<Box sx={{
  p: 2,        // padding: 16px
  m: 1,        // margin: 8px  
  bgcolor: 'grey.100',
  borderRadius: 1,
}}>
  Content here
</Box>`,
    benefit: 'เขียนสั้นและได้ access ถึง theme'
  },
  {
    title: 'Responsive Design',
    description: 'ทำ responsive ง่ายๆ ด้วย breakpoints',
    before: `// CSS Media Queries
.responsive-box {
  padding: 8px;
}
@media (min-width: 600px) {
  .responsive-box { padding: 16px; }
}
@media (min-width: 960px) {
  .responsive-box { padding: 24px; }
}`,
    after: `// MUI Responsive sx
<Box sx={{
  p: { xs: 1, sm: 2, md: 3 }
}}>
  Auto responsive!
</Box>`,
    benefit: 'Responsive ในบรรทัดเดียว'
  },
  {
    title: 'Theme Integration',
    description: 'ใช้ค่าจาก theme โดยตรง',
    before: `// แบบเดิมต้องจำสี
.primary-text {
  color: #1976d2;
}`,
    after: `// ใช้สีจาก theme
<Typography sx={{
  color: 'primary.main',
  bgcolor: 'primary.light',
  '&:hover': {
    bgcolor: 'primary.dark',
  }
}}>
  Theme-aware text
</Typography>`,
    benefit: 'เปลี่ยน theme ครั้งเดียว สีเปลี่ยนทั้งแอป'
  }
];

export default function MUILesson2Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<'blue' | 'green' | 'purple'>('blue');
  const [primaryColor, setPrimaryColor] = useState('#1976d2');
  const [secondaryColor, setSecondaryColor] = useState('#dc004e');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const currentTheme = customThemes[selectedTheme];

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
            บทที่ 2: Theme และ Styling
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การปรับแต่ง Theme และใช้ sx prop เพื่อสร้าง UI ที่สวยงาม! 🎨
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Palette />} label="Theme Customization" color="primary" />
            <Chip icon={<Style />} label="sx prop" color="secondary" />
            <Chip icon={<ColorLens />} label="Color Palette" color="success" />
            <Chip icon={<TextFields />} label="Typography" color="warning" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> เข้าใจและปรับแต่ง Theme ได้อย่างมั่นใจ
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 30 นาที | 
              📊 <strong>ระดับ:</strong> เริ่มต้นสู่ปานกลาง
            </Typography>
          </Alert>

          {/* What is Theme */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.50', border: '2px solid', borderColor: 'primary.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="primary" /> 🤔 Theme คืออะไร? (อธิบายแบบง่ายๆ)
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              ลองนึกภาพว่าคุณเป็น <strong>นักออกแบบภายใน</strong>:
            </Typography>

            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🎨 <strong>Theme:</strong> เหมือนแผนผังสีและลวดลายของห้อง
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🪑 <strong>Components:</strong> เหมือนเฟอร์นิเจอร์ที่จะใช้สีตาม theme
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🔧 <strong>sx prop:</strong> เหมือนการปรับแต่งเฟอร์นิเจอร์แต่ละชิ้น
              </Typography>
              <Typography variant="body2">
                • ✨ <strong>ผลลัพธ์:</strong> ห้องที่สวยงาม สีสันกลมกลืน และเปลี่ยนได้ง่าย
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> UI ที่มีสีสันสม่ำเสมอ ปรับแต่งง่าย และดูเป็นมืออาชีพ!
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
                    primary="สร้างและปรับแต่ง Theme" 
                    secondary="กำหนดสี, typography, spacing"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ใช้ sx prop อย่างมั่นใจ" 
                    secondary="styling ที่เชื่อมต่อกับ theme"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ทำ Responsive Design" 
                    secondary="ใช้ breakpoints ในการออกแบบ"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Color Palette แบบมืออาชีพ" 
                    secondary="primary, secondary, และสีอื่นๆ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Typography Hierarchy" 
                    secondary="ระบบตัวอักษรที่สวยงาม"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Component Customization" 
                    secondary="ปรับแต่ง component แต่ละตัว"
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
              label="🎨 Theme พื้นฐาน" 
              icon={<Palette />}
              iconPosition="start"
            />
            <Tab 
              label="🎯 sx prop" 
              icon={<Style />}
              iconPosition="start"
            />
            <Tab 
              label="🌈 Colors & Typography" 
              icon={<ColorLens />}
              iconPosition="start"
            />
            <Tab 
              label="📱 Responsive Design" 
              icon={<Settings />}
              iconPosition="start"
            />
            <Tab 
              label="🎮 ทดลองใช้งาน" 
              icon={<PlayArrow />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: Theme Basics */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎨 Theme พื้นฐาน</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Theme ใน MUI เป็นวิธีกำหนดลักษณะของ UI ทั้งแอป รวมถึงสี ตัวอักษร และ spacing
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🔧 แนวคิดสำคัญ</Typography>

          <Stack spacing={3}>
            {themeBasics.map((concept, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    {concept.concept}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {concept.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    💻 ตัวอย่างโค้ด:
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {concept.code}
                    </Typography>
                  </Box>
                  
                  <Alert severity="info">
                    <Typography variant="body2">
                      ✅ <strong>ประโยชน์:</strong> {concept.benefit}
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Alert severity="warning" sx={{ mt: 3 }}>
            <Typography variant="body2">
              💡 <strong>เคล็ดลับ:</strong> เริ่มต้นด้วยการปรับ palette และ typography ก่อน 
              เพราะจะส่งผลต่อรูปลักษณ์ของแอปมากที่สุด
            </Typography>
          </Alert>
        </TabPanel>

        {/* Tab 2: sx prop */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎯 sx prop - Styling แบบมืออาชีพ</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            sx prop เป็นวิธีเขียน CSS ใน MUI ที่เชื่อมต่อกับ theme และมี features พิเศษมากมาย
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>⚡ ทำไมต้อง sx prop?</Typography>

          <Stack spacing={3}>
            {sxPropExamples.map((example, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                    {example.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {example.description}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: 'error.main' }}>
                        ❌ แบบเดิม (CSS):
                      </Typography>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, mb: 2 }}>
                        <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                          {example.before}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: 'success.main' }}>
                        ✅ แบบใหม่ (sx prop):
                      </Typography>
                      <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1, mb: 2 }}>
                        <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                          {example.after}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Alert severity="success">
                    <Typography variant="body2">
                      🚀 <strong>ข้อดี:</strong> {example.benefit}
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>📝 sx prop Shortcuts</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔤 Spacing & Size Shortcuts
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`// Spacing (1 unit = 8px)
p: 2        // padding: 16px
pt: 1       // padding-top: 8px  
px: 3       // padding-left: 24px, padding-right: 24px
m: 2        // margin: 16px
mb: 1       // margin-bottom: 8px
mx: 'auto'  // margin-left: auto, margin-right: auto

// Colors
bgcolor: 'primary.main'     // background-color
color: 'text.secondary'     // text color

// Display & Layout  
display: 'flex'
justifyContent: 'center'
alignItems: 'center'

// Size
width: 1                    // width: 100%
height: 200                 // height: 200px
minHeight: '100vh'          // min-height: 100vh`}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 3: Colors & Typography */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>🌈 Colors & Typography</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            การกำหนดสีและตัวอักษรที่ดีจะทำให้ UI ดูเป็นมืออาชีพและใช้งานง่าย
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎨 Color Palette System</Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📊 MUI Color System
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mb: 3 }}>
                {[
                  { name: 'Primary', colors: ['primary.light', 'primary.main', 'primary.dark'], usage: 'สีหลักของแบรนด์' },
                  { name: 'Secondary', colors: ['secondary.light', 'secondary.main', 'secondary.dark'], usage: 'สีรองสำหรับ accent' },
                  { name: 'Error', colors: ['error.light', 'error.main', 'error.dark'], usage: 'สีแจ้งข้อผิดพลาด' },
                  { name: 'Warning', colors: ['warning.light', 'warning.main', 'warning.dark'], usage: 'สีเตือน' },
                  { name: 'Info', colors: ['info.light', 'info.main', 'info.dark'], usage: 'สีข้อมูล' },
                  { name: 'Success', colors: ['success.light', 'success.main', 'success.dark'], usage: 'สีความสำเร็จ' },
                ].map((colorGroup) => (
                  <Box key={colorGroup.name} sx={{ p: 2, border: '1px solid', borderColor: 'grey.200', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                      {colorGroup.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                      {colorGroup.colors.map((color) => (
                        <Box
                          key={color}
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: color,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'grey.300'
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {colorGroup.usage}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                💻 ตัวอย่างการใช้งาน:
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// ใช้สีในการ styling
<Button sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
  Primary Button
</Button>

<Alert severity="success">
  ใช้สีจาก theme ทำให้เปลี่ยน theme ง่าย
</Alert>

<Typography sx={{ color: 'text.primary' }}>
  ข้อความหลัก
</Typography>
<Typography sx={{ color: 'text.secondary' }}>
  ข้อความรอง
</Typography>`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>📝 Typography System</Typography>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔤 Typography Variants
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {[
                  { variant: 'h1', text: 'h1. Heading 1', desc: 'หัวข้อใหญ่สุด (96px)' },
                  { variant: 'h2', text: 'h2. Heading 2', desc: 'หัวข้อรอง (60px)' },
                  { variant: 'h3', text: 'h3. Heading 3', desc: 'หัวข้อย่อย (48px)' },
                  { variant: 'h4', text: 'h4. Heading 4', desc: 'หัวข้อเล็ก (34px)' },
                  { variant: 'h5', text: 'h5. Heading 5', desc: 'หัวข้อเล็กมาก (24px)' },
                  { variant: 'h6', text: 'h6. Heading 6', desc: 'หัวข้อเล็กสุด (20px)' },
                  { variant: 'subtitle1', text: 'subtitle1. Subtitle large', desc: 'หัวข้อย่อยใหญ่ (16px)' },
                  { variant: 'subtitle2', text: 'subtitle2. Subtitle small', desc: 'หัวข้อย่อยเล็ก (14px)' },
                  { variant: 'body1', text: 'body1. Lorem ipsum dolor sit amet...', desc: 'เนื้อหาหลัก (16px)' },
                  { variant: 'body2', text: 'body2. Lorem ipsum dolor sit amet...', desc: 'เนื้อหารอง (14px)' },
                  { variant: 'caption', text: 'caption. Photo caption', desc: 'คำอธิบาย (12px)' },
                  { variant: 'overline', text: 'OVERLINE', desc: 'ข้อความเหนือหัวข้อ (10px)' },
                ].map((typo) => (
                  <Box key={typo.variant} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant={typo.variant as any} sx={{ mb: 0.5 }}>
                      {typo.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {typo.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                💻 Custom Typography:
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    // เพิ่ม custom variant
    poster: {
      fontSize: '4rem',
      fontWeight: 900,
      color: 'primary.main',
    },
  },
});

// การใช้งาน
<Typography variant="poster">
  BIG TITLE
</Typography>`}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 4: Responsive Design */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>📱 Responsive Design</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            MUI มี breakpoint system ที่ทำให้การทำ responsive design ง่ายมาก
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>📐 Breakpoint System</Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📊 MUI Breakpoints
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
                {[
                  { name: 'xs', range: '0px+', desc: 'มือถือ', icon: '📱' },
                  { name: 'sm', range: '600px+', desc: 'แท็บเล็ต', icon: '📱' },
                  { name: 'md', range: '900px+', desc: 'แล็ปท็อป', icon: '💻' },
                  { name: 'lg', range: '1200px+', desc: 'เดสก์ท็อป', icon: '🖥️' },
                  { name: 'xl', range: '1536px+', desc: 'จอใหญ่', icon: '🖥️' },
                ].map((bp) => (
                  <Box key={bp.name} sx={{ p: 2, border: '1px solid', borderColor: 'grey.200', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>{bp.icon}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{bp.name}</Typography>
                    <Typography variant="body2" color="primary.main">{bp.range}</Typography>
                    <Typography variant="caption" color="text.secondary">{bp.desc}</Typography>
                  </Box>
                ))}
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                💻 Responsive sx prop:
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Responsive padding
<Box sx={{
  p: {
    xs: 1,    // padding: 8px on mobile
    sm: 2,    // padding: 16px on tablet
    md: 3,    // padding: 24px on laptop
  }
}}>

// Responsive display
<Box sx={{
  display: {
    xs: 'block',     // block on mobile
    md: 'flex',      // flex on desktop
  }
}}>

// Responsive grid
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  <Grid item xs={2} sm={4} md={4}>
    Content
  </Grid>
</Grid>`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 Responsive Examples</Typography>

          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  📱 Mobile-First Layout
                </Typography>
                <Box sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                  mb: 2
                }}>
                  <Box sx={{ flex: 1, p: 2, bgcolor: 'primary.light', borderRadius: 1, textAlign: 'center' }}>
                    <Typography>Sidebar</Typography>
                    <Typography variant="caption">บนมือถือ: เต็มความกว้าง</Typography>
                    <Typography variant="caption" display="block">บนเดสก์ท็อป: ข้างซ้าย</Typography>
                  </Box>
                  <Box sx={{ flex: 3, p: 2, bgcolor: 'secondary.light', borderRadius: 1, textAlign: 'center' }}>
                    <Typography>Main Content</Typography>
                    <Typography variant="caption">ปรับขนาดตาม screen</Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
{`<Box sx={{
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: 2,
}}>
  <Box sx={{ flex: 1 }}>Sidebar</Box>
  <Box sx={{ flex: 3 }}>Main Content</Box>
</Box>`}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
                  🔧 Responsive Typography
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h1" sx={{ 
                    fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                    textAlign: 'center',
                    color: 'primary.main'
                  }}>
                    ขนาดเปลี่ยนตาม Screen
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
{`<Typography sx={{
  fontSize: {
    xs: '2rem',   // 32px on mobile
    sm: '3rem',   // 48px on tablet  
    md: '4rem',   // 64px on desktop
  }
}}>
  Responsive Text
</Typography>`}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </TabPanel>

        {/* Tab 5: Interactive Demo */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎮 ทดลองใช้งาน Theme</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            ทดลองเปลี่ยน theme และดูผลลัพธ์แบบ real-time
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎨 Theme Switcher</Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                เลือก Theme:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                {Object.entries(customThemes).map(([key, theme]) => (
                  <Button
                    key={key}
                    variant={selectedTheme === key ? 'contained' : 'outlined'}
                    onClick={() => setSelectedTheme(key as any)}
                    sx={{
                      bgcolor: selectedTheme === key ? theme.palette.primary.main : 'transparent',
                      borderColor: theme.palette.primary.main,
                      color: selectedTheme === key ? 'white' : theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: theme.palette.primary.light,
                      }
                    }}
                  >
                    {key === 'blue' && '💙 Blue'} 
                    {key === 'green' && '💚 Green'}
                    {key === 'purple' && '💜 Purple'}
                  </Button>
                ))}
              </Box>

              <ThemeProvider theme={currentTheme}>
                <Paper sx={{ p: 3, border: '2px solid', borderColor: 'primary.main' }}>
                  <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
                    🎨 ตัวอย่าง Theme ที่เลือก
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <Button variant="contained" color="primary">Primary Button</Button>
                    <Button variant="contained" color="secondary">Secondary Button</Button>
                    <Button variant="outlined" color="primary">Outlined</Button>
                  </Box>

                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography>ตัวอย่าง Alert ที่ใช้ theme สี</Typography>
                  </Alert>

                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
                    <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 1, textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: 'primary.contrastText' }}>
                        Primary Light
                      </Typography>
                    </Box>
                    <Box sx={{ p: 2, bgcolor: 'primary.main', borderRadius: 1, textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: 'primary.contrastText' }}>
                        Primary Main
                      </Typography>
                    </Box>
                    <Box sx={{ p: 2, bgcolor: 'secondary.main', borderRadius: 1, textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
                        Secondary
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </ThemeProvider>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>⚡ sx prop Playground</Typography>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ทดลอง sx prop:
              </Typography>
              
              <Box sx={{ 
                p: 3,
                bgcolor: 'primary.light',
                borderRadius: 2,
                border: '2px dashed',
                borderColor: 'primary.main',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  transform: 'scale(1.02)',
                }
              }}>
                <Typography variant="h6">
                  🎯 Hover ที่กล่องนี้!
                </Typography>
                <Typography variant="body2">
                  ใช้ sx prop สำหรับ styling, hover effects และ transitions
                </Typography>
              </Box>

              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
{`<Box sx={{
  p: 3,
  bgcolor: 'primary.light',
  borderRadius: 2,
  border: '2px dashed',
  borderColor: 'primary.main',
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    transform: 'scale(1.02)',
  }
}}>
  Interactive Box
</Box>`}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/mui-tutorial/lesson-1"
            variant="outlined"
          >
            บทที่ 1: เริ่มต้นกับ MUI
          </Button>
          
          <Chip 
            label="2 / 8"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/mui-tutorial/lesson-3"
            variant="contained"
          >
            บทที่ 3: Layout Components
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 