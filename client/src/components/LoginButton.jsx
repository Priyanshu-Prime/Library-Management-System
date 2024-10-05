const googleLogin = () => {
    window.location.href = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/auth/google`;
  };
  
  const LoginButton = () => (
    <button onClick={googleLogin}>Login with Google</button>
  );
  
  export default LoginButton;
  