// hopefield-frontend/src/components/NewsletterSection.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Newsletter {
  _id?: string;
  title: string;
  description?: string;
  date: string;
  year: number;
  volume?: string;
  fileUrl?: string;
  file?: string; // fallback for static json
}

export default function NewsletterSection() {
  const [all, setAll] = useState<Newsletter[]>([]);
  const [current, setCurrent] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // try API current + all
        const [curRes, allRes] = await Promise.allSettled([
          fetch(`${BACKEND_URL}/api/newsletters/current`),
          fetch(`${BACKEND_URL}/api/newsletters`),
        ]);

        if (curRes.status === "fulfilled" && curRes.value.ok) {
          const c = await curRes.value.json();
          setCurrent(c || null);
        }

        if (allRes.status === "fulfilled" && allRes.value.ok) {
          const a = await allRes.value.json();
          setAll(a || []);
        } else {
          // fallback to static JSON in public/data
          const r = await fetch("/data/newsletters.json");
          const dr = await r.json();
          setAll(dr || []);
          if (!current && dr && dr.length) setCurrent(dr[0]);
        }
      } catch (err) {
        console.error("Newsletter fetch error:", err);
        // fallback to static json
        try {
          const r = await fetch("/data/newsletters.json");
          const dr = await r.json();
          setAll(dr || []);
          if (dr && dr.length) setCurrent(dr[0]);
        } catch (e) {
          console.error("Fallback load error:", e);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const past = all.filter((n) => {
    if (!current) return true;
    const curDate = new Date(current.date).getTime();
    return new Date(n.date).getTime() < curDate;
  });

  // top 3 past for summary
  const topPast = past.slice(0, 3);

  const buildUrl = (n: Newsletter) => n.fileUrl || (n.file ? n.file : "#");

  return (
    <section id="newsletter" className="bg-[#1E792C] mb-24">
      <h2 className="text-3xl font-bold text-white mb-6">Newsletter</h2>
      <p className="text-lg text-white leading-relaxed mb-8">
        Browse our current and recent newsletters to stay updated on school activities, achievements, and announcements.
      </p>

      {loading && <div className="text-white">Loading…</div>}

      {!loading && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Current Issue (featured) */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6 border-l-8 border-[#1E792C]">
            {current ? (
              <>
                <h3 className="text-2xl font-bold text-[#1E792C] mb-3">Current Issue — {current.title}</h3>
                <p className="text-white mb-4">{current.description}</p>
                <div className="flex gap-3">
                  <a href={buildUrl(current)} target="_blank" rel="noreferrer" className="inline-block bg-[#1E792C] text-white px-5 py-3 rounded-lg font-bold hover:bg-[#145820]">
                    Read Now
                  </a>
                  <Link to="/campus-life/newsletters/all" className="inline-block px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    View All Issues
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-white">No current issue available.</p>
            )}
          </div>

          {/* Past issues quick list */}
          <div>
            <h4 className="text-xl font-semibold text-[#EAC30E] mb-3">Recent Issues</h4>
            <div className="space-y-3">
              {topPast.map((p) => (
                <div key={p.title + p.date} className="p-3 bg-white rounded shadow-sm">
                  <p className="font-semibold text-[#1E792C]">{p.title}</p>
                  <p className="text-sm text-white">{new Date(p.date).toLocaleDateString()} • {p.volume}</p>
                  <a href={buildUrl(p)} target="_blank" rel="noreferrer" className="text-[#1E792C] underline mt-2 inline-block">View Issue</a>
                </div>
              ))}

              {past.length === 0 && <p className="text-white">No past issues yet.</p>}

              {past.length > 3 && (
                <div className="text-center">
                  <Link to="/campus-life/newsletters/all" className="inline-block mt-3 px-4 py-2 bg-[#EAC30E] rounded font-semibold text-black">
                    View More Issues
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
