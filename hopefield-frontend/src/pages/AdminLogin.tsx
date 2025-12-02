import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        { password }
      );

      if (res.data.success) {
        localStorage.setItem("admin", "true");
        window.location.href = "/admin";
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Server not reachable");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <form onSubmit={login} className="bg-white shadow-lg p-8 rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 w-full rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button className="bg-red-600 text-white py-2 w-full rounded hover:bg-red-700">
          Login
        </button>
      </form>
    </div>
  );
}
