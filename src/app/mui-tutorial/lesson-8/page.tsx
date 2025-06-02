'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  SnackbarContent,
  IconButton,
  LinearProgress,
  CircularProgress,
  Backdrop,
  Slide,
  Fade,
  Card,
  CardContent,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Feedback,
  NotificationsActive,
  Warning,
  Error,
  Info,
  Close,
  Delete,
  Save,
  Send,
  CloudUpload,
  PlayArrow,
  Lightbulb,
  Check,
  ErrorOutline,
  InfoOutlined,
  WarningAmber,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState, forwardRef } from 'react';

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

const Transition = forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const feedbackTypes = [
  {
    type: 'Dialog & Modal',
    description: 'หน้าต่างป๊อปอัพสำหรับการโต้ตอบที่ต้องการความสนใจ',
    usage: 'ยืนยันการลบ, ฟอร์มรายละเอียด, แสดงข้อมูลเพิ่มเติม',
    pros: ['ดึงความสนใจได้ดี', 'บังคับให้ตัดสินใจ', 'แสดงข้อมูลละเอียด'],
    cons: ['ขัดจังหวะ User Flow', 'ใช้งานบ่อยจะรำคาญ'],
    icon: <Info />
  },
  {
    type: 'Snackbar & Toast',
    description: 'การแจ้งเตือนชั่วคราวที่ไม่ขัดจังหวะการใช้งาน',
    usage: 'แจ้งสำเร็จ, แจ้งข้อผิดพลาด, การแจ้งเตือนทั่วไป',
    pros: ['ไม่ขัดจังหวะ', 'หายไปเอง', 'ง่ายต่อการใช้งาน'],
    cons: ['อาจพลาดได้', 'เวลาจำกัด', 'ข้อมูลจำกัด'],
    icon: <NotificationsActive />
  },
  {
    type: 'Alert & Notification',
    description: 'การแจ้งเตือนแบบถาวรสำหรับข้อมูลสำคัญ',
    usage: 'ข้อความเตือน, ข้อมูลสำคัญ, สถานะระบบ',
    pros: ['เห็นชัดเจน', 'ข้อมูลครบถ้วน', 'คงอยู่จนกว่าจะปิด'],
    cons: ['กินพื้นที่', 'อาจรบกวนการใช้งาน'],
    icon: <Warning />
  },
  {
    type: 'Progress & Loading',
    description: 'แสดงความคืบหน้าของกระบวนการที่กำลังทำงาน',
    usage: 'อัพโหลดไฟล์, โหลดข้อมูล, ประมวลผลข้อมูล',
    pros: ['ให้ข้อมูลความคืบหน้า', 'ลดความกังวล', 'มีประสิทธิภาพ'],
    cons: ['ต้องคำนวณเปอร์เซ็นต์', 'ซับซ้อนในการใช้งาน'],
    icon: <CloudUpload />
  }
];

