import { api } from "@/utils/api-config";
import { create } from "zustand";
import { IItemsPhone } from "../Models/IItemsPhone";

interface UseStorePhones {
    phones: IItemsPhone[];
    error: string | null;
    isLoading: boolean;
    getPhonesByHeadquartersId: (headquartersId: number) => Promise<void>;
    createPhone: (data: Object, onSuccess?: () => void) => Promise<void>;
    updatePhone: (id: number, data: Object, onSuccess?: () => void) => Promise<void>;
}

export const useStorePhones = create<UseStorePhones>((set) => ({
    phones: [],
    error: null,
    isLoading: false,

    getPhonesByHeadquartersId: async (headquartersId: number) => {
        try {
            set({ isLoading: true, error: null });

            const response = await api.get(`/phones/inventory/sede/${headquartersId}`);

            if (!response.data || response.data.length === 0) {
                set({ phones: [], error: "No se encontraron resultados" });
                return;
            }

            set({ phones: response.data, error: null });
        } catch (error: any) {
            if (error.response?.status === 500) {
                set({ error: "Error interno del servidor" });
            } else {
                set({ error: error.response?.data?.message || "Ocurrió un error al obtener los celulares." });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    createPhone: async (data: Object, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.post('/phones/inventory', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 201) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: 'Error interno del servidor' });
            } else {
                set({ error: error.response?.data?.message });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    updatePhone: async (id: number, data: Object, onSuccess?: () => void) => {
        try {

            set({ isLoading: true, error: null });

            const response = await api.put(`/phones/inventory/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            if (response.status === 200 || response.status === 201) {
                onSuccess?.();
            }

        } catch (error: any) {
            if (error.response.status === 500) {
                set({ error: 'Error interno del servidor' });
            } else {
                set({ error: error.response?.data?.message });
            }
        } finally {
            set({ isLoading: false });
        }
    },
}));