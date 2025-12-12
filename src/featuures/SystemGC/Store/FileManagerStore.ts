import { create } from "zustand";
import { FolderContents } from "../Types/IFileManager";
import { api, createFolder, deleteItem, downloadFile, getFolderContent, renameItems, uploadFile } from "@/utils/api-config";
import { toast } from "react-toastify";


interface FileManagerState {
    currentFolderId: string | null;
    path: { id: string; name: string }[];
    contents: FolderContents | null;
    isLoading: boolean;
    error: string | null;
    section: string | null;
    setSection: (section: string) => void;
    fetchContents: (folderId?: string) => Promise<void>;
    createNewFolder: (name: string, onSuccess?: () => void) => Promise<void>;
    uploadNewFile: (data: FormData, folderId: string | number, onSuccess?: () => void) => Promise<void>;
    deleteItemById: (id: string, type: "carpetas" | "archivo") => Promise<void>;
    downloadFileById: (id: string, fileName: string) => Promise<void>;
    navigateToFolder: (folderId: string, folderName: string) => void;
    navigateBackToFolder: (folderId: string) => void;
    renameItem: (id: string, newName: string, type: "carpetas" | "archivo", onSuccess?: () => void) => Promise<void>;
    moveItem: (itemId: number, newParentId: string, type: "carpetas" | "archivo") => Promise<boolean>;
}

const useFileManagerStore = create<FileManagerState>((set, get) => ({
    currentFolderId: null,
    path: [{ id: "", name: "Inicio"}],
    contents: null,
    isLoading: false,
    error: null,
    section: "sgc",

    setSection: (newSection: string) => {
        set({ 
            section: newSection,
            currentFolderId: null,
            path: [{ id: "", name: "Inicio" }],
            contents: null,
            error: null,
        });
        get().fetchContents();
    },


    fetchContents: async (folderId?: string) => {
        try {
            set({ isLoading: true, error: null });

            const section = get().section || "sgc";

            const response = await getFolderContent(section, folderId);

            set({ contents: response.data, error: null });

        } catch (error: any) {
            const errorMsg = error.response?.status === 500 
            ? "Error del servidor. Por favor, intente nuevamente más tarde."
            : error.response?.data?.message || "Error al cargar el contenido";
            set({ error: errorMsg });
        } finally {
            set({ isLoading: false });
        }
    },

    createNewFolder: async (name: string, onSuccess?: () => void) => {
        try {
            set({ error: null });
            const section = get().section || "sgc";
            await createFolder(get().currentFolderId || null, name, section);
            await get().fetchContents(get().currentFolderId || undefined);
            onSuccess?.();
        } catch (error: any) {
            const errorMsg = error.response?.status === 500 
            ? "Error del servidor. Por favor, intente nuevamente más tarde."
            : error.response?.data?.message || "Error al crear la carpeta";
            set({ error: errorMsg });
        }
    },
    uploadNewFile: async (data: FormData, folderId: string | number, onSuccess?: () => void) => {
        try {
            set({ error: null });
            await uploadFile(data, folderId);
            await get().fetchContents(folderId?.toString() || undefined);
            onSuccess?.();
        } catch (error: any) {
            const errorMsg = error.response?.status === 500 
            ? "Error del servidor. Por favor, intente nuevamente más tarde."
            : error.response?.data?.message || "Error al subir el archivo";
            set({ error: errorMsg });
        }
    },
    deleteItemById: async (id: string, type: "carpetas" | "archivo") => {
        try {
            set({ error: null });
            await deleteItem(id, type);
            await get().fetchContents(get().currentFolderId || undefined);
            toast.success(
                type === "carpetas"
                    ? "Carpeta eliminada con éxito!"
                    : "Archivo eliminado con éxito!"
            );
        } catch (error: any) {
            const errorMsg = error.response?.status === 500 
            ? "Error del servidor. Por favor, intente nuevamente más tarde."
            : error.response?.data?.message || "Error al eliminar";
            set({ error: errorMsg });
        }
    },
    downloadFileById: async (id: string, fileName: string) => {
        try {
            
            const response = await downloadFile(id);

            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers["content-type"]}));

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName || `file_${id}`);
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);

        } catch (error: any) {
            const errorMsg = error.response.status === 500 
            ? "Error del servidor. Por favor, intente nuevamente más tarde."
            : error.response?.data?.message;
            set({ error: errorMsg });
        }
    },
    navigateToFolder: (folderId: string, folderName: string) => {
        set(state => ({
            currentFolderId: folderId,
            path: [...state.path, { id: folderId, name: folderName }]
        }));
        get().fetchContents(folderId);
    },
    
    navigateBackToFolder: (folderId: string) => {
        set(state => {
            const newPath = state.path.slice(
                0,
                state.path.findIndex((f) => f.id === folderId) + 1
            );
            return {
                currentFolderId: folderId,
                path: newPath
            };
        });
        get().fetchContents(folderId);
    },
    renameItem: async (id: string, newName: string, type: "carpetas" | "archivo", onSuccess?: () => void) => {
        try {
            set({ error: null });
            await renameItems(id, get().currentFolderId || null, newName, type);
            await get().fetchContents(get().currentFolderId || undefined);
            onSuccess?.();
        } catch (error: any) {
            const errorMsg = error.response?.status === 500 
            ? "Error del servidor. Por favor, intente nuevamente más tarde."
            : error.response?.data?.message || "Error al renombrar el elemento";
            set({ error: errorMsg });
        }
    },
    moveItem: async (itemId: number, newParentId: string, type: "carpetas" | "archivo") => {
        try {
            set({ error: null });
            
            await api.put(`/${type}/${itemId}/move`, { 
                newParentId,
                section: get().section
            });

            await get().fetchContents(get().currentFolderId || undefined);
            toast.success("Movimiento realizado con éxito!");
            return true;

        } catch (error: any) {
            const errorMsg = error.response?.status === 500 
            ? "Error del servidor. Por favor, intente nuevamente más tarde."
            : error.response?.data?.message || "Error al mover el elemento";
            set({ error: errorMsg });
            return false;
        }
    },

}));

export default useFileManagerStore;