import React from "react";
import pdfIcon from "../../../../public/assets/pdf-icon.svg";
import docIcon from "../../../../public/assets/doc-icon.svg";
import xlsxIcon from "../../../../public/assets/xlsx-file.svg";
import ItemManu from "./ItemManu";

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
}

const FileList: React.FC<FileListProps> = ({ files, onDownload, onDelete }) => {
  const getIcon = (mimeType: string) => {
    switch (mimeType) {
      case "application/pdf":
        return pdfIcon;
      case "application/msword":
        return docIcon;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return xlsxIcon;
      default:
        return pdfIcon;
    }
  };

  const handleFileOpen = (file: File) => {
    // * validar que solo se puedan abrir archivos pdf
    if (file.mimeType == "application/pdf") {
      window.open(
        `http://localhost:3600/api/v1/uploads/${file.path}`,
        "_blank"
      );
      return;
    } else {
      onDownload(file.id, file.name);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex flex-col  items-center p-4 bg-gray-100 rounded-md dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
          title={`${file.name} - ${file.size / 1024} KB`}
        >
          <div onClick={() => handleFileOpen(file)}>
            <img
              src={getIcon(file.mimeType)}
              alt="file-icon"
              className="w-16 h-16 mb-2"
            />

            <p className="text-sm font-medium text-center text-gray-700 dark:text-gray-300 truncate w-full">
              {file.name}
            </p>
          </div>

          <ItemManu onDelete={() => onDelete(file.id, "archivo")}/>

          {/* <button onClick={() => onDownload(file.id, file.name)}>Descargar</button>
                    <button onClick={() => onDelete(file.id, "archivo")}>Eliminar</button> */}
        </div>
      ))}
    </div>
  );
};

export default FileList;
