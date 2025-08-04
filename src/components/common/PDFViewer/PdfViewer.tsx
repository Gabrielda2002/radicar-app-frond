import React from "react";
import { usePDFSlick } from "@pdfslick/react";
import PDFNavigation from "./PDFNavigation";
import ModalDefault from "../Ui/ModalDefault";
import "@/utils/pdfWorkerConfig";

interface PdfViewerProps {
  pdfFile: string;
  onClose: () => void;
  isOpen: boolean;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfFile, onClose, isOpen }) => {
  const { viewerRef, usePDFSlickStore, PDFSlickViewer, error } = usePDFSlick(
    pdfFile,
    {
      singlePageViewer: true,
      scaleValue: "page-width",
    }
  );

  console.log(error)

  return (
    <>
      <ModalDefault
        isOpen={isOpen}
        onClose={onClose}
        title="Visualizador de PDF"
        cancelText="Cerrar"
        size="full"
      >
        <div className="w-full h-[70vh] pdfSlick">
          <div className="relative h-full w-full">
            <PDFSlickViewer className="" {...{ viewerRef, usePDFSlickStore }} />
            {error && (
              <div className="w-full max-w-screen-sm mx-auto py-4 bg-gray-600 dark:bg-gray-700 p-4 rounded">
                <svg
                  className="flex-shrink-0 w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <p>
                  There was an error loading the PDF document: <i>{pdfFile}</i>.
                </p>
                <p>Here are the details:</p>
                <div className="overflow-scroll max-h-48 mt-2 p-2 bg-gray-800 rounded">
                  <pre className="text-sm text-red-600">
                    {JSON.stringify(error, null, 2)}
                  </pre>
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <PDFNavigation {...{ usePDFSlickStore }} />
            </div>
          </div>
        </div>
      </ModalDefault>
    </>
  );
};

export default PdfViewer;
