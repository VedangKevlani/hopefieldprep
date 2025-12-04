// src/components/StaffSection.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface StaffMember {
  name: string;
  email?: string;
  photo?: string;
  subject?: string;
  group: string;
}

export default function StaffSection() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [filter, setFilter] = useState("All");

  const STAFF_GROUPS = [
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

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/staff`);
        setStaff(
        res.data.map((s: StaffMember) => ({
          ...s,
          group: s.group.trim().toLowerCase() === "admin" ? "Administration" : s.group,
        }))
      );
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };
    fetchStaff();
  }, []);

  const filteredStaff =
    filter === "All" ? staff : staff.filter((s) => s.group === filter);

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
        {["All", ...STAFF_GROUPS].map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`px-4 py-2 rounded-full font-semibold transition
              ${filter === g ? "bg-[#1E792C] text-white" : "bg-gray-200 text-gray-800 hover:bg-[#1E792C] hover:text-white"}`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Staff Cards */}
      {STAFF_GROUPS.map((group) => {
        const groupMembers = filteredStaff.filter((s) => s.group === group);
        if (groupMembers.length === 0) return null;

        return (
          <div key={group} className="mb-12">
            <h3
              className="text-center text-2xl md:text-3xl font-bold text-[#1E792C] mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {group}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {groupMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="bg-[#1E792C] text-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
                >
              <img
                src={
                  member.photo
                    ? `${BACKEND_URL}${member.photo.startsWith("/") ? member.photo : "/" + member.photo}`
                    : "/images/default-teacher.png"
                }
                alt={member.name}
                className="w-28 h-28 rounded-full mb-4 object-cover"
              />
                  <h4 className="text-xl md:text-2xl font-bold mb-2">{member.name}{member.subject && ` - ${member.subject}`}
                  </h4>
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
