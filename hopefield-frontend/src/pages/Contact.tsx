import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <div className="pt-48 px-6 md:px-16 py-20 bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-[#C47C30] mb-12 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Contact Us
      </h2>

      <div className="bg-white backdrop-blur-md bg-opacity-80 p-10 rounded-3xl shadow-2xl w-full max-w-xl flex flex-col gap-6">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C47C30] focus:border-transparent placeholder-gray-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C47C30] focus:border-transparent placeholder-gray-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subject"
          className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C47C30] focus:border-transparent placeholder-gray-500"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <textarea
          placeholder="Message"
          className="border border-gray-300 px-4 py-3 rounded-xl resize-none h-36 focus:outline-none focus:ring-2 focus:ring-[#C47C30] focus:border-transparent placeholder-gray-500"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button className="bg-[#FF3B3B] text-white font-semibold py-3 rounded-xl hover:from-[#EAC30E] hover:to-[#C47C30] transition-all duration-300 shadow-lg">
          Send
        </button>
      </div>
    </div>
  );
}
