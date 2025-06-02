'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Tabs,
  Tab,
  Breadcrumbs,
  Chip,
  Card,
  CardContent,
  Stack,
  Avatar,
  Divider,
  Badge,
  Switch,
  FormControlLabel,
  Collapse,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Menu as MenuIcon,
  Home,
  Person,
  Settings,
  Notifications,
  Search,
  AccountCircle,
  Mail,
  MoreVert,
  Inbox,
  Drafts,
  Send,
  ExpandLess,
  ExpandMore,
  StarBorder,
  Dashboard,
  ShoppingCart,
  BarChart,
  Layers,
  Assignment,
  PlayArrow,
  Lightbulb,
  Navigation,
  NavigateNext,
  Folder,
  FolderOpen,
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

const appBarVariants = [
  {
    variant: 'static',
    description: 'AppBar ปกติที่ไม่เลื่อนตาม scroll',
    usage: 'หน้าที่ไม่ต้องการ sticky navigation',
    pros: ['ไม่รบกวน content', 'เหมาะกับหน้าสั้น'],
    cons: ['หายไปเมื่อ scroll ลง']
  },
  {
    variant: 'fixed',
    description: 'AppBar ติดอยู่ด้านบนเสมอ',
    usage: 'แอปที่ต้องการ navigation เข้าถึงได้ตลอด',
    pros: ['เข้าถึงได้ตลอดเวลา', 'UX ดี'],
    cons: ['กินพื้นที่หน้าจอ', 'อาจบดบังเนื้อหา']
  },
  {
    variant: 'sticky',
    description: 'AppBar ที่ sticky เมื่อ scroll',
    usage: 'การนำทางที่ต้องการความยืดหยุ่น',
    pros: ['ยืดหยุ่น', 'ไม่กินพื้นที่เมื่อไม่จำเป็น'],
    cons: ['พฤติกรรมซับซ้อนกว่า']
  }
];

const drawerTypes = [
  {
    type: 'permanent',
    description: 'Drawer ที่แสดงอยู่ตลอดเวลา',
    usage: 'Desktop app, Admin dashboard',
    icon: <Folder />,
    examples: ['Dashboard แอดมิน', 'File manager', 'IDE sidebar']
  },
  {
    type: 'persistent',
    description: 'Drawer ที่เปิด/ปิดได้ แต่ไม่ overlay content',
    usage: 'App ที่ต้องการพื้นที่ยืดหยุ่น',
    icon: <FolderOpen />,
    examples: ['Email client', 'Code editor', 'Design tools']
  },
  {
    type: 'temporary',
    description: 'Drawer ที่ overlay บน content',
    usage: 'Mobile app, Responsive design',
    icon: <MenuIcon />,
    examples: ['Mobile navigation', 'Settings panel', 'Filter sidebar']
  }
];

