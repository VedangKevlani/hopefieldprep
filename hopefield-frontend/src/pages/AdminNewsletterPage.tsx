import { useState, useEffect } from "react";
import axios from "axios";
import PdfPreview from "../components/PdfPreview";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

interface Newsletter {
  _id?: string;
  title: string;
  description: string;
  date: string;
  year: number;
  volume: string;
  fileUrl: string;
}

export default function AdminNewsletterPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [selected, setSelected] = useState<Newsletter | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    year: new Date().getFullYear(),
    volume: "",
  });

  const fetchNewsletters = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/newsletters`);
      setNewsletters(res.data || []);
    } catch (err) {
      console.error("Newsletter fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  /** Set form when editing an item */
  const handleEdit = (item: Newsletter) => {
    setSelected(item);
    setForm({
      title: item.title,
      description: item.description,
      date: item.date.substring(0, 10),
      year: item.year,
      volume: item.volume,
    });
    setPreviewUrl(item.fileUrl);
    setSelectedFile(null);
  };

  /** File input handler */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  /** Upload or update newsletter */
  const handleSave = async () => {
    if (!form.title || !form.date || !form.volume || !form.year) {
      return alert("Please fill all required fields!");
    }

    setUploading(true);

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("date", form.date);
    data.append("year", String(form.year));
    data.append("volume", form.volume);

    if (selectedFile) data.append("pdf", selectedFile);

    try {
      if (selected?._id) {
        // UPDATE
        await axios.put(
          `${BACKEND_URL}/api/newsletters/${selected._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Newsletter updated!");
      } else {
        // CREATE
        await axios.post(
          `${BACKEND_URL}/api/newsletters/upload`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Newsletter uploaded!");
      }

      setSelected(null);
      setSelectedFile(null);
      setPreviewUrl(null);

      setForm({
        title: "",
        description: "",
        date: "",
        year: new Date().getFullYear(),
        volume: "",
      });

      fetchNewsletters();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error saving newsletter");
    } finally {
      setUploading(false);
    }
  };

  /** Delete newsletter */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this newsletter?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/newsletters/${id}`);
      fetchNewsletters();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete newsletter");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-[#fff5e6]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1E792C]">
        Admin: Manage Newsletters
      </h1>

      {/* Upload / Edit box */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {selected ? "Edit Newsletter" : "Upload New Newsletter"}
        </h2>

        <div className="flex flex-col gap-4">

          {/* Title */}
          <input
            type="text"
            placeholder="Newsletter Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          {/* Description */}
          <textarea
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          {/* Date */}
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border px-3 py-2 rounded"
          />

          {/* Year */}
          <input
            type="number"
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: Number(e.target.value) })
            }
            className="border px-3 py-2 rounded"
          />

          {/* Volume */}
          <input
            type="text"
            placeholder="Volume (e.g., Vol1)"
            value={form.volume}
            onChange={(e) =>
              setForm({ ...form, volume: e.target.value })
            }
            className="border px-3 py-2 rounded"
          />

          {/* File */}
          <input type="file" accept="application/pdf" onChange={handleFileChange} />

          {previewUrl && (
            <div className="border p-2 rounded max-h-[500px] overflow-auto bg-white">
              <PdfPreview fileUrl={previewUrl} />
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={uploading}
            className={`px-4 py-2 rounded text-white ${
              uploading ? "bg-gray-500" : "bg-[#1E792C] hover:bg-[#145820]"
            }`}
          >
            {uploading ? "Saving…" : selected ? "Update Newsletter" : "Upload Newsletter"}
          </button>
        </div>
      </div>

      {/* List existing newsletters */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {newsletters.map((n) => (
          <div key={n._id} className="bg-white p-5 shadow rounded-xl">
            <p className="font-bold text-[#1E792C]">{n.title}</p>
            <p className="text-sm text-gray-600 mb-2">
              {n.year} • {n.volume} • {new Date(n.date).toLocaleDateString()}
            </p>

            <div className="flex gap-3">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => setPreviewUrl(n.fileUrl)}
              >
                Preview
              </button>

              <button
                className="bg-yellow-600 text-white px-3 py-1 rounded"
                onClick={() => handleEdit(n)}
              >
                Edit
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(n._id!)}
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
