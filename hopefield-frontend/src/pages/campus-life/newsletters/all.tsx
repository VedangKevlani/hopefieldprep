// hopefield-frontend/pages/campus-life/newsletters/all.tsx
import { useEffect, useState } from "react";

interface Newsletter {
  _id?: string;
  title: string;
  description?: string;
  date: string;
  year: number;
  volume?: string;
  fileUrl?: string;
  file?: string;
}

export default function AllNewslettersPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/newsletters`);
        if (res.ok) {
          const data = await res.json();
          setNewsletters(data || []);
        } else {
          // fallback to static file
          const r = await fetch("/data/newsletters.json");
          const dr = await r.json();
          setNewsletters(dr || []);
        }
      } catch (err) {
        console.error("load newsletters error:", err);
        try {
          const r = await fetch("/data/newsletters.json");
          const dr = await r.json();
          setNewsletters(dr || []);
        } catch (e) { console.error(e); }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const buildUrl = (item: Newsletter) => item.fileUrl || item.file || "#";

  if (loading) return <div className="p-10">Loading…</div>;

  return (
    <section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] mx-auto py-16 px-6">
      <h1 className="pt-48 text-4xl font-bold text-[#1E792C] mb-8">All Newsletters</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {newsletters.map((issue) => (
          <div key={issue._id || issue.title + issue.date} className="p-5 shadow rounded-xl bg-white border hover:shadow-lg transition">
            <p className="font-semibold text-[#1E792C]">{issue.title}</p>
            <p className="text-sm text-gray-600 mb-2">{new Date(issue.date).getFullYear()} • {issue.volume}</p>
            <p className="text-gray-700 mb-4">{issue.description}</p>
            <a href={buildUrl(issue)} target="_blank" rel="noreferrer" className="text-[#1E792C] underline font-semibold hover:text-[#EAC30E]">View Issue</a>
          </div>
        ))}
      </div>
    </section>
  );
}
