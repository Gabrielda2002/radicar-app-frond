import { api } from "@/utils/api-config";
import { create } from "zustand";
import { IItemsTv } from "../Models/IItemsTv";

interface UseStoreTv {
    tvs: IItemsTv[];
    error: string | null;
    isLoading: boolean;
    getTvsByHeadquartersId: (headquartersId: number) => Promise<void>;
    createTv: (data: Object, onSuccess?: () => void) => Promise<void>;
    updateTv: (id: number, data: Object, onSuccess?: () => void) => Promise<void>;
}

export const useStoreTv = create<UseStoreTv>((set) => ({
    tvs: [],
    error: null,
    isLoading: false,

    getTvsByHeadquartersId: async (headquartersId: number) => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get(`/tv/inventory/sede/${headquartersId}`);

            if (!response.data || response.data.length === 0) {
                set({ tvs: [], error: "No se encontraron resultados" });
                return;
            }

            set({ tvs: response.data, error: null });
        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            } else {
                set({ error: error.response?.data?.message || "Ocurrió un error al obtener los televisores." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    createTv: async (data: Object, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.post('/tv/inventory', data);

            if (response.status === 200 || response.status === 201) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            } else {
                set({ error: error.response?.data?.message });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    updateTv: async (id: number, data: Object, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.put(`/tv/inventory/${id}`, data);

            if (response.status === 200) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor. Por favor, intenta más tarde." });
            } else {
                set({ error: error.response?.data?.message });
            }
        } finally {
            set({ isLoading: false });
        }
    },

}));