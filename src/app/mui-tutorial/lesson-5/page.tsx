'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Switch,
  Slider,
  Rating,
  Autocomplete,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
  Stack,
  Avatar,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Edit,
  Person,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  Search,
  Assignment,
  PlayArrow,
  Lightbulb,
  Code,
  Rule,
  CheckBox,
  RadioButtonChecked,
  TextFields,
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

const textFieldVariants = [
  {
    variant: 'outlined',
    description: 'กรอบรอบๆ ฟิลด์ - ใช้บ่อยที่สุด',
    usage: 'ฟอร์มทั่วไป, การกรอกข้อมูล',
    pros: ['ชัดเจน', 'เหมาะกับทุกสถานการณ์', 'ใช้ง่าย'],
    cons: ['ขนาดใหญ่กว่า variant อื่น']
  },
  {
    variant: 'filled',
    description: 'พื้นหลังเต็ม มีเส้นล่าง',
    usage: 'UI ที่ต้องการความโมเดิร์น',
    pros: ['ดูโมเดิร์น', 'โดดเด่น', 'เหมาะกับ dark theme'],
    cons: ['อาจดูหนักไป', 'ไม่เหมาะทุก design']
  },
  {
    variant: 'standard',
    description: 'เส้นล่างเท่านั้น - มินิมอล',
    usage: 'UI แบบมินิมอล, ฟอร์มง่าย',
    pros: ['กะทัดรัด', 'มินิมอล', 'ประหยัดพื้นที่'],
    cons: ['อาจไม่ชัดเจนพอ', 'ใช้ยาก']
  }
];

const inputTypes = [
  { type: 'text', label: 'ข้อความทั่วไป', icon: <TextFields />, example: 'ชื่อ, ที่อยู่' },
  { type: 'email', label: 'อีเมล', icon: <Email />, example: 'user@example.com' },
  { type: 'password', label: 'รหัสผ่าน', icon: <Lock />, example: '••••••••' },
  { type: 'number', label: 'ตัวเลข', icon: <Rule />, example: 'อายุ, จำนวน' },
  { type: 'tel', label: 'เบอร์โทร', icon: <Phone />, example: '081-234-5678' },
  { type: 'search', label: 'ค้นหา', icon: <Search />, example: 'ค้นหาสินค้า' }
];

