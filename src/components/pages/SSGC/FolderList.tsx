import React from "react";

interface Folder {
    id: string;
    name: string;
}

interface FolderListProps {
    folders: Folder[];
    onFolderClick: (folderId: string) => void;
    onDelete: (id: string, type: "carpetas" | "archivo") => void;
}


const FolderList: React.FC<FolderListProps> = ({ folders, onFolderClick, onDelete }) => {
    return (
        <div>
            <h1>
                Carpetas
            </h1>
            {folders.map((folder) => (
                <div key={folder.id}>
                    {/* <h1>Carpetas</h1> */}
                    <span onClick={() => onFolderClick(folder.id)}>{folder.name}</span>
                    <button onClick={() => onDelete(folder.id, "carpetas")}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

export default FolderList;
