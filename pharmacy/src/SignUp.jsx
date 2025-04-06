import React, { useState } from "react";
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
        const { id, name, value } = e.target;
        setFormData({ ...formData, [id || name]: value });
    };

    const handleAgeUnitChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            ageUnit: { ...prev.ageUnit, [name]: checked }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", {
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
            console.error("Signup error:", error); // 👈 Logs full error to browser console
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
            <TextField
                id="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                id="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
            />

            <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>

            <TextField
                id="age"
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                required
            />

            <FormControl>
                <FormLabel>Age Unit</FormLabel>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="years"
                                checked={formData.ageUnit.years}
                                onChange={handleAgeUnitChange}
                            />
                        }
                        label="Years"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="months"
                                checked={formData.ageUnit.months}
                                onChange={handleAgeUnitChange}
                            />
                        }
                        label="Months"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="weeks"
                                checked={formData.ageUnit.weeks}
                                onChange={handleAgeUnitChange}
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

            <Button variant="contained" color="primary" type="submit">
                Sign Up
            </Button>
        </Box>
    );
}
