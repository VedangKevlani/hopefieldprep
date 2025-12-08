// src/pages/AdminStaffPage.tsx
import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

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
  const [passwordInput, setPasswordInput] = useState("");
  const [adminPassword, setAdminPassword] = useState(""); // keep password after login
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [form, setForm] = useState<StaffMember>({ name: "", email: "", photo: "", group: "K1" });
  const [editName, setEditName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string>(""); // NEW

  // Fetch staff
  const fetchStaff = async () => {
    try {
      const url = BACKEND_URL ? `${BACKEND_URL}/api/staff` : "/api/staff";
      const res = await axios.get(url);
      console.log("Fetched staff:", res.data);
      setStaff(res.data);
      console.log("Loaded staff list:", (res.data || []).map((s:any) => s.photo));
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  useEffect(() => {
    if (isAuthorized) fetchStaff();
  }, [isAuthorized]);

  // Verify admin password
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, {
        password: passwordInput,
      });
      console.log("Login response:", res.data);
      if (res.data.success) {
        setIsAuthorized(true);
        setAdminPassword(passwordInput); // store password for API calls
        setPasswordInput("");            // clear login input
      } else {
        alert("Incorrect password");
      }
    } catch (err) {
      console.error("Error verifying password:", err);
      alert("Error verifying password");
    }
  };

  // File upload
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Local preview
  const previewUrl = URL.createObjectURL(file);
  setLocalPreview(previewUrl);

  setUploading(true);
  const formData = new FormData();
  formData.append("photo", file);

  try {
    const res = await axios.post(`${BACKEND_URL}/api/staff/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Uploaded file path:", res.data.filePath);

    setForm(prev => ({ ...prev, photo: res.data.filePath })); // IMPORTANT
  } catch (err) {
    console.error(err);
    alert("Error uploading file");
  } finally {
    setUploading(false);
  }
};



  const handleSubmit = async () => {
    try {
      const payload = { ...form, adminPassword };
      if (editName) {
        console.log("Updating staff:", editName, payload);
        await axios.put(`${BACKEND_URL}/api/staff`, { ...payload, name: editName });
        setEditName("");
      } else {
        console.log("Adding staff:", payload);
        await axios.post(`${BACKEND_URL}/api/staff`, payload);
        console.log("Submitting staff with photo:", form.photo);
      }
      setForm({ name: "", email: "", photo: "", group: "K1" });
      fetchStaff();
    } catch (err: any) {
      console.error("Error saving staff:", err.response?.data || err);
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
      console.log("Deleting staff:", name);
      await axios.delete(`${BACKEND_URL}/api/staff`, {
        data: { name, adminPassword },
      });
      fetchStaff();
    } catch (err: any) {
      console.error("Error deleting staff:", err.response?.data || err);
      alert(err.response?.data?.message || "Error deleting staff");
    }
  };

  // Show login screen if not authorized
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

  // Authorized view
  return (
    <div className="p-6 md:p-16 bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] min-h-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#EAC30E] mb-8 text-center">
        Admin: Manage Staff
      </h2>

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
          {(() => {
            console.log("PHOTO STATE", {
              formPhoto: form.photo,
              localPreview,
              uploading
            });
            return null;
          })()}

{uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}

{(localPreview || form.photo) && !uploading && (
  <img
    src={localPreview || form.photo}
    alt="Preview"
    className="w-24 h-24 rounded-full mt-2 object-cover"
    onError={() => console.error("❌ Image failed to load:", localPreview || form.photo)}
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
            src={
              member.photo
                ? (/^https?:\/\//i.test(member.photo)
                    ? member.photo
                    : (BACKEND_URL ? `${BACKEND_URL}${member.photo.startsWith('/') ? member.photo : '/' + member.photo}` : member.photo))
                : "/images/default-teacher.jpg"
            }
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
