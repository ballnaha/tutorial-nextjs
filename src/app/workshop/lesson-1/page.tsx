'use client';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Avatar,
  Tabs,
  Tab,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Collapse,
  Divider,
  useTheme,
  useMediaQuery,
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Home,
  NavigateNext,
  School,
  Menu as MenuIcon,
  Dashboard,
  Settings,
  Person,
  ShoppingCart,
  BarChart,
  Help,
  ExpandMore,
  ExpandLess,
  ChevronRight,
  Code,
  Visibility,
  PlayArrow,
  CheckCircle,
  Info,
  Lightbulb,
  Warning,
  Build,
  FolderOpen,
  InsertDriveFile,
  ContentCopy,
  Close,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState, useCallback } from 'react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Dashboard />,
    href: '/dashboard',
  },
  {
    id: 'products',
    label: 'สินค้า',
    icon: <ShoppingCart />,
    children: [
      { id: 'product-list', label: 'รายการสินค้า', icon: <ChevronRight />, href: '/products' },
      { id: 'product-add', label: 'เพิ่มสินค้า', icon: <ChevronRight />, href: '/products/add' },
      { id: 'categories', label: 'หมวดหมู่', icon: <ChevronRight />, href: '/categories' },
      { id: 'inventory', label: 'คลังสินค้า', icon: <ChevronRight />, href: '/inventory' },
    ],
  },
  {
    id: 'analytics',
    label: 'รายงาน',
    icon: <BarChart />,
    children: [
      { id: 'sales', label: 'ยอดขาย', icon: <ChevronRight />, href: '/analytics/sales' },
      { id: 'traffic', label: 'การเข้าชม', icon: <ChevronRight />, href: '/analytics/traffic' },
      { id: 'performance', label: 'ประสิทธิภาพ', icon: <ChevronRight />, href: '/analytics/performance' },
    ],
  },
  {
    id: 'users',
    label: 'ผู้ใช้งาน',
    icon: <Person />,
    href: '/users',
  },
  {
    id: 'settings',
    label: 'ตั้งค่า',
    icon: <Settings />,
    children: [
      { id: 'general', label: 'ทั่วไป', icon: <ChevronRight />, href: '/settings/general' },
      { id: 'security', label: 'ความปลอดภัย', icon: <ChevronRight />, href: '/settings/security' },
    ],
  },
  {
    id: 'help',
    label: 'ช่วยเหลือ',
    icon: <Help />,
    href: '/help',
  },
];

