import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const PORT = import.meta.env.VITE_SERVER_PORT;

const LoginButton = () => {
  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    const { name, email } = decoded;

    try {
      console.log(`http://localhost:${PORT}/api/auth/google-login`);
      const response = await fetch(
        `http://localhost:${PORT}/api/auth/google-login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }), // Send the email to the backend
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Redirect to dashboard after successful login
        const admin = ['221145', '221164'];
        const uid = data.emailUser;
        localStorage.setItem('userName', name);
        localStorage.setItem('uid', uid);
        if (!admin.includes(uid)) {
          window.location.href = 'http://localhost:5173/dashboard';
        } else {
          window.location.href = 'http://localhost:5173/adminDashboard';
        }
      } else {
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging in: ', error);
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

export default LoginButton;
