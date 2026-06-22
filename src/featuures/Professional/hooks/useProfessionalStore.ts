import { api } from "@/utils/api-config";
import { create } from "zustand";


export type IProfessional = {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;

}

interface UseStoreProfessionalReturn { 
    data: IProfessional[]
    isLoading: boolean
    error: string | null
    getAll: () => void;
    create: (data: Object, onSuccess: () => void) => void;
    update: (id: number, data: Object, onSuccess: () => void) => void;
}

export const useProfessionalStore = create<UseStoreProfessionalReturn>((set) => ({
    data: [],
    isLoading: false,
    error: null,

    getAll: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.get('/professional');
            set({ data: response.data, isLoading: false })
        } catch (error: any) {
            const errorMsg = error.response?.status === 500
                ? "Error del servidor. Por favor, intente nuevamente más tarde."
                : error.response?.data?.message || "Error al cargar el contenido";
            set({ error: errorMsg });
        }finally {
            set({ isLoading: false })
        }
    },
    update: async (id, data, onSuccess) => {
        set({ isLoading: true, error: null})
        try {
            const response = await api.put(`/professional/${id}`, { data });
            
            if (response.status === 200) {
                onSuccess?.();
            }

        } catch (error: any) {
            const errorMsg = error?.response?.status === 500
            ? "Error del servidor, Por favor, intente nuevamente mas tarde."
            : error?.response?.data?.message || "Error actualizar"
            set({ error: errorMsg})
        } finally {
            set({ isLoading: false })
        }
    },

    create: async (data, onSuccess) => {
        set({ isLoading: true })
        try {
            
            const response = await api.post('/professional', { data })
            
            if (response.status === 200) {
                onSuccess?.()
            }

        } catch (error: any) {
            const errorMsg = error?.response?.status === 500
            ? "Error del servidor, Por favor, intente nuevamente mas tarde."
            : error?.response?.data?.message || "Error actualizar"
            set({ error: errorMsg})
        }finally {
            set({ isLoading: false })
        }
    }

}));