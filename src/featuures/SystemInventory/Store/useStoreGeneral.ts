import { api } from "@/utils/api-config";
import { create } from "zustand";
import { IItemsGeneral } from "../Models/IItemsGeneral";

interface UseStoreGeneral {
    general: IItemsGeneral[];
    error: string | null;
    isLoading: boolean;
    getGeneralByHeadquartersId: (headquartersId: number) => Promise<void>;
    createGeneral: (data: Object, onSuccess?: () => void) => Promise<void>;
    updateGeneral: (id: number, data: Object, onSuccess?: () => void) => Promise<void>;
}

export const useStoreGeneral = create<UseStoreGeneral>((set) => ({
    general: [],
    error: null,
    isLoading: false,

    getGeneralByHeadquartersId: async (headquartersId: number) => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get(`/general/inventory/sede/${headquartersId}`);

            if (!response.data || response.data.length === 0) {
                set({ general: [], error: "No se encontraron resultados" });
                return;
            }

            set({ general: response.data, error: null });
        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error interno del servidor" });
            } else {
                set({ error: error.response?.data?.message || "Ocurrió un error al obtener el inventario general." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    createGeneral: async (data: Object, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.post('/general/inventory', data)

            if (response.status === 201) {
                onSuccess?.()
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor" });
            } else {
                set({ error: error.response?.data?.message });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    updateGeneral: async (id: number, data: Object, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.put(`/general/inventory/${id}`, data);

            if (response.status === 200) {
                onSuccess?.()
            }


        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: "Error interno del servidor" });
            } else {
                set({ error: error.response?.data?.message });
            }
        } finally {
            set({ isLoading: false });
        }
    },
}));