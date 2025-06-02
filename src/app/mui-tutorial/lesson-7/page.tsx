'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Chip,
  Badge,
  Avatar,
  Divider,
  IconButton,
  Stack,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  TableChart,
  List as ListIcon,
  ViewModule,
  LocalOffer,
  Person,
  Email,
  Phone,
  Edit,
  Delete,
  Favorite,
  Share,
  Notifications,
  ShoppingCart,
  Star,
  LocationOn,
  WorkOutline,
  CalendarToday,
  TrendingUp,
  Visibility,
  Download,
  MoreVert,
  PlayArrow,
  Lightbulb,
  Assignment,
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

// Sample data
const tableData = [
  { id: 1, name: 'สมชาย ใจดี', email: 'somchai@email.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'สมหญิง รักเรียน', email: 'somying@email.com', role: 'User', status: 'active' },
  { id: 3, name: 'วิทยา สมาร์ท', email: 'witaya@email.com', role: 'Manager', status: 'inactive' },
  { id: 4, name: 'ประกาย ขยัน', email: 'prakkai@email.com', role: 'User', status: 'active' },
  { id: 5, name: 'มานพ อุตสาห์', email: 'manop@email.com', role: 'Admin', status: 'pending' },
];

const cardData = [
  {
    id: 1,
    title: 'iPhone 15 Pro',
    description: 'สมาร์ทโฟนรุ่นล่าสุดจาก Apple พร้อมชิป A17 Pro',
    price: '42,900',
    category: 'โทรศัพท์',
    rating: 4.8,
    reviews: 245
  },
  {
    id: 2,
    title: 'MacBook Air M2',
    description: 'แล็ปท็อปที่บางเบาและทรงพลังที่สุดจาก Apple',
    price: '39,900',
    category: 'คอมพิวเตอร์',
    rating: 4.9,
    reviews: 189
  },
  {
    id: 3,
    title: 'iPad Pro 12.9"',
    description: 'แท็บเล็ตสำหรับมืออาชีพพร้อมหน้าจอ Liquid Retina',
    price: '35,900',
    category: 'แท็บเล็ต',
    rating: 4.7,
    reviews: 156
  }
];

export default function MUILesson7Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ใช้งาน';
      case 'inactive': return 'ไม่ใช้งาน';
      case 'pending': return 'รอดำเนินการ';
      default: return status;
    }
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
            <TableChart color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 7: Data Display Components
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การแสดงข้อมูลอย่างมีประสิทธิภาพด้วย MUI สำหรับมือใหม่! 📊
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<TableChart />} label="Table" color="primary" />
            <Chip icon={<ListIcon />} label="List" color="secondary" />
            <Chip icon={<ViewModule />} label="Card" color="success" />
            <Chip icon={<LocalOffer />} label="Chip & Badge" color="warning" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> สร้างการแสดงข้อมูลที่สวยงามและใช้งานง่าย
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 45 นาที | 
              📊 <strong>ระดับ:</strong> ปานกลาง
            </Typography>
          </Alert>

          {/* Why Data Display Matters */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'success.50', border: '2px solid', borderColor: 'success.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="success" /> 💡 ทำไม Data Display ถึงสำคัญ?
            </Typography>
            
            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'success.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 📈 <strong>Data Visualization:</strong> ทำให้ข้อมูลเข้าใจง่ายและสื่อความหมายชัดเจน
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 👀 <strong>User Experience:</strong> ผู้ใช้หาข้อมูลที่ต้องการได้รวดเร็ว
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 📱 <strong>Responsive Display:</strong> แสดงข้อมูลได้ดีในทุกขนาดหน้าจอ
              </Typography>
              <Typography variant="body2">
                • ⚡ <strong>Performance:</strong> จัดการข้อมูลจำนวนมากได้อย่างมีประสิทธิภาพ
              </Typography>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> ข้อมูลที่แสดงผลดีช่วยให้ผู้ใช้ตัดสินใจได้เร็วและถูกต้องขึ้น!
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
                    primary="สร้าง Table ที่มีประสิทธิภาพ" 
                    secondary="pagination, sorting, filtering"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ใช้ List แบบต่างๆ" 
                    secondary="simple list, nested list, interactive list"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ออกแบบ Card ที่สวยงาม" 
                    secondary="product card, profile card, dashboard card"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ใช้ Chip และ Badge อย่างมืออาชีพ" 
                    secondary="tags, status, notifications"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="จัดการข้อมูลจำนวนมาก" 
                    secondary="pagination, infinite scroll, virtualization"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Responsive Data Display" 
                    secondary="ปรับแสดงผลตามขนาดหน้าจอ"
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
              label="📊 Table Components" 
              icon={<TableChart />}
              iconPosition="start"
            />
            <Tab 
              label="📋 List Components" 
              icon={<ListIcon />}
              iconPosition="start"
            />
            <Tab 
              label="🃏 Card Components" 
              icon={<ViewModule />}
              iconPosition="start"
            />
            <Tab 
              label="🏷️ Chip & Badge" 
              icon={<LocalOffer />}
              iconPosition="start"
            />
            <Tab 
              label="🚀 Complete Display" 
              icon={<PlayArrow />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: Table Components */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>📊 Table Components</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Table เป็น component สำหรับแสดงข้อมูลในรูปแบบตารางที่เป็นระเบียบ
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                👥 ตาราง User Management
              </Typography>
              
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.100' }}>
                      <TableCell><strong>ID</strong></TableCell>
                      <TableCell><strong>ชื่อ</strong></TableCell>
                      <TableCell><strong>อีเมล</strong></TableCell>
                      <TableCell><strong>บทบาท</strong></TableCell>
                      <TableCell><strong>สถานะ</strong></TableCell>
                      <TableCell align="center"><strong>จัดการ</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          <Chip 
                            label={row.role} 
                            size="small"
                            color={row.role === 'Admin' ? 'error' : row.role === 'Manager' ? 'warning' : 'default'}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={getStatusText(row.status)}
                            size="small"
                            color={getStatusColor(row.status) as any}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton size="small" color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Delete fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={tableData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage="แถวต่อหน้า:"
                labelDisplayedRows={({ from, to, count }) => 
                  `${from}–${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`
                }
              />
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>💻 Code Example</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 Table with Pagination
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Table with Pagination
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow sx={{ bgcolor: 'grey.100' }}>
        <TableCell><strong>ID</strong></TableCell>
        <TableCell><strong>ชื่อ</strong></TableCell>
        <TableCell><strong>อีเมล</strong></TableCell>
        <TableCell><strong>สถานะ</strong></TableCell>
        <TableCell align="center"><strong>จัดการ</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
        <TableRow key={row.id} hover>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>
            <Chip 
              label={row.status}
              color={getStatusColor(row.status)}
            />
          </TableCell>
          <TableCell align="center">
            <IconButton size="small" color="primary">
              <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error">
              <Delete fontSize="small" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

<TablePagination
  component="div"
  count={data.length}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  rowsPerPageOptions={[5, 10, 25]}
  labelRowsPerPage="แถวต่อหน้า:"
/>`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ hover effect และ Chip สำหรับแสดงสถานะให้ชัดเจน
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 2: List Components */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>📋 List Components</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            List component เหมาะสำหรับแสดงข้อมูลเป็นรายการที่อ่านง่าย
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  👤 Contact List
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="สมชาย ใจดี"
                      secondary="somchai@email.com"
                    />
                    <IconButton edge="end">
                      <Phone />
                    </IconButton>
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary="สมหญิง รักเรียน"
                      secondary="somying@email.com"
                    />
                    <IconButton edge="end">
                      <Email />
                    </IconButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  📱 Menu List
                </Typography>
                
                <List component="nav">
                  <ListItemButton>
                    <ListItemIcon>
                      <TrendingUp />
                    </ListItemIcon>
                    <ListItemText primary="แดชบอร์ด" />
                  </ListItemButton>
                  
                  <ListItemButton>
                    <ListItemIcon>
                      <ShoppingCart />
                    </ListItemIcon>
                    <ListItemText primary="คำสั่งซื้อ" />
                    <Chip label="12" size="small" color="primary" />
                  </ListItemButton>
                </List>
              </CardContent>
            </Card>
          </Box>

          <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>💻 Code Example</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 Contact List with Avatar
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Contact List
<List>
  <ListItem>
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: 'primary.main' }}>
        <Person />
      </Avatar>
    </ListItemAvatar>
    <ListItemText 
      primary="สมชาย ใจดี"
      secondary="somchai@email.com"
    />
    <IconButton edge="end">
      <Phone />
    </IconButton>
  </ListItem>
  <Divider />
  
  <ListItem>
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: 'secondary.main' }}>
        <Person />
      </Avatar>
    </ListItemAvatar>
    <ListItemText 
      primary="สมหญิง รักเรียน"
      secondary="somying@email.com"
    />
    <IconButton edge="end">
      <Email />
    </IconButton>
  </ListItem>
</List>

// Navigation List
<List component="nav">
  <ListItemButton>
    <ListItemIcon>
      <TrendingUp />
    </ListItemIcon>
    <ListItemText primary="แดชบอร์ด" />
  </ListItemButton>
  
  <ListItemButton>
    <ListItemIcon>
      <ShoppingCart />
    </ListItemIcon>
    <ListItemText primary="คำสั่งซื้อ" />
    <Chip label="12" size="small" color="primary" />
  </ListItemButton>
</List>`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ ListItemButton สำหรับรายการที่คลิกได้ และ Divider เพื่อแยกรายการ
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 3: Card Components */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>🃏 Card Components</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Card เป็น component ที่ยืดหยุ่นสำหรับแสดงข้อมูลในรูปแบบการ์ด
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {cardData.map((product) => (
              <Card key={product.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    height: 200,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    📸 {product.title}
                  </Typography>
                  <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Favorite 
                      color={favorites.includes(product.id) ? 'error' : 'disabled'} 
                    />
                  </IconButton>
                </Box>
                
                <CardContent sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip label={product.category} size="small" color="primary" variant="outlined" />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Star color="warning" sx={{ fontSize: 16 }} />
                      <Typography variant="body2">
                        {product.rating} ({product.reviews})
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {product.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                  
                  <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
                    ฿{product.price}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button variant="contained" fullWidth startIcon={<ShoppingCart />}>
                    เพิ่มลงตะกร้า
                  </Button>
                  <IconButton>
                    <Share />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>

          <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>💻 Code Example</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 Product Card
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Product Card
<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
  <Box
    sx={{
      height: 200,
      bgcolor: 'grey.200',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}
  >
    <Typography variant="body2" color="text.secondary">
      📸 Product Image
    </Typography>
    <IconButton
      sx={{ position: 'absolute', top: 8, right: 8 }}
      onClick={() => toggleFavorite(id)}
    >
      <Favorite color={isFavorite ? 'error' : 'disabled'} />
    </IconButton>
  </Box>
  
  <CardContent sx={{ flex: 1 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Chip label="หมวดหมู่" size="small" color="primary" variant="outlined" />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Star color="warning" sx={{ fontSize: 16 }} />
        <Typography variant="body2">4.8 (245)</Typography>
      </Box>
    </Box>
    
    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
      ชื่อสินค้า
    </Typography>
    
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      คำอธิบายสินค้า
    </Typography>
    
    <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
      ฿1,299
    </Typography>
  </CardContent>
  
  <CardActions sx={{ p: 2, pt: 0 }}>
    <Button variant="contained" fullWidth startIcon={<ShoppingCart />}>
      เพิ่มลงตะกร้า
    </Button>
    <IconButton>
      <Share />
    </IconButton>
  </CardActions>
</Card>`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ flex layout เพื่อให้ Card มีความสูงเท่ากัน และ CardActions อยู่ด้านล่าง
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 4: Chip & Badge */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>🏷️ Chip & Badge</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Chip และ Badge ช่วยแสดงป้ายกำกับและการแจ้งเตือนอย่างกะทัดรัด
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 Chip Styles
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Basic Chips:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip label="Primary" color="primary" />
                    <Chip label="Secondary" color="secondary" />
                    <Chip label="Success" color="success" />
                    <Chip label="Error" color="error" />
                    <Chip label="Warning" color="warning" />
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Chips with Icons:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip icon={<Person />} label="ผู้ใช้" />
                    <Chip icon={<Email />} label="อีเมล" color="primary" />
                    <Chip icon={<Phone />} label="โทรศัพท์" color="secondary" />
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔢 Badge Examples
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4, textAlign: 'center' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    การแจ้งเตือน
                  </Typography>
                  <Badge badgeContent={4} color="error">
                    <Notifications />
                  </Badge>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    ตะกร้าสินค้า
                  </Typography>
                  <Badge badgeContent={12} color="primary">
                    <ShoppingCart />
                  </Badge>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    ข้อความใหม่
                  </Typography>
                  <Badge badgeContent={99} color="secondary">
                    <Email />
                  </Badge>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    ออนไลน์
                  </Typography>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color="success"
                  >
                    <Avatar>U</Avatar>
                  </Badge>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>💻 Code Example</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 Chip & Badge Implementation
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic Chips
<Chip label="Primary" color="primary" />
<Chip label="Secondary" color="secondary" />
<Chip label="Success" color="success" />

// Chips with Icons
<Chip icon={<Person />} label="ผู้ใช้" />
<Chip icon={<Email />} label="อีเมล" color="primary" />

// Clickable Chips
<Chip 
  label="ลบได้" 
  onDelete={handleDelete}
  color="primary" 
/>

// Badge with Numbers
<Badge badgeContent={4} color="error">
  <Notifications />
</Badge>

<Badge badgeContent={12} color="primary">
  <ShoppingCart />
</Badge>

// Badge Dot (Online Status)
<Badge
  overlap="circular"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  variant="dot"
  color="success"
>
  <Avatar>U</Avatar>
</Badge>

// Badge with Max Count
<Badge badgeContent={999} max={99} color="secondary">
  <Email />
</Badge>`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ Chip สำหรับ tags และ categories, Badge สำหรับ notifications และ counters
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 5: Complete Display */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🚀 Complete Data Display</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            ตัวอย่างการรวม Data Display Components ทั้งหมดในแดชบอร์ดจริง
          </Typography>

          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                📊 E-commerce Dashboard
              </Typography>
              
              {/* Stats Cards */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
                <Card sx={{ bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <TrendingUp color="primary" sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                      ฿125K
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ยอดขายวันนี้
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <ShoppingCart color="success" sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                      1,234
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      คำสั่งซื้อ
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Person color="warning" sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h4" color="warning.main" sx={{ fontWeight: 700 }}>
                      567
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ลูกค้าใหม่
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ bgcolor: 'error.50', border: '1px solid', borderColor: 'error.200' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Visibility color="error" sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h4" color="error.main" sx={{ fontWeight: 700 }}>
                      89K
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ผู้เยี่ยมชม
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              {/* Quick Actions */}
              <Typography variant="h6" sx={{ mb: 2 }}>
                ⚡ การดำเนินการด่วน
              </Typography>
              
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <Badge badgeContent={5} color="error">
                      <Assignment />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary="คำสั่งซื้อรอดำเนินการ"
                    secondary="มี 5 คำสั่งซื้อรอการยืนยัน"
                  />
                  <Chip label="ด่วน" color="error" size="small" />
                </ListItemButton>
                
                <ListItemButton>
                  <ListItemIcon>
                    <Badge badgeContent={12} color="warning">
                      <Notifications />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText 
                    primary="การแจ้งเตือนใหม่"
                    secondary="ข้อความและอัพเดทสำคัญ"
                  />
                </ListItemButton>
              </List>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>💻 Code Example</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 Dashboard Layout
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Stats Cards Grid
<Box sx={{ 
  display: 'grid', 
  gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, 
  gap: 2 
}}>
  <Card sx={{ bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
    <CardContent sx={{ textAlign: 'center', py: 2 }}>
      <TrendingUp color="primary" sx={{ fontSize: 32, mb: 1 }} />
      <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
        ฿125K
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ยอดขายวันนี้
      </Typography>
    </CardContent>
  </Card>
  
  <Card sx={{ bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
    <CardContent sx={{ textAlign: 'center', py: 2 }}>
      <ShoppingCart color="success" sx={{ fontSize: 32, mb: 1 }} />
      <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
        1,234
      </Typography>
      <Typography variant="body2" color="text.secondary">
        คำสั่งซื้อ
      </Typography>
    </CardContent>
  </Card>
</Box>

// Action List with Badges
<List>
  <ListItemButton>
    <ListItemIcon>
      <Badge badgeContent={5} color="error">
        <Assignment />
      </Badge>
    </ListItemIcon>
    <ListItemText 
      primary="คำสั่งซื้อรอดำเนินการ"
      secondary="มี 5 คำสั่งซื้อรอการยืนยัน"
    />
    <Chip label="ด่วน" color="error" size="small" />
  </ListItemButton>
</List>`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> รวม components หลายๆ ตัวเข้าด้วยกันเพื่อสร้าง dashboard ที่สมบูรณ์
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/mui-tutorial/lesson-6"
            variant="outlined"
          >
            บทที่ 6: Navigation Components
          </Button>
          
          <Chip 
            label="7 / 8"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/mui-tutorial/lesson-8"
            variant="contained"
          >
            บทที่ 8: Feedback Components
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 