export default function MUILesson5Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    interests: [] as string[],
    newsletter: false,
    rating: 0,
    province: '',
    occupation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'กรุณากรอกชื่อ';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }
    
    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('ฟอร์มถูกต้อง! ข้อมูล: ' + JSON.stringify(formData, null, 2));
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
            <Edit color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 5: Forms และ Inputs
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การสร้างฟอร์มครบครันด้วย MUI สำหรับมือใหม่! 📋
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<TextFields />} label="TextField" color="primary" />
            <Chip icon={<CheckBox />} label="Checkbox & Radio" color="secondary" />
            <Chip icon={<Assignment />} label="Select & Autocomplete" color="success" />
            <Chip icon={<Rule />} label="Form Validation" color="warning" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> สร้างฟอร์มที่สมบูรณ์และใช้งานได้จริง
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 40 นาที | 
              📊 <strong>ระดับ:</strong> ปานกลาง
            </Typography>
          </Alert>

          {/* Why Forms Matter */}
          <Paper sx={{ p: 3, mb: 4, bgcolor: 'warning.50', border: '2px solid', borderColor: 'warning.200' }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lightbulb color="warning" /> 💡 ทำไมฟอร์มถึงสำคัญ?
            </Typography>
            
            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'warning.main', mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 📝 <strong>Data Collection:</strong> จุดสำคัญในการรับข้อมูลจากผู้ใช้
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • ✅ <strong>User Experience:</strong> ฟอร์มที่ดีทำให้ผู้ใช้กรอกข้อมูลได้ง่าย
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • 🔒 <strong>Data Validation:</strong> ป้องกันข้อมูลผิดพลาดก่อนส่งไปยัง server
              </Typography>
              <Typography variant="body2">
                • 🚀 <strong>Conversion Rate:</strong> ฟอร์มที่ดีเพิ่มอัตราการกรอกข้อมูลสำเร็จ
              </Typography>
            </Box>

            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ✨ <strong>ผลลัพธ์:</strong> ฟอร์มที่ใช้งานง่าย มี validation ดี และประสบการณ์ผู้ใช้ที่ยอดเยี่ยม!
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
                    primary="ใช้ TextField ได้อย่างเชี่ยวชาญ" 
                    secondary="variants, types, validation, styling"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Checkbox, Radio, Switch" 
                    secondary="การเลือกตัวเลือกแบบต่างๆ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Select และ Autocomplete" 
                    secondary="dropdown และ search ได้"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Form Validation" 
                    secondary="ตรวจสอบข้อมูลและแสดง error"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Form State Management" 
                    secondary="จัดการ state ของฟอร์มอย่างมืออาชีพ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="UX Best Practices" 
                    secondary="หลักการออกแบบฟอร์มที่ดี"
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
              label="📝 TextField Master" 
              icon={<TextFields />}
              iconPosition="start"
            />
            <Tab 
              label="☑️ Checkboxes & Radio" 
              icon={<CheckBox />}
              iconPosition="start"
            />
            <Tab 
              label="📋 Select & Autocomplete" 
              icon={<Assignment />}
              iconPosition="start"
            />
            <Tab 
              label="✅ Form Validation" 
              icon={<Rule />}
              iconPosition="start"
            />
            <Tab 
              label="🚀 Complete Form" 
              icon={<PlayArrow />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: TextField Master */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>📝 TextField Master</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            TextField เป็น component หลักสำหรับรับข้อมูลจากผู้ใช้ ใน MUI มี 3 variants หลัก
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 TextField Variants</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
            {textFieldVariants.map((field, index) => (
              <Card key={field.variant}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textTransform: 'capitalize' }}>
                    {field.variant}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {field.description}
                  </Typography>
                  
                  <TextField
                    variant={field.variant as any}
                    label={`${field.variant} TextField`}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
                    เหมาะสำหรับ:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    {field.usage}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'success.main' }}>
                      ✅ ข้อดี:
                    </Typography>
                    {field.pros.map((pro, i) => (
                      <Typography key={i} variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                        • {pro}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'error.main' }}>
                      ⚠️ ข้อควรระวัง:
                    </Typography>
                    {field.cons.map((con, i) => (
                      <Typography key={i} variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                        • {con}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>🔧 Input Types</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📱 HTML Input Types ที่ใช้บ่อย
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
                {inputTypes.map((input) => (
                  <Box key={input.type} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                      {input.icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {input.label} ({input.type})
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {input.example}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                💻 ตัวอย่างการใช้งาน:
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic TextField
<TextField 
  label="ชื่อ" 
  variant="outlined" 
  fullWidth 
/>

// Email TextField
<TextField 
  type="email"
  label="อีเมล" 
  variant="outlined" 
  fullWidth 
/>

// Password TextField
<TextField 
  type="password"
  label="รหัสผ่าน" 
  variant="outlined" 
  fullWidth 
/>

// Number TextField
<TextField 
  type="number"
  label="อายุ" 
  variant="outlined" 
  fullWidth 
  inputProps={{ min: 0, max: 120 }}
/>`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="ชื่อ-นามสกุล"
                  variant="outlined"
                  fullWidth
                  placeholder="กรุณากรอกชื่อของคุณ"
                />
                
                <TextField
                  type="email"
                  label="อีเมล"
                  variant="outlined"
                  fullWidth
                  placeholder="example@email.com"
                />
                
                <TextField
                  type="password"
                  label="รหัสผ่าน"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  type="number"
                  label="อายุ"
                  variant="outlined"
                  fullWidth
                  inputProps={{ min: 0, max: 120 }}
                />
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🎨 TextField ขั้นสูง</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ⚡ TextField Features
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// TextField with Icons
<TextField 
  label="ค้นหา"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
    ),
  }}
/>

// Multiline TextField
<TextField 
  label="ข้อความ"
  multiline
  rows={4}
  fullWidth
/>

// Helper Text
<TextField 
  label="อีเมล"
  helperText="เราจะไม่แชร์อีเมลของคุณ"
  fullWidth
/>

// Error State
<TextField 
  label="อีเมล"
  error
  helperText="รูปแบบอีเมลไม่ถูกต้อง"
  fullWidth
/>`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="ค้นหาสินค้า"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  label="ข้อความ"
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="กรุณากรอกข้อความของคุณ..."
                />
                
                <TextField
                  label="อีเมลสำหรับติดต่อ"
                  fullWidth
                  helperText="เราจะใช้อีเมลนี้ในการติดต่อกลับเท่านั้น"
                />
                
                <TextField
                  label="อีเมล"
                  fullWidth
                  error
                  helperText="รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง"
                />
              </Box>

              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  💡 <strong>เคล็ดลับ:</strong> ใช้ helperText เพื่อให้คำแนะนำ และ error state เพื่อแสดงข้อผิดพลาด
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 2: Checkboxes & Radio */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>☑️ Checkboxes & Radio</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Checkbox และ Radio Button สำหรับให้ผู้ใช้เลือกตัวเลือก
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>☑️ Checkbox</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📝 การใช้งาน Checkbox
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic Checkbox
<FormControlLabel
  control={<Checkbox />}
  label="ยอมรับเงื่อนไข"
/>

// Checkbox Group
<FormGroup>
  <FormControlLabel control={<Checkbox />} label="React" />
  <FormControlLabel control={<Checkbox />} label="Angular" />
  <FormControlLabel control={<Checkbox />} label="Vue" />
</FormGroup>`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.newsletter}
                      onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    />
                  }
                  label="ต้องการรับข่าวสารทาง Email"
                />
                
                <FormLabel component="legend">ความสนใจ (เลือกได้หลายข้อ):</FormLabel>
                <FormGroup>
                  {['Programming', 'Design', 'Marketing', 'Data Science'].map((interest) => (
                    <FormControlLabel
                      key={interest}
                      control={
                        <Checkbox
                          checked={formData.interests.includes(interest)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleInputChange('interests', [...formData.interests, interest]);
                            } else {
                              handleInputChange('interests', formData.interests.filter(i => i !== interest));
                            }
                          }}
                        />
                      }
                      label={interest}
                    />
                  ))}
                </FormGroup>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🔘 Radio Buttons</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎯 การใช้งาน Radio
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Radio Group
<FormControl>
  <FormLabel>เพศ</FormLabel>
  <RadioGroup value={gender} onChange={handleChange}>
    <FormControlLabel value="male" control={<Radio />} label="ชาย" />
    <FormControlLabel value="female" control={<Radio />} label="หญิง" />
    <FormControlLabel value="other" control={<Radio />} label="อื่นๆ" />
  </RadioGroup>
</FormControl>`}
                </Typography>
              </Box>

              <FormControl>
                <FormLabel>เพศ</FormLabel>
                <RadioGroup
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <FormControlLabel value="male" control={<Radio />} label="ชาย" />
                  <FormControlLabel value="female" control={<Radio />} label="หญิง" />
                  <FormControlLabel value="other" control={<Radio />} label="อื่นๆ" />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🎚️ Switch & Slider</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ⚡ อื่นๆ ที่น่าสนใจ
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Switch:</Typography>
                  <FormControlLabel
                    control={<Switch />}
                    label="เปิด/ปิด การแจ้งเตือน"
                  />
                </Box>
                
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Slider:</Typography>
                  <Typography gutterBottom>ระดับความพึงพอใจ</Typography>
                  <Slider
                    defaultValue={30}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={0}
                    max={100}
                  />
                </Box>
                
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>Rating:</Typography>
                  <Rating
                    value={formData.rating}
                    onChange={(event, newValue) => {
                      handleInputChange('rating', newValue);
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 3: Select & Autocomplete */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>📋 Select & Autocomplete</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Select และ Autocomplete สำหรับให้ผู้ใช้เลือกจากรายการ
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>📋 Select</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎯 การใช้งาน Select
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Basic Select
<FormControl fullWidth>
  <InputLabel>จังหวัด</InputLabel>
  <Select value={province} onChange={handleChange}>
    <MenuItem value="bangkok">กรุงเทพฯ</MenuItem>
    <MenuItem value="chiangmai">เชียงใหม่</MenuItem>
    <MenuItem value="phuket">ภูเก็ต</MenuItem>
  </Select>
</FormControl>`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>จังหวัด</InputLabel>
                  <Select
                    value={formData.province || ''}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                  >
                    <MenuItem value="bangkok">กรุงเทพมหานคร</MenuItem>
                    <MenuItem value="chiangmai">เชียงใหม่</MenuItem>
                    <MenuItem value="phuket">ภูเก็ต</MenuItem>
                    <MenuItem value="khonkaen">ขอนแก่น</MenuItem>
                    <MenuItem value="songkhla">สงขลา</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth>
                  <InputLabel>อาชีพ</InputLabel>
                  <Select
                    value={formData.occupation || ''}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                  >
                    <MenuItem value="developer">นักพัฒนา</MenuItem>
                    <MenuItem value="designer">นักออกแบบ</MenuItem>
                    <MenuItem value="marketer">นักการตลาด</MenuItem>
                    <MenuItem value="student">นักเรียน/นักศึกษา</MenuItem>
                    <MenuItem value="other">อื่นๆ</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🔍 Autocomplete</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ⚡ Autocomplete ขั้นสูง
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Autocomplete
<Autocomplete
  options={countries}
  getOptionLabel={(option) => option.label}
  renderInput={(params) => (
    <TextField {...params} label="ประเทศ" />
  )}
/>`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Autocomplete
                  options={[
                    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP'
                  ]}
                  renderInput={(params) => <TextField {...params} label="ภาษาโปรแกรมที่ถนัด" />}
                />
                
                <Autocomplete
                  multiple
                  options={['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js']}
                  renderInput={(params) => <TextField {...params} label="Framework ที่ใช้งาน" />}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />
                    ))
                  }
                />
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 4: Form Validation */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>✅ Form Validation</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            การตรวจสอบข้อมูลและแสดง error message อย่างมืออาชีพ
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎯 Validation Pattern
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`// Validation Function
const validateForm = () => {
  const newErrors = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'กรุณากรอกชื่อ';
  }
  
  if (!formData.email.trim()) {
    newErrors.email = 'กรุณากรอกอีเมล';
  } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
    newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};`}
                </Typography>
              </Box>

              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                ตัวอย่าง Form พร้อม Validation:
              </Typography>
              
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                  <TextField
                    label="ชื่อ"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    required
                  />
                  <TextField
                    type="email"
                    label="อีเมล"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    required
                  />
                </Box>
                
                <TextField
                  type="password"
                  label="รหัสผ่าน"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                />
                
                <Button
                  variant="contained"
                  onClick={validateForm}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  ทดสอบ Validation
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📋 Validation Best Practices
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Real-time validation" 
                    secondary="ตรวจสอบทันทีเมื่อผู้ใช้พิมพ์เสร็จ"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Clear error messages" 
                    secondary="ข้อความ error ต้องชัดเจนและเข้าใจง่าย"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                  <ListItemText 
                    primary="Visual feedback" 
                    secondary="ใช้สีและไอคอนแสดงสถานะ"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 5: Complete Form */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>🚀 Complete Form</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            ฟอร์มสมบูรณ์ที่รวมทุกอย่างที่เรียนมา
          </Typography>

          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                📝 แบบฟอร์มลงทะเบียน
              </Typography>
              
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                  <TextField
                    label="ชื่อ"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    required
                  />
                  <TextField
                    type="email"
                    label="อีเมล"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    required
                  />
                </Box>
                
                <TextField
                  type="password"
                  label="รหัสผ่าน"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                />
                
                <TextField
                  type="number"
                  label="อายุ"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  inputProps={{ min: 13, max: 120 }}
                  fullWidth
                />
                
                <FormControl>
                  <FormLabel>เพศ</FormLabel>
                  <RadioGroup
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    row
                  >
                    <FormControlLabel value="male" control={<Radio />} label="ชาย" />
                    <FormControlLabel value="female" control={<Radio />} label="หญิง" />
                    <FormControlLabel value="other" control={<Radio />} label="อื่นๆ" />
                  </RadioGroup>
                </FormControl>
                
                <FormControl>
                  <FormLabel>ความสนใจ (เลือกได้หลายข้อ)</FormLabel>
                  <FormGroup row>
                    {['Programming', 'Design', 'Marketing', 'Data Science'].map((interest) => (
                      <FormControlLabel
                        key={interest}
                        control={
                          <Checkbox
                            checked={formData.interests.includes(interest)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleInputChange('interests', [...formData.interests, interest]);
                              } else {
                                handleInputChange('interests', formData.interests.filter(i => i !== interest));
                              }
                            }}
                          />
                        }
                        label={interest}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                
                <Box>
                  <Typography component="legend">ระดับความพึงพอใจ</Typography>
                  <Rating
                    value={formData.rating}
                    onChange={(event, newValue) => {
                      handleInputChange('rating', newValue);
                    }}
                  />
                </Box>
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.newsletter}
                      onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    />
                  }
                  label="ต้องการรับข่าวสารและโปรโมชัน"
                />
                
                <Divider />
                
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button variant="outlined" color="inherit">
                    ยกเลิก
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                    size="large"
                  >
                    ลงทะเบียน
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/mui-tutorial/lesson-4"
            variant="outlined"
          >
            บทที่ 4: Buttons และ Actions
          </Button>
          
          <Chip 
            label="5 / 8"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/mui-tutorial/lesson-6"
            variant="contained"
          >
            บทที่ 6: Navigation Components
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 