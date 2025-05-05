import { Container, Grid, Typography, Box, Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './Footer.css';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(to right, #5f7fff, #8eb8ff)',
        color: 'white',
        py: 4,
        mt: 5,
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold">Rajapakse Pharmacy</Typography>
            <Typography variant="body2">
              Your trusted online pharmacy for all your medical needs.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">Quick Links</Typography>
            <Box mt={1}>
              {['Home', 'Store', 'E-Channeling', 'Contact Us'].map((text, index) => (
                <MuiLink
                  key={index}
                  href="#"
                  color="inherit"
                  underline="hover"
                  sx={{ display: 'block', mt: 0.5, fontSize: '0.9rem' }}
                >
                  {text}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'right' }}>
            <Typography variant="h6" fontWeight="bold">Contact Us</Typography>
            <Typography variant="body2">Email: support@rajapaksepharmacy.com</Typography>
            <Typography variant="body2">Phone: 032-2247647</Typography>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            &copy; {new Date().getFullYear()} Rajapakse Pharmacy. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
