import React, { useState } from "react";
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Checkbox } from "@mui/material";

export default function SignUp() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation logic to compare passwords
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
        } else {
            // Handle form submission
            console.log("Form submitted with:", { password, confirmPassword });
        }
    };

    return (
        <form style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px", margin: "auto" }} onSubmit={handleSubmit}>
            <TextField label="First Name" id="firstname" variant="outlined" fullWidth />
            <TextField label="Last Name" id="lastName" variant="outlined" fullWidth />
            <TextField label="Email" id="email" variant="outlined" type="email" fullWidth />

            <FormControl component="fieldset">
                <FormLabel component="legend"  >Choose Gender:</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="male" id="gender" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" id="gender" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>

            <TextField label="Age" type="number" variant="outlined" inputProps={{ min: 1 }} fullWidth />

            <FormControl>
                <FormLabel>Age Unit:</FormLabel>
                <FormControlLabel control={<Checkbox />} label="Years" />
                <FormControlLabel control={<Checkbox />} label="Months" />
                <FormControlLabel control={<Checkbox />} label="Weeks" />
            </FormControl>

            {/* Password and Confirm Password Fields */}
            <TextField 
                label="Password" 
                variant="outlined" 
                type="password" 
                fullWidth 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <TextField 
                label="Confirm Password" 
                variant="outlined" 
                type="password" 
                fullWidth 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
            />

            <Button variant="contained" color="primary" type="submit">
                Sign Up
            </Button>
        </form>
    );
}