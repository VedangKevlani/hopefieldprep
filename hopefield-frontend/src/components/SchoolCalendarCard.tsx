// src/components/SchoolCalendarCard.tsx
import { useState } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function SchoolCalendarCard() {
  const [numPages] = useState<number>(0);

  return (
    <div className="max-w-md mx-auto bg-[#1E792C] rounded-2xl shadow-lg p-6 border-l-8 border-[#1E792C]">
      <h3 className="text-2xl font-bold text-white mb-4">
        School Calendar
      </h3>
      <p className="text-gray-300 mb-6">
        Check out our school calendar for upcoming events, holidays, and important dates.
      </p>

      {/* PDF Info */}
      <p className="text-sm text-gray-400 mb-4">
        Pages: {numPages || "—"}
      </p>

      {/* Actions */}
      <div className="flex gap-3">
        <a
          href="/downloads/School-Calendar.pdf"
          target="_blank"
          className="flex-1 text-center bg-[#1E792C] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#145820] transition"
        >
          View PDF
        </a>
        <a
          href="/downloads/School-Calendar.pdf"
          download
          className="flex-1 text-center bg-[#EAC30E] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#cfae1e] transition"
        >
          Download
        </a>
      </div>
    </div>
  );
}
