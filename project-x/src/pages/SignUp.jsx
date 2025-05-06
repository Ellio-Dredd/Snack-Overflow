import { useState } from "react";
import {TextField,Radio,RadioGroup,FormControlLabel,FormControl,FormLabel,Button,Checkbox,FormGroup,Box,Typography,Paper,} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    ageUnit: { years: false, months: false, weeks: false },
  });

  const handleChange = (e) => {
    const { id, name, value } = e.target;
    const key = id || name;

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      ageUnit: {
        ...prev.ageUnit,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        age: formData.age,
        ageUnit: formData.ageUnit,
      });

      alert(response.data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        age: "",
        ageUnit: { years: false, months: false, weeks: false },
      });
      navigate("/SignIn");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "150vh",
        background: "linear-gradient(to right, #c2e9fb, #a1c4fd)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: "20px",
          maxWidth: 500,
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#2a2a2a",
            fontFamily: "'Poppins', sans-serif",
            mb: 3,
          }}
        >
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField id="firstName" label="First Name" value={formData.firstName} onChange={handleChange} fullWidth required />
          <TextField id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} fullWidth required />
          <TextField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} fullWidth required />

          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup name="gender" value={formData.gender} onChange={handleChange} row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <TextField id="age" label="Age" type="number" value={formData.age} onChange={handleChange} fullWidth required />

          <FormControl>
            <FormLabel>Age Unit</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.ageUnit.years}
                    onChange={handleCheckboxChange}
                    name="years"
                  />
                }
                label="Years"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.ageUnit.months}
                    onChange={handleCheckboxChange}
                    name="months"
                  />
                }
                label="Months"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.ageUnit.weeks}
                    onChange={handleCheckboxChange}
                    name="weeks"
                  />
                }
                label="Weeks"
              />
            </FormGroup>
          </FormControl>

          <TextField
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: "bold",
              padding: 1,
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
