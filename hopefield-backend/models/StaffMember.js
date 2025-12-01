// src/components/StaffSection.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function StaffSection() {
  const [staff, setStaff] = useState([]);
  const [filter, setFilter] = useState("All");

  // Fetch staff from backend
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/staff`)
      .then(res => setStaff(res.data))
      .catch(err => console.error("Failed to fetch staff:", err));
  }, []);

  const groups = [
    "All",
    "Administration",
    "K1",
    "K2",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Special Subjects",
    "Ancillary",
  ];

  // Filter staff based on selected group
  const filteredStaff =
    filter === "All" ? staff : staff.filter(member => member.group === filter);

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
        {groups.map(group => (
          <button
            key={group}
            onClick={() => setFilter(group)}
            className={`px-4 py-2 rounded-full font-semibold transition
              ${filter === group ? "bg-[#FF3B3B] text-white" : "bg-gray-200 text-gray-800 hover:bg-[#FF3B3B] hover:text-white"}`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Staff Cards */}
      {groups.filter(g => g !== "All").map(groupName => {
        const members = filteredStaff.filter(member => member.group === groupName);
        if (members.length === 0) return null;

        return (
          <div key={groupName} className="mb-12">
            <h3
              className="text-center text-2xl md:text-3xl font-bold text-[#FF3B3B] mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {groupName}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {members.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-[#FF3B3B] text-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
                >
                  <img
                    src={member.photo || "/images/default-teacher.png"}
                    alt={`Picture of ${member.name}`}
                    className="w-28 h-28 rounded-full mb-4 object-cover"
                  />
                  <h4 className="text-xl md:text-2xl font-bold mb-2">{member.name}</h4>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-white hover:underline"
                    >
                      {member.email}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