// Professional Demo Component
function ProfessionalVerticalMenuDemo() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleItemClick = useCallback((itemId: string, hasChildren: boolean) => {
    if (hasChildren) {
      setExpandedItems(prev => {
        const isCurrentlyExpanded = prev.includes(itemId);
        
        if (isCurrentlyExpanded) {
          return prev.filter(id => id !== itemId);
        } else {
          return [itemId];
        }
      });
    } else {
      setActiveItem(itemId);
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  }, [isMobile]);

  // Helper function to find menu item by id (including children)
  const findMenuItem = (items: MenuItem[], id: string): MenuItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findMenuItem(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const currentMenuItem = findMenuItem(menuItems, activeItem);
  const currentTitle = currentMenuItem?.label || 'Dashboard';

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = Boolean(item.children && item.children.length > 0);
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;

    return (
      <Box key={item.id} sx={{ width: '100%' }}>
        <ListItem
          component="div"
          onClick={() => handleItemClick(item.id, hasChildren)}
          sx={{
            pl: isMobile ? 1.5 + level * 1 : 2 + level * 1.5,
            py: isMobile ? 0.75 : 1,
            cursor: 'pointer',
            borderRadius: 1.5,
            mx: isMobile ? 0.5 : 1,
            mb: 0.5,
            bgcolor: isActive ? 'primary.main' : 'transparent',
            color: isActive ? 'white' : 'inherit',
            minWidth: 0, // ป้องกัน overflow
            width: 'calc(100% - 8px)', // คำนวณ width หัก margin
            '&:hover': {
              bgcolor: isActive ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)',
            },
            transition: 'all 0.15s ease',
          }}
        >
          <ListItemIcon
            sx={{
              color: isActive ? 'white' : 'text.secondary',
              minWidth: isMobile ? 28 : 36,
              fontSize: level > 0 ? (isMobile ? '0.9rem' : '1rem') : (isMobile ? '1rem' : '1.1rem'),
              flexShrink: 0
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            sx={{
              minWidth: 0, // ป้องกัน overflow
              flex: 1,
              '& .MuiListItemText-primary': {
                fontWeight: isActive ? 600 : level > 0 ? 400 : 500,
                fontSize: level > 0 ? (isMobile ? '0.75rem' : '0.85rem') : (isMobile ? '0.85rem' : '0.95rem'),
                color: level > 0 ? 'text.secondary' : 'inherit',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              },
            }}
          />
          {hasChildren && (
            <Box sx={{ 
              color: isActive ? 'white' : 'text.secondary',
              transition: 'transform 0.15s ease',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              flexShrink: 0,
              ml: 0.5
            }}>
              <ChevronRight sx={{ fontSize: isMobile ? '1rem' : '1.1rem' }} />
            </Box>
          )}
        </ListItem>

        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ width: '100%' }}>
              {item.children!.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  const menuContent = (
    <Box sx={{ 
      width: isMobile ? '100vw' : 280, 
      maxWidth: isMobile ? '100vw' : 280,
      height: '100%', 
      bgcolor: 'background.paper', 
      borderRight: isMobile ? 'none' : '1px solid', 
      borderColor: 'divider',
      overflow: 'hidden', // ป้องกัน scroll-x
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Section */}
      <Box sx={{ 
        p: isMobile ? 2 : 2.5, 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        bgcolor: 'background.paper',
        flexShrink: 0, // ป้องกันการหด
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
          <Box sx={{ 
            width: isMobile ? 28 : 32, 
            height: isMobile ? 28 : 32, 
            borderRadius: 1.5, 
            bgcolor: 'primary.main', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mr: isMobile ? 1.5 : 2,
            flexShrink: 0
          }}>
            <Dashboard sx={{ color: 'white', fontSize: isMobile ? '1rem' : '1.1rem' }} />
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              fontSize: isMobile ? '1rem' : '1.1rem', 
              mb: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Admin Panel
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ 
              fontSize: isMobile ? '0.7rem' : '0.75rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Dashboard v2.0
            </Typography>
          </Box>
        </Box>
        
        {/* Close Button - เฉพาะมือถือ */}
        {isMobile && (
          <IconButton 
            onClick={() => setMobileOpen(false)}
            sx={{ 
              ml: 1,
              flexShrink: 0,
              color: 'text.secondary',
              '&:focus': {
                outline: 'none',
              },
              '&:active': {
                outline: 'none',
                border: 'none',
              },
              '&:hover': {
                bgcolor: 'action.hover',
              }
            }}
          >
            <Close sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        )}
      </Box>
      
      {/* Menu Items */}
      <Box sx={{ 
        py: 1, 
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden', // ป้องกัน scroll-x
        minHeight: 0 // สำคัญสำหรับ flex
      }}>
        <List sx={{ py: 0.5, width: '100%' }}>
          {menuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>

      {/* Admin Profile Section */}
      <Box sx={{ 
        borderTop: '1px solid', 
        borderColor: 'divider',
        p: isMobile ? 1.5 : 2,
        bgcolor: 'grey.50',
        flexShrink: 0 // ป้องกันการหด
      }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            p: isMobile ? 1 : 1.5,
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.2s ease',
            minWidth: 0, // ป้องกัน overflow
            '&:hover': {
              bgcolor: 'primary.50',
              borderColor: 'primary.200',
            }
          }}
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        >
          <Avatar 
            sx={{ 
              width: isMobile ? 32 : 36, 
              height: isMobile ? 32 : 36, 
              bgcolor: 'primary.main',
              mr: isMobile ? 1.5 : 2,
              fontSize: isMobile ? '0.9rem' : '1rem',
              flexShrink: 0
            }}
          >
            <Person />
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600, 
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              นาย สมชาย ใจดี
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                fontSize: isMobile ? '0.7rem' : '0.75rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              System Administrator
            </Typography>
          </Box>
          <Box sx={{ 
            color: 'text.secondary',
            transition: 'transform 0.2s ease',
            transform: profileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0
          }}>
            <ExpandMore sx={{ fontSize: isMobile ? '1.1rem' : '1.2rem' }} />
          </Box>
        </Box>

        {/* Profile Menu */}
        <Collapse in={profileMenuOpen} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 1 }}>
            {[
              { icon: <Person />, label: 'โปรไฟล์ของฉัน', id: 'profile' },
              { icon: <Settings />, label: 'ตั้งค่าบัญชี', id: 'account-settings' },
              { icon: <Help />, label: 'ช่วยเหลือ', id: 'help' }
            ].map((item) => (
              <ListItem
                key={item.id}
                component="div"
                onClick={() => {
                  setActiveItem(item.id);
                  setProfileMenuOpen(false);
                  if (isMobile) {
                    setMobileOpen(false);
                  }
                }}
                sx={{
                  pl: isMobile ? 1 : 1.5,
                  py: isMobile ? 0.75 : 1,
                  cursor: 'pointer',
                  borderRadius: 1.5,
                  mx: 0.5,
                  mb: 0.5,
                  bgcolor: activeItem === item.id ? 'primary.main' : 'transparent',
                  color: activeItem === item.id ? 'white' : 'inherit',
                  minWidth: 0, // ป้องกัน overflow
                  '&:hover': {
                    bgcolor: activeItem === item.id ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)',
                  },
                  transition: 'all 0.15s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeItem === item.id ? 'white' : 'text.secondary',
                    minWidth: isMobile ? 28 : 32,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    minWidth: 0, // ป้องกัน overflow
                    '& .MuiListItemText-primary': {
                      fontSize: isMobile ? '0.75rem' : '0.85rem',
                      fontWeight: activeItem === item.id ? 600 : 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    },
                  }}
                />
              </ListItem>
            ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      height: 600, 
      border: '1px solid', 
      borderColor: 'divider', 
      borderRadius: 2, 
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '100%'
    }}>
      {/* Desktop Sidebar */}
      {!isMobile && menuContent}

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: '100vw', 
            maxWidth: '100vw',
            boxSizing: 'border-box',
            overflow: 'hidden' // ป้องกัน scroll-x
          },
        }}
      >
        {menuContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: 'grey.50', minWidth: 0 }}>
        {/* Minimal Top Bar */}
        <Box sx={{ 
          px: 3, 
          py: 2, 
          bgcolor: 'background.paper', 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          minWidth: 0, // ป้องกัน overflow
          width: '100%'
        }}>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 2, flexShrink: 0 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              fontSize: '1.1rem', 
              mb: 0.5,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {currentTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {currentMenuItem?.href ? `หน้า ${currentMenuItem.href}` : 'หน้าหลักของระบบ'}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flexShrink: 0 }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: 'success.main' 
            }} />
            <Typography variant="caption" color="text.secondary" sx={{
              whiteSpace: 'nowrap'
            }}>
              Online
            </Typography>
          </Stack>
        </Box>

        {/* Minimal Content Area */}
        <Box sx={{ 
          flex: 1, 
          p: 3, 
          minWidth: 0, // ป้องกัน overflow
          width: '100%',
          overflow: 'hidden'
        }}>
          <Paper sx={{ 
            p: 4, 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            minWidth: 0, // ป้องกัน overflow
            overflow: 'hidden'
          }}>
            <Box sx={{ textAlign: 'center', maxWidth: 400, width: '100%' }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: 2, 
                bgcolor: 'primary.main', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto', 
                mb: 2 
              }}>
                {currentMenuItem?.icon || <Dashboard />}
                <Box sx={{ color: 'white', fontSize: '1.5rem' }} />
              </Box>
              <Typography variant="h5" sx={{ 
                mb: 1.5, 
                fontWeight: 600,
                wordBreak: 'break-word'
              }}>
                {currentTitle}
              </Typography>
              <Typography color="text.secondary" sx={{ 
                mb: 2, 
                fontSize: '0.95rem',
                wordBreak: 'break-word'
              }}>
                {currentMenuItem?.href ? `เนื้อหาของหน้า ${currentTitle}` : 'หน้าหลักของระบบจัดการ'}
              </Typography>
              <Box sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                px: 2, 
                py: 0.5, 
                borderRadius: 1, 
                bgcolor: 'grey.100',
                maxWidth: '100%'
              }}>
                <Typography variant="caption" color="text.secondary" sx={{
                  fontSize: isMobile ? '0.75rem' : '0.8rem',
                  wordBreak: 'break-word'
                }}>
                  ✨ ลองคลิกเมนูอื่นๆ เพื่อดูการทำงาน
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

