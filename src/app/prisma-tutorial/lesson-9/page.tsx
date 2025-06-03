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
  Tab,
  Tabs,
  Card,
  CardContent,
  Stack,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  ArrowBack,
  Assignment,
  Timer,
  ContentCopy,
  Palette,
  Visibility,
  Build,
  TableView,
  Storage,
  Check,
  ExpandMore,
  Warning,
  Lightbulb,
  OpenInNew,
  Search,
  Add,
  Edit,
  Delete,
  DataObject,
  Dashboard,
  Settings,
  ViewQuilt,
  DataArray,
  BugReport,
  Refresh,
  PlayArrow,
  Terminal,
  CloudDownload,
  Folder,
  Description,
  Web,
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `lesson-tab-${index}`,
    'aria-controls': `lesson-tabpanel-${index}`,
  };
}

export default function Lesson9() {
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          component={Link}
          href="/prisma-tutorial"
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          กลับไปหน้าหลัก
        </Button>
        
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <Palette sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              บทที่ 9: Prisma Studio และ Tools
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              การใช้ Prisma Studio และเครื่องมือต่างๆ สำหรับจัดการฐานข้อมูล
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip icon={<Timer />} label="20 นาที" color="primary" />
          <Chip icon={<Assignment />} label="เริ่มต้น" color="success" />
          <Chip icon={<Palette />} label="Tools" color="secondary" />
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>สิ่งที่จะได้เรียนรู้:</strong> การใช้ Prisma Studio, Database Browser, Visual Query Builder, Data Seeding และ Database Introspection
          </Typography>
        </Alert>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab icon={<Visibility />} label="Prisma Studio" {...a11yProps(0)} />
          <Tab icon={<TableView />} label="Database Browser" {...a11yProps(1)} />
          <Tab icon={<Search />} label="Query Builder" {...a11yProps(2)} />
          <Tab icon={<DataArray />} label="Data Seeding" {...a11yProps(3)} />
          <Tab icon={<CloudDownload />} label="Introspection" {...a11yProps(4)} />
          <Tab icon={<Build />} label="CLI Tools" {...a11yProps(5)} />
        </Tabs>
      </Paper>

      {/* Tab 1: Prisma Studio */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🎨 Prisma Studio - GUI สำหรับจัดการฐานข้อมูล
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          Prisma Studio เป็น visual database editor ที่ช่วยให้เราจัดการข้อมูลได้ง่ายผ่าน web interface
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🚀 การเปิด Prisma Studio
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Terminal Commands</Typography>
            <IconButton onClick={() => copyToClipboard(`# เปิด Prisma Studio
npx prisma studio

# เปิดด้วย port กำหนดเอง
npx prisma studio --port 3000

# เปิดโดยไม่เปิด browser อัตโนมัติ
npx prisma studio --browser none`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`# เปิด Prisma Studio
npx prisma studio

# เปิดด้วย port กำหนดเอง
npx prisma studio --port 3000

# เปิดโดยไม่เปิด browser อัตโนมัติ
npx prisma studio --browser none`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          ✨ คุณสมบัติหลักของ Prisma Studio
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <TableView color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Visual Table Editor</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                ดูและแก้ไขข้อมูลในตารางผ่าน GUI ที่ใช้งานง่าย
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="แสดงข้อมูลแบบตาราง" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="เพิ่ม/แก้ไข/ลบข้อมูล" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Filter และ Sort" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Search color="secondary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Query Interface</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                สร้าง query แบบ visual โดยไม่ต้องเขียน code
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Visual query builder" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Real-time preview" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Export queries" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Storage color="warning" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Database Schema</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                ดู database schema และความสัมพันธ์ระหว่างตาราง
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Schema visualization" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Relation explorer" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Field information" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📝 การใช้งานเบื้องต้น
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper orientation="vertical" activeStep={-1}>
            <Step>
              <StepLabel>
                <Typography variant="h6">1. เปิด Prisma Studio</Typography>
              </StepLabel>
              <StepContent>
                <Typography>รัน <code>npx prisma studio</code> ใน terminal และเปิด browser ที่ http://localhost:5555</Typography>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="h6">2. เลือกตารางที่ต้องการ</Typography>
              </StepLabel>
              <StepContent>
                <Typography>คลิกชื่อตารางในแถบด้านซ้ายเพื่อดูข้อมูลในตาราง</Typography>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="h6">3. จัดการข้อมูล</Typography>
              </StepLabel>
              <StepContent>
                <Typography>ใช้ปุ่ม Add record เพื่อเพิ่มข้อมูล หรือคลิกเซลล์เพื่อแก้ไข</Typography>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="h6">4. กรองและค้นหา</Typography>
              </StepLabel>
              <StepContent>
                <Typography>ใช้ Filter panel เพื่อกรองข้อมูลตามเงื่อนไขที่ต้องการ</Typography>
              </StepContent>
            </Step>
          </Stepper>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>🎯 ข้อดีของ Prisma Studio</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ไม่ต้องเขียน SQL เพื่อดูข้อมูล" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="แสดง relationship ระหว่างตารางได้ชัดเจน" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ปลอดภัยกว่าการแก้ไขข้อมูลด้วย SQL โดยตรง" />
            </ListItem>
          </List>
        </Alert>
      </TabPanel>

      {/* Tab 2: Database Browser */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🗄️ Database Browser และ Data Explorer
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          Database Browser ช่วยให้เราสำรวจโครงสร้างและข้อมูลในฐานข้อมูลได้อย่างละเอียด
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📊 การสำรวจ Database Structure
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <ViewQuilt color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Tables Overview</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                ดูภาพรวมของตารางทั้งหมดในฐานข้อมูล
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="รายชื่อตารางทั้งหมด" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="จำนวน records ในแต่ละตาราง" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Column types และ constraints" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <DataObject color="secondary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Relations Explorer</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                สำรวจความสัมพันธ์ระหว่างตารางต่างๆ
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Foreign key relationships" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="One-to-one, One-to-many relations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Many-to-many through tables" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔍 การกรองและค้นหาข้อมูล
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell><strong>Filter Type</strong></TableCell>
                <TableCell><strong>การใช้งาน</strong></TableCell>
                <TableCell><strong>ตัวอย่าง</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Text Search</TableCell>
                <TableCell>ค้นหาข้อความในฟิลด์</TableCell>
                <TableCell>name contains "John"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Numeric Filter</TableCell>
                <TableCell>กรองตัวเลขตามเงื่อนไข</TableCell>
                <TableCell>age &gt; 18</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date Range</TableCell>
                <TableCell>กรองตามช่วงวันที่</TableCell>
                <TableCell>createdAt between dates</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Boolean Filter</TableCell>
                <TableCell>กรองค่า true/false</TableCell>
                <TableCell>isActive = true</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Null Check</TableCell>
                <TableCell>ตรวจสอบค่า null</TableCell>
                <TableCell>description is not null</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📈 การจัดการข้อมูลขั้นสูง
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Bulk Operations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                การดำเนินการกับข้อมูลหลายรายการพร้อมกัน:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="เลือกหลาย records และลบพร้อมกัน" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="แก้ไขค่าในหลาย records" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Export ข้อมูลเป็น CSV หรือ JSON" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Data Import/Export</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                นำเข้าและส่งออกข้อมูล:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Import จาก CSV file" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Export เป็น JSON, CSV, หรือ SQL" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Validation ข้อมูลก่อน import" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Performance Monitoring</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                ตรวจสอบประสิทธิภาพของฐานข้อมูล:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Query execution time" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Database size และ table statistics" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Connection pool status" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </TabPanel>

      {/* Tab 3: Query Builder */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🔍 Visual Query Builder
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          Query Builder ช่วยให้เราสร้าง complex queries โดยไม่ต้องเขียน code ใช้ drag-and-drop interface
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🎯 การสร้าง Query แบบ Visual
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Query Builder Interface</Typography>
            <IconButton onClick={() => copyToClipboard(`// ตัวอย่าง Query ที่สร้างจาก Visual Builder
const users = await prisma.user.findMany({
  where: {
    AND: [
      { age: { gte: 18 } },
      { isActive: true },
      {
        posts: {
          some: {
            published: true,
            createdAt: {
              gte: new Date('2024-01-01')
            }
          }
        }
      }
    ]
  },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    },
    profile: true
  },
  orderBy: { createdAt: 'desc' },
  take: 10
})`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`// ตัวอย่าง Query ที่สร้างจาก Visual Builder
const users = await prisma.user.findMany({
  where: {
    AND: [
      { age: { gte: 18 } },
      { isActive: true },
      {
        posts: {
          some: {
            published: true,
            createdAt: {
              gte: new Date('2024-01-01')
            }
          }
        }
      }
    ]
  },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    },
    profile: true
  },
  orderBy: { createdAt: 'desc' },
  take: 10
})`}
          </Box>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Search color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Where Conditions</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                สร้างเงื่อนไขการค้นหาแบบ visual
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Drag & Drop fields" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Multiple operators" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Nested conditions" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <DataObject color="secondary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Joins & Relations</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                จัดการ relationships และ joins ผ่าน GUI
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Visual join builder" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Include/select relations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Nested relation queries" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Dashboard color="warning" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Result Preview</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                ดูผลลัพธ์แบบ real-time
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Live query preview" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Execution time" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Export generated code" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          ⚡ Advanced Query Features
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'secondary.50' }}>
                <TableCell><strong>Feature</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Use Case</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Aggregations</TableCell>
                <TableCell>COUNT, SUM, AVG, MIN, MAX</TableCell>
                <TableCell>สถิติและรายงาน</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Grouping</TableCell>
                <TableCell>GROUP BY operations</TableCell>
                <TableCell>การจัดกลุ่มข้อมูล</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Subqueries</TableCell>
                <TableCell>Nested query conditions</TableCell>
                <TableCell>Query ซับซ้อน</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Window Functions</TableCell>
                <TableCell>ROW_NUMBER, RANK, etc.</TableCell>
                <TableCell>การวิเคราะห์ขั้นสูง</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Tab 4: Data Seeding */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🌱 Data Seeding - การใส่ข้อมูลเริ่มต้น
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          Data Seeding คือการใส่ข้อมูลเริ่มต้นลงในฐานข้อมูล เพื่อใช้ในการทดสอบหรือ development
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📄 การสร้าง Seed Script
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">prisma/seed.ts</Typography>
            <IconButton onClick={() => copyToClipboard(`import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // สร้าง users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: await bcrypt.hash('password123', 12),
        role: 'ADMIN',
        posts: {
          create: [
            {
              title: 'Getting Started with Prisma',
              content: 'This is a comprehensive guide...',
              published: true,
            },
            {
              title: 'Advanced Prisma Techniques',
              content: 'Learn advanced patterns...',
              published: false,
            }
          ]
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        password: await bcrypt.hash('password123', 12),
        role: 'USER',
        posts: {
          create: {
            title: 'My First Post',
            content: 'Hello world!',
            published: true,
          }
        }
      }
    })
  ])

  // สร้าง categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Technology',
        description: 'Tech-related posts'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Tutorial',
        description: 'Step-by-step guides'
      }
    })
  ])

  console.log('✅ Seed completed')
  console.log(\`Created \${users.length} users\`)
  console.log(\`Created \${categories.length} categories\`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // สร้าง users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: await bcrypt.hash('password123', 12),
        role: 'ADMIN',
        posts: {
          create: [
            {
              title: 'Getting Started with Prisma',
              content: 'This is a comprehensive guide...',
              published: true,
            },
            {
              title: 'Advanced Prisma Techniques',
              content: 'Learn advanced patterns...',
              published: false,
            }
          ]
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        password: await bcrypt.hash('password123', 12),
        role: 'USER',
        posts: {
          create: {
            title: 'My First Post',
            content: 'Hello world!',
            published: true,
          }
        }
      }
    })
  ])

  // สร้าง categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Technology',
        description: 'Tech-related posts'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Tutorial',
        description: 'Step-by-step guides'
      }
    })
  ])

  console.log('✅ Seed completed')
  console.log(\`Created \${users.length} users\`)
  console.log(\`Created \${categories.length} categories\`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          ⚙️ การตั้งค่า Package.json
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">package.json</Typography>
            <IconButton onClick={() => copyToClipboard(`{
  "name": "my-prisma-app",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma db reset --force"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`{
  "name": "my-prisma-app",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma db reset --force"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🚀 การรัน Seed Commands
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Terminal Commands</Typography>
            <IconButton onClick={() => copyToClipboard(`# รัน seed script
npm run db:seed

# หรือใช้ npx
npx prisma db seed

# Reset database และ seed ใหม่
npm run db:reset

# Seed หลัง migrate
npx prisma migrate dev --name init
# Prisma จะรัน seed อัตโนมัติหลัง migrate

# Seed แบบกำหนดเอง
npx tsx prisma/seed.ts`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`# รัน seed script
npm run db:seed

# หรือใช้ npx
npx prisma db seed

# Reset database และ seed ใหม่
npm run db:reset

# Seed หลัง migrate
npx prisma migrate dev --name init
# Prisma จะรัน seed อัตโนมัติหลัง migrate

# Seed แบบกำหนดเอง
npx tsx prisma/seed.ts`}
          </Box>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                ✅ Best Practices
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ async/await และ Promise.all" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="สร้างข้อมูลที่สมจริง" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ faker.js สำหรับข้อมูลจำลอง" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Handle errors และ cleanup" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="warning.main">
                ⚠️ ข้อควรระวัง
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="อย่ารัน seed ใน production" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="ระวัง duplicate data" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="Test seed script ก่อนใช้" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="Backup ข้อมูลก่อน reset" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Tab 5: Introspection */}
      <TabPanel value={tabValue} index={4}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🔍 Database Introspection
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          Introspection ช่วยให้เราสร้าง Prisma schema จากฐานข้อมูลที่มีอยู่แล้ว โดยอัตโนมัติ
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🎯 การใช้งาน Introspection
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Basic Introspection</Typography>
            <IconButton onClick={() => copyToClipboard(`# สร้าง Prisma schema จาก existing database
npx prisma db pull

# หรือ (เหมือนกัน)
npx prisma introspect

# Generate Prisma Client หลัง introspect
npx prisma generate

# ดู schema ที่ถูกสร้าง
cat prisma/schema.prisma`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`# สร้าง Prisma schema จาก existing database
npx prisma db pull

# หรือ (เหมือนกัน)
npx prisma introspect

# Generate Prisma Client หลัง introspect
npx prisma generate

# ดู schema ที่ถูกสร้าง
cat prisma/schema.prisma`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📋 ขั้นตอนการ Introspect
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper orientation="vertical" activeStep={-1}>
            <Step>
              <StepLabel>
                <Typography variant="h6">1. ตั้งค่า Database URL</Typography>
              </StepLabel>
              <StepContent>
                <Typography>เพิ่ม DATABASE_URL ใน .env ที่ชี้ไปยังฐานข้อมูลที่มีอยู่</Typography>
                <Box component="pre" sx={{ 
                  bgcolor: '#f5f5f5', 
                  p: 1, 
                  borderRadius: 1, 
                  mt: 1,
                  fontSize: '0.875rem'
                }}>
{`DATABASE_URL="postgresql://user:password@localhost:5432/existing_db"`}
                </Box>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="h6">2. รัน Introspection</Typography>
              </StepLabel>
              <StepContent>
                <Typography>รันคำสั่ง <code>npx prisma db pull</code> เพื่อวิเคราะห์ database structure</Typography>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="h6">3. ตรวจสอบ Schema</Typography>
              </StepLabel>
              <StepContent>
                <Typography>เปิดไฟล์ prisma/schema.prisma และตรวจสอบ models ที่ถูกสร้าง</Typography>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="h6">4. ปรับแต่ง Schema</Typography>
              </StepLabel>
              <StepContent>
                <Typography>เพิ่ม relations, validators หรือ customizations ที่จำเป็น</Typography>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>
                <Typography variant="h6">5. Generate Client</Typography>
              </StepLabel>
              <StepContent>
                <Typography>รัน <code>npx prisma generate</code> เพื่อสร้าง Prisma Client</Typography>
              </StepContent>
            </Step>
          </Stepper>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          ⚡ Advanced Introspection Features
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                🔧 Customization Options
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Settings color="primary" /></ListItemIcon>
                  <ListItemText primary="Map table names to model names" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Settings color="primary" /></ListItemIcon>
                  <ListItemText primary="Configure field naming conventions" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Settings color="primary" /></ListItemIcon>
                  <ListItemText primary="Exclude specific tables" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Settings color="primary" /></ListItemIcon>
                  <ListItemText primary="Handle complex relationships" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="warning.main">
                ⚠️ Limitations
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="ไม่สามารถ detect บาง relations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="Model names อาจไม่ตรงตามต้องการ" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="Missing business logic constraints" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="ต้องปรับแต่งเพิ่มเติมเอง" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            ตัวอย่าง Schema ที่ได้จาก Introspection
          </Typography>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`// Auto-generated by Prisma introspection
model users {
  id         Int       @id @default(autoincrement())
  email      String    @unique
  name       String?
  created_at DateTime  @default(now())
  updated_at DateTime  @updatedAt
  posts      posts[]

  @@map("users")
}

model posts {
  id         Int      @id @default(autoincrement())
  title      String
  content    String?
  published  Boolean  @default(false)
  author_id  Int
  created_at DateTime @default(now())
  users      users    @relation(fields: [author_id], references: [id])

  @@map("posts")
}`}
          </Box>
        </Paper>
      </TabPanel>

      {/* Tab 6: CLI Tools */}
      <TabPanel value={tabValue} index={5}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🛠️ Prisma CLI Tools และ Commands
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          Prisma CLI มีเครื่องมือมากมายที่ช่วยในการพัฒนาและจัดการฐานข้อมูล
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📋 คำสั่งพื้นฐาน
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell><strong>Command</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>ตัวอย่าง</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><code>prisma init</code></TableCell>
                <TableCell>เริ่มต้นโปรเจค Prisma ใหม่</TableCell>
                <TableCell>npx prisma init</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>prisma generate</code></TableCell>
                <TableCell>สร้าง Prisma Client</TableCell>
                <TableCell>npx prisma generate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>prisma db push</code></TableCell>
                <TableCell>Push schema ไปยัง database</TableCell>
                <TableCell>npx prisma db push</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>prisma db pull</code></TableCell>
                <TableCell>Pull schema จาก database</TableCell>
                <TableCell>npx prisma db pull</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>prisma studio</code></TableCell>
                <TableCell>เปิด Prisma Studio</TableCell>
                <TableCell>npx prisma studio</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>prisma migrate</code></TableCell>
                <TableCell>จัดการ database migrations</TableCell>
                <TableCell>npx prisma migrate dev</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔧 Migration Commands
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Migration Commands</Typography>
            <IconButton onClick={() => copyToClipboard(`# สร้าง migration ใหม่
npx prisma migrate dev --name add-user-table

# Apply migrations ใน production
npx prisma migrate deploy

# Reset database และ apply migrations
npx prisma migrate reset

# ดู migration status
npx prisma migrate status

# Resolve migration conflicts
npx prisma migrate resolve --rolled-back 20230101000000_migration_name

# Create migration จาก schema changes
npx prisma migrate diff \\
  --from-schema-datamodel prisma/schema.prisma \\
  --to-schema-datasource prisma/schema.prisma`)} size="small">
              <ContentCopy />
            </IconButton>
          </Stack>
          <Box component="pre" sx={{ 
            bgcolor: '#1e1e1e', 
            color: '#d4d4d4', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
{`# สร้าง migration ใหม่
npx prisma migrate dev --name add-user-table

# Apply migrations ใน production
npx prisma migrate deploy

# Reset database และ apply migrations
npx prisma migrate reset

# ดู migration status
npx prisma migrate status

# Resolve migration conflicts
npx prisma migrate resolve --rolled-back 20230101000000_migration_name

# Create migration จาก schema changes
npx prisma migrate diff \\
  --from-schema-datamodel prisma/schema.prisma \\
  --to-schema-datasource prisma/schema.prisma`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🎨 Prisma Studio Features
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Web color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Web Interface</Typography>
              </Stack>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="ทำงานผ่าน web browser" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Dark/Light theme" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Responsive design" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <DataArray color="secondary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Data Management</Typography>
              </Stack>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="CRUD operations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Bulk operations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Data validation" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <BugReport color="warning" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Development Tools</Typography>
              </Stack>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Query debugging" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Schema exploration" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Relation navigation" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>🎉 ขอแสดงความยินดี!</Typography>
          <Typography>
            คุณได้เรียนรู้การใช้ Prisma Studio และเครื่องมือต่างๆ ของ Prisma แล้ว 
            ตอนนี้คุณสามารถจัดการฐานข้อมูลได้อย่างมีประสิทธิภาพ!
          </Typography>
        </Alert>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            📚 สิ่งที่คุณได้เรียนรู้:
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="การใช้ Prisma Studio เบื้องต้น" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Database Browser และ Data Explorer" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Visual Query Builder" />
              </ListItem>
            </List>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Data Seeding เบื้องต้นและขั้นสูง" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Database Introspection" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Prisma CLI Tools ครบครัน" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </TabPanel>
    </Container>
  );
} 