import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = ["Home", "About", "Admissions", "Calendar", "Contact"];

  return (
<nav className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] fixed w-full z-50 shadow-md h-28 md:h-28">
  <div className="container mx-auto flex justify-between items-center px-6 md:px-16 h-full">
    {/* Logo + School Name */}
    <Link to="/" className="flex items-center space-x-3">
      <img
        src="/Hopefield Logo.png"
        alt="Hopefield Logo"
        className="h-12 md:h-16 object-contain"
      />
      <span
        className="text-[#EAC30E] font-extrabold text-2xl md:text-3xl tracking-wide"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Hopefield Preparatory
      </span>
    </Link>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-12 text-xl md:text-1xl">
          {menuItems.map((item) => (
            <li key={item} className="relative group">
              <Link
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="text-[#FF3B3B] font-bold py-1 transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {item}
              </Link>
              {/* Smooth sliding underline */}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#FF3B3B] transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none text-[#FF3B3B]"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-gradient-to-b from-white to-[#FFEBC0] text-[#FF3B3B] flex flex-col space-y-4 px-6 py-4 shadow-lg font-bold text-lg"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="hover:text-red-700 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
