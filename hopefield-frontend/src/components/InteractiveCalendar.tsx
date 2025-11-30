// src/components/InteractiveCalendar.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const eventsData = [
  { date: "2024-09-09", title: "K1 and K2 Orientation", description: "8:00-10:00 AM" },
  { date: "2024-09-10", title: "All Classes Begin", description: "Full school in session" },
  { date: "2024-09-26", title: "Back to School Night & PTA AGM", description: "5:00-7:00 PM" },
  { date: "2024-10-17", title: "In-House Heritage Concert", description: "Lively performances honoring our past" },
  { date: "2024-10-18", title: "National Heroes' Day Mid Term Break", description: "School Closed" },
  { date: "2024-10-19", title: "National Heroes' Day Mid Term Break", description: "School Closed" },
  { date: "2024-10-20", title: "National Heroes' Day Mid Term Break", description: "School Closed" },
  { date: "2024-10-21", title: "National Heroes' Day Mid Term Break", description: "School Closed" },
  { date: "2024-10-22", title: "National Heroes' Day Mid Term Break", description: "School Closed" },
  { date: "2024-10-23", title: "All Classes Resume", description: "Full school resumption" },
  { date: "2024-11-25", title: "Exam Week", description: "Dates may vary by grade" },
  { date: "2024-11-26", title: "Exam Week", description: "Dates may vary by grade" },
  { date: "2024-11-27", title: "Exam Week", description: "Dates may vary by grade" },
  { date: "2024-11-28", title: "Exam Week", description: "Dates may vary by grade" },
  { date: "2024-11-29", title: "Exam Week", description: "Dates may vary by grade" },
  { date: "2024-12-12", title: "Holiday concert", description: "Lively performances in the spirit of Christmas" },
  { date: "2024-12-13", title: "School Closes at 12 Noon", description: "Christmas Break" },
  { date: "2025-01-07", title: "All Classes Resume", description: "Full school resumption" },
  { date: "2025-01-10", title: "Parent/Teacher Conferences", description: "Invitation to Parents and Teachers to attend PTA" },
  { date: "2025-02-20", title: "Primary Exit Profile Grade 6", description: "Abilities Test" },
  { date: "2025-03-01", title: "Sports Day", description: "Houses compete for Winning House 2025" },
  { date: "2025-03-05", title: "Ash Wednesday Midterm Break", description: "School Closed" },
  { date: "2025-03-06", title: "Ash Wednesday Midterm Break", description: "School Closed" },
  { date: "2025-03-07", title: "Ash Wednesday Midterm Break", description: "School Closed" },
  { date: "2025-03-10", title: "All Classes Resume", description: "Full school resumption" },
  { date: "2025-03-19", title: "Primary Exit Profile Grade 6", description: "Performance Tasks" },
  { date: "2025-03-20", title: "Primary Exit Profile Grade 6", description: "Performance Tasks" },
  { date: "2025-04-11", title: "Easter Break (Regular Dismissal)", description: "School Closed" },
  { date: "2025-04-29", title: "All Classes Resume", description: "Full school resumption" },
  { date: "2025-04-30", title: "Grade 6 Curriculum Based", description: "Internal Assessments" },
  { date: "2025-05-01", title: "Grade 6 Curriculum Based", description: "Internal Assessments" },
  { date: "2025-05-08", title: "Open Day", description: "No details available" },
  { date: "2025-05-21", title: "Labour Day Midterm Break", description: "School Closed" },
  { date: "2025-05-22", title: "Labour Day Midterm Break", description: "School Closed" },
  { date: "2025-05-23", title: "Labour Day Midterm Break", description: "School Closed" },
  { date: "2025-05-26", title: "All Classes Resume", description: "Full school resumption" },
  { date: "2025-05-28", title: "Grade 3 Diagnostic Tests", description: "Internal Assessments" },
  { date: "2025-05-29", title: "Grade 3 Diagnostic Tests", description: "Internal Assessments" },
  { date: "2025-06-02", title: "Exam Week", description: "Dates may vary by grade" },
  { date: "2025-06-03", title: "Exam Week", description: "Dates may vary by grade" },
  { date: "2025-06-04", title: "Exam Week", description: "Dates may vary by grade" },
  { date: "2025-06-05", title: "Exam Week", description: "Dates may vary by grade" },
  { date: "2025-06-06", title: "Exam Week", description: "Dates may vary by grade" },
  { date: "2025-06-04", title: "Grade 5 Performance Tasks", description: "Internal Assessments" },
  { date: "2025-06-05", title: "Grade 5 Performance Tasks", description: "Internal Assessments" },
  { date: "2025-06-18", title: "Grade 4 Performance Tasks", description: "Internal Assessments" },
  { date: "2025-06-19", title: "Grade 4 Performance Tasks", description: "Internal Assessments" },
  { date: "2025-06-25", title: "In-House Summer Concert", description: "Lively performances by our Houses" },
  { date: "2025-06-26", title: "Grade 6 Graduation", description: "Outgoing Class of Grade 6" },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TODAY = new Date();

// FIX — prevents date shifting backward by timezone
const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export default function InteractiveCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const formatDate = (day: number) =>
    `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}>
        School Calendar
      </h2>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6 max-w-md mx-auto text-[#FF3B3B] font-bold">
        <button onClick={prevMonth} className="hover:text-[#EAC30E] transition-colors">&larr; Prev</button>
        <span className="text-xl md:text-2xl">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button onClick={nextMonth} className="hover:text-[#EAC30E] transition-colors">Next &rarr;</button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-7 text-center mb-3 font-bold text-[#FF3B3B]">
            {daysOfWeek.map(day => <div key={day}>{day}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-3">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dateStr = formatDate(day);
              const hasEvent = eventsData.some(ev => ev.date === dateStr);
              const isToday =
                TODAY.getDate() === day &&
                TODAY.getMonth() === currentMonth.getMonth() &&
                TODAY.getFullYear() === currentMonth.getFullYear();

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`cursor-pointer p-4 rounded-xl text-center font-bold select-none
                    ${hasEvent ? "bg-[#FF3B3B] text-white shadow-md" : "bg-gray-100 text-gray-800"}
                    ${isToday ? "border-4 border-[#EAC30E]" : ""}
                    hover:bg-[#EAC30E] hover:text-white transition-all duration-300`}
                >
                  {day}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Events Side Panel */}
        <div className="flex-1 bg-[#F9F9F9] p-6 rounded-xl shadow-xl">
          {selectedDate ? (
            <>
              <h3 className="text-2xl font-bold text-[#FF3B3B] mb-4">
                Events on {parseLocalDate(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
              </h3>

              {eventsData.filter(ev => ev.date === selectedDate).map((ev, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.15 }}
                  className="mb-4 p-4 bg-[#FF3B3B]/10 rounded-lg border-l-4 border-[#FF3B3B]"
                >
                  <h4 className="text-xl font-semibold text-[#FF3B3B]">{ev.title}</h4>
                  <p className="text-gray-800">{ev.description}</p>
                </motion.div>
              ))}
            </>
          ) : (
            <p className="text-gray-700">Select a date to view events.</p>
          )}
        </div>
      </div>
    </section>
  );
}
