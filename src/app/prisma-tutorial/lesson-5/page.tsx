'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Tab,
  Tabs,
  Card,
  CardContent,
  Stack,
  Avatar,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  Terminal,
  Folder,
  PlayArrow,
  ExpandMore,
  Lightbulb,
  Warning,
  ArrowBack,
  ArrowForward,
  Schema,
  Build,
  Speed,
  Assignment,
  Timer,
  ContentCopy,
  Link as LinkIcon,
  Settings,
  Security,
  AccountTree,
  Storage,
  Architecture,
  DataObject,
  Category,
  Psychology,
  Sync,
  History,
  CloudSync,
  Backup,
  RestoreFromTrash,
  Update,
  Check,
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

const migrationSteps = [
  {
    operation: 'สร้าง Migration',
    description: 'การสร้างไฟล์ migration จากการเปลี่ยนแปลง schema',
    icon: <Build />,
    commands: ['prisma migrate dev', 'prisma db push'],
    difficulty: 'ง่าย',
    color: 'success'
  },
  {
    operation: 'ตรวจสอบ Migration',
    description: 'การดู history และสถานะของ migrations',
    icon: <History />,
    commands: ['prisma migrate status', 'prisma migrate diff'],
    difficulty: 'ง่าย',
    color: 'info'
  },
  {
    operation: 'Deploy Migration',
    description: 'การนำ migration ไปใช้ใน production',
    icon: <CloudSync />,
    commands: ['prisma migrate deploy', 'prisma migrate resolve'],
    difficulty: 'ปานกลาง',
    color: 'warning'
  },
  {
    operation: 'Reset Database',
    description: 'การรีเซ็ตฐานข้อมูลและสร้างใหม่',
    icon: <RestoreFromTrash />,
    commands: ['prisma migrate reset', 'prisma db seed'],
    difficulty: 'ขั้นสูง',
    color: 'error'
  }
];

const codeExamples = {
  basicMigration: `// 1. แก้ไข schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  // เพิ่ม field ใหม่
  phone     String?  
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// 2. สร้าง migration
npx prisma migrate dev --name add-phone-and-active-fields

// 3. Prisma จะสร้างไฟล์ migration ใน prisma/migrations/
// ไฟล์จะมีชื่อแบบ: 20231201120000_add_phone_and_active_fields/migration.sql`,

  migrationFile: `-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");`,

  migrationCommands: `# การสร้าง migration ใหม่
npx prisma migrate dev --name "ชื่อ-migration"

# การดูสถานะ migration
npx prisma migrate status

# การ deploy migration ใน production
npx prisma migrate deploy

# การรีเซ็ต database (ระวัง! จะลบข้อมูลทั้งหมด)
npx prisma migrate reset

# การ push schema โดยไม่สร้าง migration (สำหรับ development)
npx prisma db push

# การสร้าง migration จาก database ที่มีอยู่
npx prisma db pull`,

  productionMigration: `// การ deploy ใน production environment

// 1. ตั้งค่า environment variables
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

// 2. ตรวจสอบสถานะ migration
npx prisma migrate status

// 3. Deploy migrations
npx prisma migrate deploy

// 4. Generate Prisma Client
npx prisma generate

// 5. ตัวอย่าง deployment script (package.json)
{
  "scripts": {
    "deploy": "prisma migrate deploy && prisma generate",
    "postinstall": "prisma generate"
  }
}`,

  seedData: `// prisma/seed.ts - การเพิ่มข้อมูลเริ่มต้น
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ลบข้อมูลเก่า
  await prisma.user.deleteMany()
  
  // เพิ่มข้อมูลใหม่
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        name: 'Admin User',
        phone: '081-234-5678',
        isActive: true
      },
      {
        email: 'user1@example.com',
        name: 'John Doe',
        phone: '081-111-2222',
        isActive: true
      },
      {
        email: 'user2@example.com',
        name: 'Jane Smith',
        phone: '081-333-4444',
        isActive: false
      }
    ]
  })
  
  console.log(\`Created \${users.count} users\`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// package.json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}`,

  troubleshooting: `// การแก้ไขปัญหา Migration ที่พบบ่อย

// 1. Migration ล้มเหลว - ต้อง resolve manually
npx prisma migrate resolve --applied "20231201120000_migration_name"

// 2. Schema drift - schema ไม่ตรงกับ database
npx prisma db push --force-reset

// 3. การ rollback migration (ไม่มี built-in command)
// ต้องสร้าง migration ใหม่เพื่อ revert การเปลี่ยนแปลง

// 4. การ backup ก่อน migration
pg_dump mydb > backup_before_migration.sql

// 5. การตรวจสอบ diff ระหว่าง schema และ database
npx prisma migrate diff \\
  --from-schema-datamodel prisma/schema.prisma \\
  --to-schema-datasource prisma/schema.prisma`
};

