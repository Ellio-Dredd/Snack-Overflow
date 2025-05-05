import React, { useContext, useState } from 'react';
import {Container,TextField,Button,Typography,Paper,Box} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { UserContext } from '../UserContext';

export default function SignIn() {
  const theme = useTheme();
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert('Invalid email format');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();

      if (data.token) {
        login(data.user, data.token);
        alert(`Successfully signed in as ${data.user.email}`);
        window.location.href = '/';
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #c2e9fb, #a1c4fd)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: '20px',
          maxWidth: 400,
          width: '100%',
          backgroundColor: 'white',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#2a2a2a',
            fontFamily: "'Poppins', sans-serif",
            mb: 3,
          }}
        >
          Sign In
        </Typography>

        <form onSubmit={handleSignIn} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              borderRadius: '30px',
              textTransform: 'none',
              fontWeight: 'bold',
              padding: 1,
            }}
          >
            Sign In
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: '#555' }}>
            Don't have an account?{' '}
            <a href="/signup" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
              Sign Up
              </a>
            </Typography>
        </form>
      </Paper>
    </Box>
  );
}
