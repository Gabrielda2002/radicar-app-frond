import React, { useState } from "react";
import ItemManu from "./ItemManu";
import { useAuth } from "@/context/authContext";
import PdfViewer from "@/components/common/PDFViewer/PdfViewer";
import { useSecureFileAccess } from "../Hooks/useSecureFileAccess";
import { FileItem } from "../Types/IFileManager";
import useFileManagerStore from "../Store/FileManagerStore";

interface FileListProps {
  files: FileItem[];
}

const FileList: React.FC<FileListProps> = ({
  files,
}) => {
  const { rol } = useAuth();
  const { deleteItemById } = useFileManagerStore();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const {openSecureFile, downloadSecureFile} = useSecureFileAccess()

  const getIcon = (mimeType: string) => {
    switch (mimeType) {
      case "application/pdf":
        return "/assets/pdf-file.svg";
      case "application/msword":
        return "/assets/docx-file.svg";
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return "/assets/excel-file.svg";
      default:
        return "/assets/docx-file.svg";
    }
  };

  const handleFileOpen = (file: FileItem, action: "VIEW" | "DOWNLOAD", type: "files" | "soporte") => {
    if (file.mimeType === "application/pdf") {
      openSecureFile(file.id, action, type);
      // setPdfUrl(fullPdfUrl);
      // setShowPdfViewer(true);
    } else {
      downloadSecureFile(file.id, type);
    }
  };

  const handleClosePdfViewer = () => {
    setShowPdfViewer(false);
    setPdfUrl(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="relative flex flex-col items-center p-2 text-gray-700 duration-500 bg-gray-100 border-2 rounded-md shadow-sm cursor-pointer md:p-4 group dark:shadow-indigo-500 dark:border-gray-700 dark:bg-gray-700 hover:shadow-lg dark:hover:bg-gray-600 dark:text-gray-300"
            title={`${file.name} - ${file.size / 1024} KB`}
          >
            {/* Menú de opciones */}
            {[ 1, 4 ].includes(Number(rol)) && (
            <div
              className="absolute top-2 right-2"
              onClick={(e) => e.stopPropagation()}
            >
              <ItemManu
                onDelete={() => deleteItemById(file.id, "archivo")}
                itemName={file.name}
                itemType="archivo"
                itemId={file.id}
                nameItemOld={file.name}
              />
            </div>
            )}

            {/* Icono del archivo */}
            <div
              onClick={() => handleFileOpen(file, "VIEW", "files")}
              className="flex flex-col items-center"
            >
              <img
                src={getIcon(file.mimeType)}
                alt="file-icon"
                className="w-8 h-8 mb-2 md:w-16 md:h-16"
              />
            </div>

            {/* Nombre del archivo */}
            <p
              className="w-full text-sm font-medium text-center truncate dark:text-gray-300"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              title={file.name} // Descripción completa en el title
            >
              {file.name}
            </p>
          </div>
        ))}
      </div>

      {/* PDF Viewer Modal */}
      {showPdfViewer && pdfUrl && (
        <PdfViewer 
          pdfFile={pdfUrl}
          onClose={handleClosePdfViewer}
          isOpen={showPdfViewer}
        />
      )}
    </>
  );
};

export default FileList;
