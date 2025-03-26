import React from "react";
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Checkbox } from "@mui/material";

export default function SignUp() {
    return (
        <form style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px", margin: "auto" }}>
            <TextField label="First Name" variant="outlined" fullWidth />
            <TextField label="Last Name" variant="outlined" fullWidth />
            <TextField label="Email" variant="outlined" type="email" fullWidth />

            <FormControl component="fieldset">
                <FormLabel component="legend">Choose Gender:</FormLabel>
                <RadioGroup row>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>

            <TextField label="Age" type="number" variant="outlined" inputProps={{ min: 1 }} fullWidth />

            <FormControl>
                <FormLabel>Age Unit:</FormLabel>
                <FormControlLabel control={<Checkbox />} label="Years" />
                <FormControlLabel control={<Checkbox />} label="Months" />
                <FormControlLabel control={<Checkbox />} label="Weeks" />
            </FormControl>

            <Button variant="contained" color="primary" type="submit">
                Sign Up
            </Button>
        </form>
    );
}
