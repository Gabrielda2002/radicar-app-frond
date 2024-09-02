import React from "react";
import { useFileManager } from "../../hooks/useFileManager";
import FolderList from "./SSGC/FolderList";
import FileList from "./SSGC/FileList";


const FileManager: React.FC = () => {
    const { contents, loading, error, createNewFolder, uploadNewFile, deleteItemById, downloadFileById, setCurrentFolderId } = useFileManager();

    console.log(setCurrentFolderId)

    console.log(contents)
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <button onClick={() => createNewFolder("Nueva Carpeta")}>Nueva Carpeta</button>
            <input type="file" onChange={(e) => e.target.files && uploadNewFile(e.target.files[0])} />

            <FolderList folders={contents?.folders || []} onFolderClick={setCurrentFolderId} onDelete={deleteItemById} />
            <FileList files={contents?.files || []} onDelete={deleteItemById} onDownload={downloadFileById} />
        </>
    );
};

export default FileManager;
