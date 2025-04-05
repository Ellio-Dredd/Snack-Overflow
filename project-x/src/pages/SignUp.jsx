import { useState } from "react";
import {
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
    Checkbox,
    FormGroup,
    Box
} from "@mui/material";
import axios from "axios";

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        age: "",
        ageUnit: { years: false, months: false, weeks: false }
    });

    const handleChange = (e) => {
        const { id, name, value, type } = e.target;
        const key = id || name;
      
        setFormData((prev) => ({
          ...prev,
          [key]: value
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
                ageUnit: formData.ageUnit
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
                ageUnit: { years: false, months: false, weeks: false }
            });
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed!");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "350px",
                margin: "auto",
                padding: "20px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                backgroundColor: "#fff"
            }}
        >
            <TextField id="firstName" label="First Name" onChange={handleChange} fullWidth required />
            <TextField id="lastName" label="Last Name" onChange={handleChange} fullWidth required />
            <TextField id="email" label="Email" type="email" onChange={handleChange} fullWidth required />

            <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup name="gender" onChange={handleChange}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>

            <TextField id="age" label="Age" type="number" onChange={handleChange} fullWidth required />

            <FormControl>
                <FormLabel>Age Unit</FormLabel>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Years" />
                    <FormControlLabel control={<Checkbox />} label="Months" />
                    <FormControlLabel control={<Checkbox />} label="Weeks" />
                </FormGroup>
            </FormControl>

            <TextField id="password" label="Password" type="password" onChange={handleChange} fullWidth required />
            <TextField id="confirmPassword" label="Confirm Password" type="password" onChange={handleChange} fullWidth required />

            <Button variant="contained" color="primary" type="submit">
                Sign Up
            </Button>
        </Box>
    );
}
