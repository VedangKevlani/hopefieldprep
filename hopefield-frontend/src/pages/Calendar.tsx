// src/pages/Calendar.tsx
import { useRef, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type EventItem = {
  id: number;
  date: string;
  title: string;
  description: string;
};

export default function Calendar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState(1.0);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [newEvent, setNewEvent] = useState({ date: "", title: "", description: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("calendarEvents") || "[]");
    setEvents(savedEvents);
  }, []);

  // Admin login using backend
const handleAdminLogin = async () => {
  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 
    
    console.log("Calling backend:", BACKEND_URL + "/api/admin/login"); 

    const res = await axios.post(`${BACKEND_URL}/api/admin/login`, {
      password: passwordInput,
    });

    if (res.data.success) {
      setIsAdmin(true);
      setPasswordInput("");
    } else {
      alert("Incorrect password!");
    }
  } catch (error) {
    console.log("LOGIN ERROR -->", error); // 👈 important for debugging
    alert("Server error. Cannot verify password.");
  }
};


  const addEvent = () => {
    if (!newEvent.date || !newEvent.title) return;
    const id = Date.now();
    const updated = [...events, { ...newEvent, id }];
    setEvents(updated);
    localStorage.setItem("calendarEvents", JSON.stringify(updated));
    setNewEvent({ date: "", title: "", description: "" });
  };

  const deleteEvent = (id: number) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localStorage.setItem("calendarEvents", JSON.stringify(updated));
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
  const resetZoom = () => setScale(1);

  return (
    <div className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] px-6 md:px-16 py-16 bg-white">
      <h2
        className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        School Calendar
      </h2>

      {/* PDF Preview */}
      <div className="max-w-5xl mx-auto mb-8" ref={containerRef}>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <Document
            file="/downloads/School-Calendar.pdf"
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<div className="p-10 text-center">Loading calendar…</div>}
          >
            <div className="flex justify-center">
              <Page pageNumber={pageNumber} scale={scale} loading={<div>Loading page…</div>} />
            </div>
          </Document>

          {/* PDF Controls */}
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))} className="px-3 py-2 bg-[#FF3B3B] text-white rounded">
              Prev
            </button>
            <span className="px-3 py-2 rounded bg-gray-100">{`${pageNumber} / ${numPages || "—"}`}</span>
            <button onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))} className="px-3 py-2 bg-[#FF3B3B] text-white rounded">
              Next
            </button>
            <button onClick={zoomOut} className="px-3 py-2 bg-gray-200 rounded">-</button>
            <button onClick={resetZoom} className="px-3 py-2 bg-gray-200 rounded">100%</button>
            <button onClick={zoomIn} className="px-3 py-2 bg-gray-200 rounded">+</button>
            <a href="/downloads/School-Calendar.pdf" download className="px-3 py-2 bg-[#EAC30E] rounded font-semibold text-black">
              Download PDF
            </a>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-[#FF3B3B] mb-6 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
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
            <button onClick={handleAdminLogin} className="px-3 py-2 bg-[#FF3B3B] text-white rounded">
              Login
            </button>
          </div>
        )}

        {/* Event Table */}
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#FF3B3B] text-white">
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
              <tr key={e.id} className="even:bg-gray-50">
                <td className="border px-4 py-2">{e.date}</td>
                <td className="border px-4 py-2">{e.title}</td>
                <td className="border px-4 py-2">{e.description}</td>
                {isAdmin && (
                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => deleteEvent(e.id)} className="px-2 py-1 bg-red-500 text-white rounded">
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
