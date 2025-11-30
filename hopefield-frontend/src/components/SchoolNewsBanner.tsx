// src/components/SchoolNewsBanner.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const newsItems = [
  {
    title: "Holly Jolly Dress-Up - The Hopefield Prep Costume Party",
    date: "December 6, 2025",
    description:
      "Part proceeds to aid purchasing of toys for children affected by the hurricane.",
  },
  {
    title: "Scholastic Book Fair Success",
    date: "November 27-28, 2025",
    description:
      "This year's book fair is not just about great reads. It is about rebuilding lives. All proceeds go towards helping schools affected by the hurricane.",
  },
  {
    title: "Oracabessa Sea Turtle project",
    date: "October 22, 2025",
    description:
      "The children learned about the importance of sea turtles to our ecosystem and how to protect them. Thank you to Mr Tennant and his wonderful team for the experience.",
  }
];

export default function SchoolNewsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const prevNews = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };

  const nextNews = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="bg-white/5 py-16 px-6 md:px-16 flex flex-col items-center">
      <h2
        className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        School News
      </h2>

      <div className="relative flex items-center w-full max-w-xl">
        {/* Left Arrow */}
        <button
          onClick={prevNews}
          className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-[#FF3B3B] text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-[#FF3B3B] hover:text-white transition-all"
        >
          &larr;
        </button>

        {/* Card */}
        <div className="flex-1">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#FF3B3B] p-8 rounded-2xl shadow-xl text-white flex flex-col justify-between"
            >
              <h3
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {newsItems[currentIndex].title}
              </h3>
              <p className="text-gray-100 text-sm mb-4">
                {newsItems[currentIndex].date}
              </p>
              <p className="text-white text-base leading-relaxed">
                {newsItems[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextNews}
          className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-[#FF3B3B] text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-[#FF3B3B] hover:text-white transition-all"
        >
          &rarr;
        </button>
      </div>
    </section>
  );
}
