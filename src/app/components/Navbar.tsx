'use client';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School,
  Dashboard,
  Storage,
  Web,
  FiberManualRecord,
  Build,
  Close,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { text: 'หน้าหลัก', icon: <Dashboard />, href: '/', description: 'หน้าแรกของเว็บไซต์' },
  { text: 'Next.js พื้นฐาน', icon: <Web />, href: '/nextjs-basics', description: '18 บทเรียน Next.js 15' },
  { text: 'Material-UI', icon: <School />, href: '/mui-tutorial', description: '8 บทเรียน MUI' },
  { text: 'Prisma & MySQL', icon: <Storage />, href: '/prisma-tutorial', description: '12 บทเรียน Database' },
  { text: 'Workshop', icon: <Build />, href: '/workshop', description: 'Hands-on Learning' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState<string | number>(280);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pathname = usePathname();

  // Prevent hydration mismatch by waiting for component to mount
  useEffect(() => {
    setMounted(true);
    
    // Calculate responsive drawer width after mount
    if (typeof window !== 'undefined') {
      const calculateDrawerWidth = () => {
        if (isSmallMobile) {
          return '100vw';
        }
        return Math.min(280, window.innerWidth * 0.85);
      };
      
      setDrawerWidth(calculateDrawerWidth());
      
      // Update on window resize
      const handleResize = () => {
        setDrawerWidth(calculateDrawerWidth());
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isSmallMobile]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (): void => {
    setMobileOpen(false);
  };

  const handleLogoClick = (): void => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ 
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden', // ป้องกัน scroll-x
      minWidth: 0
    }}>
      {/* Header with Close Button */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        flexShrink: 0
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 'bold',
          fontSize: isSmallMobile ? '1rem' : '1.25rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1,
          minWidth: 0
        }}>
          📚 Next.js Tutorial ไทย
        </Typography>
        <IconButton 
          onClick={handleDrawerToggle}
          sx={{ 
            ml: 1,
            flexShrink: 0,
            '&:focus': {
              outline: 'none',
            },
            '&:active': {
              outline: 'none',
              border: 'none',
            }
          }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <Box sx={{ 
        flex: 1,
        overflow: 'auto',
        overflowX: 'hidden'
      }}>
        <List sx={{ px: 1, py: 2, width: '100%' }}>
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <ListItem
                key={item.text}
                component={Link}
                href={item.href}
                onClick={handleMenuItemClick}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  mx: 1,
                  textDecoration: 'none',
                  backgroundColor: active ? 'primary.main' : 'transparent',
                  color: active ? 'white' : 'inherit',
                  minWidth: 0, // ป้องกัน overflow
                  width: 'calc(100% - 16px)', // คำนวณ width หัก margin
                  '&:hover': {
                    backgroundColor: active ? 'primary.main' : 'action.hover',
                    textDecoration: 'none',
                  },
                  '&:focus': {
                    outline: 'none',
                    backgroundColor: active ? 'primary.main' : 'action.hover',
                  },
                  '&:active': {
                    outline: 'none',
                    border: 'none',
                  },
                  transition: 'background-color 0.2s ease',
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <ListItemIcon sx={{ 
                  color: active ? 'white' : 'text.secondary',
                  minWidth: isSmallMobile ? 36 : 40,
                  flexShrink: 0
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="body1" sx={{ 
                      fontWeight: active ? 600 : 400,
                      fontSize: isSmallMobile ? '0.9rem' : '1rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.text}
                    </Typography>
                  }
                  secondary={
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: active ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                        fontSize: isSmallMobile ? '0.7rem' : '0.75rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item.description}
                    </Typography>
                  }
                  sx={{
                    minWidth: 0, // ป้องกัน overflow
                    flex: 1
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  // Always render the navbar to prevent hydration issues
  return (
    <Box sx={{ flexGrow: 1, width: '100%', overflow: 'hidden' }}>
      <AppBar position="sticky" elevation={1} sx={{ width: '100%' }}>
        <Toolbar sx={{ minWidth: 0, width: '100%' }}>
          {/* Mobile Menu Button - Always show on mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              display: { xs: 'block', md: 'none' },
              flexShrink: 0,
              '&:focus': {
                outline: 'none',
              },
              '&:active': {
                outline: 'none',
                border: 'none',
              },
              border: 'none',
              outline: 'none',
            }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            onClick={handleLogoClick}
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 600,
              minWidth: 0, // ป้องกัน overflow
              overflow: 'hidden',
              '&:hover': {
                opacity: 0.8,
                textDecoration: 'none',
              },
              '&:focus': {
                outline: 'none',
                opacity: 0.8,
              },
              '&:active': {
                outline: 'none',
                border: 'none',
              },
              transition: 'opacity 0.2s ease',
              border: 'none',
              outline: 'none',
            }}
          >
            <School sx={{ flexShrink: 0 }} />
            <Box component="span" sx={{ 
              display: { xs: 'none', sm: 'block' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: 0
            }}>
              Next.js Tutorial ไทย
            </Box>
            <Box component="span" sx={{ 
              display: { xs: 'block', sm: 'none' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: 0
            }}>
              Tutorial
            </Box>
          </Typography>

          {/* Desktop Menu - Always show on desktop */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: 0.5,
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  href={item.href}
                  sx={{
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    fontWeight: active ? 600 : 400,
                    backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                    whiteSpace: 'nowrap',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      textDecoration: 'none',
                    },
                    '&:focus': {
                      outline: 'none',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                    '&:active': {
                      outline: 'none',
                      border: 'none',
                    },
                    transition: 'background-color 0.2s ease',
                    textDecoration: 'none',
                    border: 'none',
                    outline: 'none',
                  }}
                >
                  {item.text}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer - Always render but control visibility */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            maxWidth: '100vw',
            overflow: 'hidden', // ป้องกัน scroll-x
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        SlideProps={{
          direction: 'right',
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}