// src/pages/AdminStaffPage.tsx
import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface StaffMember {
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
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [adminPassword, setAdminPassword] = useState("");
  const [form, setForm] = useState<StaffMember>({ name: "", email: "", photo: "", group: "K1" });
  const [editName, setEditName] = useState(""); // track which staff we're editing
  const [uploading, setUploading] = useState(false);

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/staff`);
      setStaff(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Handle file upload
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
    try {
      if (editName) {
        await axios.put(`${BACKEND_URL}/api/staff`, {
          ...form,
          name: editName,
          adminPassword,
        });
        setEditName("");
      } else {
        await axios.post(`${BACKEND_URL}/api/staff`, {
          ...form,
          adminPassword,
        });
      }
      setForm({ name: "", email: "", photo: "", group: "K1" });
      fetchStaff();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error saving staff");
    }
  };

  const handleEdit = (member: StaffMember) => {
    setForm(member);
    setEditName(member.name);
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/staff`, {
        data: { name, adminPassword },
      });
      fetchStaff();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting staff");
    }
  };

  return (
    <div className="p-6 md:p-16 bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] min-h-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-8 text-center">
        Admin: Manage Staff
      </h2>

      <div className="mb-6">
        <input
          type="password"
          placeholder="Admin Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-12">
        <h3 className="text-xl font-bold mb-4">{editName ? "Edit Staff" : "Add Staff"}</h3>
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
          {editName ? "Update Staff" : "Add Staff"}
        </button>
        {editName && (
          <button
            onClick={() => {
              setEditName("");
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
        {staff.map((member: StaffMember) => (
          <div key={member.name} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
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
                onClick={() => handleDelete(member.name)}
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
