import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (page: string, target?: string) => {
    setMenuOpen(false);

    if (window.location.pathname !== page) {
      // Step 1: Navigate to the page
      navigate(page);

      // Step 2: After navigation, scroll to the target
      setTimeout(() => {
        if (target) {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else if (target) {
      // Already on the page → scroll immediately
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    {
      label: "Home",
      page: "/",
      subItems: [
        { label: "Achievements", target: "achievements" },
        { label: "Calendar Events", target: "calendar" },
        { label: "By the Numbers", target: "stats" },
        { label: "Admission Info", target: "admissionBanner" },
      ],
    },
    {
      label: "About Us",
      page: "/about",
      subItems: [
        { label: "History", target: "history" },
        { label: "Mission & Vision", target: "missionVision" },
        { label: "Staff", target: "staffSection" },
      ],
    },
    {
      label: "Admissions",
      page: "/admissions",
      subItems: [
        { label: "Application Form", target: "applicationForm" },
        { label: "Handbook", target: "handbook" },
        { label: "Magazine", target: "magazine" },
        { label: "Uniforms", target: "uniforms" },
      ],
    },
    {
      label: "Academics & Extracurriculars",
      page: "/academics",
      subItems: [
        { label: "Academics", target: "academics" },
        { label: "Special Subjects", target: "specialSubjects" },
        {
          label: "After School Activities",
          target: "afterSchoolActivities",
        },
      ],
    },
    {
      label: "Campus Life",
      page: "/campus-life",
      subItems: [
        { label: "Newsletter", target: "newsletter" },
        { label: "PTA", target: "pta" },
        { label: "Gallery", target: "campusGallery" },
        { label: "School Calendar", target: "schoolCalendar" },
        { label: "Events Calendar", target: "eventsCalendar" },
        { label: "Gift of Hope Charity", target: "giftOfHope" },
      ],
    }, 
    { label: "Contact Us", page: "/contact", subItems: [] },
  ];

  return (
    <nav className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] fixed w-full z-50 shadow-md h-28 md:h-28">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-16 h-full">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigateTo("/")}
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
            <li key={item.label} className="relative group capitalize">
              <button
                onClick={() => navigateTo(item.page)}
                className="text-[#1E792C] font-bold py-1 transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {item.label}
              </button>

              {item.subItems.length > 0 && (
                <ul className="absolute left-0 mt-2 w-48 bg-[#fff5e6] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                  {item.subItems.map((sub) => (
                    <li key={sub.label}>
                      <button
                        onClick={() => navigateTo(item.page, sub.target)}
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
          {/* Instagram */}
          <a
            href="https://www.instagram.com/hopefieldprep"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-2 text-lg mt-3 text-[#FF3B3B] hover:text-[#EAC30E] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 
                       0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 
                       0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 
                       1.346-3 3-3h10zM12 7c-2.757 0-5 2.243-5 
                       5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 2c1.654 
                       0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 
                       3-3zm4.5-.75a1.25 1.25 0 11-.001 2.501A1.25 
                       1.25 0 0116.5 8.25z"/>
            </svg>
            @hopefieldprep
          </a>
          <p className="text-lg">
            📧{" "}
            <a
              href="mailto:hopefieldprep@gmail.com"
              className="text-[#FF3B3B] hover:text-[#EAC30E] transition-colors"
            >
              hopefieldprep@gmail.com
            </a>
          </p>
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
                onClick={() => navigateTo(item.page)}
                className="hover:text-[#EAC30E] text-left w-full"
              >
                {item.label}
              </button>
              {item.subItems.length > 0 && (
                <ul className="pl-4 mt-2">
                  {item.subItems.map((sub) => (
                    <li key={sub.label}>
                      <button
                        onClick={() => navigateTo(item.page, sub.target)}
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
                    {/* Instagram */}
          <a
            href="https://www.instagram.com/hopefieldprep"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-2 text-lg mt-3 text-[#FF3B3B] hover:text-[#EAC30E] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 
                       0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 
                       0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 
                       1.346-3 3-3h10zM12 7c-2.757 0-5 2.243-5 
                       5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 2c1.654 
                       0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 
                       3-3zm4.5-.75a1.25 1.25 0 11-.001 2.501A1.25 
                       1.25 0 0116.5 8.25z"/>
            </svg>
            @hopefieldprep
          </a>
          <p className="text-lg">
            📧{" "}
            <a
              href="mailto:hopefieldprep@gmail.com"
              className="text-[#FF3B3B] hover:text-[#EAC30E] transition-colors"
            >
              hopefieldprep@gmail.com
            </a>
          </p>
        </div>
      )}
    </nav>
  );
}
