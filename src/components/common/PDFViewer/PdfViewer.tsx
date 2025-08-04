import React from "react";
import { usePDFSlick } from "@pdfslick/react";
import PDFNavigation from "./PDFNavigation";
import ModalDefault from "../Ui/ModalDefault";

interface PdfViewerProps {
  pdfFile: string;
  onClose: () => void;
  isOpen: boolean;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfFile, onClose, isOpen }) => {
  const { viewerRef, usePDFSlickStore, PDFSlickViewer } = usePDFSlick(pdfFile, {
    singlePageViewer: true,
    scaleValue: "page-width",
  });

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
