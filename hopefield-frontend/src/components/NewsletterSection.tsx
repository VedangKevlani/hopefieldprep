import { useEffect, useState } from "react";

export default function NewsletterSection() {
  const [newsletters, setNewsletters] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/data/newsletters.json")
      .then((res) => res.json())
      .then((data) => {
        // Sort newest to oldest
        const sorted = data.sort(
          (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNewsletters(sorted);
      });
  }, []);

  const filteredNewsletters =
    filter === "all"
      ? newsletters
      : newsletters.filter(
          (item: any) => item.year.toString() === filter || item.volume === filter
        );

  const current = filteredNewsletters[0];
  const past = filteredNewsletters.slice(1);

  return (
    <section id="newsletter" className="mb-24">
      <h2 className="text-3xl font-bold text-[#EAC30E] mb-6">Newsletter</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-10">
        Browse our current and past newsletters to stay updated on school activities,
        achievements, and important announcements.
      </p>

      {/* Timeline Filter */}
      <div className="mb-10 flex flex-col md:flex-row items-start md:items-center gap-4">
        <label className="font-semibold text-[#1E792C]">
          Filter by Year / Volume:
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

          {[...new Set(newsletters.map((n: any) => n.volume))].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {current && (
        <div className="grid md:grid-cols-3 gap-10">
          {/* Featured Current Issue */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-8 border-l-8 border-[#1E792C]">
            <h3 className="text-2xl font-bold text-[#1E792C] mb-4">
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
            <h4 className="text-xl font-semibold text-[#EAC30E] mb-4">
              Past Issues
            </h4>

            <div className="space-y-4">
              {past.map((issue: any) => (
                <div
                  key={issue.title}
                  className="p-4 rounded-lg shadow bg-white hover:shadow-md transition border"
                >
                  <p className="font-semibold text-[#1E792C]">{issue.title}</p>
                  <p className="text-sm text-gray-600 mb-2">
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
