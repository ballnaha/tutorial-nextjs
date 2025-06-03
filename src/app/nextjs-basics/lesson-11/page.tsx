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
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
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
  Speed,
  Build,
  Error as ErrorIcon,
  Visibility,
  VisibilityOff,
  CloudUpload,
  Delete,
  Add,
  Remove,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

const rhfFeatures = [
  {
    title: 'Minimal Re-renders',
    description: 'ลด re-renders โดยใช้ uncontrolled components และ ref-based validation',
    icon: <Speed />,
    color: 'primary'
  },
  {
    title: 'Easy Validation',
    description: 'Integration กับ Zod, Yup และ validation libraries อื่นๆ ได้ง่าย',
    icon: <Security />,
    color: 'secondary'
  },
  {
    title: 'TypeScript Support',
    description: 'Type safety ที่แข็งแกร่งพร้อม auto-completion สำหรับ form data',
    icon: <Build />,
    color: 'info'
  },
  {
    title: 'Bundle Size',
    description: 'เพียง 25kb (8.5kb gzipped) ไม่มี dependencies อื่นๆ',
    icon: <Code />,
    color: 'success'
  }
];

// Demo Components
function BasicFormDemo() {
  const [showResult, setShowResult] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const basicSchema = z.object({
    firstName: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
    lastName: z.string().min(2, "นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร"),
    email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
    age: z.number().min(18, "อายุต้องมากกว่า 18 ปี").max(120, "อายุต้องน้อยกว่า 120 ปี"),
  });

  type BasicFormData = z.infer<typeof basicSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<BasicFormData>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 18,
    }
  });

  const watchedValues = watch();

  const onSubmit = async (data: BasicFormData) => {
    setShowResult(false);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmittedData(data);
    setShowResult(true);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          📋 Basic Form with React Hook Form + Zod
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
          gap: 4 
        }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="ชื่อ"
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
              />
              
              <TextField
                label="นามสกุล"
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
              />
              
              <TextField
                label="อีเมล"
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
              
              <TextField
                label="อายุ"
                type="number"
                {...register('age', { valueAsNumber: true })}
                error={!!errors.age}
                helperText={errors.age?.message}
                fullWidth
              />
              
              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                >
                  {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อมูล'}
                </Button>
                
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => reset()}
                >
                  เคลียร์ฟอร์ม
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🔍 Live Data Preview
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 2 }}>
              <Typography variant="body2" component="pre">
                {JSON.stringify(watchedValues, null, 2)}
              </Typography>
            </Paper>
            
            {showResult && submittedData && (
              <Alert severity="success">
                <Typography variant="body2">
                  <strong>ส่งข้อมูลสำเร็จ!</strong><br />
                  ชื่อ: {submittedData.firstName} {submittedData.lastName}<br />
                  อีเมล: {submittedData.email}<br />
                  อายุ: {submittedData.age} ปี
                </Typography>
              </Alert>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function DynamicFormDemo() {
  const dynamicSchema = z.object({
    companyName: z.string().min(2, "ชื่อบริษัทต้องมีอย่างน้อย 2 ตัวอักษร"),
    employees: z.array(z.object({
      name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
      position: z.string().min(2, "ตำแหน่งต้องมีอย่างน้อย 2 ตัวอักษร"),
      salary: z.number().min(15000, "เงินเดือนต้องมากกว่า 15,000 บาท"),
    })).min(1, "ต้องมีพนักงานอย่างน้อย 1 คน"),
  });

  type DynamicFormData = z.infer<typeof dynamicSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<DynamicFormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {
      companyName: '',
      employees: [{ name: '', position: '', salary: 15000 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees'
  });

  const watchedEmployees = watch('employees');

  const onSubmit = async (data: DynamicFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`บันทึกข้อมูลบริษัท: ${data.companyName} (${data.employees.length} พนักงาน)`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          👥 Dynamic Form with useFieldArray
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="ชื่อบริษัท"
              {...register('companyName')}
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
              fullWidth
            />
            
            <Typography variant="h6">รายชื่อพนักงาน</Typography>
            
            {fields.map((field, index) => (
              <Paper key={field.id} sx={{ p: 3, border: 1, borderColor: 'grey.300' }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">
                    พนักงานคนที่ {index + 1}
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { 
                      xs: '1fr', 
                      sm: 'repeat(4, 1fr) auto',
                      md: '2fr 2fr 1.5fr auto' 
                    }, 
                    gap: 2,
                    alignItems: 'start'
                  }}>
                    <TextField
                      label="ชื่อ"
                      {...register(`employees.${index}.name`)}
                      error={!!errors.employees?.[index]?.name}
                      helperText={errors.employees?.[index]?.name?.message}
                      fullWidth
                    />
                    
                    <TextField
                      label="ตำแหน่ง"
                      {...register(`employees.${index}.position`)}
                      error={!!errors.employees?.[index]?.position}
                      helperText={errors.employees?.[index]?.position?.message}
                      fullWidth
                    />
                    
                    <TextField
                      label="เงินเดือน"
                      type="number"
                      {...register(`employees.${index}.salary`, { valueAsNumber: true })}
                      error={!!errors.employees?.[index]?.salary}
                      helperText={errors.employees?.[index]?.salary?.message}
                      fullWidth
                      InputProps={{
                        endAdornment: <InputAdornment position="end">บาท</InputAdornment>
                      }}
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: { xs: 0, sm: 1 } }}>
                      <IconButton
                        color="error"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            ))}
            
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => append({ name: '', position: '', salary: 15000 })}
            >
              เพิ่มพนักงาน
            </Button>
            
            {errors.employees && (
              <Alert severity="error">
                {typeof errors.employees.message === 'string' && errors.employees.message}
              </Alert>
            )}
            
            <Divider />
            
            <Typography variant="h6">สรุปข้อมูล</Typography>
            <Typography variant="body2">
              จำนวนพนักงาน: {watchedEmployees.length} คน<br />
              เงินเดือนรวม: {watchedEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0).toLocaleString()} บาท/เดือน
            </Typography>
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูลบริษัท'}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Lesson11Page() {
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
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics"
          sx={{ mb: 2, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
        >
          กลับไปหน้าหลัก
        </Button>
        <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, fontWeight: 600, mb: 2, lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Code color="primary" sx={{ fontSize: { xs: '2.2rem', sm: '3rem' } }} />
          บทที่ 11: React Hook Form
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3, '& .MuiChip-root': { fontSize: { xs: '0.75rem', sm: '0.8rem' } } }}>
          <Chip icon={<Speed />} label="Minimal Re-renders" color="primary" size="small" />
          <Chip icon={<Security />} label="Easy Validation" color="secondary" size="small" />
          <Chip icon={<Build />} label="TypeScript" color="info" size="small" />
          <Chip icon={<Code />} label="Bundle Size" color="success" size="small" />
        </Stack>
        <Alert severity="info" sx={{ mb: 3, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
          <Typography variant="body2">
            ⏱️ <strong>ระยะเวลา:</strong> 50 นาที | 
            📊 <strong>ระดับ:</strong> ปานกลาง-สูง | 
            🎯 <strong>เป้าหมาย:</strong> เรียนรู้การจัดการฟอร์มด้วย React Hook Form + Zod
          </Typography>
        </Alert>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: { xs: 3, sm: 4 } }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="🔰 เริ่มต้น" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="📋 Basic Form" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="🧩 Dynamic Form" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
          <Tab label="💡 Tips & Tricks" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <CustomTabPanel value={tabValue} index={0}>
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
          📝 Basic React Hook Form
        </Typography>
        
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre">
{`'use client';
import { useForm } from 'react-hook-form';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function BasicForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('firstName', { required: 'ชื่อจำเป็น' })}
        placeholder="ชื่อ"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <input
        {...register('lastName', { required: 'นามสกุลจำเป็น' })}
        placeholder="นามสกุล"
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <input
        {...register('email', {
          required: 'อีเมลจำเป็น',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: 'รูปแบบอีเมลไม่ถูกต้อง'
          }
        })}
        placeholder="อีเมล"
        type="email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">ส่งข้อมูล</button>
    </form>
  );
}`}
          </Typography>
        </Box>

        <Alert severity="info">
          <Typography variant="body2">
            💡 <strong>register():</strong> เชื่อมต่อ input elements เข้ากับ React Hook Form
          </Typography>
        </Alert>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={1}>
        <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main' }}>
          🛡️ Integration กับ Zod Validation
        </Typography>
        
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre">
{`'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// สร้าง Zod schema
const formSchema = z.object({
  firstName: z.string().min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'),
  lastName: z.string().min(2, 'นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร'),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
  age: z.number().min(18, 'อายุต้องมากกว่า 18 ปี'),
  website: z.string().url('รูปแบบ URL ไม่ถูกต้อง').optional(),
});

// Type inference จาก Zod schema
type FormData = z.infer<typeof formSchema>;

export default function ValidatedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema), // ใช้ Zod resolver
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 18,
      website: '',
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Validated data:', data);
      alert('ส่งข้อมูลสำเร็จ!');
      reset(); // Clear form
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('firstName')}
        placeholder="ชื่อ"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <input
        {...register('lastName')}
        placeholder="นามสกุล"
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <input
        {...register('email')}
        placeholder="อีเมล"
        type="email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        {...register('age', { valueAsNumber: true })}
        placeholder="อายุ"
        type="number"
      />
      {errors.age && <p>{errors.age.message}</p>}

      <input
        {...register('website')}
        placeholder="เว็บไซต์ (ไม่บังคับ)"
        type="url"
      />
      {errors.website && <p>{errors.website.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อมูล'}
      </button>
    </form>
  );
}`}
          </Typography>
        </Box>

        <Alert severity="success">
          <Typography variant="body2">
            ✅ <strong>Zod + React Hook Form:</strong> Type safety และ validation ที่แข็งแกร่ง
          </Typography>
        </Alert>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={2}>
        <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
          🎛️ Controller Pattern สำหรับ Custom Components
        </Typography>
        
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre">
{`'use client';
import { Controller, useForm } from 'react-hook-form';
import { 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch
} from '@mui/material';

interface FormData {
  name: string;
  gender: string;
  interests: string[];
  notifications: boolean;
}

export default function ControllerForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      gender: '',
      interests: [],
      notifications: true,
    }
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* MUI TextField */}
      <Controller
        name="name"
        control={control}
        rules={{ required: 'ชื่อจำเป็น' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="ชื่อ"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          />
        )}
      />

      {/* MUI Select */}
      <Controller
        name="gender"
        control={control}
        rules={{ required: 'กรุณาเลือกเพศ' }}
        render={({ field, fieldState }) => (
          <FormControl fullWidth error={!!fieldState.error}>
            <FormLabel>เพศ</FormLabel>
            <Select {...field}>
              <MenuItem value="male">ชาย</MenuItem>
              <MenuItem value="female">หญิง</MenuItem>
              <MenuItem value="other">อื่นๆ</MenuItem>
            </Select>
            {fieldState.error && <p>{fieldState.error.message}</p>}
          </FormControl>
        )}
      />

      {/* Radio Group */}
      <Controller
        name="interests"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormLabel>ความสนใจ</FormLabel>
            <RadioGroup
              {...field}
              value={field.value}
              onChange={field.onChange}
            >
              <FormControlLabel value="tech" control={<Radio />} label="เทคโนโลยี" />
              <FormControlLabel value="sports" control={<Radio />} label="กีฬา" />
              <FormControlLabel value="music" control={<Radio />} label="เพลง" />
            </RadioGroup>
          </FormControl>
        )}
      />

      {/* Switch */}
      <Controller
        name="notifications"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={field.value}
                onChange={field.onChange}
              />
            }
            label="รับการแจ้งเตือน"
          />
        )}
      />

      <button type="submit">ส่งข้อมูล</button>
    </form>
  );
}`}
          </Typography>
        </Box>

        <Alert severity="warning">
          <Typography variant="body2">
            ⚠️ <strong>Controller:</strong> ใช้สำหรับ components ที่ไม่รองรับ ref โดยตรง เช่น MUI components
          </Typography>
        </Alert>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={3}>
        <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>
          🔧 TypeScript Best Practices
        </Typography>
        
        <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" component="pre">
{`// types/forms.ts
export interface UserProfile {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      zipCode: string;
    };
  };
  preferences: {
    newsletter: boolean;
    language: 'th' | 'en';
    theme: 'light' | 'dark';
  };
}

// components/UserProfileForm.tsx
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserProfile } from '@/types/forms';

const userProfileSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    dateOfBirth: z.date(),
  }),
  contactInfo: z.object({
    email: z.string().email(),
    phone: z.string().regex(/^[0-9-+()\\s]+$/),
    address: z.object({
      street: z.string().min(5),
      city: z.string().min(2),
      zipCode: z.string().regex(/^[0-9]{5}$/),
    }),
  }),
  preferences: z.object({
    newsletter: z.boolean(),
    language: z.enum(['th', 'en']),
    theme: z.enum(['light', 'dark']),
  }),
});

type FormData = z.infer<typeof userProfileSchema>;

// Main Form Component
export default function UserProfileForm() {
  const methods = useForm<FormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
      },
      contactInfo: {
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          zipCode: '',
        },
      },
      preferences: {
        newsletter: false,
        language: 'th',
        theme: 'light',
      },
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Typed data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <PersonalInfoSection />
        <ContactInfoSection />
        <PreferencesSection />
        <button type="submit">บันทึกข้อมูล</button>
      </form>
    </FormProvider>
  );
}

// Nested Form Sections
function PersonalInfoSection() {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <section>
      <h3>ข้อมูลส่วนตัว</h3>
      <input
        {...register('personalInfo.firstName')}
        placeholder="ชื่อ"
      />
      {errors.personalInfo?.firstName && 
        <p>{errors.personalInfo.firstName.message}</p>
      }
      
      <input
        {...register('personalInfo.lastName')}
        placeholder="นามสกุล"
      />
      {errors.personalInfo?.lastName && 
        <p>{errors.personalInfo.lastName.message}</p>
      }
    </section>
  );
}`}
          </Typography>
        </Box>

        <Alert severity="info">
          <Typography variant="body2">
            💡 <strong>FormProvider:</strong> ใช้สำหรับแชร์ form methods ระหว่าง components
          </Typography>
        </Alert>
      </CustomTabPanel>

      {/* Interactive Demos */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          🎯 Interactive Demos
        </Typography>
        
        <Stack spacing={4}>
          <BasicFormDemo />
          <DynamicFormDemo />
        </Stack>
      </Box>

      {/* Best Practices */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'success.light' }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'success.dark' }}>
          💡 Best Practices สำหรับ React Hook Form
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ Zod สำหรับ validation"
              secondary="Type-safe validation และ better error messages"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="กำหนด defaultValues เสมอ"
              secondary="ป้องกัน controlled/uncontrolled component warnings"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ Controller สำหรับ custom components"
              secondary="MUI, Ant Design หรือ custom components ที่ไม่รองรับ ref"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="แยก form sections เป็น components"
              secondary="ใช้ FormProvider สำหรับ large forms"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="ใช้ watch() อย่างระมัดระวัง"
              secondary="อาจทำให้ re-render บ่อย ให้ใช้ selector pattern"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: { xs: 4, sm: 6 }, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
        <Button
          startIcon={<ArrowBack />}
          component={Link}
          href="/nextjs-basics/lesson-10"
          variant="outlined"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 2, sm: 1 } }}
        >
          บทที่ 10: State Management
        </Button>
        <Chip
          label="11 / 18"
          color="primary"
          variant="outlined"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' }, order: { xs: 1, sm: 2 } }}
        />
        <Button
          endIcon={<ArrowForward />}
          component={Link}
          href="/nextjs-basics/lesson-12"
          variant="contained"
          color="primary"
          sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, order: { xs: 3, sm: 3 } }}
        >
          บทที่ 12: Security
        </Button>
      </Box>
    </Box>
  );
} 