// Code examples with file structure
const codeExamples = [
  {
    title: '📁 โครงสร้างโฟลเดอร์ (Project Structure)',
    file: 'Project Root',
    icon: <FolderOpen />,
    code: `src/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── VerticalMenu.tsx       # Component หลัก
│   │   │   ├── MenuItem.tsx           # Menu item component
│   │   │   └── types.ts               # TypeScript interfaces
│   │   └── ui/
│   │       └── AppLayout.tsx          # Layout wrapper
│   ├── theme/
│   │   ├── index.ts                   # Theme configuration
│   │   └── components.ts              # Component overrides
│   └── page.tsx                       # หน้าหลัก
├── types/
│   └── menu.ts                        # Global types
└── package.json`
  },
  {
    title: '🎨 Theme Configuration',
    file: 'src/theme/index.ts',
    icon: <InsertDriveFile />,
    code: `import { createTheme } from '@mui/material/styles';

// สร้าง Custom Theme
export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#115293',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    action: {
      hover: 'rgba(25, 118, 210, 0.04)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 4,
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.04)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});`
  },
  {
    title: '📋 TypeScript Interfaces',
    file: 'src/types/menu.ts',
    icon: <Code />,
    code: `// Interface สำหรับ Menu Item
export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: MenuItem[];
  badge?: {
    count: number;
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  };
}

// Interface สำหรับ Menu State
export interface MenuState {
  activeItem: string;
  expandedItems: string[];
  mobileOpen: boolean;
}

// Props สำหรับ VerticalMenu Component
export interface VerticalMenuProps {
  items: MenuItem[];
  width?: number;
  onItemClick?: (itemId: string) => void;
  defaultActiveItem?: string;
  defaultExpandedItems?: string[];
}`
  },
  {
    title: '🔧 VerticalMenu Component',
    file: 'src/app/components/layout/VerticalMenu.tsx',
    icon: <Build />,
    code: `'use client';
import { useState, useCallback } from 'react';
import {
  Box, Drawer, List, useTheme, useMediaQuery, Avatar, 
  Typography, Collapse, IconButton
} from '@mui/material';
import { ExpandMore, Person, Close } from '@mui/icons-material';
import { MenuItem } from './MenuItem';
import { MenuHeader } from './MenuHeader';
import type { MenuItem as MenuItemType, VerticalMenuProps } from '@/types/menu';

export function VerticalMenu({ 
  items, 
  width = 300, 
  onItemClick,
  defaultActiveItem = '',
  defaultExpandedItems = []
}: VerticalMenuProps) {
  const [activeItem, setActiveItem] = useState(defaultActiveItem);
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpandedItems);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleItemClick = useCallback((itemId: string, hasChildren: boolean) => {
    if (hasChildren) {
      setExpandedItems(prev => {
        const isCurrentlyExpanded = prev.includes(itemId);
        
        if (isCurrentlyExpanded) {
          return prev.filter(id => id !== itemId);
        } else {
          return [itemId];
        }
      });
    } else {
      setActiveItem(itemId);
      onItemClick?.(itemId);
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  }, [isMobile, onItemClick]);

  const menuContent = (
    <Box sx={{ 
      width: isMobile ? '100vw' : width, 
      maxWidth: isMobile ? '100vw' : width,
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden' // ป้องกัน scroll-x
    }}>
      {/* Header with Close Button */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: isMobile ? 2 : 2.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        flexShrink: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
          <Box sx={{ 
            width: isMobile ? 28 : 32, 
            height: isMobile ? 28 : 32, 
            borderRadius: 1.5, 
            bgcolor: 'primary.main', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mr: isMobile ? 1.5 : 2,
            flexShrink: 0
          }}>
            <Dashboard sx={{ color: 'white', fontSize: isMobile ? '1rem' : '1.1rem' }} />
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              fontSize: isMobile ? '1rem' : '1.1rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Admin Panel
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ 
              fontSize: isMobile ? '0.7rem' : '0.75rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Dashboard v2.0
            </Typography>
          </Box>
        </Box>
        
        {/* Close Button - เฉพาะมือถือ */}
        {isMobile && (
          <IconButton 
            onClick={() => setMobileOpen(false)}
            sx={{ 
              ml: 1,
              flexShrink: 0,
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'action.hover',
              }
            }}
          >
            <Close sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        )}
      </Box>
      
      {/* Menu Items */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        overflowX: 'hidden', // ป้องกัน scroll-x
        py: 1 
      }}>
        <List>
          {items.map(item => (
            <MenuItem
              key={item.id}
              item={item}
              activeItem={activeItem}
              expandedItems={expandedItems}
              onItemClick={handleItemClick}
              isMobile={isMobile}
            />
          ))}
        </List>
      </Box>

      {/* Admin Profile Section */}
      <Box sx={{ 
        borderTop: '1px solid', 
        borderColor: 'divider',
        p: isMobile ? 1.5 : 2,
        bgcolor: 'grey.50',
        flexShrink: 0
      }}>
        {/* Profile content here */}
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box sx={{ width, flexShrink: 0 }}>
          {menuContent}
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: '100vw', 
            maxWidth: '100vw',
            boxSizing: 'border-box',
            overflow: 'hidden' // ป้องกัน scroll-x
          },
        }}
      >
        {menuContent}
      </Drawer>
    </>
  );
}`
  },
  {
    title: '📱 Enhanced MenuItem Component',
    file: 'src/app/components/layout/MenuItem.tsx',
    icon: <MenuIcon />,
    code: `import { Box, ListItem, ListItemIcon, ListItemText, Collapse, List, Chip } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import type { MenuItem as MenuItemType } from '@/types/menu';

interface MenuItemProps {
  item: MenuItemType;
  activeItem: string;
  expandedItems: string[];
  onItemClick: (itemId: string, hasChildren: boolean) => void;
  level?: number;
  isMobile?: boolean;
  isProfileMenu?: boolean;
}

export function MenuItem({ 
  item, 
  activeItem, 
  expandedItems, 
  onItemClick, 
  level = 0,
  isMobile = false,
  isProfileMenu = false
}: MenuItemProps) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const isExpanded = expandedItems.includes(item.id);
  const isActive = activeItem === item.id;

  return (
    <Box>
      <ListItem
        component="div"
        onClick={() => onItemClick(item.id, hasChildren)}
        sx={{
          pl: isProfileMenu 
            ? (isMobile ? 1 : 1.5)
            : (isMobile ? 1.5 + level * 1 : 2 + level * 1.5),
          py: isMobile ? 0.75 : 1,
          cursor: 'pointer',
          borderRadius: 1.5,
          mx: isMobile ? 0.5 : 1,
          mb: 0.5,
          bgcolor: isActive ? 'primary.main' : 'transparent',
          color: isActive ? 'white' : 'inherit',
          '&:hover': {
            bgcolor: isActive ? 'primary.dark' : 'action.hover',
          },
          transition: 'all 0.2s ease-in-out',
          boxShadow: isActive ? '0 2px 8px rgba(25, 118, 210, 0.2)' : 'none',
        }}
      >
        <ListItemIcon
          sx={{
            color: isActive ? 'white' : 'inherit',
            minWidth: isMobile ? 28 : 36,
            opacity: isActive ? 1 : 0.7,
          }}
        >
          {item.icon}
        </ListItemIcon>
        
        <ListItemText
          primary={item.label}
          sx={{
            '& .MuiListItemText-primary': {
              fontWeight: isActive ? 600 : 400,
              fontSize: level > 0 || isProfileMenu 
                ? (isMobile ? '0.75rem' : '0.85rem') 
                : (isMobile ? '0.85rem' : '1rem'),
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            },
          }}
        />

        {/* Badge */}
        {item.badge && (
          <Chip
            label={item.badge.count}
            color={item.badge.color}
            size="small"
            sx={{ 
              height: isMobile ? 18 : 20, 
              fontSize: isMobile ? '0.7rem' : '0.75rem', 
              mr: 1 
            }}
          />
        )}

        {/* Expand Icon */}
        {hasChildren && (
          <Box sx={{ 
            color: isActive ? 'white' : 'inherit',
            opacity: 0.7,
            transition: 'transform 0.2s ease',
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)'
          }}>
            <ExpandMore sx={{ fontSize: isMobile ? '1rem' : '1.1rem' }} />
          </Box>
        )}
      </ListItem>

      {/* Submenu */}
      {hasChildren && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map(child => (
              <MenuItem
                key={child.id}
                item={child}
                activeItem={activeItem}
                expandedItems={expandedItems}
                onItemClick={onItemClick}
                level={level + 1}
                isMobile={isMobile}
              />
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
}`
  },
  {
    title: '📱 การใช้งานใน Layout',
    file: 'src/app/layout.tsx',
    icon: <Dashboard />,
    code: `'use client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, AppBar, Toolbar, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { customTheme } from '@/theme';
import { VerticalMenu } from '@/components/layout/VerticalMenu';
import { menuItems } from '@/data/menuItems';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <html lang="th">
      <body>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Mobile AppBar */}
            {isMobile && (
              <AppBar 
                position="fixed" 
                sx={{ 
                  zIndex: theme.zIndex.drawer + 1,
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <Toolbar>
                  <IconButton
                    edge="start"
                    onClick={() => setMobileMenuOpen(true)}
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Admin Panel
                  </Typography>
                </Toolbar>
              </AppBar>
            )}
            
            {/* Vertical Menu */}
            <VerticalMenu 
              items={menuItems}
              width={280}
              defaultActiveItem="dashboard"
              defaultExpandedItems={['products']}
              mobileOpen={mobileMenuOpen}
              onMobileClose={() => setMobileMenuOpen(false)}
              onItemClick={(itemId) => {
                console.log('Menu clicked:', itemId);
                // Handle navigation logic here
                // router.push(\`/\${itemId}\`);
              }}
            />
            
            {/* Main Content */}
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              mt: isMobile ? '64px' : 0, // เผื่อ AppBar บนมือถือ
              minWidth: 0 // ป้องกัน overflow
            }}>
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}`
  },
  {
    title: '🚀 Best Practices & Tips',
    file: 'src/tips/responsive-menu.ts',
    icon: <Lightbulb />,
    code: `// 🎯 Best Practices สำหรับ Responsive Vertical Menu

// 1. ป้องกัน Horizontal Scroll บนมือถือ
const preventHorizontalScroll = {
  width: isMobile ? '100vw' : 280,
  maxWidth: isMobile ? '100vw' : 280,
  overflow: 'hidden',
  overflowX: 'hidden'
};

// 2. Responsive Typography
const responsiveText = {
  fontSize: isMobile ? '0.85rem' : '1rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

// 3. Touch-Friendly Spacing
const touchFriendly = {
  py: isMobile ? 0.75 : 1,
  minHeight: 44, // มาตรฐาน Apple touch target
  pl: isMobile ? 1.5 : 2
};

// 4. Performance Optimization
const optimizedCollapse = {
  timeout: "auto",
  unmountOnExit: true, // ลบ DOM เมื่อปิด
  appear: false // ไม่ animate ครั้งแรก
};

// 5. Accessibility
const a11y = {
  'aria-label': 'Main navigation',
  'aria-expanded': isExpanded,
  'role': 'navigation',
  tabIndex: 0
};

// 6. State Management Pattern
const useMenuState = () => {
  const [state, setState] = useState({
    activeItem: 'dashboard',
    expandedItems: ['products'],
    mobileOpen: false,
    profileOpen: false
  });

  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  return [state, updateState];
};

// 7. Type Safety
interface MenuItemData {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: MenuItemData[];
  badge?: BadgeData;
  permission?: string; // สำหรับ role-based access
}

// 8. Dynamic Menu Loading
const useDynamicMenu = (userRole: string) => {
  return useMemo(() => {
    return menuItems.filter(item => 
      !item.permission || hasPermission(userRole, item.permission)
    );
  }, [userRole]);
};`
  },
  {
    title: '🎯 Smart Submenu Management',
    file: 'src/hooks/useSmartSubmenu.ts',
    icon: <Settings />,
    code: `// 🔧 Smart Submenu System - เปิดได้ทีละอัน

// Single Submenu Expansion Logic
const handleSubmenuClick = useCallback((itemId: string, hasChildren: boolean) => {
  if (hasChildren) {
    setExpandedItems(prev => {
      const isCurrentlyExpanded = prev.includes(itemId);
      
      if (isCurrentlyExpanded) {
        // ถ้าเปิดอยู่แล้ว ให้ปิด
        return prev.filter(id => id !== itemId);
      } else {
        // ปิดอันอื่นทั้งหมด แล้วเปิดแค่อันนี้
        return [itemId];
      }
    });
  }
}, []);

// Custom Hook สำหรับ Smart Submenu
const useSmartSubmenu = (initialExpanded: string[] = []) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(initialExpanded);
  
  const toggleSubmenu = useCallback((itemId: string) => {
    setExpandedItems(prev => {
      const isExpanded = prev.includes(itemId);
      return isExpanded ? [] : [itemId]; // เปิดได้ทีละอัน
    });
  }, []);
  
  const closeAllSubmenus = useCallback(() => {
    setExpandedItems([]);
  }, []);
  
  const isExpanded = useCallback((itemId: string) => {
    return expandedItems.includes(itemId);
  }, [expandedItems]);
  
  return {
    expandedItems,
    toggleSubmenu,
    closeAllSubmenus,
    isExpanded
  };
};

// Multiple Submenu Expansion (ถ้าต้องการ)
const handleMultipleSubmenuClick = useCallback((itemId: string) => {
  setExpandedItems(prev => 
    prev.includes(itemId)
      ? prev.filter(id => id !== itemId)  // ปิด
      : [...prev, itemId]                 // เพิ่ม
  );
}, []);

// Advanced Submenu with Groups
const handleGroupedSubmenuClick = useCallback((itemId: string, groupId?: string) => {
  setExpandedItems(prev => {
    if (groupId) {
      // ปิดทุกอันใน group เดียวกัน แล้วเปิดอันใหม่
      const filteredItems = prev.filter(id => !isInGroup(id, groupId));
      return prev.includes(itemId) ? filteredItems : [...filteredItems, itemId];
    } else {
      // Single expansion
      return prev.includes(itemId) ? [] : [itemId];
    }
  });
}, []);

// Keyboard Navigation Support
const handleKeyDown = useCallback((event: KeyboardEvent, itemId: string) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      toggleSubmenu(itemId);
      break;
    case 'Escape':
      closeAllSubmenus();
      break;
    case 'ArrowDown':
      // Focus next item
      break;
    case 'ArrowUp':
      // Focus previous item
      break;
  }
}, [toggleSubmenu, closeAllSubmenus]);`
  }
];