export default function MUILesson8Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alertVisible, setAlertVisible] = useState(true);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const simulateLoading = () => {
    setLoading(true);
    setProgress(0);
    
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setLoading(false);
          showSnackbar('การอัพโหลดเสร็จสมบูรณ์!', 'success');
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);
  };

  const handleDelete = () => {
    setConfirmDialogOpen(false);
    showSnackbar('ลบข้อมูลเรียบร้อยแล้ว', 'success');
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
            <Feedback color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 8: Feedback Components
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การให้ Feedback ที่มีประสิทธิภาพกับผู้ใช้ด้วย MUI สำหรับมือใหม่! 💬
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Info />} label="Dialog & Modal" color="primary" />
            <Chip icon={<NotificationsActive />} label="Snackbar" color="secondary" />
            <Chip icon={<Warning />} label="Alert" color="success" />
            <Chip icon={<CloudUpload />} label="Progress" color="warning" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> สร้างระบบ Feedback ที่สมบูรณ์และใช้งานง่าย
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 30 นาที | 
              📊 <strong>ระดับ:</strong> ปานกลาง
            </Typography>
          </Alert>

          {/* Why Feedback Components Matter */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'warning.50', border: '2px solid', borderColor: 'warning.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="warning" /> 💡 ทำไม Feedback ถึงสำคัญ?
            </Typography>
            
            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'warning.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 💬 <strong>User Communication:</strong> สื่อสารสถานะและผลลัพธ์ให้ผู้ใช้ทราบ
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🎯 <strong>User Guidance:</strong> ช่วยนำทางและบอกขั้นตอนที่ต้องทำ
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • ⚠️ <strong>Error Prevention:</strong> ป้องกันข้อผิดพลาดและลดความสับสน
              </Typography>
              <Typography variant="body2">
                • ✨ <strong>User Experience:</strong> เพิ่มความมั่นใจและความพึงพอใจในการใช้งาน
              </Typography>
            </Box>

            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> Feedback ที่ดีช่วยสร้างประสบการณ์ใช้งานที่ราบรื่นและน่าเชื่อถือ!
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
                    primary="สร้าง Dialog และ Modal" 
                    secondary="confirmation dialog, form dialog, info dialog"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="ใช้ Snackbar และ Toast" 
                    secondary="success, error, warning notifications"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="จัดการ Alert และ Notification" 
                    secondary="system alerts, user notifications"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="แสดง Progress และ Loading" 
                    secondary="linear progress, circular progress, loading states"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="สร้างระบบ Feedback ครบครัน" 
                    secondary="complete user feedback system"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="UX Best Practices" 
                    secondary="เลือกใช้ feedback ที่เหมาะสม"
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>

        {/* Component Overview */}
        <Typography variant="h5" sx={{ mb: 2 }}>🎨 Feedback Components Overview</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
          {feedbackTypes.map((feedback, index) => (
            <Card key={feedback.type}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    bgcolor: 'primary.light', 
                    color: 'primary.main', 
                    p: 1, 
                    borderRadius: 1, 
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {feedback.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {feedback.type}
                  </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {feedback.description}
                </Typography>
                
                <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
                  เหมาะสำหรับ:
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                  {feedback.usage}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'success.main', fontSize: '0.8rem' }}>
                      ✅ ข้อดี:
                    </Typography>
                    {feedback.pros.map((pro, i) => (
                      <Typography key={i} variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                        • {pro}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'error.main', fontSize: '0.8rem' }}>
                      ⚠️ ข้อควรระวัง:
                    </Typography>
                    {feedback.cons.map((con, i) => (
                      <Typography key={i} variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                        • {con}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

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
              label="💬 Dialog & Modal" 
              icon={<Info />}
              iconPosition="start"
            />
            <Tab 
              label="🔔 Snackbar & Toast" 
              icon={<NotificationsActive />}
              iconPosition="start"
            />
            <Tab 
              label="⚠️ Alert & Notification" 
              icon={<Warning />}
              iconPosition="start"
            />
            <Tab 
              label="⏳ Progress & Loading" 
              icon={<CloudUpload />}
              iconPosition="start"
            />
            <Tab 
              label="🚀 Complete Feedback" 
              icon={<PlayArrow />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Dialog Components */}
        <Dialog open={dialogOpen} onClose={handleDialogClose} TransitionComponent={Transition}>
          <DialogTitle>📝 ข้อมูลผู้ใช้</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              กรุณากรอกข้อมูลเพิ่มเติมเพื่อให้บริการที่ดีที่สุด
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="ชื่อ-นามสกุล"
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="อีเมล"
              type="email"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>ยกเลิก</Button>
            <Button onClick={handleDialogClose} variant="contained">บันทึก</Button>
          </DialogActions>
        </Dialog>

        {/* Confirm Dialog */}
        <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ErrorOutline color="error" />
            ยืนยันการลบ
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmDialogClose}>ยกเลิก</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              ลบข้อมูล
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* Loading Backdrop */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress color="inherit" size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              กำลังอัพโหลด... {progress}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ width: 300, mt: 2 }}
            />
          </Box>
        </Backdrop>

        {/* Tab 1: Dialog & Modal */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>💬 Dialog & Modal</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Dialog เป็นหน้าต่างป๊อปอัพที่ใช้สำหรับการโต้ตอบที่ต้องการความสนใจจากผู้ใช้
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  📝 Form Dialog
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  ใช้สำหรับรับข้อมูลจากผู้ใช้ เช่น ฟอร์มลงทะเบียน, แก้ไขข้อมูล
                </Typography>
                <Button variant="contained" onClick={handleDialogOpen} fullWidth>
                  เปิด Form Dialog
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  ⚠️ Confirmation Dialog
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  ยืนยันการดำเนินการที่สำคัญ เช่น ลบข้อมูล, ออกจากระบบ
                </Typography>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={handleConfirmDialogOpen}
                  fullWidth
                  startIcon={<Delete />}
                >
                  ลบข้อมูล
                </Button>
              </CardContent>
            </Card>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>💻 Code Example</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 Basic Dialog
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic Dialog
<Dialog open={open} onClose={handleClose}>
  <DialogTitle>หัวข้อ Dialog</DialogTitle>
  <DialogContent>
    <DialogContentText>
      เนื้อหาของ Dialog
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>ยกเลิก</Button>
    <Button onClick={handleClose} variant="contained">
      ตกลง
    </Button>
  </DialogActions>
</Dialog>

// Confirmation Dialog
<Dialog open={confirmOpen} onClose={handleClose}>
  <DialogTitle>
    <ErrorOutline color="error" />
    ยืนยันการลบ
  </DialogTitle>
  <DialogContent>
    <DialogContentText>
      คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>ยกเลิก</Button>
    <Button color="error" variant="contained">
      ลบ
    </Button>
  </DialogActions>
</Dialog>`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ Dialog สำหรับการโต้ตอบที่สำคัญเท่านั้น เพื่อไม่ให้รบกวนผู้ใช้
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 2: Snackbar & Toast */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>🔔 Snackbar & Toast</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Snackbar เป็นการแจ้งเตือนชั่วคราวที่ไม่ขัดจังหวะการใช้งาน
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🎉 Success Messages
                </Typography>
                <Stack spacing={2}>
                  <Button 
                    variant="contained" 
                    color="success"
                    onClick={() => showSnackbar('บันทึกข้อมูลเรียบร้อยแล้ว!', 'success')}
                    startIcon={<Check />}
                  >
                    แสดงข้อความสำเร็จ
                  </Button>
                  <Button 
                    variant="contained" 
                    color="info"
                    onClick={() => showSnackbar('ข้อมูลได้รับการอัพเดทแล้ว', 'info')}
                    startIcon={<InfoOutlined />}
                  >
                    แสดงข้อมูลทั่วไป
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  ⚠️ Warning & Error Messages
                </Typography>
                <Stack spacing={2}>
                  <Button 
                    variant="contained" 
                    color="warning"
                    onClick={() => showSnackbar('กรุณาตรวจสอบข้อมูลอีกครั้ง', 'warning')}
                    startIcon={<WarningAmber />}
                  >
                    แสดงข้อความเตือน
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => showSnackbar('เกิดข้อผิดพลาด! ลองใหม่อีกครั้ง', 'error')}
                    startIcon={<ErrorOutline />}
                  >
                    แสดงข้อความผิดพลาด
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>💻 Code Example</Typography>
          
          <Card>
            <CardContent>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Snackbar with Alert
<Snackbar
  open={open}
  autoHideDuration={4000}
  onClose={handleClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
>
  <Alert onClose={handleClose} severity="success">
    บันทึกข้อมูลเรียบร้อยแล้ว!
  </Alert>
</Snackbar>

// Custom Snackbar Function
const showSnackbar = (message, severity) => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};

// Usage
showSnackbar('สำเร็จ!', 'success');
showSnackbar('เกิดข้อผิดพลาด', 'error');
showSnackbar('คำเตือน', 'warning');
showSnackbar('ข้อมูลทั่วไป', 'info');`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ตั้งเวลา autoHideDuration ประมาณ 4-6 วินาที และใช้ตำแหน่งที่ไม่บดบังเนื้อหาสำคัญ
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 3: Alert & Notification */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>⚠️ Alert & Notification</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Alert แสดงข้อความสำคัญที่ต้องการให้ผู้ใช้เห็นและรับทราบ
          </Typography>

          <Stack spacing={3} sx={{ mb: 3 }}>
            {alertVisible && (
              <Alert 
                severity="info" 
                onClose={() => setAlertVisible(false)}
                action={
                  <Button color="inherit" size="small">
                    ดูรายละเอียด
                  </Button>
                }
              >
                <strong>ข้อมูลระบบ:</strong> ระบบจะปิดปรับปรุงวันที่ 15 ธันวาคม 2024 เวลา 02:00-04:00 น.
              </Alert>
            )}

            <Alert severity="success">
              <strong>การดำเนินการสำเร็จ!</strong> ข้อมูลของคุณได้รับการบันทึกเรียบร้อยแล้ว
            </Alert>

            <Alert severity="warning">
              <strong>คำเตือน:</strong> ข้อมูลบางส่วนยังไม่สมบูรณ์ กรุณาตรวจสอบและเพิ่มเติม
            </Alert>

            <Alert severity="error">
              <strong>เกิดข้อผิดพลาด!</strong> ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง
            </Alert>
          </Stack>

          <Typography variant="h5" sx={{ mb: 2 }}>🎨 Alert Variants</Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🎯 Standard Alerts
                </Typography>
                <Stack spacing={2}>
                  <Alert severity="info" variant="filled">
                    ข้อมูลทั่วไป (Filled)
                  </Alert>
                  <Alert severity="success" variant="outlined">
                    ข้อความสำเร็จ (Outlined)
                  </Alert>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🔧 Alert with Actions
                </Typography>
                <Stack spacing={2}>
                  <Alert 
                    severity="warning"
                    action={
                      <Button color="inherit" size="small">
                        แก้ไข
                      </Button>
                    }
                  >
                    ต้องการการดำเนินการ
                  </Alert>
                  <Alert 
                    severity="error"
                    action={
                      <Button color="inherit" size="small">
                        ลองใหม่
                      </Button>
                    }
                  >
                    เกิดข้อผิดพลาด
                  </Alert>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>💻 Code Example</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎨 Alert Implementations
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic Alerts
<Alert severity="info">
  <strong>ข้อมูลระบบ:</strong> ระบบจะปิดปรับปรุงวันที่ 15 ธันวาคม 2024
</Alert>

<Alert severity="success">
  <strong>การดำเนินการสำเร็จ!</strong> ข้อมูลได้รับการบันทึกเรียบร้อยแล้ว
</Alert>

<Alert severity="warning">
  <strong>คำเตือน:</strong> ข้อมูลบางส่วนยังไม่สมบูรณ์
</Alert>

<Alert severity="error">
  <strong>เกิดข้อผิดพลาด!</strong> ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้
</Alert>

// Alert Variants
<Alert severity="info" variant="filled">
  ข้อมูลทั่วไป (Filled)
</Alert>

<Alert severity="success" variant="outlined">
  ข้อความสำเร็จ (Outlined)
</Alert>

<Alert severity="warning" variant="standard">
  ข้อความเตือน (Standard - Default)
</Alert>

// Alert with Actions
<Alert 
  severity="warning"
  action={
    <Button color="inherit" size="small">
      แก้ไข
    </Button>
  }
>
  ต้องการการดำเนินการ
</Alert>

<Alert 
  severity="info" 
  onClose={() => setAlertVisible(false)}
  action={
    <Button color="inherit" size="small">
      ดูรายละเอียด
    </Button>
  }
>
  ข้อมูลสำคัญที่สามารถปิดได้
</Alert>

// Alert with Custom Icons
<Alert 
  severity="error"
  icon={<ErrorOutline fontSize="inherit" />}
  action={
    <Button color="inherit" size="small">
      ลองใหม่
    </Button>
  }
>
  เกิดข้อผิดพลาด - กดลองใหม่
</Alert>

// Closeable Alert with State Management
const [alertVisible, setAlertVisible] = useState(true);

{alertVisible && (
  <Alert 
    severity="info" 
    onClose={() => setAlertVisible(false)}
  >
    การแจ้งเตือนที่สามารถปิดได้
  </Alert>
)}

// Alert with Multiple Actions
<Alert 
  severity="warning"
  action={
    <Box>
      <Button color="inherit" size="small" sx={{ mr: 1 }}>
        ดูรายละเอียด
      </Button>
      <Button color="inherit" size="small" variant="outlined">
        แก้ไข
      </Button>
    </Box>
  }
>
  การแจ้งเตือนที่มีหลายปุ่ม
</Alert>`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ severity ที่เหมาะสมกับข้อความ และเพิ่ม actions เมื่อต้องการให้ผู้ใช้ดำเนินการ
                </Typography>
              </Alert>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>🔧 Advanced Alert Usage</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🚀 Alert with Custom Styling
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Custom Styled Alert
<Alert 
  severity="success"
  sx={{
    bgcolor: 'success.50',
    border: '2px solid',
    borderColor: 'success.200',
    borderRadius: 2,
    '& .MuiAlert-icon': {
      fontSize: '1.5rem'
    }
  }}
>
  Alert แบบ custom styling
</Alert>

// Alert with Animation
<Fade in={showAlert}>
  <Alert severity="info" onClose={() => setShowAlert(false)}>
    Alert ที่มี fade animation
  </Alert>
</Fade>

// Conditional Alert Rendering
{error && (
  <Alert severity="error" sx={{ mb: 2 }}>
    <strong>ข้อผิดพลาด:</strong> {error.message}
  </Alert>
)}

{success && (
  <Alert severity="success" sx={{ mb: 2 }}>
    <strong>สำเร็จ:</strong> {success.message}
  </Alert>
)}

// Alert in Different Containers
<Paper sx={{ p: 2 }}>
  <Alert severity="warning">
    Alert ภายใน Paper component
  </Alert>
</Paper>

<Card>
  <CardContent>
    <Alert severity="info" variant="outlined">
      Alert ภายใน Card component
    </Alert>
  </CardContent>
</Card>

// Alert with Rich Content
<Alert severity="info">
  <Typography variant="h6" sx={{ mb: 1 }}>
    ข้อมูลสำคัญ
  </Typography>
  <Typography variant="body2" sx={{ mb: 2 }}>
    นี่คือการแจ้งเตือนที่มีเนื้อหาหลายส่วน สามารถใส่ข้อความยาวๆ 
    รวมถึงรายละเอียดเพิ่มเติมได้
  </Typography>
  <Box>
    <Chip label="สำคัญ" size="small" color="primary" sx={{ mr: 1 }} />
    <Chip label="ด่วน" size="small" color="error" />
  </Box>
</Alert>`}
                </Typography>
              </Box>

              <Alert severity="success">
                <Typography variant="body2">
                  ✨ <strong>ผลลัพธ์:</strong> Alert ที่ออกแบบได้หลากหลายและตอบสนองความต้องการทุกสถานการณ์!
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 4: Progress & Loading */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>⏳ Progress & Loading</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Progress indicators แสดงความคืบหน้าของกระบวนการที่กำลังทำงาน
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  📊 Linear Progress
                </Typography>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      การดาวน์โหลด: 75%
                    </Typography>
                    <LinearProgress variant="determinate" value={75} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      กำลังประมวลผล...
                    </Typography>
                    <LinearProgress />
                  </Box>
                  <Button 
                    variant="contained" 
                    onClick={simulateLoading}
                    startIcon={<CloudUpload />}
                    disabled={loading}
                  >
                    {loading ? 'กำลังอัพโหลด...' : 'จำลองการอัพโหลด'}
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  ⭕ Circular Progress
                </Typography>
                <Stack spacing={3} alignItems="center">
                  <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress variant="determinate" value={60} size={60} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      60%
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={40} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      กำลังโหลด...
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <CircularProgress color="secondary" size={30} />
                    <CircularProgress color="success" size={30} />
                    <CircularProgress color="warning" size={30} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>💻 Code Example</Typography>
          
          <Card>
            <CardContent>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Linear Progress
<LinearProgress variant="determinate" value={progress} />
<LinearProgress /> // Indeterminate

// Circular Progress  
<CircularProgress variant="determinate" value={progress} />
<CircularProgress /> // Indeterminate

// Loading Backdrop
<Backdrop open={loading}>
  <Box sx={{ textAlign: 'center' }}>
    <CircularProgress color="inherit" />
    <Typography>กำลังโหลด...</Typography>
  </Box>
</Backdrop>

// Progress with State
const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
  }, 800);
  return () => clearInterval(timer);
}, []);`}
                </Typography>
              </Box>

              <Alert severity="info">
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ determinate progress เมื่อทราบเปอร์เซ็นต์ที่แน่นอน และ indeterminate เมื่อไม่ทราบระยะเวลา
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 5: Complete Feedback System */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🚀 Complete Feedback System</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            ตัวอย่างระบบ Feedback ครบครันที่รวม Components ทั้งหมด
          </Typography>

          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                📝 User Profile Management
              </Typography>
              
              {/* Form with Feedback */}
              <Box sx={{ mb: 3 }}>
                <Alert severity="info" sx={{ mb: 3 }}>
                  <strong>ข้อมูลระบบ:</strong> กรุณากรอกข้อมูลให้ครบถ้วนเพื่อความปลอดภัยของบัญชี
                </Alert>

                <Stack spacing={3}>
                  <TextField
                    label="ชื่อผู้ใช้"
                    variant="outlined"
                    fullWidth
                    helperText="ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร"
                  />
                  
                  <TextField
                    label="อีเมล"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error
                    helperText="รูปแบบอีเมลไม่ถูกต้อง"
                  />

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                      label="รหัสผ่าน"
                      type="password"
                      variant="outlined"
                      fullWidth
                    />
                    <LinearProgress 
                      variant="determinate" 
                      value={80} 
                      sx={{ width: 100 }}
                      color="success"
                    />
                    <Typography variant="body2" color="success.main">
                      แข็งแรง
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
                <Button 
                  variant="contained" 
                  startIcon={<Save />}
                  onClick={() => showSnackbar('บันทึกข้อมูลเรียบร้อยแล้ว!', 'success')}
                >
                  บันทึกข้อมูล
                </Button>
                
                <Button 
                  variant="outlined" 
                  startIcon={<Send />}
                  onClick={() => showSnackbar('ส่งข้อมูลเพื่อตรวจสอบแล้ว', 'info')}
                >
                  ส่งเพื่อตรวจสอบ
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleConfirmDialogOpen}
                >
                  ลบบัญชี
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* System Status */}
              <Typography variant="h6" sx={{ mb: 2 }}>
                📊 สถานะระบบ
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={95} 
                    size={50} 
                    color="success"
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Server Status: 95%
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.50', borderRadius: 1 }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={75} 
                    size={50} 
                    color="warning"
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Database: 75%
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.50', borderRadius: 1 }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={100} 
                    size={50} 
                    color="info"
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    API Status: 100%
                  </Typography>
                </Box>
              </Box>

              {/* Quick Actions */}
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                ⚡ การทดสอบ Feedback
              </Typography>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Button 
                  size="small" 
                  onClick={handleDialogOpen}
                  startIcon={<Info />}
                >
                  เปิด Dialog
                </Button>
                <Button 
                  size="small" 
                  onClick={() => showSnackbar('ทดสอบ Snackbar!', 'success')}
                  startIcon={<Check />}
                >
                  แสดง Success
                </Button>
                <Button 
                  size="small" 
                  onClick={() => showSnackbar('ข้อมูลสำคัญ', 'warning')}
                  startIcon={<WarningAmber />}
                >
                  แสดง Warning
                </Button>
                <Button 
                  size="small" 
                  onClick={simulateLoading}
                  startIcon={<CloudUpload />}
                  disabled={loading}
                >
                  จำลอง Loading
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/mui-tutorial/lesson-7"
            variant="outlined"
          >
            บทที่ 7: Data Display
          </Button>
          
          <Chip 
            label="8 / 8"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/mui-tutorial"
            variant="contained"
          >
            เสร็จสิ้นหลักสูตร
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 