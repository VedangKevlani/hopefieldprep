// src/pages/AdminAdmissionsPage.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import PdfPreview from "../components/PdfPreview";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type PdfCategory = "Application Form" | "School Handbook" | "School Magazine";

interface PdfItem {
  name: string;
  url: string;
  category: PdfCategory;
}

export default function AdminAdmissionsPage() {
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PdfCategory | "">("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchPdfs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/admissions/pdfs`);

      const backendPdfs: PdfItem[] = [
        {
          category: "Application Form",
          name: res.data.applicationForm?.split("/").pop() ?? "",
          url: res.data.applicationForm ?? "",
        },
        {
          category: "School Handbook",
          name: res.data.handbook?.split("/").pop() ?? "",
          url: res.data.handbook ?? "",
        },
        {
          category: "School Magazine",
          name: res.data.magazine?.split("/").pop() ?? "",
          url: res.data.magazine ?? "",
        },
      ];

      setPdfs(backendPdfs);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // show upload preview ONLY here
  };

const handleUpload = async () => {
  if (!selectedFile) return alert("Select file first");

  const formData = new FormData();
  formData.append("pdf", selectedFile);

  try {
    setUploading(true);
    const res = await axios.post(`${BACKEND_URL}/api/admissions/pdfs/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("PDF uploaded successfully!");
    console.log("Cloudinary PDF URL:", res.data.fileUrl);
    setPreviewUrl(res.data.fileUrl);

  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};



  const handleReplace = (pdf: PdfItem) => {
    setSelectedCategory(pdf.category);
    setSelectedFile(null);
    setPreviewUrl(`${BACKEND_URL}${pdf.url}`);
  };

  const handleDelete = async (pdf: PdfItem) => {
    if (!confirm(`Delete ${pdf.category}?`)) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/admissions/pdfs`, {
        data: { category: pdf.category },
      });
      fetchPdfs();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-[#fff5e6]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#EAC30E]">
        Admin: Manage Admissions PDFs
      </h1>

      {/* Upload Box */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Upload / Replace PDF</h2>

        <div className="flex flex-col gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as PdfCategory)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Application Form">Application Form</option>
            <option value="School Handbook">School Handbook</option>
            <option value="School Magazine">School Magazine</option>
          </select>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />

          {/* Inline preview ONLY */}
          {previewUrl && (
            <div className="border p-2 rounded max-h-[500px] overflow-auto bg-white">
              <PdfPreview fileUrl={previewUrl} />
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedCategory || !selectedFile || uploading}
            className={`px-4 py-2 rounded text-white ${
              uploading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>
      </div>

      {/* Existing PDFs */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {pdfs.map((pdf) => (
          <div
            key={pdf.category}
            className="bg-white p-4 shadow rounded-xl text-center"
          >
            <p className="font-medium mb-1">{pdf.category}</p>
            <p className="text-sm mb-3">{pdf.name}</p>

            <div className="flex justify-center gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => setPreviewUrl(`${BACKEND_URL}${pdf.url}`)}
              >
                Preview
              </button>

              <button
                className="bg-yellow-600 text-white px-3 py-1 rounded"
                onClick={() => handleReplace(pdf)}
              >
                Replace
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(pdf)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
