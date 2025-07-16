import '../components/Contact.css';
import InfoCard from '../components/InfoCard';
import FormCard from '../components/FormCard';
import { Box } from '@mui/material';

const Contact = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #c2e9fb, #a1c4fd)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          gap: '50px',
          maxWidth: '1200px',
          width: '100%',
          flexWrap: 'wrap', // mobile responsive
        }}
      >
        <Box sx={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
          <InfoCard />
        </Box>
        <Box sx={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
          <FormCard />
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
