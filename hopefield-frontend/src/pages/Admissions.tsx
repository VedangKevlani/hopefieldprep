// src/pages/Admissions.tsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PdfPreview from "../components/PdfPreview";
import Extracurriculars from "../components/Extracurriculars";
import { onCampusActivities, offCampusActivities } from "../data/extracurriculars";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // e.g., https://hopefield-backend.onrender.com

interface AdmissionPdf {
  id: string;       // e.g., "applicationForm", "handbook", "magazine"
  title: string;
  filePath: string; // backend path (like "/uploads/applicationForm.pdf")
}

export default function Admissions() {
  const [pdfs, setPdfs] = useState<AdmissionPdf[]>([]);

const fetchPdfs = async () => {
  console.log("📡 Fetching PDFs from:", `${BACKEND_URL}/api/pdfs`);

  try {
    const res = await axios.get(`${BACKEND_URL}/api/pdfs`);

    console.log("📥 Backend returned PDFs:", res.data); 

    setPdfs(res.data);
  } catch (err) {
    console.error("❌ Error fetching PDFs:", err);
  }
};

  useEffect(() => {
    fetchPdfs();
  }, []);

// Debug helper
const getPdfUrl = (id: string) => {
  const pdf = pdfs.find((p) => p.id === id);

  console.log(`🔍 Looking for PDF id '${id}' → Found:`, pdf);

  if (!pdf) return "";

  const url = `${BACKEND_URL}${pdf.url || pdf.filePath}`;
  console.log("📄 Built PDF URL:", url);

  return url;
};

  return (
    <div className="w-full bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc]">
      <Navbar />

      {/* Header */}
      <section className="pt-48 pb-20 px-6 md:px-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#EAC30E] mb-6 tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Admissions
        </h1>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          We welcome you to join the Hopefield family — where every child is nurtured, challenged, and inspired to become their best self.
        </p>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Apply for Admission
        </h2>

        <motion.div className="max-w-4xl mx-auto bg-[#FF3B3B] text-white p-10 rounded-2xl shadow-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Application Form</h3>
          <p className="text-lg mb-6">
            Download and complete the application form. Submit it along with supporting documents to the school office.
          </p>
          <a href={getPdfUrl("applicationForm")} download className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
            Download Form
          </a>
        </motion.div>

        {/* PDF Preview */}
        {getPdfUrl("applicationForm") && (
          <div className="px-6 md:px-16 pt-10">
            <PdfPreview fileUrl={getPdfUrl("applicationForm")} />
          </div>
        )}
      </section>

      {/* Handbook */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Handbook & Rules
        </h2>

        <motion.div className="max-w-4xl mx-auto bg-[#FF3B3B] text-white p-10 rounded-2xl shadow-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">School Handbook</h3>
          <p className="text-lg mb-6">
            Learn more about the expectations, culture, and standards of Hopefield — everything you need to know as a parent or student.
          </p>
          <a href={getPdfUrl("handbook")} download className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
            Download Handbook
          </a>
        </motion.div>

        {getPdfUrl("handbook") && (
          <div className="px-6 md:px-16 pt-10">
            <PdfPreview fileUrl={getPdfUrl("handbook")} />
          </div>
        )}
      </section>

      {/* School Magazine */}
      <section className="py-20 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-12 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
          School Magazine - Hope on The Horizon
        </h2>

        <motion.div className="max-w-4xl mx-auto bg-[#FF3B3B] text-white p-10 rounded-2xl shadow-xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">School Magazine</h3>
          <p className="text-lg mb-6">
            Check out the school magazine/newsletter highlighting our students' achievements.
          </p>
          <a href={getPdfUrl("magazine")} download className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
            Download Magazine
          </a>
        </motion.div>

        {getPdfUrl("magazine") && (
          <div className="px-6 md:px-16 pt-10">
            <PdfPreview fileUrl={getPdfUrl("magazine")} />
          </div>
        )}
      </section>

      {/* Extracurriculars */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <Extracurriculars onCampus={onCampusActivities} offCampus={offCampusActivities} />
      </section>
    </div>
  );
}
