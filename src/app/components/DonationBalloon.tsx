'use client';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Paper,
  Stack,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Coffee,
  Close,
  Favorite,
  QrCode,
} from '@mui/icons-material';
import { useState } from 'react';

export function DonationBalloon() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // QR Code URL สำหรับบริจาค (ใช้ QR Code generator API)
  const donationText = "ขอบคุณสำหรับการสนับสนุน Next.js Tutorial ไทย! 🙏";
  const qrCodeUrl = `myqr-1.webp`;

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        aria-label="donate"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: isMobile ? 16 : 24,
          right: isMobile ? 16 : 24,
          zIndex: 1000,
          bgcolor: '#1976d2',
          color: 'white',
          size: isMobile ? 'medium' : 'large',
          width: isMobile ? 48 : 56,
          height: isMobile ? 48 : 56,
          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            bgcolor: '#1565c0',
            transform: 'scale(1.05)',
            boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: 'pulse 3s infinite',
          '@keyframes pulse': {
            '0%': {
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            },
            '50%': {
              boxShadow: '0 4px 20px rgba(25, 118, 210, 0.5)',
            },
            '100%': {
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            },
          },
        }}
      >
        <Coffee sx={{ fontSize: isMobile ? 20 : 24 }} />
      </Fab>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={isMobile ? false : "sm"}
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 3,
            bgcolor: 'background.paper',
            boxShadow: isMobile ? 'none' : '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: isMobile ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
            m: isMobile ? 0 : 2,
            maxHeight: isMobile ? '100vh' : '90vh',
            overflow: 'auto',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          pb: isMobile ? 2 : 1,
          position: 'relative',
          pt: isMobile ? 2 : 3,
          px: isMobile ? 2 : 3,
        }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: isMobile ? 8 : 8,
              top: isMobile ? 8 : 8,
              color: 'text.secondary',
              size: isMobile ? 'medium' : 'large',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Close />
          </IconButton>
          
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Coffee sx={{ fontSize: isMobile ? 24 : 28, color: '#8B4513' }} />
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              component="div" 
              fontWeight="600" 
              color="text.primary"
              sx={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}
            >
              Give me a coffee
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ 
          textAlign: 'center', 
          py: isMobile ? 2 : 3,
          px: isMobile ? 2 : 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: isMobile ? 2 : 3, 
              color: 'text.secondary', 
              lineHeight: 1.6,
              fontSize: isMobile ? '0.9rem' : '1rem',
              maxWidth: isMobile ? '100%' : '400px'
            }}
          >
            หากบทเรียนนี้มีประโยชน์กับคุณ เลี้ยงกาแฟผมสักแก้วนะครับ ☕
          </Typography>

          <Paper 
            sx={{ 
              p: isMobile ? 2 : 3, 
              mb: isMobile ? 2 : 3, 
              bgcolor: 'grey.50',
              borderRadius: 2,
              display: 'inline-block',
              border: '1px solid',
              borderColor: 'grey.200',
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? '100%' : '400px'
            }}
          >
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 2,
              p: isMobile ? 1 : 2,
              bgcolor: 'white',
              borderRadius: 1,
              border: '2px dashed',
              borderColor: 'grey.300',
            }}>
              <Box
                component="img"
                src={qrCodeUrl}
                alt="QR Code สำหรับบริจาค"
                sx={{ 
                  width: isMobile ? '200px' : isTablet ? '220px' : '280px', 
                  height: isMobile ? '200px' : isTablet ? '220px' : '280px',
                  maxWidth: '100%',
                  borderRadius: 0.5,
                }}
              />
            </Box>

            <Stack 
              direction={isMobile ? "column" : "row"} 
              spacing={1} 
              justifyContent="center" 
              sx={{ mb: 2 }}
            >
              <Chip 
                icon={<Favorite />} 
                label="ขอบคุณล่วงหน้า" 
                size={isMobile ? "medium" : "small"}
                sx={{ 
                  bgcolor: 'secondary.50',
                  color: 'secondary.700',
                  fontSize: isMobile ? '0.8rem' : '0.75rem',
                  '& .MuiChip-icon': { color: 'secondary.600' }
                }}
              />
            </Stack>

            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontStyle: 'italic',
                fontSize: isMobile ? '0.8rem' : '0.875rem',
                lineHeight: 1.4
              }}
            >
              "การสนับสนุนเล็กๆ น้อยๆ ช่วยให้เราสร้างเนื้อหาคุณภาพต่อไปได้"
            </Typography>
          </Paper>
        </DialogContent>

        <DialogActions sx={{ 
          justifyContent: 'center', 
          pb: isMobile ? 2 : 3,
          px: isMobile ? 2 : 3,
        }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            fullWidth={isMobile}
            sx={{
              borderRadius: 2,
              px: isMobile ? 2 : 4,
              py: isMobile ? 1.5 : 1,
              color: 'text.primary',
              borderColor: 'grey.300',
              fontSize: isMobile ? '1rem' : '0.875rem',
              minHeight: isMobile ? '48px' : 'auto',
              '&:hover': {
                bgcolor: 'grey.50',
                borderColor: 'grey.400',
              },
            }}
          >
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 