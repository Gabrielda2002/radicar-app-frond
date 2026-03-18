import { api } from "@/utils/api-config";
import { create } from "zustand";

interface UseStoreGeneral {
    general: any[];
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

    getGeneralByHeadquartersId: async (_headquartersId: number) => { },

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