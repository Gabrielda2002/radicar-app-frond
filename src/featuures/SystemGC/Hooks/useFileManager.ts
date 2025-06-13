import { useState, useEffect } from "react";
import { api, createFolder, deleteItem, downloadFile, getFolderContent, renameItems, uploadFile } from "@/utils/api-config";

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

export const useFileManager = (section: string, initialFolderId?: string) => {
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(initialFolderId || null);
    const [ path, setPath] = useState<{id: string; name: string}[]>([
        {id: "", name: "Inicio"}
    ])
    const [contents, setContents] = useState<FolderContents | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setPath([{id: "", name: "Inicio"}])
        setCurrentFolderId(null)
        setContents(null)
    } , [section])

    // funcion para traer el contenido de la carpeta
    const fetchContents = async () => {
        setLoading(true);
        try {
            console.log("re renderizando useFileManager");
            const response = await getFolderContent(section ,currentFolderId || undefined );
            setContents(response.data);
            setError(null);
        } catch (err) {
            setError(`Error al mostrar el contenido de la carpeta. ${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContents();
    }, [currentFolderId, section]);

    useEffect(() => {
        setCurrentFolderId(initialFolderId || null);
    }, [initialFolderId]);

    // Function to create a new folder
    const createNewFolder = async (name: string) => {
        // if (!currentFolderId) return;
        try {
            await createFolder(currentFolderId || null, name, section);
            await fetchContents(); // Reload contents after creating a folder
        } catch (err) {
            setError(`Error al crear la carpeta, intente nuevamente. ${err}`);
        }
    };

    // funcion para subir un archivo
    const uploadNewFile = async (formData: FormData, id: number | string) => { // Usa el tipo global File ahora
        // if (!currentFolderId) return;
        try {
            await uploadFile(formData, id);
            await fetchContents(); // Reload contents after uploading a file
        } catch (err) {
            setError(`Error al subir el archivo, intente nuevamente. ${err}`);
        }
    };

    // Function to delete an item (folder or file)
    const deleteItemById = async (id: string, type: "carpetas" | "archivo") => {
        try {
            await deleteItem(id, type);
            await fetchContents(); // Reload contents after deleting an item
        } catch (err) {
            setError(`Error al eliminar ${type === "carpetas" ? "revisa que la carpeta este vacía" : "file"}, intente nuevamente ${err}`);
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
            setError(`Error al renombrar ${type === "carpetas" ? "la carpeta" : "el archivo"} ${err}.`);
        }
    }

    const moveItem = async (itemId: string, newParentId: string, type: "carpetas" | "archivos") => {
        try {
            await api.put(`/${type}/${itemId}/move`, { newParentId, section });
            await fetchContents(); // Reload contents after moving an item
        } catch (error: any) {
            setError(`Error al mover ${type === "carpetas" ? "la carpeta" : "el archivo"}: ${error.message}`);
            return false;
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
        renameItem,
        section,
        moveItem
    };
};
