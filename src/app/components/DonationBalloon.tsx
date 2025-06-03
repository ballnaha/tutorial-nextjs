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
          bottom: 24,
          right: 24,
          zIndex: 1000,
          bgcolor: '#1976d2',
          color: 'white',
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
        <Coffee sx={{ fontSize: 24 }} />
      </Fab>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          pb: 1,
          position: 'relative',
          pt: 3,
        }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Close />
          </IconButton>
          
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Coffee sx={{ fontSize: 28, color: '#8B4513' }} />
            <Typography variant="h5" component="div" fontWeight="600" color="text.primary">
              Give me a coffee
            </Typography>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
            หากบทเรียนนี้มีประโยชน์กับคุณ อยากเชิญคุณซื้อกาแฟให้ผู้สร้างสักแก้ว ☕
          </Typography>

          <Paper 
            sx={{ 
              p: 3, 
              mb: 3, 
              bgcolor: 'grey.50',
              borderRadius: 2,
              display: 'inline-block',
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: 600 }}>
              📱 สแกน QR Code
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 2,
              p: 2,
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
                  width: '280px', 
                  height: '280px',
                  maxWidth: '100%',
                  borderRadius: 0.5,
                  // Responsive sizing
                  '@media (max-width: 600px)': {
                    width: '240px',
                    height: '240px',
                  },
                  '@media (max-width: 400px)': {
                    width: '200px', 
                    height: '200px',
                  }
                }}
              />
            </Box>

            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
              <Chip 
                icon={<QrCode />} 
                label="สแกนด้วยกล้อง" 
                size="small" 
                sx={{ 
                  bgcolor: 'primary.50',
                  color: 'primary.700',
                  '& .MuiChip-icon': { color: 'primary.600' }
                }}
              />
              <Chip 
                icon={<Favorite />} 
                label="ขอบคุณล่วงหน้า" 
                size="small" 
                sx={{ 
                  bgcolor: 'secondary.50',
                  color: 'secondary.700',
                  '& .MuiChip-icon': { color: 'secondary.600' }
                }}
              />
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              "การสนับสนุนเล็กๆ น้อยๆ ช่วยให้เราสร้างเนื้อหาคุณภาพต่อไปได้"
            </Typography>
          </Paper>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            💝 ทุกการสนับสนุนจะช่วยให้เราพัฒนาบทเรียนใหม่ๆ และปรับปรุงเนื้อหาให้ดียิ่งขึ้น
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1,
              color: 'text.primary',
              borderColor: 'grey.300',
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