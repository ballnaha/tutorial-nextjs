'use client';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Paper,
  Divider,
  Avatar,
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  Code,
  CheckCircle,
  Palette,
  Brush,
  Dashboard,
  TableChart,
  Edit,
  Widgets,
  DevicesOther,
  ColorLens,
} from '@mui/icons-material';
import Link from 'next/link';

const lessons = [
  {
    id: 1,
    title: '🎨 เริ่มต้นกับ Material-UI',
    description: 'ติดตั้งและใช้งาน MUI ครั้งแรก พร้อมทำความรู้จัก Design System',
    duration: '25 นาที',
    level: 'เริ่มต้น',
    topics: [
      'Material-UI คืออะไร?',
      'การติดตั้ง MUI',
      'Material Design Principles',
      'ThemeProvider และ CssBaseline',
      'การใช้งาน Component แรก',
    ],
    code: `npm install @mui/material @emotion/react @emotion/styled

// App.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Button } from '@mui/material'

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant="contained">Hello MUI!</Button>
    </ThemeProvider>
  )
}`
  },
  {
    id: 2,
    title: '🎭 Theme และ Styling',
    description: 'การปรับแต่ง Theme และการใช้งาน sx prop',
    duration: '30 นาที',
    level: 'เริ่มต้น',
    topics: [
      'การสร้าง Custom Theme',
      'Color Palette',
      'Typography',
      'การใช้งาน sx prop',
      'styled() function',
      'useTheme hook',
    ],
    code: `const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
  },
})

// ใช้งาน sx prop
<Box sx={{
  bgcolor: 'primary.main',
  color: 'white',
  p: 2,
  borderRadius: 1,
}}>
  Custom styled box
</Box>`
  },
  {
    id: 3,
    title: '📝 Layout Components',
    description: 'Container, Grid, Stack, Box สำหรับจัดวาง Layout',
    duration: '35 นาที',
    level: 'เริ่มต้น',
    topics: [
      'Container component',
      'Grid system (Grid v1 & v2)',
      'Stack component',
      'Box component',
      'Responsive Design',
      'Breakpoints',
    ],
    code: `import { Container, Grid, Stack, Box } from '@mui/material'

<Container maxWidth="lg">
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
        Item 1
      </Box>
    </Grid>
    <Grid item xs={12} md={6}>
      <Stack spacing={2} direction="row">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Stack>
    </Grid>
  </Grid>
</Container>`
  },
  {
    id: 4,
    title: '🔘 Buttons และ Actions',
    description: 'การใช้งาน Button, IconButton, FAB และ ButtonGroup',
    duration: '20 นาที',
    level: 'เริ่มต้น',
    topics: [
      'Button variants',
      'IconButton',
      'Floating Action Button (FAB)',
      'ButtonGroup',
      'Loading state',
      'Custom styling',
    ],
    code: `import { Button, IconButton, Fab, ButtonGroup } from '@mui/material'
import { Add, Delete, Save } from '@mui/icons-material'

<ButtonGroup variant="contained">
  <Button startIcon={<Save />}>บันทึก</Button>
  <Button endIcon={<Delete />}>ลบ</Button>
</ButtonGroup>

<IconButton color="primary">
  <Add />
</IconButton>

<Fab color="secondary" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
  <Add />
</Fab>`
  },
  {
    id: 5,
    title: '📋 Forms และ Inputs',
    description: 'TextField, Select, Checkbox, Radio และการจัดการ Form',
    duration: '40 นาที',
    level: 'ปานกลาง',
    topics: [
      'TextField variants',
      'Select และ MenuItem',
      'Checkbox และ Radio',
      'Form validation',
      'FormControl และ FormHelperText',
      'การใช้งานกับ react-hook-form',
    ],
    code: `import { TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material'

<TextField
  label="ชื่อ"
  variant="outlined"
  fullWidth
  required
  error={!!errors.name}
  helperText={errors.name?.message}
/>

<Select value={age} onChange={handleChange}>
  <MenuItem value={10}>สิบ</MenuItem>
  <MenuItem value={20}>ยี่สิบ</MenuItem>
</Select>

<FormControlLabel
  control={<Checkbox />}
  label="ยอมรับเงื่อนไข"
/>`
  },
  {
    id: 6,
    title: '📊 Data Display',
    description: 'Table, List, Card และการแสดงข้อมูล',
    duration: '35 นาที',
    level: 'ปานกลาง',
    topics: [
      'Table, TableHead, TableBody',
      'List และ ListItem',
      'Card และ CardContent',
      'Avatar และ Chip',
      'Pagination',
      'การ sort และ filter',
    ],
    code: `import { Table, TableHead, TableRow, TableCell, Card, List } from '@mui/material'

<Card>
  <CardContent>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ชื่อ</TableCell>
          <TableCell>อีเมล</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>`
  },
  {
    id: 7,
    title: '🚪 Navigation',
    description: 'AppBar, Drawer, Tabs และระบบนำทาง',
    duration: '30 นาที',
    level: 'ปานกลาง',
    topics: [
      'AppBar และ Toolbar',
      'Drawer (Sidebar)',
      'Tabs และ TabPanel',
      'Breadcrumbs',
      'BottomNavigation',
      'Responsive Navigation',
    ],
    code: `import { AppBar, Toolbar, Drawer, Tabs, Tab } from '@mui/material'

<AppBar position="sticky">
  <Toolbar>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      My App
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>

<Drawer anchor="left" open={open} onClose={handleClose}>
  <List>
    <ListItem button>
      <ListItemText primary="หน้าหลัก" />
    </ListItem>
  </List>
</Drawer>`
  },
  {
    id: 8,
    title: '💬 Feedback Components',
    description: 'Dialog, Snackbar, Alert และการแจ้งเตือน',
    duration: '25 นาที',
    level: 'ปานกลาง',
    topics: [
      'Dialog และ DialogContent',
      'Snackbar notifications',
      'Alert component',
      'Progress indicators',
      'Backdrop และ Loading',
      'Toast notifications',
    ],
    code: `import { Dialog, Snackbar, Alert, CircularProgress } from '@mui/material'

<Dialog open={open} onClose={handleClose}>
  <DialogTitle>ยืนยันการลบ</DialogTitle>
  <DialogContent>
    <DialogContentText>
      คุณแน่ใจหรือไม่ที่จะลบรายการนี้?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>ยกเลิก</Button>
    <Button onClick={handleDelete} color="error">ลบ</Button>
  </DialogActions>
</Dialog>

<Snackbar open={showAlert}>
  <Alert severity="success">บันทึกสำเร็จ!</Alert>
</Snackbar>`
  },
];

