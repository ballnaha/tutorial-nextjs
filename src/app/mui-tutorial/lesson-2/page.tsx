'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Card,
  CardContent,
  Stack,
  Chip,
  Button,
  Tab,
  Tabs,
  FormControlLabel,
  Switch,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  MenuItem,
  Slider,
  Avatar,
  Badge,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Palette,
  DarkMode,
  LightMode,
  AutoMode,
  Code,
  ColorLens,
  Brush,
  Settings,
  CheckCircle,
  Star,
  Notifications,
  Favorite,
  FavoriteBorder,
  Brightness4,
  Brightness7,
  BrushOutlined,
  StyleOutlined,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { styled, alpha } from '@mui/material/styles';

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

// Custom styled components for demonstration
const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
  ...theme.applyStyles('dark', {
    backgroundColor: theme.vars?.palette.grey[900],
    borderColor: theme.vars?.palette.grey[700],
  }),
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  border: 0,
  borderRadius: 25,
  boxShadow: `0 3px 5px 2px ${alpha(theme.palette.primary.main, 0.3)}`,
  color: 'white',
  height: 48,
  padding: '0 30px',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
    transform: 'scale(1.05)',
  },
  
  // Dark mode รองรับผ่าน theme.palette ที่เปลี่ยนไปตาม colorScheme
  ...theme.applyStyles('dark', {
    boxShadow: `0 3px 5px 2px ${alpha(theme.palette.primary.main, 0.2)}`,
  }),
}));

const InteractiveDemo = () => {
  const { mode, setMode } = useColorScheme();
  const [primaryColor, setPrimaryColor] = useState('#1976d2');
  const [spacing, setSpacing] = useState(8);
  const [borderRadius, setBorderRadius] = useState(4);

  // Fallback สำหรับกรณีที่ mode ยังไม่ ready (hydration)
  if (!mode) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>🎮 Interactive Theme Playground</Typography>
        <Paper sx={{ p: 3 }}>
          <Typography>🔄 กำลังโหลด theme...</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>🎮 Interactive Theme Playground</Typography>
      
      <Stack spacing={3}>
        <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>โหมดปัจจุบัน: <strong>{mode}</strong></Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(event, newMode) => newMode && setMode(newMode)}
              aria-label="color scheme"
            >
              <ToggleButton value="light" aria-label="light mode">
                <LightMode />
                Light
              </ToggleButton>
              <ToggleButton value="system" aria-label="system mode">
                <AutoMode />
                System
              </ToggleButton>
              <ToggleButton value="dark" aria-label="dark mode">
                <DarkMode />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ minWidth: 200 }}>
            <Typography gutterBottom>Primary Color</Typography>
            <TextField
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              fullWidth
            />
          </Box>
          
          <Box sx={{ minWidth: 200 }}>
            <Typography gutterBottom>Spacing: {spacing}px</Typography>
            <Slider
              value={spacing}
              onChange={(e, newValue) => setSpacing(newValue as number)}
              min={4}
              max={16}
              step={2}
            />
          </Box>
          
          <Box sx={{ minWidth: 200 }}>
            <Typography gutterBottom>Border Radius: {borderRadius}px</Typography>
            <Slider
              value={borderRadius}
              onChange={(e, newValue) => setBorderRadius(newValue as number)}
              min={0}
              max={20}
              step={2}
            />
          </Box>
        </Box>

        <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>👀 Live Preview</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Button 
              variant="contained" 
              sx={{ 
                borderRadius: `${borderRadius}px`,
                px: `${spacing}px`
              }}
            >
              Themed Button
            </Button>
            <Button 
              variant="outlined"
              sx={{ 
                borderRadius: `${borderRadius}px`,
                px: `${spacing}px`
              }}
            >
              Outlined Button
            </Button>
            <GradientButton>
              Custom Gradient
            </GradientButton>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