export default function MUILesson6Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [inboxOpen, setInboxOpen] = useState(true);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabValueChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
            <Navigation color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 6: Navigation Components
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การสร้างระบบนำทางที่สมบูรณ์ด้วย MUI สำหรับมือใหม่! 🗂️
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Navigation />} label="AppBar & Toolbar" color="primary" />
            <Chip icon={<MenuIcon />} label="Drawer & Menu" color="secondary" />
            <Chip icon={<Assignment />} label="Tabs" color="success" />
            <Chip icon={<NavigateNext />} label="Breadcrumbs" color="warning" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> สร้างระบบนำทางครบครันสำหรับ web app
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 35 นาที | 
              📊 <strong>ระดับ:</strong> ปานกลาง
            </Typography>
          </Alert>

          {/* Why Navigation Components Matter */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'info.50', border: '2px solid', borderColor: 'info.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="info" /> 💡 ทำไม Navigation ถึงสำคัญ?
            </Typography>
            
            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'info.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🧭 <strong>User Orientation:</strong> ช่วยผู้ใช้รู้ว่าอยู่ที่ไหนในแอป
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🚀 <strong>Easy Access:</strong> เข้าถึงฟีเจอร์ต่างๆ ได้ง่ายและรวดเร็ว
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 📱 <strong>Responsive Design:</strong> รองรับทุกขนาดหน้าจออย่างลงตัว
              </Typography>
              <Typography variant="body2">
                • ✨ <strong>Professional Look:</strong> ทำให้แอปดูเป็นมืออาชีพและใช้งานง่าย
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> Navigation ที่ดีช่วยเพิ่ม UX และลด bounce rate ของแอป!
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
                    primary="สร้าง AppBar และ Toolbar" 
                    secondary="navigation bar ที่ทันสมัย"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ใช้ Drawer และ Menu" 
                    secondary="sidebar และ dropdown menu"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="จัดการ Tabs navigation" 
                    secondary="การนำทางแบบแท็บ"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="สร้าง Breadcrumbs" 
                    secondary="แสดงเส้นทางปัจจุบัน"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Responsive Navigation" 
                    secondary="navigation ที่รองรับทุกขนาดจอ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Complete App Layout" 
                    secondary="layout แอปที่สมบูรณ์"
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
              label="🧭 AppBar & Toolbar" 
              icon={<Navigation />}
              iconPosition="start"
            />
            <Tab 
              label="📂 Drawer & Menu" 
              icon={<MenuIcon />}
              iconPosition="start"
            />
            <Tab 
              label="📑 Tabs Navigation" 
              icon={<Assignment />}
              iconPosition="start"
            />
            <Tab 
              label="🔗 Breadcrumbs" 
              icon={<NavigateNext />}
              iconPosition="start"
            />
            <Tab 
              label="🚀 Complete Layout" 
              icon={<PlayArrow />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: AppBar & Toolbar */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>🧭 AppBar & Toolbar</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            AppBar เป็น navigation bar หลักของแอป ใช้ร่วมกับ Toolbar เพื่อจัดเรียง elements
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 AppBar Variants</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
            {appBarVariants.map((variant, index) => (
              <Card key={variant.variant}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textTransform: 'capitalize' }}>
                    {variant.variant}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {variant.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
                    เหมาะสำหรับ:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    {variant.usage}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'success.main' }}>
                      ✅ ข้อดี:
                    </Typography>
                    {variant.pros.map((pro, i) => (
                      <Typography key={i} variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                        • {pro}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'error.main' }}>
                      ⚠️ ข้อควรระวัง:
                    </Typography>
                    {variant.cons.map((con, i) => (
                      <Typography key={i} variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                        • {con}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>💻 AppBar ตัวอย่าง</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 Basic AppBar
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic AppBar
<AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      My App
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>`}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <AppBar position="static" sx={{ borderRadius: 1 }}>
                  <Toolbar>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      sx={{ mr: 2 }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      My App
                    </Typography>
                    <Button color="inherit">Login</Button>
                  </Toolbar>
                </AppBar>
              </Box>

              <Typography variant="h6" sx={{ mb: 2 }}>
                ⚡ AppBar with Icons & Menu
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// AppBar with Search & Profile
<AppBar position="static">
  <Toolbar>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Dashboard
    </Typography>
    <IconButton color="inherit">
      <Badge badgeContent={4} color="error">
        <Notifications />
      </Badge>
    </IconButton>
    <IconButton color="inherit" onClick={handleMenu}>
      <AccountCircle />
    </IconButton>
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  </Toolbar>
</AppBar>`}
                </Typography>
              </Box>

              <Box>
                <AppBar position="static" sx={{ borderRadius: 1 }}>
                  <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      Dashboard
                    </Typography>
                    <IconButton
                      size="large"
                      color="inherit"
                    >
                      <Search />
                    </IconButton>
                    <IconButton
                      size="large"
                      color="inherit"
                    >
                      <Badge badgeContent={4} color="error">
                        <Notifications />
                      </Badge>
                    </IconButton>
                    <IconButton
                      size="large"
                      edge="end"
                      color="inherit"
                      onClick={handleMenu}
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <Person sx={{ mr: 1 }} /> Profile
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Settings sx={{ mr: 1 }} /> Settings
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClose}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </Toolbar>
                </AppBar>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📱 Responsive AppBar
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                AppBar ที่ปรับตัวตามขนาดหน้าจอ:
              </Typography>

              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Responsive AppBar
<AppBar position="static">
  <Toolbar>
    <IconButton 
      edge="start" 
      color="inherit"
      sx={{ mr: 2, display: { sm: 'none' } }}
      onClick={handleDrawerToggle}
    >
      <MenuIcon />
    </IconButton>
    
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Responsive App
    </Typography>
    
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Button color="inherit">Home</Button>
      <Button color="inherit">About</Button>
      <Button color="inherit">Contact</Button>
    </Box>
  </Toolbar>
</AppBar>`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ sx prop กับ display เพื่อซ่อน/แสดง elements ตามขนาดจอ
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 2: Drawer & Menu */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>📂 Drawer & Menu</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Drawer และ Menu ช่วยจัดการ navigation และ actions ในพื้นที่จำกัด
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 Drawer Types</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
            {drawerTypes.map((drawer, index) => (
              <Card key={drawer.type}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', mr: 2 }}>
                      {drawer.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                      {drawer.type}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {drawer.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
                    เหมาะสำหรับ:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    {drawer.usage}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    💡 ตัวอย่าง:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {drawer.examples.map((example, i) => (
                      <Chip key={i} label={example} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Button variant="contained" onClick={() => setDrawerOpen(true)} sx={{ mb: 3 }}>
            ทดลองเปิด Drawer
          </Button>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box sx={{ width: 250 }} role="presentation">
              <List>
                <ListItem>
                  <ListItemIcon><Home /></ListItemIcon>
                  <ListItemText primary="หน้าหลัก" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Person /></ListItemIcon>
                  <ListItemText primary="โปรไฟล์" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Settings /></ListItemIcon>
                  <ListItemText primary="การตั้งค่า" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon><Mail /></ListItemIcon>
                  <ListItemText primary="ข้อความ" />
                  <Badge badgeContent={4} color="primary" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </TabPanel>

        {/* Tab 3: Tabs Navigation */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>📑 Tabs Navigation</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Tabs ช่วยจัดกลุ่มเนื้อหาและให้ผู้ใช้สลับระหว่างหมวดหมู่ได้ง่าย
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                💻 Simple Tabs
              </Typography>

              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabValue} onChange={handleTabValueChange}>
                    <Tab label="แดชบอร์ด" />
                    <Tab label="รายงาน" />
                    <Tab label="การตั้งค่า" />
                  </Tabs>
                </Box>
                <Box sx={{ p: 3 }}>
                  {tabValue === 0 && (
                    <Typography>
                      🏠 <strong>แดชบอร์ด:</strong> ภาพรวมของระบบและข้อมูลสำคัญ
                    </Typography>
                  )}
                  {tabValue === 1 && (
                    <Typography>
                      📊 <strong>รายงาน:</strong> สถิติและการวิเคราะห์ข้อมูล
                    </Typography>
                  )}
                  {tabValue === 2 && (
                    <Typography>
                      ⚙️ <strong>การตั้งค่า:</strong> จัดการการตั้งค่าระบบ
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 4: Breadcrumbs */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>🔗 Breadcrumbs</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Breadcrumbs แสดงเส้นทางปัจจุบันและช่วยให้ผู้ใช้รู้ว่าอยู่ที่ไหนในแอป
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🧭 Basic Breadcrumbs
              </Typography>

              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link href="/" style={{ textDecoration: 'none' }}>
                    หน้าหลัก
                  </Link>
                  <Link href="/products" style={{ textDecoration: 'none' }}>
                    สินค้า
                  </Link>
                  <Typography color="text.primary">
                    iPhone 15 Pro
                  </Typography>
                </Breadcrumbs>
              </Box>

              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Breadcrumbs 
                  separator={<NavigateNext fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  <Link 
                    href="/" 
                    style={{ 
                      textDecoration: 'none', 
                      display: 'flex', 
                      alignItems: 'center',
                      color: 'inherit'
                    }}
                  >
                    <Home sx={{ mr: 0.5, fontSize: 20 }} />
                    หน้าหลัก
                  </Link>
                  <Link 
                    href="/dashboard" 
                    style={{ 
                      textDecoration: 'none', 
                      display: 'flex', 
                      alignItems: 'center',
                      color: 'inherit'
                    }}
                  >
                    <Dashboard sx={{ mr: 0.5, fontSize: 20 }} />
                    แดชบอร์ด
                  </Link>
                  <Typography 
                    color="text.primary"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Person sx={{ mr: 0.5, fontSize: 20 }} />
                    โปรไฟล์
                  </Typography>
                </Breadcrumbs>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 5: Complete Layout */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🚀 Complete Layout</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            ตัวอย่าง Layout แอปที่สมบูรณ์รวม Navigation ทุกประเภท
          </Typography>

          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                📱 Dashboard Layout ตัวอย่าง
              </Typography>
              
              <Box sx={{ border: '2px solid', borderColor: 'grey.300', borderRadius: 2, overflow: 'hidden' }}>
                <AppBar position="static" sx={{ borderRadius: 0 }}>
                  <Toolbar>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      onClick={() => setMobileOpen(!mobileOpen)}
                      sx={{ mr: 2, display: { md: 'none' } }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      My Dashboard
                    </Typography>
                    <IconButton color="inherit">
                      <Badge badgeContent={3} color="error">
                        <Notifications />
                      </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                      <AccountCircle />
                    </IconButton>
                  </Toolbar>
                </AppBar>

                <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Breadcrumbs>
                    <Link href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                      <Home sx={{ mr: 0.5, fontSize: 16 }} />
                      หน้าหลัก
                    </Link>
                    <Typography color="text.primary">แดชบอร์ด</Typography>
                  </Breadcrumbs>
                </Box>

                <Box sx={{ px: 2 }}>
                  <Tabs value={0} variant="scrollable">
                    <Tab icon={<Dashboard />} label="ภาพรวม" iconPosition="start" />
                    <Tab icon={<BarChart />} label="วิเคราะห์" iconPosition="start" />
                    <Tab icon={<Settings />} label="ตั้งค่า" iconPosition="start" />
                  </Tabs>
                </Box>

                <Box sx={{ p: 3, minHeight: 200, bgcolor: 'background.default' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    📊 เนื้อหาหลัก
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    พื้นที่สำหรับแสดงเนื้อหาหลักของแอป เช่น ตาราง, กราф, ฟอร์ม ฯลฯ
                  </Typography>
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip label="สถิติรายวัน" color="primary" />
                    <Chip label="ผู้ใช้ออนไลน์: 1,234" color="success" />
                    <Chip label="ยอดขาย: ฿45,678" color="warning" />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/mui-tutorial/lesson-5"
            variant="outlined"
          >
            บทที่ 5: Forms และ Inputs
          </Button>
          
          <Chip 
            label="6 / 8"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/mui-tutorial/lesson-7"
            variant="contained"
          >
            บทที่ 7: Data Display
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 