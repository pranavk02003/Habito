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
        password,
      });

      console.log(res.data);

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Save user (IMPORTANT)
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ Update redux (ONLY ONCE)
      dispatch(login(res.data));

      alert("Login successful");

      navigate("/");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
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

    </form>
  );
};

export default LoginForm;