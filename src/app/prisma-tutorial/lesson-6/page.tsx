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
} from '@mui/material';
import {
  CheckCircle,
  Code,
  ArrowBack,
  Build,
  Assignment,
  Timer,
  ContentCopy,
  Settings,
  Search,
  Sort,
  FilterList,
  Speed,
  Psychology,
  TrendingUp,
  DataObject,
  Check,
  ExpandMore,
  Warning,
  Lightbulb,
  QueryStats,
  Memory,
  Storage,
  Tune,
  Analytics,
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

const queryTypes = [
  {
    operation: 'Where Conditions',
    description: 'การกรองข้อมูลด้วยเงื่อนไขต่างๆ',
    icon: <FilterList />,
    methods: ['equals', 'contains', 'in', 'gt', 'lt'],
    difficulty: 'ง่าย',
    color: 'success'
  },
  {
    operation: 'Sorting & Ordering',
    description: 'การเรียงลำดับข้อมูลตามต้องการ',
    icon: <Sort />,
    methods: ['orderBy', 'asc', 'desc', 'multiple fields'],
    difficulty: 'ง่าย',
    color: 'info'
  },
  {
    operation: 'Pagination',
    description: 'การแบ่งหน้าข้อมูลเพื่อประสิทธิภาพ',
    icon: <DataObject />,
    methods: ['skip', 'take', 'cursor', 'offset'],
    difficulty: 'ปานกลาง',
    color: 'warning'
  },
  {
    operation: 'Performance Optimization',
    description: 'เทคนิคเพิ่มประสิทธิภาพ query',
    icon: <Speed />,
    methods: ['select', 'include', 'indexes', 'connection pooling'],
    difficulty: 'ขั้นสูง',
    color: 'error'
  }
];

const codeExamples = {
  whereConditions: `// การใช้ Where Conditions แบบต่างๆ

// 1. เงื่อนไขพื้นฐาน
const users = await prisma.user.findMany({
  where: {
    email: 'john@example.com',        // equals (default)
    name: { contains: 'John' },       // ค้นหาที่มีคำว่า John
    age: { gte: 18 },                 // อายุ >= 18
    isActive: true,                   // boolean
    role: { in: ['USER', 'ADMIN'] }   // อยู่ในลิสต์
  }
})

// 2. เงื่อนไขขั้นสูง
const advancedUsers = await prisma.user.findMany({
  where: {
    OR: [
      { email: { endsWith: '@gmail.com' } },
      { email: { endsWith: '@hotmail.com' } }
    ],
    AND: [
      { age: { gte: 18 } },
      { age: { lte: 65 } }
    ],
    NOT: {
      role: 'BANNED'
    }
  }
})

// 3. เงื่อนไขกับ Relations
const usersWithPosts = await prisma.user.findMany({
  where: {
    posts: {
      some: {                         // มี post อย่างน้อย 1 โพสต์
        published: true,
        createdAt: {
          gte: new Date('2024-01-01')
        }
      }
    }
  }
})`,

  sortingPagination: `// การเรียงลำดับและแบ่งหน้า

// 1. การเรียงลำดับพื้นฐาน
const sortedUsers = await prisma.user.findMany({
  orderBy: {
    createdAt: 'desc'    // เรียงจากใหม่ไปเก่า
  }
})

// 2. การเรียงลำดับหลายฟิลด์
const multiSortUsers = await prisma.user.findMany({
  orderBy: [
    { role: 'asc' },     // เรียงตาม role ก่อน
    { name: 'asc' },     // แล้วเรียงตาม name
    { createdAt: 'desc' } // สุดท้ายเรียงตามวันที่
  ]
})

// 3. Pagination แบบ Offset
const page = 2;
const pageSize = 10;
const paginatedUsers = await prisma.user.findMany({
  skip: (page - 1) * pageSize,  // ข้าม 10 records แรก
  take: pageSize,               // เอา 10 records
  orderBy: { id: 'asc' }
})

// 4. Cursor-based Pagination (แนะนำสำหรับข้อมูลเยอะ)
const cursorUsers = await prisma.user.findMany({
  take: 10,
  cursor: {
    id: lastUserId  // เริ่มจาก ID ที่กำหนด
  },
  skip: 1,  // ข้าม cursor record
  orderBy: { id: 'asc' }
})

// 5. การนับจำนวนทั้งหมด (สำหรับ pagination info)
const totalUsers = await prisma.user.count({
  where: {
    isActive: true
  }
})`,

  selectInclude: `// การเลือกข้อมูลและ Relations

// 1. Select เฉพาะฟิลด์ที่ต้องการ
const userEmails = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true
    // ไม่เอา password, createdAt, etc.
  }
})

// 2. Include Relations
const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: true,           // รวม posts ทั้งหมด
    profile: true          // รวม profile
  }
})

// 3. Select + Include แบบซับซ้อน
const complexQuery = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    posts: {
      select: {
        id: true,
        title: true,
        published: true,
        _count: {
          select: {
            comments: true  // นับจำนวน comments
          }
        }
      },
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5  // เอาแค่ 5 posts ล่าสุด
    }
  }
})

// 4. Nested filtering
const usersWithRecentPosts = await prisma.user.findMany({
  include: {
    posts: {
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 วันที่แล้ว
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }
  }
})`,

  aggregations: `// การใช้ Aggregations และ Grouping

// 1. การนับและสถิติพื้นฐาน
const userStats = await prisma.user.aggregate({
  _count: {
    id: true,           // นับจำนวน users
    email: true         // นับ emails ที่ไม่ null
  },
  _avg: {
    age: true           // อายุเฉลี่ย
  },
  _max: {
    createdAt: true     // วันที่สร้างล่าสุด
  },
  _min: {
    createdAt: true     // วันที่สร้างแรกสุด
  }
})

// 2. Group By
const postsByUser = await prisma.post.groupBy({
  by: ['authorId'],
  _count: {
    id: true            // นับจำนวน posts ของแต่ละ user
  },
  _avg: {
    viewCount: true     // views เฉลี่ยของแต่ละ user
  },
  having: {
    id: {
      _count: {
        gte: 5          // เฉพาะ users ที่มี posts >= 5
      }
    }
  }
})

// 3. การใช้ _count ใน relations
const usersWithPostCount = await prisma.user.findMany({
  include: {
    _count: {
      select: {
        posts: true,
        comments: true
      }
    }
  }
})

// 4. Complex aggregations
const monthlyStats = await prisma.post.groupBy({
  by: ['createdAt'],
  _count: {
    id: true
  },
  _sum: {
    viewCount: true
  },
  where: {
    published: true,
    createdAt: {
      gte: new Date('2024-01-01')
    }
  }
})`,

  performance: `// เทคนิคเพิ่มประสิทธิภาพ

// 1. การใช้ Indexes (ใน schema.prisma)
model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  name     String
  age      Int
  role     Role
  
  // เพิ่ม indexes สำหรับ fields ที่ query บ่อย
  @@index([age])
  @@index([role])
  @@index([name, age])  // composite index
}

// 2. Connection Pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + "?connection_limit=20&pool_timeout=20"
    }
  }
})

// 3. Query Optimization
// ❌ ไม่ดี - N+1 Problem
const users = await prisma.user.findMany()
for (const user of users) {
  const posts = await prisma.post.findMany({
    where: { authorId: user.id }
  })
}

// ✅ ดี - ใช้ include
const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: true
  }
})

// 4. Batch Operations
// ❌ ไม่ดี - หลาย queries
for (const userData of usersData) {
  await prisma.user.create({ data: userData })
}

// ✅ ดี - batch create
await prisma.user.createMany({
  data: usersData,
  skipDuplicates: true
})

// 5. การใช้ Raw Queries สำหรับ complex queries
const result = await prisma.$queryRaw\`
  SELECT u.name, COUNT(p.id) as post_count
  FROM User u
  LEFT JOIN Post p ON u.id = p.authorId
  WHERE u.createdAt >= \${startDate}
  GROUP BY u.id, u.name
  HAVING COUNT(p.id) > 5
  ORDER BY post_count DESC
  LIMIT 10
\``,

  realWorldExamples: `// ตัวอย่างการใช้งานจริง

// 1. Search Function
async function searchUsers(searchTerm: string, page: number = 1) {
  const pageSize = 20;
  
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } }
        ],
        isActive: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        _count: {
          select: {
            posts: true,
            followers: true
          }
        }
      },
      orderBy: [
        { name: 'asc' }
      ],
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    
    prisma.user.count({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } }
        ],
        isActive: true
      }
    })
  ]);
  
  return {
    users,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    }
  };
}

// 2. Dashboard Analytics
async function getDashboardStats(userId: number) {
  const [userStats, recentPosts, topPosts] = await Promise.all([
    // สถิติผู้ใช้
    prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            posts: true,
            comments: true,
            likes: true
          }
        }
      }
    }),
    
    // โพสต์ล่าสุด
    prisma.post.findMany({
      where: { authorId: userId },
      select: {
        id: true,
        title: true,
        createdAt: true,
        viewCount: true,
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    
    // โพสต์ยอดนิยม
    prisma.post.findMany({
      where: { 
        authorId: userId,
        published: true
      },
      select: {
        id: true,
        title: true,
        viewCount: true,
        _count: {
          select: {
            likes: true
          }
        }
      },
      orderBy: [
        { viewCount: 'desc' },
        { likes: { _count: 'desc' } }
      ],
      take: 3
    })
  ]);
  
  return { userStats, recentPosts, topPosts };
}`
};

export default function PrismaLesson6Page() {
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <QueryStats />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              บทที่ 6: Advanced Queries และ Performance
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              เรียนรู้การค้นหาและกรองข้อมูลขั้นสูงพร้อมเทคนิคเพิ่มประสิทธิภาพ
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip icon={<Timer />} label="50 นาที" color="primary" />
          <Chip icon={<Assignment />} label="ปานกลาง" color="warning" />
          <Chip icon={<Code />} label="Hands-on" color="success" />
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Advanced Queries</strong> จะช่วยให้คุณสามารถดึงข้อมูลได้อย่างมีประสิทธิภาพ 
            และเพิ่มความเร็วในการทำงานของแอปพลิเคชัน
          </Typography>
        </Alert>
      </Box>

      {/* Navigation */}
      <Paper sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab icon={<Psychology />} label="แนวคิด" />
          <Tab icon={<FilterList />} label="Where & Filtering" />
          <Tab icon={<Sort />} label="Sorting & Pagination" />
          <Tab icon={<Analytics />} label="Aggregations" />
          <Tab icon={<Speed />} label="Performance" />
          <Tab icon={<Code />} label="ตัวอย่างจริง" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🧠 ทำความเข้าใจ Advanced Queries
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>สำคัญ:</strong> การเขียน query ที่ไม่มีประสิทธิภาพอาจทำให้แอปช้า 
            ควรทดสอบประสิทธิภาพเสมอ!
          </Typography>
        </Alert>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
          {queryTypes.map((type, index) => (
            <Card key={index} sx={{ height: '100%', border: `2px solid`, borderColor: `${type.color}.main` }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${type.color}.main` }}>
                    {type.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {type.operation}
                    </Typography>
                    <Chip 
                      label={type.difficulty} 
                      size="small" 
                      color={type.color as 'success' | 'info' | 'warning' | 'error'} 
                    />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {type.description}
                </Typography>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                    Methods ที่ใช้:
                  </Typography>
                  {type.methods.map((method, i) => (
                    <Chip key={i} label={method} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            💡 ทำไมต้องเรียนรู้ Advanced Queries?
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="ประสิทธิภาพที่ดีขึ้น"
                secondary="ลดเวลาในการดึงข้อมูลและใช้ memory น้อยลง"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="ลด Network Traffic"
                secondary="ดึงเฉพาะข้อมูลที่ต้องการ ไม่ต้องดึงทั้งหมด"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="User Experience ที่ดี"
                secondary="แอปโหลดเร็ว ผู้ใช้ไม่ต้องรอนาน"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="ประหยัดค่าใช้จ่าย"
                secondary="ใช้ทรัพยากร database น้อยลง"
              />
            </ListItem>
          </List>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🔍 Where Conditions และ Filtering
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          การกรองข้อมูลเป็นพื้นฐานสำคัญในการดึงข้อมูลที่ต้องการ
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            เงื่อนไขการกรองข้อมูล
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Where Conditions</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.whereConditions, 'whereConditions')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'whereConditions' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.whereConditions}
            </pre>
          </Paper>
        </Paper>

        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Operator</strong></TableCell>
                <TableCell><strong>คำอธิบาย</strong></TableCell>
                <TableCell><strong>ตัวอย่าง</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><code>equals</code></TableCell>
                <TableCell>เท่ากับ (default)</TableCell>
                <TableCell><code>{'{ name: "John" }'}</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>contains</code></TableCell>
                <TableCell>มีคำที่ระบุ</TableCell>
                <TableCell><code>{'{ name: { contains: "Jo" } }'}</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>startsWith</code></TableCell>
                <TableCell>เริ่มต้นด้วย</TableCell>
                <TableCell><code>{'{ email: { startsWith: "admin" } }'}</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>in</code></TableCell>
                <TableCell>อยู่ในลิสต์</TableCell>
                <TableCell><code>{'{ role: { in: ["USER", "ADMIN"] } }'}</code></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>gte / lte</code></TableCell>
                <TableCell>มากกว่าเท่ากับ / น้อยกว่าเท่ากับ</TableCell>
                <TableCell><code>{'{ age: { gte: 18, lte: 65 } }'}</code></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Alert severity="info">
          <Typography variant="body2">
            <strong>เทคนิค:</strong> ใช้ <code>mode: 'insensitive'</code> สำหรับการค้นหาที่ไม่สนใจตัวพิมพ์เล็ก-ใหญ่
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          📊 Sorting และ Pagination
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          การเรียงลำดับและแบ่งหน้าข้อมูลเพื่อประสิทธิภาพที่ดี
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            การเรียงลำดับและแบ่งหน้า
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Sorting & Pagination</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.sortingPagination, 'sortingPagination')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'sortingPagination' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.sortingPagination}
            </pre>
          </Paper>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="info.main">
                📄 Offset Pagination
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                เหมาะสำหรับข้อมูลที่ไม่เปลี่ยนแปลงบ่อย
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ง่ายต่อการทำความเข้าใจ" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="แสดงหมายเลขหน้าได้" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="ช้าลงเมื่อข้อมูลเยอะ" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="success.main">
                🎯 Cursor Pagination
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                เหมาะสำหรับข้อมูลเยอะและเปลี่ยนแปลงบ่อย
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="เร็วกว่าเมื่อข้อมูลเยอะ" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ไม่มีปัญหา duplicate records" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="warning" /></ListItemIcon>
                  <ListItemText primary="ซับซ้อนกว่า offset" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          📈 Aggregations และ Analytics
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          การคำนวณสถิติและจัดกลุ่มข้อมูลเพื่อการวิเคราะห์
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            การใช้ Aggregations
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Aggregations & GroupBy</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.aggregations, 'aggregations')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'aggregations' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.aggregations}
            </pre>
          </Paper>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Select vs Include
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Select & Include</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.selectInclude, 'selectInclude')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'selectInclude' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.selectInclude}
            </pre>
          </Paper>
        </Paper>

        <Alert severity="info">
          <Typography variant="body2">
            <strong>เทคนิค:</strong> ใช้ <code>select</code> เมื่อต้องการเฉพาะบางฟิลด์ 
            ใช้ <code>include</code> เมื่อต้องการ relations เพิ่มเติม
          </Typography>
        </Alert>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          ⚡ Performance Optimization
        </Typography>

        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>สำคัญมาก:</strong> การเขียน query ที่ไม่มีประสิทธิภาพอาจทำให้แอปช้ามาก 
            ควรทดสอบและวัดประสิทธิภาพเสมอ!
          </Typography>
        </Alert>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            เทคนิคเพิ่มประสิทธิภาพ
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Performance Tips</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.performance, 'performance')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'performance' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.performance}
            </pre>
          </Paper>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="success.main">
                ✅ ควรทำ
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ indexes สำหรับ fields ที่ query บ่อย" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ select เฉพาะฟิลด์ที่ต้องการ" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ batch operations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText primary="ใช้ connection pooling" />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="error.main">
                ❌ ไม่ควรทำ
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="N+1 Query Problem" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="ดึงข้อมูลทั้งหมดโดยไม่จำเป็น" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="ไม่ใช้ pagination สำหรับข้อมูลเยอะ" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Warning color="error" /></ListItemIcon>
                  <ListItemText primary="Query ใน loop" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🚀 ตัวอย่างการใช้งานจริง
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          ตัวอย่างการประยุกต์ใช้ Advanced Queries ในโปรเจคจริง
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Real-world Examples
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="caption" color="grey.400">Real-world Examples</Typography>
              <IconButton 
                size="small" 
                onClick={() => handleCopyCode(codeExamples.realWorldExamples, 'realWorldExamples')}
                sx={{ color: 'white' }}
              >
                {copiedCode === 'realWorldExamples' ? <Check /> : <ContentCopy />}
              </IconButton>
            </Stack>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {codeExamples.realWorldExamples}
            </pre>
          </Paper>
        </Paper>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" fontWeight="bold">
              💡 เคล็ดลับการเขียน Query ที่มีประสิทธิภาพ
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
                <ListItemText 
                  primary="วางแผน Query ก่อนเขียน"
                  secondary="คิดว่าต้องการข้อมูลอะไรบ้าง และจากตารางไหน"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
                <ListItemText 
                  primary="ใช้ Database Tools ตรวจสอบ"
                  secondary="ใช้ EXPLAIN ANALYZE เพื่อดู query plan"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
                <ListItemText 
                  primary="Monitor และ Log queries"
                  secondary="ติดตามว่า query ไหนช้า และปรับปรุง"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Lightbulb color="warning" /></ListItemIcon>
                <ListItemText 
                  primary="Test กับข้อมูลจริง"
                  secondary="ทดสอบกับข้อมูลจำนวนมากเหมือนใน production"
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </TabPanel>

      {/* Navigation */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          component={Link}
          href="/prisma-tutorial/lesson-5"
          startIcon={<ArrowBack />}
          variant="outlined"
        >
          บทที่ 5: Migrations
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