// src/components/PdfPreview.tsx
import { useRef, useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type PdfPreviewProps = {
  fileUrl?: string;
  className?: string;
};

export default function PdfPreview({
fileUrl = "https://hopefield-backend.onrender.com/uploads/",
  className = "",
}: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [singlePageMode, setSinglePageMode] = useState<boolean>(true);
  const [originalPageWidth, setOriginalPageWidth] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load and render the PDF page
  const renderPage = async (num: number) => {
    if (!canvasRef.current) return;
    try {
      const pdf = await pdfjsLib.getDocument(fileUrl).promise;
      setNumPages(pdf.numPages);

      const page = await pdf.getPage(num);
      const viewport = page.getViewport({ scale });

      if (!originalPageWidth) setOriginalPageWidth(viewport.width);

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = { canvasContext: context!, viewport };
      await page.render(renderContext).promise;
    } catch (err) {
      console.error("❌ Failed to render PDF:", err, "URL:", fileUrl);
    }
  };

  // Re-render page when file, page number, or scale changes
  useEffect(() => {
    renderPage(pageNumber);
  }, [fileUrl, pageNumber, scale]);

  // Controls
  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
  const resetZoom = () => setScale(1);
  const fitToWidth = () => {
    if (!containerRef.current || !originalPageWidth) {
      setScale(1.2);
      return;
    }
    const width = containerRef.current.clientWidth - 32;
    setScale(Number((width / originalPageWidth).toFixed(2)));
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Toolbar */}
      <div className="max-w-5xl mx-auto px-4 mb-4 sticky top-4 z-10 bg-white shadow-md rounded-xl py-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg md:text-xl font-bold text-[#EAC30E]">PDF Preview</h3>

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

          <button className="px-3 py-2 bg-[#EAC30E] rounded font-semibold" onClick={fitToWidth}>
            Fit
          </button>

          {/* Download */}
          <a href={fileUrl} download className="px-3 py-2 bg-white border rounded">
            Download
          </a>

          <button
            onClick={() => setSinglePageMode((v) => !v)}
            className={`px-3 py-2 rounded font-semibold ${
              singlePageMode ? "bg-[#FF3B3B] text-white" : "bg-white border text-gray-800"
            }`}
          >
            {singlePageMode ? "Single Page" : "Continuous"}
          </button>
        </div>
      </div>

      {/* Viewer */}
      <div ref={containerRef} className="max-w-5xl mx-auto px-4">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="max-h-[80vh] overflow-auto">
            {singlePageMode ? (
              <canvas ref={canvasRef} className="mx-auto block" />
            ) : (
              // Continuous mode: render all pages
              Array.from({ length: numPages }, (_, i) => (
                <canvas
                  key={i}
                  ref={(el) => {
                    if (!el) return;
                    pdfjsLib.getDocument(fileUrl).promise.then((pdf) => {
                      pdf.getPage(i + 1).then((page) => {
                        const viewport = page.getViewport({ scale });
                        el.height = viewport.height;
                        el.width = viewport.width;
                        page.render({ canvasContext: el.getContext("2d")!, viewport });
                      });
                    });
                  }}
                  className="mx-auto block mb-4"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
