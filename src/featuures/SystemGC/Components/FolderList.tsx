//*Fuctions and Hooks
import React, { useMemo, useState } from "react";
import ItemMenu from "./ItemMenu";
import DepartmentSection from "./DepartmentSection";
import useFileManagerStore from "../Store/useFileManagerStore";

//*Icons
import { FolderIcon } from "@heroicons/react/24/outline";
import SuhIcon from "@/assets/sgc/suh/suh-icon.svg?react";
import SstIcon from "@/assets/sgc/suh/sst-icon.svg?react";
import InfIcon from "@/assets/sgc/suh/cdi-icon.svg?react";
import DtacionIcon from "@/assets/sgc/sgc/dot-icos.svg?react";
import MedicIcon from "@/assets/sgc/suh/capsule-icon.svg?react";
import PcpIcon from "@/assets/sgc/suh/hospital-icon.svg?react";
import DocIcon from "@/assets/sgc/suh/doc-icon.svg?react";
import PrcsIcon from "@/assets/sgc/cdi/loader.svg?react";
import StdIcon from "@/assets/sgc/cdi/book.svg?react";
import StaffIcon from "@/assets/sgc/cdi/staff-icon.svg?react";
import ProcssIcon from "@/assets/sgc/sgc/process.svg?react";
import PamecIcon from "@/assets/sgc/suh/face-mask.svg?react";
import { useAuth } from "@/context/authContext";
import { Folder } from "../Types/IFileManager";
import Button from "@/components/common/Ui/Button";
import { getIconById } from "../constants/iconCatalog";

interface FolderListProps {
  folders: Folder[];
  isInFolder: boolean;
}

type IconComponent = React.ComponentType<{ className?: string }>;

const FolderList: React.FC<FolderListProps> = ({
  folders,
  isInFolder,
}) => {
  const { rol } = useAuth();
  const { navigateToFolder, deleteItemById, section } = useFileManagerStore();

  const [expandAll, setExpandAll] = useState<boolean>(true);

  const foldersByDepartment = useMemo(() => {
    if (isInFolder) {
      return null;
    }

    const grouped = folders.reduce((acc, folder) => {
      const deptId = folder.idDepartment.toString();
      const deptName = folder.departmentRelation.name;

      if (!acc[deptId]) {
        acc[deptId] = {
          id: Number(folder.idDepartment),
          name: deptName,
          folders: [],
        };
      }

      acc[deptId].folders.push(folder);
      return acc;
    }, {} as Record<string, { id: number; name: string; folders: Folder[] }>);

    return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
  }, [folders, isInFolder]);

  const getIconForFolderByName = (folderName: string): IconComponent | null => {
    if (section === "suh") {
      switch (folderName) {
        case "TALENTO HUMANO":
          return SuhIcon;
        case "INFRAESTRUCTURA":
          return InfIcon;
        case "DOTACION":
          return DtacionIcon;
        case "MEDICAMENTOS":
          return MedicIcon;
        case "PROCESOS PRIORITARIOS":
          return PcpIcon;
        case "HISTORIA CLINICA Y REGISTROS":
          return DocIcon;
        case "INTERDEPENDENCIA":
          return DocIcon;
        default:
          return SuhIcon;
      }
    } else if (section === "sst") {
      return SstIcon;
    } else if (section === "ci") {
      switch (folderName) {
        case "PROCEDIMIENTOS OPERATIVOS ESTANDAR":
          return PrcsIcon;
        case "NORMATIVIDAD LEGAL":
          return DocIcon;
        case "ESTUDIOS":
          return StdIcon;
        case "STAFF":
          return StaffIcon;
        default:
          return PrcsIcon;
      }
    } else if (section === "sgc") {
      switch (folderName) {
        case "MODELO DE ATENCION":
          return StaffIcon;
        case "POLITICAS":
          return DocIcon;
        case "PROCESOS":
          return ProcssIcon;
        case "PAMEC":
          return PamecIcon;
        default:
          return ProcssIcon;
      }
    } else {
      return SuhIcon;
    }
  };

  const getIconForFolder = (folder: Folder): IconComponent | null => {
    if (isInFolder) {
      return null;
    }
    if (folder.icon) {
      return getIconById(folder.icon);
    }
    return getIconForFolderByName(folder.name);
  };

  if (isInFolder) {
    return (
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
        {folders.map((folder) => {
          const CustomIcon = getIconForFolder(folder);

          return (
            <div
              key={folder.id}
              onClick={() => navigateToFolder(folder.id.toString(), folder.name)}
              className="relative flex flex-col items-center p-4 text-gray-700 duration-500 bg-gray-100 border-2 rounded-md shadow-sm cursor-pointer dark:shadow-indigo-500 dark:border-gray-700 dark:bg-gray-700 hover:shadow-lg dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-indigo-500 dark:hover:underline"
            >
              {CustomIcon ? (
                <CustomIcon className="w-8 h-8 md:w-16 md:h-16 text-gray-700 dark:text-colorIcon transition-colors duration-300" />
              ) : (
                <FolderIcon className="w-16 h-16 text-gray-700 dark:text-white" />
              )}

              {[1, 4].includes(Number(rol)) && (
                <div
                  className="absolute top-2 right-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ItemMenu
                    onDelete={() => deleteItemById(folder.id.toString(), "carpetas")}
                    itemName={folder.name}
                    itemType="carpetas"
                    itemId={folder.id.toString()}
                    nameItemOld={folder.name}
                    currentIcon={folder.icon ?? null}
                  />
                </div>
              )}

              <p className="flex flex-wrap text-sm font-bold text-center text-gray-700 dark:text-stone-200">
                {folder.name}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {foldersByDepartment && foldersByDepartment.length > 0 ? (
        <>
          <div className="flex justify-end mb-4">
            <Button
              variant="secondary"
              onClick={() => setExpandAll(!expandAll)}
            >
              {expandAll ? "Colapsar Todo" : "Expandir Todo"}
            </Button>
          </div>

          {foldersByDepartment.map((department) => (
            <DepartmentSection
              key={department.id}
              departmentName={department.name}
              departmentId={department.id}
              folders={department.folders}
              folderCount={department.folders.length}
              defaultExpanded={expandAll}
              getIconForFolder={getIconForFolder}
              rol={rol}
            />
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
          <p className="text-lg">No hay carpetas disponibles</p>
        </div>
      )}
    </div>
  );
};

export default FolderList;