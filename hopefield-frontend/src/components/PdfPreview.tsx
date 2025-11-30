// src/components/PdfPreview.tsx
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"; // path to your worker

type PdfPreviewProps = {
  fileUrl?: string;
  className?: string;
};

export default function PdfPreview({
  fileUrl = "/downloads/Hopefield-Prep-Application-form.pdf",
  className = "",
}: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [singlePageMode, setSinglePageMode] = useState<boolean>(true);
  const [originalPageWidth, setOriginalPageWidth] = useState<number | null>(
    null
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onPageLoadSuccess(page: any) {
    try {
      const viewport = page.getViewport({ scale: 1 });
      if (!originalPageWidth) setOriginalPageWidth(viewport.width);
    } catch {
      // ignore
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
    const containerWidth = containerRef.current.clientWidth - 32; // padding buffer
    const newScale = containerWidth / originalPageWidth;
    setScale(Number(newScale.toFixed(2)));
  };

  const prevPage = () => setPageNumber((p) => Math.max(1, p - 1));
  const nextPage = () => setPageNumber((p) => Math.min(numPages, p + 1));

  return (
    <div className={`w-full ${className}`}>
      {/* Sticky Controls */}
      <div className="max-w-5xl mx-auto px-4 mb-4 sticky top-4 z-10 bg-white rounded-xl shadow-md py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h3
            className="text-lg md:text-xl font-bold text-[#EAC30E]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            PDF Preview - please be patient while it loads
          </h3>
          <span className="text-sm text-gray-600 hidden md:inline">
            Preview, zoom, and navigate the form before downloading.
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Page Navigation */}
          <button
            onClick={prevPage}
            disabled={singlePageMode ? pageNumber <= 1 : numPages <= 1}
            className="px-3 py-2 rounded-md bg-[#FF3B3B] text-white font-semibold hover:opacity-90 disabled:opacity-40"
          >
            Prev
          </button>

          <div className="px-3 py-2 rounded-md bg-white border text-gray-800 font-medium">
            {singlePageMode
              ? `${pageNumber} / ${numPages || "—"}`
              : `${numPages} page${numPages !== 1 ? "s" : ""}`}
          </div>

          <button
            onClick={nextPage}
            disabled={singlePageMode ? pageNumber >= numPages : numPages <= 1}
            className="px-3 py-2 rounded-md bg-[#FF3B3B] text-white font-semibold hover:opacity-90 disabled:opacity-40"
          >
            Next
          </button>

          {/* Zoom */}
          <button className="px-3 py-2 rounded-md bg-white border text-gray-800 font-semibold" onClick={zoomOut}>-</button>
          <button className="px-3 py-2 rounded-md bg-white border text-gray-800 font-semibold" onClick={resetZoom}>100%</button>
          <button className="px-3 py-2 rounded-md bg-white border text-gray-800 font-semibold" onClick={zoomIn}>+</button>

          {/* Fit & Mode */}
          <button className="px-3 py-2 rounded-md bg-[#EAC30E] text-black font-semibold" onClick={fitToWidth}>Fit to Width</button>
          <button
            onClick={() => setSinglePageMode((v) => !v)}
            className={`px-3 py-2 rounded-md font-semibold ${
              singlePageMode ? "bg-[#FF3B3B] text-white" : "bg-white border text-gray-800"
            }`}
          >
            {singlePageMode ? "Single Page" : "Continuous"}
          </button>

          {/* Download */}
          <a
            href={fileUrl}
            download
            className="px-3 py-2 rounded-md bg-white border text-gray-800 font-semibold ml-2"
          >
            Download PDF
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-5xl mx-auto px-4" ref={containerRef}>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <div className="max-h-[80vh] overflow-auto">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div className="p-10 text-center">Loading preview…</div>}
            >
              {singlePageMode ? (
                <div className="flex justify-center">
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    onLoadSuccess={onPageLoadSuccess}
                    loading={<div className="p-8">Loading page…</div>}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-6">
                  {Array.from({ length: numPages }, (_, i) => (
                    <Page
                      key={`page_${i + 1}`}
                      pageNumber={i + 1}
                      scale={scale}
                      onLoadSuccess={onPageLoadSuccess}
                      loading={<div className="p-8">Loading page…</div>}
                    />
                  ))}
                </div>
              )}
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}
