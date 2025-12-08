import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Main menu items with submenus (exact IDs of sections)
  const menuItems = [
    {
      label: "Home",
      target: "home",
      subItems: [
        { label: "Achievements", target: "achievements" },
        { label: "Calendar", target: "calendar" },
        { label: "Stats", target: "stats" },
        { label: "Admission Banner", target: "admissionBanner" },
      ],
    },
    {
      label: "About",
      target: "about",
      subItems: [
        { label: "History", target: "history" },
        { label: "Mission & Vision", target: "missionVision" },
        { label: "Gallery", target: "imageGallery" },
        { label: "Staff", target: "staffSection" },
      ],
    },
    {
      label: "Admissions",
      target: "admissions",
      subItems: [
        { label: "Application Form", target: "applicationForm" },
        { label: "Handbook", target: "handbook" },
        { label: "Magazine", target: "magazine" },
      ],
    },
    { label: "Contact", target: "contact", subItems: [] },
  ];

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Section not found:", id);
    }
  };

  // Optional: scroll on page load if URL has hash
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <nav className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] fixed w-full z-50 shadow-md h-28 md:h-28">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-16 h-full">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => scrollToSection("home")}
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
                onClick={() => scrollToSection(item.target)}
                className="text-[#1E792C] font-bold py-1 transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {item.label}
              </button>

              {/* Dropdown submenu */}
              {item.subItems.length > 0 && (
                <ul className="absolute left-0 mt-2 w-48 bg-[#fff5e6] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                  {item.subItems.map((sub) => (
                    <li key={sub.label}>
                      <button
                        onClick={() => scrollToSection(sub.target)}
                        className="block w-full text-left px-4 py-2 text-[#1E792C] hover:bg-[#EAC30E] hover:text-white rounded-lg transition-colors"
                      >
                        {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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
            <div key={item.label}>
              <button
                onClick={() => scrollToSection(item.target)}
                className="hover:text-[#EAC30E] text-left w-full"
              >
                {item.label}
              </button>

              {item.subItems.length > 0 && (
                <ul className="pl-4 mt-2">
                  {item.subItems.map((sub) => (
                    <li key={sub.label}>
                      <button
                        onClick={() => scrollToSection(sub.target)}
                        className="hover:text-[#EAC30E] text-left w-full py-1"
                      >
                        {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
