import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#076ba6',
        color: 'white',
        py: 4,
        mt: 8,
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">
              Rajapakse Pharmacy
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Trusted care for your health.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} textAlign="center">
            {['Home', 'Store', 'E-Channeling', 'Contact Us'].map((text, i) => (
              <MuiLink
                key={i}
                href="#"
                underline="hover"
                color="inherit"
                sx={{ mx: 1, fontSize: '0.9rem', opacity: 0.9 }}
              >
                {text}
              </MuiLink>
            ))}
          </Grid>

          <Grid item xs={12} sm={4} textAlign="right">
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Email: support@rajapaksepharmacy.com
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Phone: 032-2247833
            </Typography>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} Rajapakse Pharmacy. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
