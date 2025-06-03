'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  TextField,
  FormControl,
  FormLabel,
  Switch,
  FormControlLabel,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import {
  CheckCircle,
  Code,
  PlayArrow,
  ExpandMore,
  Lightbulb,
  Warning,
  Info,
  Security,
  Shield,
  VerifiedUser,
  Speed,
  Build,
  Error as ErrorIcon,
  Api,
  Settings,
  Visibility,
  VisibilityOff,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const zodFeatures = [
  {
    title: 'Type Safety',
    description: 'TypeScript-first schema validation พร้อม auto-completion และ type inference',
    icon: <Shield />,
    color: 'primary'
  },
  {
    title: 'Runtime Validation',
    description: 'ตรวจสอบข้อมูลตอน runtime เพื่อป้องกัน invalid data จาก API หรือ user input',
    icon: <Security />,
    color: 'secondary'
  },
  {
    title: 'Error Messages',
    description: 'Error messages ที่ชัดเจน customizable และ i18n ready',
    icon: <ErrorIcon />,
    color: 'warning'
  },
  {
    title: 'Performance',
    description: 'Lightweight (2.8kb gzipped) และรวดเร็ว เหมาะกับ production',
    icon: <Speed />,
    color: 'success'
  }
];

// Demo Components
function SimpleFormDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
    email: z.string().email("อีเมลไม่ถูกต้อง"),
    age: z.string().regex(/^\d+$/, "อายุต้องเป็นตัวเลข").transform(Number).refine(n => n >= 18, "ต้องมีอายุอย่างน้อย 18 ปี")
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = formSchema.parse(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`สมัครเรียบร้อย! ชื่อ: ${validatedData.name}, อีเมล: ${validatedData.email}, อายุ: ${validatedData.age}`);
      setFormData({ name: '', email: '', age: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <Stack spacing={2}>
        <TextField
          label="ชื่อ"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />
        
        <TextField
          label="อีเมล"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />
        
        <TextField
          label="อายุ"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
          error={!!errors.age}
          helperText={errors.age}
          fullWidth
        />
        
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'กำลังส่ง...' : 'สมัครสมาชิก'}
        </Button>
      </Stack>
    </Box>
  );
}

function AdvancedFormDemo() {
  const [formData, setFormData] = useState({
    userType: 'individual' as 'individual' | 'company',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const createSchema = (userType: 'individual' | 'company') => {
    const baseSchema = z.object({
      userType: z.enum(['individual', 'company']),
      email: z.string().email("อีเมลไม่ถูกต้อง"),
      password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
      confirmPassword: z.string(),
      agreeTerms: z.boolean().refine(val => val === true, "ต้องยอมรับข้อตกลง")
    });

    if (userType === 'individual') {
      return baseSchema.extend({
        firstName: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
        lastName: z.string().min(2, "นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร")
      }).refine(data => data.password === data.confirmPassword, {
        message: "รหัสผ่านไม่ตรงกัน",
        path: ["confirmPassword"]
      });
    } else {
      return baseSchema.extend({
        companyName: z.string().min(2, "ชื่อบริษัทต้องมีอย่างน้อย 2 ตัวอักษร")
      }).refine(data => data.password === data.confirmPassword, {
        message: "รหัสผ่านไม่ตรงกัน",
        path: ["confirmPassword"]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const schema = createSchema(formData.userType);
      const validatedData = schema.parse(formData);
      alert('สมัครเรียบร้อย! ตรวจสอบ console สำหรับข้อมูล');
      console.log('Validated data:', validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500 }}>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>ประเภทผู้ใช้</FormLabel>
          <Stack direction="row" spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.userType === 'company'}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    userType: e.target.checked ? 'company' : 'individual' 
                  }))}
                />
              }
              label={formData.userType === 'individual' ? 'บุคคลธรรมดา' : 'นิติบุคคล'}
            />
          </Stack>
        </FormControl>

        {formData.userType === 'individual' ? (
          <Stack direction="row" spacing={2}>
            <TextField
              label="ชื่อ"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              error={!!errors.firstName}
              helperText={errors.firstName}
              fullWidth
            />
            <TextField
              label="นามสกุล"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              error={!!errors.lastName}
              helperText={errors.lastName}
              fullWidth
            />
          </Stack>
        ) : (
          <TextField
            label="ชื่อบริษัท"
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            error={!!errors.companyName}
            helperText={errors.companyName}
            fullWidth
          />
        )}

        <TextField
          label="อีเมล"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />

        <TextField
          label="รหัสผ่าน"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          InputProps={{
            endAdornment: (
              <Button
                onClick={() => setShowPassword(!showPassword)}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            )
          }}
        />

        <TextField
          label="ยืนยันรหัสผ่าน"
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.agreeTerms}
              onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
            />
          }
          label="ยอมรับข้อตกลงการใช้งาน"
        />
        {errors.agreeTerms && (
          <Typography color="error" variant="body2">
            {errors.agreeTerms}
          </Typography>
        )}

        <Button type="submit" variant="contained" size="large" fullWidth>
          สมัครสมาชิก
        </Button>
      </Stack>
    </Box>
  );
}

