import React, { useState } from "react";
import ItemMenu from "./ItemMenu";
import { useAuth } from "@/context/authContext";
import PdfViewer from "@/components/common/PDFViewer/PdfViewer";
import { useSecureFileAccess } from "../Hooks/useSecureFileAccess";
import { FileItem } from "../Types/IFileManager";
import useFileManagerStore from "../Store/useFileManagerStore";
import { api } from "@/utils/api-config";
import { toast } from "react-toastify";

const SECURE_FILE_ENDPOINTS: Record<string, { gen: string; sec: string }> = {
  files: { gen: "files", sec: "secure-file" },
  soporte: { gen: "soportes", sec: "secure-soporte" },
};

const getLocalSecureFileUrl = async (id: string, type: "files" | "soporte" = "files") => {
  const { gen, sec } = SECURE_FILE_ENDPOINTS[type] || SECURE_FILE_ENDPOINTS.files;
  const { data } = await api.post(`/${gen}/${id}/access-token?action=VIEW`);
  return `${import.meta.env.VITE_URL_BACKEND}/api/v1/${sec}/${data.token}`;
};

const ICONS: Record<string, string> = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "excel",
};

const FileList: React.FC<{ files: FileItem[] }> = ({ files }) => {
  const { rol } = useAuth();
  const { deleteItemById } = useFileManagerStore();
  const { openSecureFile, downloadSecureFile } = useSecureFileAccess();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileOpen = async (file: FileItem, action: "VIEW" | "DOWNLOAD" = "VIEW", type: "files" | "soporte" = "files") => {
    if (file.mimeType !== "application/pdf") return downloadSecureFile(file.id, type);
    if (action !== "VIEW") return openSecureFile(file.id, action, type);
    
    try {
      setPdfUrl(await getLocalSecureFileUrl(file.id, type));
    } catch (error) {
      console.error("Error al obtener la URL del PDF:", error);
      toast.error("No se pudo abrir el documento PDF");
    }
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
            {[1, 4].includes(Number(rol)) && (
              <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
                <ItemMenu
                  onDelete={() => deleteItemById(file.id, "archivo")}
                  itemName={file.name}
                  itemType="archivo"
                  itemId={file.id}
                  nameItemOld={file.name}
                />
              </div>
            )}

            <div onClick={() => handleFileOpen(file)} className="flex flex-col items-center">
              <img
                src={`/assets/${ICONS[file.mimeType] || "docx"}-file.svg`}
                alt="file-icon"
                className="w-8 h-8 mb-2 md:w-16 md:h-16"
              />
            </div>

            <p className="w-full text-sm font-medium text-center truncate dark:text-gray-300" title={file.name}>
              {file.name}
            </p>
          </div>
        ))}
      </div>

      {pdfUrl && (
        <PdfViewer
          pdfFile={pdfUrl}
          onClose={() => setPdfUrl(null)}
          isOpen={!!pdfUrl}
        />
      )}
    </>
  );
};

export default FileList;