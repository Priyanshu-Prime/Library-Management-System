import { Input } from "postcss";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import LoginButton from "../../components/LoginButton";

const PORT = import.meta.env.VITE_ADDRESS;

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex bg-[#2274A5] justify-center items-center">
      <div className="h-2/5 w-1/3 bg-white rounded-2xl flex flex-col justify-center items-center shadow-lg">
        <div className="text-4xl font-bold text-[#2274A5] mb-8">LOGIN</div>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
