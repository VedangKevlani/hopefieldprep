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
  "Administration", "K1", "K2", "Grade 1", "Grade 2", "Grade 3",
  "Grade 4", "Grade 5", "Grade 6", "Special Subjects", "Ancillary",
];

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loginPassword, setLoginPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState(""); // <-- STORE PASSWORD HERE
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [form, setForm] = useState<StaffMember>({ name: "", email: "", photo: "", group: "K1" });
  const [editName, setEditName] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/staff`);
      setStaff(res.data);
    } catch (err) {
      console.log("❌ Fetch staff error:", err);
    }
  };

  useEffect(() => {
    if (isAuthorized) fetchStaff();
  }, [isAuthorized]);

  const handleLogin = async () => {
    try {
      console.log("🔐 Sending login request...");
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, {
        password: loginPassword,
      });

      if (res.data.success) {
        console.log("✔ Login success");
        setAdminPassword(loginPassword); // <-- KEEP PASSWORD HERE
        setLoginPassword(""); // only clear field
        setIsAuthorized(true);
      } else {
        alert("Incorrect password");
      }
    } catch (err) {
      console.log("❌ Login error:", err);
      alert("Error verifying password");
    }
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await axios.post(`${BACKEND_URL}/api/staff/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ ...form, photo: res.data.filePath });
    } catch (err) {
      console.log("❌ Upload error:", err);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...form, adminPassword };

      console.log("📤 Sending payload:", payload);

      if (editName) {
        await axios.put(`${BACKEND_URL}/api/staff`, { ...payload, name: editName });
      } else {
        await axios.post(`${BACKEND_URL}/api/staff`, payload);
      }

      setForm({ name: "", email: "", photo: "", group: "K1" });
      setEditName("");
      fetchStaff();
    } catch (err: any) {
      console.log("❌ Save error:", err.response?.data);
      alert(err.response?.data?.message || "Error saving staff");
    }
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete ${name}?`)) return;

    try {
      console.log("🗑 Sending delete request for", name);
      await axios.delete(`${BACKEND_URL}/api/staff`, {
        data: { name, adminPassword },
      });

      fetchStaff();
    } catch (err: any) {
      console.log("❌ Delete error:", err.response?.data);
      alert(err.response?.data?.message || "Error deleting staff");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="p-16 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Admin Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          className="border px-3 py-2 rounded mb-4"
        />
        <button onClick={handleLogin} className="px-6 py-2 bg-red-500 text-white rounded">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-16 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center">Manage Staff</h2>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-12">
        <h3 className="text-xl font-bold mb-4">{editName ? "Edit Staff" : "Add Staff"}</h3>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border px-3 py-2 rounded mb-2"
        />

        <button onClick={handleSubmit} className="mt-4 px-6 py-2 bg-red-500 text-white rounded">
          {editName ? "Update" : "Add Staff"}
        </button>
      </div>

      {/* Staff List */}
      <div className="grid gap-4">
        {staff.map((member) => (
          <div key={member.name} className="bg-white p-4 rounded shadow flex justify-between">
            <span>{member.name}</span>
            <button onClick={() => handleDelete(member.name)} className="text-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
