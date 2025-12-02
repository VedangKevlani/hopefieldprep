import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  useEffect(() => {
    if (!localStorage.getItem("admin")) window.location.href = "/admin/login";
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="space-y-4">
        <Link
          to="/admin/pdfs"
          className="block bg-blue-600 text-white px-4 py-3 rounded shadow"
        >
          Manage PDFs
        </Link>

        <button
          className="bg-gray-700 text-white px-4 py-3 rounded shadow"
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
