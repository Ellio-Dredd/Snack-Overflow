import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../pages/Calander.css';  

import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
} from "@mui/material";

const SelectAppointment = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleNext = () => {
    if (selectedDate) {
      navigate("/EnterDetails", { state: { selectedDate: selectedDate.toISOString() } });
    } else {
      alert("Please select a date.");
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
          {/* ph details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Rajapakse Pharmacy
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
          </Grid>

          {/* calendar */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box
              sx={{
                "& .react-calendar": {
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  fontFamily: "'Segoe UI', sans-serif",
                },
              }}
            >
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()}
              />
            </Box>
          </Grid>
        </Grid>

        {/* button */}
        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: "bold",
              px: 4,
              py: 1,
              fontSize: "16px",
            }}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SelectAppointment;
