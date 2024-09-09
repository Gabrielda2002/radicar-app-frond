import { useState, useEffect } from "react";
import { createFolder, deleteItem, downloadFile, getFolderContent, renameItems, uploadFile } from "../utils/api-config";

interface FileItem { // Renombrado de File a FileItem
    id: string;
    name: string;
    size: number;
    mimeType: string;
    createdAt: string;
    updatedAt: string;
    path: string;
}

interface Folder {
    id: string;
    name: string;
    path: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface FolderContents {
    files: FileItem[]; // Actualizado a FileItem
    folders: Folder[];
}

export const useFileManager = (initialFolderId?: string) => {
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(initialFolderId || null);
    const [ path, setPath] = useState<{id: string; name: string}[]>([
        {id: "", name: "Inicio"}
    ])
    const [contents, setContents] = useState<FolderContents | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch folder contents
    const fetchContents = async () => {
        setLoading(true);
        try {

            const response = await getFolderContent(currentFolderId || undefined);
            setContents(response.data);
            setError(null);
        } catch (err) {
            setError(`Error fetching folder contents${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContents();
    }, [currentFolderId]);

    // Function to create a new folder
    const createNewFolder = async (name: string) => {
        // if (!currentFolderId) return;
        try {
            await createFolder(currentFolderId || null, name);
            await fetchContents(); // Reload contents after creating a folder
        } catch (err) {
            setError(`Error creating folder${err}`);
        }
    };

    // Function to upload a new file
    const uploadNewFile = async (formData: FormData, id: number | string) => { // Usa el tipo global File ahora
        // if (!currentFolderId) return;
        try {
            await uploadFile(formData, id);
            await fetchContents(); // Reload contents after uploading a file
        } catch (err) {
            setError(`Error uploading file ${err}`);
        }
    };

    // Function to delete an item (folder or file)
    const deleteItemById = async (id: string, type: "carpetas" | "archivo") => {
        try {
            await deleteItem(id, type);
            await fetchContents(); // Reload contents after deleting an item
        } catch (err) {
            setError(`Error deleting ${type === "carpetas" ? "folder" : "file"} ${err}`);
        }
    };

    // Function to download a file
    const downloadFileById = async (fileId: string, fileName: string) => { 
        try {
            const response = await downloadFile(fileId);
            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            const link = document.createElement('a');
            link.href = url;
    
            // Set the download attribute with the real file name
            link.setAttribute('download', fileName || `file_${fileId}`);
            document.body.appendChild(link);
            link.click();
    
            // Clean up the URL object
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(`Error downloading file ${err}`);
        }
    };
    

    const navigateToFolder = (folderId: string, folderName:string) => {
        setCurrentFolderId(folderId);
        setPath((prevPath) => [...prevPath, {id: folderId, name: folderName}])
    }

    const navigateBackToFolder = (folderId: string) => {
        setCurrentFolderId(folderId);
        setPath((prevPath) => {
            const newPath = prevPath.slice(0, prevPath.findIndex(f => f.id === folderId ) + 1);
            return newPath;
        })
    }

    // * renombrar items del sgc

    const renameItem = async (id: string, name: string, type: "carpetas" | "archivo") => {
        try {
            await renameItems(id, currentFolderId || null, name, type);
            await fetchContents(); // Reload contents after renaming an item
        } catch (err) {
            setError(`Error renaming ${type === "carpetas" ? "folder" : "file"} ${err}`);
        }
    }

    return {
        contents,
        loading,
        error,
        createNewFolder,
        uploadNewFile,
        deleteItemById,
        downloadFileById,
        setCurrentFolderId: navigateToFolder,
        navigateBackToFolder,
        path,
        renameItem
    };
};
