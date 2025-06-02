'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Button,
  IconButton,
  Fab,
  ButtonGroup,
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
  CircularProgress,
  Divider,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  TouchApp,
  Add,
  Edit,
  Delete,
  Share,
  Download,
  Assignment,
  PlayArrow,
  Lightbulb,
  Favorite,
  Star,
  ThumbUp,
  Send,
  Save,
  Cancel,
  Refresh,
  Settings,
  Home,
  ShoppingCart,
  Notifications,
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

const buttonVariants = [
  {
    variant: 'contained',
    description: 'ปุ่มหลักที่สำคัญที่สุด มีพื้นหลังเต็ม',
    usage: 'Call-to-Action หลัก, Submit form, การกระทำสำคัญ',
    example: 'ลงทะเบียน, ซื้อสินค้า, บันทึก',
    color: 'primary',
    icon: '🎯'
  },
  {
    variant: 'outlined',
    description: 'ปุ่มรองที่มีกรอบ ไม่มีพื้นหลัง',
    usage: 'การกระทำรอง, Cancel, Alternative action',
    example: 'ยกเลิก, แก้ไข, ดูรายละเอียด',
    color: 'secondary',
    icon: '📋'
  },
  {
    variant: 'text',
    description: 'ปุ่มแบบข้อความ ไม่มีกรอบ มี hierarchy ต่ำสุด',
    usage: 'Navigation, Links, การกระทำที่ไม่สำคัญ',
    example: 'เรียนรู้เพิ่มเติม, ข้าม, ปิด',
    color: 'info',
    icon: '📝'
  }
];

const buttonSizes = [
  { size: 'small', description: 'เล็ก - สำหรับพื้นที่จำกัด', px: '8px', fontSize: '0.8125rem' },
  { size: 'medium', description: 'กลาง - ขนาดมาตรฐาน', px: '16px', fontSize: '0.875rem' },
  { size: 'large', description: 'ใหญ่ - สำหรับ CTA สำคัญ', px: '22px', fontSize: '0.9375rem' }
];

const iconButtonTypes = [
  {
    type: 'IconButton',
    description: 'ปุ่มไอคอนธรรมดา สำหรับ action ต่างๆ',
    usage: 'การกระทำเดี่ยวๆ เช่น Edit, Delete, Share',
    icon: <Edit />,
    examples: ['แก้ไข', 'ลบ', 'แชร์', 'ถูกใจ']
  },
  {
    type: 'FAB (Floating Action Button)',
    description: 'ปุ่มลอยสำหรับ primary action หลัก',
    usage: 'การกระทำหลักที่สำคัญที่สุดในหน้านั้น',
    icon: <Add />,
    examples: ['สร้างใหม่', 'เพิ่ม', 'เขียน', 'ถ่ายรูป']
  }
];

const fabVariants = [
  { variant: 'circular', size: 'small', description: 'กลมเล็ก', icon: <Add /> },
  { variant: 'circular', size: 'medium', description: 'กลมกลาง', icon: <Edit /> },
  { variant: 'circular', size: 'large', description: 'กลมใหญ่', icon: <Share /> },
  { variant: 'extended', size: 'medium', description: 'แบบยาว + ข้อความ', icon: <Add />, text: 'เพิ่มใหม่' }
];

const buttonGroupExamples = [
  {
    title: 'Toggle Buttons',
    description: 'สำหรับเลือกหลายตัวเลือก',
    options: ['ซ้าย', 'กลาง', 'ขวา'],
    variant: 'contained'
  },
  {
    title: 'Action Buttons',
    description: 'กลุ่มปุ่มสำหรับ action ที่เกี่ยวข้อง',
    options: ['บันทึก', 'ยกเลิก', 'รีเซ็ต'],
    variant: 'outlined'
  }
];

