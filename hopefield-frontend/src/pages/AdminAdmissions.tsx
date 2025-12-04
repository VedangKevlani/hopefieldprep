// src/pages/AdminAdmissions.tsx
import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type PdfCategory = "applicationForm" | "handbook" | "magazine";

interface PdfItem {
  name: string; // filename
  url: string;  // e.g., /uploads/file.pdf
}

interface PdfFormState {
  file: File | null;
  preview: string;
}

export default function AdminAdmissions() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [pdfs, setPdfs] = useState<Record<PdfCategory, PdfItem | null>>({
    applicationForm: null,
    handbook: null,
    magazine: null,
  });

  const [selectedPdfCategory, setSelectedPdfCategory] = useState<PdfCategory | null>(null);
  const [form, setForm] = useState<PdfFormState>({ file: null, preview: "" });
  const [uploading, setUploading] = useState(false);

  // --- AUTH ---
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, { password: passwordInput });
      if (res.data.success) {
        setIsAuthorized(true);
        setAdminPassword(passwordInput);
        setPasswordInput("");
        fetchPdfs();
      } else {
        alert("Incorrect password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error verifying password");
    }
  };

  // --- FETCH EXISTING PDFs ---
  const fetchPdfs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/admissions/pdfs`);
      // Backend should return: { applicationForm: PdfItem | null, handbook: PdfItem | null, magazine: PdfItem | null }
      setPdfs(res.data || {
        applicationForm: null,
        handbook: null,
        magazine: null,
      });
    } catch (err) {
      console.error("Error fetching PDFs:", err);
    }
  };

  // --- HANDLE FILE SELECTION ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setForm({ file, preview: URL.createObjectURL(file) });
  };

  // --- UPLOAD/REPLACE PDF ---
  const handleUpload = async () => {
    if (!form.file || !selectedPdfCategory) return alert("Select a file and category first");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("adminPassword", adminPassword);

    try {
      await axios.post(`${BACKEND_URL}/api/admissions/upload?type=${selectedPdfCategory}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("PDF uploaded successfully!");
      setForm({ file: null, preview: "" });
      setSelectedPdfCategory(null);
      fetchPdfs();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload PDF");
    } finally {
      setUploading(false);
    }
  };

  // --- DELETE PDF ---
  const handleDelete = async (category: PdfCategory) => {
    if (!confirm(`Delete ${category}?`)) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/admissions/delete?type=${category}`, {
        data: { adminPassword },
      });
      fetchPdfs();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete PDF");
    }
  };

  // --- LOGIN VIEW ---
  if (!isAuthorized) {
    return (
      <div className="p-16 bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-extrabold text-[#EAC30E] mb-6">Admin Login</h2>
        <input
          type="password"
          placeholder="Admin Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3 mb-4"
        />
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-[#FF3B3B] text-white rounded font-semibold"
        >
          Login
        </button>
      </div>
    );
  }

  // --- AUTHORIZED VIEW ---
  const categories: Record<PdfCategory, string> = {
    applicationForm: "Application Form",
    handbook: "School Handbook",
    magazine: "School Magazine",
  };

  return (
    <div className="p-6 md:p-16 bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] min-h-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-8 text-center">
        Admin: Manage Admissions PDFs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {Object.entries(categories).map(([key, label]) => {
          const category = key as PdfCategory;
          const pdf = pdfs[category];
          return (
            <div key={key} className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
              <h3 className="text-xl font-bold mb-3">{label}</h3>
              {pdf?.url ? (
                <iframe
                  src={`${BACKEND_URL}${pdf.url}`}
                  title={pdf.name}
                  className="w-full h-48 border rounded mb-3"
                />
              ) : (
                <p className="text-gray-500 mb-3">No PDF uploaded yet</p>
              )}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => handleDelete(category)}
                  className="px-3 py-1 bg-red-500 text-white rounded font-semibold"
                >
                  Delete
                </button>
              </div>
              <button
                onClick={() => setSelectedPdfCategory(category)}
                className={`px-3 py-1 rounded font-semibold ${selectedPdfCategory === category ? "bg-blue-600 text-white" : "bg-gray-300"}`}
              >
                {selectedPdfCategory === category ? "Selected" : "Select to Replace"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Upload form */}
      {selectedPdfCategory && (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
          <h3 className="text-xl font-bold mb-4">
            Upload / Replace: {categories[selectedPdfCategory]}
          </h3>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="border px-3 py-2 rounded w-full mb-4"
          />
          {form.preview && (
            <iframe
              src={form.preview}
              title="Preview"
              className="w-full h-48 border rounded mb-4"
            />
          )}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`px-6 py-2 rounded font-semibold ${uploading ? "bg-gray-400" : "bg-[#FF3B3B] text-white"}`}
          >
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>
      )}
    </div>
  );
}
