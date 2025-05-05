import { useState } from "react";
import {Box,Paper,TextField,Button,Typography,MenuItem,Grid} from "@mui/material";
import { useLocation } from "react-router-dom";

const EnterDetails = () => {
  const location = useLocation();
  const { selectedDate } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, date: selectedDate }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Appointment Confirmed!");
        console.log("Appointment Details:", data);
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #c2e9fb, #a1c4fd)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "20px",
          maxWidth: 900,
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 4,
            fontFamily: "'Poppins', sans-serif",
            color: "#2a2a2a",
          }}
        >
          Book Your Appointment
        </Typography>

        <Grid container spacing={4}>
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Rajapakse Channeling Center
            </Typography>
            <Typography>
              Schedule your appointment today, and our team will promptly reach out to confirm your booking!
            </Typography>

            <Box mt={3}>
              <Typography fontWeight="bold">Pharmacy Address:</Typography>
              <Typography color="primary">Rajapakse Pharmacy</Typography>
              <Typography>No:456, Kurunegala Road</Typography>
              <Typography>Madampe 61230</Typography>
            </Box>

            <Box mt={3}>
              <Typography fontWeight="bold">Appointment Date:</Typography>
              <Typography>
                {selectedDate ? new Date(selectedDate).toDateString() : "Not selected"}
              </Typography>
            </Box>
          </Grid>

          {/* Right Section - Form */}
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <TextField
                select
                label="Select Doctor"
                name="doctor"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                value={formData.doctor}
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Doctor</MenuItem>
                <MenuItem value="Dr. Sumith">Dr. Sumith Rathnasiri</MenuItem>
                <MenuItem value="Dr. Gayana">Dr. Gayana Fernando</MenuItem>
                <MenuItem value="Dr. Yasas">Dr. Yasas Jayaweera</MenuItem>
                <MenuItem value="Dr. Nipunika">Dr. Nipunika Vithana</MenuItem>
                <MenuItem value="Dr. Anurudha">Dr. Anurudha Abesinghe</MenuItem>
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  borderRadius: "30px",
                  textTransform: "none",
                  fontWeight: "bold",
                  py: 1,
                }}
              >
                Confirm Booking
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EnterDetails;
