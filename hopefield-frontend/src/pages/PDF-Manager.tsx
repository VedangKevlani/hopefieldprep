import { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import Navbar from "../components/Navbar";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function PDFManager() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("admin")) window.location.href = "/admin/login";
    fetchPdfs();
  }, []);

  async function fetchPdfs() {
    console.log("📡 Fetching PDFs from:", `${BACKEND_URL}/api/pdfs`);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/pdfs`);
      console.log("📥 PDFs received:", res.data);
      setPdfs(res.data);
    } catch (e) {
      console.error("❌ Error loading PDFs:", e);
    }
  }

  async function uploadPdf() {
    if (!file) return;

    const form = new FormData();
    form.append("pdf", file);

    await axios.post(`${BACKEND_URL}/api/pdfs/upload`, form);
    setFile(null);
    fetchPdfs();
  }

  async function replacePdf(name: string) {
    if (!file) return alert("Choose a replacement file first");

    const form = new FormData();
    form.append("pdf", file);
    form.append("replaceId", name);

    await axios.post(`${BACKEND_URL}/api/pdfs/replace`, form);
    setFile(null);
    setPreviewUrl(null);
    fetchPdfs();
  }

  async function deletePdf(name: string) {
    await axios.delete(`${BACKEND_URL}/api/pdfs/${name}`);
    setPreviewUrl(null);
    fetchPdfs();
  }

  return (
    <div className="min-h-screen bg-[#fff5e6]">
      <Navbar />

      <div className="pt-40 max-w-5xl mx-auto px-6 pb-20">
        <h1 className="text-4xl font-bold text-[#EAC30E] mb-10">
          Admissions PDF Manager
        </h1>

        {/* Upload Box */}
        <div className="bg-white p-6 shadow rounded-xl mb-10">
          <h2 className="text-xl font-semibold mb-3">Upload a New PDF</h2>

          <div className="flex gap-4 items-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={uploadPdf}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Existing PDFs */}
        <div className="grid md:grid-cols-2 gap-8">
          {pdfs.map((pdf) => (
            <div
              key={pdf.name}
              className="bg-white p-5 shadow rounded-xl flex flex-col items-center"
            >
              <p className="font-medium mb-3">{pdf.name}</p>

              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
                onClick={() =>
                  setPreviewUrl(`${BACKEND_URL}${pdf.url}`)
                }
              >
                Preview
              </button>

              <button
                className="bg-yellow-600 text-white px-3 py-1 rounded mb-3"
                onClick={() => replacePdf(pdf.name)}
              >
                Replace
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => deletePdf(pdf.name)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Preview Modal */}
        {previewUrl && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white p-4 rounded max-w-4xl max-h-[90vh] overflow-auto relative">
              <button
                onClick={() => setPreviewUrl(null)}
                className="absolute top-2 right-3 text-xl font-bold text-red-600"
              >
                ✕
              </button>

              <Document file={previewUrl}>
                <Page pageNumber={1} scale={1.2} />
              </Document>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
