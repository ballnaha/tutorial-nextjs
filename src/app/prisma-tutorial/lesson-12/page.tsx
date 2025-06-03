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
  Science,
  PlayArrow,
  CloudUpload,
  MonitorHeart,
  Settings,
  Cloud,
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

export default function Lesson12() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
            <CloudUpload sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              บทที่ 12: Deployment และ Production
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              การ deploy Prisma application ใน production environments
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip icon={<Timer />} label="50 นาที" color="primary" />
          <Chip icon={<Assignment />} label="ขั้นสูง" color="error" />
          <Chip icon={<CloudUpload />} label="Production" color="secondary" />
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>สิ่งที่จะได้เรียนรู้:</strong> Environment Setup, Migration Deployment, Security Best Practices, Monitoring และ Performance Optimization
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
          <Tab icon={<Settings />} label="Environment Setup" {...a11yProps(0)} />
          <Tab icon={<CloudUpload />} label="Migration Deployment" {...a11yProps(1)} />
          <Tab icon={<Security />} label="Security" {...a11yProps(2)} />
          <Tab icon={<MonitorHeart />} label="Monitoring" {...a11yProps(3)} />
          <Tab icon={<Speed />} label="Performance" {...a11yProps(4)} />
          <Tab icon={<CheckCircle />} label="Best Practices" {...a11yProps(5)} />
        </Tabs>
      </Paper>

      {/* Tab 1: Environment Setup */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🌐 Environment Setup
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          การตั้งค่า environment ที่ถูกต้องเป็นพื้นฐานสำคัญของ production deployment
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔧 Environment Variables
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">.env.production</Typography>
            <IconButton onClick={() => copyToClipboard(`# Database
DATABASE_URL="postgresql://user:password@host:5432/production_db"
SHADOW_DATABASE_URL="postgresql://user:password@host:5432/shadow_db"

# Connection Pool
DATABASE_POOL_SIZE=20
DATABASE_TIMEOUT=30000

# Application
NODE_ENV=production
PORT=3000

# Security
JWT_SECRET=your-super-secure-jwt-secret
ENCRYPTION_KEY=your-32-character-encryption-key

# Monitoring
LOG_LEVEL=info
SENTRY_DSN=your-sentry-dsn

# Cloud Services
AWS_REGION=ap-southeast-1
REDIS_URL=redis://cache:6379`)}>
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
{`# Database
DATABASE_URL="postgresql://user:password@host:5432/production_db"
SHADOW_DATABASE_URL="postgresql://user:password@host:5432/shadow_db"

# Connection Pool
DATABASE_POOL_SIZE=20
DATABASE_TIMEOUT=30000

# Application
NODE_ENV=production
PORT=3000

# Security
JWT_SECRET=your-super-secure-jwt-secret
ENCRYPTION_KEY=your-32-character-encryption-key

# Monitoring
LOG_LEVEL=info
SENTRY_DSN=your-sentry-dsn

# Cloud Services
AWS_REGION=ap-southeast-1
REDIS_URL=redis://cache:6379`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📦 Docker Configuration
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Dockerfile</Typography>
            <IconButton onClick={() => copyToClipboard(`FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma Client
RUN npx prisma generate

# Copy application code
COPY . .

# Build application
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]`)}>
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
{`FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma Client
RUN npx prisma generate

# Copy application code
COPY . .

# Build application
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          ☁️ Cloud Platform Deployment
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Vercel
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Zero-config deployment" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Automatic SSL" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Edge functions" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="secondary">
                Railway/Render
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Database included" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Auto migrations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check color="success" /></ListItemIcon>
                  <ListItemText primary="Built-in monitoring" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Tab 2: Migration Deployment */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🚀 Migration Deployment
        </Typography>

        <Alert severity="warning" sx={{ mb: 4 }}>
          การ deploy migrations ใน production ต้องทำอย่างระมัดระวังเพื่อหลีกเลี่ยง downtime
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📋 Migration Strategy
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Deploy Script</Typography>
            <IconButton onClick={() => copyToClipboard(`#!/bin/bash

echo "🚀 Starting production deployment..."

# 1. Backup database
echo "📦 Creating database backup..."
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Deploy migrations
echo "🔄 Deploying migrations..."
npx prisma migrate deploy

# 3. Generate Prisma Client
echo "⚙️ Generating Prisma Client..."
npx prisma generate

# 4. Restart application
echo "🔄 Restarting application..."
pm2 restart app

echo "✅ Deployment completed successfully!"`)}>
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
{`#!/bin/bash

echo "🚀 Starting production deployment..."

# 1. Backup database
echo "📦 Creating database backup..."
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Deploy migrations
echo "🔄 Deploying migrations..."
npx prisma migrate deploy

# 3. Generate Prisma Client
echo "⚙️ Generating Prisma Client..."
npx prisma generate

# 4. Restart application
echo "🔄 Restarting application..."
pm2 restart app

echo "✅ Deployment completed successfully!"`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔄 Zero-Downtime Migrations
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell><strong>ขั้นตอน</strong></TableCell>
                <TableCell><strong>การดำเนินการ</strong></TableCell>
                <TableCell><strong>ความเสี่ยง</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1. Backward Compatible</TableCell>
                <TableCell>เพิ่ม column ใหม่แบบ optional</TableCell>
                <TableCell>ต่ำ</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2. Code Deployment</TableCell>
                <TableCell>Deploy โค้ดที่รองรับ schema เก่าและใหม่</TableCell>
                <TableCell>ปานกลาง</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3. Data Migration</TableCell>
                <TableCell>Migrate ข้อมูลไปยัง column ใหม่</TableCell>
                <TableCell>สูง</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4. Cleanup</TableCell>
                <TableCell>ลบ column เก่าและโค้ดที่ไม่ใช้</TableCell>
                <TableCell>ต่ำ</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Tab 3: Security */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🔐 Security Best Practices
        </Typography>

        <Alert severity="error" sx={{ mb: 4 }}>
          Security เป็นสิ่งสำคัญที่สุดใน production environment
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🛡️ Database Security
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Secure Connection</Typography>
            <IconButton onClick={() => copyToClipboard(`// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Enable SSL connection
  sslmode  = "require"
}

// Connection with SSL
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require&sslcert=client-cert.pem&sslkey=client-key.pem&sslrootcert=ca-cert.pem"

// Connection pooling configuration
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["connectionPooling"]
}`)}>
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
{`// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Enable SSL connection
  sslmode  = "require"
}