const themeExamples = {
  basic: `// theme.ts - Basic Theme with CSS Variables
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true, // เปิดใช้ CSS Variables
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
        },
        secondary: {
          main: '#dc004e',
          light: '#ff5983',
          dark: '#9a0036',
        },
        background: {
          default: '#ffffff',
          paper: '#f5f5f5',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#90caf9',
          light: '#e3f2fd',
          dark: '#42a5f5',
        },
        secondary: {
          main: '#f48fb1',
          light: '#fce4ec',
          dark: '#ad2c4c',
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
      },
    },
  },
});`,

  advanced: `// Advanced Theme Configuration
const advancedTheme = createTheme({
  cssVariables: true,
  
  // Custom breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  
  // Custom spacing
  spacing: (factor: number) => \`\${0.5 * factor}rem\`,
  
  // Typography system
  typography: {
    fontFamily: 'var(--font-roboto), Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  
  // Custom shape
  shape: {
    borderRadius: 12,
  },
  
  // Component overrides
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          textTransform: 'none',
          borderRadius: theme.spacing(2),
          padding: theme.spacing(1.5, 3),
          fontWeight: 600,
          ...(ownerState.variant === 'contained' && {
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
            },
          }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.spacing(2),
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[6],
          },
        }),
      },
    },
  },
});`,

  cssVariables: `/* styles.css - Using MUI CSS Variables */
.custom-component {
  /* Access theme colors */
  background-color: var(--mui-palette-primary-main);
  color: var(--mui-palette-primary-contrastText);
  
  /* Use spacing */
  padding: var(--mui-spacing-2);
  margin: var(--mui-spacing-1);
  
  /* Typography */
  font-family: var(--mui-typography-fontFamily);
  font-size: var(--mui-typography-body1-fontSize);
  
  /* Border radius */
  border-radius: var(--mui-shape-borderRadius);
  
  /* Shadows */
  box-shadow: var(--mui-shadows-2);
}

/* Dark mode specific styles */
@media (prefers-color-scheme: dark) {
  .custom-component {
    background-color: var(--mui-palette-primary-dark);
  }
}`,

  styledComponents: `// Custom Styled Components
import { styled, alpha } from '@mui/material/styles';
import { Card, Button } from '@mui/material';

// Custom Card with hover effects
const AnimatedCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: theme.shadows[12],
  },
  
  // Dark mode styles using applyStyles
  ...theme.applyStyles('dark', {
    backgroundColor: theme.vars?.palette.grey[900],
    borderColor: theme.vars?.palette.grey[700],
  }),
}));

// Gradient Button
const GradientButton = styled(Button)(({ theme }) => ({
  background: \`linear-gradient(45deg, 
    \${theme.palette.primary.main} 30%, 
    \${theme.palette.secondary.main} 90%)\`,
  border: 0,
  borderRadius: 25,
  boxShadow: \`0 3px 5px 2px \${alpha(theme.palette.primary.main, 0.3)}\`,
  color: 'white',
  height: 48,
  padding: '0 30px',
  
  '&:hover': {
    background: \`linear-gradient(45deg, 
      \${theme.palette.primary.dark} 30%, 
      \${theme.palette.secondary.dark} 90%)\`,
    transform: 'scale(1.05)',
  },
}));

// Glass morphism effect
const GlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(20px)',
  border: \`1px solid \${alpha(theme.palette.divider, 0.2)}\`,
  borderRadius: theme.spacing(3),
}));`
};

const sxExamples = [
  {
    title: 'Basic sx prop usage',
    code: `<Box
  sx={{
    bgcolor: 'primary.main',
    color: 'white',
    p: 2,
    borderRadius: 1,
    boxShadow: 2,
  }}
>
  Basic styled box
</Box>`,
    description: 'การใช้ sx prop พื้นฐานสำหรับ styling แบบ inline'
  },
  {
    title: 'Responsive Design',
    code: `<Typography
  sx={{
    fontSize: {
      xs: '1rem',
      sm: '1.2rem',
      md: '1.5rem',
      lg: '2rem',
    },
    textAlign: {
      xs: 'center',
      md: 'left',
    },
  }}
>
  Responsive Typography
</Typography>`,
    description: 'การใช้ breakpoints สำหรับ responsive design'
  },
  {
    title: 'Theme-based Conditional Styling',
    code: `<Card
  sx={(theme) => ({
    bgcolor: 'background.paper',
    p: 3,
    borderRadius: 2,
    transition: 'all 0.3s ease',
    
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[8],
    },
    
    // Dark mode specific styles
    ...theme.applyStyles('dark', {
      bgcolor: 'grey.900',
      border: '1px solid',
      borderColor: 'grey.700',
    }),
  })}
>
  Theme-aware Card
</Card>`,
    description: 'การใช้ function syntax และ applyStyles สำหรับ dark mode'
  }
];

