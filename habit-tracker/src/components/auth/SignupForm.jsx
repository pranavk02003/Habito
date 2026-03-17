import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const SignupForm = () => {

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/signup",{
       name: username,
       email,
       password
       
        
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Signup failed");

    }

  };

  return (

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="text"
        placeholder="Username"
        className="w-full border p-2 rounded"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded"
      >
        Sign Up
      </button>

    </form>

  );

};

export default SignupForm;