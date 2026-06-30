import React, { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import ModalDefault from "../Ui/ModalDefault";
import PDFNavigation from "./PDFNavigation";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "@/utils/pdfWorkerConfig";
import { Info } from "lucide-react";

interface PdfViewerProps {
  pdfFile: string;
  onClose: () => void;
  isOpen: boolean;
}

const MIN_SCALE = 0.25;
const MAX_SCALE = 5;
const SCALE_STEP = 0.25;

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfFile, onClose, isOpen }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(
    undefined
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  };

  const handleLoadError = (err: Error) => {
    // eslint-disable-next-line no-console
    console.error("Error cargando el PDF:", err);
    setError(err);
  };

  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () => setPageNumber((p) => Math.min(numPages, p + 1));
  const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, s + SCALE_STEP));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, s - SCALE_STEP));

  return (
    <ModalDefault
      isOpen={isOpen}
      onClose={onClose}
      title="Visualizador de PDF"
      cancelText="Cerrar"
      size="full"
      scrollable={false}
    >
      <div className="flex flex-col h-[70vh]">
        <div
          ref={containerRef}
          className="relative p-7 flex-1 overflow-auto bg-gray-100 dark:bg-gray-900"
        >
          <Document
            file={pdfFile}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleLoadError}
            loading={
              <div className="flex items-center justify-center h-full">
                <LoadingSpinner />
              </div>
            }
            error={null}
            className="flex flex-col items-center min-h-full py-4"
          >
            {numPages > 0 && (
              <Page
                pageNumber={pageNumber}
                scale={scale}
                width={containerWidth}
                renderTextLayer
                renderAnnotationLayer={false}
                loading={<LoadingSpinner />}
                className="shadow"
              />
            )}
          </Document>

        </div>
          {error && (
            <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
              <div className="w-full max-w-screen-sm bg-gray-600 dark:bg-gray-700 p-4 rounded pointer-events-auto">
                <div className="flex items-start gap-2 text-white">
                  <Info className="text-yellow-400 bg-gray-800 dark:bg-gray-500 rounded-2xl p-1 w-10 h-10 shrink-0" />
                  <div>
                    <p>
                      Ocurrió un error al cargar el documento PDF:{" "}
                      <i>{pdfFile}</i>.
                    </p>
                    <p className="mt-1">Detalles:</p>
                    <div className="overflow-scroll max-h-48 mt-2 p-2 bg-gray-800 rounded">
                      <pre className="text-sm text-red-600">
                        {error.message}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} 

        <div className="flex justify-center py-3 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
          <PDFNavigation
            pageNumber={pageNumber}
            numPages={numPages}
            scale={scale}
            onPrev={goPrev}
            onNext={goNext}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
          />
        </div>
      </div>
    </ModalDefault>
  );
};

export default PdfViewer;
