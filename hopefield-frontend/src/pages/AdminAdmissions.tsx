// src/pages/AdminAdmissionsPage.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import PdfPreview from "../components/PdfPreview";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type PdfCategory = "Application Form" | "School Handbook" | "School Magazine";

interface PdfItem {
  category: PdfCategory;
  name: string; // filename only
  url: string;  // full URL from backend
}

export default function AdminAdmissionsPage() {
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PdfCategory | "">("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // ------------------------------
  // Fetch Current PDFs
  // ------------------------------
  const fetchPdfs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/admissions/pdfs`);

      const list: PdfItem[] = [
        {
          category: "Application Form",
          name: res.data.applicationForm ? res.data.applicationForm.split("/").pop() : "",
          url: res.data.applicationForm ? BACKEND_URL + res.data.applicationForm : "",
        },
        {
          category: "School Handbook",
          name: res.data.handbook ? res.data.handbook.split("/").pop() : "",
          url: res.data.handbook ? BACKEND_URL + res.data.handbook : "",
        },
        {
          category: "School Magazine",
          name: res.data.magazine ? res.data.magazine.split("/").pop() : "",
          url: res.data.magazine ? BACKEND_URL + res.data.magazine : "",
        },
      ];

      setPdfs(list);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  // ------------------------------
  // File Input
  // ------------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // ------------------------------
  // Upload / Replace PDF
  // ------------------------------
  const handleUpload = async () => {
    if (!selectedCategory || !selectedFile)
      return alert("Select a category and choose a file first");

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("category", selectedCategory);

    try {
      setUploading(true);

      await axios.post(`${BACKEND_URL}/api/admissions/pdfs/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("PDF uploaded successfully!");
      setSelectedFile(null);
      setPreviewUrl(null);
      setSelectedCategory("");

      fetchPdfs();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ------------------------------
  // Replace Button (pre-fill preview)
  // ------------------------------
  const handleReplace = (pdf: PdfItem) => {
    setSelectedCategory(pdf.category);
    setSelectedFile(null);
    setPreviewUrl(pdf.url); // show backend PDF
  };

  // ------------------------------
  // Delete PDF
  // ------------------------------
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

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <div className="p-10 min-h-screen bg-[#fff5e6]">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#EAC30E]">
        Admin – Manage Admissions PDFs
      </h1>

      {/* Upload Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-12 max-w-2xl mx-auto">
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

          <input type="file" accept="application/pdf" onChange={handleFileChange} />

          {previewUrl && (
            <div className="border p-3 rounded-xl bg-white max-h-80 overflow-auto">
              <PdfPreview fileUrl={previewUrl} />
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedCategory || !selectedFile || uploading}
            className={`px-4 py-2 rounded text-white ${
              uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>
      </div>

      {/* List of PDFs */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {pdfs.map((pdf) => (
          <div
            key={pdf.category}
            className="bg-white p-6 shadow rounded-xl flex flex-col items-center"
          >
            <p className="font-semibold mb-1">{pdf.category}</p>
            <p className="text-sm mb-3">{pdf.name || "No file uploaded"}</p>

            <div className="flex gap-2">
              {pdf.url ? (
                <>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => setPreviewUrl(pdf.url)}
                  >
                    Preview
                  </button>

                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
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
                </>
              ) : (
                <p className="text-gray-500 text-sm">No PDF</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Preview */}
      {previewUrl && (
        <div className="fixed right-0 top-0 w-[450px] h-full bg-white shadow-xl p-4 overflow-auto">
          <h3 className="text-lg font-bold mb-3">Preview</h3>
          <PdfPreview fileUrl={previewUrl} />
        </div>
      )}
    </div>
  );
}
