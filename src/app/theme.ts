'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  
  colorSchemes: {
    light: {
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
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#90caf9', // Lighter blue for dark mode
          light: '#e3f2fd',
          dark: '#42a5f5',
          contrastText: '#000000',
        },
        secondary: {
          main: '#f48fb1', // Pink for dark mode
          light: '#fce4ec',
          dark: '#ad1c4c',
          contrastText: '#000000',
        },
        background: {
          default: '#121212', // Material Design dark background
          paper: '#1e1e1e', // Elevated surface color
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.7)',
        },
        grey: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        success: {
          main: '#66bb6a',
          light: '#81c784',
          dark: '#4caf50',
        },
        warning: {
          main: '#ffa726',
          light: '#ffb74d',
          dark: '#f57c00',
        },
        error: {
          main: '#f44336',
          light: '#ef5350',
          dark: '#d32f2f',
        },
        info: {
          main: '#29b6f6',
          light: '#4fc3f7',
          dark: '#0288d1',
        },
      },
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
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
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
        root: ({ theme }) => ({
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
          },
          
          ...theme.applyStyles('dark', {
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.1)',
            },
            '&:active': {
              boxShadow: '0px 2px 6px rgba(255, 255, 255, 0.15)',
            },
          }),
        }),
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
        outlined: ({ theme }) => ({
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          },
          '&:active': {
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
          },
          
          ...theme.applyStyles('dark', {
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&:active': {
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
            },
          }),
        }),
      },
    },
    
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
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
          
          ...theme.applyStyles('dark', {
            backgroundColor: theme.vars?.palette.grey[900],
            border: `1px solid ${theme.vars?.palette.grey[700]}`,
            '&:hover': {
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              borderColor: theme.vars?.palette.grey[600],
            },
          }),
        }),
      },
    },
    
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 16,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          
          ...theme.applyStyles('dark', {
            backgroundColor: theme.vars?.palette.grey[900],
            border: `1px solid ${theme.vars?.palette.grey[700]}`,
          }),
        }),
      },
    },
    
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 20,
          fontWeight: 500,
          fontSize: '0.75rem',
          border: '1px solid transparent',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
          },
          
          ...theme.applyStyles('dark', {
            backgroundColor: theme.vars?.palette.grey[800],
            color: theme.vars?.palette.text.primary,
            borderColor: theme.vars?.palette.grey[600],
            '&:hover': {
              backgroundColor: theme.vars?.palette.grey[700],
              boxShadow: '0px 2px 6px rgba(255, 255, 255, 0.1)',
            },
          }),
        }),
      },
    },
    
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: '1px solid #F1F3F4',
          borderRadius: '12px !important',
          backgroundColor: '#FCFCFC',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:before': {
            display: 'none',
          },
          
          ...theme.applyStyles('dark', {
            backgroundColor: theme.vars?.palette.grey[900],
            borderColor: theme.vars?.palette.grey[700],
            '&:hover': {
              backgroundColor: theme.vars?.palette.grey[800],
              borderColor: theme.vars?.palette.grey[600],
            },
          }),
        }),
      },
    },
  },
}); 