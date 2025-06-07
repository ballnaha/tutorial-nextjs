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
  Grid,
  useTheme,
  useMediaQuery,
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
  Logout,
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

// Working Layout Demo Component
function WorkingLayoutDemo() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [demoDrawerOpen, setDemoDrawerOpen] = useState(false);
  const [demoTabValue, setDemoTabValue] = useState(0);
  const [demoAnchorEl, setDemoAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [contentTabValue, setContentTabValue] = useState(0);

  const handleDemoDrawerToggle = () => setDemoDrawerOpen(!demoDrawerOpen);
  const handleDemoTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setDemoTabValue(newValue);
  };
  const handleDemoMenu = (event: React.MouseEvent<HTMLElement>) => {
    setDemoAnchorEl(event.currentTarget);
  };
  const handleDemoCloseMenu = () => setDemoAnchorEl(null);
  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
    setDemoDrawerOpen(false);
    setContentTabValue(0); // รีเซ็ต tab เมื่อเปลี่ยนเมนู
  };
  const handleContentTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setContentTabValue(newValue);
  };

  const drawerWidth = 240;

  const menuItems = [
    { 
      text: 'หน้าหลัก', 
      icon: <Home />, 
      content: 'dashboard',
      description: 'ภาพรวมและสถิติทั่วไป'
    },
    { 
      text: 'ผู้ใช้งาน', 
      icon: <Person />, 
      content: 'users',
      description: 'จัดการข้อมูลผู้ใช้งาน'
    },
    { 
      text: 'รายงาน', 
      icon: <BarChart />, 
      content: 'reports',
      description: 'สถิติและการวิเคราะห์'
    },
    { 
      text: 'การตั้งค่า', 
      icon: <Settings />, 
      content: 'settings',
      description: 'ตั้งค่าระบบ'
    },
    { 
      text: 'ข้อความ', 
      icon: <Mail />, 
      content: 'messages',
      description: 'จัดการข้อความ',
      badge: 5
    }
  ];

  const demoDrawer = (
    <Box sx={{ width: drawerWidth }} role="presentation">

      <List>
        {menuItems.map((item, index) => (
          <ListItemButton 
            key={item.text}
            selected={selectedMenu === index}
            onClick={() => handleMenuClick(index)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: selectedMenu === index ? 'primary.contrastText' : 'inherit',
              minWidth: 40 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              secondary={selectedMenu === index ? item.description : undefined}
              sx={{ 
                color: selectedMenu === index ? 'primary.contrastText' : 'inherit',
                '& .MuiListItemText-secondary': {
                  color: selectedMenu === index ? 'white' : 'text.secondary',
                  fontSize: '0.75rem'
                }
              }}
            />
            {item.badge && (
              <Badge badgeContent={item.badge} color="error" sx={{ mr: 1 }} />
            )}
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary">
          เวอร์ชัน 1.0.0
        </Typography>
      </Box>
    </Box>
  );

  const renderSelectedContent = () => {
    const selectedItem = menuItems[selectedMenu];
    
    switch (selectedItem.content) {
      case 'dashboard':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Home color="primary" />
              หน้าหลัก - Dashboard
            </Typography>
            
            {/* Dashboard Tabs */}
            <Box sx={{ width: '100%', mb: 3 }}>
              <Tabs 
                value={contentTabValue} 
                onChange={handleContentTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab 
                  label="📈 ภาพรวม" 
                  icon={<Dashboard />}
                  iconPosition="start"
                />
                <Tab 
                  label="📊 สถิติ" 
                  icon={<BarChart />}
                  iconPosition="start"
                />
                <Tab 
                  label="🕒 กิจกรรม" 
                  icon={<Notifications />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            {/* Tab Content */}
            {contentTabValue === 0 && (
              <Box>
                {/* Tab 1: ภาพรวม - Original Dashboard Content */}
                <Typography variant="h6" sx={{ mb: 2 }}>📈 สถิติด่วน</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
                  <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                        <Box>
                          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                            1,234
                          </Typography>
                          <Typography variant="body2">
                            ผู้ใช้ทั้งหมด
                          </Typography>
                        </Box>
                        <Person sx={{ fontSize: 40, opacity: 0.8 }} />
                      </Box>
                    </CardContent>
                  </Card>
                  
                  <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                        <Box>
                          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                            ฿89.5K
                          </Typography>
                          <Typography variant="body2">
                            ยอดขาย
                          </Typography>
                        </Box>
                        <BarChart sx={{ fontSize: 40, opacity: 0.8 }} />
                      </Box>
                    </CardContent>
                  </Card>
                  
                  <Card sx={{ background: 'linear-gradient(45deg, #FF9800 30%, #FFC107 90%)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                        <Box>
                          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                            567
                          </Typography>
                          <Typography variant="body2">
                            คำสั่งซื้อ
                          </Typography>
                        </Box>
                        <ShoppingCart sx={{ fontSize: 40, opacity: 0.8 }} />
                      </Box>
                    </CardContent>
                  </Card>
                  
                  <Card sx={{ background: 'linear-gradient(45deg, #9C27B0 30%, #E91E63 90%)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                        <Box>
                          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                            98.2%
                          </Typography>
                          <Typography variant="body2">
                            ความพึงพอใจ
                          </Typography>
                        </Box>
                        <StarBorder sx={{ fontSize: 40, opacity: 0.8 }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            )}

            {/* Tab 2: สถิติ */}
            {contentTabValue === 1 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>📊 สถิติเชิงลึก</Typography>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>📈 การเติบโตรายเดือน</Typography>
                      <Box sx={{ height: 200, bgcolor: 'primary.light', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h4" color="white">+25%</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        เพิ่มขึ้นจากเดือนที่แล้ว
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>👥 ผู้ใช้ใหม่รายวัน</Typography>
                      <Box sx={{ height: 200, bgcolor: 'success.light', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h4" color="white">+67</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        ค่าเฉลี่ยต่อวัน
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>

                {/* Additional Statistics */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>📊 สถิติรายละเอียด</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                      {[
                        { label: 'อัตราการเข้าชม', value: '85.2%', color: 'success' },
                        { label: 'เวลาเฉลี่ย', value: '3:45 นาที', color: 'info' },
                        { label: 'อัตราการกลับมา', value: '72.8%', color: 'warning' }
                      ].map((stat, index) => (
                        <Paper key={index} sx={{ p: 2, textAlign: 'center' }}>
                          <Typography variant="h6" color={`${stat.color}.main`}>
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {stat.label}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Tab 3: กิจกรรม */}
            {contentTabValue === 2 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3 }}>🕒 กิจกรรมล่าสุด</Typography>
                
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {[
                        { action: 'ผู้ใช้ใหม่ลงทะเบียน', user: 'user@example.com', time: '2 นาทีที่แล้ว', type: 'success' },
                        { action: 'ออเดอร์ใหม่', user: 'Order #12345', time: '5 นาทีที่แล้ว', type: 'info' },
                        { action: 'ระบบสำรองข้อมูล', user: 'System', time: '10 นาทีที่แล้ว', type: 'warning' },
                        { action: 'อัปเดตระบบ', user: 'Admin', time: '15 นาทีที่แล้ว', type: 'error' },
                        { action: 'การชำระเงินสำเร็จ', user: 'Payment #9876', time: '20 นาทีที่แล้ว', type: 'success' },
                        { action: 'ข้อความใหม่', user: 'Support Team', time: '25 นาทีที่แล้ว', type: 'info' }
                      ].map((activity, index) => (
                        <Paper key={index} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: `${activity.type}.main` }}>
                            {activity.type === 'success' && <CheckCircle />}
                            {activity.type === 'info' && <ShoppingCart />}
                            {activity.type === 'warning' && <Settings />}
                            {activity.type === 'error' && <Dashboard />}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {activity.action}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {activity.user} • {activity.time}
                            </Typography>
                          </Box>
                          <Chip 
                            label={activity.type} 
                            color={activity.type as any}
                            size="small"
                            variant="outlined"
                          />
                        </Paper>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        );

      case 'users':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person color="primary" />
              จัดการผู้ใช้งาน
            </Typography>
            
            {/* Users Tabs */}
            <Box sx={{ width: '100%', mb: 3 }}>
              <Tabs 
                value={contentTabValue} 
                onChange={handleContentTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="📋 รายการ" />
                <Tab label="➕ เพิ่มใหม่" />
                <Tab label="⚙️ การจัดการ" />
              </Tabs>
            </Box>

            {/* Users Tab Content */}
            {contentTabValue === 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>รายการผู้ใช้งาน</Typography>
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    {[
                      { name: 'สมชาย ใจดี', email: 'somchai@email.com', role: 'Admin', status: 'active' },
                      { name: 'สมหญิง รักดี', email: 'somying@email.com', role: 'User', status: 'active' },
                      { name: 'นายทดสอบ ระบบ', email: 'test@email.com', role: 'User', status: 'inactive' }
                    ].map((user, index) => (
                      <Paper key={index} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {user.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Chip 
                            label={user.role} 
                            color={user.role === 'Admin' ? 'secondary' : 'default'}
                            size="small"
                          />
                          <Chip 
                            label={user.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'} 
                            color={user.status === 'active' ? 'success' : 'default'}
                            size="small"
                          />
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}

            {contentTabValue === 1 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>เพิ่มผู้ใช้ใหม่</Typography>
                  <Typography variant="body2" color="text.secondary">
                    📝 ฟอร์มสำหรับเพิ่มผู้ใช้ใหม่จะอยู่ที่นี่
                  </Typography>
                </CardContent>
              </Card>
            )}

            {contentTabValue === 2 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>การจัดการผู้ใช้</Typography>
                  <Typography variant="body2" color="text.secondary">
                    🔧 เครื่องมือจัดการผู้ใช้จะอยู่ที่นี่
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        );

      case 'reports':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <BarChart color="primary" />
              รายงานและสถิติ
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>📈 ยอดขายรายวัน</Typography>
                  <Box sx={{ 
                    height: 150, 
                    bgcolor: 'primary.light', 
                    borderRadius: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Typography variant="h4">฿ 12,345</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    วันนี้เพิ่มขึ้น 15% จากเมื่อวาน
                  </Typography>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>👥 ผู้ใช้ใหม่</Typography>
                  <Box sx={{ 
                    height: 150, 
                    bgcolor: 'success.light', 
                    borderRadius: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Typography variant="h4">+42</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    ผู้ใช้ใหม่ในสัปดาห์นี้
                  </Typography>
                </CardContent>
              </Card>
              
              <Card sx={{ gridColumn: { md: '1 / -1' } }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>🔥 สินค้ายอดนิยม</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {[
                      { name: 'iPhone 15 Pro', sales: 156 },
                      { name: 'MacBook Air M2', sales: 89 },
                      { name: 'AirPods Pro', sales: 234 }
                    ].map((product, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                        <Typography>{product.name}</Typography>
                        <Chip label={`${product.sales} ชิ้น`} color="primary" size="small" />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        );

      case 'messages':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Mail color="primary" />
              ข้อความ
            </Typography>
            
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">กล่องข้อความ</Typography>
                  <Badge badgeContent={5} color="error">
                    <Mail />
                  </Badge>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { 
                      from: 'ลูกค้า A', 
                      subject: 'สอบถามสินค้า iPhone 15', 
                      time: '10:30',
                      unread: true 
                    },
                    { 
                      from: 'ลูกค้า B', 
                      subject: 'ต้องการยกเลิกออเดอร์', 
                      time: '09:15',
                      unread: true 
                    },
                    { 
                      from: 'ซัพพอร์ต', 
                      subject: 'รายงานประจำวัน', 
                      time: 'เมื่อวาน',
                      unread: false 
                    }
                  ].map((message, index) => (
                    <Paper 
                      key={index} 
                      sx={{ 
                        p: 2, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        bgcolor: message.unread ? 'primary.light' : 'background.paper',
                        color: message.unread ? 'primary.contrastText' : 'text.primary'
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: message.unread ? 600 : 400 }}>
                          {message.subject}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          จาก: {message.from}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption">{message.time}</Typography>
                        {message.unread && (
                          <Box sx={{ mt: 0.5 }}>
                            <Chip label="ใหม่" size="small" color="error" />
                          </Box>
                        )}
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        );

      case 'settings':
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Settings color="primary" />
              การตั้งค่าระบบ
            </Typography>
            
            <Box sx={{ display: 'grid', gap: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>🔔 การแจ้งเตือน</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="แจ้งเตือนทางอีเมล"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="แจ้งเตือนข้อความใหม่"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="แจ้งเตือนรายงานประจำวัน"
                    />
                  </Box>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>👤 ข้อมูลโปรไฟล์</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
                      A
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Admin User</Typography>
                      <Typography variant="body2" color="text.secondary">
                        admin@myapp.com
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="outlined" startIcon={<Person />}>
                    แก้ไขโปรไฟล์
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>🔒 ความปลอดภัย</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="outlined" fullWidth>
                      เปลี่ยนรหัสผ่าน
                    </Button>
                    <Button variant="outlined" fullWidth>
                      การเข้าสู่ระบบแบบ 2 ขั้นตอน
                    </Button>
                    <Button variant="outlined" fullWidth color="error">
                      ออกจากระบบทุกอุปกรณ์
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        );

      default:
        return (
          <Box>
            <Typography variant="h5">เลือกเมนูเพื่อดูเนื้อหา</Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ border: '2px solid', borderColor: 'grey.300', borderRadius: 2, overflow: 'hidden', height: 700 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Compact AppBar Header */}
        <AppBar position="static" sx={{ borderRadius: 0, flexShrink: 0 }}>
          <Toolbar sx={{ minHeight: 56 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDemoDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              📊 MyApp Dashboard
            </Typography>
            
            <IconButton color="inherit" size="small">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <IconButton color="inherit" size="small" onClick={handleDemoMenu}>
              <AccountCircle />
            </IconButton>
            
            <Menu anchorEl={demoAnchorEl} open={Boolean(demoAnchorEl)} onClose={handleDemoCloseMenu}>
              <MenuItem onClick={handleDemoCloseMenu}>
                <Person sx={{ mr: 1 }} /> โปรไฟล์
              </MenuItem>
              <MenuItem onClick={handleDemoCloseMenu}>
                <Settings sx={{ mr: 1 }} /> ตั้งค่า
              </MenuItem>
              <MenuItem onClick={handleDemoCloseMenu}>
                <Logout sx={{ mr: 1 }} /> ออกจากระบบ
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Main Layout Area */}
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Drawer for Desktop */}
          <Box sx={{ display: { xs: 'none', sm: 'block' }, width: drawerWidth, flexShrink: 0 }}>
            <Box sx={{ width: drawerWidth, height: '100%', borderRight: '1px solid', borderColor: 'divider', overflow: 'auto' }}>
              {demoDrawer}
            </Box>
          </Box>

          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={demoDrawerOpen}
            onClose={handleDemoDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {demoDrawer}
          </Drawer>

          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', height: '100%' }}>
            <Box sx={{ p: 3 }}>
              {/* Enhanced Breadcrumbs */}
              <Breadcrumbs 
                sx={{ mb: 3 }}
                separator={<NavigateNext fontSize="small" />}
              >
                <Typography 
                  color="inherit"
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <Home sx={{ fontSize: 16 }} />
                  หน้าหลัก
                </Typography>
                <Typography 
                  color="text.primary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}
                >
                  {menuItems[selectedMenu].icon}
                  {menuItems[selectedMenu].text}
                </Typography>
                {contentTabValue > 0 && (
                  <Typography color="text.secondary">
                    {(() => {
                      const tabLabels = {
                        0: ['ภาพรวม', 'สถิติ', 'กิจกรรม'], // Dashboard
                        1: ['รายการ', 'เพิ่มใหม่', 'การจัดการ'], // Users
                        2: ['ยอดขาย', 'ผู้ใช้', 'สินค้า'], // Reports
                        3: ['ข้อความ', 'ส่ง', 'ประวัติ'], // Messages
                        4: ['ทั่วไป', 'ความปลอดภัย', 'แจ้งเตือน'] // Settings
                      };
                      return tabLabels[selectedMenu as keyof typeof tabLabels]?.[contentTabValue] || '';
                    })()}
                  </Typography>
                )}
              </Breadcrumbs>
              
              {/* Dynamic Content Based on Selected Menu */}
              {renderSelectedContent()}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function MUILesson6Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

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
        </TabPanel>

        {/* Tab 2: Drawer & Menu */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>📂 Drawer & Menu</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Drawer เป็น sidebar ที่ใช้เก็บเมนูหรือเนื้อหาเพิ่มเติม ส่วน Menu เป็น dropdown ที่ใช้แสดงรายการเมนู
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 Drawer Types</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
            {drawerTypes.map((type, index) => (
              <Card key={type.type}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textTransform: 'capitalize' }}>
                    {type.type}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {type.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
                    เหมาะสำหรับ:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    {type.usage}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'success.main' }}>
                      🌟 ตัวอย่าง:
                    </Typography>
                    {type.examples.map((example, i) => (
                      <Typography key={i} variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                        • {example}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      📌 ไอคอน:
                    </Typography>
                    {type.icon}
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
            Tabs เป็นการนำทางแบบแท็บที่ใช้ในการแสดงหน้าหลายหน้าในพื้นที่เดียวกัน
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📑 Basic Tabs
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
            Breadcrumbs เป็นการแสดงเส้นทางปัจจุบันของผู้ใช้ในแอป
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔗 Basic Breadcrumbs
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
            ตัวอย่าง Layout แอปที่สมบูรณ์รวม Navigation ทุกประเภท <strong>ที่ใช้งานได้จริง!</strong>
          </Typography>

          {/* Working Demo */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                📱 Interactive Dashboard Demo
              </Typography>
              
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  ✨ <strong>Demo ใช้งานได้จริง:</strong> คลิกเมนูซ้าย ➜ เลือก Tab ในเนื้อหา ➜ ดู Breadcrumbs เปลี่ยน!
                  <br />
                  🎯 <strong>รวมทุกสิ่ง:</strong> AppBar + Drawer + Tabs + Breadcrumbs ในตัวอย่างเดียว
                </Typography>
              </Alert>
              
              <WorkingLayoutDemo />
              
              {/* Show Code Section */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  💻 Source Code
                  <Chip label="Copy & Paste ได้เลย!" color="success" size="small" />
                </Typography>
                
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    📝 <strong>วิธีใช้:</strong> Copy code ด้านล่างไปใช้ในโปรเจ็กต์ของคุณได้เลย!
                  </Typography>
                </Alert>

                <Paper 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'grey.900', 
                    color: 'grey.100', 
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    overflow: 'auto',
                    maxHeight: 400,
                    border: '1px solid',
                    borderColor: 'grey.300'
                  }}
                >
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`// Complete Navigation Layout Demo
import {
  Box, AppBar, Toolbar, Typography, IconButton, 
  Drawer, List, ListItemButton, ListItemIcon, 
  ListItemText, Tabs, Tab, Breadcrumbs, Badge,
  Menu, MenuItem, Card, CardContent, Paper,
  Avatar, Chip, useTheme, useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon, Home, Person, Settings, 
  BarChart, Mail, Notifications, AccountCircle,
  NavigateNext, Dashboard, CheckCircle, ShoppingCart
} from '@mui/icons-material';
import { useState } from 'react';

function NavigationDemo() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [contentTabValue, setContentTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { 
      text: 'หน้าหลัก', 
      icon: <Home />, 
      content: 'dashboard',
      description: 'ภาพรวมและสถิติทั่วไป'
    },
    { 
      text: 'ผู้ใช้งาน', 
      icon: <Person />, 
      content: 'users',
      description: 'จัดการข้อมูลผู้ใช้งาน'
    },
    { 
      text: 'รายงาน', 
      icon: <BarChart />, 
      content: 'reports',
      description: 'สถิติและการวิเคราะห์'
    }
  ];

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setDrawerOpen(false);
    setContentTabValue(0);
  };

  const renderContent = () => {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          📊 Dashboard
        </Typography>
        
        {/* Tabs Navigation */}
        <Tabs 
          value={contentTabValue} 
          onChange={(e, newValue) => setContentTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
        >
          <Tab label="📈 ภาพรวม" />
          <Tab label="📊 สถิติ" />
          <Tab label="🕒 กิจกรรม" />
        </Tabs>

        {/* Tab Content */}
        {contentTabValue === 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6">สถิติด่วน</Typography>
              <Typography>ข้อมูลภาพรวมของระบบ</Typography>
            </CardContent>
          </Card>
        )}
        
        {contentTabValue === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6">สถิติเชิงลึก</Typography>
              <Typography>การวิเคราะห์ข้อมูลรายละเอียด</Typography>
            </CardContent>
          </Card>
        )}
        
        {contentTabValue === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6">กิจกรรมล่าสุด</Typography>
              <Typography>รายการกิจกรรมในระบบ</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ height: 600, border: '1px solid', borderColor: 'grey.300' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* AppBar */}
        <AppBar position="static">
          <Toolbar>
            <IconButton 
              color="inherit" 
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              📊 MyApp Dashboard
            </Typography>
            
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <IconButton 
              color="inherit" 
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <AccountCircle />
            </IconButton>
            
            <Menu 
              anchorEl={anchorEl} 
              open={Boolean(anchorEl)} 
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem>โปรไฟล์</MenuItem>
              <MenuItem>ตั้งค่า</MenuItem>
              <MenuItem>ออกจากระบบ</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Main Layout */}
        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Desktop Drawer */}
          <Box sx={{ display: { xs: 'none', sm: 'block' }, width: 240 }}>
            <List>
              {menuItems.map((item, index) => (
                <ListItemButton
                  key={item.text}
                  selected={selectedMenu === index}
                  onClick={() => handleMenuClick(index)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    secondary={selectedMenu === index ? item.description : undefined}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>

          {/* Mobile Drawer */}
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <List sx={{ width: 240 }}>
              {menuItems.map((item, index) => (
                <ListItemButton
                  key={item.text}
                  onClick={() => handleMenuClick(index)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
          </Drawer>

          {/* Main Content */}
          <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 3 }}>
              <Typography color="inherit">หน้าหลัก</Typography>
              <Typography color="text.primary">
                {menuItems[selectedMenu].text}
              </Typography>
              {contentTabValue > 0 && (
                <Typography color="text.secondary">
                  {['ภาพรวม', 'สถิติ', 'กิจกรรม'][contentTabValue]}
                </Typography>
              )}
            </Breadcrumbs>
            
            {/* Dynamic Content */}
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NavigationDemo;`}
                  </pre>
                </Paper>

                <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    💡 <strong>Tips สำหรับการใช้งาน:</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    • ปรับแต่ง <code>menuItems</code> ตามเมนูที่ต้องการ<br />
                    • เพิ่ม Tab ได้ในส่วน <code>Tabs</code> component<br />
                    • ปรับ responsive ได้ที่ <code>sx</code> properties<br />
                    • เปลี่ยนสีและ theme ได้ตาม MUI theme
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Features Highlight */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>
                ⭐ ฟีเจอร์ที่มีใน Demo
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
                    ✅ Navigation Features:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                      <ListItemText primary="Responsive AppBar" secondary="ปรับตัวตามขนาดหน้าจอ" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                      <ListItemText primary="Interactive Sidebar" secondary="เมนูแบบ vertical ที่คลิกได้" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                      <ListItemText primary="Tab Navigation" secondary="แท็บในแต่ละหน้าเนื้อหา" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                      <ListItemText primary="Dynamic Breadcrumbs" secondary="แสดงตำแหน่งปัจจุบันและ Tab" />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                      <ListItemText primary="Mobile Drawer" secondary="เมนูแบบ slide-out สำหรับมือถือ" />
                    </ListItem>
                  </List>
                </Box>
                
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
                    🎯 Content Pages:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary="📊 Dashboard" 
                        secondary="ภาพรวม | สถิติ | กิจกรรม (3 tabs)" 
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary="👥 User Management" 
                        secondary="รายการ | เพิ่มใหม่ | การจัดการ (3 tabs)" 
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary="📈 Reports" 
                        secondary="ยอดขาย | ผู้ใช้ | สินค้า (3 tabs)" 
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary="💬 Messages" 
                        secondary="ข้อความ | ส่ง | ประวัติ (3 tabs)" 
                      />
                    </ListItem>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary="⚙️ Settings" 
                        secondary="ทั่วไป | ความปลอดภัย | แจ้งเตือน (3 tabs)" 
                      />
                    </ListItem>
                  </List>
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