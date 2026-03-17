import React from "react";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="max-w-md mx-auto px-4 pt-16 animate-fadeIn">

      <h1 className="text-2xl font-bold text-center mb-6">
        Login to Habito
      </h1>

      <LoginForm />

    </div>
  );
};

export default Login;