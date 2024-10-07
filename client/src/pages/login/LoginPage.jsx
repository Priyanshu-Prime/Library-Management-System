import { Input } from 'postcss'
import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import LoginButton from '../../components/LoginButton';

const PORT = import.meta.env.VITE_SERVER_PORT;


const LoginPage = () => {
  return (
    <div className='h-screen w-screen flex bg-[#A1EEC5] justify-center'>
      <div className='h-4/5 w-10/12 bg-[#64CF7BDE] flex self-center rounded-lg justify-end ml-20'>
        <div className='h-3/5 w-1/3 bg-[#A1EEC5] self-center rounded-2xl mr-20 flex flex-col justify-center'>
          {/* <GoogleLogin
              onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse?.credential);
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            /> */}
          <div className='h-1/4 w-full text-center place-content-center font-light text-4xl'>LOGIN</div>
          <div className='h-2/3 w-full flex flex-col justify-center'>
            <input className='h-12 w-2/3 self-center rounded-3xl placeholder:text-center' placeholder='Email' />
            <input className='h-12 w-2/3 self-center mt-8 rounded-3xl placeholder:text-center' placeholder='Password' />
          </div>
          <LoginButton />
        </div>
      </div>
    </div>
  )
}

export default LoginPage