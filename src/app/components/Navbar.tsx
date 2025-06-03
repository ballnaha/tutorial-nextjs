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
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { text: 'หน้าหลัก', icon: <Dashboard />, href: '/', description: 'หน้าแรกของเว็บไซต์' },
  { text: 'Next.js พื้นฐาน', icon: <Web />, href: '/nextjs-basics', description: '16 บทเรียน Next.js 15' },
  { text: 'Material-UI', icon: <School />, href: '/mui-tutorial', description: '8 บทเรียน MUI' },
  { text: 'Prisma & MySQL', icon: <Storage />, href: '/prisma-tutorial', description: '12 บทเรียน Database' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  // Prevent hydration mismatch by waiting for component to mount
  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (mounted && isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogoClick = (): void => {
    if (mounted && isMobile && mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ width: 280, mt: 2 }}>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold', px: 2 }}>
        📚 Next.js Tutorial ไทย
      </Typography>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
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
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body1" sx={{ fontWeight: active ? 600 : 400 }}>
                    {item.text}
                  </Typography>
                }
                secondary={
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: active ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                      fontSize: '0.75rem'
                    }}
                  >
                    {item.description}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  // Show loading state until component is mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" elevation={1}>
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 600,
                '&:hover': {
                  opacity: 0.8,
                  textDecoration: 'none',
                },
                transition: 'opacity 0.2s ease',
              }}
            >
              <School />
              <Box component="span">
                Next.js Tutorial ไทย
              </Box>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2,
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
          )}
          
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
            <School />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Next.js Tutorial ไทย
            </Box>
            <Box component="span" sx={{ display: { xs: 'block', sm: 'none' } }}>
              Tutorial
            </Box>
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
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
          )}
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 280,
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
      )}
    </Box>
  );
} 