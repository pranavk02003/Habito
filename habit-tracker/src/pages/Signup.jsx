import React from "react";
import SignupForm from "../components/auth/SignupForm";


const Signup = () => {
  return (
    <div className="max-w-md mx-auto px-4 pt-16 animate-fadeIn">

      <h1 className="text-2xl font-bold text-center mb-6">
        Create your Habito account
      </h1>

      <SignupForm />

    </div>
  );
};

export default Signup;