// src/pages/AdminAdmissions.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import PdfPreview from "../components/PdfPreview";

export default function AdminAdmissions() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [allPdfs, setAllPdfs] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const backendBase = "https://hopefield-backend.onrender.com";

  // Fetch existing PDFs from backend
  const fetchPdfs = async () => {
    try {
      const res = await axios.get(`${backendBase}/api/admission/pdfs`);
      setAllPdfs(res.data || []);
    } catch (err) {
      console.error("❌ Failed to load PDFs:", err);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  // Upload PDF
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setUploading(true);
      const res = await axios.post(`${backendBase}/api/admission/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchPdfs(); // refresh list
      setSelectedPdf(`${backendBase}/uploads/${res.data.filename}`);
    } catch (err) {
      console.error("❌ Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#EAC30E] mb-10">
        Admissions Management
      </h1>

      {/* ============================================================
          PDF MANAGER SECTION
      ============================================================ */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Manage Admission PDFs</h2>

        {/* Upload */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Upload New PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="block w-full border px-3 py-2 rounded"
          />
          {uploading && <p className="text-blue-500 mt-2">Uploading…</p>}
        </div>

        {/* PDF List */}
        <h3 className="text-xl font-semibold mb-2">Available PDFs</h3>
        {allPdfs.length === 0 ? (
          <p className="text-gray-500">No PDFs uploaded yet.</p>
        ) : (
          <div className="space-y-2">
            {allPdfs.map((file) => (
              <div
                key={file}
                className="flex items-center justify-between p-3 border rounded"
              >
                <span>{file}</span>
                <button
                  onClick={() =>
                    setSelectedPdf(`${backendBase}/uploads/${file}`)
                  }
                  className="px-3 py-1 bg-[#EAC30E] rounded font-semibold"
                >
                  Preview
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================
          PDF PREVIEWER SECTION
      ============================================================ */}
      {selectedPdf && (
        <div className="mb-16">
          <PdfPreview
            fileUrl={selectedPdf}
            className="border rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* ============================================================
          MAIN ADMISSIONS FORM
      ============================================================ */}
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-6">Admissions Form</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">Student Name</label>
            <input className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block mb-1">Parent Name</label>
            <input className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block mb-1">Contact Email</label>
            <input type="email" className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <input className="w-full border rounded px-3 py-2" />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block mb-1">Message</label>
            <textarea className="w-full border rounded px-3 py-2 min-h-[120px]" />
          </div>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 py-3 bg-[#FF3B3B] text-white font-semibold rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
