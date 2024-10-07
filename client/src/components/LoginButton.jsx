import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const PORT = import.meta.env.VITE_SERVER_PORT;

const LoginButton = () => {

    const handleGoogleSuccess = async (credentialResponse) => {
      const decoded = jwtDecode(credentialResponse?.credential);
      const { email } = decoded;
  
      try {
        // Send the credential to the backend for verification
        const response = await fetch(`http://localhost:${PORT}/api/auth/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), // Send the email to the backend
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Redirect to dashboard after successful login
          window.location.href = 'http://localhost:5173/dashboard';
        } else {
          console.log('Login failed:', data.message);
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };
  
    return (
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    );
  };

  export default LoginButton