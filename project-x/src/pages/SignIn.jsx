import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const signIn = async (provider, formData) => {
  try {
    // Ensure that formData is not undefined and the keys exist
    const email = formData.get('email');
    const password = formData.get('password');

    // Validate email (check if it's a valid email format)
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    const response = await fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid email or password');
    }

    const data = await response.json();

    if (data.token) {
      // Save the JWT token in localStorage
      localStorage.setItem('token', data.token);
      alert(`Successfully signed in as ${data.user.email}`);
    } else {
      throw new Error('Token not received');
    }

    window.location.href = '/'; // Redirect to home page
  } catch (error) {
    alert(error.message);
  }
};

// Helper function to validate email
const isValidEmail = (email) => {
  // Regular expression for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: true, type: 'email' }, // Make sure the email input type is 'email'
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
