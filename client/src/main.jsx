import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="161736225122-pl6len1i4d9ovvclob36b9vm6d33cqcb.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
