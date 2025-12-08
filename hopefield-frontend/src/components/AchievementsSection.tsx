// src/components/AchievementsSection.tsx
import { motion } from "framer-motion";

interface Achievement {
  title: string;
  description: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
  icons: string[];
}

export default function AchievementsSection({
  achievements,
  icons,
}: AchievementsSectionProps) {
  return (
    <section
      id="achievements"
      className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-16 px-6 md:px-16 flex flex-col items-center"
    >
      {/* Section Header */}
      <h2
        className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        What does it mean to be a Hopefielder?
      </h2>

      {/* Short Description */}
      <div className="text-center w-full flex justify-center mb-16">
        <div className="max-w-5xl space-y-4">
          <p
            className="text-gray-900 md:text-2xl leading-relaxed"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            At Hopefield Preparatory School, we believe in unlocking every child’s potential through a balanced education — combining academic excellence, creative exploration, personal character, and community spirit.
          </p>
          <p
            className="text-gray-900 md:text-2xl leading-relaxed"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            We offer a nurturing environment where students grow in confidence, build strong moral and social values, and prepare for lifelong learning beyond the classroom. Through small classes, dedicated teachers, and a vibrant curriculum including sports, arts, and clubs, we help each student flourish academically, socially, and emotionally.
          </p>
        </div>
      </div>

        {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        {achievements.map((achieve, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-[#1E792C] p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
          >
            {/* Icon */}
            <img
              src={icons[index % icons.length]}
              alt={achieve.title}
              className="w-20 h-20 mb-6"
            />

            {/* Title */}
            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {achieve.title}
            </h3>

            {/* Description */}
            <p
              className="text-2xl md:text-2xl text-white leading-relaxed"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              {achieve.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