// Connection with SSL
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require&sslcert=client-cert.pem&sslkey=client-key.pem&sslrootcert=ca-cert.pem"

// Connection pooling configuration
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["connectionPooling"]
}`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🔒 Input Validation & Sanitization
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Validation Middleware</Typography>
            <IconButton onClick={() => copyToClipboard(`import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(50),
  age: z.number().min(0).max(120).optional()
})

export async function createUser(data: unknown) {
  // Validate input
  const validatedData = userSchema.parse(data)
  
  // Sanitize SQL injection
  const prisma = new PrismaClient()
  
  try {
    return await prisma.user.create({
      data: validatedData
    })
  } catch (error) {
    // Log security events
    console.error('Security violation:', error)
    throw new Error('Invalid request')
  }
}`)}>
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
{`import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(50),
  age: z.number().min(0).max(120).optional()
})

export async function createUser(data: unknown) {
  // Validate input
  const validatedData = userSchema.parse(data)
  
  // Sanitize SQL injection
  const prisma = new PrismaClient()
  
  try {
    return await prisma.user.create({
      data: validatedData
    })
  } catch (error) {
    // Log security events
    console.error('Security violation:', error)
    throw new Error('Invalid request')
  }
}`}
          </Box>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>🔐 Security Checklist</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ SSL/TLS สำหรับ database connections" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Validate และ sanitize user inputs" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ใช้ environment variables สำหรับ secrets" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Enable database audit logging" />
            </ListItem>
          </List>
        </Alert>
      </TabPanel>

      {/* Tab 4: Monitoring */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          📊 Monitoring และ Observability
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          การ monitor Prisma applications ช่วยให้ตรวจจับปัญหาและ optimize performance ได้
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📈 Performance Monitoring
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Query Monitoring</Typography>
            <IconButton onClick={() => copyToClipboard(`import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event', 
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

