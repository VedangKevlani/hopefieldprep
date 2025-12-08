// src/components/SchoolStats.tsx
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const stats = [
  { label: "Max Enrollment", value: 200, suffix: "+" },
  { label: "Children per Class", value: 25 },
  { label: "Teachers per Grades (K1-K2)", value: 2 },
  { label: "Teachers per Grades (3-6)", value: 1 },
  { label: "Clubs & Activities", value: 15, suffix: "+" },
  { label: "Special Subjects", value: 7 },
];

export default function SchoolStats() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section id="stats" className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-16 px-6 md:px-16">
      <h2
        className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        By the Numbers
      </h2>

      <div
        ref={ref}
        className="grid grid-cols-2 md:grid-cols-3 gap-10 text-center"
      >
        {stats.map((stat, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay: index * 0.2 } },
      }}
      className="bg-[#1E792C] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg"
    >
      {/* Animated Number */}
      <p className="text-3xl md:text-4xl font-bold text-white">
        <CountUp end={stat.value} duration={2} />{stat.suffix || ""}
      </p>

      {/* Label */}
      <p
        className="mt-2 text-lg font-semibold text-white"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        {stat.label}
      </p>
    </motion.div>
        ))}
      </div>
    </section>
  );
}
