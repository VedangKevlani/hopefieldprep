import { useEffect, useState } from "react";

interface Newsletter {
  title: string;
  description: string;
  date: string;
  year: number;
  volume: string;
  file: string;
}

export default function AllNewslettersPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  useEffect(() => {
    fetch("/data/newsletters.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: Newsletter, b: Newsletter) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNewsletters(sorted);
      });
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#fff5e6] to-[#ffe6cc] mx-auto py-16 px-6">
      <h1 className="pt-48 text-4xl font-bold text-[#1E792C] mb-8">
        All Newsletters
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {newsletters.map((issue) => (
          <div
            key={issue.title}
            className="p-5 shadow rounded-xl bg-white border hover:shadow-lg transition"
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
      </div>
    </section>
  );
}
