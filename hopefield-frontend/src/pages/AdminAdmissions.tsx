import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface AdmissionsPdfs {
  applicationForm: string | null;
  handbook: string | null;
  magazine: string | null;
}

export default function AdminAdmissions() {
  const [pdfs, setPdfs] = useState<AdmissionsPdfs>({
    applicationForm: null,
    handbook: null,
    magazine: null,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadType, setUploadType] = useState<keyof AdmissionsPdfs | null>(
    null
  );

  useEffect(() => {
    let isMounted = true;

    const fetchPdfs = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/admissions/pdfs`);
        if (isMounted) setPdfs(res.data);
      } catch (err) {
        console.error("Error fetching admissions PDFs", err);
      }
    };

    fetchPdfs();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] ?? null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadType) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);

      // backend returns: "/uploads/name.pdf"
      const res = await axios.post(
        `${BACKEND_URL}/api/admissions/upload?type=${uploadType}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setPdfs((prev) => ({
        ...prev,
        [uploadType]: res.data, // because response is string path
      }));

      setSelectedFile(null);
      setUploadType(null);
      alert("PDF uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Check server logs.");
    } finally {
      setUploading(false);
    }
  };

  const getPreviewUrl = (filePath: string | null, fallback: string) => {
    return filePath ? `${BACKEND_URL}${filePath}` : fallback;
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Admissions — PDF Manager</h1>

      {/* Application Form */}
      <PdfUploadCard
        title="Application Form"
        currentUrl={getPreviewUrl(
          pdfs.applicationForm,
          "/downloads/Hopefield-Prep-Application-form.pdf"
        )}
        onSelectFile={(file) => {
          setSelectedFile(file);
          setUploadType("applicationForm");
        }}
        onUpload={handleUpload}
        uploading={uploading}
        disabled={uploadType !== "applicationForm"}
      />

      {/* Handbook */}
      <PdfUploadCard
        title="Handbook & School Rules"
        currentUrl={getPreviewUrl(
          pdfs.handbook,
          "/downloads/handbook-rules-revised-2024.pdf"
        )}
        onSelectFile={(file) => {
          setSelectedFile(file);
          setUploadType("handbook");
        }}
        onUpload={handleUpload}
        uploading={uploading}
        disabled={uploadType !== "handbook"}
      />

      {/* Magazine */}
      <PdfUploadCard
        title="School Magazine"
        currentUrl={getPreviewUrl(
          pdfs.magazine,
          "/downloads/Hope-on-the-Horizon-Vol1.pdf"
        )}
        onSelectFile={(file) => {
          setSelectedFile(file);
          setUploadType("magazine");
        }}
        onUpload={handleUpload}
        uploading={uploading}
        disabled={uploadType !== "magazine"}
      />
    </div>
  );
}

interface PdfCardProps {
  title: string;
  currentUrl: string;
  onSelectFile: (file: File) => void;
  onUpload: () => void;
  uploading: boolean;
  disabled: boolean;
}

function PdfUploadCard({
  title,
  currentUrl,
  onSelectFile,
  onUpload,
  uploading,
  disabled,
}: PdfCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-8 mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <iframe
        src={currentUrl}
        className="w-full h-72 mb-4 border rounded"
        title={`Preview - ${title}`}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => e.target.files && onSelectFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        disabled={disabled || uploading}
        onClick={onUpload}
        className={`px-4 py-2 rounded text-white ${
          uploading
            ? "bg-gray-500"
            : disabled
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
  );
}
