import React from "react";
import CoverImage from "../components/CoverImage";
import { Box, Typography, Container, Card, CardMedia, CardContent } from "@mui/material";
import liver from "../assets/liver.png";
import diabetes from "../assets/diabetes.png";
import kidney from "../assets/kidney.png";
import bone from "../assets/bone.png";

export default function Home() {
  const categories = [
    {
      image: bone,
      title: "Bone Care",
    },
    {
      image: diabetes,
      title: "Diabetes Care",
    },
    {
      image: kidney,
      title: "Kidney Care",
    },
    {
      image: liver,
      title: "Liver Care",
    },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #c2e9fb, #a1c4fd)",
        minHeight: "100vh",
        py: 5,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <CoverImage />

      <Container maxWidth="lg" sx={{ mt: 6, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
        mb: 4,
        fontWeight: "bold",
        color: "#1a237e",
        fontFamily: "'Poppins', sans-serif",
        mt: { xs: -2, sm: -3, md: -4 },
      }}
    >
          Explore Our Health Categories
        </Typography>

        <Box
          sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // Single column on extra small screens
            sm: "repeat(auto-fit, minmax(220px, 1fr))"
          },
          gap: { xs: 3, sm: 4 },
          justifyContent: "center",
      }}
    >
          {categories.map((category, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: 345,
                mx: "auto",
                width: "100%",
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              <CardMedia
                component="img"
                image={category.image}
                alt={category.title}
                sx={{
                  height: { xs: 140, sm: 160, md: 180 }, // Responsive heights
                  objectFit: "cover",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  }}
                />

              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#333",
                    fontSize: "1.1rem",
                  }}
                >
                  {category.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
