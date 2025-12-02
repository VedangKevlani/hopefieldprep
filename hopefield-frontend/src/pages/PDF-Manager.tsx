import { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function PdfManager() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("admin")) window.location.href = "/admin/login";
    fetchPdfs();
  }, []);

  async function fetchPdfs() {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/pdfs`);
    setPdfs(res.data);
  }

  async function uploadPdf() {
    if (!file) return;
    const form = new FormData();
    form.append("pdf", file);

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/pdfs/upload`, form);
    setFile(null);
    fetchPdfs();
  }

  async function replacePdf(id: string) {
    if (!file) return alert("Select a file first");
    const form = new FormData();
    form.append("pdf", file);
    form.append("replaceId", id);

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/pdfs/replace`, form);
    setFile(null);
    fetchPdfs();
    setPreviewUrl(null);
  }

  async function deletePdf(id: string) {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/pdfs/${id}`);
    fetchPdfs();
    setPreviewUrl(null);
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">PDF Manager</h1>

      <div className="mb-4 flex items-center gap-3">
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <button onClick={uploadPdf} className="bg-green-600 text-white px-4 py-2 rounded">Upload PDF</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {pdfs.map((pdf) => (
          <div key={pdf.id} className="border p-3 rounded shadow flex flex-col items-center">
            <a href={pdf.url} target="_blank" className="text-blue-600 underline mb-2">{pdf.name}</a>
            
            <button className="bg-yellow-600 text-white px-3 py-1 rounded mb-2" onClick={() => setPreviewUrl(pdf.url)}>
              Preview
            </button>

            <button className="bg-red-600 text-white px-3 py-1 rounded mb-2" onClick={() => deletePdf(pdf.id)}>
              Delete
            </button>

            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => replacePdf(pdf.id)}>
              Replace
            </button>
          </div>
        ))}
      </div>

      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-4 rounded max-w-4xl max-h-[90vh] overflow-auto relative">
            <button onClick={() => setPreviewUrl(null)} className="absolute top-2 right-2 text-red-600 font-bold">X</button>
            <Document file={previewUrl}>
              <Page pageNumber={1} scale={1.2} />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
}
