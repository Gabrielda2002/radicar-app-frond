import React from "react";
import folderIcon from "../../../../public/assets/folder-sgc.svg";

interface Folder {
  id: string;
  name: string;
}

interface FolderListProps {
  folders: Folder[];
  onFolderClick: (folderId: string, folderName: string) => void;
  onDelete: (id: string, type: "carpetas" | "archivo") => void;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  onFolderClick,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 ">
      {folders.map((folder) => (
        <div
          key={folder.id}
          onClick={() => onFolderClick(folder.id, folder.name)}
          className="flex flex-col items-center p-4 bg-gray-100 rounded-md cursor-pointer dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {/* <h1>Carpetas</h1> */}
          <img src={folderIcon} alt="folder-icon" className="w-16 h-16 mb-2" />
          <span onClick={() => onFolderClick(folder.id, "carpetas")}>
            <p className="text-sm font-medium text-center text-gray-700 dark:">{folder.name}</p>
          </span>
          {/* <button onClick={() => onDelete(folder.id, "carpetas")}>Eliminar</button> */}
        </div>
      ))}
    </div>
  );
};

export default FolderList;
