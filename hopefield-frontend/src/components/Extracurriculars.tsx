// src/components/Extracurriculars.tsx
import React from "react";
import { motion } from "framer-motion";

// src/data/extracurriculars.ts
export const onCampusActivities = [
  {
    title: "Football",
    grades: "K1 to Grade 6",
    location: "Hopefield Prep. School",
    runBy: "Norbrook Football Academy",
    cost: "$10,000 per term",
    classes: 10,
    dayTime: "Wednesday"
  },
  {
    title: "Tennis",
    grades: "K1 & K2",
    runBy: "Russell Tennis Academy",
    cost: "$14,000 per term",
    classes: 10,
    dayTime: "Friday"
  },
  {
    title: "Robotics",
    grades: "Grade 2 to Grade 6",
    runBy: "Miss Ramprashad",
    cost: "$20,000 per term",
    classes: 8,
    dayTime: "Thursday (Grades 2-3), Friday (Grade 4-6); 2:00–3:15 pm"
  },
  {
    title: "Smarty Pants",
    grades: "K1",
    runBy: "Mrs. Harrison",
    cost: "$1,500 per class",
    dayTime: "Tuesday and Thursday"
  },
  {
    title: "Artful Adventures in Reading",
    grades: "K1",
    runBy: "Mrs. Harrison & Miss Harris",
    cost: "$20,000 per term",
    classes: 10,
    dayTime: "Monday"
  },
  {
    title: "Brownies",
    grades: "Grade 2-6",
    runBy: "Mrs. Earle & Mrs. Reid",
    dayTime: "Monday"
  },
  {
    title: "Chess Club",
    grades: "K1- Grade 6",
    runBy: "Coach Pitterson",
    cost: "$12,000 per term",
    dayTime: "Tuesday (K1 & K2 1:00-1:45pm) (Grades 1-6 2:15-3:15 pm)"
  },
  {
    title: "Puzzle and Play",
    grades: "K2",
    runBy: "Mrs. Reid"
  },
  {
    title: "Art Club (K2)",
    grades: "K2",
    runBy: "Mrs. Reid"
  },
  {
    title: "Art Club (Grade 1)",
    grades: "Grade 1",
    runBy: "Miss Lewis",
    dayTime: "Thursday 2:15–3:15 pm"
  },
  {
    title: "Art Club (Grade 2-5)",
    grades: "Grade 2-5",
    runBy: "Mrs. Coleman",
    dayTime: "Wednesday or Thursday 2:15–3:15 pm"
  },
  {
    title: "Homework Club - Grade 3",
    grades: "Grade 3",
    runBy: "Miss Merchandani",
    cost: "$700 per hour",
    dayTime: "Monday, Tuesday & Wednesday 2:00–3:00 pm"
  },
  {
    title: "Grade 2 Homework Club",
    grades: "Grade 2",
    runBy: "Mrs. Walcott",
    dayTime: "Monday, Tuesday, Thursday & Friday 2:00–3:00 pm"
  },
  {
    title: "After Care",
    grades: "K1-Grade 1",
    runBy: "Mrs. Phillips",
    dayTime: "Monday to Thursday 2:00–3:00 pm"
  },
  {
    title: "Extra Lessons",
    grades: "Grade 3-6",
    runBy: "Class Teachers",
    dayTime: "Monday to Thursday 2:00–3:00 pm"
  }
];

export const offCampusActivities = [
  {
    title: "Swimming",
    runBy: "Aquaworx Swim School",
    location: "22 Hopefield Avenue (entrance on Seymour Ave)",
    contact: "876-291-0257",
    email: "aquaworxjamaica@gmail.com",
    website: "http://www.aquaworxja.com/"
  },
  {
    title: "Golf",
    runBy: "Swing Solutions School of Golf",
    location: "Constant Spring Golf Club",
    contact: "876-469-2022"
  },
  {
    title: "Tennis",
    runBy: "Russell Tennis Academy",
    location: "Deep Dene, 36 Hopefield Avenue",
    contact: "876-880-4337"
  },
  {
    title: "Football",
    runBy: "Evon Morgan",
    location: "Norbrook Football Academy, Shortwood Primary School Field",
    contact: "876-294-9532",
    dayTime: "Saturdays"
  },
  {
    title: "Music",
    runBy: "Miss Jillian Castle",
    location: "Citi Music, Unit A, 10 Phoenix Ave, Kingston 10",
    contact: "876-359-9098",
    email: "citimusic@gmail.com"
  },
  {
    title: "Ballet",
    runBy: "Ballet Petit",
    location: "Hopefield Prep. School",
    dayTime: "Monday to Thursday",
    email: "balletpetit.ja@gmail.com"
  },
  {
    title: "Indian Dance",
    runBy: "Mudra Art Group",
    cost: "$18,000 per term",
    location: "Hopefield Prep. School",
    dayTime: "Friday and Saturday",
    contact: "876-447-8623"
  }
];

type Activity = {
  title: string;
  grades?: string;
  location?: string;
  runBy?: string;
  cost?: string;
  classes?: string | number;
  dayTime?: string;
  contact?: string;
  email?: string;
  website?: string;
  icon?: string; // optional PNG icon
};

type ExtracurricularsProps = {
  onCampus: Activity[];
  offCampus: Activity[];
};

export default function Extracurriculars({ onCampus, offCampus }: ExtracurricularsProps) {
  const renderCard = (activity: Activity, i: number) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className="bg-[#FF3B3B] text-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
    >
      {activity.icon && (
    <img src={activity.icon} alt={activity.title} className="w-12 h-12 mb-4" />
  )}
  <h4 className="text-xl font-bold mb-2">{activity.title}</h4>
  {activity.grades && <p><strong>Grades:</strong> {activity.grades}</p>}
  {activity.runBy && <p><strong>Run by:</strong> {activity.runBy}</p>}
  {activity.location && <p><strong>Location:</strong> {activity.location}</p>}
  {activity.cost && <p><strong>Cost:</strong> {activity.cost}</p>}
  {activity.classes && <p><strong>Classes:</strong> {activity.classes}</p>}
  {activity.dayTime && <p><strong>Day/Time:</strong> {activity.dayTime}</p>}
  {activity.contact && <p><strong>Contact:</strong> {activity.contact}</p>}
  {activity.email && <p><strong>Email:</strong> {activity.email}</p>}
  {activity.website && (
    <p><strong>Website:</strong> <a href={activity.website} className="underline">{activity.website}</a></p>
  )}
    </motion.div>
  );

  return (
    <section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-20 px-6 md:px-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Extracurricular Activities
      </h2>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto">

        {/* On-Campus Activities */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-[#FF3B3B] mb-8 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            On-Campus Activities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {onCampus.map(renderCard)}
          </div>
        </div>

        {/* Off-Campus Activities */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#FF3B3B] mb-8 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Off-Campus Activities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offCampus.map(renderCard)}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
