// src/pages/AdminStaffPage.tsx
import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface StaffMember {
  _id?: string;
  name: string;
  email?: string;
  photo?: string;
  group: string;
}

const STAFF_GROUPS = [
  "Administration",
  "K1",
  "K2",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Special Subjects",
  "Ancillary",
];

export default function AdminStaffPage() {
  const [adminVerified, setAdminVerified] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [form, setForm] = useState<StaffMember>({ name: "", email: "", photo: "", group: "K1" });
  const [editId, setEditId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch staff from backend
  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/staff`);
      setStaff(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (adminVerified) fetchStaff();
  }, [adminVerified]);

  const verifyAdmin = () => {
    if (!adminPassword) return alert("Enter admin password");
    // You can optionally verify password against backend if desired
    setAdminVerified(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/staff/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, photo: res.data.filePath });
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.group) return alert("Name and group are required");
    try {
      if (editId) {
        // Edit existing
        await axios.put(`${BACKEND_URL}/api/staff`, {
          ...form,
          _id: editId,
          adminPassword,
        });
        setEditId(null);
      } else {
        // Add new
        await axios.post(`${BACKEND_URL}/api/staff`, { ...form, adminPassword });
      }
      setForm({ name: "", email: "", photo: "", group: "K1" });
      fetchStaff();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error saving staff");
    }
  };

  const handleEdit = (member: StaffMember) => {
    setForm(member);
    setEditId(member._id || null);
  };

  const handleDelete = async (_id?: string) => {
    if (!_id) return;
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/staff`, {
        data: { _id, adminPassword },
      });
      fetchStaff();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting staff");
    }
  };

  if (!adminVerified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc]">
        <h2 className="text-3xl font-extrabold text-[#EAC30E] mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Admin Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="border px-3 py-2 rounded mb-4"
        />
        <button
          onClick={verifyAdmin}
          className="px-6 py-2 bg-[#FF3B3B] text-white rounded font-semibold"
        >
          Verify
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-16 bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] min-h-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-8 text-center">
        Admin: Manage Staff
      </h2>

      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-12">
        <h3 className="text-xl font-bold mb-4">{editId ? "Edit Staff" : "Add Staff"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border px-3 py-2 rounded w-full"
            />
            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
            {form.photo && !uploading && (
              <img
                src={form.photo}
                alt="Preview"
                className="w-24 h-24 rounded-full mt-2 object-cover"
              />
            )}
          </div>
          <select
            value={form.group}
            onChange={(e) => setForm({ ...form, group: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            {STAFF_GROUPS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-[#FF3B3B] text-white rounded font-semibold"
        >
          {editId ? "Update Staff" : "Add Staff"}
        </button>
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setForm({ name: "", email: "", photo: "", group: "K1" });
            }}
            className="mt-4 ml-4 px-6 py-2 bg-gray-400 text-white rounded font-semibold"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Staff List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <div key={member._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
            <img
              src={member.photo || "/images/default-teacher.png"}
              alt={member.name}
              className="w-24 h-24 rounded-full mb-2 object-cover"
            />
            <h4 className="font-bold">{member.name}</h4>
            <p>{member.email}</p>
            <p className="text-sm text-gray-500">{member.group}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(member)}
                className="px-3 py-1 bg-[#EAC30E] rounded font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="px-3 py-1 bg-red-500 text-white rounded font-semibold"
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
