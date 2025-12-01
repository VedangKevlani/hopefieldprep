import { Link } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Admissions from "../pages/Admissions";
import Calendar from "../pages/Calendar";
import Contact from "../pages/Contact";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-200 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">

        {/* School Info with Logo */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-3">
            <img src="/Hopefield Logo.png" alt="Hopefield Logo" className="h-24 w-auto" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#EAC30E] tracking-wide">
              Hopefield Preparatory School
            </h3>
          </div>
          <p className="mt-2 text-base md:text-lg leading-relaxed text-center md:text-left">
            Inspiring young minds through excellence, character, and creativity.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">Contact Us</h4>
          <p className="text-lg">6 Hillcrest Avenue, Kingston 6, Jamaica</p>
          <p className="text-lg mt-1">📞 (876) 927-8216</p>
          <p className="text-lg">
            📧{" "}
            <a
              href="mailto:hopefieldprep@gmail.com"
              className="text-[#FF3B3B] hover:text-[#EAC30E] transition-colors"
            >
              hopefieldprep@gmail.com
            </a>
          </p>

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
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-1 text-lg">
            <li>
              <Link to="/" className="hover:text-[#EAC30E] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#EAC30E] transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/admissions" className="hover:text-[#EAC30E] transition">
                Admissions
              </Link>
            </li>
            <li>
              <Link to="/calendar" className="hover:text-[#EAC30E] transition">
                School Calendar
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#EAC30E] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-base md:text-lg text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Hopefield Preparatory School — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
