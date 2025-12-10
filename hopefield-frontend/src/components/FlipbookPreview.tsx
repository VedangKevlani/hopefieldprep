// src/components/FlipbookPreview.tsx
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type FlipbookPreviewProps = {
  fileUrl?: string;
  className?: string;
};

export default function FlipbookPreview({ fileUrl, className = "" }: FlipbookPreviewProps) {
  if (!fileUrl) return <p>No PDF selected</p>;
  return <FlipbookViewer fileUrl={fileUrl} className={className} />;
}

function FlipbookViewer({ fileUrl, className = "" }: FlipbookPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [originalPageWidth, setOriginalPageWidth] = useState<number | null>(null);

  console.log("📖 Flipbook loading PDF:", fileUrl);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log("📄 Flipbook PDF loaded. Total pages:", numPages);
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onDocumentLoadError(error: any) {
    console.error("❌ Failed to load flipbook PDF:", error, "URL:", fileUrl);
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

  const goToPrevPage = () => setPageNumber((p) => Math.max(1, p - 1));
  const goToNextPage = () => setPageNumber((p) => Math.min(numPages, p + 1));

  return (
    <div className={`w-full ${className}`}>
      {/* Flipbook Toolbar */}
      <div className="max-w-5xl mx-auto px-4 mb-4 sticky top-4 z-10 bg-gradient-to-r from-[#1E792C] to-[#145820] shadow-lg rounded-xl py-4 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg md:text-xl font-bold text-white">📖 Flipbook</h3>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-white text-[#1E792C] rounded-lg font-semibold hover:bg-[#EAC30E] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ◀ Prev
          </button>

          <div className="px-4 py-2 bg-white text-[#1E792C] rounded-lg font-semibold">
            {pageNumber} / {numPages || "—"}
          </div>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 bg-white text-[#1E792C] rounded-lg font-semibold hover:bg-[#EAC30E] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next ▶
          </button>

          <div className="border-l border-white/30"></div>

          <button
            onClick={zoomOut}
            className="px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
            title="Zoom out"
          >
            −
          </button>
          <button
            onClick={resetZoom}
            className="px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition text-xs"
            title="Reset zoom"
          >
            100%
          </button>
          <button
            onClick={zoomIn}
            className="px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
            title="Zoom in"
          >
            +
          </button>

          <button
            onClick={fitToWidth}
            className="px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition text-sm"
            title="Fit to width"
          >
            Fit
          </button>

          <a
            href={fileUrl}
            download
            className="px-4 py-2 bg-[#EAC30E] text-[#1E792C] rounded-lg font-semibold hover:bg-yellow-500 transition"
            title="Download PDF"
          >
            ⬇ Download
          </a>
        </div>
      </div>

      {/* Flipbook Viewer */}
      <div ref={containerRef} className="max-w-5xl mx-auto px-4">
        <div className="bg-white p-6 rounded-xl shadow-lg border-4 border-[#1E792C]">
          <div className="max-h-[80vh] overflow-auto rounded-lg">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                onLoadSuccess={onPageLoadSuccess}
                renderAnnotationLayer={true}
                renderTextLayer={true}
              />
            </Document>
          </div>
        </div>
      </div>

      {/* Navigation Hint */}
      <div className="max-w-5xl mx-auto px-4 mt-4 text-center">
        <p className="text-sm text-gray-600">
          Use the Previous/Next buttons or keyboard arrows to flip through pages
        </p>
      </div>
    </div>
  );
}
