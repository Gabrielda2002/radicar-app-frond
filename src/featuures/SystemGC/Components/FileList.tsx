import React, { useState } from "react";
import ItemManu from "./ItemManu";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import PdfViewer from "@/components/common/PDFViewer/PdfViewer";
import { useSecureFileAccess } from "../Hooks/useSecureFileAccess";

interface File {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  path: string;
}

interface FileListProps {
  files: File[];
  onDelete: (id: string, type: "carpetas" | "archivo") => void;
  onDownload: (id: string, fileName: string) => void;
  renameItem: (
    id: string,
    newName: string,
    type: "carpetas" | "archivo"
  ) => void;
  currentFolderId: string;
  section: string;
  handleRefresh?: () => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  // onDownload,
  onDelete,
  renameItem,
  currentFolderId,
  section,
  handleRefresh
}) => {

  const { rol } = useAuth();
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

  const handleFileOpen = (file: File, action: "VIEW" | "DOWNLOAD", type: "files" | "soporte") => {
    if (file.mimeType === "application/pdf") {
      openSecureFile(file.id, action, type);
      // setPdfUrl(fullPdfUrl);
      // setShowPdfViewer(true);
    } else {
      downloadSecureFile(file.id, type);
    }
  };

  const handleDelete = (fileId: string) => {
    onDelete(fileId, "archivo");
    toast.success("Archivo eliminado con éxito!", {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleRename = (fileId: string, newName: string) => {
    renameItem(fileId, newName, "archivo");
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
                onDelete={() => handleDelete(file.id)}
                renameItem={(newName: string) => handleRename(file.id, newName)}
                itemName={file.name}
                currentFolderId={currentFolderId}
                section={section}
                itemType="archivos"
                itemId={file.id}
                handleRefresh={handleRefresh || (() => {})}
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
