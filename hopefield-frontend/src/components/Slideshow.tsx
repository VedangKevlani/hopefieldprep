// src/components/HeroSlideshow.tsx
import { useState, useEffect } from "react";
import { slides } from "../data/slideshowData";

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5-second interval
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="slideshow" className="relative w-full h-screen overflow-hidden object-cover">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Text overlay positioned at bottom-left / bottom-center */}
        <div className="absolute inset-0 flex justify-center md:justify-start items-end md:items-end px-6 md:px-16 pb-12">
        <div className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] p-4 md:p-6 rounded-lg space-y-3 max-w-md md:max-w-lg shadow-lg">
            <h1
            className="text-3xl md:text-4xl font-extrabold text-[#1E792C] leading-snug"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            >
            Hope Begins with Us
            </h1>
        <a
        href="#achievements"
        className="bg-[#1E792C] text-[#EAC117] font-bold px-6 py-3 rounded-full transition-colors duration-300 mt-2 inline-block hover:bg-[#EAC117] hover:text-[#FF3B3B]"
        >
        Explore Achievements
        </a>

        </div>
        </div>
        </div>
      ))}
    </div>
  );
}
