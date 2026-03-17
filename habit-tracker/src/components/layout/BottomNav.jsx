import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, User } from "lucide-react";

const BottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow flex justify-around py-2">

      <NavLink
        to="/"
        className="flex flex-col items-center text-gray-500 hover:text-blue-600"
      >
        <Home size={22} />
        <span className="text-xs">Home</span>
      </NavLink>

      <NavLink
        to="/stats"
        className="flex flex-col items-center text-gray-500 hover:text-blue-600"
      >
        <BarChart2 size={22} />
        <span className="text-xs">Stats</span>
      </NavLink>

      <NavLink
        to="/profile"
        className="flex flex-col items-center text-gray-500 hover:text-blue-600"
      >
        <User size={22} />
        <span className="text-xs">Profile</span>
      </NavLink>

    </div>
  );
};

export default BottomNav;