export default function MUILesson2Page() {
  const [activeTab, setActiveTab] = useState(0);
  const { mode, setMode } = useColorScheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // ถ้า mode ยังไม่ ready ให้แสดง loading
  if (!mode) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h4">🔄 กำลังโหลด theme...</Typography>
          <Typography variant="body1" color="text.secondary">
            กรุณารอสักครู่
          </Typography>
        </Box>
      </Container>
    );
  }

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
            <Palette color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 2: Theme และ Styling ระดับสูง
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            เรียนรู้การจัดการ Theme, CSS Variables, Dark Mode และการ customize styles อย่างลึกซึ้ง! 🎭
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<ColorLens />} label="CSS Variables" color="primary" />
            <Chip icon={<DarkMode />} label="Dark Mode" color="secondary" />
            <Chip icon={<Brush />} label="Custom Styling" color="success" />
            <Chip icon={<Settings />} label="Theme Provider" color="warning" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              🎯 <strong>เป้าหมายของบทเรียนนี้:</strong> เชี่ยวชาญการปรับแต่ง Theme และ Styling ใน MUI v7
              <br />
              ⏱️ <strong>ระยะเวลา:</strong> 35 นาที | 
              📊 <strong>ระดับ:</strong> ระดับกลาง
            </Typography>
          </Alert>
          
          {/* แสดงสถานะปัจจุบัน */}
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              🌓 <strong>โหมดปัจจุบัน:</strong> {mode} 
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                startIcon={mode === 'light' ? <DarkMode /> : <LightMode />}
                sx={{ ml: 2 }}
              >
                สลับเป็น {mode === 'light' ? 'Dark' : 'Light'}
              </Button>
            </Typography>
          </Paper>
        </Box>

        {/* Interactive Demo */}
        <InteractiveDemo />

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
                    primary="สร้าง Custom Theme" 
                    secondary="CSS Variables, Color Schemes, Typography"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="จัดการ Dark/Light Mode" 
                    secondary="useColorScheme hook, applyStyles"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Styled Components" 
                    secondary="styled(), alpha(), custom animations"
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <List dense>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="sx prop มืออาชีพ" 
                    secondary="Responsive, conditional styling"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Component Overrides" 
                    secondary="Global theme customization"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                  <ListItemText 
                    primary="Performance Optimization" 
                    secondary="CSS Variables benefits"
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
              label="🎨 CSS Variables & Color Schemes" 
              icon={<ColorLens />}
              iconPosition="start"
            />
            <Tab 
              label="🌓 Dark Mode Management" 
              icon={<DarkMode />}
              iconPosition="start"
            />
            <Tab 
              label="✨ Styled Components" 
              icon={<Brush />}
              iconPosition="start"
            />
            <Tab 
              label="📝 sx prop Advanced" 
              icon={<Code />}
              iconPosition="start"
            />
            <Tab 
              label="⚙️ Component Overrides" 
              icon={<Settings />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab 1: CSS Variables & Color Schemes */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>🎨 CSS Variables & Color Schemes</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>CSS Variables</strong> ใน MUI v7 ทำให้เราสามารถเข้าถึงค่า theme จาก CSS ได้โดยตรง 
            และจัดการ light/dark mode ได้อย่างมีประสิทธิภาพ
          </Typography>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              ✨ <strong>ประโยชน์ของ CSS Variables:</strong> ป้องกัน SSR flickering, ดู theme values ใน DevTools, 
              ใช้ในไฟล์ CSS ธรรมดาได้
            </Typography>
          </Alert>

          <Typography variant="h5" sx={{ mb: 2 }}>📋 Basic Theme Setup</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {themeExamples.basic}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 Advanced Theme Configuration</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Complete Theme Setup</Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {themeExamples.advanced}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🌐 Using CSS Variables in Plain CSS</Typography>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>CSS Variables in Action</Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {themeExamples.cssVariables}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 2: Dark Mode */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>🌓 Dark Mode Management</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            MUI v7 มาพร้อมกับระบบจัดการ Dark Mode ที่ทรงพลัง สามารถสลับโหมดได้อัตโนมัติ 
            และรองรับการตั้งค่าของระบบ
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>🎮 Live Dark Mode Toggle</Typography>
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography>Current Mode: {mode}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                  startIcon={mode === 'light' ? <DarkMode /> : <LightMode />}
                >
                  Switch to {mode === 'light' ? 'Dark' : 'Light'}
                </Button>
              </Stack>
            </Paper>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>⚙️ useColorScheme Hook</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Dark Mode Hook Usage</Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`import { useColorScheme } from '@mui/material/styles';

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  
  if (!mode) return null; // ป้องกัน hydration mismatch
  
  return (
    <Button
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      startIcon={mode === 'light' ? <DarkMode /> : <LightMode />}
    >
      Switch to {mode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
}`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🎨 applyStyles for Dark Mode</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Modern Dark Mode Styling</Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.vars.palette.background.paper,
  borderRadius: theme.spacing(2),
  
  // Dark mode styles
  ...theme.applyStyles('dark', {
    backgroundColor: theme.vars.palette.grey[900],
    border: '1px solid',
    borderColor: theme.vars.palette.grey[700],
  }),
}));

