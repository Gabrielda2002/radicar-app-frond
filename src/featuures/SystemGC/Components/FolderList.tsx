//*Fuctions and Hooks
import React from "react";
import ItemManu from "./ItemManu";
import { Bounce, toast } from "react-toastify";

//*Icons
import { FolderIcon } from "@heroicons/react/24/outline";
import suhIcon from "@/assets/sgc/suh/suh-icon.svg"
import sstIcon from "@/assets/sgc/suh/sst-icon.svg"
import infIcon from "@/assets/sgc/suh/cdi-icon.svg"
import dtacionIcon from "@/assets/sgc/sgc/dot-icos.svg"
import medicIcon from "@/assets/sgc/suh/capsule-icon.svg"
import pcpIcon from "@/assets/sgc/suh/hospital-icon.svg"
import docIcon from "@/assets/sgc/suh/doc-icon.svg"

import prcsIcon from "@/assets/sgc/cdi/loader.svg"
import stdIcon from "@/assets/sgc/cdi/book.svg"
import staffIcon from "@/assets/sgc/cdi/staff-icon.svg"

import procssIcon from '@/assets/sgc/sgc/process.svg'
import pamecIcon from '@/assets/sgc/suh/face-mask.svg'
import { useAuth } from "@/context/authContext";

interface Folder {
  id: string;
  name: string;
}

interface FolderListProps {
  folders: Folder[];
  onFolderClick: (folderId: string, folderName: string) => void;
  onDelete: (id: string, type: "carpetas" | "archivo") => void;
  renameItem: (
    id: string,
    newName: string,
    type: "carpetas" | "archivo"
  ) => void;
  isInFolder: boolean;
  section: string;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  onFolderClick,
  onDelete,
  renameItem,
  isInFolder,
  section
}) => {
  
  const handleDelete = (folderId: string) => {
    //Llama ka funcion de eliminacion
    onDelete(folderId, "carpetas");
    //Muestra la notificacion  despues de eliminar la carpeta
    toast.success("Carpeta eliminada con éxito!", {
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

  const { rol } = useAuth();

  const handleRename = (folderId: string, newName: string) => {
    //Llama la funcion de renombrado
    renameItem(folderId, newName, "carpetas");

    //Muestra la notificacion despues de renombrar la carpeta
    toast.success("Carpeta renombrada con éxito!", {
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

  // Función para determinar el icono según la sección y nombre de carpeta
  const getIconForFolder = (folderName: string): string => {
    if (isInFolder) {
      // Si estamos dentro de una carpeta, no usamos iconos personalizados
      return "";
    }
    
    if (section === "suh") {
      switch (folderName) {
        case "TALENTO HUMANO":
          return suhIcon;
        case "INFRAESTRUCTURA":
          return infIcon;
        case "DOTACION":
          return dtacionIcon;
        case "MEDICAMENTOS":
          return medicIcon;
        case "PROCESOS PRIORITARIOS":
          return pcpIcon;
        case "HISTORIA CLINICA Y REGISTROS":
          return docIcon;
        case "INTERDEPENDENCIA":
          return docIcon;
        default:
          return suhIcon;
      }
    } else if (section === "sst") {
      return sstIcon;
    } else if (section === "ci") {

      switch (folderName) {
        case "PROCEDIMIENTOS OPERATIVOS ESTANDAR" :
          return prcsIcon;
        case "NORMATIVIDAD LEGAL" :
          return docIcon;
        case "ESTUDIOS":
          return stdIcon;
        case "STAFF":
          return staffIcon;
        default:
          return prcsIcon;
      }
    }else if (section === "sgc") {
      switch (folderName) {
        case "MODELO DE ATENCION":
          return staffIcon;
        case "POLITICAS":
          return docIcon;
        case "PROCESOS":
          return procssIcon;
        case "PAMEC":
          return pamecIcon;
        default:
          return procssIcon;
      }
    } else {
      return suhIcon;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
      {folders.map((folder) => {
        // Determinar el icono para esta carpeta específica
        const customIcon = getIconForFolder(folder.name);
        // const useCustomIcon = !isInFolder && customIcon;
        
        return (
          <div
            key={folder.id}
            onClick={() => onFolderClick(folder.id, folder.name)} // Se abre la carpeta
            className="relative flex flex-col items-center p-4 text-gray-700 duration-500 bg-gray-100 border-2 rounded-md shadow-sm cursor-pointer dark:shadow-indigo-500 dark:border-gray-700 dark:bg-gray-700 hover:shadow-lg dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-indigo-500 dark:hover:underline"
          >
            {!isInFolder && customIcon ? (
              <div>
                <img
                  src={customIcon}
                  alt="Icono de la carpeta"
                  className="w-8 h-8 md:w-16 md:h-16"
                />
              </div>
            ) : (
              <FolderIcon className="w-16 h-16 text-gray-700 dark:text-white" />
            )}
            {/* Menú en la esquina superior derecha */}
            {[1, 4].includes(Number(rol)) && (
              <div
                className="absolute top-2 right-2"
                onClick={(e) => e.stopPropagation()} // Evitar que el clic aquí abra la carpeta
              >
                <ItemManu
                  onDelete={() => handleDelete(folder.id)}
                  renameItem={(newName: string) =>
                    handleRename(folder.id, newName)
                  }
                />
              </div>
            )}

            {/* Nombre de la carpeta */}
            <p className="flex flex-wrap text-sm font-bold text-center text-gray-700 dark:text-stone-200">
              {folder.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FolderList;