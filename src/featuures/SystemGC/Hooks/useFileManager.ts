import { useState, useEffect } from "react";
import {
  api,
  createFolder,
  deleteItem,
  downloadFile,
  getFolderContent,
  renameItems,
  uploadFile,
} from "@/utils/api-config";
import { toast } from "react-toastify";

interface FileItem {
  // Renombrado de File a FileItem
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

export const useFileManager = (
  section: string,
  initialFolderId?: string,
  refreshKey?: number
) => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(
    initialFolderId || null
  );
  const [path, setPath] = useState<{ id: string; name: string }[]>([
    { id: "", name: "Inicio" },
  ]);
  const [contents, setContents] = useState<FolderContents | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPath([{ id: "", name: "Inicio" }]);
    setCurrentFolderId(null);
    setContents(null);
  }, [section]);

  // funcion para traer el contenido de la carpeta
  const fetchContents = async () => {
    setLoading(true);
    try {
      const response = await getFolderContent(
        section,
        currentFolderId || undefined
      );
      setContents(response.data);
      setError(null);
    } catch (err: any) {
      if (err.response?.status === 500) {
        setError(
          "Error del servidor. Por favor, intente nuevamente más tarde."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Error al cargar el contenido de la carpeta."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, [currentFolderId, section, refreshKey]); // Dependiendo de currentFolderId y section

  useEffect(() => {
    setCurrentFolderId(initialFolderId || null);
  }, [initialFolderId]);

  // Function to create a new folder
  const createNewFolder = async (name: string) => {
    try {
      await createFolder(currentFolderId || null, name, section);
      await fetchContents();
      toast.success("Carpeta creada con éxito!");
    } catch (err: any) {
      if (err.response?.status === 500) {
        setError(
          "Error del servidor. Por favor, intente nuevamente más tarde."
        );
      } else {
        setError(`Error al crear la carpeta: ${err.response?.data?.message}`);
      }
    }
  };

  // funcion para subir un archivo
  const uploadNewFile = async (formData: FormData, id: number | string) => {
    try {
      await uploadFile(formData, id);
      await fetchContents();
      toast.success("Archivo subido con éxito!") 
    } catch (err: any) {
      if (err.response?.status === 500) {
        setError(
          "Error del servidor. Por favor, intente nuevamente más tarde."
        );
      } else {
        setError(`Error al subir el archivo: ${err.response?.data?.message}`);
      }
    }
  };

  // Function to delete an item (folder or file)
  const deleteItemById = async (id: string, type: "carpetas" | "archivo") => {
    try {
      await deleteItem(id, type);
      await fetchContents();
      toast.success(
        type === "carpetas"
          ? "Carpeta eliminada con éxito!"
          : "Archivo eliminado con éxito!"
      );
    } catch (err: any) {
      if (err.response?.status === 500) {
        setError(
          "Error del servidor. Por favor, intente nuevamente más tarde."
        );
      } else {
        setError(
          `Error al eliminar ${
            type === "carpetas" ? "la carpeta" : "el archivo"
          }: ${err.response?.data?.message}`
        );
      }
    }
  };

  // Function to download a file
  const downloadFileById = async (fileId: string, fileName: string) => {
    try {
      const response = await downloadFile(fileId);
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: response.headers["content-type"] })
      );
      const link = document.createElement("a");
      link.href = url;

      // Set the download attribute with the real file name
      link.setAttribute("download", fileName || `file_${fileId}`);
      document.body.appendChild(link);
      link.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      if (err.response?.status === 500) {
        setError(
          "Error del servidor. Por favor, intente nuevamente más tarde."
        );
      } else {
        setError(err.response?.data?.message);
      }
    }
  };

  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setPath((prevPath) => [...prevPath, { id: folderId, name: folderName }]);
  };

  const navigateBackToFolder = (folderId: string) => {
    setCurrentFolderId(folderId);
    setPath((prevPath) => {
      const newPath = prevPath.slice(
        0,
        prevPath.findIndex((f) => f.id === folderId) + 1
      );
      return newPath;
    });
  };

  // * renombrar items del sgc

  const renameItem = async (
    id: string,
    name: string,
    type: "carpetas" | "archivo"
  ) => {
    try {
      setLoading(true);
      await renameItems(id, currentFolderId || null, name, type);
      await fetchContents(); 
      toast.success("Renombrado con éxito!");
    } catch (err: any) {
      if (err.response?.status === 500) {
        setError(
          "Error del servidor. Por favor, intente nuevamente más tarde."
        );
      } else {
        setError(err.response?.data?.message);
      }
    }finally{
      setLoading(false);
    }
  };

  const moveItem = async (
    itemId: number,
    newParentId: string,
    type: "carpetas" | "archivos"
  ): Promise<boolean> => {
    try {
      setLoading(true);
      await api.put(`/${type}/${itemId}/move`, { newParentId, section });
      await fetchContents();
      toast.success("Movimiento realizado con éxito!");
      return true;
    } catch (error: any) {
      if (error.response?.status === 500) {
        setError(
          "Error del servidor. Por favor, intente nuevamente más tarde."
        );
      } else {
        setError(error.response?.data?.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

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
    moveItem,
  };
};
