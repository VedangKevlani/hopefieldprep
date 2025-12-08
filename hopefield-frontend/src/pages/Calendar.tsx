// src/pages/Calendar.tsx
import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type EventItem = {
  _id: string;
  date: string;
  title: string;
  description: string;
};

export default function Calendar() {

  const [events, setEvents] = useState<EventItem[]>([]);
  const [newEvent, setNewEvent] = useState({ date: "", title: "", description: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Fetch events error:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Admin login
  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, {
        password: passwordInput,
      });

      if (res.data.success) {
        setIsAdmin(true);
        setPasswordInput("");
      } else {
        alert("Incorrect password!");
      }
    } catch (err) {
      console.error("LOGIN ERROR -->", err);
      alert("Server error. Cannot verify password.");
    }
  };

  // Add new event
  const addEvent = async () => {
    if (!newEvent.date || !newEvent.title) return;
    try {
      const res = await axios.post(`${BACKEND_URL}/api/events`, newEvent);
      setEvents([...events, res.data]);
      setNewEvent({ date: "", title: "", description: "" });
    } catch (err) {
      console.error("Add event error:", err);
    }
  };

  // Delete event
  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete event error:", err);
    }
  };

  return (
    <div id="schoolCalendar" className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] px-6 md:px-16 py-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
        School Calendar
      </h2>

      {/* Upcoming Events */}
      <section className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-[#1E792C] mb-6 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Upcoming Events
        </h3>

        {/* Admin Login */}
        {!isAdmin && (
          <div className="flex justify-center mb-6 gap-2">
            <input
              type="password"
              placeholder="Admin Password"
              className="border px-3 py-2 rounded"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button onClick={handleAdminLogin} className="px-3 py-2 bg-[#1E792C] text-white rounded">
              Login
            </button>
          </div>
        )}

        {/* Event Table */}
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#1E792C] text-white">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              {isAdmin && <th className="border px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 4 : 3} className="text-center py-4">No upcoming events</td>
              </tr>
            )}
            {events.map((e) => (
              <tr key={e._id} className="even:bg-gray-50">
                <td className="border px-4 py-2">{e.date}</td>
                <td className="border px-4 py-2">{e.title}</td>
                <td className="border px-4 py-2">{e.description}</td>
                {isAdmin && (
                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => deleteEvent(e._id)} className="px-2 py-1 bg-red-500 text-white rounded">
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Event Form */}
        {isAdmin && (
          <div className="mt-6 bg-gray-100 p-6 rounded">
            <h4 className="font-bold text-lg mb-4">Add New Event</h4>
            <div className="flex flex-col md:flex-row gap-4">
              <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="border px-3 py-2 rounded w-full md:w-1/4" />
              <input type="text" placeholder="Event Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="border px-3 py-2 rounded w-full md:w-1/4" />
              <input type="text" placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="border px-3 py-2 rounded w-full md:w-1/2" />
              <button onClick={addEvent} className="px-4 py-2 bg-[#EAC30E] rounded font-semibold text-black">
                Add Event
              </button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