// หรือใช้กับ sx prop
<Box
  sx={(theme) => ({
    bgcolor: 'background.default',
    p: 3,
    ...theme.applyStyles('dark', {
      bgcolor: 'grey.900',
      color: 'grey.100',
    }),
  })}
/>`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              ⚠️ <strong>สำคัญ:</strong> ใช้ theme.applyStyles() แทน theme.palette.mode === 'dark' 
              เพื่อป้องกัน SSR flickering
            </Typography>
          </Alert>

          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <CustomCard>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  🌞 Light Mode Card
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  การ์ดนี้จะเปลี่ยนสีตาม theme mode โดยอัตโนมัติ
                </Typography>
              </CardContent>
            </CustomCard>
            
            <CustomCard>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Star />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Dynamic Theme</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Auto-adapting colors
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </CustomCard>
          </Box>
        </TabPanel>

        {/* Tab 3: Styled Components */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>✨ Styled Components</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Styled Components</strong> ใน MUI ช่วยให้เราสร้าง custom components ที่มี styling ที่ซับซ้อน
            และสามารถใช้ซ้ำได้
          </Typography>

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              ⚠️ <strong>สำคัญ:</strong> ใช้ <code>theme.palette</code> สำหรับ <code>alpha()</code> function, 
              ใช้ <code>theme.vars</code> สำหรับ CSS Variables อื่นๆ เท่านั้น
            </Typography>
          </Alert>

          <Typography variant="h5" sx={{ mb: 2 }}>🎨 Basic Styled Components</Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Complete Styled Components Examples</Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {themeExamples.styledComponents}
                </Typography>
              </Box>
              
              <Typography variant="h6" sx={{ mb: 2 }}>Live Examples</Typography>
              <Stack spacing={2}>
                <CustomCard>
                  <CardContent>
                    <Typography variant="h6">Custom Animated Card</Typography>
                    <Typography variant="body2">Hover เพื่อดู animation effect</Typography>
                  </CardContent>
                </CustomCard>
                
                <Box>
                  <GradientButton sx={{ mr: 2 }}>
                    Gradient Button
                  </GradientButton>
                  <Button variant="outlined">
                    Regular Button
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🔧 Advanced Styling Techniques</Typography>
          
          <Box sx={{ display: 'grid', gap: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  💡 Pro Tips for Styled Components
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                    <ListItemText 
                      primary="ใช้ theme.palette สำหรับ alpha() function"
                      secondary="alpha() ต้องการค่าสีจริง ไม่ใช่ CSS Variables"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                    <ListItemText 
                      primary="ใช้ theme.vars สำหรับ CSS Variables"
                      secondary="เหมาะสำหรับ border, background ธรรมดา"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                    <ListItemText 
                      primary="เพิ่ม transitions สำหรับ smooth animations"
                      secondary="ใช้ cubic-bezier สำหรับ natural motion"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>

        {/* Tab 4: sx prop Advanced */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>📝 sx prop Advanced</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>sx prop</strong> เป็นวิธีที่มีประสิทธิภาพในการ styling components แบบ inline 
            พร้อมรองรับ responsive design และ theme integration
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>📚 sx Examples</Typography>
          
          <Stack spacing={3}>
            {sxExamples.map((example, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {example.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {example.description}
                  </Typography>
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {example.code}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              💡 <strong>Performance Tip:</strong> ใช้ styled() สำหรับ styles ที่ซับซ้อนและต้องใช้ซ้ำ
              ใช้ sx สำหรับ quick styling และ one-off customizations
            </Typography>
          </Alert>
        </TabPanel>

        {/* Tab 5: Component Overrides */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>⚙️ Component Overrides</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Component Overrides</strong> ใน theme ช่วยให้เราปรับแต่ง default styles ของ MUI components 
            ทั้งแอปพลิเคชันได้อย่างสม่ำเสมอ
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Global Component Customization</Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
{`const theme = createTheme({
  cssVariables: true,
  components: {
    // Button customization
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          textTransform: 'none',
          borderRadius: theme.spacing(2),
          fontWeight: 600,
          
          // Conditional styling based on variant
          ...(ownerState.variant === 'contained' && {
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-1px)',
            },
          }),
          
          // Size-specific styling
          ...(ownerState.size === 'large' && {
            padding: theme.spacing(1.5, 4),
            fontSize: '1.1rem',
          }),
        }),
      },
    },
    
    // Card customization
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.spacing(2),
          transition: 'all 0.3s ease',
          
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
          
          ...theme.applyStyles('dark', {
            backgroundColor: theme.vars.palette.grey[900],
            border: '1px solid',
            borderColor: theme.vars.palette.grey[700],
          }),
        }),
      },
    },
    
    // Typography customization
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: 700,
          letterSpacing: '-0.02em',
        },
        body1: {
          lineHeight: 1.7,
        },
      },
    },
  },
});`}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ mb: 2 }}>🎯 Live Component Override Examples</Typography>
          
          <Box sx={{ display: 'grid', gap: 3 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Customized Components</Typography>
              <Stack spacing={2}>
                <Button variant="contained" size="large">
                  Custom Styled Button (Large)
                </Button>
                <Button variant="outlined" color="secondary">
                  Custom Outlined Button
                </Button>
                <CustomCard>
                  <CardContent>
                    <Typography variant="h6">Custom Card with Hover Effect</Typography>
                    <Typography variant="body2" color="text.secondary">
                      นี่คือ Card ที่ได้รับการปรับแต่งจาก theme overrides
                    </Typography>
                  </CardContent>
                </CustomCard>
              </Stack>
            </Paper>
          </Box>

          <Alert severity="success" sx={{ mt: 3 }}>
            <Typography variant="body2">
              🎨 <strong>Best Practice:</strong> ใช้ component overrides สำหรับ global styling และ 
              styled() หรือ sx สำหรับ component-specific customizations
            </Typography>
          </Alert>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/mui-tutorial/lesson-1"
            variant="outlined"
          >
            บทที่ 1: เริ่มต้นกับ MUI v7
          </Button>
          
          <Chip 
            label="2 / 8"
            color="primary"
            variant="filled"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/mui-tutorial/lesson-3"
            variant="contained"
          >
            บทที่ 3: Layout Components
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 