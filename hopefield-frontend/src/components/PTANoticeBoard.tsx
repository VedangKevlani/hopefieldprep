// src/components/PTANoticeBoard.tsx
import { useState } from "react";
import { motion } from "framer-motion";

interface Notice {
  id: number;
  date: string;
  title: string;
  description: string;
}

const initialNotices: Notice[] = [
  {
    id: 1,
    date: "2025-12-01",
    title: "Parent-Teacher Conference Schedule",
    description: "The PTA conference will be held on Dec 10-12. Check your child's schedule."
  },
  {
    id: 2,
    date: "2025-12-03",
    title: "PTA Fundraising Event",
    description: "Join us for the annual fundraising bake sale on Dec 15 at the school hall."
  },
  {
    id: 3,
    date: "2025-12-05",
    title: "Holiday Break Notice",
    description: "School will be closed from Dec 20 to Jan 2 for the holiday season."
  },
];

export default function PTANoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [newNotice, setNewNotice] = useState({ date: "", title: "", description: "" });

  // Simple admin login (replace with secure API in production)
  const handleAdminLogin = () => {
    const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setPasswordInput("");
    } else {
      alert("Incorrect password!");
    }
  };

  const addNotice = () => {
    if (!newNotice.date || !newNotice.title) return;

    const nextId = notices.length ? Math.max(...notices.map(n => n.id)) + 1 : 1;
    const notice: Notice = { id: nextId, ...newNotice };
    setNotices([notice, ...notices]);
    setNewNotice({ date: "", title: "", description: "" });
  };

  return (
    <section className="py-12 px-6 md:px-16 bg-[#1E792C] text-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">PTA Notice Board</h2>

      {/* Admin Login */}
      {!isAdmin && (
        <div className="flex justify-center mb-6 gap-2">
          <input
            type="password"
            placeholder="Admin Password"
            className="border px-3 py-2 rounded text-black"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button
            onClick={handleAdminLogin}
            className="px-4 py-2 bg-yellow-400 rounded font-bold text-black"
          >
            Login
          </button>
        </div>
      )}

      {/* Add New Notice Form */}
      {isAdmin && (
        <div className="mb-6 p-4 bg-[#1E792C]/80 rounded border border-yellow-400">
          <h3 className="font-bold text-xl mb-3">Add New Notice</h3>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="date"
              className="px-3 py-2 rounded text-black flex-1"
              value={newNotice.date}
              onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Title"
              className="px-3 py-2 rounded text-black flex-1"
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="px-3 py-2 rounded text-black flex-1"
              value={newNotice.description}
              onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
            />
            <button
              onClick={addNotice}
              className="px-4 py-2 bg-yellow-400 rounded font-bold text-black"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 rounded-lg border-l-4 border-yellow-400 bg-[#1E792C]/80 shadow-md"
          >
            <p className="text-sm text-gray-200 mb-1">
              {new Date(notice.date).toLocaleDateString()}
            </p>
            <h3 className="text-xl font-semibold">{notice.title}</h3>
            <p className="text-white/90">{notice.description}</p>
          </motion.div>
        ))}

        {notices.length === 0 && (
          <p className="text-gray-300 italic text-center">No notices at this time.</p>
        )}
      </div>
    </section>
  );
}