export default function Lesson8Page() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      maxWidth: '100vw',
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 2, sm: 3 },
      overflow: 'hidden',
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 600,
            mb: 2,
            lineHeight: 1.2,
          }}
        >
          🛡️ บทที่ 8: Zod Validation
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            mb: 3,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            lineHeight: 1.5,
          }}
        >
          เรียนรู้การใช้ Zod สำหรับ schema validation และ type safety ใน Next.js 15 พร้อมตัวอย่างการใช้งานจริงที่ครอบคลุม
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, '& .MuiChip-root': { fontSize: { xs: '0.75rem', sm: '0.8rem' } } }}>
          <Chip label="60 นาที" color="primary" size="small" />
          <Chip label="ปานกลาง-ขั้นสูง" color="warning" size="small" />
          <Chip label="สำคัญมาก" color="error" size="small" />
          <Chip label="Type Safety" color="success" size="small" />
          <Chip label="Production Ready" color="info" size="small" />
        </Stack>
      </Box>

      {/* Learning Objectives */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, bgcolor: 'primary.light', color: 'primary.contrastText', border: 'none', boxShadow: 1 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Lightbulb sx={{ fontSize: { xs: 20, sm: 24 } }} />
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, fontWeight: 600 }}>
              วัตถุประสงค์การเรียนรู้
            </Typography>
          </Box>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircle />
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>เข้าใจหลักการและความสำคัญของ runtime validation</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircle />
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>สร้าง schemas สำหรับ validation ทุกประเภทข้อมูล</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircle />
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>ใช้ Zod กับ forms, API routes และ environment variables</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircle />
              <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>จัดการ error handling และสร้าง custom validation</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* What is Zod */}
      <Card sx={{ p: { xs: 2, sm: 3, md: 4 }, mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: '1.5rem', sm: '2rem' }, fontWeight: 600 }}>
          🤔 Zod คืออะไร และทำไมถึงสำคัญ?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
          <strong>Zod</strong> เป็น TypeScript-first schema validation library ที่ช่วยให้เราสามารถกำหนด schema และตรวจสอบข้อมูลได้อย่างปลอดภัยทั้งตอน compile time และ runtime พร้อมทั้งสร้าง TypeScript types อัตโนมัติ
        </Typography>
        <Alert severity="warning" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
          <Typography variant="body2">
            <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
            <strong>ปัญหาที่ Zod แก้ไข:</strong> TypeScript ตรวจสอบ types เฉพาะตอน compile time เท่านั้น แต่ข้อมูลจาก API, user input, หรือ external sources อาจไม่ตรงกับ types ที่เรากำหนด
          </Typography>
        </Alert>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          🌟 ฟีเจอร์เด่นของ Zod:
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 4 }}>
          {zodFeatures.map((feature, index) => (
            <Card key={index} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ color: `${feature.color}.main` }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' } }}>{feature.title}</Typography>
                </Box>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>{feature.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          📦 การติดตั้ง Zod:
        </Typography>
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3, bgcolor: 'grey.50', fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
          <Typography variant="body2">$ npm install zod</Typography>
        </Box>
        <Alert severity="success" sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
          <Typography variant="body2">
            ✅ <strong>Zero Dependencies:</strong> Zod ไม่มี dependencies อื่นๆ และมีขนาดเพียง 2.8kb gzipped
          </Typography>
        </Alert>
      </Card>

      {/* Form Validation */}
      <Card sx={{ p: { xs: 2, sm: 3, md: 4 }, mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          📝 Form Validation with Interactive Demos
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
          เรียนรู้การใช้ Zod กับ React forms พร้อมตัวอย่างที่ทำงานได้จริง
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              🎯 Registration Form Demo
            </Typography>
            <SimpleFormDemo />
          </CardContent>
        </Card>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, color: 'secondary.main', fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              🔧 Advanced Form with Cross-field Validation
            </Typography>
            <AdvancedFormDemo />
          </CardContent>
        </Card>
      </Card>

      {/* Best Practices */}
      <Card sx={{ p: { xs: 2, sm: 3, md: 4 }, mb: { xs: 3, sm: 4 }, bgcolor: 'success.light', boxShadow: 1 }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'success.dark', fontWeight: 600, fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>
          💡 Best Practices สำหรับ Zod
        </Typography>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <CheckCircle color="success" sx={{ fontSize: { xs: 16, sm: 20 }, mt: 0.5, flexShrink: 0 }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>แยก schemas ออกเป็นไฟล์แยก</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>จัดเก็บ schemas ในโฟลเดอร์ schemas/ เพื่อความเป็นระเบียบ</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <CheckCircle color="success" sx={{ fontSize: { xs: 16, sm: 20 }, mt: 0.5, flexShrink: 0 }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>ใช้ descriptive error messages</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>เขียน error messages ที่เข้าใจง่ายและเป็นภาษาท้องถิ่น</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <CheckCircle color="success" sx={{ fontSize: { xs: 16, sm: 20 }, mt: 0.5, flexShrink: 0 }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Validate ข้อมูลทุกจุดที่รับจากภายนอก</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>API routes, form inputs, environment variables</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <CheckCircle color="success" sx={{ fontSize: { xs: 16, sm: 20 }, mt: 0.5, flexShrink: 0 }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>ใช้ safeParse สำหรับ non-critical validations</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>หลีกเลี่ยงการ throw errors โดยไม่จำเป็น</Typography>
            </Box>
          </Stack>
        </Stack>
      </Card>

      {/* Success Message */}
      <Card sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: 'success.light', color: 'success.dark', mb: { xs: 3, sm: 4 }, boxShadow: 1 }}>
        <Typography variant="h5" sx={{ mb: 2, fontSize: { xs: '1.3rem', sm: '1.5rem' }, fontWeight: 600 }}>
          🎯 ยินดีด้วย! คุณเรียนจบบทที่ 8 แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: '0.9rem', sm: '1rem' }, lineHeight: 1.6 }}>
          ตอนนี้คุณสามารถใช้ Zod เพื่อสร้างแอปพลิเคชันที่ปลอดภัยและเชื่อถือได้แล้ว
          พร้อมสำหรับการเรียนรู้ Tailwind CSS ในบทถัดไป
        </Typography>
        <Alert severity="info" sx={{ mb: 3, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
            💡 <strong>บทถัดไป:</strong> เรียนรู้ Tailwind CSS เพื่อสร้าง UI ที่สวยงามและ responsive
          </Typography>
        </Alert>
      </Card>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: { xs: 4, sm: 6 }, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-7"
          variant="outlined"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 2, sm: 1 } }}
        >
          บทที่ 7: React Hooks
        </Button>
        <Chip
          label="8 / 18"
          color="primary"
          variant="outlined"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' }, order: { xs: 1, sm: 2 } }}
        />
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-9"
          variant="contained"
          color="primary"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 3, sm: 3 } }}
        >
          บทถัดไป
        </Button>
      </Box>
    </Box>
  );
} 