import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface PdfFile {
  id: string;
  title: string;
  filePath: string;
}

export default function AdminAdmissionsPage() {
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [selectedPdfId, setSelectedPdfId] = useState<string>("");

  const fetchPdfs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/admissions/pdf`);
      setPdfs(res.data);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
    }
  };

  useEffect(() => { fetchPdfs(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileInput(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!fileInput || !selectedPdfId) return alert("Select a file and a PDF to update");

    const formData = new FormData();
    formData.append("pdf", fileInput);

    try {
      setUploading(true);
      const res = await axios.put(`${BACKEND_URL}/api/admissions/pdf/${selectedPdfId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("PDF updated!");
      setFileInput(null);
      fetchPdfs();
    } catch (err) {
      console.error(err);
      alert("Error uploading PDF");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-16 bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] min-h-screen">
      <h2 className="text-3xl font-extrabold text-[#EAC30E] mb-8">Admin: Update Admissions PDFs</h2>

      <div className="mb-6">
        <select
          className="border px-3 py-2 rounded w-full md:w-1/3"
          value={selectedPdfId}
          onChange={(e) => setSelectedPdfId(e.target.value)}
        >
          <option value="">Select PDF</option>
          {pdfs.map(pdf => <option key={pdf.id} value={pdf.id}>{pdf.title}</option>)}
        </select>
      </div>

      <div className="mb-6">
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="border px-3 py-2 rounded w-full md:w-1/3" />
      </div>

      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-[#FF3B3B] text-white rounded font-semibold"
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Preview PDFs</h3>
        {pdfs.map(pdf => (
          <div key={pdf.id} className="mb-6">
            <p className="font-semibold">{pdf.title}</p>
            <iframe
              src={`${BACKEND_URL}${pdf.filePath}`}
              width="100%"
              height="400px"
              title={pdf.title}
              className="border"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
