import { i } from "framer-motion/client";
import { isCookie } from "react-router-dom";

// src/data/extracurriculars.ts
export const onCampusActivities = [
  {
    title: "Football",
    grades: "K1 to Grade 6",
    location: "Hopefield Prep. School",
    runBy: "Norbrook Football Academy",
    cost: "$10,000 per term",
    classes: 10,
    dayTime: "Wednesday",
    icon: "/images/soccer-ball.png"
  },
  {
    title: "Tennis",
    grades: "K1 & K2",
    runBy: "Russell Tennis Academy",
    cost: "$14,000 per term",
    classes: 10,
    dayTime: "Friday",
    icon: "/images/tennis.png"
  },
  {
    title: "Robotics",
    grades: "Grade 2 to Grade 6",
    runBy: "Miss Ramprashad",
    cost: "$20,000 per term",
    classes: 8,
    dayTime: "Thursday (Grades 2-3), Friday (Grade 4-6); 2:00-3:15 pm",
    icon: "/images/robot-arm.png"
  },
  {
    title: "Smarty Pants",
    grades: "K1",
    runBy: "Mrs. Harrison",
    cost: "$1,500 per class",
    dayTime: "Tuesday and Thursday",
    icon: "/images/puzzle.png"
  },
  {
    title: "Artful Adventures in Reading",
    grades: "K1",
    runBy: "Mrs. Harrison & Miss Harris",
    cost: "$20,000 per term",
    classes: 10,
    dayTime: "Monday",
    icon: "/images/book.png"
  },
  {
    title: "Brownies",
    grades: "Grade 2-6",
    runBy: "Mrs. Earle & Mrs. Reid",
    dayTime: "Monday",
    icon: "/images/equality.png"
  },
  {
    title: "Chess Club",
    grades: "K1- Grade 6",
    runBy: "Coach Pitterson",
    cost: "$12,000 per term",
    dayTime: "Tuesday (K1 & K2 1:00-1:45pm) (Grades 1-6 2:15-3:15 pm)",
    icon: "/images/king.png"
  },
  {
    title: "Puzzle and Play",
    grades: "K2",
    runBy: "Mrs. Reid",
    icon: "/images/puzzle.png"
  },
  {
    title: "Art Club (K2)",
    grades: "K2",
    runBy: "Mrs. Reid",
    icon: "/images/drawing.png"
  },
  {
    title: "Art Club (Grade 1)",
    grades: "Grade 1",
    runBy: "Miss Lewis",
    dayTime: "Thursday 2:15-3:15 pm",
    icon: "/images/drawing.png"
  },
  {
    title: "Art Club (Grade 2-5)",
    grades: "Grade 2-5",
    runBy: "Mrs. Coleman",
    dayTime: "Wednesday or Thursday 2:15–3:15 pm",
    icon: "/images/drawing.png"
  },
  {
    title: "Homework Club - Grade 3",
    grades: "Grade 3",
    runBy: "Miss Merchandani",
    cost: "$700 per hour",
    dayTime: "Monday, Tuesday & Wednesday 2:00-3:00 pm",
    icon: "/images/book.png"
  },
  {
    title: "Grade 2 Homework Club",
    grades: "Grade 2",
    runBy: "Mrs. Walcott",
    dayTime: "Monday, Tuesday, Thursday & Friday 2:00-3:00 pm",
    icon: "/images/book.png"
  },
  {
    title: "After Care",
    grades: "K1-Grade 1",
    runBy: "Mrs. Phillips",
    dayTime: "Monday to Thursday 2:00-3:00 pm",
    icon: "/images/equality.png"
  },
  {
    title: "Extra Lessons",
    grades: "Grade 3-6",
    runBy: "Class Teachers",
    dayTime: "Monday to Thursday 2:00-3:00 pm",
    icon: "/images/book.png"
  },
  {
    title: "Ballet (external to Hopefield)",
    runBy: "Ballet Petit",
    location: "Hopefield Prep. School",
    dayTime: "Monday to Thursday",
    email: "balletpetit.ja@gmail.com",
    icon: "/images/dance.png"
  },
  {
    title: "Indian Dance (external to Hopefield)",
    runBy: "Mudra Art Group",
    cost: "$18,000 per term",
    location: "Hopefield Prep. School",
    dayTime: "Friday and Saturday",
    contact: "876-447-8623",
    icon: "/images/dance.png"
  }
];

export const offCampusActivities = [
  {
    title: "Swimming",
    runBy: "Aquaworx Swim School",
    location: "22 Hopefield Avenue (entrance on Seymour Ave)",
    contact: "876-291-0257",
    email: "aquaworxjamaica@gmail.com",
    website: "http://www.aquaworxja.com/",
    icon: "/images/swimming.png"
  },
  {
    title: "Golf",
    runBy: "Swing Solutions School of Golf",
    location: "Constant Spring Golf Club",
    contact: "876-469-2022",
    icon: "/images/golf.png"
  },
  {
    title: "Tennis",
    runBy: "Russell Tennis Academy",
    location: "Deep Dene, 36 Hopefield Avenue",
    contact: "876-880-4337",
    icon: "/images/tennis.png"
  },
  {
    title: "Football",
    runBy: "Evon Morgan",
    location: "Norbrook Football Academy, Shortwood Primary School Field",
    contact: "876-294-9532",
    dayTime: "Saturdays",
    icon: "/images/soccer-ball.png"
  },
  {
    title: "Music",
    runBy: "Miss Jillian Castle",
    location: "Citi Music, Unit A, 10 Phoenix Ave, Kingston 10",
    contact: "876-359-9098",
    email: "citimusic@gmail.com",
    icon: "/images/mic.png"
  }
];
