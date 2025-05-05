import CoverImage from "../components/CoverImage";
import CareTypeCard from "../components/CareTypeCard";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #c2e9fb, #a1c4fd)',
        minHeight: '100vh',
        py: 5,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <CoverImage />

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: '#1a237e',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Explore Our Health Categories
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          <CareTypeCard
            image="https://i.ibb.co/WvQTJkyT/image.png"
            title="Bone Care"
          />
          <CareTypeCard
            image="https://i.ibb.co/DHyCY6fn/image-1.png"
            title="Diabetes Care"
          />
          <CareTypeCard
            image="https://i.ibb.co/BHhgRS06/image-2.png"
            title="Kidney Care"
          />
          <CareTypeCard
            image="https://i.ibb.co/Z6X3NbJc/image-3.png"
            title="Liver Care"
          />
          <CareTypeCard
            image="https://i.ibb.co/67sWqZBG/image-4.png"
            title="Eye Care"
          />
        </Box>
      </Container>
    </Box>
  );
}