const features = [
  { icon: <Brush />, title: 'Material Design', desc: 'ตาม Google Design System' },
  { icon: <DevicesOther />, title: 'Responsive', desc: 'รองรับทุกหน้าจอ' },
  { icon: <ColorLens />, title: 'Customizable', desc: 'ปรับแต่งได้ง่าย' },
  { icon: <Widgets />, title: '50+ Components', desc: 'Components ครบครัน' },
];

export default function MUITutorialPage() {
  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Palette color="primary" sx={{ fontSize: '3rem' }} />
          Material-UI (MUI) Tutorial
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          เรียนรู้การใช้งาน MUI Component Library สำหรับสร้าง UI ที่สวยงามและทันสมัย
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body1">
            📋 <strong>สิ่งที่ต้องมีก่อนเรียน:</strong> ความรู้พื้นฐาน React, Next.js, HTML, CSS
          </Typography>
        </Alert>

        {/* Features */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 2, 
          mb: 4 
        }}>
          {features.map((feature, index) => (
            <Paper key={index} sx={{ p: 2, flex: 1, textAlign: 'center' }}>
              <Box sx={{ color: 'primary.main', mb: 1 }}>
                {feature.icon}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.desc}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Preview */}
        <Paper sx={{ p: 3, bgcolor: 'grey.50', mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🎯 สิ่งที่จะได้เรียนรู้:
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 2 
          }}>
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="การติดตั้งและตั้งค่า MUI" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="การใช้งาน Theme และ Styling" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Layout และ Grid System" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Form Components ต่างๆ" />
                </ListItem>
              </List>
            </Box>
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Navigation Components" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Data Display Components" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Feedback และ Notifications" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText primary="Best Practices และ Tips" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Lessons */}
      <Typography variant="h2" sx={{ mb: 3 }}>
        📚 บทเรียนทั้งหมด ({lessons.length} บท)
      </Typography>

      <Box sx={{ mb: 4 }}>
        {lessons.map((lesson) => (
          <Accordion key={lesson.id} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  บทที่ {lesson.id}: {lesson.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={lesson.duration} size="small" color="primary" />
                  <Chip label={lesson.level} size="small" color="secondary" />
                </Box>
              </Box>
            </AccordionSummary>
            
            <AccordionDetails>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {lesson.description}
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                🎯 หัวข้อที่จะเรียน:
              </Typography>
              <List dense>
                {lesson.topics.map((topic, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <CheckCircle color="primary" sx={{ fontSize: 16 }} />
                    </ListItemIcon>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))}
              </List>

              {lesson.code && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                    💻 ตัวอย่างโค้ด:
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.100', fontFamily: 'monospace' }}>
                    <pre style={{ margin: 0, fontSize: '0.875rem', overflowX: 'auto' }}>
                      {lesson.code}
                    </pre>
                  </Paper>
                </Box>
              )}

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  component={Link}
                  href={`/mui-tutorial/lesson-${lesson.id}`}
                >
                  เริ่มเรียนบทนี้
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Code />}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  ดูตัวอย่าง Live Demo
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Getting Started */}
      <Paper sx={{ p: 4, bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
        <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
          🎨 พร้อมสร้าง UI สวยๆ แล้วใช่ไหม?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          เริ่มต้นจากบทที่ 1 และสร้าง Component สวยๆ ด้วย MUI กันเลย!
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            sx={{ 
              bgcolor: 'white', 
              color: 'secondary.main',
              '&:hover': { bgcolor: 'grey.100' }
            }}
            startIcon={<PlayArrow />}
            component={Link}
            href="/mui-tutorial/lesson-1"
          >
            เริ่มเรียนบทที่ 1
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 