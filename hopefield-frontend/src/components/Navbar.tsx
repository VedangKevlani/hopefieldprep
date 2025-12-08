import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Sections for submenu scroll
  const menuItems = [
    { label: "Home", target: "home", page: "/" },
    { label: "About", target: "about", page: "/about" },
    { label: "Admissions", target: "admissions", page: "/admissions" },
    { label: "Contact", target: "contact", page: "/" },
  ];

  const scrollToSection = (target: string, page: string) => {
    setMenuOpen(false);

    if (router.pathname !== page) {
      // navigate to the page first
      router.push(page + "#" + target);
    } else {
      // scroll if already on the page
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Optional: smooth scroll on page load if URL has hash
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [router.asPath]);

  return (
    <nav className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] fixed w-full z-50 shadow-md h-28 md:h-28">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-16 h-full">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => scrollToSection("home", "/")}
        >
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
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-12 text-xl md:text-1xl">
          {menuItems.map((item) => (
            <li key={item.label} className="relative group">
              <button
                onClick={() => scrollToSection(item.target, item.page)}
                className="text-[#1E792C] font-bold py-1 transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {item.label}
              </button>
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
        <div className="md:hidden bg-gradient-to-b from-white to-[#FFEBC0] text-[#1E792C] flex flex-col space-y-4 px-6 py-4 shadow-lg font-bold text-lg">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.target, item.page)}
              className="hover:text-[#EAC30E] text-left w-full"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