export default function PrismaLesson5Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCopyCode = (code: string, codeType: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(codeType);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const steps = [
    'ทำความเข้าใจ Migration',
    'การสร้าง Migration แรก',
    'การจัดการ Migration Files',
    'Production Deployment',
    'Troubleshooting'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <Sync />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              บทที่ 5: Migrations และ Database Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              เรียนรู้การจัดการการเปลี่ยนแปลงโครงสร้างฐานข้อมูลด้วย Prisma Migrate
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip icon={<Timer />} label="25 นาที" color="primary" />
          <Chip icon={<Assignment />} label="ปานกลาง" color="warning" />
          <Chip icon={<Code />} label="Hands-on" color="success" />
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Migration</strong> คือการจัดการการเปลี่ยนแปลงโครงสร้างฐานข้อมูลอย่างเป็นระบบ 
            ช่วยให้เราสามารถติดตามและควบคุมการเปลี่ยนแปลงได้อย่างปลอดภัย
          </Typography>
        </Alert>
      </Box>

      {/* Navigation */}
      <Paper sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab icon={<Psychology />} label="แนวคิด" />
          <Tab icon={<Build />} label="การสร้าง Migration" />
          <Tab icon={<History />} label="การจัดการ" />
          <Tab icon={<CloudSync />} label="Production" />
          <Tab icon={<Settings />} label="Best Practices" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🧠 ทำความเข้าใจ Database Migration
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>คำเตือน:</strong> การทำ Migration ในฐานข้อมูลที่มีข้อมูลจริงต้องระมัดระวัง 
            ควร backup ข้อมูลก่อนเสมอ!
          </Typography>
        </Alert>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          {migrationSteps.map((step, index) => (
            <Card key={index} sx={{ height: '100%', border: `2px solid`, borderColor: `${step.color}.main` }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${step.color}.main` }}>
                    {step.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {step.operation}
                    </Typography>
                    <Chip 
                      label={step.difficulty} 
                      size="small" 
                      color={step.color as 'success' | 'info' | 'warning' | 'error'} 
                    />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {step.description}
                </Typography>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                    คำสั่งที่ใช้:
                  </Typography>
                  {step.commands.map((cmd, i) => (
                    <Chip key={i} label={cmd} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            💡 Migration คืออะไร?
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="การเปลี่ยนแปลงโครงสร้างฐานข้อมูลอย่างเป็นระบบ"
                secondary="เช่น เพิ่มตาราง, เพิ่มคอลัมน์, เปลี่ยนชนิดข้อมูล"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="ติดตามประวัติการเปลี่ยนแปลงทั้งหมด"
                secondary="สามารถดูได้ว่าใครเปลี่ยนอะไรเมื่อไหร่"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="ทำงานร่วมกับทีมได้อย่างปลอดภัย"
                secondary="ทุกคนมี database schema เหมือนกัน"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Deploy ไปยัง production ได้อย่างมั่นใจ"
                secondary="ทดสอบใน development ก่อนแล้ว"
              />
            </ListItem>
          </List>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🔨 การสร้าง Migration แรก
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>แก้ไข Schema</StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                เริ่มต้นด้วยการแก้ไขไฟล์ <code>schema.prisma</code>
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white', mb: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="caption" color="grey.400">schema.prisma</Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => handleCopyCode(codeExamples.basicMigration, 'basicMigration')}
                    sx={{ color: 'white' }}
                  >
                    {copiedCode === 'basicMigration' ? <Check /> : <ContentCopy />}
                  </IconButton>
                </Stack>
                <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
                  {codeExamples.basicMigration}
                </pre>
              </Paper>
              <Button variant="contained" onClick={() => setActiveStep(1)}>
                ถัดไป
              </Button>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>รัน Migration Command</StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                ใช้คำสั่ง <code>prisma migrate dev</code> เพื่อสร้าง migration
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white', mb: 2 }}>
                <pre style={{ margin: 0, fontSize: '0.875rem' }}>
                  npx prisma migrate dev --name add-phone-and-active-fields
                </pre>
              </Paper>
              <Alert severity="info" sx={{ mb: 2 }}>
                Prisma จะ:
                <List dense>
                  <ListItem><ListItemText primary="1. สร้างไฟล์ SQL migration" /></ListItem>
                  <ListItem><ListItemText primary="2. รัน migration กับฐานข้อมูล" /></ListItem>
                  <ListItem><ListItemText primary="3. Generate Prisma Client ใหม่" /></ListItem>
                </List>
              </Alert>
              <Stack direction="row" spacing={2}>
                <Button onClick={() => setActiveStep(0)}>ย้อนกลับ</Button>
                <Button variant="contained" onClick={() => setActiveStep(2)}>ถัดไป</Button>
              </Stack>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>ตรวจสอบไฟล์ Migration</StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Prisma จะสร้างไฟล์ SQL ใน <code>prisma/migrations/</code>
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white', mb: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="caption" color="grey.400">migration.sql</Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => handleCopyCode(codeExamples.migrationFile, 'migrationFile')}
                    sx={{ color: 'white' }}
                  >
                    {copiedCode === 'migrationFile' ? <Check /> : <ContentCopy />}
                  </IconButton>
                </Stack>
                <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
                  {codeExamples.migrationFile}
                </pre>
              </Paper>
              <Stack direction="row" spacing={2}>
                <Button onClick={() => setActiveStep(1)}>ย้อนกลับ</Button>
                <Button variant="contained" onClick={() => setActiveStep(3)}>ถัดไป</Button>
              </Stack>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>ทดสอบการทำงาน</StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                ทดสอบว่า migration ทำงานถูกต้อง
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white', mb: 2 }}>
                <pre style={{ margin: 0, fontSize: '0.875rem' }}>
{`// ทดสอบสร้างข้อมูลใหม่
const user = await prisma.user.create({
  data: {
    email: 'test@example.com',
    name: 'Test User',
    phone: '081-234-5678',  // field ใหม่
    isActive: true          // field ใหม่
  }
})

console.log('User created:', user)`}
                </pre>
              </Paper>
              <Stack direction="row" spacing={2}>
                <Button onClick={() => setActiveStep(2)}>ย้อนกลับ</Button>
                <Button variant="contained" color="success">เสร็จสิ้น</Button>
              </Stack>
            </StepContent>
          </Step>
        </Stepper>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          📋 การจัดการ Migration Files
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            คำสั่งที่ใช้บ่อย
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Terminal Commands</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.migrationCommands, 'migrationCommands')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'migrationCommands' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.migrationCommands}
            </pre>
          </Paper>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            การเพิ่มข้อมูลเริ่มต้น (Seeding)
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            การเพิ่มข้อมูลตัวอย่างหรือข้อมูลเริ่มต้นที่จำเป็น
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">prisma/seed.ts</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.seedData, 'seedData')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'seedData' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.seedData}
            </pre>
          </Paper>
        </Paper>

        <Alert severity="warning">
          <Typography variant="body2">
            <strong>ข้อควรระวัง:</strong> การใช้ <code>prisma migrate reset</code> จะลบข้อมูลทั้งหมดในฐานข้อมูล 
            ใช้เฉพาะใน development environment เท่านั้น!
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🚀 Production Deployment
        </Typography>

        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>สำคัญมาก:</strong> ใน production ห้ามใช้ <code>prisma migrate dev</code> 
            ต้องใช้ <code>prisma migrate deploy</code> เท่านั้น!
          </Typography>
        </Alert>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            ขั้นตอนการ Deploy
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Production Deployment</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.productionMigration, 'productionMigration')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'productionMigration' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.productionMigration}
            </pre>
          </Paper>
        </Paper>

        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Environment</strong></TableCell>
                <TableCell><strong>คำสั่งที่ใช้</strong></TableCell>
                <TableCell><strong>คำอธิบาย</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Development</TableCell>
                <TableCell><code>prisma migrate dev</code></TableCell>
                <TableCell>สร้างและรัน migration พร้อม generate client</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Production</TableCell>
                <TableCell><code>prisma migrate deploy</code></TableCell>
                <TableCell>รัน migration ที่มีอยู่แล้วเท่านั้น</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Testing</TableCell>
                <TableCell><code>prisma db push</code></TableCell>
                <TableCell>Push schema โดยไม่สร้าง migration file</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🛠️ Best Practices และ Troubleshooting
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            การแก้ไขปัญหาที่พบบ่อย
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Troubleshooting</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.troubleshooting, 'troubleshooting')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'troubleshooting' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.troubleshooting}
            </pre>
          </Paper>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="success.main">
                ✅ ควรทำ
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Backup ฐานข้อมูลก่อน migrate" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ทดสอบ migration ใน development ก่อน" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ชื่อ migration ที่อธิบายได้" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="เก็บ migration files ใน version control" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ตรวจสอบ migration status เป็นประจำ" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="error.main">
                ❌ ไม่ควรทำ
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="แก้ไข migration files ที่ deploy แล้ว" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="ใช้ migrate dev ใน production" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="ลบ migration files โดยไม่จำเป็น" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="Skip การทดสอบ migration" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="ใช้ db push ใน production" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Navigation */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          component={Link}
          href="/prisma-tutorial/lesson-4"
          startIcon={<ArrowBack />}
          variant="outlined"
        >
          บทที่ 4: Relations
        </Button>
        <Button
          component={Link}
          href="/prisma-tutorial"
          variant="contained"
        >
          กลับหน้าหลัก
        </Button>
      </Box>
    </Container>
  );
} 