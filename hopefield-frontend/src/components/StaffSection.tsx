import React, { useState } from "react";
import { motion } from "framer-motion";

interface StaffMember {
  name: string;
  email?: string;
  photo?: string;
}

interface StaffGroup {
  title: string;
  members: StaffMember[];
}

const staffData: StaffGroup[] = [
  {
    title: "Administration",
    members: [
      { name: "Mrs. Sujanani - Principal" },
      { name: "Mrs. Earle - Vice Principal" },
    ],
  },
  {
    title: "K1",
    members: [
      { name: "Miss Harrison" },
      { name: "Miss Harris" },
      { name: "Nurse Williams", email: "hopefield.prek@gmail.com" },
    ],
  },
  {
    title: "K2",
    members: [
      { name: "Mrs. Reid" },
      { name: "Miss Martin" },
    ],
  },
  {
    title: "Grade 1",
    members: [
      { name: "Miss Lewis" },
      { name: "Mrs. Phillips", email: "hopefield.grade1@gmail.com" },
    ],
  },
  {
    title: "Grade 2",
    members: [
      { name: "Mrs. Coleman" },
      { name: "Mrs. Walcott", email: "hopefield.grade2@gmail.com" },
    ],
  },
  {
    title: "Grade 3",
    members: [
      { name: "Miss Merchandani", email: "hopefield.grade3@gmail.com" },
    ],
  },
  {
    title: "Grade 4",
    members: [
      { name: "Miss Wilson", email: "hopefield.grade4@gmail.com" },
    ],
  },
  {
    title: "Grade 5",
    members: [
      { name: "Miss Williams", email: "hopefield.grade5@gmail.com" },
    ],
  },
  {
    title: "Grade 6",
    members: [
      { name: "Miss Tomlinson", email: "ms.tomlinsongsat@gmail.com" },
    ],
  },
  {
    title: "Special Subjects",
    members: [
      { name: "Miss Ramprashad - Computer Science/Library", email: "hopefield.computer@gmail.com" },
      { name: "Mrs. Abrikian - Spanish" },
      { name: "Coach Cobran - Physical Education" },
      { name: "Coach Levy - Physical Education" },
      { name: "Mrs. Thwaites - Movement" },
      { name: "Coach Pitterson - Chess" },
      { name: "Miss Castle - Music" },
      { name: "Mr. Renford - Music" },
    ],
  },
  {
    title: "Ancillary",
    members: [
      { name: "Miss Nadine Clarke" },
      { name: "Miss Tamara Gordon" },
      { name: "Mr. Henroy Gordon" },
    ],
  },
];

const filterOptions = ["All", ...staffData.map(g => g.title)];

export default function StaffSection() {
  const [filter, setFilter] = useState("All");

  const filteredData =
    filter === "All"
      ? staffData
      : staffData.filter(group => group.title === filter);

  return (
    <section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-16 px-6 md:px-16">
      <h2
        className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-8 text-center"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Our Teachers & Staff
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filterOptions.map(option => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-4 py-2 rounded-full font-semibold transition
              ${filter === option ? "bg-[#FF3B3B] text-white" : "bg-gray-200 text-gray-800 hover:bg-[#FF3B3B] hover:text-white"}`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Staff Cards */}
      {filteredData.map((group, idx) => (
        <div key={idx} className="mb-12">
          <h3
            className="text-center text-2xl md:text-3xl font-bold text-[#FF3B3B] mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {group.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {group.members.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#FF3B3B] text-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
              >
                <img
                  src={member.photo || "/images/default-teacher.png"}
                  alt={"Picture for: " + member.name}
                  className="w-28 h-28 rounded-full mb-4 object-cover"
                />
                <h4 className="text-xl md:text-2xl font-bold mb-2">{member.name}</h4>
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-white hover:underline">
                    {member.email}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
