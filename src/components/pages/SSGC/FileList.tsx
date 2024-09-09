import React from "react";
import pdfIcon from "../../../../public/assets/pdf-icon.svg";
import docIcon from "../../../../public/assets/doc-icon.svg";
import xlsxIcon from "../../../../public/assets/xlsx-file.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

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
      {/*  ({(file.size / 1024).toFixed(2)} KB) */}
      {files.map((file) => (
        <div
          key={file.id}
          className="flex flex-col items-center p-4 bg-gray-100 rounded-md dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
          title={`${file.name} - ${file.size / 1024} KB`}
          // onClick={() => handleFileOpen(file)}
        >
          <img
            src={getIcon(file.mimeType)}
            alt="file-icon"
            className="w-16 h-16 mb-2"
          />

          <p className="text-sm font-medium text-center text-gray-700 dark:text-gray-300 truncate w-full">
            {file.name}
          </p>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Nuevo
                <ChevronDownIcon
                  arial-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    onClick={() => onDelete(file.id, "archivo")}
                  >
                    Eliminar
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>

          {/* <button onClick={() => onDownload(file.id, file.name)}>Descargar</button>
                    <button onClick={() => onDelete(file.id, "archivo")}>Eliminar</button> */}
        </div>
      ))}
    </div>
  );
};

export default FileList;
