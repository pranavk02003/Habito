import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Update redux
      dispatch(
        login({
          email: res.data.email,
          name: res.data.name
        })
      );

      alert("Login successful");

      navigate("/"); // go to home

    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-xl font-semibold text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="w-full bg-black text-white py-2 rounded">
        Login
      </button>

      <p className="text-sm text-center mt-4">
        Don't have an account?
        <Link
          to="/signup"
          className="text-orange-500 font-semibold ml-1 hover:underline"
        >
          Sign up
        </Link>
      </p>

      <p className="text-sm text-center text-gray-500 cursor-pointer">
        Forgot password?
      </p>

    </form>
  );
};

export default LoginForm;