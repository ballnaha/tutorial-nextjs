'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5C9EE8', // Soft blue
      light: '#8BB7ED',
      dark: '#4285C7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6B7B8C', // Soft gray-blue
      light: '#8A9BA8',
      dark: '#4A5968',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FCFCFC', // Very soft gray background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748', // Darker gray for better readability
      secondary: '#4A5568', // Medium gray with good contrast
    },
    grey: {
      50: '#FCFCFC',
      100: '#F8F9FA',
      200: '#F1F3F4',
      300: '#E8EAED',
      400: '#DADCE0',
      500: '#BDC1C6',
      600: '#9AA0A6',
      700: '#718096', // Better contrast for secondary text
      800: '#4A5568', // Good contrast for important text
      900: '#2D3748', // Strong contrast for primary text
    },
    success: {
      main: '#48BB78', // Gentle green
      light: '#68D391',
      dark: '#38A169',
    },
    warning: {
      main: '#F6AD55', // Soft orange
      light: '#FBD38D',
      dark: '#ED8936',
    },
    error: {
      main: '#F56565', // Gentle red
      light: '#FC8181',
      dark: '#E53E3E',
    },
    info: {
      main: '#63B3ED', // Soft light blue
      light: '#90CDF4',
      dark: '#4299E1',
    },
  },
  typography: {
    fontFamily: [
      'Prompt',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#2D3748',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2D3748',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#2D3748',
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#2D3748',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#2D3748',
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      color: '#2D3748',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#2D3748',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#4A5568',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.04)',
    '0px 2px 6px rgba(0, 0, 0, 0.04)',
    '0px 3px 12px rgba(0, 0, 0, 0.04)',
    '0px 4px 16px rgba(0, 0, 0, 0.04)',
    '0px 6px 20px rgba(0, 0, 0, 0.04)',
    '0px 8px 24px rgba(0, 0, 0, 0.04)',
    '0px 12px 32px rgba(0, 0, 0, 0.04)',
    '0px 16px 40px rgba(0, 0, 0, 0.04)',
    '0px 20px 48px rgba(0, 0, 0, 0.04)',
    '0px 24px 56px rgba(0, 0, 0, 0.04)',
    '0px 28px 64px rgba(0, 0, 0, 0.04)',
    '0px 32px 72px rgba(0, 0, 0, 0.04)',
    '0px 36px 80px rgba(0, 0, 0, 0.04)',
    '0px 40px 88px rgba(0, 0, 0, 0.04)',
    '0px 44px 96px rgba(0, 0, 0, 0.04)',
    '0px 48px 104px rgba(0, 0, 0, 0.04)',
    '0px 52px 112px rgba(0, 0, 0, 0.04)',
    '0px 56px 120px rgba(0, 0, 0, 0.04)',
    '0px 60px 128px rgba(0, 0, 0, 0.04)',
    '0px 64px 136px rgba(0, 0, 0, 0.04)',
    '0px 68px 144px rgba(0, 0, 0, 0.04)',
    '0px 72px 152px rgba(0, 0, 0, 0.04)',
    '0px 76px 160px rgba(0, 0, 0, 0.04)',
    '0px 80px 168px rgba(0, 0, 0, 0.04)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
          },
          '&:active': {
            transform: 'translateY(0px)',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          },
          '&:active': {
            transform: 'translateY(0px)',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.12)',
          },
        },
        outlined: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
          '&:active': {
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            borderColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
          '&:active': {
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
          },
          '&:active': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #F1F3F4',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&.code-block': {
            backgroundColor: '#1e1e1e',
            color: '#f8f8f2',
            fontFamily: 'monospace',
            border: 'none',
            '& .MuiTypography-root': {
              color: '#f8f8f2',
              fontSize: '0.85rem',
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            }
          }
        },
        elevation1: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.02), 0px 2px 4px rgba(0, 0, 0, 0.06)',
        },
        elevation3: {
          boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.02), 0px 3px 6px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          fontSize: '0.75rem',
          border: '1px solid transparent',
          color: '#2D3748',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
          },
          '&:active': {
            transform: 'translateY(0px)',
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.06)',
          },
        },
        outlined: {
          backgroundColor: '#F8F9FA',
          borderColor: '#E8EAED',
          color: '#2D3748',
          '&:hover': {
            backgroundColor: '#F1F3F4',
            color: '#2D3748',
            transform: 'translateY(-1px)',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
          },
          '&:active': {
            backgroundColor: '#E8EAED',
            borderColor: 'rgba(0, 0, 0, 0.15)',
            transform: 'translateY(0px)',
          },
        },
        clickable: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
          '&:active': {
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: '1px solid #F1F3F4',
          borderRadius: '12px !important',
          backgroundColor: '#FCFCFC',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:before': {
            display: 'none',
          },
          '&:not(:last-child)': {
            marginBottom: 8,
          },
          '&:hover': {
            backgroundColor: '#F8F9FA',
            transform: 'translateY(-1px)',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.03)',
          },
          '&:active': {
            backgroundColor: '#F1F3F4',
            transform: 'translateY(0px)',
            borderColor: 'rgba(0, 0, 0, 0.1)',
          },
          '& .MuiAccordionSummary-root': {
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&:active': {
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
            },
          },
          '& .MuiAccordionSummary-content': {
            color: '#2D3748',
          },
          '& .MuiAccordionDetails-root': {
            color: '#4A5568',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: '#F1F3F4',
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#5C9EE8',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          '&:hover': {
            color: '#4285C7',
            textDecoration: 'none',
          },
          '&:active': {
            color: '#2D3748',
          },
          '&:hover::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '1px',
            bottom: '-2px',
            left: '0',
            backgroundColor: '#4285C7',
            transform: 'scaleX(1)',
            transformOrigin: 'left',
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '&:active::after': {
            backgroundColor: '#2D3748',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '1px',
            bottom: '-2px',
            left: '0',
            backgroundColor: '#4285C7',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body2': {
            color: '#4A5568',
          },
          '&.MuiTypography-caption': {
            color: '#718096',
          },
        },
      },
    },
  },
}); 