import React from "react";
import { Github, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (

    /* Hidden on mobile, visible on tablet & desktop */
    <footer className="hidden md:block bg-gray-900 text-gray-300 mt-20">

      {/* Top Section */}

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* Brand */}

        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Habito
          </h2>

          <p className="text-sm text-gray-400">
            Build better habits every day and stay consistent.
          </p>
        </div>

        {/* Product Links */}

        <div>
          <h3 className="text-white font-semibold mb-3">
            Product
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">Dashboard</li>
            <li className="hover:text-orange-400 cursor-pointer">Statistics</li>
            <li className="hover:text-orange-400 cursor-pointer">Habit Tracking</li>
          </ul>
        </div>

        {/* Resources */}

        <div>
          <h3 className="text-white font-semibold mb-3">
            Resources
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-400 cursor-pointer">About</li>
            <li className="hover:text-orange-400 cursor-pointer">Contact</li>
            <li className="hover:text-orange-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Call to Action */}

        <div>
          <h3 className="text-white font-semibold mb-3">
            Stay Consistent
          </h3>

          <p className="text-sm text-gray-400 mb-4">
            Small habits build big success.
          </p>

          <button className="bg-orange-500 px-4 py-2 rounded-lg text-white hover:bg-orange-600 transition">
            Start Tracking
          </button>
        </div>

      </div>

      {/* Bottom Section */}

      <div className="border-t border-gray-700">

        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Habito. All rights reserved.
          </p>

          {/* Social Icons */}

          <div className="flex gap-5">

            <Github className="cursor-pointer hover:text-orange-400 transition" />

            <Twitter className="cursor-pointer hover:text-orange-400 transition" />

            <Instagram className="cursor-pointer hover:text-orange-400 transition" />

            <Youtube className="cursor-pointer hover:text-orange-400 transition" />

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;