export default function WorkshopLesson1Page() {
  const [tabValue, setTabValue] = useState(0);
  const [expandedCode, setExpandedCode] = useState<number | false>(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCodeAccordionChange = (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedCode(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        aria-label="breadcrumb" 
        sx={{ py: 2 }}
        separator={<NavigateNext fontSize="small" />}
      >
        <Link href="/" style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Home sx={{ fontSize: 16 }} />
          หน้าหลัก
        </Link>
        <Link href="/workshop" style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <School sx={{ fontSize: 16 }} />
          Workshop
        </Link>
        <Typography color="text.primary">
          บทที่ 1: Theme Template & Vertical Menu
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Chip label="บทที่ 1" color="primary" />
          <Chip label="90 นาที" color="secondary" variant="outlined" />
          <Chip label="ปานกลาง" color="warning" variant="outlined" />
        </Stack>
        
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            mb: 2,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
            <Build />
          </Avatar>
          Theme Template & Vertical Menu Pro
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ mb: 3, maxWidth: '800px' }}
        >
          เรียนรู้การสร้าง Professional Theme Template และ Vertical Menu System ที่ responsive 
          พร้อม submenu, active states, และ TypeScript support แบบครบวงจร
        </Typography>

        {/* Learning Objectives */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle sx={{ fontWeight: 600 }}>🎯 สิ่งที่จะได้เรียนรู้ในบทนี้</AlertTitle>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
            gap: 1, 
            mt: 1 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle color="primary" sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="body2">Professional Theme Configuration</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle color="primary" sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="body2">Advanced Vertical Menu System</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle color="primary" sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="body2">Smart Submenu (เปิดได้ทีละอัน)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle color="primary" sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="body2">TypeScript Interfaces & Types</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle color="primary" sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="body2">Responsive Design Patterns</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle color="primary" sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="body2">Component Architecture</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle color="primary" sx={{ fontSize: 16, mr: 1 }} />
              <Typography variant="body2">State Management Patterns</Typography>
            </Box>
          </Box>
        </Alert>
      </Box>

      {/* Demo Section */}
      <Paper elevation={0} sx={{ mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab 
              icon={<Visibility />} 
              label="Live Demo" 
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
            <Tab 
              icon={<Code />} 
              label="Complete Code" 
              iconPosition="start"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            />
          </Tabs>
        </Box>

        {/* Demo Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              <AlertTitle sx={{ fontWeight: 600 }}>✨ Professional Demo</AlertTitle>
              นี่คือ demo แบบมืออาชีพ ลองทดสอบการทำงานและดู responsive design
            </Alert>
            <ProfessionalVerticalMenuDemo />
          </Box>
        )}

        {/* Code Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              📋 Complete Implementation Guide
            </Typography>
            
            <Alert severity="warning" sx={{ mb: 3 }}>
              <AlertTitle sx={{ fontWeight: 600 }}>💡 การใช้งาน</AlertTitle>
              โค้ดต่อไปนี้แสดงโครงสร้างไฟล์และการใช้งานแบบครบวงจร พร้อมคำอธิบายว่าแต่ละส่วนต้องไปใส่ไฟล์ไหน
            </Alert>

            <Stack spacing={2}>
              {codeExamples.map((example, index) => (
                <Accordion
                  key={index}
                  expanded={expandedCode === index}
                  onChange={handleCodeAccordionChange(index)}
                  sx={{ 
                    border: '1px solid', 
                    borderColor: 'divider',
                    borderRadius: 2,
                    '&:before': { display: 'none' },
                    boxShadow: 'none'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{ 
                      bgcolor: 'grey.50',
                      borderRadius: '8px 8px 0 0',
                      '&.Mui-expanded': {
                        borderRadius: '8px 8px 0 0',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        {example.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {example.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {example.file}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    <Box sx={{ position: 'relative' }}>
                      <Paper sx={{ 
                        bgcolor: 'grey.900', 
                        color: 'grey.100', 
                        p: 3, 
                        borderRadius: 0,
                        overflow: 'auto'
                      }}>
                        <pre style={{ 
                          margin: 0, 
                          fontSize: '0.875rem', 
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap'
                        }}>
                          {example.code}
                        </pre>
                      </Paper>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          color: 'grey.400',
                          bgcolor: 'rgba(255,255,255,0.1)',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.2)',
                          }
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(example.code);
                        }}
                      >
                        <ContentCopy sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Box>
        )}
      </Paper>

      {/* Key Features */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          ✨ คุณสมบัติหลักระดับมืออาชีพ
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 3
        }}>
          {[
            {
              icon: <Build color="primary" />,
              title: 'Professional Architecture',
              desc: 'โครงสร้างโปรเจคที่เป็นระเบียบ แยกไฟล์ตามหน้าที่ พร้อม TypeScript support แบบสมบูรณ์'
            },
            {
              icon: <Code color="secondary" />,
              title: 'Mobile-First Responsive',
              desc: 'ออกแบบเพื่อมือถือเป็นหลัก ไม่มี horizontal scroll และ touch-friendly interaction'
            },
            {
              icon: <Person color="success" />,
              title: 'Admin Profile System',
              desc: 'ระบบโปรไฟล์ admin ที่สมบูรณ์ พร้อม avatar, dropdown menu และ profile management'
            },
            {
              icon: <Lightbulb color="warning" />,
              title: 'Smart State Management',
              desc: 'จัดการ state ด้วย React Hooks อย่างมีประสิทธิภาพ พร้อม performance optimization'
            },
            {
              icon: <CheckCircle color="info" />,
              title: 'Production Ready',
              desc: 'โค้ดที่พร้อมใช้งานจริง มี error handling, accessibility support และ SEO optimization'
            },
            {
              icon: <PlayArrow color="inherit" />,
              title: 'Smooth Animations',
              desc: 'การเคลื่อนไหวที่นุ่มนวลด้วย Material-UI transitions และ custom animations ที่เหมาะกับมือถือ'
            },
            {
              icon: <Settings color="primary" />,
              title: 'Highly Customizable',
              desc: 'ปรับแต่งได้ทุกส่วน จากสีธีม responsive breakpoints ไปจนถึงพฤติกรรมของเมนู'
            },
            {
              icon: <Dashboard color="secondary" />,
              title: 'Smart Submenu System',
              desc: 'Submenu เปิดได้ทีละอัน (accordion style) พร้อม smooth animations และ auto-collapse เมื่อเปิดอันใหม่'
            },
            {
              icon: <Visibility color="success" />,
              title: 'Accessibility First',
              desc: 'ออกแบบให้เข้าถึงได้ง่าย มี ARIA labels, keyboard navigation และ screen reader support'
            }
          ].map((feature, index) => (
            <Card key={index} sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'grey.100', width: 40, height: 40 }}>
                  {feature.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                    {feature.desc}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Next Steps */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          🎉 ยินดีด้วย! คุณได้เรียนรู้ Professional Theme & Menu System แล้ว
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
          ตอนนี้คุณสามารถสร้าง Vertical Menu ที่มีคุณภาพระดับมืออาชีพได้แล้ว
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            component={Link}
            href="/workshop"
            variant="contained"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            กลับไป Workshop
          </Button>
          <Button
            variant="outlined"
            disabled
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': { borderColor: 'white' },
            }}
          >
            บทที่ 2: Advanced Layout (เร็วๆ นี้)
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
} 