import { useState, useEffect } from "react";
import axios from "axios";
import PdfPreview from "../components/PdfPreview";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface AdmissionPdf {
  id: string;
  title: string;
  filePath: string;
}

const DEFAULT_PDFS: AdmissionPdf[] = [
  { id: "applicationForm", title: "Application Form", filePath: "/downloads/Hopefield-Prep-Application-form.pdf" },
  { id: "handbook", title: "School Handbook", filePath: "/downloads/handbook-rules-revised-2024.pdf" },
  { id: "magazine", title: "School Magazine", filePath: "/downloads/Hope-on-the-Horizon-Vol1.pdf" },
];

export default function AdminAdmissions() {
  const [pdfs, setPdfs] = useState<AdmissionPdf[]>(DEFAULT_PDFS);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({
    applicationForm: null,
    handbook: null,
    magazine: null,
  });
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string | null }>({
    applicationForm: null,
    handbook: null,
    magazine: null,
  });
  const [loading, setLoading] = useState(false);

  // Fetch updated PDFs from backend if available
  const fetchPdfs = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/admissions/pdf`);
      if (res.data && res.data.length > 0) {
        setPdfs(res.data);
      }
    } catch (err) {
      console.error("Error fetching PDFs:", err);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  // Cleanup object URLs on unmount or when a new file is selected
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => {
        if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  const handleFileChange = (id: string, file: File | null) => {
    // Revoke previous object URL for this PDF
    if (previewUrls[id] && previewUrls[id].startsWith("blob:")) {
      URL.revokeObjectURL(previewUrls[id]!);
    }

    const newPreviewUrl = file ? URL.createObjectURL(file) : null;
    setSelectedFiles((prev) => ({ ...prev, [id]: file }));
    setPreviewUrls((prev) => ({ ...prev, [id]: newPreviewUrl }));
  };

  const handleUpload = async (id: string) => {
    const file = selectedFiles[id];
    if (!file) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/api/admissions/pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      handleFileChange(id, null); // clear selected file
      fetchPdfs(); // refresh list from backend
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin: Update Admissions PDFs</h1>

      {["applicationForm", "handbook", "magazine"].map((id) => {
        const pdf = pdfs.find((p) => p.id === id);
        const selectedFile = selectedFiles[id];
        const previewUrl = selectedFile ? previewUrls[id] : pdf ? `${BACKEND_URL}${pdf.filePath}` : null;

        return (
          <div key={id} className="mb-12 border p-6 rounded-xl shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-2">{pdf?.title || id}</h2>

            {/* File input */}
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(id, e.target.files?.[0] || null)}
              className="mb-4"
            />

            {/* Live PDF Preview */}
            {previewUrl && (
              <div className="mb-4">
                <PdfPreview fileUrl={previewUrl} />
              </div>
            )}

            <button
              onClick={() => handleUpload(id)}
              disabled={loading}
              className="bg-[#FF3B3B] text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition"
            >
              {loading ? "Uploading..." : "Upload New PDF"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
