import React from "react";
import pdfIcon from "../../../../public/assets/pdf-file.svg";
import docIcon from "../../../../public/assets/docx-file.svg";
import xlsxIcon from "../../../../public/assets/excel-file.svg";
import ItemManu from "./ItemManu";
import { Bounce, toast } from "react-toastify";

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
    // Validar que solo se puedan abrir archivos PDF
    if (file.mimeType === "application/pdf") {
      window.open(
        `http://localhost:3600/api/v1/radicacion/uploads/${file.path}`,
        "_blank"
      );
      return;
    } else {
      onDownload(file.id, file.name);
    }
  };

  const handleDelete = (fileId: string) => {
    // Llama a la función de eliminación
    onDelete(fileId, "archivo");

    // Mostrar notificación después de eliminar el archivo
    toast.success("Archivo eliminado con éxito!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const handleRename = (fileId: string, newName: string) => {
    //LLama la funcion de renombrar archivo
    renameItem(fileId, newName, "archivo");
    //Mostrar notificación después de renombrar el archivo
    toast.success("Archivo renombrado con éxito!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="relative flex flex-col items-center p-4 bg-gray-200 rounded-md cursor-pointer dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600"
          title={`${file.name} - ${file.size / 1024} KB`}
        >
          {/* Contenedor para el icono y el nombre del archivo */}
          <div
            onClick={() => handleFileOpen(file)}
            className="flex flex-col items-center"
          >
            <img
              src={getIcon(file.mimeType)}
              alt="file-icon"
              className="w-16 h-16 mb-2"
            />

            <p className="w-full text-sm font-medium text-center text-gray-700 truncate dark:text-gray-300">
              {file.name}
            </p>
          </div>

          {/* Menú en la esquina superior derecha */}
          <div
            className="absolute top-0 right-0 mt-2 mr-2"
            onClick={(e) => e.stopPropagation()} // Evitar que el clic aquí abra el archivo
          >
            <ItemManu
              onDelete={() => handleDelete(file.id)}
              renameItem={(newName: string) => handleRename(file.id, newName)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;
