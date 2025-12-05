// src/components/PdfPreview.tsx
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// 🟡 REAL WORKER (no fake worker, fully supported)
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type PdfPreviewProps = {
  fileUrl?: string;
  className?: string;
};

export default function PdfPreview({
  fileUrl = "/downloads/Hopefield-Prep-Application-form.pdf",
  className = "",
}: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [singlePageMode, setSinglePageMode] = useState(true);
  const [originalPageWidth, setOriginalPageWidth] = useState<number | null>(null);

  // 🔎 LOG WORKER LOADING
  console.log("🔧 PDF Worker in use:", workerSrc);
  console.log("🔗 Loading PDF from:", fileUrl);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log("📄 Loaded PDF with pages:", numPages);
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onDocumentLoadError(error: any) {
    console.error("❌ Failed to load PDF:", error, "PDF URL:", fileUrl);
  }

  function onPageLoadSuccess(page: any) {
    try {
      const viewport = page.getViewport({ scale: 1 });
      if (!originalPageWidth) setOriginalPageWidth(viewport.width);
    } catch (err) {
      console.warn("⚠ Page load error:", err);
    }
  }

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
  const resetZoom = () => setScale(1);

  const fitToWidth = () => {
    if (!containerRef.current || !originalPageWidth) {
      setScale(1.2);
      return;
    }
    const width = containerRef.current.clientWidth - 32;
    const newScale = width / originalPageWidth;
    setScale(Number(newScale.toFixed(2)));
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Toolbar */}
      <div className="max-w-5xl mx-auto px-4 mb-4 sticky top-4 z-10 bg-white shadow-md rounded-xl py-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg md:text-xl font-bold text-[#EAC30E]">
          PDF Preview
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Pagination */}
          <button
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="px-3 py-2 bg-[#FF3B3B] text-white rounded disabled:opacity-40"
          >
            Prev
          </button>

          <div className="px-3 py-2 bg-white border rounded">
            {pageNumber} / {numPages || "—"}
          </div>

          <button
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="px-3 py-2 bg-[#FF3B3B] text-white rounded disabled:opacity-40"
          >
            Next
          </button>

          {/* Zoom */}
          <button className="px-3 py-2 bg-white border rounded" onClick={zoomOut}>-</button>
          <button className="px-3 py-2 bg-white border rounded" onClick={resetZoom}>100%</button>
          <button className="px-3 py-2 bg-white border rounded" onClick={zoomIn}>+</button>

          <button
            className="px-3 py-2 bg-[#EAC30E] rounded font-semibold"
            onClick={fitToWidth}
          >
            Fit
          </button>

          {/* Download */}
          <a href={fileUrl} download className="px-3 py-2 bg-white border rounded">
            Download
          </a>
        </div>
      </div>

      {/* Viewer */}
      <div ref={containerRef} className="max-w-5xl mx-auto px-4">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="max-h-[80vh] overflow-auto">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<div className="p-10 text-center">Loading PDF…</div>}
            >
              {singlePageMode ? (
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  onLoadSuccess={onPageLoadSuccess}
                  loading={<div className="p-8">Loading page…</div>}
                />
              ) : (
                Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i}
                    pageNumber={i + 1}
                    scale={scale}
                    onLoadSuccess={onPageLoadSuccess}
                  />
                ))
              )}
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}