// Monitor slow queries
prisma.$on('query', (e) => {
  if (e.duration > 1000) { // Queries longer than 1 second
    console.warn('Slow query detected:', {
      query: e.query,
      duration: e.duration,
      params: e.params,
      timestamp: e.timestamp
    })
    
    // Send to monitoring service
    // analytics.track('slow_query', { duration: e.duration })
  }
})`)}>
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

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event', 
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

// Monitor slow queries
prisma.$on('query', (e) => {
  if (e.duration > 1000) { // Queries longer than 1 second
    console.warn('Slow query detected:', {
      query: e.query,
      duration: e.duration,
      params: e.params,
      timestamp: e.timestamp
    })
    
    // Send to monitoring service
    // analytics.track('slow_query', { duration: e.duration })
  }
})`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📊 Health Checks
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Health Check Endpoint</Typography>
            <IconButton onClick={() => copyToClipboard(`// pages/api/health.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    // Check database connection
    await prisma.$queryRaw\`SELECT 1\`
    
    // Check application health
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: 'connected'
    }
    
    res.status(200).json(health)
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
}`)}>
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
{`// pages/api/health.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    // Check database connection
    await prisma.$queryRaw\`SELECT 1\`
    
    // Check application health
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: 'connected'
    }
    
    res.status(200).json(health)
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
}`}
          </Box>
        </Paper>
      </TabPanel>

      {/* Tab 5: Performance */}
      <TabPanel value={tabValue} index={4}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          ⚡ Performance Optimization
        </Typography>

        <Alert severity="warning" sx={{ mb: 4 }}>
          Performance optimization ใน production ต้องทำอย่างรอบคอบและ monitor ผลลัพธ์
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🚀 Connection Pooling
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Production Connection Pool</Typography>
            <IconButton onClick={() => copyToClipboard(`// Connection pool configuration
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=20&pool_timeout=20"

// Prisma Client with optimized settings
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  __internal: {
    engine: {
      binaryTargets: ['native', 'debian-openssl-1.1.x'],
    },
  },
})

// Connection pool middleware
export const withDatabase = (handler) => {
  return async (req, res) => {
    try {
      return await handler(req, res)
    } finally {
      // Don't disconnect in serverless environments
      if (process.env.NODE_ENV !== 'production') {
        await prisma.$disconnect()
      }
    }
  }
}`)}>
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
{`// Connection pool configuration
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=20&pool_timeout=20"

// Prisma Client with optimized settings
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  __internal: {
    engine: {
      binaryTargets: ['native', 'debian-openssl-1.1.x'],
    },
  },
})

// Connection pool middleware
export const withDatabase = (handler) => {
  return async (req, res) => {
    try {
      return await handler(req, res)
    } finally {
      // Don't disconnect in serverless environments
      if (process.env.NODE_ENV !== 'production') {
        await prisma.$disconnect()
      }
    }
  }
}`}
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🎯 Query Optimization
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.50' }}>
                <TableCell><strong>เทคนิค</strong></TableCell>
                <TableCell><strong>การใช้งาน</strong></TableCell>
                <TableCell><strong>ประโยชน์</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Query Batching</TableCell>
                <TableCell>รวม queries หลายๆ อันเป็น batch</TableCell>
                <TableCell>ลด network roundtrips</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Selective Fields</TableCell>
                <TableCell>Select เฉพาะ fields ที่ต้องการ</TableCell>
                <TableCell>ลด memory usage</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pagination</TableCell>
                <TableCell>จำกัดจำนวน records ที่ return</TableCell>
                <TableCell>เร็วขึ้น, ประหยัด bandwidth</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Indexing</TableCell>
                <TableCell>สร้าง database indexes</TableCell>
                <TableCell>เร็วขึ้นมาก สำหรับ WHERE clauses</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Tab 6: Best Practices */}
      <TabPanel value={tabValue} index={5}>
        <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
          🎯 Production Best Practices
        </Typography>

        <Alert severity="success" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>🎉 ขอแสดงความยินดี!</Typography>
          <Typography>
            คุณได้เรียนรู้การ deploy Prisma ใน production แล้ว! 
            ตอนนี้คุณพร้อมที่จะนำ Prisma ไปใช้งานจริงได้อย่างมั่นใจ
          </Typography>
        </Alert>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          📋 Production Checklist
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                🔧 Infrastructure
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Database backup strategy" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Connection pooling configured" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="SSL/TLS enabled" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Load balancer setup" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="secondary">
                📊 Monitoring
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Application performance monitoring" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Database query monitoring" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Error tracking และ alerting" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="Health check endpoints" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }} fontWeight="bold">
          🚀 Deployment Pipeline
        </Typography>

        <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">CI/CD Pipeline</Typography>
            <IconButton onClick={() => copyToClipboard(`# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Database backup
      run: |
        pg_dump $DATABASE_URL > backup.sql
        aws s3 cp backup.sql s3://backups/
    
    - name: Deploy migrations
      run: npx prisma migrate deploy
      env:
        DATABASE_URL: \${{ secrets.DATABASE_URL }}
    
    - name: Deploy to production
      run: npm run deploy
      env:
        VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}`)} size="small">
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
{`# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Database backup
      run: |
        pg_dump $DATABASE_URL > backup.sql
        aws s3 cp backup.sql s3://backups/
    
    - name: Deploy migrations
      run: npx prisma migrate deploy
      env:
        DATABASE_URL: \${{ secrets.DATABASE_URL }}
    
    - name: Deploy to production
      run: npm run deploy
      env:
        VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}`}
          </Box>
        </Paper>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            🎯 สิ่งที่คุณได้เรียนรู้ในหลักสูตรนี้:
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Prisma ORM fundamentals" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Database design และ migrations" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Type-safe queries และ CRUD operations" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Advanced queries และ performance optimization" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Authentication และ security" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Testing strategies" />
              </ListItem>
            </List>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Production deployment" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Monitoring และ observability" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Performance tuning" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Security best practices" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="CI/CD pipeline setup" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Production-ready applications" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </TabPanel>

      {/* Navigation buttons */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          component={Link}
          href="/prisma-tutorial/lesson-11"
          startIcon={<ArrowBack />}
          variant="outlined"
        >
          บทที่ 11: Testing
        </Button>
        
        <Button
          component={Link}
          href="/prisma-tutorial"
          variant="contained"
        >
          เสร็จสิ้นหลักสูตร
        </Button>
      </Box>
    </Container>
  );
} 