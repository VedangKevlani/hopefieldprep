// src/pages/Admissions.tsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PdfPreview from "../components/PdfPreview";
import { motion } from "framer-motion";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

type BackendPdf = {
  name: string; // category key
  url: string;  // backend URL
};

export default function Admissions() {
  const [pdfs, setPdfs] = useState<BackendPdf[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState<string>("applicationForm");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPdfs();
  }, []);

  async function fetchPdfs() {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/admissions/pdfs`);
      const obj = res.data || {};
      setPdfs([
        { name: "applicationForm", url: obj.applicationForm || "" },
        { name: "handbook", url: obj.handbook || "" },
        { name: "magazine", url: obj.magazine || "" },
      ]);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
      setPdfs([]);
    } finally {
      setLoading(false);
    }
  }

  const getPdf = (category: string): BackendPdf | null =>
    pdfs.find((p) => p.name === category) || null;

  const buildPdfUrl = (pdf: BackendPdf | null, fallbackFilename: string) => {
    const url = pdf?.url || "";
    if (url) {
      if (/^https?:\/\//i.test(url)) return url;
      return BACKEND_URL ? `${BACKEND_URL}${url}` : url;
    }
    return `/downloads/${fallbackFilename}`;
  };

  const downloadUrl = (url: string) => window.open(url, "_blank");

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first!");
    setUploading(true);
    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("category", uploadCategory);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/admissions/pdfs/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload successful:", res.data);
      alert("Upload successful!");
      setSelectedFile(null);
      fetchPdfs(); // refresh PDF list
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const applicationPdf = getPdf("applicationForm");
  const handbookPdf = getPdf("handbook");
  const magazinePdf = getPdf("magazine");

  return (
    <div className="w-full bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-40 pb-10 px-6 md:px-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#EAC30E] mb-4">Admissions</h1>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg md:text-xl leading-relaxed">
          We welcome you to join the Hopefield family — where every child is nurtured,
          challenged, and inspired to become their best self. Below you can preview and
          download our key admissions documents.
        </p>
      </section>

      {/* ===== APPLICATION FORM ===== */}
      <section className="py-12 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-8 text-center">Apply for Admission</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-[#1E792C] text-white p-8 rounded-2xl shadow-xl text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Application Form</h3>
          <p className="text-lg mb-4">
            Download and complete the application form. Submit it along with supporting documents to the school office.
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => downloadUrl(buildPdfUrl(applicationPdf, "Hopefield-Prep-Application-form.pdf"))}
              className="bg-white text-black px-5 py-3 rounded-full font-semibold shadow"
            >
              Download Form
            </button>
            <button
              onClick={() => setPreviewUrl(buildPdfUrl(applicationPdf, "Hopefield-Prep-Application-form.pdf"))}
              className="bg-white/20 text-white px-5 py-3 rounded-full font-semibold border border-white/30"
            >
              Preview
            </button>
          </div>
        </motion.div>
      </section>

      {/* ===== HANDBOOK ===== */}
      <section className="py-12 px-6 md:px-16 bg-white/60">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-8 text-center">Handbook & Rules</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-4xl mx-auto bg-[#1E792C] text-white p-8 rounded-2xl shadow-xl text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">School Handbook</h3>
          <p className="text-lg mb-4">Learn the policies, expectations and guidelines for parents and students.</p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => downloadUrl(buildPdfUrl(handbookPdf, "handbook-rules-revised-2024.pdf"))}
              className="bg-white text-black px-5 py-3 rounded-full font-semibold shadow"
            >
              Download Handbook
            </button>
            <button
              onClick={() => setPreviewUrl(buildPdfUrl(handbookPdf, "handbook-rules-revised-2024.pdf"))}
              className="bg-white/20 text-white px-5 py-3 rounded-full font-semibold border border-white/30"
            >
              Preview
            </button>
          </div>
        </motion.div>
      </section>

      {/* ===== MAGAZINE ===== */}
      <section className="py-12 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-8 text-center">School Magazine - Hope on The Horizon</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto bg-[#1E792C] text-white p-8 rounded-2xl shadow-xl text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">School Magazine</h3>
          <p className="text-lg mb-4">Read the highlights, student work and school moments from our magazine.</p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => downloadUrl(buildPdfUrl(magazinePdf, "Hope-on-the-Horizon-Vol1.pdf"))}
              className="bg-white text-black px-5 py-3 rounded-full font-semibold shadow"
            >
              Download Magazine
            </button>
            <button
              onClick={() => setPreviewUrl(buildPdfUrl(magazinePdf, "Hope-on-the-Horizon-Vol1.pdf"))}
              className="bg-white/20 text-white px-5 py-3 rounded-full font-semibold border border-white/30"
            >
              Preview
            </button>
          </div>
        </motion.div>
      </section>

      {/* ===== PDF PREVIEW MODAL ===== */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl relative w-full max-w-5xl max-h-[90vh] overflow-auto">
            <button onClick={() => setPreviewUrl(null)} className="absolute top-4 right-4 text-xl font-bold text-red-600 z-10">✕</button>
            <div className="p-6">
              <PdfPreview fileUrl={previewUrl} />
            </div>
          </div>
        </div>
      )}

      {/* ===== DEBUG / LOADER ===== */}
      <div className="fixed bottom-6 right-6 bg-white/90 text-sm text-gray-800 px-4 py-2 rounded shadow">
        <div className="font-semibold text-sm text-[#EAC30E]">Admissions</div>
        <div className="text-xs">{loading ? "Loading PDFs…" : `${pdfs.length} PDF(s) found`}</div>
      </div>
    </div>
  );
}
