import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, User } from "lucide-react";
import logo from "../../assets/logo/Habito.png";

const Header = () => {
  return (
    <header className="hidden md:flex bg-slate-900 text-white px-8 py-4 justify-between items-center shadow">

      {/* Logo */}
      <div className="flex items-center gap-3">

        <img
          src={logo}
          alt="Habito"
          className="w-12 h-12 rounded-lg"
        />

        <span className="text-3xl font-extrabold tracking-wide text-orange-400">
          Habito
        </span>

      </div>

      {/* Navigation */}
      <nav className="flex gap-6 items-center">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-1 hover:text-orange-400 ${
              isActive ? "text-orange-400" : ""
            }`
          }
        >
          <Home size={18} /> Home
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) =>
            `flex items-center gap-1 hover:text-orange-400 ${
              isActive ? "text-orange-400" : ""
            }`
          }
        >
          <BarChart2 size={18} /> Stats
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-1 hover:text-orange-400 ${
              isActive ? "text-orange-400" : ""
            }`
          }
        >
          <User size={18} /> Profile
        </NavLink>

        {/* Login Button */}
        <NavLink to="/login">
          <button className="bg-orange-500 px-4 py-1 rounded-lg hover:bg-orange-600 transition">
            Login
          </button>
        </NavLink>

      </nav>

    </header>
  );
};

export default Header;