import React from "react";
import pdfIcon from "../../../../public/assets/pdf-icon.svg";
import docIcon from "../../../../public/assets/doc-icon.svg";
import xlsxIcon from "../../../../public/assets/xlsx-file.svg";

interface File {
  id: string;
  name: string;
  size: number;
  mimeType: string;
}

interface FileListProps {
  files: File[];
  onDelete: (id: string, type: "carpetas" | "archivo") => void;
  onDownload: (id: string, fileName: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files }) => {
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

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {/*  ({(file.size / 1024).toFixed(2)} KB) */}
      {files.map((file) => (

        <div key={file.id}
        className="flex flex-col items-center p-4 bg-gray-100 rounded-md dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
        title={`${file.name} - ${file.size / 1024} KB`}
        >
          <img
            src={getIcon(file.mimeType)}
            alt="file-icon"
            className="w-16 h-16 mb-2"
          />

          <p className="text-sm font-medium text-center text-gray-700 dark:text-gray-300 truncate w-full">
            {file.name}
          </p>

          {/* <button onClick={() => onDownload(file.id, file.name)}>Descargar</button>
                    <button onClick={() => onDelete(file.id, "archivo")}>Eliminar</button> */}
        </div>
      ))}
    </div>
  );
};

export default FileList;
