// Navbar.tsx (Home page version)
import { useState } from "react";

const icons = ["/images/puzzle.png", "/images/book.png", "/images/drawing.png", "/images/king.png", "/images/equality.png", "/images/mic.png"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/", submenu: [
        { name: "Achievements", id: "achievements" },
        { name: "Calendar", id: "calendar" },
        { name: "Stats", id: "stats" },
        { name: "Admissions", id: "admissionBanner" },
      ] 
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] fixed w-full z-50 shadow-md h-28 md:h-28">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-16 h-full">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/Hopefield Logo.png" alt="Hopefield Logo" className="h-12 md:h-16 object-contain" />
          <span className="text-[#EAC30E] font-extrabold text-2xl md:text-3xl tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Hopefield Preparatory
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-12 text-xl md:text-1xl">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              <span className="text-[#1E792C] font-bold py-1 transition-all duration-300 transform hover:scale-105" style={{ fontFamily: "'Lato', sans-serif" }}>
                {item.name}
              </span>

              {/* Submenu */}
              <ul className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white shadow-lg rounded-lg">
                {item.submenu!.map((sub) => (
                  <li key={sub.id}>
                    <button
                      onClick={() => scrollToSection(sub.id)}
                      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      {sub.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none text-[#FF3B3B]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-white to-[#FFEBC0] text-[#1E792C] flex flex-col space-y-4 px-6 py-4 shadow-lg font-bold text-lg" style={{ fontFamily: "'Lato', sans-serif" }}>
          {menuItems[0].submenu!.map((sub) => (
            <button key={sub.id} onClick={() => { scrollToSection(sub.id); setMenuOpen(false); }} className="text-left hover:text-[#1E792C]">
              {sub.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
