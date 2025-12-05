// src/components/PdfPreview.tsx
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs";

// 👇 REAL worker, guaranteed to load correctly
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

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [singlePageMode, setSinglePageMode] = useState<boolean>(true);
  const [originalPageWidth, setOriginalPageWidth] = useState<number | null>(
    null
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    console.log("📄 Loaded PDF with pages:", numPages, "URL:", fileUrl);
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onDocumentLoadError(error: any) {
    console.error("❌ PDF failed to load:", error, "URL:", fileUrl);
  }

  function onPageLoadSuccess(page: any) {
    try {
      const viewport = page.getViewport({ scale: 1 });
      if (!originalPageWidth) setOriginalPageWidth(viewport.width);
    } catch {}
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
      {/* Controls */}
      <div className="max-w-5xl mx-auto px-4 mb-4 sticky top-4 z-10 bg-white rounded-xl shadow-md py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="text-lg md:text-xl font-bold text-[#EAC30E]">
            PDF Preview
          </h3>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="px-3 py-2 rounded-md bg-[#FF3B3B] text-white font-semibold disabled:opacity-40"
          >
            Prev
          </button>

          <div className="px-3 py-2 rounded-md bg-white border">
            {pageNumber} / {numPages || "—"}
          </div>

          <button
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="px-3 py-2 rounded-md bg-[#FF3B3B] text-white font-semibold disabled:opacity-40"
          >
            Next
          </button>

          {/* Zoom */}
          <button className="px-3 py-2 rounded-md bg-white border" onClick={zoomOut}>-</button>
          <button className="px-3 py-2 rounded-md bg-white border" onClick={resetZoom}>100%</button>
          <button className="px-3 py-2 rounded-md bg-white border" onClick={zoomIn}>+</button>

          <button className="px-3 py-2 rounded-md bg-[#EAC30E]" onClick={fitToWidth}>
            Fit to Width
          </button>

          {/* Download */}
          <a
            href={fileUrl}
            download
            className="px-3 py-2 rounded-md bg-white border font-semibold"
          >
            Download PDF
          </a>
        </div>
      </div>

      {/* Viewer */}
      <div className="max-w-5xl mx-auto px-4" ref={containerRef}>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="max-h-[80vh] overflow-auto">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<div className="p-10 text-center">Loading…</div>}
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
