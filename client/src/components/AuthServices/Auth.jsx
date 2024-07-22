"use client"
import React, { useState } from "react";
import { RegisterForm } from "./Register";
import { LoginForm } from "./Login";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <>
     <div className="flex items-center justify-center h-screen">
      {isRegister ? (
        <RegisterForm setRegister={setIsRegister} />
      ) : (
        <LoginForm setRegister={setIsRegister} />
      )}
      </div>
    </>
  );
};

export default Auth;
