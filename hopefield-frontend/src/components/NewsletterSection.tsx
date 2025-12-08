import { useEffect, useState } from "react";

interface Newsletter {
  title: string;
  description: string;
  date: string;
  year: number;
  volume: string;
  file: string;
}

export default function NewsletterSection() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [filter, setFilter] = useState("all");

    useEffect(() => {
    fetch("/data/newsletters.json")
        .then((res) => res.json())
        .then((data) => {
        console.log("NEWSLETTERS LOADED:", data);
        const sorted = data.sort(
            (a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNewsletters(sorted);
        })
        .catch(err => console.error("NEWSLETTER LOAD ERROR:", err));
    }, []);


  const filteredNewsletters =
    filter === "all"
      ? newsletters
      : newsletters.filter(
          (item: any) => item.year.toString() === filter
        );

  const current = filteredNewsletters[0];
  const past = filteredNewsletters.slice(1);

  return (
    <section id="newsletter" className="mb-24">
      <h2 className="text-3xl font-bold text-[#EAC30E] mb-6">Newsletter</h2>

      {/* Timeline Filter */}
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center gap-4">
        <label className="font-semibold text-[#1E792C]">
          Filter by Year:
        </label>
        <select
          className="border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-[#1E792C]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Issues</option>

          {/* Generate Filter Options */}
          {[...new Set(newsletters.map((n: any) => n.year))].map((y) => (
            <option key={y} value={y.toString()}>
              {y}
            </option>
          ))}
          
        </select>
      </div>

      {current && (
        <div className="grid md:grid-cols-3 gap-10">
          {/* Featured Current Issue */}
          <div className="md:col-span-2 bg-[#1E792C] rounded-xl shadow-lg p-8 border-l-8 border-[#1E792C]">
            <h3 className="text-2xl font-bold text-white mb-4">
              Current Issue – {current.title}
            </h3>
            <p className="text-gray-700 mb-6">{current.description}</p>

            <a
              href={current.file}
              target="_blank"
              className="inline-block bg-[#1E792C] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#145820] transition"
            >
              Read Now
            </a>
          </div>

          {/* Past Issues */}
            <div>
                <h4 className="text-xl font-semibold text-[#1E792C] mb-4">
                Past Issues
                </h4>

            <div className="space-y-4">
            {past.slice(0, 3).map((issue: any) => (
            <div
                key={issue.title}
                className="p-4 rounded-lg shadow bg-[#1E792C] hover:shadow-md transition border"
            >
                <p className="font-semibold text-white">{issue.title}</p>
                <p className="text-sm text-gray-400 mb-2">
                {issue.year} • {issue.volume}
                </p>

                <a
                href={issue.file}
                target="_blank"
                className="text-[#1E792C] underline font-semibold hover:text-[#EAC30E]"
                >
                View Issue
                </a>
            </div>
            ))}

            {past.length > 3 && (
            <a
                href="/campus-life/newsletters/all"
                className="block mt-4 text-[#1E792C] underline font-bold hover:text-[#EAC30E]"
            >
                View More →
            </a>
)}

              {past.length === 0 && (
                <p className="text-gray-500 italic">No past issues available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
