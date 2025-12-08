// src/components/SchoolCalendarCard.tsx
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function SchoolCalendarCard() {
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 border-l-8 border-[#1E792C]">
      <h3 className="text-2xl font-bold text-[#1E792C] mb-4">
        School Calendar
      </h3>
      <p className="text-gray-700 mb-6">
        Check out our school calendar for upcoming events, holidays, and important dates.
      </p>

      {/* PDF Preview */}
      <div className="mb-4 border rounded overflow-hidden shadow-sm">
        <Document
          file="/downloads/School-Calendar.pdf"
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<div className="p-10 text-center">Loading preview…</div>}
        >
          <Page
            pageNumber={1}
            scale={1.0}
            className="shadow rounded"
            loading={<div>Loading page…</div>}
          />
        </Document>
      </div>

      {/* PDF Info */}
      <p className="text-sm text-gray-500 mb-4">
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
