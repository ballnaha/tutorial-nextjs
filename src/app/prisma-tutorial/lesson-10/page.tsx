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
  Storage,
  DataObject,
  Build,
  Speed,
  Check,
  ExpandMore,
  Warning,
  Lightbulb,
  Terminal,
  BugReport,
  TrendingUp,
  Memory,
  Psychology,
  Tune,
  Security,
  Error as ErrorIcon,
  Info,
  AutoFixHigh,
  QueryStats,
  Search,
  FilterList,
  Analytics,
  Dashboard,
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

export default function Lesson10() {
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
            <Storage sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              บทที่ 10: TypedSQL และ Raw Queries
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              การใช้ Raw SQL queries และ TypedSQL ใน Prisma 6.8+
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip icon={<Timer />} label="40 นาที" color="primary" />
          <Chip icon={<Assignment />} label="ขั้นสูง" color="error" />
          <Chip icon={<Storage />} label="Raw SQL" color="secondary" />
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>สิ่งที่จะได้เรียนรู้:</strong> Raw SQL Queries, TypedSQL, SQL Template Literals, Performance Optimization และ Complex Queries
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
          <Tab icon={<Psychology />} label="แนวคิด" {...a11yProps(0)} />
          <Tab icon={<Terminal />} label="Raw SQL" {...a11yProps(1)} />
          <Tab icon={<DataObject />} label="TypedSQL" {...a11yProps(2)} />
          <Tab icon={<Speed />} label="Performance" {...a11yProps(3)} />
          <Tab icon={<QueryStats />} label="Complex Queries" {...a11yProps(4)} />
          <Tab icon={<Build />} label="Best Practices" {...a11yProps(5)} />
        </Tabs>
      </Paper>

      {/* Tab 1: แนวคิด */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          💾 ทำความเข้าใจ TypedSQL และ Raw Queries
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          บางครั้งการใช้ Prisma Client อาจไม่เพียงพอสำหรับ queries ที่ซับซ้อน เราจึงต้องใช้ Raw SQL หรือ TypedSQL
        </Alert>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Terminal color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Raw SQL Queries</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                การเขียน SQL โดยตรงเมื่อต้องการความยืดหยุ่นสูงสุด
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="ความยืดหยุ่นในการเขียน query" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ SQL functions ขั้นสูง" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Performance optimization" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <DataObject color="secondary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">TypedSQL (Prisma 6.8+)</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" paragraph>
                SQL ที่มี type safety โดยการ generate types จาก SQL queries
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Type safety แบบ Raw SQL" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="IntelliSense และ auto-completion" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Compile-time error checking" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🤔 เมื่อไหร่ควรใช้ Raw SQL
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell><strong>สถานการณ์</strong></TableCell>
                <TableCell><strong>Prisma Client</strong></TableCell>
                <TableCell><strong>Raw SQL</strong></TableCell>
                <TableCell><strong>แนะนำ</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Simple CRUD</TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell><ErrorIcon color="error" /></TableCell>
                <TableCell>Prisma Client</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Complex Aggregations</TableCell>
                <TableCell><Warning color="warning" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell>Raw SQL / TypedSQL</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Window Functions</TableCell>
                <TableCell><ErrorIcon color="error" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell>Raw SQL / TypedSQL</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Performance Critical</TableCell>
                <TableCell><Warning color="warning" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell>Raw SQL / TypedSQL</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Database-specific Features</TableCell>
                <TableCell><ErrorIcon color="error" /></TableCell>
                <TableCell><CheckCircle color="success" /></TableCell>
                <TableCell>Raw SQL</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>⚠️ ข้อควรระวัง</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="Raw SQL ไม่มี type safety (ยกเว้น TypedSQL)" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="ต้องระวัง SQL injection" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="Database-specific syntax" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Warning color="warning" /></ListItemIcon>
              <ListItemText primary="ยากกว่าในการ maintain" />
            </ListItem>
          </List>
        </Alert>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            📚 ในบทเรียนนี้เราจะเรียนรู้:
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="การใช้ $queryRaw และ $executeRaw" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="SQL Template Literals" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="TypedSQL ใน Prisma 6.8+" />
              </ListItem>
            </List>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Performance optimization techniques" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Complex queries และ Window functions" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Security best practices" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </TabPanel>

      {/* Tab 2: Raw SQL */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🖥️ Raw SQL Queries ใน Prisma
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          Prisma มี methods สำหรับ execute Raw SQL ได้แก่ $queryRaw, $executeRaw และ $queryRawUnsafe
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📝 $queryRaw - สำหรับ SELECT queries
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Basic $queryRaw Usage</Typography>
            <IconButton onClick={() => copyToClipboard(`import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// ✅ Safe - ใช้ template literals
const users = await prisma.$queryRaw\`
  SELECT id, email, name, created_at
  FROM "User"
  WHERE age > \${minAge}
  ORDER BY created_at DESC
  LIMIT \${limit}
\`

// Type assertion สำหรับ TypeScript
type UserResult = {
  id: number
  email: string
  name: string | null
  created_at: Date
}

const typedUsers = users as UserResult[]

// ตัวอย่างการใช้งาน
const minAge = 18
const limit = 10

const adultUsers = await prisma.$queryRaw\`
  SELECT u.*, COUNT(p.id) as post_count
  FROM "User" u
  LEFT JOIN "Post" p ON u.id = p.author_id
  WHERE u.age >= \${minAge}
  GROUP BY u.id
  ORDER BY post_count DESC
  LIMIT \${limit}
\` as UserResult[]`)} size="small">
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
{`import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// ✅ Safe - ใช้ template literals
const users = await prisma.$queryRaw\`
  SELECT id, email, name, created_at
  FROM "User"
  WHERE age > \${minAge}
  ORDER BY created_at DESC
  LIMIT \${limit}
\`

// Type assertion สำหรับ TypeScript
type UserResult = {
  id: number
  email: string
  name: string | null
  created_at: Date
}

const typedUsers = users as UserResult[]

// ตัวอย่างการใช้งาน
const minAge = 18
const limit = 10

const adultUsers = await prisma.$queryRaw\`
  SELECT u.*, COUNT(p.id) as post_count
  FROM "User" u
  LEFT JOIN "Post" p ON u.id = p.author_id
  WHERE u.age >= \${minAge}
  GROUP BY u.id
  ORDER BY post_count DESC
  LIMIT \${limit}
\` as UserResult[]`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          ⚡ $executeRaw - สำหรับ INSERT, UPDATE, DELETE
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">$executeRaw Examples</Typography>
            <IconButton onClick={() => copyToClipboard(`// INSERT operation
const insertResult = await prisma.$executeRaw\`
  INSERT INTO "User" (email, name, age) 
  VALUES (\${email}, \${name}, \${age})
\`
console.log(\`Inserted \${insertResult} row(s)\`)

// UPDATE operation
const updateResult = await prisma.$executeRaw\`
  UPDATE "Post" 
  SET published = true, updated_at = NOW()
  WHERE author_id = \${authorId} AND published = false
\`
console.log(\`Updated \${updateResult} row(s)\`)

// DELETE operation
const deleteResult = await prisma.$executeRaw\`
  DELETE FROM "Comment" 
  WHERE created_at < \${cutoffDate}
\`
console.log(\`Deleted \${deleteResult} row(s)\`)

// Bulk insert with VALUES
const bulkInsertResult = await prisma.$executeRaw\`
  INSERT INTO "Tag" (name, color) VALUES 
  (\${tag1.name}, \${tag1.color}),
  (\${tag2.name}, \${tag2.color}),
  (\${tag3.name}, \${tag3.color})
\`

// Complex UPDATE with JOIN
const complexUpdate = await prisma.$executeRaw\`
  UPDATE "User" u
  SET last_post_date = (
    SELECT MAX(p.created_at)
    FROM "Post" p
    WHERE p.author_id = u.id
  )
  WHERE EXISTS (
    SELECT 1 FROM "Post" p WHERE p.author_id = u.id
  )
\``)} size="small">
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
{`// INSERT operation
const insertResult = await prisma.$executeRaw\`
  INSERT INTO "User" (email, name, age) 
  VALUES (\${email}, \${name}, \${age})
\`
console.log(\`Inserted \${insertResult} row(s)\`)

// UPDATE operation
const updateResult = await prisma.$executeRaw\`
  UPDATE "Post" 
  SET published = true, updated_at = NOW()
  WHERE author_id = \${authorId} AND published = false
\`
console.log(\`Updated \${updateResult} row(s)\`)

// DELETE operation
const deleteResult = await prisma.$executeRaw\`
  DELETE FROM "Comment" 
  WHERE created_at < \${cutoffDate}
\`
console.log(\`Deleted \${deleteResult} row(s)\`)

// Bulk insert with VALUES
const bulkInsertResult = await prisma.$executeRaw\`
  INSERT INTO "Tag" (name, color) VALUES 
  (\${tag1.name}, \${tag1.color}),
  (\${tag2.name}, \${tag2.color}),
  (\${tag3.name}, \${tag3.color})
\`

// Complex UPDATE with JOIN
const complexUpdate = await prisma.$executeRaw\`
  UPDATE "User" u
  SET last_post_date = (
    SELECT MAX(p.created_at)
    FROM "Post" p
    WHERE p.author_id = u.id
  )
  WHERE EXISTS (
    SELECT 1 FROM "Post" p WHERE p.author_id = u.id
  )
\``}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔒 SQL Injection Prevention
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="success.main">
                ✅ Safe Practices
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ template literals กับ ${variable}" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ Prisma.sql helper" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Validate input ก่อนใช้" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ $queryRaw แทน $queryRawUnsafe" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error.main">
                ❌ Unsafe Practices
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" /></ListItemIcon>
                  <ListItemText primary="String concatenation" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" /></ListItemIcon>
                  <ListItemText primary="ใช้ $queryRawUnsafe กับ user input" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" /></ListItemIcon>
                  <ListItemText primary="ไม่ validate input" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" /></ListItemIcon>
                  <ListItemText primary="Dynamic table/column names" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Safe vs Unsafe Examples</Typography>
            <IconButton onClick={() => copyToClipboard(`// ❌ UNSAFE - Don't do this!
const email = userInput.email
const unsafeQuery = await prisma.$queryRawUnsafe(\`
  SELECT * FROM "User" WHERE email = '\${email}'
\`)

// ✅ SAFE - Use template literals
const safeQuery = await prisma.$queryRaw\`
  SELECT * FROM "User" WHERE email = \${email}
\`

// ✅ SAFE - Using Prisma.sql helper
const safeSqlQuery = await prisma.$queryRaw(
  Prisma.sql\`SELECT * FROM "User" WHERE email = \${email}\`
)

// ✅ SAFE - Input validation
function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format')
  }
  return email
}

const validatedEmail = validateEmail(userInput.email)
const validatedQuery = await prisma.$queryRaw\`
  SELECT * FROM "User" WHERE email = \${validatedEmail}
\`

// ⚠️ For dynamic identifiers, use allowlist
const allowedSortColumns = ['name', 'email', 'created_at']
const sortColumn = allowedSortColumns.includes(userInput.sort) 
  ? userInput.sort 
  : 'created_at'

const dynamicQuery = await prisma.$queryRawUnsafe(\`
  SELECT * FROM "User" ORDER BY "\${sortColumn}" DESC
\`)`)} size="small">
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
{`// ❌ UNSAFE - Don't do this!
const email = userInput.email
const unsafeQuery = await prisma.$queryRawUnsafe(\`
  SELECT * FROM "User" WHERE email = '\${email}'
\`)

// ✅ SAFE - Use template literals
const safeQuery = await prisma.$queryRaw\`
  SELECT * FROM "User" WHERE email = \${email}
\`

// ✅ SAFE - Using Prisma.sql helper
const safeSqlQuery = await prisma.$queryRaw(
  Prisma.sql\`SELECT * FROM "User" WHERE email = \${email}\`
)

// ✅ SAFE - Input validation
function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format')
  }
  return email
}

const validatedEmail = validateEmail(userInput.email)
const validatedQuery = await prisma.$queryRaw\`
  SELECT * FROM "User" WHERE email = \${validatedEmail}
\`

// ⚠️ For dynamic identifiers, use allowlist
const allowedSortColumns = ['name', 'email', 'created_at']
const sortColumn = allowedSortColumns.includes(userInput.sort) 
  ? userInput.sort 
  : 'created_at'

const dynamicQuery = await prisma.$queryRawUnsafe(\`
  SELECT * FROM "User" ORDER BY "\${sortColumn}" DESC
\`)`}
          </Box>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>🎯 Raw SQL Best Practices</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ template literals สำหรับ parameters" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Validate และ sanitize input ทุกครั้ง" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ type assertions สำหรับ TypeScript" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Test queries ทั้งใน development และ production" />
            </ListItem>
          </List>
        </Alert>
      </TabPanel>

      {/* Tab 3: TypedSQL */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🎯 TypedSQL ใน Prisma 6.8+
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          TypedSQL คือฟีเจอร์ใหม่ที่ช่วยให้เราเขียน Raw SQL แต่ยังคงมี Type Safety
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔧 การตั้งค่า TypedSQL
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">schema.prisma Configuration</Typography>
            <IconButton onClick={() => copyToClipboard(`generator client {
  provider = "prisma-client-js"
  typedSql = true
}

// สร้างโฟลเดอร์ prisma/sql
// วางไฟล์ .sql ไว้ในโฟลเดอร์นี้`)}>
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
{`generator client {
  provider = "prisma-client-js"
  typedSql = true
}

// สร้างโฟลเดอร์ prisma/sql
// วางไฟล์ .sql ไว้ในโฟลเดอร์นี้`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📝 การสร้าง TypedSQL Files
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">prisma/sql/getUsersWithPosts.sql</Typography>
            <IconButton onClick={() => copyToClipboard(`-- @param {String} $1:email
-- @param {Int} $2:minAge
-- @return {UserWithPosts}
SELECT 
  u.id,
  u.email,
  u.name,
  u.age,
  u.created_at,
  COUNT(p.id) as post_count,
  ARRAY_AGG(
    JSON_BUILD_OBJECT(
      'id', p.id,
      'title', p.title,
      'published', p.published
    )
  ) FILTER (WHERE p.id IS NOT NULL) as posts
FROM "User" u
LEFT JOIN "Post" p ON u.id = p.author_id
WHERE u.email LIKE $1 AND u.age >= $2
GROUP BY u.id, u.email, u.name, u.age, u.created_at
ORDER BY post_count DESC`)}>
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
{`-- @param {String} $1:email
-- @param {Int} $2:minAge
-- @return {UserWithPosts}
SELECT 
  u.id,
  u.email,
  u.name,
  u.age,
  u.created_at,
  COUNT(p.id) as post_count,
  ARRAY_AGG(
    JSON_BUILD_OBJECT(
      'id', p.id,
      'title', p.title,
      'published', p.published
    )
  ) FILTER (WHERE p.id IS NOT NULL) as posts
FROM "User" u
LEFT JOIN "Post" p ON u.id = p.author_id
WHERE u.email LIKE $1 AND u.age >= $2
GROUP BY u.id, u.email, u.name, u.age, u.created_at
ORDER BY post_count DESC`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🚀 การใช้งาน TypedSQL
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">TypeScript Code</Typography>
            <IconButton onClick={() => copyToClipboard(`import { PrismaClient } from '@prisma/client'
import { getUsersWithPosts } from '@prisma/client/sql'

const prisma = new PrismaClient()

// ✅ Type-safe SQL query
const users = await prisma.$queryRawTyped(
  getUsersWithPosts('%@gmail.com', 18)
)

// TypeScript จะรู้ type ของ users อัตโนมัติ
users.forEach(user => {
  console.log(\`User: \${user.name} has \${user.post_count} posts\`)
  user.posts?.forEach(post => {
    console.log(\`  - \${post.title} (\${post.published ? 'Published' : 'Draft'})\`)
  })
})

// Type inference ทำงานได้เต็มที่
const firstUser = users[0]
if (firstUser) {
  // TypeScript รู้ว่า firstUser มี properties อะไรบ้าง
  const userName: string = firstUser.name
  const userAge: number = firstUser.age
  const postCount: number = firstUser.post_count
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
{`import { PrismaClient } from '@prisma/client'
import { getUsersWithPosts } from '@prisma/client/sql'

const prisma = new PrismaClient()

// ✅ Type-safe SQL query
const users = await prisma.$queryRawTyped(
  getUsersWithPosts('%@gmail.com', 18)
)

// TypeScript จะรู้ type ของ users อัตโนมัติ
users.forEach(user => {
  console.log(\`User: \${user.name} has \${user.post_count} posts\`)
  user.posts?.forEach(post => {
    console.log(\`  - \${post.title} (\${post.published ? 'Published' : 'Draft'})\`)
  })
})

// Type inference ทำงานได้เต็มที่
const firstUser = users[0]
if (firstUser) {
  // TypeScript รู้ว่า firstUser มี properties อะไรบ้าง
  const userName: string = firstUser.name
  const userAge: number = firstUser.age
  const postCount: number = firstUser.post_count
}`}
          </Box>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                ✅ ข้อดีของ TypedSQL
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Type safety แบบ compile-time" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="IntelliSense และ auto-completion" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ตรวจสอบ parameter types" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="SQL syntax validation" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="warning.main">
                ⚠️ ข้อจำกัด
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="ต้องใช้ Prisma 6.8 ขึ้นไป" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="ยังอยู่ในช่วง Preview" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="ต้อง generate client ใหม่เมื่อแก้ไข SQL" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="รองรับเฉพาะ PostgreSQL และ MySQL" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Tab 4: Performance */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          ⚡ Performance Optimization
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          การเพิ่มประสิทธิภาพของ Raw SQL queries และเทคนิคการ optimize
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📊 Query Performance Analysis
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">EXPLAIN ANALYZE Example</Typography>
            <IconButton onClick={() => copyToClipboard(`// การวิเคราะห์ query performance
const analyzeQuery = async () => {
  // 1. ใช้ EXPLAIN ANALYZE
  const queryPlan = await prisma.$queryRaw\`
    EXPLAIN ANALYZE
    SELECT u.*, COUNT(p.id) as post_count
    FROM "User" u
    LEFT JOIN "Post" p ON u.id = p.author_id
    WHERE u.created_at >= \${new Date('2024-01-01')}
    GROUP BY u.id
    ORDER BY post_count DESC
    LIMIT 10
  \`
  
  console.log('Query Plan:', queryPlan)
  
  // 2. วัดเวลาใน JavaScript
  console.time('query-execution')
  const result = await prisma.$queryRaw\`
    SELECT u.*, COUNT(p.id) as post_count
    FROM "User" u
    LEFT JOIN "Post" p ON u.id = p.author_id
    WHERE u.created_at >= \${new Date('2024-01-01')}
    GROUP BY u.id
    ORDER BY post_count DESC
    LIMIT 10
  \`
  console.timeEnd('query-execution')
  
  return result
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
{`// การวิเคราะห์ query performance
const analyzeQuery = async () => {
  // 1. ใช้ EXPLAIN ANALYZE
  const queryPlan = await prisma.$queryRaw\`
    EXPLAIN ANALYZE
    SELECT u.*, COUNT(p.id) as post_count
    FROM "User" u
    LEFT JOIN "Post" p ON u.id = p.author_id
    WHERE u.created_at >= \${new Date('2024-01-01')}
    GROUP BY u.id
    ORDER BY post_count DESC
    LIMIT 10
  \`
  
  console.log('Query Plan:', queryPlan)
  
  // 2. วัดเวลาใน JavaScript
  console.time('query-execution')
  const result = await prisma.$queryRaw\`
    SELECT u.*, COUNT(p.id) as post_count
    FROM "User" u
    LEFT JOIN "Post" p ON u.id = p.author_id
    WHERE u.created_at >= \${new Date('2024-01-01')}
    GROUP BY u.id
    ORDER BY post_count DESC
    LIMIT 10
  \`
  console.timeEnd('query-execution')
  
  return result
}`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🎯 Optimization Techniques
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Speed color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Indexing</Typography>
              </Stack>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="สร้าง indexes สำหรับ WHERE clauses" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Composite indexes สำหรับ multiple columns" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Partial indexes สำหรับ filtered data" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Memory color="secondary" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Query Structure</Typography>
              </Stack>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ LIMIT เมื่อเป็นไปได้" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="SELECT เฉพาะ columns ที่ต้องการ" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="หลีกเลี่ยง N+1 queries" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Analytics color="warning" sx={{ fontSize: 32 }} />
                <Typography variant="h6">Caching</Typography>
              </Stack>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Application-level caching" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Database query cache" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Connection pooling" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>🎯 Performance Tips</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ EXPLAIN ANALYZE เพื่อวิเคราะห์ query plan" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Monitor slow queries และแก้ไขปัญหา" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ pagination สำหรับ large datasets" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Consider denormalization สำหรับ read-heavy workloads" />
            </ListItem>
          </List>
        </Alert>
      </TabPanel>

      {/* Tab 4: Complex Queries */}
      <TabPanel value={tabValue} index={4}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🔍 Complex Queries และ Advanced SQL
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          การใช้ Advanced SQL features ที่ Prisma Client ไม่สามารถทำได้
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📊 Window Functions
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Window Functions Examples</Typography>
            <IconButton onClick={() => copyToClipboard(`// Ranking functions
const userRankings = await prisma.$queryRaw\`
  SELECT 
    id,
    name,
    email,
    post_count,
    ROW_NUMBER() OVER (ORDER BY post_count DESC) as rank,
    RANK() OVER (ORDER BY post_count DESC) as dense_rank,
    NTILE(4) OVER (ORDER BY post_count DESC) as quartile
  FROM (
    SELECT 
      u.id,
      u.name,
      u.email,
      COUNT(p.id) as post_count
    FROM "User" u
    LEFT JOIN "Post" p ON u.id = p.author_id
    GROUP BY u.id, u.name, u.email
  ) user_stats
  ORDER BY post_count DESC
\`

// Moving averages
const movingAverages = await prisma.$queryRaw\`
  SELECT 
    date_trunc('day', created_at) as day,
    COUNT(*) as daily_posts,
    AVG(COUNT(*)) OVER (
      ORDER BY date_trunc('day', created_at)
      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as seven_day_avg
  FROM "Post"
  WHERE created_at >= \${new Date('2024-01-01')}
  GROUP BY date_trunc('day', created_at)
  ORDER BY day
\`

// Lag/Lead functions
const userGrowth = await prisma.$queryRaw\`
  SELECT 
    month,
    user_count,
    LAG(user_count) OVER (ORDER BY month) as prev_month,
    user_count - LAG(user_count) OVER (ORDER BY month) as growth,
    ROUND(
      ((user_count::float - LAG(user_count) OVER (ORDER BY month)) / 
       LAG(user_count) OVER (ORDER BY month)) * 100, 2
    ) as growth_percentage
  FROM (
    SELECT 
      date_trunc('month', created_at) as month,
      COUNT(*) as user_count
    FROM "User"
    GROUP BY date_trunc('month', created_at)
  ) monthly_stats
  ORDER BY month
\``)} size="small">
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
{`// Ranking functions
const userRankings = await prisma.$queryRaw\`
  SELECT 
    id,
    name,
    email,
    post_count,
    ROW_NUMBER() OVER (ORDER BY post_count DESC) as rank,
    RANK() OVER (ORDER BY post_count DESC) as dense_rank,
    NTILE(4) OVER (ORDER BY post_count DESC) as quartile
  FROM (
    SELECT 
      u.id,
      u.name,
      u.email,
      COUNT(p.id) as post_count
    FROM "User" u
    LEFT JOIN "Post" p ON u.id = p.author_id
    GROUP BY u.id, u.name, u.email
  ) user_stats
  ORDER BY post_count DESC
\`

// Moving averages
const movingAverages = await prisma.$queryRaw\`
  SELECT 
    date_trunc('day', created_at) as day,
    COUNT(*) as daily_posts,
    AVG(COUNT(*)) OVER (
      ORDER BY date_trunc('day', created_at)
      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as seven_day_avg
  FROM "Post"
  WHERE created_at >= \${new Date('2024-01-01')}
  GROUP BY date_trunc('day', created_at)
  ORDER BY day
\`

// Lag/Lead functions
const userGrowth = await prisma.$queryRaw\`
  SELECT 
    month,
    user_count,
    LAG(user_count) OVER (ORDER BY month) as prev_month,
    user_count - LAG(user_count) OVER (ORDER BY month) as growth,
    ROUND(
      ((user_count::float - LAG(user_count) OVER (ORDER BY month)) / 
       LAG(user_count) OVER (ORDER BY month)) * 100, 2
    ) as growth_percentage
  FROM (
    SELECT 
      date_trunc('month', created_at) as month,
      COUNT(*) as user_count
    FROM "User"
    GROUP BY date_trunc('month', created_at)
  ) monthly_stats
  ORDER BY month
\``}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔗 Common Table Expressions (CTEs)
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">CTE Examples</Typography>
            <IconButton onClick={() => copyToClipboard(`// Recursive CTE for hierarchical data
const categoryHierarchy = await prisma.$queryRaw\`
  WITH RECURSIVE category_tree AS (
    -- Base case: root categories
    SELECT 
      id, 
      name, 
      parent_id, 
      0 as level,
      ARRAY[name] as path
    FROM "Category" 
    WHERE parent_id IS NULL
    
    UNION ALL
    
    -- Recursive case: child categories
    SELECT 
      c.id, 
      c.name, 
      c.parent_id,
      ct.level + 1,
      ct.path || c.name
    FROM "Category" c
    JOIN category_tree ct ON c.parent_id = ct.id
  )
  SELECT * FROM category_tree
  ORDER BY path
\`

// Complex analytics with multiple CTEs
const userAnalytics = await prisma.$queryRaw\`
  WITH user_stats AS (
    SELECT 
      u.id,
      u.name,
      u.email,
      u.created_at,
      COUNT(p.id) as post_count,
      COUNT(CASE WHEN p.published = true THEN 1 END) as published_count
    FROM "User" u
    LEFT JOIN "Post" p ON u.id = p.author_id
    GROUP BY u.id, u.name, u.email, u.created_at
  ),
  user_categories AS (
    SELECT 
      us.*,
      CASE 
        WHEN us.post_count = 0 THEN 'Inactive'
        WHEN us.post_count <= 5 THEN 'Beginner'
        WHEN us.post_count <= 20 THEN 'Active'
        ELSE 'Power User'
      END as user_category
    FROM user_stats us
  )
  SELECT 
    user_category,
    COUNT(*) as user_count,
    AVG(post_count) as avg_posts,
    AVG(published_count) as avg_published
  FROM user_categories
  GROUP BY user_category
  ORDER BY avg_posts DESC
\``)} size="small">
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
{`// Recursive CTE for hierarchical data
const categoryHierarchy = await prisma.$queryRaw\`
  WITH RECURSIVE category_tree AS (
    -- Base case: root categories
    SELECT 
      id, 
      name, 
      parent_id, 
      0 as level,
      ARRAY[name] as path
    FROM "Category" 
    WHERE parent_id IS NULL
    
    UNION ALL
    
    -- Recursive case: child categories
    SELECT 
      c.id, 
      c.name, 
      c.parent_id,
      ct.level + 1,
      ct.path || c.name
    FROM "Category" c
    JOIN category_tree ct ON c.parent_id = ct.id
  )
  SELECT * FROM category_tree
  ORDER BY path
\`

// Complex analytics with multiple CTEs
const userAnalytics = await prisma.$queryRaw\`
  WITH user_stats AS (
    SELECT 
      u.id,
      u.name,
      u.email,
      u.created_at,
      COUNT(p.id) as post_count,
      COUNT(CASE WHEN p.published = true THEN 1 END) as published_count
    FROM "User" u
    LEFT JOIN "Post" p ON u.id = p.author_id
    GROUP BY u.id, u.name, u.email, u.created_at
  ),
  user_categories AS (
    SELECT 
      us.*,
      CASE 
        WHEN us.post_count = 0 THEN 'Inactive'
        WHEN us.post_count <= 5 THEN 'Beginner'
        WHEN us.post_count <= 20 THEN 'Active'
        ELSE 'Power User'
      END as user_category
    FROM user_stats us
  )
  SELECT 
    user_category,
    COUNT(*) as user_count,
    AVG(post_count) as avg_posts,
    AVG(published_count) as avg_published
  FROM user_categories
  GROUP BY user_category
  ORDER BY avg_posts DESC
\``}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📈 Advanced Aggregations
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell><strong>Function</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Use Case</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>PERCENTILE_CONT</TableCell>
                <TableCell>คำนวณ percentile แบบ continuous</TableCell>
                <TableCell>หา median, quartiles</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>STRING_AGG</TableCell>
                <TableCell>รวม strings เป็น single string</TableCell>
                <TableCell>สร้าง comma-separated lists</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ARRAY_AGG</TableCell>
                <TableCell>รวมค่าเป็น array</TableCell>
                <TableCell>สร้าง nested data structures</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>FILTER</TableCell>
                <TableCell>กรองข้อมูลใน aggregation</TableCell>
                <TableCell>Conditional aggregations</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Tab 5: Best Practices */}
      <TabPanel value={tabValue} index={5}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🎯 Best Practices และเทคนิคขั้นสูง
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          แนวทางที่ดีที่สุดในการใช้ Raw SQL และ TypedSQL ใน production
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔒 Security Best Practices
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="success.main">
                ✅ Security Guidelines
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Security color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ parameterized queries เสมอ" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Security color="success" /></ListItemIcon>
                  <ListItemText primary="Validate input data types และ ranges" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Security color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ allowlists สำหรับ dynamic identifiers" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Security color="success" /></ListItemIcon>
                  <ListItemText primary="Log และ monitor suspicious queries" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Security color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ database permissions อย่างเหมาะสม" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error.main">
                ❌ Security Anti-patterns
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" /></ListItemIcon>
                  <ListItemText primary="String concatenation กับ user input" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" /></ListItemIcon>
                  <ListItemText primary="ใช้ $queryRawUnsafe กับ dynamic data" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" /></ListItemIcon>
                  <ListItemText primary="ไม่ validate input formats" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" /></ListItemIcon>
                  <ListItemText primary="Expose database errors ให้ users" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ErrorIcon color="error" /></ListItemIcon>
                  <ListItemText primary="ใช้ admin privileges สำหรับ app queries" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🧪 Testing Raw SQL Queries
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Testing Strategies</Typography>
            <IconButton onClick={() => copyToClipboard(`// 1. Unit testing with mock data
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

describe('Raw SQL Queries', () => {
  let prismaMock: DeepMockProxy<PrismaClient>
  
  beforeEach(() => {
    prismaMock = mockDeep<PrismaClient>()
    mockReset(prismaMock)
  })

  it('should return user analytics', async () => {
    const mockResult = [
      { user_category: 'Active', user_count: 10, avg_posts: 15.5 }
    ]
    
    prismaMock.$queryRaw.mockResolvedValue(mockResult)
    
    const result = await getUserAnalytics(prismaMock)
    expect(result).toEqual(mockResult)
  })
})

// 2. Integration testing
describe('Integration Tests', () => {
  it('should handle complex user analytics query', async () => {
    // Setup test data
    await prisma.user.createMany({
      data: [
        { email: 'test1@example.com', name: 'User 1' },
        { email: 'test2@example.com', name: 'User 2' }
      ]
    })
    
    // Test the query
    const result = await getUserAnalytics(prisma)
    
    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('user_category')
    expect(result[0]).toHaveProperty('user_count')
  })
})

// 3. Performance testing
describe('Performance Tests', () => {
  it('should complete within acceptable time', async () => {
    const startTime = Date.now()
    
    await prisma.$queryRaw\`
      SELECT COUNT(*) FROM "User"
      WHERE created_at >= \${new Date('2024-01-01')}
    \`
    
    const executionTime = Date.now() - startTime
    expect(executionTime).toBeLessThan(1000) // 1 second
  })
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
{`// 1. Unit testing with mock data
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

describe('Raw SQL Queries', () => {
  let prismaMock: DeepMockProxy<PrismaClient>
  
  beforeEach(() => {
    prismaMock = mockDeep<PrismaClient>()
    mockReset(prismaMock)
  })

  it('should return user analytics', async () => {
    const mockResult = [
      { user_category: 'Active', user_count: 10, avg_posts: 15.5 }
    ]
    
    prismaMock.$queryRaw.mockResolvedValue(mockResult)
    
    const result = await getUserAnalytics(prismaMock)
    expect(result).toEqual(mockResult)
  })
})

// 2. Integration testing
describe('Integration Tests', () => {
  it('should handle complex user analytics query', async () => {
    // Setup test data
    await prisma.user.createMany({
      data: [
        { email: 'test1@example.com', name: 'User 1' },
        { email: 'test2@example.com', name: 'User 2' }
      ]
    })
    
    // Test the query
    const result = await getUserAnalytics(prisma)
    
    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty('user_category')
    expect(result[0]).toHaveProperty('user_count')
  })
})

// 3. Performance testing
describe('Performance Tests', () => {
  it('should complete within acceptable time', async () => {
    const startTime = Date.now()
    
    await prisma.$queryRaw\`
      SELECT COUNT(*) FROM "User"
      WHERE created_at >= \${new Date('2024-01-01')}
    \`
    
    const executionTime = Date.now() - startTime
    expect(executionTime).toBeLessThan(1000) // 1 second
  })
})`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📊 Monitoring และ Debugging
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Query Logging</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                การติดตาม query performance และ debugging:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="เปิด Prisma query logging" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="ใช้ database slow query logs" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Implement custom query metrics" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Monitor connection pool usage" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">Error Handling</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                การจัดการ errors อย่างเหมาะสม:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Catch และ log database errors" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="ไม่ expose sensitive information" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Implement retry logic สำหรับ transient errors" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="primary" /></ListItemIcon>
                  <ListItemText primary="Graceful degradation เมื่อ database unavailable" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>🎉 ขอแสดงความยินดี!</Typography>
          <Typography>
            คุณได้เรียนรู้การใช้ TypedSQL และ Raw Queries ใน Prisma แล้ว 
            ตอนนี้คุณสามารถสร้าง complex queries ที่มี type safety และ performance สูงได้!
          </Typography>
        </Alert>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            สิ่งที่คุณได้เรียนรู้:
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Raw SQL Queries ด้วย $queryRaw และ $executeRaw" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="TypedSQL ใน Prisma 6.8+" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="SQL injection prevention" />
              </ListItem>
            </List>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Performance optimization techniques" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Complex queries และ Window functions" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Testing และ monitoring strategies" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </TabPanel>
      
    </Container>
  );
}
