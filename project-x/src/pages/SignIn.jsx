import { useContext } from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { UserContext } from '../UserContext'; // Correct path if UserContext is in src/

const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function SignIn() {
  const theme = useTheme();
  const { login } = useContext(UserContext); // <-- get login function from context

  const signIn = async (provider, formData) => {
    try {
      const email = formData.get('email');
      const password = formData.get('password');

      if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
      }

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
        login(data.user, data.token); // <-- Use context to store user and token
        alert(`Successfully signed in as ${data.user.email}`);
        window.location.href = '/'; // Redirect to homepage
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Helper function to validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: true, type: 'email' },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
