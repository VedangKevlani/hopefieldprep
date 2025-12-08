import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";

// config for pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function FlipBookPreview({ fileUrl }: { fileUrl: string }) {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPdf() {
      try {
        const pdf = await pdfjsLib.getDocument(fileUrl).promise;
        const loadedPages: string[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: ctx, viewport }).promise;

          loadedPages.push(canvas.toDataURL());
        }

        setPages(loadedPages);
      } catch (err) {
        console.error("Flipbook PDF error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPdf();
  }, [fileUrl]);

  if (loading) return <p className="text-center py-10">Loading flipbook…</p>;

  return (
    <div className="flex justify-center">
      <HTMLFlipBook
        width={550}
        height={733}
        minWidth={300}
        maxWidth={1000}
        maxHeight={1400}
        showCover={true}
        className="shadow-xl"
      >
        {pages.map((src, idx) => (
          <div key={idx} className="bg-white flex justify-center items-center">
            <img src={src} className="w-full h-auto" />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