export default function MUILesson4Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
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
            <TouchApp color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 4: Buttons และ Actions
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การใช้งาน Button ทุกประเภทใน MUI สำหรับมือใหม่! 🔘
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<TouchApp />} label="Button Variants" color="primary" />
            <Chip icon={<Add />} label="Icon Buttons" color="secondary" />
            <Chip icon={<PlayArrow />} label="FAB" color="success" />
            <Chip icon={<Assignment />} label="Button Groups" color="warning" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> เชี่ยวชาญ Button ทุกประเภทใน MUI
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 20 นาที | 
              📊 <strong>ระดับ:</strong> เริ่มต้น
            </Typography>
          </Alert>

          {/* Why Buttons Matter */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="success" /> 💡 ทำไม Button ถึงสำคัญ?
            </Typography>
            
            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'success.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🎯 <strong>User Interaction:</strong> จุดเชื่อมต่อหลักระหว่างผู้ใช้และแอป
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🎨 <strong>Visual Hierarchy:</strong> ช่วยชี้นำผู้ใช้ให้รู้ว่าควรทำอะไร
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • ⚡ <strong>Action Feedback:</strong> ให้ feedback ชัดเจนเมื่อมีการกระทำ
              </Typography>
              <Typography variant="body2">
                • 📱 <strong>Accessibility:</strong> รองรับ keyboard navigation และ screen reader
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> UI ที่ใช้งานง่าย มี UX ดี และเข้าถึงได้ทุกคน!
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
                    primary="เลือก Button Variant ได้ถูก" 
                    secondary="contained, outlined, text สำหรับสถานการณ์ต่างๆ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ใช้ IconButton และ FAB" 
                    secondary="ปุ่มไอคอนและ Floating Action Button"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="จัดกลุ่ม ButtonGroup" 
                    secondary="การจัดกลุ่มปุ่มอย่างเป็นระบบ"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Loading & Disabled States" 
                    secondary="จัดการสถานะของปุ่มอย่างมืออาชีพ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Custom Button Styling" 
                    secondary="ปรับแต่งปุ่มให้ตรงตาม design"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="UX Best Practices" 
                    secondary="หลักการใช้ปุ่มที่ดีสำหรับผู้ใช้"
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
              label="🔘 Button Variants" 
              icon={<Assignment />}
              iconPosition="start"
            />
            <Tab 
              label="⚡ Icon & FAB" 
              icon={<Add />}
              iconPosition="start"
            />
            <Tab 
              label="👥 Button Groups" 
              icon={<TouchApp />}
              iconPosition="start"
            />
            <Tab 
              label="🔄 States & Loading" 
              icon={<Refresh />}
              iconPosition="start"
            />
            <Tab 
              label="🎨 Custom & Best Practices" 
              icon={<PlayArrow />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: Button Variants */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>🔘 Button Variants</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            MUI มี Button 3 แบบหลัก แต่ละแบบมีหน้าที่และการใช้งานที่แตกต่างกัน
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 3 Variants หลัก</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
            {buttonVariants.map((btn, index) => (
              <Card key={btn.variant} sx={{ height: '100%', position: 'relative' }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${btn.color}.light`, 
                        color: `${btn.color}.main`,
                        mr: 2,
                        fontSize: '1.5rem'
                      }}
                    >
                      {btn.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                      {btn.variant}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 2, flex: 1 }}>
                    {btn.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, color: `${btn.color}.main`, fontWeight: 600 }}>
                    📌 เมื่อไหร่ใช้:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    {btn.usage}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    💡 ตัวอย่าง:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    {btn.example}
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Button 
                      variant={btn.variant as any}
                      color={btn.color as any}
                      fullWidth
                      sx={{ textTransform: 'none' }}
                    >
                      ตัวอย่าง {btn.variant}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>📏 Button Sizes</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔍 เปรียบเทียบขนาด
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 3 }}>
                {buttonSizes.map((size) => (
                  <Box key={size.size} sx={{ textAlign: 'center', p: 2, border: '1px solid', borderColor: 'grey.200', borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1, textTransform: 'capitalize' }}>
                      {size.size}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {size.description}
                    </Typography>
                    <Button variant="contained" size={size.size as any} sx={{ mb: 1 }}>
                      {size.size} Button
                    </Button>
                    <Typography variant="caption" display="block" color="text.secondary">
                      padding: {size.px} | font: {size.fontSize}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ large สำหรับ CTA หลัก, medium สำหรับงานทั่วไป, small สำหรับพื้นที่จำกัด
                </Typography>
              </Alert>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🌈 Colors และ Props</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 ตัวอย่างการใช้งาน
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  💻 โค้ดตัวอย่าง:
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic Button
<Button variant="contained">Click Me</Button>

// With Color
<Button variant="contained" color="primary">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>
<Button variant="text" color="error">Delete</Button>

// With Size
<Button variant="contained" size="large">Large Button</Button>

// With Icons
<Button variant="contained" startIcon={<Save />}>บันทึก</Button>
<Button variant="outlined" endIcon={<Send />}>ส่ง</Button>

// Full Width
<Button variant="contained" fullWidth>Full Width</Button>

// Disabled
<Button variant="contained" disabled>Disabled</Button>`}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button variant="contained" color="primary">Primary</Button>
                  <Button variant="contained" color="secondary">Secondary</Button>
                  <Button variant="contained" color="success">Success</Button>
                  <Button variant="contained" color="error">Error</Button>
                  <Button variant="contained" color="warning">Warning</Button>
                  <Button variant="contained" color="info">Info</Button>
                </Stack>
                
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button variant="outlined" color="primary">Primary</Button>
                  <Button variant="outlined" color="secondary">Secondary</Button>
                  <Button variant="outlined" color="success">Success</Button>
                  <Button variant="outlined" color="error">Error</Button>
                </Stack>

                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button variant="text" color="primary">Primary</Button>
                  <Button variant="text" color="secondary">Secondary</Button>
                  <Button variant="text" color="error">Delete</Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 2: Icon & FAB */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>⚡ Icon Buttons & FAB</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            ปุ่มไอคอนและ Floating Action Button ช่วยให้ UI กระชับและใช้งานง่าย
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 ประเภทของ Icon Buttons</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
            {iconButtonTypes.map((type, index) => (
              <Card key={index}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', mr: 2 }}>
                      {type.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {type.type}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {type.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
                    📌 เหมาะสำหรับ:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    {type.usage}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    💡 ตัวอย่าง:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {type.examples.map((example, i) => (
                      <Chip key={i} label={example} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>🔘 IconButton พื้นฐาน</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                💻 โค้ดและตัวอย่าง
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic IconButton
<IconButton>
  <Edit />
</IconButton>

// With Color
<IconButton color="primary">
  <Favorite />
</IconButton>

// With Size
<IconButton size="small">
  <Delete />
</IconButton>

// With Tooltip
<Tooltip title="แก้ไข">
  <IconButton>
    <Edit />
  </IconButton>
</Tooltip>

// Disabled
<IconButton disabled>
  <Share />
</IconButton>`}
                </Typography>
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                🎨 ตัวอย่างการใช้งาน:
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    ขนาดต่างๆ:
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton size="small" color="primary">
                      <Favorite />
                    </IconButton>
                    <IconButton size="medium" color="primary">
                      <Favorite />
                    </IconButton>
                    <IconButton size="large" color="primary">
                      <Favorite />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">
                      small, medium, large
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    สีต่างๆ:
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton color="default"><Edit /></IconButton>
                    <IconButton color="primary"><ThumbUp /></IconButton>
                    <IconButton color="secondary"><Star /></IconButton>
                    <IconButton color="success"><CheckCircle /></IconButton>
                    <IconButton color="error"><Delete /></IconButton>
                    <IconButton color="warning"><Notifications /></IconButton>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    พร้อม Tooltip:
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="แก้ไข">
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="ลบ">
                      <IconButton color="error">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="แชร์">
                      <IconButton color="info">
                        <Share />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="ดาวน์โหลด">
                      <IconButton color="success">
                        <Download />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🚀 Floating Action Button (FAB)</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ✨ FAB Variants
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                FAB เป็นปุ่มลอยที่ใช้สำหรับ primary action ที่สำคัญที่สุดในหน้านั้นๆ
              </Typography>

              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic FAB
<Fab color="primary">
  <Add />
</Fab>

// Extended FAB
<Fab variant="extended" color="primary">
  <Add sx={{ mr: 1 }} />
  เพิ่มใหม่
</Fab>

// Different Sizes
<Fab size="small" color="secondary">
  <Edit />
</Fab>

// Fixed Position
<Fab 
  color="primary" 
  sx={{ 
    position: 'fixed', 
    bottom: 16, 
    right: 16 
  }}
>
  <Add />
</Fab>`}
                </Typography>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
                {fabVariants.map((fab, index) => (
                  <Box key={index} sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    border: '1px solid', 
                    borderColor: 'grey.200', 
                    borderRadius: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {fab.description}
                    </Typography>
                    
                    {fab.variant === 'extended' ? (
                      <Fab variant="extended" color="primary" size={fab.size as any}>
                        {fab.icon}
                        {fab.text}
                      </Fab>
                    ) : (
                      <Fab color="primary" size={fab.size as any}>
                        {fab.icon}
                      </Fab>
                    )}
                    
                    <Typography variant="caption" color="text.secondary">
                      variant=&quot;{fab.variant}&quot; size=&quot;{fab.size}&quot;
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  💡 <strong>หลักการใช้ FAB:</strong> ใช้เพียง 1 ปุ่มต่อหน้า สำหรับ action หลักเท่านั้น
                </Typography>
              </Alert>

              <Typography variant="h6" sx={{ mb: 2 }}>
                🎯 ตำแหน่งและการใช้งาน
              </Typography>
              
              <Box sx={{ position: 'relative', height: 200, border: '2px solid', borderColor: 'grey.300', borderRadius: 1, bgcolor: 'grey.50' }}>
                <Typography variant="body2" sx={{ p: 2, color: 'text.secondary' }}>
                  พื้นที่เนื้อหาหลัก
                </Typography>
                
                <Fab 
                  color="primary" 
                  size="small"
                  sx={{ position: 'absolute', bottom: 16, right: 16 }}
                >
                  <Add />
                </Fab>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 70, 
                    right: 16, 
                    bgcolor: 'white', 
                    p: 0.5, 
                    borderRadius: 0.5,
                    border: '1px solid',
                    borderColor: 'grey.300'
                  }}
                >
                  ตำแหน่งมาตรฐาน
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 3: Button Groups */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>👥 Button Groups</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            ButtonGroup ช่วยจัดกลุ่มปุ่มที่เกี่ยวข้องกันให้เป็นหน่วยเดียว
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 การใช้งาน ButtonGroup</Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                💻 โค้ดพื้นฐาน
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic ButtonGroup
<ButtonGroup variant="contained">
  <Button>หนึ่ง</Button>
  <Button>สอง</Button>
  <Button>สาม</Button>
</ButtonGroup>

// Vertical ButtonGroup
<ButtonGroup 
  orientation="vertical" 
  variant="outlined"
>
  <Button>บันทึก</Button>
  <Button>ยกเลิก</Button>
</ButtonGroup>`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    ButtonGroup แนวนอน:
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    <ButtonGroup variant="contained" color="primary">
                      <Button>หนึ่ง</Button>
                      <Button>สอง</Button>
                      <Button>สาม</Button>
                    </ButtonGroup>
                    
                    <ButtonGroup variant="outlined" color="secondary">
                      <Button>บันทึก</Button>
                      <Button>ยกเลิก</Button>
                      <Button>รีเซ็ต</Button>
                    </ButtonGroup>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    ButtonGroup แนวตั้ง:
                  </Typography>
                  <ButtonGroup orientation="vertical" variant="outlined" color="primary">
                    <Button startIcon={<Save />}>บันทึก</Button>
                    <Button startIcon={<Edit />}>แก้ไข</Button>
                    <Button startIcon={<Delete />} color="error">ลบ</Button>
                  </ButtonGroup>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🎨 ButtonGroup ขั้นสูง</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ⚡ Split Button และ Dropdown
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Split Button Pattern
<ButtonGroup variant="contained">
  <Button onClick={handleMainAction}>
    บันทึก
  </Button>
  <Button 
    size="small"
    onClick={handleDropdownToggle}
  >
    <ArrowDropDown />
  </Button>
</ButtonGroup>

// Toggle Button Group (เลือกได้หลายตัว)
<ToggleButtonGroup
  value={formats}
  onChange={handleFormat}
>
  <ToggleButton value="bold">
    <FormatBold />
  </ToggleButton>
  <ToggleButton value="italic">
    <FormatItalic />
  </ToggleButton>
  <ToggleButton value="underlined">
    <FormatUnderlined />
  </ToggleButton>
</ToggleButtonGroup>`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ ButtonGroup เมื่อปุ่มมีหน้าที่เกี่ยวข้องกัน เช่น บันทึก-ยกเลิก หรือ ตัวเลือกที่เป็นกลุ่ม
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 4: States & Loading */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>🔄 States & Loading</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            การจัดการ state ของปุ่มให้ผู้ใช้เข้าใจสถานการณ์ที่เกิดขึ้น
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>⚡ Button States</Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎯 Button States
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Loading Button
const [loading, setLoading] = useState(false);

<Button 
  variant="contained"
  disabled={loading}
  onClick={handleSubmit}
  startIcon={loading ? <CircularProgress size={20} /> : <Save />}
>
  {loading ? 'กำลังบันทึก...' : 'บันทึก'}
</Button>`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    Loading State:
                  </Typography>
                  <Button 
                    variant="contained" 
                    disabled={loading}
                    onClick={handleLoadingClick}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                  >
                    {loading ? 'กำลังบันทึก...' : 'บันทึก'}
                  </Button>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    Disabled State:
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" disabled>Disabled</Button>
                    <Button variant="outlined" disabled>Disabled</Button>
                    <Button variant="text" disabled>Disabled</Button>
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 5: Custom & Best Practices */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎨 Custom & Best Practices</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            เทคนิคการปรับแต่งปุ่มและหลักการใช้งานที่ดี
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎨 Custom Styling</Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ✨ Custom Styling
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Gradient Button
<Button 
  variant="contained"
  sx={{
    background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)',
    borderRadius: 3,
    height: 48,
  }}
>
  Gradient Button
</Button>`}
                </Typography>
              </Box>

              <Button 
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  border: 0,
                  borderRadius: 3,
                  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                  color: 'white',
                  height: 48,
                  padding: '0 30px',
                }}
              >
                Gradient Button
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📋 Best Practices
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Primary Button เพียง 1 ปุ่มต่อหน้า" 
                    secondary="ใช้ contained variant สำหรับ action หลักเท่านั้น"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="ข้อความปุ่มต้องชัดเจน" 
                    secondary="เช่น 'บันทึกการเปลี่ยนแปลง' แทน 'OK'"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="แสดง Loading state เสมอ" 
                    secondary="ให้ผู้ใช้เห็นว่ากำลังประมวลผล"
                  />
                </ListItem>
              </List>

              <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1, mt: 2 }}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button variant="text" color="inherit">ยกเลิก</Button>
                  <Button variant="outlined" color="primary">บันทึกแบบร่าง</Button>
                  <Button variant="contained" color="primary">เผยแพร่</Button>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  ตัวอย่าง: การเรียงลำดับความสำคัญของปุ่ม
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
            href="/mui-tutorial/lesson-3"
            variant="outlined"
          >
            บทที่ 3: Layout Components
          </Button>
          
          <Chip 
            label="4 / 8"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/mui-tutorial/lesson-5"
            variant="contained"
          >
            บทที่ 5: Forms และ Inputs
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 