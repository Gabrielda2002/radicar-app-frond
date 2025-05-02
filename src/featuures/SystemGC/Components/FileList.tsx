import React from "react";
import pdfIcon from "@/../public/assets/pdf-file.svg";
import docIcon from "@/../public/assets/docx-file.svg";
import xlsxIcon from "@/../public/assets/excel-file.svg";
import ItemManu from "./ItemManu";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "@/context/authContext";

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
}

const FileList: React.FC<FileListProps> = ({
  files,
  onDownload,
  onDelete,
  renameItem,
}) => {

  const { rol } = useAuth();

  const getIcon = (mimeType: string) => {
    switch (mimeType) {
      case "application/pdf":
        return pdfIcon;
      case "application/msword":
        return docIcon;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return xlsxIcon;
      default:
        return docIcon;
    }
  };

  const handleFileOpen = (file: File) => {
    let filePath = file.path;
    // Si la ruta es absoluta y contiene 'uploads', la convertimos a relativa
    if (/^[A-Za-z]:\\/.test(filePath) && filePath.includes('uploads')) {
      // Extraer la parte desde 'uploads' y anteponer '../../'
      const uploadsIndex = filePath.indexOf('uploads');
      if (uploadsIndex !== -1) {
        filePath = '../../' + filePath.substring(uploadsIndex).replace(/\\/g, '/');
      }
    }
    if (file.mimeType === "application/pdf") {
      window.open(`${import.meta.env.VITE_URL_BACKEND}/api/v1/v1${filePath}`, "_blank");
    } else {
      onDownload(file.id, file.name);
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
    toast.success("Archivo renombrado con éxito!", {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
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
            />
          </div>
          )}

          {/* Icono del archivo */}
          <div
            onClick={() => handleFileOpen(file)}
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
  );
};

export default FileList;
