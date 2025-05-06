
import { Typography, Paper, Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ p: 5, borderRadius: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome, admin! You now have access to admin-only content.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
